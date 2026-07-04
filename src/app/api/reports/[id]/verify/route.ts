import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';
import { getClientIp } from '@/lib/request';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const serviceClient = await createServiceClient();

    // User is optional — anonymous verification is allowed
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    const clientIp = getClientIp(request);

    // Prevent verification stuffing. Logged-in users are deduped by user_id;
    // anonymous submissions are deduped by client IP so a single actor can't
    // repeatedly flip a report's community-verification state.
    if (user) {
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
    } else if (clientIp !== 'unknown') {
      const { data: existing } = await serviceClient
        .from('verifications')
        .select('id')
        .eq('report_id', id)
        .eq('client_ip', clientIp)
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json(
          { error: 'This report has already been verified from your network' },
          { status: 409 }
        );
      }
    }

    const insertRow: Record<string, unknown> = {
      report_id: id,
      user_id: user?.id || null,
      type,
      photo_url: photo_url || null,
      client_ip: clientIp,
    };

    let { data: verification, error } = await serviceClient
      .from('verifications')
      .insert(insertRow)
      .select()
      .single();

    // Backwards-compat: if the client_ip column hasn't been migrated yet, retry
    // without it rather than failing the verification outright.
    if (error && /client_ip/.test(error.message)) {
      delete insertRow.client_ip;
      ({ data: verification, error } = await serviceClient
        .from('verifications')
        .insert(insertRow)
        .select()
        .single());
    }

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
