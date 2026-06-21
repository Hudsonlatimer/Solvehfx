'use client';

import { ISSUE_CATEGORIES } from '@/lib/types';

interface CategorySelectorProps {
  selected: string;
  onSelect: (categoryId: string) => void;
  suggestedCategory?: string;
  confidence?: number;
}

export default function CategorySelector({
  selected,
  onSelect,
  suggestedCategory,
  confidence,
}: CategorySelectorProps) {
  return (
    <div className="space-y-3">
      {suggestedCategory && confidence !== undefined && confidence > 0 && (
        <div className="rounded-lg bg-primary/5 border border-primary/15 p-3 text-sm">
          <span className="font-medium text-primary">AI suggested: </span>
          <span className="text-text-primary">
            {ISSUE_CATEGORIES.find((c) => c.id === suggestedCategory)?.label || suggestedCategory}
          </span>
          <span className="ml-2 text-text-secondary">
            ({Math.round(confidence * 100)}% confident)
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {ISSUE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 rounded-lg border p-2.5 sm:p-3 text-left text-xs sm:text-sm transition-colors ${
              selected === cat.id
                ? 'border-primary bg-primary/5 text-primary font-medium'
                : 'border-rule hover:border-primary/40 text-text-primary'
            }`}
          >
            <span className="text-base sm:text-lg flex-shrink-0">{cat.icon}</span>
            <span className="leading-tight break-words">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
