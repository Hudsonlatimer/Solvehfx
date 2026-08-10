import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ReportDetail from '@/components/reports/ReportDetail';
import type { Metadata } from 'next';
import type { Report } from '@/lib/types';

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
    alternates: { canonical: `https://www.solvehfx.ca/reports/${id}` },
    openGraph: {
      title: `${title} — SolveHFX`,
      description,
      url: `https://www.solvehfx.ca/reports/${id}`,
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

  // This report object is passed to <ReportDetail>, a client component, so
  // everything selected here is serialized into the payload sent to the
  // browser. Whitelist public columns — never '*', which would ship
  // contact_name, contact_email, and client_ip to every visitor.
  const { data: report, error } = await supabase
    .from('reports')
    .select('id, reference_number, title, description, category, lat, lng, address, district_id, road_authority, photo_url, status, created_at, resolved_at, estimated_resolution_date, hrm_responded, councillor_responded, is_anonymous, districts(id,name,councillor_name,councillor_email), verifications(id,report_id,type,photo_url,created_at), resolution_notes(*)')
    .eq('id', id)
    .single();

  if (error || !report) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Without generated DB types, Supabase infers the joined districts as an
          array; the relation is to-one in practice. Cast at this boundary. */}
      <ReportDetail report={report as unknown as Report} />
    </div>
  );
}
