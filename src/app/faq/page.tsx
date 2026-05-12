import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'FAQ — SolveHFX Civic Reporting for Halifax',
  description:
    'Frequently asked questions about SolveHFX — how to report civic issues in Halifax, what happens to your report, privacy, and more.',
  alternates: { canonical: 'https://solvehfx.ca/faq' },
  openGraph: {
    title: 'FAQ — SolveHFX Halifax Civic Reporting',
    description:
      'How to report potholes, graffiti, and civic issues in Halifax. Privacy, AI analysis, district routing, and more.',
    url: 'https://solvehfx.ca/faq',
  },
};

const FAQS = [
  {
    question: 'What is SolveHFX?',
    answer:
      'SolveHFX is a free civic reporting tool for Halifax, Nova Scotia. It lets residents report potholes, graffiti, broken streetlights, and other neighbourhood issues. Our AI analyzes your photo, drafts a professional report, and sends it to HRM 311 and your district councillor automatically.',
  },
  {
    question: 'Is SolveHFX affiliated with Halifax Regional Municipality?',
    answer:
      'No. SolveHFX is an independent project built by Halifax residents. We are not affiliated with, endorsed by, or connected to HRM, Halifax Regional Council, or any government body. We route reports via email to publicly available government contacts.',
  },
  {
    question: 'Do I need an account to submit a report?',
    answer:
      'No. You can submit reports anonymously without creating an account. If you create an account, you can track your reports and receive updates.',
  },
  {
    question: 'What happens to my report after I submit it?',
    answer:
      'Your report is emailed to the appropriate authority — HRM 311, Nova Scotia Public Works, or Halifax Transit — depending on the type of issue. A copy is also sent to your district councillor. Your report also appears on our public map so other residents can verify the issue.',
  },
  {
    question: 'What kinds of issues can I report?',
    answer:
      'Potholes, road damage, sidewalk damage, snow and ice, graffiti, illegal dumping, garbage overflow, broken streetlights, traffic sign issues, abandoned vehicles, parking violations, tree issues, park problems, flooding, sewer issues, bus stop damage, transit complaints, bike lane issues, debris, noise complaints, and more.',
  },
  {
    question: 'How does the AI photo analysis work?',
    answer:
      'When you upload a photo, our AI (powered by Claude) analyzes the image to identify the type of civic issue, assess its severity, and draft a professional report including a title and detailed description. You can edit everything before submitting.',
  },
  {
    question: 'How does SolveHFX know which district I am in?',
    answer:
      'SolveHFX uses GPS coordinates and official HRM district boundary data to automatically determine which of the 16 Halifax districts your issue falls in. This lets us route your report to the correct district councillor.',
  },
  {
    question: 'Is my personal information shared?',
    answer:
      'If you submit anonymously, no personal information is included in the report. We strip EXIF metadata from photos before storing them. We do not sell or share your data with third parties.',
  },
  {
    question: 'Does SolveHFX guarantee my issue will be fixed?',
    answer:
      'No. SolveHFX routes your report to the correct government contacts, but we cannot guarantee response times or resolutions. HRM, the province, and Halifax Transit handle issues independently.',
  },
  {
    question: 'How can I report an issue on a 100-series highway?',
    answer:
      'SolveHFX automatically detects if your issue is on a provincial road (like the 102 or 103 highway) and routes it to Nova Scotia Public Works instead of HRM 311.',
  },
  {
    question: 'Why do you CC my district councillor?',
    answer:
      "We CC your councillor for escalation, not routine service. If your issue doesn't get addressed through the normal 311 queue, your councillor can apply political pressure and request status updates. Councillors are elected to advocate for constituent concerns. Use this for recurring, ignored, or systemic issues — not for every single report.",
  },
  {
    question: 'Should I report to 311 or tell my councillor?',
    answer:
      "Report to 311 first (via SolveHFX). That's the official process. Only contact your councillor directly if: (1) you've reported to 311 and nothing happened after 4+ weeks, or (2) it's a systemic issue affecting your whole block. Councillors appreciate constituent feedback, but they're not service delivery agents.",
  },
  {
    question: "What's the difference between HRM and provincial roads?",
    answer:
      'HRM manages most streets inside the urban core. The province manages 100-series highways (102, 103, 104, 118), some rural roads, and certain arterial routes. SolveHFX detects which authority manages your road and routes accordingly.',
  },
  {
    question: 'How do I avoid frivolous or spam reports?',
    answer:
      'Report only legitimate civic issues: potholes, broken lights, flooding, graffiti, etc. Don\'t report things like "long grass" or minor aesthetic preferences. Multiple frivolous reports waste tax dollars and train HRM to ignore reporting tools.',
  },
  {
    question: 'Can I see which councillors respond to reports?',
    answer:
      'Yes. SolveHFX tracks councillor response rates on our public scorecards. You can see which districts and councillors consistently address resident concerns.',
  },
  {
    question: 'What if I report the same issue twice?',
    answer:
      'SolveHFX prevents duplicate reports on the same location within 48 hours. If an issue persists after a month with no action, you can report again — but include context (e.g. "I reported this 4 weeks ago, still not fixed").',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14 pb-10">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
          <Reveal className="mt-5">
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Frequently asked
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-balance">
              Questions, answered.
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-xl leading-relaxed">
              Everything you need to know about reporting civic issues in
              Halifax with SolveHFX.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ul className="divide-y divide-rule border-y border-rule">
              {FAQS.map((faq, i) => (
                <li key={i}>
                  <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                      <h2 className="text-[15.5px] sm:text-[16px] font-medium text-text-primary leading-snug">
                        {faq.question}
                      </h2>
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-elev text-text-secondary text-[18px] leading-none transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pr-10 text-[14.5px] text-text-secondary leading-[1.7]">
                      {faq.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="mt-14 text-center">
              <p className="text-text-secondary text-[14.5px] mb-5">
                Still curious? Just file a report — it&apos;ll make sense once
                you see it.
              </p>
              <Link href="/report">
                <Button variant="primary" size="lg">
                  Report an issue
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
