'use client';

import { Input, Textarea } from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import CategorySelector from './CategorySelector';

interface AIReviewCardProps {
  title: string;
  description: string;
  category: string;
  confidence: number;
  isAnonymous: boolean;
  isSnowIce: boolean;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onAnonymousChange: (val: boolean) => void;
}

export default function AIReviewCard({
  title,
  description,
  category,
  confidence,
  isAnonymous,
  isSnowIce,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onAnonymousChange,
}: AIReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info">AI Generated</Badge>
        {confidence > 0 && (
          <Badge variant={confidence > 0.8 ? 'success' : confidence > 0.5 ? 'warning' : 'default'}>
            {Math.round(confidence * 100)}% confidence
          </Badge>
        )}
        {isSnowIce && (
          <Badge variant="info">
            Winter Mode — P1 Priority
          </Badge>
        )}
      </div>

      <Input
        label="Report Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Short description of the issue"
      />

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Describe the issue, its exact location, and why it needs attention"
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Issue Category
        </label>
        <CategorySelector
          selected={category}
          onSelect={onCategoryChange}
          suggestedCategory={category}
          confidence={confidence}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => onAnonymousChange(e.target.checked)}
          className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5"
        />
        <div>
          <span className="text-sm font-medium text-text-primary">Submit anonymously</span>
          <p className="text-xs text-text-secondary">No account needed. Your identity won&apos;t be shared.</p>
        </div>
      </label>
    </div>
  );
}
