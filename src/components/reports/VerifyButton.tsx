'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface VerifyButtonProps {
  reportId: string;
  currentVerifications: number;
}

export default function VerifyButton({ reportId, currentVerifications }: VerifyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [count, setCount] = useState(currentVerifications);
  const [error, setError] = useState('');

  const handleVerify = async (type: 'confirmed_exists' | 'confirmed_fixed') => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/reports/${reportId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (res.status === 401) {
        setError('Please log in to verify this report. Go to /login to sign in.');
        return;
      }

      if (res.status === 409) {
        setError('You have already verified this report.');
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Verification failed');
      }

      setVerified(true);
      setCount((c) => c + 1);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Verification failed';
      if (msg.includes('verifications') || msg.includes('relation')) {
        setError('Verification system not yet configured. Please contact the admin.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-100 p-3 text-sm text-green-800">
        Thanks for verifying! ({count} total verification{count !== 1 ? 's' : ''})
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-text-secondary">
        {count} verification{count !== 1 ? 's' : ''}
      </p>
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          loading={loading}
          onClick={() => handleVerify('confirmed_exists')}
        >
          I&apos;ve seen this issue
        </Button>
        <Button
          size="sm"
          variant="outline"
          loading={loading}
          onClick={() => handleVerify('confirmed_fixed')}
        >
          This is fixed
        </Button>
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
