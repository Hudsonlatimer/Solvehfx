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

  const activeFilters = [category, district, status].filter(Boolean).length;

  return (
    <div className="h-[calc(100dvh-4rem)] flex flex-col md:flex-row bg-bg-elev">
      {/* Mobile filter toggle bar */}
      <div className="md:hidden flex items-center justify-between gap-3 px-4 py-3 border-b border-rule bg-bg-elev sticky top-16 z-10">
        <div className="text-[12.5px] text-text-secondary">
          {loading ? 'Loading…' : (
            <>
              <span className="num font-semibold text-text-primary">
                {reports.length}
              </span>{' '}
              report{reports.length === 1 ? '' : 's'}
            </>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-rule px-3 py-1.5 text-[13px] font-medium text-text-primary hover:border-primary/30 hover:bg-primary/[0.03] transition-colors"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          {showFilters ? 'Hide filters' : 'Filters'}
          {activeFilters > 0 && (
            <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-semibold px-1 num">
              {activeFilters}
            </span>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          showFilters ? 'block' : 'hidden'
        } md:block w-full md:w-80 flex-shrink-0 overflow-y-auto bg-bg-elev border-r border-rule`}
      >
        <div className="p-5 sm:p-6">
          <div className="hidden md:flex items-center justify-between mb-5">
            <h2 className="text-[14px] font-semibold tracking-tight text-text-primary">
              Filter map
            </h2>
            <span className="text-[12px] text-text-muted num">
              {loading ? '…' : `${reports.length} on map`}
            </span>
          </div>
          <MapFilters
            selectedCategory={category}
            selectedDistrict={district}
            selectedStatus={status}
            onCategoryChange={setCategory}
            onDistrictChange={setDistrict}
            onStatusChange={setStatus}
          />
        </div>
      </aside>

      {/* Map */}
      <div className="flex-1 relative">
        <IssueMap
          reports={reports}
          focusDistrict={district ? parseInt(district, 10) : null}
        />
        {loading && reports.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-elev/80 backdrop-blur-sm">
            <LoadingSpinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
}
