import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Reports',
  description: 'View and manage your submitted civic issue reports on SolveHFX.',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
