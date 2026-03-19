import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'FAQ — SolveHFX Civic Reporting for Halifax',
  description:
    'Frequently asked questions about SolveHFX — how to report civic issues in Halifax, what happens to your report, privacy, and more.',
  alternates: { canonical: 'https://solvehfx.ca/faq' },
  openGraph: {
    title: 'FAQ — SolveHFX Halifax Civic Reporting',
    description: 'How to report potholes, graffiti, and civic issues in Halifax. Privacy, AI analysis, district routing, and more.',
    url: 'https://solvehfx.ca/faq',
  },
};

const faqs = [
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
      'You can report potholes, road damage, sidewalk damage, snow and ice, graffiti, illegal dumping, garbage overflow, broken streetlights, traffic sign issues, abandoned vehicles, parking violations, tree issues, park problems, flooding, sewer issues, bus stop damage, transit complaints, bike lane issues, debris, noise complaints, and more.',
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
];

// FAQ structured data for Google rich results
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary">
            Everything you need to know about reporting civic issues in Halifax with SolveHFX.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-100 bg-white p-5"
            >
              <h2 className="font-semibold text-text-primary mb-2">
                {faq.question}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-text-secondary mb-4">
            Still have questions? Ready to report an issue?
          </p>
          <Link href="/report">
            <Button variant="primary" size="lg">
              Report an Issue
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
