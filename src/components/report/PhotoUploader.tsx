'use client';

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { downscaleImage } from '@/lib/image';
import type { AnalyzePhotoResponse } from '@/lib/types';

interface PhotoUploaderProps {
  onPhotoSelected: (file: File, preview: string) => void;
  onAnalysisComplete: (result: AnalyzePhotoResponse) => void;
  onSkip: () => void;
}

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

export default function PhotoUploader({
  onPhotoSelected,
  onAnalysisComplete,
  onSkip,
}: PhotoUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastFileRef = useRef<File | null>(null);

  const analyze = async (file: File, dataUrl: string) => {
    setAnalyzing(true);
    setError(null);
    try {
      const base64 = dataUrl.split(',')[1];
      const res = await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType: file.type }),
      });

      if (!res.ok) throw new Error('Analysis failed');

      const result: AnalyzePhotoResponse = await res.json();
      onAnalysisComplete(result);
    } catch (err) {
      console.error('Photo analysis error:', err);
      // Surface the failure, but still let the resident continue by hand.
      setError(
        "We couldn't auto-draft from this photo. You can retry, or write the details yourself on the next step."
      );
      onAnalysisComplete({ category: 'other', title: '', description: '', confidence: 0 });
    } finally {
      setAnalyzing(false);
    }
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPEG, PNG, or WebP).');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('That image is over 10MB. Please choose a smaller photo.');
      return;
    }

    setError(null);

    // Downscale + re-encode before doing anything else. This keeps the upload
    // and the AI request well under serverless body limits, and strips EXIF/GPS
    // metadata from the stored/emailed photo.
    let processed: { file: File; dataUrl: string };
    try {
      processed = await downscaleImage(file);
    } catch {
      setError('Could not read that file. Please try another photo.');
      return;
    }

    lastFileRef.current = processed.file;
    setPreview(processed.dataUrl);
    onPhotoSelected(processed.file, processed.dataUrl);
    analyze(processed.file, processed.dataUrl);
  };

  const handleRetry = () => {
    if (lastFileRef.current && preview) {
      analyze(lastFileRef.current, preview);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-colors cursor-pointer ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-rule hover:border-primary/50 hover:bg-primary/[0.02]'
          }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          aria-label="Upload a photo of the issue"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/[0.06] text-primary">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 16l4-4 4 4m4-4l4-4 4 4M3 20h18M12 4v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="mt-4 text-[15px] font-medium text-text-primary">
            Drop a photo here, or tap to upload
          </p>
          <p className="mt-1 text-[13px] text-text-secondary">
            On mobile this opens your camera · JPEG, PNG, WebP up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-rule">
            <Image
              src={preview}
              alt="Uploaded issue photo"
              width={600}
              height={400}
              className="w-full h-48 sm:h-64 object-cover"
            />
            {analyzing && (
              <div className="absolute inset-0 bg-bg-elev/85 backdrop-blur-sm flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" />
                <p className="mt-3 text-[14px] font-medium text-primary">
                  Analyzing your photo…
                </p>
                <p className="text-[12px] text-text-secondary mt-1">
                  AI is drafting your report
                </p>
              </div>
            )}
          </div>
          {!analyzing && (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setPreview(null);
                  setError(null);
                  lastFileRef.current = null;
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              >
                Retake photo
              </Button>
              {error && (
                <Button type="button" variant="ghost" size="sm" onClick={handleRetry}>
                  Retry analysis
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning/[0.06] px-3.5 py-3 text-[13px] text-text-secondary"
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {!preview && (
        <button
          type="button"
          onClick={onSkip}
          className="w-full text-center text-[13.5px] text-text-secondary hover:text-primary transition-colors py-2"
        >
          Skip photo — enter details manually
        </button>
      )}
    </div>
  );
}
