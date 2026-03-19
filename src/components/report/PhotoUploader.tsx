'use client';

import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { AnalyzePhotoResponse } from '@/lib/types';

interface PhotoUploaderProps {
  onPhotoSelected: (file: File, preview: string) => void;
  onAnalysisComplete: (result: AnalyzePhotoResponse) => void;
  onSkip: () => void;
}

export default function PhotoUploader({
  onPhotoSelected,
  onAnalysisComplete,
  onSkip,
}: PhotoUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      onPhotoSelected(file, dataUrl);

      // Send to AI analysis
      setAnalyzing(true);
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
        // Still allow manual entry
        onAnalysisComplete({
          category: 'other',
          title: '',
          description: '',
          confidence: 0,
        });
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
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
          className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors cursor-pointer ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50'
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
          aria-label="Upload a photo"
          onKeyDown={(e) => {
            if (e.key === 'Enter') fileInputRef.current?.click();
          }}
        >
          <svg className="mx-auto h-12 w-12 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 16l4-4 4 4m4-4l4-4 4 4M3 20h18M12 4v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-3 text-base font-medium text-text-primary">
            Drop your photo here, or click to upload
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            JPEG, PNG, WebP up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={preview}
              alt="Uploaded issue photo"
              width={600}
              height={400}
              className="w-full h-48 sm:h-64 object-cover"
            />
            {analyzing && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" />
                <p className="mt-3 text-sm font-medium text-primary">
                  Analyzing your photo...
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  AI is drafting your report
                </p>
              </div>
            )}
          </div>
          {!analyzing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
            >
              Retake Photo
            </Button>
          )}
        </div>
      )}

      {!preview && (
        <button
          type="button"
          onClick={onSkip}
          className="w-full text-center text-sm text-text-secondary hover:text-primary transition-colors py-2"
        >
          Skip photo — enter details manually
        </button>
      )}
    </div>
  );
}
