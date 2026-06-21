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
  onSubmit: (force?: boolean) => void;
  isDuplicate?: boolean;
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
  isDuplicate,
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
          <h2 className="text-[clamp(1.5rem,4vw,2rem)] tracking-tight text-text-primary">
            Report submitted
          </h2>
          <p className="mt-2 text-[14.5px] text-text-secondary max-w-md mx-auto leading-relaxed">
            Sent to <strong className="text-text-primary">{authorityInfo.name}</strong>
            {district?.councillor_name && (
              <> and <strong className="text-text-primary">Councillor {district.councillor_name}</strong></>
            )}
            .
          </p>
        </div>

        {/* Reference number card */}
        {referenceNumber && (
          <div className="mx-auto max-w-sm rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-text-muted mb-1.5">
              Your tracking reference
            </p>
            <p className="stat text-[26px] text-primary font-mono tracking-wider num">{referenceNumber}</p>
            <p className="text-[12.5px] text-text-secondary mt-2">
              Save this to check your report status anytime.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {referenceNumber && (
            <Link href={`/track/${referenceNumber}`}>
              <Button variant="primary">Track your report</Button>
            </Link>
          )}
          <Link href={`/reports/${reportId}`}>
            <Button variant="outline">View report details</Button>
          </Link>
          <Link href="/report">
            <Button variant="ghost">Report another issue</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-rule shadow-civic overflow-hidden bg-bg-elev">
        {photoPreview && (
          <Image
            src={photoPreview}
            alt="Issue photo"
            width={600}
            height={200}
            className="w-full h-40 sm:h-48 object-cover"
          />
        )}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cat?.icon}</span>
            <Badge variant="info">{cat?.label || category}</Badge>
          </div>
          <h3 className="text-[17px] tracking-tight text-text-primary">{title}</h3>
          <p className="text-[13.5px] text-text-secondary">{address || 'Location not specified'}</p>

          {district && (
            <div className="text-[13.5px] text-text-secondary">
              <p>
                District {district.id}: {district.name}
              </p>
              {district.councillor_name && (
                <p>Councillor: {district.councillor_name}</p>
              )}
            </div>
          )}

          <div className="pt-3.5 border-t border-rule text-[13.5px] text-text-secondary">
            <p className="font-medium text-text-primary mb-1.5">Your report will be sent to:</p>
            <ul className="space-y-1">
              <li className="flex items-center gap-2">
                <Dot /> {authorityInfo.name}{' '}
                <span className="text-text-muted">({authorityInfo.email})</span>
              </li>
              {district?.councillor_name && (
                <li className="flex items-center gap-2">
                  <Dot /> Councillor {district.councillor_name}{' '}
                  <span className="text-text-muted">({district.councillor_email})</span>
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
        onClick={() => onSubmit(!!isDuplicate)}
      >
        {isDuplicate ? 'Submit anyway — help verify' : 'Submit report'}
      </Button>

      {isDuplicate && (
        <p className="text-[12.5px] text-text-secondary text-center">
          Multiple reports help prioritize repairs. Submitting adds your verification.
        </p>
      )}
    </div>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-1 w-1 shrink-0 rounded-full bg-primary/40"
    />
  );
}
