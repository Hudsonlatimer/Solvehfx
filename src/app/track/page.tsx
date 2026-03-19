'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export default function TrackPage() {
  const [ref, setRef] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = ref.trim().toUpperCase();
    if (!trimmed) {
      setError('Please enter a reference number');
      return;
    }
    router.push(`/track/${trimmed}`);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-text-primary mb-2">Track Your Report</h1>
      <p className="text-text-secondary mb-8">
        Enter the reference number you received when you submitted your report.
        No account needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={ref}
            onChange={(e) => { setRef(e.target.value); setError(''); }}
            placeholder="e.g. SHX-A1B2CDEF"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Look Up Report
        </Button>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h3 className="font-semibold text-text-primary mb-3">How tracking works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { icon: '1️⃣', title: 'Submit', desc: 'File a report and get a reference number instantly' },
            { icon: '2️⃣', title: 'Track', desc: 'Check status anytime — no login needed' },
            { icon: '3️⃣', title: 'Updates', desc: 'See when your issue is acknowledged or resolved' },
          ].map((item) => (
            <div key={item.title} className="p-3 rounded-lg bg-gray-50">
              <span className="text-lg">{item.icon}</span>
              <p className="font-medium text-sm text-text-primary mt-1">{item.title}</p>
              <p className="text-xs text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
