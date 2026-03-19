'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import MapFilters from '@/components/map/MapFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { Report } from '@/lib/types';

const IssueMap = dynamic(() => import('@/components/map/IssueMap'), {
  ssr: false,
  loading: () => <LoadingSpinner size="lg" className="h-full" />,
});

export default function MapPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="h-full" />}>
      <MapPageContent />
    </Suspense>
  );
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [district, setDistrict] = useState(searchParams.get('district') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (district) params.set('district', district);
      if (status) params.set('status', status);
      params.set('limit', '500');

      try {
        const res = await fetch(`/api/reports?${params}`);
        if (res.ok) {
          const data = await res.json();
          setReports(data.reports);
        }
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [category, district, status]);

  return (
    <div className="h-[calc(100dvh-4rem)] flex flex-col md:flex-row">
      {/* Mobile filter toggle */}
      <button
        className="md:hidden p-3 bg-white border-b border-gray-200 text-sm font-medium text-primary flex items-center gap-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showFilters ? 'block' : 'hidden'
        } md:block w-full md:w-72 p-4 overflow-y-auto bg-bg border-r border-gray-200 flex-shrink-0`}
      >
        <MapFilters
          selectedCategory={category}
          selectedDistrict={district}
          selectedStatus={status}
          onCategoryChange={setCategory}
          onDistrictChange={setDistrict}
          onStatusChange={setStatus}
        />
        <div className="mt-3 text-xs text-text-secondary text-center">
          {loading ? 'Loading...' : `${reports.length} reports`}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <IssueMap reports={reports} focusDistrict={district ? parseInt(district, 10) : null} />
        {loading && reports.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/80">
            <LoadingSpinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
}
