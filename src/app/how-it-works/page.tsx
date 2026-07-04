import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'How SolveHFX Works — Report Issues in 60 Seconds',
  description:
    'Report a civic issue in Halifax in 60 seconds. Snap a photo, AI drafts your report, and SolveHFX sends it to HRM 311 and your district councillor automatically.',
  alternates: { canonical: 'https://www.solvehfx.ca/how-it-works' },
  openGraph: {
    title: 'How SolveHFX Works — 60 Second Civic Reporting',
    description:
      'Spot it, snap it, send it. AI drafts the report and we route it to HRM 311 and your councillor.',
    url: 'https://www.solvehfx.ca/how-it-works',
  },
};

const STEPS = [
  {
    title: 'Spot the issue',
    desc: 'A pothole on Barrington, a broken light on Gottingen, graffiti in Point Pleasant — anything affecting your neighbourhood is fair game.',
  },
  {
    title: 'Drop a pin',
    desc: 'Set your location with GPS or by dragging the map pin. We auto-detect your HRM district and identify your councillor.',
  },
  {
    title: 'Snap a photo',
    desc: 'Take a photo or upload one. Our AI (Claude) classifies the issue, gauges severity, and drafts a professional report — usually in under five seconds.',
  },
  {
    title: 'Review & edit',
    desc: 'Read the AI draft. Tweak the title, description, or category. Toggle anonymous if you prefer. You decide what gets sent.',
  },
  {
    title: 'Submit',
    desc: 'One click sends it to the right authority — HRM 311, NS Public Works, or Halifax Transit — and CC’s your district councillor.',
  },
  {
    title: 'Track & verify',
    desc: 'Your report appears on the public map. Other residents can confirm the issue still exists. Use your reference number to track resolution.',
  },
];

const ROUTING = [
  {
    label: 'Most issues',
    examples: 'Potholes · sidewalks · graffiti · parks · streetlights · property standards',
    to: 'HRM 311',
    email: 'contactus@311.halifax.ca',
  },
  {
    label: '100-series highways',
    examples: 'Potholes & road damage on highways 102, 103, 104, 118',
    to: 'NS Public Works',
    email: 'TPWPAFF@novascotia.ca',
  },
  {
    label: 'Transit issues',
    examples: 'Bus stop damage · shelter issues · transit complaints',
    to: 'Halifax Transit',
    email: 'halifax.transit@halifax.ca',
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'How it works' }]} />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              How it works
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              Sixty seconds to fix something in Halifax.
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-xl leading-relaxed">
              Six tiny steps. No forms. No phone trees. Most reports take less time
              than ordering coffee.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 sm:space-y-12 before:absolute before:left-[19px] sm:before:left-[23px] before:top-3 before:bottom-3 before:w-px before:bg-rule">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 40} as="div">
                <li className="relative flex gap-4 sm:gap-6">
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-bg-elev border border-rule text-primary shadow-civic">
                      <span className="num text-[14px] sm:text-[15px] font-semibold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="pt-1 sm:pt-1.5">
                    <h3 className="text-[18px] sm:text-[19px] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] sm:text-[15px] text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-bg-elev border-y border-rule py-14 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Smart routing
            </p>
            <h2 className="mt-2 text-2xl sm:text-[32px] leading-[1.1] tracking-tight">
              Where reports actually go.
            </h2>
            <p className="mt-3 text-[14.5px] text-text-secondary leading-relaxed max-w-xl">
              The right authority gets the email. Your district councillor is
              always CC&apos;d — accountability built in.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3">
            {ROUTING.map((r, i) => (
              <Reveal key={r.to} delay={i * 50}>
                <div className="rounded-xl border border-rule bg-bg p-4 sm:p-5 grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 items-baseline">
                  <div>
                    <p className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-text-muted">
                      {r.label}
                    </p>
                    <p className="mt-1.5 text-[13.5px] text-text-secondary leading-relaxed">
                      {r.examples}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[14.5px] font-medium text-text-primary tracking-tight">
                      → {r.to}
                    </p>
                    <p className="text-[11.5px] text-text-muted font-mono break-all mt-0.5">
                      {r.email}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 text-[13px] text-text-secondary">
              Every report is also CC&apos;d to your district councillor — all 16
              HRM districts covered.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-[32px] leading-[1.1] tracking-tight">
              Ready when you are.
            </h2>
            <p className="mt-3 text-text-secondary text-[15px] leading-relaxed">
              First report takes about a minute. Every one after that is faster.
            </p>
            <div className="mt-7">
              <Link href="/report">
                <Button variant="primary" size="lg">
                  Report your first issue
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
