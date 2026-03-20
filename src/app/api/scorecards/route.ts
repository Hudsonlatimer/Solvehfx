import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createServiceClient();

    // Get all reports with district info
    const { data: reports, error } = await supabase
      .from('reports')
      .select('*, districts(*)')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Group by district and calculate stats
    const statsByDistrict = new Map();

    reports?.forEach((report) => {
      if (!report.districts) return;

      const districtId = report.districts.id;
      if (!statsByDistrict.has(districtId)) {
        statsByDistrict.set(districtId, {
          district: report.districts,
          totalReports: 0,
          responded: 0,
          responseTimeSum: 0,
          resolved: 0,
          responseCount: 0,
        });
      }

      const stat = statsByDistrict.get(districtId);
      stat.totalReports++;

      // Count councillor responses
      if (report.councillor_responded) {
        stat.responded++;
        if (report.councillor_response_date && report.created_at) {
          const daysToRespond = Math.floor(
            (new Date(report.councillor_response_date).getTime() - new Date(report.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          );
          if (daysToRespond >= 0) {
            stat.responseTimeSum += daysToRespond;
            stat.responseCount++;
          }
        }
      }

      // Count resolved reports
      if (report.status === 'resolved' || report.resolved_at) {
        stat.resolved++;
      }
    });

    // Convert to array and calculate percentages
    const stats = Array.from(statsByDistrict.values()).map((stat: any) => ({
      district: stat.district,
      totalReports: stat.totalReports,
      responded: stat.responded,
      responseRate: stat.totalReports > 0 ? (stat.responded / stat.totalReports) * 100 : 0,
      avgDaysToRespond: stat.responseCount > 0 ? Math.round(stat.responseTimeSum / stat.responseCount) : 0,
      resolved: stat.resolved,
      resolutionRate: stat.totalReports > 0 ? (stat.resolved / stat.totalReports) * 100 : 0,
    }));

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error('Failed to load scorecards:', error);
    return NextResponse.json({ error: 'Failed to load scorecards' }, { status: 500 });
  }
}
