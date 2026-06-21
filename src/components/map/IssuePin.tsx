'use client';

import { getCategoryById } from '@/lib/districts';

interface IssuePinProps {
  category: string;
  status?: string;
  hasPhoto?: boolean;
  verificationCount?: number;
  /** 0–1 opacity for dissolving resolved pins. */
  opacity?: number;
  /** 0–1 grayscale amount as a resolved pin ages toward archive. */
  fade?: number;
  onClick?: () => void;
}

export default function IssuePin({ category, status, hasPhoto, verificationCount = 0, opacity = 1, fade = 0, onClick }: IssuePinProps) {
  const cat = getCategoryById(category);

  const borderColor =
    status === 'resolved'
      ? 'border-success'
      : verificationCount > 0
        ? 'border-amber-500'
        : 'border-primary';

  return (
    <button
      onClick={onClick}
      style={{ opacity, filter: fade ? `grayscale(${fade})` : undefined }}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-bg-elev border-2 ${borderColor} shadow-md text-sm cursor-pointer transition-[transform,opacity,filter] duration-300 hover:scale-110 hover:!opacity-100 hover:!grayscale-0`}
      aria-label={`Issue: ${cat?.label || category}`}
    >
      {cat?.icon || '📍'}
      {hasPhoto && (
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary text-white text-[8px] flex items-center justify-center">
          📷
        </span>
      )}
      {verificationCount > 0 && (
        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
          {verificationCount > 9 ? '9+' : verificationCount}
        </span>
      )}
    </button>
  );
}
