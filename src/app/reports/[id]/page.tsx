import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ReportDetail from '@/components/reports/ReportDetail';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('reports')
    .select('title, description, address, photo_url, category')
    .eq('id', id)
    .single();

  const title = data?.title || 'Civic Issue Report';
  const description = data?.description
    ? `${data.description.slice(0, 155)}…`
    : 'View this civic issue report on SolveHFX — civic reporting for Halifax.';

  return {
    title,
    description,
    alternates: { canonical: `https://solvehfx.ca/reports/${id}` },
    openGraph: {
      title: `${title} — SolveHFX`,
      description,
      url: `https://solvehfx.ca/reports/${id}`,
      ...(data?.photo_url && {
        images: [{ url: data.photo_url, width: 800, height: 600, alt: title }],
      }),
    },
    twitter: {
      card: data?.photo_url ? 'summary_large_image' : 'summary',
      title: `${title} — SolveHFX`,
      description,
      ...(data?.photo_url && { images: [data.photo_url] }),
    },
  };
}

export default async function ReportDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: report, error } = await supabase
    .from('reports')
    .select('*, districts(*), verifications(*), resolution_notes(*)')
    .eq('id', id)
    .single();

  if (error || !report) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ReportDetail report={report} />
    </div>
  );
}
