'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/reports/StatusBadge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { createClient } from '@/lib/supabase/client';
import { getCategoryById } from '@/lib/districts';
import type { Report, ReportStatus } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUserEmail(user.email || '');

      const { data } = await supabase
        .from('reports')
        .select('*, districts(*), verifications(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setReports(data || []);
      setLoading(false);
    };
    init();
  }, [supabase, router]);

  const handleMarkResolved = async (reportId: string) => {
    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      });
      if (res.ok) {
        setReports((prev) =>
          prev.map((r) =>
            r.id === reportId ? { ...r, status: 'resolved' as ReportStatus, resolved_at: new Date().toISOString() } : r
          )
        );
      }
    } catch (err) {
      console.error('Failed to update report:', err);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Reports</h1>
          <p className="text-sm text-text-secondary">{userEmail}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-lg font-medium text-text-primary">No reports yet</p>
          <p className="text-sm text-text-secondary mt-1 mb-4">
            See something that needs fixing in Halifax? Report it!
          </p>
          <Link href="/report">
            <Button variant="primary">Report an Issue</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const cat = getCategoryById(report.category);
            const createdAt = new Date(report.created_at);
            const canResolve =
              report.status !== 'resolved' &&
              Date.now() - createdAt.getTime() > 24 * 60 * 60 * 1000;

            return (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border border-rule shadow-sm bg-bg-elev"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0">{cat?.icon || '📍'}</span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/reports/${report.id}`}
                      className="font-medium text-text-primary hover:text-primary truncate block"
                    >
                      {report.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusBadge status={report.status as ReportStatus} />
                      <span className="text-xs text-text-secondary">
                        {createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {canResolve && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start sm:self-center"
                    onClick={() => handleMarkResolved(report.id)}
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
