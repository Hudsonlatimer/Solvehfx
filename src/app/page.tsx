import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { ISSUE_CATEGORIES } from '@/lib/types';
import { createServiceClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
  title: 'SolveHFX — Fix Halifax. Together.',
  description:
    'Report potholes, graffiti, broken streetlights, and civic issues in Halifax. AI drafts your report and sends it to HRM 311 and your district councillor in 60 seconds.',
  alternates: { canonical: 'https://solvehfx.ca' },
};

// Render per request (so build-time zeros are never baked in), but the stats
// themselves are cached for 60s via unstable_cache below — so all but one
// request a minute serves instantly without touching the database.
export const dynamic = 'force-dynamic';

// The redesign uses a bold sans display style for headings (overriding the
// site-wide serif) to match the civic-app reference layout.
const SANS = { fontFamily: 'var(--font-body)' } as const;

type ReportRow = {
  id: string;
  title: string;
  category: string;
  address: string | null;
  status: string;
  created_at: string;
};

type HomeStats = {
  totalReports: number;
  resolvedThisMonth: number;
  totalResolved: number;
  recentReports: ReportRow[];
  uniqueDistrictCount: number;
  avgResolutionDays: number;
};

const EMPTY_STATS: HomeStats = {
  totalReports: 0,
  resolvedThisMonth: 0,
  totalResolved: 0,
  recentReports: [],
  uniqueDistrictCount: 16,
  avgResolutionDays: 0,
};

// Cached homepage stats. Uses the cookieless service client so the result can
// be cached (cookies would force a fresh read every time), revalidated at most
// once a minute. Populated lazily on the first runtime request — never at build
// time — so it always reflects real data.
const getHomeStats = unstable_cache(
  async (): Promise<HomeStats> => {
    try {
      const supabase = await createServiceClient();
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const withTimeout = <T,>(p: PromiseLike<T>, ms = 2500): Promise<T> =>
        Promise.race([
          p as Promise<T>,
          new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error('Supabase timeout')), ms)
          ),
        ]);

      const [totalRes, resolvedMonthRes, allResolvedRes, resolvedReportsRes, recentRes, districtsRes] =
        await withTimeout(
          Promise.all([
            supabase.from('reports').select('*', { count: 'exact', head: true }),
            supabase
              .from('reports')
              .select('*', { count: 'exact', head: true })
              .eq('status', 'resolved')
              .gte('resolved_at', thirtyDaysAgo),
            supabase
              .from('reports')
              .select('*', { count: 'exact', head: true })
              .eq('status', 'resolved'),
            supabase
              .from('reports')
              .select('created_at, resolved_at')
              .eq('status', 'resolved')
              .not('resolved_at', 'is', null)
              .limit(100),
            supabase
              .from('reports')
              .select('id, title, category, address, status, created_at')
              .order('created_at', { ascending: false })
              .limit(6),
            supabase.from('reports').select('district_id').not('district_id', 'is', null),
          ])
        );

      let avgResolutionDays = 0;
      const resolvedReports = resolvedReportsRes.data;
      if (resolvedReports && resolvedReports.length > 0) {
        const totalDays = resolvedReports.reduce((sum, r) => {
          const days =
            (new Date(r.resolved_at!).getTime() - new Date(r.created_at).getTime()) /
            (1000 * 60 * 60 * 24);
          return sum + days;
        }, 0);
        avgResolutionDays = Math.round(totalDays / resolvedReports.length);
      }

      return {
        totalReports: totalRes.count || 0,
        resolvedThisMonth: resolvedMonthRes.count || 0,
        totalResolved: allResolvedRes.count || 0,
        recentReports: recentRes.data || [],
        uniqueDistrictCount: new Set(districtsRes.data?.map((r) => r.district_id)).size || 16,
        avgResolutionDays,
      };
    } catch {
      return EMPTY_STATS;
    }
  },
  ['home-stats'],
  { revalidate: 60, tags: ['home-stats'] }
);

export default async function HomePage() {
  const {
    totalReports,
    resolvedThisMonth,
    totalResolved,
    recentReports,
    uniqueDistrictCount,
    avgResolutionDays,
  } = await getHomeStats();

  const resolutionRate =
    totalReports > 0 ? Math.round((totalResolved / totalReports) * 100) : 0;

  return (
    <div>
      {/* ───────────────────── Hero ───────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-rule text-white">
        {/* Full-bleed Halifax backdrop */}
        <Image
          src="/halifax-hero.jpg"
          alt="Halifax waterfront and downtown skyline"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        {/* Navy readability scrim (heaviest on the left, behind the copy) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,32,61,0.92) 0%, rgba(0,32,61,0.72) 42%, rgba(0,56,101,0.32) 72%, rgba(0,56,101,0.10) 100%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-xl">
            <h1
              style={SANS}
              className="text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[0.97] tracking-tight drop-shadow-sm"
            >
              <span className="text-white">Fix Halifax.</span>
              <br />
              <span className="text-accent">Together.</span>
            </h1>

            <p className="mt-6 max-w-md text-[16.5px] leading-[1.55] text-white/85">
              Snap a photo of a pothole, broken light, or anything else. Our AI
              drafts the report. We send it straight to{' '}
              <span className="font-medium text-white">HRM 311</span> and your{' '}
              <span className="font-medium text-white">district councillor</span>.
              Sixty seconds, no account.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/report">
                <Button variant="secondary" size="lg">
                  <CameraIcon /> Report an Issue
                </Button>
              </Link>
              <Link href="/track" className="group text-[13.5px] leading-tight">
                <span className="text-white/70">Already submitted a report?</span>
                <br />
                <span className="font-medium text-white underline-offset-4 group-hover:underline">
                  Track it.
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Stat band ───────────────── */}
      <section className="bg-bg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              iconBg="bg-primary"
              label="Reports filed"
              value={totalReports.toLocaleString('en-CA')}
              icon={<PlaneIcon />}
            />
            <StatCard
              iconBg="bg-success"
              label="Resolved · 30d"
              value={resolvedThisMonth.toLocaleString('en-CA')}
              icon={<CheckIcon />}
            />
            <StatCard
              iconBg="bg-primary"
              label="HRM districts"
              value={`${uniqueDistrictCount}/16`}
              icon={<BuildingIcon />}
            />
            <Link
              href="/track"
              className="group flex items-center gap-3.5 rounded-xl border border-rule bg-bg-elev p-4 shadow-civic transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-tight text-text-primary">
                  Already submitted a report?
                </p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-text-secondary">
                  Use your reference number to check status — no account needed.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────── Community impact + How it works ─────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          {/* LEFT — impact + routing */}
          <div>
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 style={SANS} className="text-[26px] font-bold tracking-tight text-text-primary">
                    Community impact
                  </h2>
                  <p className="mt-1 text-[14px] text-text-secondary">What we&apos;ve done together.</p>
                </div>
                <Link href="/districts" className="shrink-0 text-[13px] font-medium text-primary-light hover:underline underline-offset-4">
                  District scorecards →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <ImpactCard label="Resolution rate" value={`${resolutionRate}%`} icon={<DonutIcon />} />
                <ImpactCard label="Issues resolved" value={totalResolved} icon={<CheckIcon className="text-success" />} />
                <ImpactCard label="Avg days to fix" value={avgResolutionDays || '—'} icon={<CalendarIcon />} />
                <ImpactCard label="Districts active" value={`${uniqueDistrictCount}/16`} icon={<PeopleIcon />} />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10">
                <h2 style={SANS} className="text-[26px] font-bold tracking-tight text-text-primary">
                  Smart routing
                </h2>
                <p className="mt-1 text-[14px] text-text-secondary">
                  We figure out who&apos;s actually responsible. HRM, Province, or
                  Halifax Transit — your issue lands with the right authority and gets
                  CC&apos;d to your district councillor automatically.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {ROUTING.map((r) => (
                    <div key={r.name} className="rounded-xl border border-rule bg-bg-elev p-4">
                      <div className="mb-2.5 flex items-center gap-2.5">
                        <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-primary px-1.5 text-[11px] font-bold text-white">
                          {r.badge}
                        </span>
                        <h3 style={SANS} className="text-[13.5px] font-semibold tracking-tight text-text-primary">
                          {r.name}
                        </h3>
                      </div>
                      <p className="mb-2.5 text-[12.5px] leading-relaxed text-text-secondary">{r.desc}</p>
                      <p className="break-all font-mono text-[11px] text-primary-light">{r.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — how it works */}
          <Reveal delay={40}>
            <div className="lg:pl-4">
              <h2 style={SANS} className="text-[26px] font-bold tracking-tight text-text-primary">
                How it works
              </h2>
              <p className="mt-1 text-[14px] text-text-secondary">
                Three steps. Sixty seconds. Reporting a civic issue in Halifax
                shouldn&apos;t take an afternoon of forms and phone trees.
              </p>

              <ol className="mt-7 space-y-6">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary-light">
                        Step {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 style={SANS} className="mt-0.5 text-[17px] font-semibold tracking-tight text-text-primary">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Categories ───────────────── */}
      <section className="border-y border-rule bg-bg-elev py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 style={SANS} className="text-[26px] font-bold tracking-tight text-text-primary">
                  What can I report?
                </h2>
                <p className="mt-1 text-[14px] text-text-secondary">
                  Anything that affects your neighbourhood. 28 categories, automatically
                  routed to the right authority.
                </p>
              </div>
              <Link href="/report" className="text-[13px] font-medium text-primary-light hover:underline underline-offset-4">
                View all categories →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="grid grid-cols-3 overflow-hidden rounded-xl border-l border-t border-rule sm:grid-cols-5 lg:grid-cols-10">
              {ISSUE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/report?category=${cat.id}`}
                  className="flex flex-col items-center gap-2 border-b border-r border-rule p-3.5 text-center transition-colors hover:bg-primary/[0.04]"
                >
                  <span className="text-[20px] leading-none">{cat.icon}</span>
                  <span className="text-[11px] font-medium leading-tight text-text-secondary">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────── Latest activity + Why SolveHFX ─────── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-10 lg:px-8">
          {/* Latest activity */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 style={SANS} className="text-[26px] font-bold tracking-tight text-text-primary">
                    Latest activity
                  </h2>
                  <p className="mt-1 text-[14px] text-text-secondary">What Halifax is reporting.</p>
                </div>
                <Link href="/reports" className="shrink-0 text-[13px] font-medium text-primary-light hover:underline underline-offset-4">
                  View all →
                </Link>
              </div>
            </Reveal>

            {recentReports && recentReports.length > 0 ? (
              <Reveal delay={60}>
                <ul className="divide-y divide-rule rounded-xl border border-rule bg-bg-elev">
                  {recentReports.map((r) => {
                    const cat = ISSUE_CATEGORIES.find((c) => c.id === r.category);
                    return (
                      <li key={r.id}>
                        <Link
                          href={`/reports/${r.id}`}
                          className="group flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-primary/[0.02]"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rule bg-bg text-[18px]">
                            {cat?.icon || '📍'}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-medium text-text-primary group-hover:text-primary-light">
                              {r.title}
                            </p>
                            <p className="mt-0.5 truncate text-[12px] text-text-secondary">
                              {r.address || 'Halifax, NS'}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <StatusBadge status={r.status} />
                            <time className="num text-[11.5px] text-text-muted">
                              {new Date(r.created_at).toLocaleDateString('en-CA', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </time>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ) : (
              <div className="rounded-xl border border-rule bg-bg-elev px-4 py-12 text-center">
                <p className="text-[14px] text-text-secondary">
                  No reports yet — be the first to put Halifax on the map.
                </p>
              </div>
            )}
          </div>

          {/* Why SolveHFX */}
          <Reveal delay={80}>
            <aside className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '26px 26px',
                }}
              />
              <div className="relative">
                <h2 style={SANS} className="text-[20px] font-bold tracking-tight">
                  Why SolveHFX
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">
                  Not another forgotten form. Built by Halifax residents who got tired
                  of issues disappearing into a 311 queue.
                </p>

                <ul className="mt-6 space-y-5">
                  {WHY.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                        {item.icon}
                      </span>
                      <div>
                        <h3 style={SANS} className="text-[13.5px] font-semibold tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-white/65">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Closing CTA ───────────────── */}
      <section className="border-t border-rule bg-bg-elev">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PinIcon />
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
              <p style={SANS} className="text-[22px] font-bold tracking-tight text-text-primary">
                See something? <span className="text-primary-light">Say something.</span>
              </p>
              <span aria-hidden className="hidden h-8 w-px bg-rule sm:block" />
              <p className="max-w-xs text-[13px] leading-snug text-text-secondary">
                Sixty seconds. No account. Your report goes straight to the people who
                can fix it.
              </p>
            </div>
          </div>
          <Link href="/report" className="shrink-0">
            <Button variant="primary" size="lg">
              <CameraIcon /> Report an Issue
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── helpers ──────────────────────── */

function StatCard({
  icon,
  iconBg,
  label,
  value,
}: {
  icon: ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-rule bg-bg-elev p-4 shadow-civic">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${iconBg}`}>
        {icon}
      </span>
      <div>
        <p className="text-[11.5px] font-medium tracking-tight text-text-secondary">{label}</p>
        <p className="stat mt-0.5 text-[26px] leading-none text-text-primary">{value}</p>
      </div>
    </div>
  );
}

function ImpactCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-rule bg-bg-elev p-4">
      <span className="flex h-7 w-7 items-center justify-center text-primary-light">{icon}</span>
      <p className="stat mt-3 text-[28px] leading-none text-text-primary">{value}</p>
      <p className="mt-1.5 text-[12px] tracking-tight text-text-secondary">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; label: string; text: string }> = {
    open: { bg: 'bg-status-open/10', label: 'Open', text: 'text-status-open' },
    in_progress: { bg: 'bg-status-in-progress/15', label: 'In progress', text: 'text-[#9a6a00]' },
    resolved: { bg: 'bg-status-resolved/10', label: 'Resolved', text: 'text-status-resolved' },
  };
  const s = map[status] || map.open;
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

/* ── inline icons ── */
function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function PlaneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 13v.01M9 17v.01" />
    </svg>
  );
}
function DonutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" className="opacity-30" />
      <path d="M12 3a9 9 0 016.4 15.3" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

const STEPS = [
  {
    title: 'Spot it',
    desc: 'A pothole, broken streetlight, illegal dumping — anything affecting your neighbourhood.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    title: 'Snap it',
    desc: 'Take a photo. Our AI identifies the issue, classifies severity, and writes a formal report.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    title: 'Send it',
    desc: 'Routed to HRM 311 and CC’d to your district councillor. You get a tracking number.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

const ROUTING = [
  {
    name: 'HRM 311',
    badge: '311',
    desc: 'Potholes, sidewalks, graffiti, parks, streetlights, water, property standards.',
    email: 'contactus@311.halifax.ca',
  },
  {
    name: 'NS Public Works',
    badge: 'NS',
    desc: 'Potholes and road damage on 100-series highways and provincial roads.',
    email: 'TPWPAFF@novascotia.ca',
  },
  {
    name: 'Halifax Transit',
    badge: 'HT',
    desc: 'Bus stop damage, transit service complaints, shelter issues.',
    email: 'halifax.transit@halifax.ca',
  },
];

const WHY = [
  {
    title: 'No account needed',
    desc: 'Submit anonymously in 60 seconds. No login, no signup. Optional email if you want updates.',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Councillor CC’d',
    desc: 'Every report goes to 311 and your district councillor. Accountability across all 16 districts.',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    title: 'AI does the paperwork',
    desc: 'Photo analysis identifies the issue, classifies it, and drafts a professional report to review.',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Community-verified',
    desc: 'Neighbours confirm issues still exist or mark them fixed. Crowdsourced accountability you can audit.',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];
