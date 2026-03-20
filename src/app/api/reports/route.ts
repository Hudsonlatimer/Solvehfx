import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';
import { determineAuthority } from '@/lib/districts';
import { dispatchEmails } from '@/lib/resend';
import type { RoadAuthority } from '@/lib/types';

function generateReferenceNumber(): string {
  const prefix = 'SHX';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const district = searchParams.get('district');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    let query = supabase
      .from('reports')
      .select('*, districts(*), verifications(*)', { count: 'exact' });

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
      email,
      notify_councillor,
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
      email?: string | null;
      notify_councillor?: boolean;
    };

    if (!title || !description || !category || lat == null || lng == null) {
      return NextResponse.json(
        { error: 'title, description, category, lat, and lng are required' },
        { status: 400 }
      );
    }

    // Rate limiting: max 5 reports per IP per day
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const today = new Date().toISOString().split('T')[0];
    const ipKey = `rate:${clientIp}:${today}`;

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
                distance: `~${Math.round(Math.abs(lat - existingReport.lat) * 111)}m away`,
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
    const { data: report, error } = await serviceClient
      .from('reports')
      .insert({
        title,
        description,
        category,
        lat,
        lng,
        address: address || null,
        district_id: districtData?.id || null,
        road_authority: authority,
        photo_url: photo_url || null,
        status: 'open',
        is_anonymous: is_anonymous || false,
        user_id: is_anonymous ? null : user?.id || null,
        reference_number,
        client_ip: clientIp,
        contact_email: email || null,
        notify_councillor: notify_councillor || false,
      })
      .select('*')
      .single();

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
