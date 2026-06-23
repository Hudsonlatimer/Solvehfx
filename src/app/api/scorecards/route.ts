import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

const DAY_MS = 24 * 60 * 60 * 1000;

// District scorecards. We can't observe councillors' inboxes, so these metrics
// are built only from what's public and verifiable: reports filed through
// SolveHFX and whether they've been resolved (marked resolved by an admin or
// confirmed fixed by the community).
export async function GET() {
  try {
    const supabase = await createServiceClient();

    const { data: reports, error } = await supabase
      .from('reports')
      .select('status, created_at, resolved_at, districts(*), verifications(id)')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    type Acc = {
      district: unknown;
      totalReports: number;
      resolved: number;
      open: number;
      verifications: number;
      resolveDaysSum: number;
      resolvedWithTime: number;
    };

    const byDistrict = new Map<number, Acc>();

    (reports ?? []).forEach((r) => {
      // supabase types the embedded relation loosely; narrow it here
      const district = (r as unknown as { districts: { id: number } | null }).districts;
      if (!district) return;
      const id = district.id;

      if (!byDistrict.has(id)) {
        byDistrict.set(id, {
          district,
          totalReports: 0,
          resolved: 0,
          open: 0,
          verifications: 0,
          resolveDaysSum: 0,
          resolvedWithTime: 0,
        });
      }

      const s = byDistrict.get(id)!;
      s.totalReports++;
      s.verifications += (r as unknown as { verifications?: unknown[] }).verifications?.length || 0;

      const resolved = r.status === 'resolved' || !!r.resolved_at;
      if (resolved) {
        s.resolved++;
        if (r.resolved_at && r.created_at) {
          const days = (new Date(r.resolved_at).getTime() - new Date(r.created_at).getTime()) / DAY_MS;
          if (days >= 0) {
            s.resolveDaysSum += days;
            s.resolvedWithTime++;
          }
        }
      } else {
        s.open++;
      }
    });

    const stats = Array.from(byDistrict.values()).map((s) => ({
      district: s.district,
      totalReports: s.totalReports,
      resolved: s.resolved,
      open: s.open,
      verifications: s.verifications,
      resolutionRate: s.totalReports ? (s.resolved / s.totalReports) * 100 : 0,
      avgDaysToResolve: s.resolvedWithTime ? Math.round(s.resolveDaysSum / s.resolvedWithTime) : null,
    }));

    const totals = stats.reduce(
      (acc, s) => {
        acc.totalReports += s.totalReports;
        acc.resolved += s.resolved;
        acc.open += s.open;
        return acc;
      },
      { totalReports: 0, resolved: 0, open: 0 }
    );

    return NextResponse.json({ stats, totals }, { status: 200 });
  } catch (error) {
    console.error('Failed to load scorecards:', error);
    return NextResponse.json({ error: 'Failed to load scorecards' }, { status: 500 });
  }
}
