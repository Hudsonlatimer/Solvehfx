'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/reports/StatusBadge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Input, Textarea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { createClient } from '@/lib/supabase/client';
import { getCategoryById } from '@/lib/districts';
import type { Report, ReportStatus } from '@/lib/types';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [authorized, setAuthorized] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('created_at');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [noteModal, setNoteModal] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Stats
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 });

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        router.push('/');
        return;
      }
      setAuthorized(true);
      fetchReports();
    };
    init();
  }, [supabase, router]);

  const fetchReports = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reports')
      .select('*, districts(*), verifications(*)')
      .order('created_at', { ascending: false });

    const all = data || [];
    setReports(all);
    setStats({
      total: all.length,
      open: all.filter((r) => r.status === 'open').length,
      resolved: all.filter((r) => r.status === 'resolved').length,
    });
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/reports/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchReports();
  };

  const handleAddNote = async () => {
    if (!noteModal || !noteText.trim()) return;
    await fetch(`/api/reports/${noteModal}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: noteText }),
    });
    setNoteModal(null);
    setNoteText('');
    fetchReports();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this report? This cannot be undone.')) return;
    await supabase.from('reports').delete().eq('id', id);
    fetchReports();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'Status', 'Address', 'District', 'Created'];
    const rows = filteredReports.map((r) => [
      r.id,
      r.title,
      r.category,
      r.status,
      r.address || '',
      r.districts?.name || '',
      new Date(r.created_at).toISOString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solvehfx-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = reports.filter((r) => {
    if (filterStatus && r.status !== filterStatus) return false;
    if (filterCategory && r.category !== filterCategory) return false;
    return true;
  });

  if (!authorized || loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Admin Panel</h1>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats.total}</p>
          <p className="text-xs text-text-secondary">Total Reports</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-status-open">{stats.open}</p>
          <p className="text-xs text-text-secondary">Open</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-success">{stats.resolved}</p>
          <p className="text-xs text-text-secondary">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-200 py-2 px-3 text-sm bg-white"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-gray-200 py-2 px-3 text-sm bg-white"
        >
          <option value="">All Categories</option>
          <option value="pothole">Pothole</option>
          <option value="snow_ice">Snow/Ice</option>
          <option value="graffiti">Graffiti</option>
          <option value="street_light">Street Light</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Issue</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Category</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">District</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Date</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const cat = getCategoryById(report.category);
                return (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 max-w-[200px] truncate font-medium">
                      {report.title}
                    </td>
                    <td className="px-4 py-3">
                      {cat?.icon} {cat?.label}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={report.status as ReportStatus} />
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {report.districts?.name || '—'}
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">
                      {new Date(report.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {report.status !== 'resolved' && (
                          <button
                            onClick={() => handleStatusChange(report.id, 'resolved')}
                            className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 hover:bg-green-100"
                          >
                            Resolve
                          </button>
                        )}
                        <button
                          onClick={() => { setNoteModal(report.id); setNoteText(''); }}
                          className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          Note
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-text-secondary text-sm">
            No reports match your filters.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredReports.map((report) => {
          const cat = getCategoryById(report.category);
          return (
            <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-text-primary truncate">{report.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {cat?.icon} {cat?.label} · {report.districts?.name || '—'}
                  </p>
                </div>
                <StatusBadge status={report.status as ReportStatus} />
              </div>
              <p className="text-xs text-text-secondary">
                {new Date(report.created_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                {report.status !== 'resolved' && (
                  <button
                    onClick={() => handleStatusChange(report.id, 'resolved')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 active:bg-green-100"
                  >
                    Resolve
                  </button>
                )}
                <button
                  onClick={() => { setNoteModal(report.id); setNoteText(''); }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 active:bg-blue-100"
                >
                  Note
                </button>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 active:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-text-secondary text-sm">
            No reports match your filters.
          </div>
        )}
      </div>

      {/* Note modal */}
      <Modal
        open={noteModal !== null}
        onClose={() => setNoteModal(null)}
        title="Add Resolution Note"
      >
        <div className="space-y-4">
          <Textarea
            label="Note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add an update about this report..."
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNoteModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddNote} disabled={!noteText.trim()}>
              Add Note
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
