import Link from 'next/link';
import Image from 'next/image';
import StatusBadge from './StatusBadge';
import Badge from '@/components/ui/Badge';
import { getCategoryById } from '@/lib/districts';
import type { Report, ReportStatus } from '@/lib/types';

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const category = getCategoryById(report.category);
  const verificationCount = report.verifications?.length || 0;
  const resolvedDate = report.status === 'resolved' && report.resolved_at
    ? new Date(report.resolved_at).toLocaleDateString()
    : null;

  return (
    <Link href={`/reports/${report.id}`}>
      <div className="group rounded-xl border border-rule shadow-sm bg-bg-elev overflow-hidden transition-shadow duration-300 hover:shadow-md">
        {report.photo_url ? (
          <Image
            src={report.photo_url}
            alt={report.title}
            width={400}
            height={200}
            className="w-full h-32 sm:h-40 object-cover"
          />
        ) : (
          <div className="w-full h-32 sm:h-40 bg-black/[0.05] flex items-center justify-center">
            <span className="text-4xl">{category?.icon || '📍'}</span>
          </div>
        )}

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={report.status as ReportStatus} />
            <Badge>{category?.label || report.category}</Badge>
          </div>

          <h3 className="font-semibold text-text-primary line-clamp-2">{report.title}</h3>

          <p className="text-sm text-text-secondary line-clamp-1">
            {report.address || `${report.lat.toFixed(4)}, ${report.lng.toFixed(4)}`}
          </p>

          <div className="flex items-center justify-between text-xs text-text-secondary pt-1">
            <span>{new Date(report.created_at).toLocaleDateString()}</span>
            {verificationCount > 0 && (
              <span>{verificationCount} verification{verificationCount !== 1 ? 's' : ''}</span>
            )}
          </div>

          {resolvedDate && (
            <p className="text-[11px] text-success/80">Resolved {resolvedDate}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
