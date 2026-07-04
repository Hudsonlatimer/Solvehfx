import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report a Civic Issue in Halifax — 60 Seconds',
  description:
    'Report a pothole, graffiti, broken streetlight, or any civic issue in Halifax. Take a photo, let AI draft your report, and submit to HRM 311 in 60 seconds.',
  alternates: { canonical: 'https://www.solvehfx.ca/report' },
  openGraph: {
    title: 'Report a Civic Issue in Halifax — SolveHFX',
    description: 'Snap a photo, AI writes the report, we send it to HRM 311 and your councillor.',
    url: 'https://www.solvehfx.ca/report',
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
