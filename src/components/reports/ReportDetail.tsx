'use client';

import Image from 'next/image';
import StatusBadge from './StatusBadge';
import VerifyButton from './VerifyButton';
import Badge from '@/components/ui/Badge';
import { getCategoryById } from '@/lib/districts';
import { AUTHORITY_EMAILS } from '@/lib/types';
import type { Report, ReportStatus } from '@/lib/types';

interface ReportDetailProps {
  report: Report;
}

export default function ReportDetail({ report }: ReportDetailProps) {
  const category = getCategoryById(report.category);
  const authority = AUTHORITY_EMAILS[report.road_authority];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {report.photo_url && (
        <div className="rounded-xl overflow-hidden border border-rule">
          <Image
            src={report.photo_url}
            alt={report.title}
            width={800}
            height={500}
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={report.status as ReportStatus} />
          <Badge>
            {category?.icon} {category?.label || report.category}
          </Badge>
          {report.is_anonymous && <Badge>Anonymous</Badge>}
          {report.category === 'snow_ice' && (
            <Badge variant="info">Winter Priority</Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold text-text-primary">{report.title}</h1>

        <p className="text-text-secondary">{report.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-bg p-3">
            <p className="font-medium text-text-primary mb-1">Location</p>
            <p className="text-text-secondary">
              {report.address || `${report.lat.toFixed(5)}, ${report.lng.toFixed(5)}`}
            </p>
          </div>

          {report.districts && (
            <div className="rounded-lg bg-bg p-3">
              <p className="font-medium text-text-primary mb-1">District</p>
              <p className="text-text-secondary">
                District {report.districts.id}: {report.districts.name}
              </p>
              {report.districts.councillor_name && (
                <p className="text-text-secondary">
                  Councillor: {report.districts.councillor_name}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-rule p-4 text-sm">
          <p className="font-medium text-text-primary mb-2">Sent to:</p>
          <ul className="space-y-1 text-text-secondary">
            <li>{authority.name} ({authority.email})</li>
            {report.districts?.councillor_name && (
              <li>
                Councillor {report.districts.councillor_name} ({report.districts.councillor_email})
              </li>
            )}
          </ul>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <h3 className="font-semibold text-text-primary">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-status-open flex-shrink-0" />
              <div>
                <p className="font-medium">Submitted</p>
                <p className="text-text-secondary">
                  {new Date(report.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            {report.verifications && report.verifications.length > 0 && (
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-warning flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    Verified ({report.verifications.length})
                  </p>
                </div>
              </div>
            )}
            {report.status === 'resolved' && report.resolved_at && (
              <div className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-success flex-shrink-0" />
                <div>
                  <p className="font-medium">Resolved</p>
                  <p className="text-text-secondary">
                    {new Date(report.resolved_at).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resolution notes */}
        {report.resolution_notes && report.resolution_notes.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-text-primary">Resolution Notes</h3>
            {report.resolution_notes.map((note) => (
              <div key={note.id} className="rounded-lg bg-green-50 p-3 text-sm">
                <p>{note.note}</p>
                <p className="text-xs text-text-secondary mt-1">
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Verify */}
        <div className="pt-4 border-t border-rule">
          <VerifyButton
            reportId={report.id}
            currentVerifications={report.verifications?.length || 0}
          />
        </div>
      </div>
    </div>
  );
}
