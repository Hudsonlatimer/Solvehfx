import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ISSUE_CATEGORIES } from '@/lib/types';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'SolveHFX — Fix Halifax. Together.',
  description:
    'Report potholes, graffiti, broken streetlights, and civic issues in Halifax. AI drafts your report and sends it to HRM 311 and your district councillor in 60 seconds.',
  alternates: { canonical: 'https://solvehfx.ca' },
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let totalReports = 0;
  let resolvedThisMonth = 0;
  let recentReports: { id: string; title: string; category: string; address: string | null; status: string; created_at: string }[] = [];
  let uniqueDistrictCount = 16;

  try {
    const supabase = await createClient();

    const { count } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true });
    totalReports = count || 0;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { count: resolved } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'resolved')
      .gte('resolved_at', thirtyDaysAgo);
    resolvedThisMonth = resolved || 0;

    const { data: reports } = await supabase
      .from('reports')
      .select('id, title, category, address, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    recentReports = reports || [];

    const { data: activeDistricts } = await supabase
      .from('reports')
      .select('district_id')
      .not('district_id', 'is', null);
    uniqueDistrictCount = new Set(activeDistricts?.map((r) => r.district_id)).size || 16;
  } catch {
    // Supabase unavailable — render with defaults
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#001f3a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Civic reporting for Halifax
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5">
              Fix Halifax.{' '}
              <span className="text-accent">Together.</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl">
              Snap a photo. AI writes the report. We send it to HRM 311 and your
              district councillor. 60 seconds to make your neighbourhood better.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/report">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base px-8">
                  Report an Issue
                </Button>
              </Link>
              <Link href="/map">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-white/80 hover:text-white hover:bg-white/10 border border-white/20 text-base px-8"
                >
                  View Issue Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary tabular-nums">{totalReports || 0}</p>
              <p className="text-sm text-text-secondary mt-1">Reports Filed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success tabular-nums">{resolvedThisMonth || 0}</p>
              <p className="text-sm text-text-secondary mt-1">Resolved (30d)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary tabular-nums">{uniqueDistrictCount}</p>
              <p className="text-sm text-text-secondary mt-1">Districts Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide text-center">How it works</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mt-2 mb-14">
            Three steps. Sixty seconds.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Spot it',
                desc: 'See a pothole, broken light, or graffiti in your neighbourhood.',
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Snap it',
                desc: 'Take a photo. Our AI identifies the issue and drafts a formal report.',
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Send it',
                desc: 'We route your report to HRM 311 and your district councillor automatically.',
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <p className="text-xs font-bold text-accent mb-1">{item.step}</p>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart routing */}
      <section className="bg-[#FAFBFC] py-12 sm:py-20 px-4 sm:px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide text-center">Smart routing</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mt-2 mb-4">
            We know who to call
          </h2>
          <p className="text-center text-text-secondary max-w-xl mx-auto mb-12">
            SolveHFX automatically detects whether your issue should go to the municipality,
            the province, or Halifax Transit — so you don&apos;t have to figure it out.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                name: 'HRM 311',
                desc: 'Potholes, sidewalks, graffiti, parks, streetlights, water, property standards',
                email: 'contactus@311.halifax.ca',
                color: 'bg-blue-50 border-blue-100',
                dot: 'bg-blue-500',
              },
              {
                name: 'NS Public Works',
                desc: 'Potholes and road damage on 100-series highways and provincial roads',
                email: 'TPWPAFF@novascotia.ca',
                color: 'bg-amber-50 border-amber-100',
                dot: 'bg-amber-500',
              },
              {
                name: 'Halifax Transit',
                desc: 'Bus stop damage, transit service complaints, shelter issues',
                email: 'halifax.transit@halifax.ca',
                color: 'bg-green-50 border-green-100',
                dot: 'bg-green-500',
              },
            ].map((auth) => (
              <div key={auth.name} className={`rounded-xl border p-5 ${auth.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${auth.dot}`} />
                  <h3 className="font-semibold text-text-primary text-sm">{auth.name}</h3>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">{auth.desc}</p>
                <p className="text-xs text-text-secondary/70 font-mono">{auth.email}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-text-secondary mt-8">
            Every report is also CC&apos;d to your <strong>district councillor</strong> — all 16 HRM districts covered.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide text-center">Categories</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mt-2 mb-12">
            Report any civic issue
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {ISSUE_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/report?category=${cat.id}`}
                className="group flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-sm transition-all text-center"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[11px] sm:text-xs text-text-secondary group-hover:text-text-primary leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent reports */}
      {recentReports && recentReports.length > 0 && (
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide text-center">Latest activity</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mt-2 mb-10">
              Recent reports
            </h2>
            <div className="space-y-2">
              {recentReports.map((r) => {
                const cat = ISSUE_CATEGORIES.find((c) => c.id === r.category);
                return (
                  <Link
                    key={r.id}
                    href={`/reports/${r.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                  >
                    <span className="text-xl flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                      {cat?.icon || '📍'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-text-primary truncate group-hover:text-primary transition-colors">
                        {r.title}
                      </p>
                      <p className="text-xs text-text-secondary truncate mt-0.5">
                        {r.address || 'Halifax, NS'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`inline-block w-2 h-2 rounded-full mb-1 ${
                        r.status === 'resolved' ? 'bg-success' : r.status === 'in_progress' ? 'bg-warning' : 'bg-status-open'
                      }`} />
                      <p className="text-[11px] text-text-secondary">
                        {new Date(r.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link href="/reports">
                <Button variant="outline" size="sm">
                  View all reports
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* What makes us different */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#FAFBFC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide text-center">Why SolveHFX</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mt-2 mb-12">
            Not just another 311 form
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 014 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 014-4z" /><circle cx="12" cy="6" r="1" /><path d="M8.5 14.5A7 7 0 003 21h18a7 7 0 00-5.5-6.5" />
                  </svg>
                ),
                title: 'No account needed',
                desc: 'Submit anonymously in 60 seconds. No login, no signup, no friction.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                ),
                title: 'Councillor CC',
                desc: 'Every report goes to 311 AND your district councillor. Accountability built in.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ),
                title: 'AI-powered',
                desc: 'Photo analysis identifies the issue, classifies it, and writes a professional report for you.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: 'Community verified',
                desc: 'Neighbours confirm issues still exist or mark them fixed. Crowdsourced accountability.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-text-primary text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Social */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            See something? Say something.
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            It takes 60 seconds. No account required. Your report goes straight to the people who can fix it.
          </p>
          <Link href="/report">
            <Button variant="primary" size="lg" className="text-base px-10">
              Report an Issue
            </Button>
          </Link>

          {/* Social follow */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-text-secondary mb-4">Follow SolveHFX for updates</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://x.com/SolveHFX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on X"
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-primary hover:text-white text-text-secondary flex items-center justify-center transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/SolveHFX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white text-text-secondary flex items-center justify-center transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com/SolveHFX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Facebook"
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-[#1877F2] hover:text-white text-text-secondary flex items-center justify-center transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
