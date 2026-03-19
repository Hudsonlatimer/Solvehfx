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
    };

    if (!title || !description || !category || lat == null || lng == null) {
      return NextResponse.json(
        { error: 'title, description, category, lat, and lng are required' },
        { status: 400 }
      );
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
    const authority: RoadAuthority = determineAuthority(category, isHighway);

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
