'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { District } from '@/lib/types';

interface CouncillorStats {
  district: District;
  totalReports: number;
  responded: number;
  responseRate: number;
  avgDaysToRespond: number;
  resolved: number;
  resolutionRate: number;
}

export default function ScorecardsPage() {
  const [stats, setStats] = useState<CouncillorStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/scorecards');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Failed to load scorecards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const sorted = [...stats].sort((a, b) => b.responseRate - a.responseRate);

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
              Councillor scorecards.
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-2xl leading-relaxed">
              How quickly do Halifax councillors respond to constituent reports?
              Public data, updated daily. Higher response rates mean better
              accountability.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-5 mb-10">
              <p className="text-[13px] text-text-primary leading-relaxed">
                <span className="font-semibold">How we measure.</span>{' '}
                We track when reports are submitted via SolveHFX and when the
                councillor responds. <span className="text-text-secondary">Response = councillor replied to resident or HRM escalated. Resolution = report marked fixed or closed.</span>
              </p>
            </div>
          </Reveal>

          {loading ? (
            <ul className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="h-36 rounded-2xl border border-rule bg-bg-elev animate-pulse"
                />
              ))}
            </ul>
          ) : sorted.length === 0 ? (
            <Reveal>
              <div className="text-center py-16 rounded-2xl border border-rule bg-bg-elev">
                <p className="text-text-secondary text-[14.5px]">
                  No scorecard data yet. Check back once a few reports have been
                  filed.
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
                          {Math.round(stat.responseRate)}%
                        </p>
                        <p className="text-[11.5px] text-text-muted tracking-tight mt-1.5">
                          Response rate
                        </p>
                      </div>
                    </div>

                    <dl className="grid grid-cols-3 gap-3 sm:gap-5 text-left">
                      <div>
                        <dd className="stat text-[20px] text-text-primary">
                          {stat.responded}
                          <span className="text-text-muted text-[14px] font-normal num">
                            /{stat.totalReports}
                          </span>
                        </dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">
                          Responded
                        </dt>
                      </div>
                      <div>
                        <dd className="stat text-[20px] text-text-primary">
                          {stat.avgDaysToRespond}
                          <span className="text-text-muted text-[13px] font-normal ml-1">
                            days
                          </span>
                        </dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">
                          Avg time to respond
                        </dt>
                      </div>
                      <div>
                        <dd className="stat text-[20px] text-success">
                          {Math.round(stat.resolutionRate)}%
                        </dd>
                        <dt className="text-[11.5px] text-text-muted mt-1 tracking-tight">
                          {stat.resolved} resolved
                        </dt>
                      </div>
                    </dl>

                    <div className="mt-5">
                      <div className="h-1.5 w-full bg-rule rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-[width] duration-700"
                          style={{
                            width: `${Math.min(stat.responseRate, 100)}%`,
                          }}
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
                <li>· Updated daily from SolveHFX submissions.</li>
                <li>· Based on real constituent reports — anonymous and identified.</li>
                <li>· Response counts replies, escalations, or status updates.</li>
                <li>· Resolution counts only reports marked fixed or closed.</li>
                <li>· This is independent public data; not affiliated with HRM.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
