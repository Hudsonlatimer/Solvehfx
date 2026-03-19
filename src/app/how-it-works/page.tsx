import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'How SolveHFX Works — Report Issues in 60 Seconds',
  description:
    'Report a civic issue in Halifax in 60 seconds. Snap a photo, AI drafts your report, and SolveHFX sends it to HRM 311 and your district councillor automatically.',
  alternates: { canonical: 'https://solvehfx.ca/how-it-works' },
  openGraph: {
    title: 'How SolveHFX Works — 60 Second Civic Reporting',
    description: 'Spot it, snap it, send it. AI drafts the report and we route it to HRM 311 and your councillor.',
    url: 'https://solvehfx.ca/how-it-works',
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Spot the Issue',
      icon: '👀',
      description:
        'See a pothole on Barrington Street? Broken streetlight on Gottingen? Graffiti in Point Pleasant Park? Illegal dumping behind your building? Any civic issue you encounter.',
    },
    {
      number: 2,
      title: 'Drop a Pin',
      icon: '📍',
      description:
        'Open SolveHFX and set your location. Use GPS auto-detect or drag the pin on the map. We automatically identify your HRM district and councillor.',
    },
    {
      number: 3,
      title: 'Snap a Photo',
      icon: '📸',
      description:
        'Take a photo or upload one from your gallery. Our AI (powered by Claude) analyzes the image, identifies the issue type, and drafts a professional report — in seconds.',
    },
    {
      number: 4,
      title: 'Review & Edit',
      icon: '✏️',
      description:
        'Review the AI-generated report. Edit the title, description, or category if needed. Toggle anonymous submission if you prefer. You are always in control of what gets sent.',
    },
    {
      number: 5,
      title: 'Submit',
      icon: '📨',
      description:
        'Hit submit. SolveHFX sends your report to the right authority — HRM 311, Nova Scotia Public Works, or Halifax Transit — AND CCs your district councillor. Two emails, one click.',
    },
    {
      number: 6,
      title: 'Track & Verify',
      icon: '📊',
      description:
        'Your report appears on the public map. Other residents can verify they have seen the same issue. Sign in to track your submissions and mark them resolved when fixed.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-text-primary mb-3">How SolveHFX Works</h1>
        <p className="text-lg text-text-secondary">
          60 seconds. That&apos;s all it takes to report a civic issue and get it to the right people.
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-3 sm:gap-5">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                {step.icon}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-1">
                Step {step.number}: {step.title}
              </h2>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary/5 rounded-xl p-6">
        <h3 className="font-semibold text-text-primary mb-3">Where do reports go?</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>
            <strong>Most issues</strong> (potholes, sidewalks, graffiti, parks, streetlights) &rarr;{' '}
            <span className="text-primary">HRM 311</span> (contactus@311.halifax.ca)
          </p>
          <p>
            <strong>100-series highways</strong> (potholes, road damage on highways) &rarr;{' '}
            <span className="text-primary">Nova Scotia Public Works</span> (TPWPAFF@novascotia.ca)
          </p>
          <p>
            <strong>Transit issues</strong> (bus stops, transit complaints) &rarr;{' '}
            <span className="text-primary">Halifax Transit</span> (halifax.transit@halifax.ca)
          </p>
          <p className="mt-3">
            <strong>Every report</strong> is also CC&apos;d to your district councillor.
            Halifax has 16 districts — we look up yours automatically by GPS.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/report">
          <Button variant="primary" size="lg">
            Report Your First Issue
          </Button>
        </Link>
      </div>
    </div>
  );
}
