import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const serviceClient = await createServiceClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'You must be logged in to verify a report' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, photo_url } = body as {
      type: 'confirmed_exists' | 'confirmed_fixed';
      photo_url?: string;
    };

    if (!type || !['confirmed_exists', 'confirmed_fixed'].includes(type)) {
      return NextResponse.json(
        { error: 'type must be "confirmed_exists" or "confirmed_fixed"' },
        { status: 400 }
      );
    }

    // Check report exists
    const { data: report } = await serviceClient
      .from('reports')
      .select('id')
      .eq('id', id)
      .single();

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Check for existing verification from this user
    const { data: existing } = await serviceClient
      .from('verifications')
      .select('id')
      .eq('report_id', id)
      .eq('user_id', user.id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'You have already verified this report' },
        { status: 409 }
      );
    }

    const { data: verification, error } = await serviceClient
      .from('verifications')
      .insert({
        report_id: id,
        user_id: user.id,
        type,
        photo_url: photo_url || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(verification, { status: 201 });
  } catch (error) {
    console.error('Failed to verify report:', error);
    return NextResponse.json(
      { error: 'Failed to verify report' },
      { status: 500 }
    );
  }
}
