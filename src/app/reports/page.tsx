'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportCard from '@/components/reports/ReportCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ISSUE_CATEGORIES } from '@/lib/types';
import { HRM_DISTRICTS } from '@/lib/districts';
import type { Report } from '@/lib/types';

export default function ReportsPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
      <ReportsList />
    </Suspense>
  );
}

function ReportsList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [reports, setReports] = useState<Report[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  // The URL is the source of truth for page + filters, so opening a report and
  // hitting Back returns you to the same page and filters you were browsing
  // instead of resetting to page 1.
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const category = searchParams.get('category') || '';
  const district = searchParams.get('district') || '';
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || 'newest';

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') params.delete(key);
        else params.set(key, String(value));
      });
      const qs = params.toString();
      // replace() rather than push() so changing a filter doesn't stack a
      // history entry the user has to click Back through.
      router.replace(qs ? `/reports?${qs}` : '/reports', { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (district) params.set('district', district);
      if (status) params.set('status', status);
      params.set('sort', sort);
      params.set('page', page.toString());
      params.set('limit', limit.toString());

      try {
        const res = await fetch(`/api/reports?${params}`);
        if (res.ok) {
          const data = await res.json();
          setReports(data.reports);
          setTotal(data.total);
        }
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [category, district, status, sort, page]);

  const totalPages = Math.ceil(total / limit);
  const goToPage = (next: number) => {
    const clamped = Math.min(Math.max(1, next), Math.max(1, totalPages));
    updateParams({ page: clamped === 1 ? null : clamped });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">All Reports</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2 sm:gap-3 mb-6">
        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value || null, page: null })}
          className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {ISSUE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => updateParams({ district: e.target.value || null, page: null })}
          className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev w-full sm:w-auto"
        >
          <option value="">All Districts</option>
          {HRM_DISTRICTS.map((d) => (
            <option key={d.id} value={d.id.toString()}>{d.id}. {d.name}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => updateParams({ status: e.target.value || null, page: null })}
          className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev w-full sm:w-auto"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            updateParams({ sort: e.target.value === 'newest' ? null : e.target.value, page: null })
          }
          className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev w-full sm:w-auto"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Reports grid */}
      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : reports.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-lg font-medium text-text-primary">No reports found</p>
          <p className="text-sm text-text-secondary mt-1">
            Try adjusting your filters or be the first to report an issue.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="min-h-11 px-4 py-2 rounded-lg border border-rule text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-text-secondary">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="min-h-11 px-4 py-2 rounded-lg border border-rule text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
