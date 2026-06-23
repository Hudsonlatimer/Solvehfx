'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { District } from '@/lib/types';

interface DistrictStats {
  district: District;
  totalReports: number;
  resolved: number;
  open: number;
  verifications: number;
  resolutionRate: number;
  avgDaysToResolve: number | null;
}

interface Totals {
  totalReports: number;
  resolved: number;
  open: number;
}

export default function ScorecardsPage() {
  const [stats, setStats] = useState<DistrictStats[]>([]);
  const [totals, setTotals] = useState<Totals>({ totalReports: 0, resolved: 0, open: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/scorecards');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats || []);
          setTotals(data.totals || { totalReports: 0, resolved: 0, open: 0 });
        }
      } catch (err) {
        console.error('Failed to load scorecards:', err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const sorted = [...stats].sort(
    (a, b) => b.resolutionRate - a.resolutionRate || b.totalReports - a.totalReports
  );
  const overallRate = totals.totalReports
    ? Math.round((totals.resolved / totals.totalReports) * 100)
    : 0;

  return (
    <div>
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Scorecards' }]} />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Transparency
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance max-w-3xl">
              District scorecards.
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-2xl leading-relaxed">
              Where Halifax issues get reported — and how many actually get fixed.
              Live, public data from SolveHFX, broken down by district.
            </p>
          </Reveal>

          {/* Overall summary */}
          <Reveal className="mt-8" delay={60}>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SummaryTile label="Reports filed" value={totals.totalReports} loading={loading} />
              <SummaryTile label="Resolved" value={totals.resolved} tone="text-success" loading={loading} />
              <SummaryTile label="Still open" value={totals.open} loading={loading} />
              <SummaryTile label="Resolution rate" value={`${overallRate}%`} tone="text-primary" loading={loading} />
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-5 mb-10">
              <p className="text-[13px] text-text-primary leading-relaxed">
                <span className="font-semibold">How we measure.</span>{' '}
                We can&apos;t see councillors&apos; inboxes, so this isn&apos;t about
                private replies.{' '}
                <span className="text-text-secondary">
                  It tracks what&apos;s public and verifiable: every issue reported
                  through SolveHFX, and whether it&apos;s been marked resolved — by
                  the city or confirmed fixed by neighbours. Resolution rate =
                  resolved ÷ total reported in that district.
                </span>
              </p>
            </div>
          </Reveal>

          {loading ? (
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className="h-32 rounded-2xl border border-rule bg-bg-elev animate-pulse"
                />
              ))}
            </ul>
          ) : sorted.length === 0 ? (
            <Reveal>
              <div className="text-center py-16 rounded-2xl border border-rule bg-bg-elev">
                <p className="text-text-secondary text-[14.5px]">
                  No reports yet — scorecards appear once issues start coming in.
                </p>
                <div className="mt-5">
                  <Link
                    href="/report"
                    className="text-primary hover:underline underline-offset-4 text-[14px]"
                  >
                    Be the first to report an issue →
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <ol className="space-y-3">
              {sorted.map((stat, i) => (
                <Reveal key={stat.district.id} delay={Math.min(i * 30, 200)}>
                  <li className="group rounded-2xl border border-rule bg-bg-elev p-5 sm:p-6 hover:border-primary/20 hover:shadow-civic-md transition-all">
                    <div className="flex items-start justify-between gap-5 mb-5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-[12px] font-semibold num">
                            {stat.district.id}
                          </span>
                          <span className="text-[11px] tracking-[0.14em] uppercase text-text-muted">
                            District {stat.district.id}
                          </span>
                        </div>
                        <h3 className="text-[17px] tracking-tight truncate">
                          {stat.district.councillor_name || 'Vacant seat'}
                        </h3>
                        <p className="text-[13px] text-text-secondary truncate mt-0.5">
                          {stat.district.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="stat text-[34px] leading-none text-primary">
                          {Math.round(stat.resolutionRate)}%
                        </p>
                        <p className="text-[11.5px] text-text-muted tracking-tight mt-1.5">
                          Resolved
                        </p>
                      </div>
                    </div>

                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 text-left">
                      <div>
                        <dd className="stat text-[20px] text-text-primary">{stat.totalReports}</dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">Reports filed</dt>
                      </div>
                      <div>
                        <dd className="stat text-[20px] text-success">{stat.resolved}</dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">Resolved</dt>
                      </div>
                      <div>
                        <dd className="stat text-[20px] text-status-open">{stat.open}</dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">Still open</dt>
                      </div>
                      <div>
                        <dd className="stat text-[20px] text-text-primary">
                          {stat.avgDaysToResolve == null ? '—' : stat.avgDaysToResolve}
                          {stat.avgDaysToResolve != null && (
                            <span className="text-text-muted text-[13px] font-normal ml-1">days</span>
                          )}
                        </dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">Avg time to fix</dt>
                      </div>
                    </dl>

                    <div className="mt-5">
                      <div className="h-1.5 w-full bg-rule rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-[width] duration-700"
                          style={{ width: `${Math.min(stat.resolutionRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          )}

          <Reveal>
            <div className="mt-12 rounded-2xl border border-rule bg-bg-elev p-5">
              <p className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-text-secondary mb-3">
                Methodology
              </p>
              <ul className="text-[13.5px] text-text-secondary leading-relaxed space-y-1.5">
                <li>· Live from SolveHFX submissions — every report, anonymous or identified.</li>
                <li>· &ldquo;Resolved&rdquo; = marked resolved by an admin or confirmed fixed by community verification.</li>
                <li>· Resolution rate = resolved ÷ total reported in that district.</li>
                <li>· Avg time to fix = days from report submitted to resolved.</li>
                <li>· We don&apos;t track councillor email replies — there&apos;s no public way to verify them.</li>
                <li>· Independent public data; not affiliated with HRM. Districts with no reports yet aren&apos;t shown.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  tone = 'text-text-primary',
  loading,
}: {
  label: string;
  value: string | number;
  tone?: string;
  loading?: boolean;
}) {
  return (
    <div className="rounded-xl border border-rule bg-bg p-4">
      <dd className={`stat text-[26px] leading-none ${tone}`}>{loading ? '—' : value}</dd>
      <dt className="text-[11.5px] text-text-muted mt-1.5 tracking-tight">{label}</dt>
    </div>
  );
}
