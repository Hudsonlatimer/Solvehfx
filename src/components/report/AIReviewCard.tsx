'use client';

import { Input, Textarea } from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import CategorySelector from './CategorySelector';

interface AIReviewCardProps {
  title: string;
  description: string;
  category: string;
  confidence: number;
  isSnowIce: boolean;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

export default function AIReviewCard({
  title,
  description,
  category,
  confidence,
  isSnowIce,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
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

      <p className="text-xs text-text-secondary">
        Your report is anonymous by default. You can add your name or email on the
        next step if you&apos;d like the city or your councillor to follow up.
      </p>
    </div>
  );
}
