'use client';

import { useEffect, useState } from 'react';

const FRAME_MS = 3400;

const STEPS = [
  { key: 'spot', label: 'Spot' },
  { key: 'draft', label: 'Draft' },
  { key: 'send', label: 'Send' },
];

/**
 * Self-playing onboarding vignette for the hero. Cycles through the real
 * three-step flow — drop a pin, let the AI draft the report, watch it route to
 * 311 + your councillor. Clickable dots let you scrub; hover pauses. Honors
 * prefers-reduced-motion (animations freeze, content still shows).
 */
export default function HeroDemo() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % 3), FRAME_MS);
    return () => clearInterval(id);
  }, [paused, frame]);

  return (
    <div
      className="hx-float w-full max-w-md mx-auto lg:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-2.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        {/* device chrome */}
        <div className="flex items-center gap-1.5 px-2 pb-2.5 pt-1">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 truncate rounded-md bg-black/20 px-2 py-0.5 text-[11px] text-white/45 font-mono">
            solvehfx.ca/report
          </span>
        </div>

        {/* screen */}
        <div className="relative overflow-hidden rounded-xl bg-bg-elev">
          <div className="min-h-[268px] p-4">
            {frame === 0 && <FrameSpot key="spot" />}
            {frame === 1 && <FrameDraft key="draft" />}
            {frame === 2 && <FrameSend key="send" />}
          </div>

          {/* progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-rule/60">
            <div
              key={`${frame}-${paused}`}
              className="hx-progress-fill h-full bg-primary"
              style={{ animationDuration: `${FRAME_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
            />
          </div>
        </div>
      </div>

      {/* step dots */}
      <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setFrame(i)}
            className="group flex items-center gap-1.5"
            aria-label={`Show step: ${s.label}`}
            aria-current={frame === i}
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                frame === i ? 'w-7 bg-accent' : 'w-1.5 bg-white/25 group-hover:bg-white/45'
              }`}
            />
            <span
              className={`text-[11.5px] tracking-tight transition-colors ${
                frame === i ? 'text-white/90' : 'text-white/40 group-hover:text-white/60'
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────── Frame 1 — drop a pin ───────── */
function FrameSpot() {
  return (
    <div className="hx-rise">
      <div className="relative h-[200px] overflow-hidden rounded-lg border border-rule bg-bg">
        <div className="hx-grid absolute inset-0" />
        {/* faux roads */}
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-primary/[0.06]" />
        <div className="absolute inset-y-0 left-[38%] w-3 bg-primary/[0.06]" />

        {/* dropping pin */}
        <div className="absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-full">
          <div className="relative hx-pin-drop">
            <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rounded-full bg-primary" />
            <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 hx-ping rounded-full bg-primary/40" />
            <svg width="30" height="30" viewBox="0 0 24 24" className="relative drop-shadow text-primary" fill="currentColor" aria-hidden>
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[12.5px]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Location set
        </span>
        <span className="text-text-secondary">District 7 · South Downtown</span>
      </div>
    </div>
  );
}

/* ───────── Frame 2 — AI drafts the report ───────── */
function FrameDraft() {
  return (
    <div className="hx-rise space-y-3">
      <div className="flex gap-3">
        {/* photo */}
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg border border-rule bg-gradient-to-br from-primary/15 to-primary/[0.04]">
          <div className="absolute inset-0 flex items-center justify-center text-[34px]">🕳️</div>
        </div>
        <div className="flex-1 space-y-2 pt-0.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold tracking-tight text-primary">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l2.4 6.9L21 9.3l-5.2 4.3L17.5 21 12 16.9 6.5 21l1.7-7.4L3 9.3l6.6-.4z" />
            </svg>
            AI drafting · 96%
          </span>
          {/* shimmering -> resolved title */}
          <p className="text-[13.5px] font-medium leading-snug text-text-primary">
            Large pothole, eastbound Quinpool Rd
          </p>
          <div className="hx-shimmer h-2 w-full rounded" />
          <div className="hx-shimmer h-2 w-4/5 rounded" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
      <div className="rounded-lg border border-rule bg-bg p-2.5">
        <div className="hx-shimmer h-1.5 w-1/3 rounded" />
        <div className="mt-2 space-y-1.5">
          <div className="hx-shimmer h-1.5 w-full rounded" style={{ animationDelay: '0.1s' }} />
          <div className="hx-shimmer h-1.5 w-11/12 rounded" style={{ animationDelay: '0.25s' }} />
          <div className="hx-shimmer h-1.5 w-2/3 rounded" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}

/* ───────── Frame 3 — routed + reference ───────── */
function FrameSend() {
  const routes = [
    { label: 'HRM 311', sub: 'contactus@311.halifax.ca', delay: '0ms' },
    { label: 'Councillor — District 7', sub: 'l.white@halifax.ca', delay: '160ms' },
  ];
  return (
    <div className="hx-rise space-y-3">
      <div className="flex flex-col items-center pt-1 text-center">
        <span className="hx-check flex h-12 w-12 items-center justify-center rounded-full bg-success/12 text-success">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <p className="mt-2.5 text-[15px] font-medium tracking-tight text-text-primary">Report sent</p>
      </div>

      <div className="space-y-2">
        {routes.map((r) => (
          <div
            key={r.label}
            className="hx-rise flex items-center gap-2.5 rounded-lg border border-rule bg-bg px-3 py-2"
            style={{ animationDelay: r.delay }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/12 text-success">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium leading-tight text-text-primary">{r.label}</p>
              <p className="truncate text-[11px] font-mono text-text-muted">{r.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hx-rise flex items-center justify-between rounded-lg border border-primary/20 bg-primary/[0.04] px-3 py-2" style={{ animationDelay: '0.32s' }}>
        <span className="text-[11.5px] text-text-secondary">Tracking reference</span>
        <span className="stat text-[15px] font-mono tracking-wider text-primary">SHX-4K7X2</span>
      </div>
    </div>
  );
}
