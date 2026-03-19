import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About SolveHFX — Independent Civic Reporting for Halifax',
  description:
    'SolveHFX is an independent civic reporting platform built by Halifax residents. AI-powered reports, smart routing to HRM 311, and councillor accountability.',
  alternates: { canonical: 'https://solvehfx.ca/about' },
  openGraph: {
    title: 'About SolveHFX — Independent Civic Reporting',
    description: 'Built by Halifax residents, for Halifax residents. AI-powered reporting to HRM 311 and your district councillor.',
    url: 'https://solvehfx.ca/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-6">About SolveHFX</h1>

      <div className="prose prose-gray max-w-none space-y-6">
        <p className="text-lg text-text-secondary">
          SolveHFX is an independent civic reporting platform built by Halifax residents,
          for Halifax residents. We make it easy to report neighbourhood issues —
          and make sure they reach the right people.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">Why SolveHFX?</h2>
        <p className="text-text-secondary">
          Halifax has 311. It works. But we can make it faster. Instead of navigating
          phone menus or filling out forms, SolveHFX lets you snap a photo and let AI
          handle the paperwork. Every report is sent to both HRM 311 <em>and</em> your
          district councillor — because elected officials should see what their
          constituents see every day.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">What makes us different</h2>
        <ul className="space-y-2 text-text-secondary">
          <li>
            <strong>Smart routing:</strong> We detect whether your issue belongs to HRM,
            the Province (100-series highways), or Halifax Transit — and route accordingly.
          </li>
          <li>
            <strong>AI-powered:</strong> Take a photo and our AI identifies the issue type,
            severity, and drafts a professional report in seconds.
          </li>
          <li>
            <strong>Councillor accountability:</strong> Every report is CC&apos;d to your
            district councillor. They represent you — they should know what&apos;s happening
            in their district.
          </li>
          <li>
            <strong>Anonymous reporting:</strong> No account required. Submit a report
            without sharing your identity.
          </li>
          <li>
            <strong>Community verification:</strong> Other residents can confirm issues
            still exist or report them as fixed.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-text-primary mt-8">Not affiliated with HRM</h2>
        <p className="text-text-secondary">
          SolveHFX is an independent project. We are not affiliated with, endorsed by,
          or connected to Halifax Regional Municipality, the Halifax Regional Council,
          or any government body. We simply route reports via email to publicly available
          government contacts.
        </p>

        <h2 className="text-xl font-semibold text-text-primary mt-8">Built for Halifax</h2>
        <p className="text-text-secondary">
          From the waterfront to Clayton Park, from Dartmouth Crossing to Musquodoboit
          Harbour — SolveHFX covers all 16 HRM districts. We know Halifax because we
          live here.
        </p>

        <div className="mt-8 text-center">
          <Link href="/report">
            <Button variant="primary" size="lg">
              Report an Issue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
