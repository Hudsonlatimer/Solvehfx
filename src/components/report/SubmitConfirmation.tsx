'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getCategoryById } from '@/lib/districts';
import { AUTHORITY_EMAILS, type RoadAuthority, type District } from '@/lib/types';

interface SubmitConfirmationProps {
  reportId: string | null;
  referenceNumber: string | null;
  title: string;
  category: string;
  address: string;
  photoPreview: string | null;
  district: District | null;
  authority: RoadAuthority;
  submitted: boolean;
  submitting: boolean;
  onSubmit: () => void;
}

export default function SubmitConfirmation({
  reportId,
  referenceNumber,
  title,
  category,
  address,
  photoPreview,
  district,
  authority,
  submitted,
  submitting,
  onSubmit,
}: SubmitConfirmationProps) {
  const cat = getCategoryById(category);
  const authorityInfo = AUTHORITY_EMAILS[authority];

  if (submitted && reportId) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
          <svg className="h-8 w-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text-primary">Report Submitted!</h2>
          <p className="mt-2 text-text-secondary">
            Your report has been sent to <strong>{authorityInfo.name}</strong>
            {district?.councillor_name && (
              <> and <strong>Councillor {district.councillor_name}</strong></>
            )}
          </p>
        </div>

        {/* Reference number card */}
        {referenceNumber && (
          <div className="mx-auto max-w-sm rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs text-text-secondary mb-1">Your tracking reference</p>
            <p className="text-2xl font-bold text-primary font-mono tracking-wider">{referenceNumber}</p>
            <p className="text-xs text-text-secondary mt-2">
              Save this number to check your report status anytime
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {referenceNumber && (
            <Link href={`/track/${referenceNumber}`}>
              <Button variant="primary">Track Your Report</Button>
            </Link>
          )}
          <Link href={`/reports/${reportId}`}>
            <Button variant="outline">View Report Details</Button>
          </Link>
          <Link href="/report">
            <Button variant="outline">Report Another Issue</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white">
        {photoPreview && (
          <Image
            src={photoPreview}
            alt="Issue photo"
            width={600}
            height={200}
            className="w-full h-40 sm:h-48 object-cover"
          />
        )}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cat?.icon}</span>
            <Badge variant="info">{cat?.label || category}</Badge>
          </div>
          <h3 className="font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary">{address || 'Location not specified'}</p>

          {district && (
            <div className="text-sm text-text-secondary">
              <p>
                District {district.id}: {district.name}
              </p>
              {district.councillor_name && (
                <p>Councillor: {district.councillor_name}</p>
              )}
            </div>
          )}

          <div className="pt-3 border-t border-gray-100 text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Your report will be sent to:</p>
            <ul className="space-y-1">
              <li>
                {authorityInfo.name} ({authorityInfo.email})
              </li>
              {district?.councillor_name && (
                <li>
                  Councillor {district.councillor_name} ({district.councillor_email})
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full"
        loading={submitting}
        onClick={onSubmit}
      >
        Submit Report
      </Button>
    </div>
  );
}
