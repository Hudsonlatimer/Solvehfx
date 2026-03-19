import Link from 'next/link';
import { HRM_DISTRICTS } from '@/lib/districts';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HRM Districts & Councillor Scorecards — SolveHFX',
  description:
    'See how many civic issues each Halifax district has, resolution rates, and councillor activity. Transparent accountability for all 16 HRM districts.',
  alternates: { canonical: 'https://solvehfx.ca/districts' },
  openGraph: {
    title: 'HRM Districts & Councillor Scorecards — SolveHFX',
    description: 'Transparent accountability: see report counts and resolution rates for all 16 Halifax districts.',
    url: 'https://solvehfx.ca/districts',
  },
};

export const dynamic = 'force-dynamic';

export default async function DistrictsPage() {
  const countMap = new Map<number, number>();
  const resolvedMap = new Map<number, number>();
  const openMap = new Map<number, number>();
  let totalReports = 0;

  try {
    const supabase = await createClient();
    const { data: reportCounts } = await supabase
      .from('reports')
      .select('district_id, status');

    reportCounts?.forEach((r) => {
      if (r.district_id) {
        countMap.set(r.district_id, (countMap.get(r.district_id) || 0) + 1);
        if (r.status === 'resolved') {
          resolvedMap.set(r.district_id, (resolvedMap.get(r.district_id) || 0) + 1);
        } else if (r.status === 'open') {
          openMap.set(r.district_id, (openMap.get(r.district_id) || 0) + 1);
        }
        totalReports++;
      }
    });
  } catch {
    // Supabase unavailable — render with zero counts
  }

  // Sort districts by report count descending for the scorecard
  const sortedDistricts = [...HRM_DISTRICTS].sort((a, b) => {
    return (countMap.get(b.id) || 0) - (countMap.get(a.id) || 0);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">HRM Districts & Councillor Scorecards</h1>
      <p className="text-text-secondary mb-8">
        Transparent accountability for Halifax. See how many issues each district has, resolution rates, and which areas need attention most.
      </p>

      {/* Scorecard summary */}
      {totalReports > 0 && (
        <div className="rounded-xl border border-primary/10 bg-primary/5 p-5 mb-8">
          <h2 className="font-semibold text-text-primary mb-4">District Leaderboard</h2>
          <div className="space-y-3">
            {sortedDistricts.slice(0, 5).map((d, rank) => {
              const total = countMap.get(d.id) || 0;
              const resolved = resolvedMap.get(d.id) || 0;
              const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
              const maxCount = countMap.get(sortedDistricts[0].id) || 1;
              const barWidth = Math.max(5, Math.round((total / maxCount) * 100));

              return (
                <div key={d.id} className="flex items-center gap-3">
                  <span className="w-6 text-sm font-bold text-text-secondary text-right">#{rank + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary truncate">
                        D{d.id} — {d.name}
                      </span>
                      <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                        {total} reports &middot; {rate}% resolved
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-text-secondary mt-4">
            Ranked by total reports filed. Higher report counts may indicate more engaged communities, not worse conditions.
          </p>
        </div>
      )}

      {/* District grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {HRM_DISTRICTS.map((d) => {
          const total = countMap.get(d.id) || 0;
          const resolved = resolvedMap.get(d.id) || 0;
          const open = openMap.get(d.id) || 0;
          const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;

          return (
            <Link
              key={d.id}
              href={`/map?district=${d.id}`}
              className="rounded-xl border border-gray-100 shadow-sm bg-white p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {d.id}
                </span>
                <span className="text-xs text-text-secondary">District {d.id}</span>
              </div>
              <h3 className="font-semibold text-sm text-text-primary mb-1 line-clamp-2">
                {d.name}
              </h3>
              <p className="text-xs text-text-secondary mb-3">
                Councillor: {d.councillor_name}
              </p>

              {/* Mini scorecard */}
              <div className="grid grid-cols-3 gap-1 pt-3 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-sm font-bold text-primary">{total}</p>
                  <p className="text-[10px] text-text-secondary">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-amber-600">{open}</p>
                  <p className="text-[10px] text-text-secondary">Open</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-success">{rate}%</p>
                  <p className="text-[10px] text-text-secondary">Resolved</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
