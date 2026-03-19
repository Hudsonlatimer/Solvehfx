import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { determineAuthority } from '@/lib/districts';
import type { DistrictLookupResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { lat, lng, category, isHighway } = (await request.json()) as {
      lat: number;
      lng: number;
      category?: string;
      isHighway?: boolean;
    };

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json(
        { error: 'lat and lng are required numbers' },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    const { data: district, error } = await supabase.rpc('find_district', {
      p_lng: lng,
      p_lat: lat,
    });

    if (error) {
      // Fallback: try raw PostGIS query
      const { data: fallback } = await supabase
        .from('districts')
        .select('id, name, councillor_name, councillor_email')
        .limit(1);

      const fallbackDistrict = fallback?.[0] || null;
      const authority = category ? determineAuthority(category, isHighway) : 'hrm';

      return NextResponse.json({
        district: fallbackDistrict,
        road_authority: authority,
      } satisfies DistrictLookupResponse);
    }

    const authority = category ? determineAuthority(category, isHighway) : 'hrm';

    return NextResponse.json({
      district: district?.[0] || null,
      road_authority: authority,
    } satisfies DistrictLookupResponse);
  } catch (error) {
    console.error('District lookup failed:', error);
    return NextResponse.json(
      { error: 'District lookup failed' },
      { status: 500 }
    );
  }
}
