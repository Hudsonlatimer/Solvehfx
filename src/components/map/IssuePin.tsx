'use client';

import { getCategoryById } from '@/lib/districts';

interface IssuePinProps {
  category: string;
  onClick?: () => void;
}

export default function IssuePin({ category, onClick }: IssuePinProps) {
  const cat = getCategoryById(category);
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-primary shadow-md text-sm cursor-pointer hover:scale-110 transition-transform"
      aria-label={`Issue: ${cat?.label || category}`}
    >
      {cat?.icon || '📍'}
    </button>
  );
}
