import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('reports')
      .select('*, districts(*), verifications(*), resolution_notes(*)')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const serviceClient = await createServiceClient();
    const body = await request.json();

    const { status, note } = body as { status?: string; note?: string };

    // Verify the user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const updates: Record<string, unknown> = {};
    if (status) {
      updates.status = status;
      if (status === 'resolved') updates.resolved_at = new Date().toISOString();
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await serviceClient
        .from('reports')
        .update(updates)
        .eq('id', id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    if (note) {
      await serviceClient.from('resolution_notes').insert({
        report_id: id,
        note,
      });
    }

    const { data: updated } = await serviceClient
      .from('reports')
      .select('*, districts(*), verifications(*), resolution_notes(*)')
      .eq('id', id)
      .single();

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update report:', error);
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    );
  }
}
