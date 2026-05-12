'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function TrackPage() {
  const [ref, setRef] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = ref.trim().toUpperCase();
    if (!trimmed) {
      setError('Please enter a reference number.');
      return;
    }
    router.push(`/track/${trimmed}`);
  };

  return (
    <div>
      <section className="border-b border-rule bg-bg-elev">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center">
          <Reveal>
            <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/70">
              Track a report
            </p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-balance">
              Where&apos;s your report?
            </h1>
            <p className="mt-4 text-[15.5px] text-text-secondary max-w-md mx-auto leading-relaxed">
              Enter the reference number from your submission email. No account
              required.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <form
              onSubmit={handleSubmit}
              className="mt-9 max-w-md mx-auto text-left"
            >
              <label htmlFor="track-ref" className="sr-only">
                Reference number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="track-ref"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  spellCheck={false}
                  value={ref}
                  onChange={(e) => {
                    setRef(e.target.value);
                    setError('');
                  }}
                  placeholder="SHX-A1B2CDEF"
                  className="flex-1 h-12 px-4 rounded-lg border border-rule bg-bg-elev text-center sm:text-left text-[17px] font-mono tracking-[0.06em] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary placeholder:text-text-muted/70"
                />
                <Button type="submit" variant="primary" size="lg" className="sm:w-auto">
                  Look up
                </Button>
              </div>
              {error && (
                <p role="alert" className="mt-2 text-[13px] text-danger">
                  {error}
                </p>
              )}
              <p className="mt-3 text-[12px] text-text-muted text-center sm:text-left">
                Reference numbers look like <code className="px-1 py-0.5 rounded bg-bg text-text-secondary font-mono">SHX-XXXXXXXX</code>.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl sm:text-[28px] leading-[1.1] tracking-tight text-center mb-10">
              How tracking works.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Submit a report', desc: 'You get a reference number instantly — also emailed to you if you provided contact info.' },
              { num: '02', title: 'Authority responds', desc: 'HRM 311, NS Public Works, or Halifax Transit acknowledges and assigns the case.' },
              { num: '03', title: 'Track to resolution', desc: 'See status changes, response time, and resolution notes — public and auditable.' },
            ].map((s, i) => (
              <Reveal key={s.num} delay={i * 60}>
                <article className="rounded-xl border border-rule bg-bg-elev p-5 h-full">
                  <p className="text-[11.5px] font-semibold tracking-[0.16em] uppercase text-primary/60">
                    Step {s.num}
                  </p>
                  <h3 className="mt-2 text-[17px] tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] text-text-secondary leading-relaxed">
                    {s.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-text-secondary text-[14.5px]">
              Lost your reference number?{' '}
              <Link href="/report" className="text-primary hover:underline underline-offset-4">
                File a new report
              </Link>{' '}
              — your existing one still counts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
