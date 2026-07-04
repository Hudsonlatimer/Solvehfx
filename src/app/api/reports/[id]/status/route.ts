import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServiceClient();

    // Get report with district info
    const { data: report, error } = await supabase
      .from('reports')
      .select('*, districts(*), verifications(*)')
      .eq('id', id)
      .single();

    if (error || !report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Calculate verification stats
    const confirmedExists = (report.verifications || []).filter((v: any) => v.type === 'confirmed_exists').length;
    const confirmedFixed = (report.verifications || []).filter((v: any) => v.type === 'confirmed_fixed').length;

    // Determine status
    let status = 'open';
    let statusMessage = 'Reported, awaiting HRM action';
    let hrm_status = 'pending';

    if (report.hrm_work_order_id) {
      status = 'in_progress';
      statusMessage = `HRM Work Order: ${report.hrm_work_order_id}`;
      hrm_status = 'being_worked_on';
    }

    if (report.resolved_at || report.status === 'resolved') {
      status = 'resolved';
      statusMessage = 'Issue resolved';
      hrm_status = 'completed';
    }

    // Require more than one independent confirmation before publicly flipping a
    // report to "verified fixed" — a single confirmation shouldn't override the
    // real status, especially since anonymous verification is allowed.
    if (confirmedFixed >= 2 && confirmedExists === 0) {
      status = 'verified_fixed';
      statusMessage = `Community verified fixed (${confirmedFixed} confirmations)`;
      hrm_status = 'verified_complete';
    }

    return NextResponse.json(
      {
        report: {
          id: report.id,
          reference_number: report.reference_number,
          title: report.title,
          address: report.address,
          status,
          statusMessage,
          hrm_status,
          created_at: report.created_at,
          hrm_response_date: report.hrm_response_date,
          resolved_at: report.resolved_at,
          estimated_resolution_date: report.estimated_resolution_date,
          verifications: {
            confirmedExists,
            confirmedFixed,
          },
          district: report.districts,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to get report status:', error);
    return NextResponse.json({ error: 'Failed to get report status' }, { status: 500 });
  }
}
