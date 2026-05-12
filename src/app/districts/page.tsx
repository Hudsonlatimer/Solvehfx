import Link from 'next/link';
import { HRM_DISTRICTS } from '@/lib/districts';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'HRM Districts & Councillor Scorecards — SolveHFX',
  description:
    'See how many civic issues each Halifax district has, resolution rates, and councillor activity. Transparent accountability for all 16 HRM districts.',
  alternates: { canonical: 'https://solvehfx.ca/districts' },
  openGraph: {
    title: 'HRM Districts & Councillor Scorecards — SolveHFX',
    description:
      'Transparent accountability: see report counts and resolution rates for all 16 Halifax districts.',
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
    // Supabase unavailable — render with zeros
  }

  const sortedDistricts = [...HRM_DISTRICTS].sort(
    (a, b) => (countMap.get(b.id) || 0) - (countMap.get(a.id) || 0)
  );

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'HRM Districts',
    itemListElement: HRM_DISTRICTS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `District ${d.id} — ${d.name}`,
      url: `https://solvehfx.ca/map?district=${d.id}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Districts' }]} />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Accountability
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance max-w-3xl">
              16 districts. One Halifax.
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-2xl leading-relaxed">
              Every report routes to your district councillor — these are the
              people elected to advocate for your block. See how each district is
              doing, what&apos;s open, what&apos;s resolved.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Leaderboard */}
      {totalReports > 0 && (
        <section className="border-b border-rule">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
            <Reveal>
              <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
                    Leaderboard
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-[28px] leading-[1.1] tracking-tight">
                    Most active districts
                  </h2>
                </div>
                <p className="text-[12.5px] text-text-muted max-w-xs">
                  Higher report counts may indicate more engaged communities, not
                  worse conditions.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ol className="space-y-3 rounded-2xl border border-rule bg-bg-elev p-4 sm:p-6">
                {sortedDistricts.slice(0, 5).map((d, rank) => {
                  const total = countMap.get(d.id) || 0;
                  const resolved = resolvedMap.get(d.id) || 0;
                  const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
                  const maxCount = countMap.get(sortedDistricts[0].id) || 1;
                  const barWidth = Math.max(5, Math.round((total / maxCount) * 100));

                  return (
                    <li key={d.id} className="flex items-center gap-4">
                      <span className="num w-7 text-[13px] font-semibold text-text-muted text-right">
                        {String(rank + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5 gap-3">
                          <span className="text-[14px] font-medium text-text-primary truncate">
                            D{d.id} — {d.name}
                          </span>
                          <span className="text-[12px] text-text-secondary shrink-0 num">
                            {total} reports · {rate}% resolved
                          </span>
                        </div>
                        <div className="h-1.5 bg-rule rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-[width] duration-700"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </section>
      )}

      {/* All districts grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
                  All districts
                </p>
                <h2 className="mt-2 text-2xl sm:text-[28px] leading-[1.1] tracking-tight">
                  Find yours.
                </h2>
              </div>
              <Link
                href="/map"
                className="text-sm text-primary hover:underline underline-offset-4"
              >
                Open full map →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HRM_DISTRICTS.map((d, i) => {
              const total = countMap.get(d.id) || 0;
              const open = openMap.get(d.id) || 0;
              const resolved = resolvedMap.get(d.id) || 0;
              const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;

              return (
                <Reveal key={d.id} delay={(i % 4) * 40}>
                  <Link
                    href={`/map?district=${d.id}`}
                    className="group block h-full rounded-2xl border border-rule bg-bg-elev p-5 hover:border-primary/25 hover:shadow-civic-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-[13.5px] font-semibold num shadow-civic">
                        {d.id}
                      </span>
                      <span className="text-[11px] tracking-[0.14em] uppercase text-text-muted">
                        District
                      </span>
                    </div>
                    <h3 className="text-[15px] font-medium tracking-tight leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-[12.5px] text-text-secondary truncate">
                      {d.councillor_name || 'Vacant'}
                    </p>

                    <dl className="grid grid-cols-3 gap-1 pt-3 mt-4 border-t border-rule text-center">
                      <div>
                        <dd className="stat text-[15px] text-primary">{total}</dd>
                        <dt className="text-[10.5px] tracking-tight text-text-muted mt-0.5">Total</dt>
                      </div>
                      <div>
                        <dd className="stat text-[15px] text-warning">{open}</dd>
                        <dt className="text-[10.5px] tracking-tight text-text-muted mt-0.5">Open</dt>
                      </div>
                      <div>
                        <dd className="stat text-[15px] text-success">{rate}%</dd>
                        <dt className="text-[10.5px] tracking-tight text-text-muted mt-0.5">Resolved</dt>
                      </div>
                    </dl>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
