import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { ISSUE_CATEGORIES } from '@/lib/types';
import { createServiceClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'SolveHFX — Fix Halifax. Together.',
  description:
    'Report potholes, graffiti, broken streetlights, and civic issues in Halifax. AI drafts your report and sends it to HRM 311 and your district councillor in 60 seconds.',
  alternates: { canonical: 'https://solvehfx.ca' },
};

// Cache the homepage HTML and refresh stats at most once a minute. This keeps
// the page off the request-time critical path: visitors get instant cached
// HTML instead of waiting on (a possibly cold) Supabase on every load.
export const revalidate = 60;

type ReportRow = {
  id: string;
  title: string;
  category: string;
  address: string | null;
  status: string;
  created_at: string;
};

export default async function HomePage() {
  let totalReports = 0;
  let resolvedThisMonth = 0;
  let totalResolved = 0;
  let recentReports: ReportRow[] = [];
  let uniqueDistrictCount = 16;
  let avgResolutionDays = 0;

  try {
    const supabase = await createServiceClient();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Fail fast: if Supabase is cold/unreachable, fall back to defaults rather
    // than blocking the render. The build cache means most visitors never wait.
    const withTimeout = <T,>(p: PromiseLike<T>, ms = 2500): Promise<T> =>
      Promise.race([
        p as Promise<T>,
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error('Supabase timeout')), ms)
        ),
      ]);

    // Run every stat query in parallel — one round-trip of latency, not six.
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

    totalReports = totalRes.count || 0;
    resolvedThisMonth = resolvedMonthRes.count || 0;
    totalResolved = allResolvedRes.count || 0;

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

    recentReports = recentRes.data || [];
    uniqueDistrictCount =
      new Set(districtsRes.data?.map((r) => r.district_id)).size || 16;
  } catch {
    // Supabase unavailable or slow — render with defaults
  }

  const resolutionRate =
    totalReports > 0 ? Math.round((totalResolved / totalReports) * 100) : 0;

  return (
    <div>
      {/* ───────────────────── Hero ───────────────────── */}
      <section className="relative isolate overflow-hidden bg-primary text-white">
        {/* layered gradient + dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(80% 60% at 20% 0%, #0057A8 0%, transparent 60%), linear-gradient(180deg, #003865 0%, #00203D 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* subtle bottom seam */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.18))',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.02] tracking-tight text-balance">
              Fix Halifax.
              <br />
              <span className="text-accent italic" style={{ fontWeight: 400 }}>
                Together.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[17px] leading-[1.55] text-white/72">
              Snap a photo of a pothole, broken light, or anything else.
              Our AI drafts the report. We send it straight to{' '}
              <span className="text-white">HRM 311</span> and your{' '}
              <span className="text-white">district councillor</span>. Sixty
              seconds, no account.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/report">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Report an issue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <Link href="/map">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-white/80 hover:text-white hover:bg-white/10 border border-white/15"
                >
                  See the issue map
                </Button>
              </Link>
            </div>

            {/* Inline proof — replaces the orphan stat strip */}
            <dl className="mt-14 grid grid-cols-3 gap-x-6 gap-y-2 max-w-2xl border-t border-white/10 pt-8">
              <div>
                <dt className="text-[11.5px] uppercase tracking-[0.12em] text-white/55">Reports filed</dt>
                <dd className="stat text-[34px] sm:text-[40px] leading-none mt-2 text-white">
                  {totalReports.toLocaleString('en-CA')}
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] uppercase tracking-[0.12em] text-white/55">Resolved · 30d</dt>
                <dd className="stat text-[34px] sm:text-[40px] leading-none mt-2 text-accent">
                  {resolvedThisMonth.toLocaleString('en-CA')}
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] uppercase tracking-[0.12em] text-white/55">HRM districts</dt>
                <dd className="stat text-[34px] sm:text-[40px] leading-none mt-2 text-white">
                  <span className="text-white">{uniqueDistrictCount}</span>
                  <span className="text-white/40">/16</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ─────────── Track / quick-action band ─────────── */}
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/track"
            className="group flex items-center gap-4 rounded-xl border border-rule bg-bg/40 px-4 py-3.5 hover:border-primary/30 hover:bg-primary/[0.03] transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[14.5px] text-text-primary leading-tight">
                Already submitted a report? Track it.
              </p>
              <p className="text-[12.5px] text-text-secondary mt-0.5 leading-snug">
                Use your reference number to check status — no account needed.
              </p>
            </div>
            <span className="text-text-secondary group-hover:text-primary transition-colors" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ───────────────── Impact dashboard ───────────────── */}
      {totalReports > 0 && (
        <section className="border-b border-rule bg-bg-elev">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Reveal>
              <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
                <div>
                  <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
                    Community impact
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-[34px] leading-[1.05] tracking-tight">
                    What we&apos;ve done together.
                  </h2>
                </div>
                <Link
                  href="/districts"
                  className="text-sm text-primary hover:underline underline-offset-4"
                >
                  District scorecards →
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <ImpactCard label="Resolution rate" value={`${resolutionRate}%`} tone="primary" />
                <ImpactCard label="Issues resolved" value={totalResolved} tone="accent" />
                <ImpactCard
                  label="Avg days to fix"
                  value={avgResolutionDays || '—'}
                  tone="primary"
                />
                <ImpactCard
                  label="Districts active"
                  value={`${uniqueDistrictCount}/16`}
                  tone="primary"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ───────────────── How it works ───────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              How it works
            </p>
            <h2 className="mt-2 text-3xl sm:text-[40px] leading-[1.05] tracking-tight">
              Three steps. Sixty seconds.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary text-[15.5px] leading-relaxed">
              Reporting a civic issue in Halifax shouldn&apos;t take an
              afternoon of forms and phone trees.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 relative">
            {/* connecting line on desktop */}
            <div aria-hidden className="hidden sm:block absolute left-[16.66%] right-[16.66%] top-6 h-px bg-rule" />

            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative">
                  <div className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-bg-elev text-primary shadow-civic">
                    {s.icon}
                  </div>
                  <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/60 text-center">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1.5 text-[20px] tracking-tight text-center">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-text-secondary text-center max-w-xs mx-auto">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Smart routing — the trust section ───────────── */}
      <section className="bg-primary text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-accent">
                  Smart routing
                </p>
                <h2 className="mt-2 text-3xl sm:text-[36px] leading-[1.08] tracking-tight text-balance">
                  We figure out who&apos;s actually responsible.
                </h2>
                <p className="mt-5 text-white/70 text-[15.5px] leading-relaxed max-w-md">
                  HRM, Province, or Halifax Transit — your issue lands with
                  the right authority and gets CC&apos;d to your district
                  councillor automatically. All sixteen districts covered.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                {ROUTING.map((auth) => (
                  <div
                    key={auth.name}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`h-2 w-2 rounded-full ${auth.dot}`} />
                      <h3 className="font-medium text-[14.5px] tracking-tight">{auth.name}</h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/65 mb-4">
                      {auth.desc}
                    </p>
                    <p className="text-[11.5px] text-white/40 font-mono break-all">
                      {auth.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Categories ───────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-bg-elev border-y border-rule">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
              <div>
                <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
                  What can I report?
                </p>
                <h2 className="mt-2 text-3xl sm:text-[34px] leading-[1.05] tracking-tight">
                  Anything that affects your neighbourhood.
                </h2>
              </div>
              <p className="text-sm text-text-secondary max-w-xs">
                28 categories, automatically routed to the right authority.
              </p>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5">
              {ISSUE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/report?category=${cat.id}`}
                  className="group flex flex-col items-start gap-2.5 rounded-xl border border-rule bg-bg-elev p-3.5 hover:border-primary/25 hover:bg-primary/[0.02] hover:shadow-civic transition-all"
                >
                  <span className="text-[20px] leading-none group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="text-[12.5px] font-medium leading-tight text-text-primary">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── Recent reports ───────────────── */}
      {recentReports && recentReports.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
                    Latest activity
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-[34px] leading-[1.05] tracking-tight">
                    What Halifax is reporting.
                  </h2>
                </div>
                <Link
                  href="/reports"
                  className="text-sm text-primary hover:underline underline-offset-4"
                >
                  View all →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <ul className="divide-y divide-rule border-y border-rule">
                {recentReports.map((r) => {
                  const cat = ISSUE_CATEGORIES.find((c) => c.id === r.category);
                  return (
                    <li key={r.id}>
                      <Link
                        href={`/reports/${r.id}`}
                        className="group flex items-center gap-4 py-4 hover:bg-bg/60 -mx-2 px-2 rounded-lg transition-colors"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-bg-elev border border-rule text-[20px]">
                          {cat?.icon || '📍'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[14.5px] text-text-primary truncate group-hover:text-primary transition-colors">
                            {r.title}
                          </p>
                          <p className="text-[12.5px] text-text-secondary truncate mt-0.5">
                            {r.address || 'Halifax, NS'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <StatusBadge status={r.status} />
                          <time className="text-[11.5px] text-text-muted num">
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
          </div>
        </section>
      )}

      {/* ───────────── Why SolveHFX ───────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-bg-elev border-t border-rule">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Why SolveHFX
            </p>
            <h2 className="mt-2 text-3xl sm:text-[40px] leading-[1.05] tracking-tight">
              Not another forgotten form.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary text-[15.5px] leading-relaxed">
              Built by Halifax residents who got tired of issues disappearing
              into a 311 queue.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="h-full rounded-2xl border border-rule bg-bg-elev p-6 hover:border-primary/20 hover:shadow-civic-md transition-all">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-[16.5px] tracking-tight mb-2">{item.title}</h3>
                  <p className="text-[13.5px] text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Closing CTA ───────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              See something?
              <br />
              <span className="italic text-primary" style={{ fontWeight: 400 }}>
                Say something.
              </span>
            </h2>
            <p className="mt-6 text-[16px] text-text-secondary leading-relaxed max-w-md mx-auto">
              Sixty seconds. No account. Your report goes straight to the
              people who can fix it.
            </p>
            <div className="mt-9 flex items-center justify-center gap-3">
              <Link href="/report">
                <Button variant="primary" size="lg">
                  Report an issue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="ghost" size="lg">
                  How it works
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── helpers ──────────────────────── */

function ImpactCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: 'primary' | 'accent';
}) {
  return (
    <div className="rounded-xl border border-rule bg-bg-elev p-5 sm:p-6">
      <p className="stat text-[34px] sm:text-[38px] leading-none">
        <span className={tone === 'accent' ? 'text-accent-hover' : 'text-primary'}>
          {value}
        </span>
      </p>
      <p className="mt-3 text-[12.5px] text-text-secondary tracking-tight">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { dot: string; label: string; text: string }> = {
    open: { dot: 'bg-status-open', label: 'Open', text: 'text-status-open' },
    in_progress: { dot: 'bg-status-in-progress', label: 'In progress', text: 'text-status-in-progress' },
    resolved: { dot: 'bg-status-resolved', label: 'Resolved', text: 'text-status-resolved' },
  };
  const s = map[status] || map.open;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
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
    desc: 'Potholes, sidewalks, graffiti, parks, streetlights, water, property standards.',
    email: 'contactus@311.halifax.ca',
    dot: 'bg-blue-400',
  },
  {
    name: 'NS Public Works',
    desc: 'Potholes and road damage on 100-series highways and provincial roads.',
    email: 'TPWPAFF@novascotia.ca',
    dot: 'bg-amber-300',
  },
  {
    name: 'Halifax Transit',
    desc: 'Bus stop damage, transit service complaints, shelter issues.',
    email: 'halifax.transit@halifax.ca',
    dot: 'bg-emerald-400',
  },
];

const WHY = [
  {
    title: 'No account needed',
    desc: 'Submit anonymously in 60 seconds. No login, no signup, no friction. Optional email if you want updates.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: 'Councillor CC’d',
    desc: 'Every report goes to 311 and your district councillor. Built-in accountability across all 16 districts.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    title: 'AI does the paperwork',
    desc: 'Photo analysis identifies the issue, classifies it, and drafts a professional report for you to review.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Community-verified',
    desc: 'Neighbours confirm issues still exist or mark them fixed. Crowdsourced accountability you can audit.',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];
