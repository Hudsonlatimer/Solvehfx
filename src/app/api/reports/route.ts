import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';
import { determineAuthority } from '@/lib/districts';
import { dispatchEmails } from '@/lib/resend';
import { getClientIp } from '@/lib/request';
import type { RoadAuthority } from '@/lib/types';

function generateReferenceNumber(): string {
  const prefix = 'SHX';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

const SPAM_RE = /(https?:\/\/|www\.|viagra|casino|crypto|telegram|whatsapp|bit\.ly)/i;

// Bump this whenever the Terms or the submit-step consent wording materially
// changes, so each stored report records which version the resident agreed to.
const CONSENT_VERSION = '2026-08-10';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const district = searchParams.get('district');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'newest';
    const view = searchParams.get('view');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Never select '*' here — this endpoint is public and unauthenticated, and
    // the reports table holds contact_name, contact_email, client_ip, and
    // user_id alongside the public fields. Whitelist only what's safe to show.
    const PUBLIC_FIELDS =
      'id, reference_number, title, description, category, lat, lng, address, ' +
      'district_id, road_authority, photo_url, status, created_at, resolved_at, ' +
      'estimated_resolution_date, hrm_responded, councillor_responded, is_anonymous';

    const selectClause =
      view === 'map'
        ? `${PUBLIC_FIELDS}, districts(id,name,councillor_name,councillor_email), verifications(id,report_id,type,photo_url,created_at)`
        : `${PUBLIC_FIELDS}, districts(id,name,councillor_name,councillor_email), verifications(id,report_id,type,photo_url,created_at)`;

    let query = supabase
      .from('reports')
      .select(selectClause, { count: 'exact' });

    if (category) query = query.eq('category', category);
    if (district) query = query.eq('district_id', parseInt(district, 10));
    if (status) query = query.eq('status', status);

    if (sort === 'oldest') {
      query = query.order('created_at', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      reports: data || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const serviceClient = await createServiceClient();

    const body = await request.json();
    const {
      title,
      description,
      category,
      lat,
      lng,
      address,
      photo_url,
      is_anonymous,
      isHighway,
      force,
      name,
      email,
      notify_councillor,
      terms_accepted,
      public_visibility_accepted,
      website,
    } = body as {
      title: string;
      description: string;
      category: string;
      lat: number;
      lng: number;
      address?: string;
      photo_url?: string;
      is_anonymous?: boolean;
      isHighway?: boolean;
      force?: boolean;
      name?: string | null;
      email?: string | null;
      notify_councillor?: boolean;
      terms_accepted?: boolean;
      public_visibility_accepted?: boolean;
      website?: string;
    };

    if (!title || !description || !category || lat == null || lng == null) {
      return NextResponse.json(
        { error: 'title, description, category, lat, and lng are required' },
        { status: 400 }
      );
    }

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (website && website.trim() !== '') {
      return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
    }

    if (!terms_accepted || !public_visibility_accepted) {
      return NextResponse.json(
        { error: 'You must accept the legal and public visibility confirmations.' },
        { status: 400 }
      );
    }

    if (trimmedTitle.length < 6 || trimmedDescription.length < 20) {
      return NextResponse.json(
        { error: 'Please provide a clearer title and description.' },
        { status: 400 }
      );
    }

    // Upper bounds keep oversized payloads out of the DB and email bodies.
    if (trimmedTitle.length > 160 || trimmedDescription.length > 4000) {
      return NextResponse.json(
        { error: 'Title or description is too long.' },
        { status: 400 }
      );
    }

    if (SPAM_RE.test(`${trimmedTitle} ${trimmedDescription}`)) {
      return NextResponse.json(
        { error: 'Please remove promotional links or spam content.' },
        { status: 400 }
      );
    }

    // Validate optional contact email so malformed addresses never reach the DB
    // or the email dispatcher.
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Rate limiting: max 5 reports per IP per day
    const clientIp = getClientIp(request);

    // Check rate limit (in production, use Redis; for now, check DB)
    const { data: recentReports } = await serviceClient
      .from('reports')
      .select('id')
      .eq('client_ip', clientIp)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if ((recentReports?.length || 0) >= 5) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Max 5 reports per day per IP.' },
        { status: 429 }
      );
    }

    // Duplicate detection: check if issue already reported within ~100m (0.001 degrees) in last 48 hours
    if (!force) {
      const radiusLng = 0.001; // ~100 meters at equator
      const radiusLat = 0.001;
      const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

      const { data: nearbyReports } = await serviceClient
        .from('reports')
        .select('id, created_at, title, lat, lng, category')
        .gte('created_at', fortyEightHoursAgo)
        .gte('lat', lat - radiusLat)
        .lte('lat', lat + radiusLat)
        .gte('lng', lng - radiusLng)
        .lte('lng', lng + radiusLng)
        .eq('category', category);

      if (nearbyReports && nearbyReports.length > 0) {
        const existingReport = nearbyReports[0];
        const daysAgo = Math.floor((Date.now() - new Date(existingReport.created_at).getTime()) / (1000 * 60 * 60 * 24));
        return NextResponse.json(
          {
            error: 'Duplicate detected',
            duplicate: {
              message: `This issue was already reported ${daysAgo === 0 ? 'today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}`,
              existingReport: {
                title: existingReport.title,
                createdAt: existingReport.created_at,
                distance: `~${Math.round(
                  Math.hypot(
                    (lat - existingReport.lat) * 111_000,
                    (lng - existingReport.lng) * 111_000 * Math.cos((lat * Math.PI) / 180)
                  )
                )}m away`,
              },
            },
          },
          { status: 409 }
        );
      }
    }

    // Get current user (may be null for anonymous)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Look up district via PostGIS
    let districtData = null;
    const { data: districtResult } = await serviceClient.rpc('find_district', {
      p_lng: lng,
      p_lat: lat,
    });
    if (districtResult?.[0]) {
      districtData = districtResult[0];
    }

    // Determine road authority
    const authority: RoadAuthority = await determineAuthority(category, isHighway, address);

    // Generate unique reference number
    const reference_number = generateReferenceNumber();

    // Insert report
    const row: Record<string, unknown> = {
      title: trimmedTitle,
      description: trimmedDescription,
      category,
      lat,
      lng,
      address: address || null,
      district_id: districtData?.id || null,
      road_authority: authority,
      photo_url: photo_url || null,
      status: 'open',
      is_anonymous: is_anonymous ?? true,
      user_id: is_anonymous ? null : user?.id || null,
      reference_number,
      client_ip: clientIp,
      contact_name: name || null,
      contact_email: email || null,
      notify_councillor: notify_councillor || false,
      // Record what the resident actually agreed to, and when. Both flags are
      // validated as true above, so this is the audit trail for that consent.
      consent_accepted_at: new Date().toISOString(),
      consent_version: CONSENT_VERSION,
    };

    let { data: report, error } = await serviceClient
      .from('reports')
      .insert(row)
      .select('*')
      .single();

    // Backwards-compat: consent columns are new. If the migration hasn't been
    // run yet, drop them and retry rather than blocking submissions.
    if (error && /consent_accepted_at|consent_version/.test(error.message)) {
      delete row.consent_accepted_at;
      delete row.consent_version;
      ({ data: report, error } = await serviceClient
        .from('reports')
        .insert(row)
        .select('*')
        .single());
    }

    // Backwards-compat: if the contact_name column hasn't been migrated yet,
    // retry without it rather than failing the whole submission.
    if (error && /contact_name/.test(error.message)) {
      delete row.contact_name;
      ({ data: report, error } = await serviceClient
        .from('reports')
        .insert(row)
        .select('*')
        .single());
    }

    // A stale session can carry a user_id that no longer exists in auth.users
    // (e.g. the account was deleted after the browser cached its session).
    // That should never block a resident from filing a report — retry as
    // anonymous rather than surfacing a raw DB error.
    if (error && /reports_user_id_fkey/.test(error.message)) {
      row.user_id = null;
      ({ data: report, error } = await serviceClient
        .from('reports')
        .insert(row)
        .select('*')
        .single());
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Dispatch emails asynchronously (don't block response)
    dispatchEmails({
      report,
      district: districtData,
      authority,
    }).catch((err) => console.error('Email dispatch failed:', err));

    return NextResponse.json({ report }, { status: 201 });
  } catch (error) {
    console.error('Failed to create report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}
