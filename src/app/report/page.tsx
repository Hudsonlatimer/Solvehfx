'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import PhotoUploader from '@/components/report/PhotoUploader';

const LocationPicker = dynamic(() => import('@/components/report/LocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-72 rounded-xl border border-rule bg-bg-elev animate-pulse" />
  ),
});
import AIReviewCard from '@/components/report/AIReviewCard';
import SubmitConfirmation from '@/components/report/SubmitConfirmation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { AnalyzePhotoResponse, District, RoadAuthority } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

const STEPS: { key: string; label: string; help: string }[] = [
  { key: 'location', label: 'Location', help: 'Where is the issue?' },
  { key: 'photo', label: 'Photo', help: 'Snap or skip — AI will draft the report.' },
  { key: 'review', label: 'Review', help: 'Edit the AI draft so it reads exactly right.' },
  { key: 'contact', label: 'Contact', help: 'Optional. Lets HRM follow up with you.' },
  { key: 'submit', label: 'Submit', help: 'Final check before it goes to 311.' },
];

export default function ReportPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
      <ReportFlow />
    </Suspense>
  );
}

function ReportFlow() {
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get('category') || '';

  const [step, setStep] = useState(0);

  // Location
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState<District | null>(null);
  const [authority, setAuthority] = useState<RoadAuthority>('hrm');

  // Photo
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // AI Analysis
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(preselectedCategory || 'other');
  const [confidence, setConfidence] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Email for follow-up (optional)
  const [email, setEmail] = useState('');

  // Councillor notification (optional, currently unused state — kept for future use)
  const [notifyCouncillor] = useState(false);

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<{
    message: string;
    existingReport: { title: string; distance: string };
  } | null>(null);
  const [forceDuplicate, setForceDuplicate] = useState(false);

  const handleLocationSelect = async (loc: { lat: number; lng: number; address: string }) => {
    setLat(loc.lat);
    setLng(loc.lng);
    setAddress(loc.address);

    try {
      const res = await fetch('/api/districts/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: loc.lat, lng: loc.lng, category, address: loc.address }),
      });
      if (res.ok) {
        const data = await res.json();
        setDistrict(data.district);
        setAuthority(data.road_authority);
      }
    } catch (err) {
      console.error('District lookup error:', err);
    }
  };

  const handleAnalysisComplete = (result: AnalyzePhotoResponse) => {
    if (result.title) setTitle(result.title);
    if (result.description) setDescription(result.description);
    if (result.category) setCategory(result.category);
    setConfidence(result.confidence);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let photoUrl: string | null = null;

      if (photoFile) {
        const supabase = createClient();
        const ext = photoFile.name.split('.').pop() || 'jpg';
        const fileName = `${crypto.randomUUID()}.${ext}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('report-photos')
          .upload(fileName, photoFile, { contentType: photoFile.type });

        if (!uploadError && uploadData) {
          const { data: urlData } = supabase.storage
            .from('report-photos')
            .getPublicUrl(uploadData.path);
          photoUrl = urlData.publicUrl;
        }
      }

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          lat,
          lng,
          address,
          photo_url: photoUrl,
          is_anonymous: isAnonymous,
          email: email || null,
          force: forceDuplicate,
          notify_councillor: notifyCouncillor,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setDuplicateWarning(data.duplicate);
        setForceDuplicate(false);
        setSubmitting(false);
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Failed to submit report');

      setReportId(data.report.id);
      setReferenceNumber(data.report.reference_number || null);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return lat !== 0 && lng !== 0;
      case 1:
        return true;
      case 2:
        return title.trim() !== '' && description.trim() !== '';
      case 3:
        return true;
      default:
        return true;
    }
  };

  const totalSteps = STEPS.length;
  const progress = ((step + (submitted ? 1 : 0)) / totalSteps) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-28 sm:pb-12">
      {/* Header band */}
      {!submitted && (
        <div className="border-b border-rule bg-bg-elev">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
                Report an issue
              </p>
              <Link
                href="/"
                className="text-[12.5px] text-text-secondary hover:text-text-primary transition-colors"
              >
                ← Home
              </Link>
            </div>
            <h1 className="text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.05] tracking-tight text-balance">
              {STEPS[step].help}
            </h1>
            <p className="mt-2 text-[14.5px] text-text-secondary">
              Step {step + 1} of {totalSteps} ·{' '}
              <span className="text-text-primary font-medium">
                {STEPS[step].label}
              </span>
            </p>

            {/* Segmented progress */}
            <div className="mt-6">
              <div className="flex items-center gap-1.5">
                {STEPS.map((s, i) => (
                  <div
                    key={s.key}
                    className="relative h-1.5 flex-1 rounded-full overflow-hidden bg-rule"
                    aria-hidden
                  >
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-500 ease-out ${
                        i < step
                          ? 'w-full bg-success'
                          : i === step
                            ? 'w-full bg-primary'
                            : 'w-0 bg-primary'
                      }`}
                    />
                  </div>
                ))}
              </div>
              {/* Compact labels under the progress on larger screens */}
              <div className="mt-2.5 hidden sm:grid grid-cols-5 gap-1.5 text-[11px]">
                {STEPS.map((s, i) => (
                  <span
                    key={s.key}
                    className={`text-center tracking-tight ${
                      i === step
                        ? 'text-primary font-medium'
                        : i < step
                          ? 'text-success'
                          : 'text-text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
              <p className="sr-only">
                Overall progress: {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-8">
        {!submitted && (
          <div key={step} className="reveal in-view">
            {step === 0 && (
              <section aria-labelledby="step-location">
                <h2 id="step-location" className="sr-only">
                  Pick a location
                </h2>
                <LocationPicker onLocationSelect={handleLocationSelect} />
                {district && (
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-success/30 bg-success/[0.06] px-4 py-3.5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[14px] font-medium text-text-primary leading-tight">
                          District {district.id} — {district.name}
                        </p>
                        {district.councillor_name && (
                          <p className="text-[12.5px] text-text-secondary mt-1">
                            Will CC councillor{' '}
                            <span className="text-text-primary font-medium">
                              {district.councillor_name}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center self-start sm:self-auto gap-1.5 rounded-full bg-bg-elev border border-rule px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                      Routes to {authority === 'hrm' ? 'HRM 311' : authority === 'province' ? 'NS Public Works' : 'Halifax Transit'}
                    </span>
                  </div>
                )}
              </section>
            )}

            {step === 1 && (
              <section aria-labelledby="step-photo">
                <h2 id="step-photo" className="sr-only">
                  Add a photo
                </h2>
                <PhotoUploader
                  onPhotoSelected={(file, preview) => {
                    setPhotoFile(file);
                    setPhotoPreview(preview);
                  }}
                  onAnalysisComplete={handleAnalysisComplete}
                  onSkip={() => setStep(2)}
                />
              </section>
            )}

            {step === 2 && (
              <section aria-labelledby="step-review">
                <h2 id="step-review" className="sr-only">
                  Review your report
                </h2>
                <AIReviewCard
                  title={title}
                  description={description}
                  category={category}
                  confidence={confidence}
                  isAnonymous={isAnonymous}
                  isSnowIce={category === 'snow_ice'}
                  onTitleChange={setTitle}
                  onDescriptionChange={setDescription}
                  onCategoryChange={setCategory}
                  onAnonymousChange={setIsAnonymous}
                />
              </section>
            )}

            {step === 3 && (
              <section aria-labelledby="step-contact" className="space-y-5">
                <h2 id="step-contact" className="sr-only">
                  Optional contact information
                </h2>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[13.5px] font-medium text-text-primary mb-2"
                  >
                    Email address{' '}
                    <span className="text-text-muted font-normal">(optional)</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 px-3.5 rounded-lg border border-rule bg-bg-elev text-[15px] placeholder:text-text-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                  <p className="mt-2 text-[12.5px] text-text-secondary">
                    Skip this and your report goes through anonymously — you&apos;ll
                    still get a reference number on the next screen to track it.
                  </p>
                </div>

                <div className="rounded-xl border border-primary/15 bg-primary/[0.03] p-4">
                  <p className="text-[12.5px] font-semibold text-primary tracking-tight mb-2">
                    Why share your email
                  </p>
                  <ul className="space-y-1.5 text-[13px] text-text-secondary leading-relaxed">
                    <li className="flex gap-2">
                      <Dot /> HRM can reach out if they need clarification.
                    </li>
                    <li className="flex gap-2">
                      <Dot /> Your councillor can follow up directly.
                    </li>
                    <li className="flex gap-2">
                      <Dot /> Status updates when the issue is resolved.
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {step === 4 && (
              <section aria-labelledby="step-submit">
                <h2 id="step-submit" className="sr-only">
                  Confirm and submit
                </h2>

                {duplicateWarning && (
                  <div className="mb-6 rounded-xl border border-warning/30 bg-warning/[0.06] p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning/15 text-warning">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold text-text-primary">
                          {duplicateWarning.message}
                        </p>
                        <p className="text-[13px] text-text-secondary mt-1">
                          <strong className="text-text-primary">
                            {duplicateWarning.existingReport.title}
                          </strong>{' '}
                          was reported {duplicateWarning.existingReport.distance}.
                        </p>
                        <p className="text-[12px] text-text-muted mt-2 leading-relaxed">
                          Multiple reports on the same issue help prioritize
                          repairs. Submit anyway if it&apos;s still happening.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <SubmitConfirmation
                  reportId={reportId}
                  referenceNumber={referenceNumber}
                  title={title}
                  category={category}
                  address={address}
                  photoPreview={photoPreview}
                  district={district}
                  authority={authority}
                  submitted={submitted}
                  submitting={submitting}
                  onSubmit={handleSubmit}
                  isDuplicate={!!duplicateWarning}
                  onForceDuplicate={() => setForceDuplicate(true)}
                />
              </section>
            )}
          </div>
        )}

        {submitted && (
          <div className="reveal in-view">
            <SubmitConfirmation
              reportId={reportId}
              referenceNumber={referenceNumber}
              title={title}
              category={category}
              address={address}
              photoPreview={photoPreview}
              district={district}
              authority={authority}
              submitted={submitted}
              submitting={submitting}
              onSubmit={handleSubmit}
              isDuplicate={false}
              onForceDuplicate={() => {}}
            />
          </div>
        )}
      </div>

      {/* Sticky nav (mobile + desktop) */}
      {!submitted && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-bg-elev/95 backdrop-blur supports-[backdrop-filter]:bg-bg-elev/85">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M15 6l-6 6 6 6" />
              </svg>
              Back
            </Button>
            <span className="text-[11.5px] text-text-muted hidden sm:block">
              {STEPS[step].label} · {step + 1}/{totalSteps}
            </span>
            {step < STEPS.length - 1 && (
              <Button
                variant="primary"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
              >
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/40"
    />
  );
}
