'use client';

import { ISSUE_CATEGORIES } from '@/lib/types';
import { HRM_DISTRICTS } from '@/lib/districts';
import type { ReportStatus } from '@/lib/types';

interface MapFiltersProps {
  selectedCategory: string;
  selectedDistrict: string;
  selectedStatus: string;
  onCategoryChange: (val: string) => void;
  onDistrictChange: (val: string) => void;
  onStatusChange: (val: string) => void;
}

export default function MapFilters({
  selectedCategory,
  selectedDistrict,
  selectedStatus,
  onCategoryChange,
  onDistrictChange,
  onStatusChange,
}: MapFiltersProps) {
  const statuses: { value: string; label: string }[] = [
    { value: '', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
  ];

  return (
    <div className="space-y-3 p-4 bg-bg-elev rounded-xl border border-rule shadow-sm">
      <h3 className="font-semibold text-sm text-text-primary">Filters</h3>

      <div>
        <label htmlFor="filter-category" className="block text-xs font-medium text-text-secondary mb-1">
          Category
        </label>
        <select
          id="filter-category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev"
        >
          <option value="">All Categories</option>
          {ISSUE_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-district" className="block text-xs font-medium text-text-secondary mb-1">
          District
        </label>
        <select
          id="filter-district"
          value={selectedDistrict}
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev"
        >
          <option value="">All Districts</option>
          {HRM_DISTRICTS.map((d) => (
            <option key={d.id} value={d.id.toString()}>
              {d.id}. {d.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-status" className="block text-xs font-medium text-text-secondary mb-1">
          Status
        </label>
        <select
          id="filter-status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev"
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
