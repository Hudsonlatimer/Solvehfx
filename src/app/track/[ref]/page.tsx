import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/server';
import { ISSUE_CATEGORIES } from '@/lib/types';
import type { Report, District } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ ref: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  return {
    title: `Report ${ref} — SolveHFX`,
    description: `Track the status of civic report ${ref} in Halifax.`,
  };
}

const STATUS_CONFIG = {
  open: {
    label: 'Open',
    color: 'bg-status-open/10 text-status-open',
    icon: '📋',
    description: 'Your report has been submitted and is awaiting review.',
    step: 1,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-status-in-progress/15 text-[#9a6a00]',
    icon: '🔧',
    description: 'Your issue has been acknowledged and is being addressed.',
    step: 2,
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-status-resolved/10 text-status-resolved',
    icon: '✅',
    description: 'This issue has been resolved. Thank you for reporting!',
    step: 3,
  },
};

// Without generated DB types, Supabase infers the joined districts relation as
// an array; it's to-one in practice, so shape it at this boundary.
type TrackedReport = Omit<Report, 'districts'> & { districts: District | null };

export default async function TrackRefPage({ params }: Props) {
  const { ref } = await params;

  let report: TrackedReport | null = null;
  let verificationCount = 0;

  try {
    const supabase = await createClient();
    // Public page, reachable by reference number alone — whitelist columns so
    // contact details and client_ip stay server-side.
    const { data } = await supabase
      .from('reports')
      .select('id, reference_number, title, description, category, lat, lng, address, district_id, road_authority, photo_url, status, created_at, resolved_at, estimated_resolution_date, districts(id,name,councillor_name), verifications(id,type,created_at)')
      .eq('reference_number', ref.toUpperCase())
      .single();
    report = data as unknown as TrackedReport;
    verificationCount = report?.verifications?.length || 0;
  } catch {
    // Supabase unavailable
  }

  if (!report) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Report Not Found</h1>
        <p className="text-text-secondary mb-6">
          No report found with reference <strong className="font-mono">{ref}</strong>.
          Please double-check the reference number.
        </p>
        <Link href="/track">
          <Button variant="primary">Try Again</Button>
        </Link>
      </div>
    );
  }

  const status = STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.open;
  const cat = ISSUE_CATEGORIES.find((c) => c.id === report.category);
  const createdDate = new Date(report.created_at).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const daysSince = Math.floor((Date.now() - new Date(report.created_at).getTime()) / (1000 * 60 * 60 * 24));
  const estimatedResolutionDate = report.estimated_resolution_date
    ? new Date(report.estimated_resolution_date).toLocaleDateString('en-CA', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/track"
          className="text-sm text-text-secondary hover:text-primary transition-colors mb-4 inline-block"
        >
          &larr; Track another report
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-sm text-text-secondary bg-black/[0.05] px-2 py-1 rounded">{ref}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}>
            {status.icon} {status.label}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary">{report.title}</h1>
      </div>

      {/* Status timeline */}
      <div className="rounded-xl border border-rule bg-bg-elev p-5 mb-6">
        <h2 className="font-semibold text-text-primary mb-4">Status Timeline</h2>
        <div className="space-y-4">
          {[
            { label: 'Submitted', desc: `Report filed on ${createdDate}`, active: status.step >= 1 },
            {
              label: 'Under Review',
              desc:
                estimatedResolutionDate && status.step < 3
                  ? `Sent to authorities for review · Est. resolution: ${estimatedResolutionDate}`
                  : 'Sent to authorities for review',
              active: status.step >= 2,
            },
            { label: 'Resolved', desc: report.resolved_at ? `Resolved on ${new Date(report.resolved_at).toLocaleDateString('en-CA')}` : 'Awaiting resolution', active: status.step >= 3 },
          ].map((item, i) => (
            <div key={item.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.active ? 'bg-primary text-white' : 'bg-black/[0.05] text-text-secondary'
                }`}>
                  {item.active ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < 2 && (
                  <div className={`w-0.5 h-6 ${item.active ? 'bg-primary' : 'bg-rule'}`} />
                )}
              </div>
              <div>
                <p className={`font-medium text-sm ${item.active ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {item.label}
                </p>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report details */}
      <div className="rounded-xl border border-rule bg-bg-elev p-5 mb-6">
        <h2 className="font-semibold text-text-primary mb-3">Report Details</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">{cat?.icon || '📍'}</span>
            <Badge variant="info">{cat?.label || report.category}</Badge>
          </div>
          <p className="text-text-secondary">{report.description}</p>
          {report.address && (
            <div className="flex items-start gap-2 text-text-secondary">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{report.address}</span>
            </div>
          )}
          {report.districts && (
            <div className="flex items-start gap-2 text-text-secondary">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <span>
                District {report.districts.id}: {report.districts.name}
                {report.districts.councillor_name && (
                  <> &middot; Councillor {report.districts.councillor_name}</>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Community verification */}
      <div className="rounded-xl border border-rule bg-bg-elev p-5 mb-6">
        <h2 className="font-semibold text-text-primary mb-2">Community Activity</h2>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{verificationCount}</p>
            <p className="text-xs text-text-secondary">Verifications</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">{daysSince}</p>
            <p className="text-xs text-text-secondary">Days since filed</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href={`/reports/${report.id}`}>
          <Button variant="primary" className="w-full sm:w-auto">View Full Report</Button>
        </Link>
        <Link href="/report">
          <Button variant="outline" className="w-full sm:w-auto">Report Another Issue</Button>
        </Link>
      </div>
    </div>
  );
}
