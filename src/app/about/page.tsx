import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About SolveHFX — Independent Civic Reporting for Halifax',
  description:
    'SolveHFX is an independent civic reporting platform built by Halifax residents. AI-powered reports, smart routing to HRM 311, and councillor accountability.',
  alternates: { canonical: 'https://solvehfx.ca/about' },
  openGraph: {
    title: 'About SolveHFX — Independent Civic Reporting',
    description:
      'Built by Halifax residents, for Halifax residents. AI-powered reporting to HRM 311 and your district councillor.',
    url: 'https://solvehfx.ca/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              About
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              A civic tool by Halifax, for Halifax.
            </h1>
            <p className="mt-5 text-[16.5px] text-text-secondary max-w-xl leading-relaxed">
              SolveHFX is an independent reporting platform. We make it easier for
              residents to flag civic issues — and harder for those issues to slip
              through the cracks.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <article className="mx-auto max-w-2xl space-y-10">
          <Reveal>
            <div>
              <h2 className="text-[22px] sm:text-[26px] leading-[1.15] tracking-tight mb-3">
                Why SolveHFX exists.
              </h2>
              <p className="text-[15.5px] text-text-secondary leading-[1.7]">
                Halifax has 311. It works. But we can make it faster. Instead of
                navigating phone menus or filling out forms, SolveHFX lets you
                snap a photo and let AI handle the paperwork. Every report is
                sent to both HRM 311 <em>and</em> your district councillor —
                because elected officials should see what their constituents see
                every day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div>
              <h2 className="text-[22px] sm:text-[26px] leading-[1.15] tracking-tight mb-3">
                What makes us different.
              </h2>
              <ul className="space-y-3.5 text-[15px] text-text-secondary leading-[1.65]">
                {[
                  ['Smart routing', 'We detect whether your issue belongs to HRM, the Province (100-series highways), or Halifax Transit — and route accordingly.'],
                  ['AI-powered drafts', 'Take a photo and our AI identifies the issue type, severity, and drafts a professional report in seconds.'],
                  ['Councillor accountability', 'Every report is CC’d to your district councillor. They represent you — they should know what’s happening in their district.'],
                  ['Anonymous reporting', 'No account required. Submit a report without sharing your identity.'],
                  ['Community verification', 'Other residents can confirm issues still exist or mark them fixed. Public, auditable.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3.5">
                    <span aria-hidden className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                    <span>
                      <strong className="text-text-primary font-medium">{t}.</strong>{' '}
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-rule bg-bg-elev p-5 sm:p-6">
              <p className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-text-secondary mb-2">
                Disclosure
              </p>
              <p className="text-[14.5px] text-text-secondary leading-[1.65]">
                SolveHFX is an independent project. We are not affiliated with,
                endorsed by, or connected to Halifax Regional Municipality, the
                Halifax Regional Council, or any government body. We route
                reports via email to publicly available government contacts.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div>
              <h2 className="text-[22px] sm:text-[26px] leading-[1.15] tracking-tight mb-3">
                Built for Halifax.
              </h2>
              <p className="text-[15.5px] text-text-secondary leading-[1.7]">
                From the waterfront to Clayton Park, from Dartmouth Crossing to
                Musquodoboit Harbour — SolveHFX covers all 16 HRM districts. We
                know Halifax because we live here.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="text-center pt-4">
              <Link href="/report">
                <Button variant="primary" size="lg">
                  Report an issue
                </Button>
              </Link>
            </div>
          </Reveal>
        </article>
      </section>
    </div>
  );
}
