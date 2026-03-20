'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import PhotoUploader from '@/components/report/PhotoUploader';

const LocationPicker = dynamic(() => import('@/components/report/LocationPicker'), {
  ssr: false,
  loading: () => <div className="h-72 bg-gray-100 rounded-xl animate-pulse" />,
});
import AIReviewCard from '@/components/report/AIReviewCard';
import SubmitConfirmation from '@/components/report/SubmitConfirmation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { AnalyzePhotoResponse, District, RoadAuthority } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

const STEPS = ['Location', 'Photo', 'Review', 'Contact', 'Submit'];

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
  const [emailOptional, setEmailOptional] = useState(true);

  // Councillor notification (optional)
  const [notifyCouncillor, setNotifyCouncillor] = useState(false);

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<{ message: string; existingReport: any } | null>(null);
  const [forceDuplicate, setForceDuplicate] = useState(false);

  const handleLocationSelect = async (loc: { lat: number; lng: number; address: string }) => {
    setLat(loc.lat);
    setLng(loc.lng);
    setAddress(loc.address);

    // Lookup district
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

      // Upload photo to Supabase Storage
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
        // Duplicate detected - show warning and allow force submit
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
        return true; // Photo is optional
      case 2:
        return title.trim() !== '' && description.trim() !== '';
      case 3:
        return true; // Email is optional
      default:
        return true;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Report an Issue</h1>

      {/* Progress indicator */}
      {!submitted && (
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                  i < step
                    ? 'bg-success text-white'
                    : i === step
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-text-secondary'
                }`}
              >
                {i < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[10px] sm:text-xs ${i === step ? 'text-primary font-medium' : 'text-text-secondary'}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 ${i < step ? 'bg-success' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step content */}
      <div className="mb-8">
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Where is the issue?</h2>
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {district && (
              <div className="mt-4 rounded-lg bg-green-50 border border-green-100 p-3 text-sm">
                You&apos;re in <strong>District {district.id} — {district.name}</strong>
                {district.councillor_name && (
                  <span> (Councillor: {district.councillor_name})</span>
                )}
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Add a photo</h2>
            <PhotoUploader
              onPhotoSelected={(file, preview) => {
                setPhotoFile(file);
                setPhotoPreview(preview);
              }}
              onAnalysisComplete={handleAnalysisComplete}
              onSkip={() => setStep(2)}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review your report</h2>
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
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Optional: Contact Info</h2>
            <p className="text-text-secondary mb-6 text-sm">
              Provide your email so HRM can follow up if they need more details. This is completely optional.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 text-sm text-blue-900">
                <p className="font-medium mb-1">Why provide your email?</p>
                <ul className="space-y-1 text-xs list-disc list-inside">
                  <li>HRM can contact you if they need clarification</li>
                  <li>You'll get follow-up from your councillor</li>
                  <li>You can use your reference number {referenceNumber ? `(${referenceNumber})` : '(shown after submit)'} to check status anytime</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Confirm & Submit</h2>

            {/* Duplicate warning */}
            {duplicateWarning && (
              <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-amber-900">{duplicateWarning.message}</p>
                    <p className="text-sm text-amber-800 mt-1">
                      <strong>{duplicateWarning.existingReport.title}</strong> was reported {duplicateWarning.existingReport.distance}
                    </p>
                    <p className="text-xs text-amber-700 mt-2">
                      Multiple reports on the same issue help prioritize repairs. You can submit again if this is still a problem.
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
          </div>
        )}
      </div>

      {/* Navigation */}
      {!submitted && (
        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          {step < STEPS.length - 1 && (
            <Button
              variant="primary"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
            >
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
