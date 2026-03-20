'use client';

import { getCategoryById } from '@/lib/districts';

interface IssuePinProps {
  category: string;
  status?: string;
  hasPhoto?: boolean;
  verificationCount?: number;
  onClick?: () => void;
}

export default function IssuePin({ category, status, hasPhoto, verificationCount = 0, onClick }: IssuePinProps) {
  const cat = getCategoryById(category);

  const borderColor =
    status === 'resolved'
      ? 'border-green-500'
      : verificationCount > 0
        ? 'border-amber-500'
        : 'border-primary';

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 ${borderColor} shadow-md text-sm cursor-pointer hover:scale-110 transition-transform`}
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
