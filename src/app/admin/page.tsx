'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/reports/StatusBadge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Textarea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { createClient } from '@/lib/supabase/client';
import { getCategoryById } from '@/lib/districts';
import { ISSUE_CATEGORIES, AUTHORITY_EMAILS } from '@/lib/types';
import type { Report, ReportStatus } from '@/lib/types';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

const STATUS_OPTIONS: { value: ReportStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
];

function daysAgo(n: number) {
  return Date.now() - n * 24 * 60 * 60 * 1000;
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [authorized, setAuthorized] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sort, setSort] = useState('newest');

  const [noteModal, setNoteModal] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [detail, setDetail] = useState<Report | null>(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReports = async () => {
    setRefreshing(true);
    const { data } = await supabase
      .from('reports')
      .select('*, districts(*), verifications(*)')
      .order('created_at', { ascending: false });
    setReports(data || []);
    setLoading(false);
    setRefreshing(false);
  };

  const handleStatusChange = async (id: string, status: string) => {
    // optimistic
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: status as ReportStatus } : r))
    );
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
    setReports((prev) => prev.filter((r) => r.id !== id));
    await supabase.from('reports').delete().eq('id', id);
  };

  const stats = useMemo(() => {
    const total = reports.length;
    const open = reports.filter((r) => r.status === 'open').length;
    const inProgress = reports.filter((r) => r.status === 'in_progress').length;
    const resolved = reports.filter((r) => r.status === 'resolved').length;
    const week = reports.filter((r) => new Date(r.created_at).getTime() >= daysAgo(7)).length;
    const stale = reports.filter(
      (r) => r.status !== 'resolved' && new Date(r.created_at).getTime() < daysAgo(14)
    ).length;
    return {
      total,
      open,
      inProgress,
      resolved,
      week,
      stale,
      resolutionRate: total ? Math.round((resolved / total) * 100) : 0,
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = reports.filter((r) => {
      if (filterStatus && r.status !== filterStatus) return false;
      if (filterCategory && r.category !== filterCategory) return false;
      if (q) {
        const hay = `${r.title} ${r.description} ${r.address ?? ''} ${r.reference_number ?? ''} ${r.contact_email ?? ''} ${r.contact_name ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      const at = new Date(a.created_at).getTime();
      const bt = new Date(b.created_at).getTime();
      return sort === 'oldest' ? at - bt : bt - at;
    });
    return list;
  }, [reports, search, filterStatus, filterCategory, sort]);

  const handleExportCSV = () => {
    const headers = ['Reference', 'Title', 'Category', 'Status', 'Address', 'District', 'Authority', 'Contact name', 'Contact email', 'Created', 'Resolved'];
    const rows = filteredReports.map((r) => [
      r.reference_number || '',
      r.title,
      r.category,
      r.status,
      r.address || '',
      r.districts?.name || '',
      r.road_authority || '',
      r.contact_name || '',
      r.contact_email || '',
      new Date(r.created_at).toISOString(),
      r.resolved_at ? new Date(r.resolved_at).toISOString() : '',
    ]);
    const esc = (c: string) => `"${String(c).replace(/"/g, '""')}"`;
    const csv = [headers.join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solvehfx-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authorized || loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Admin Panel</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={fetchReports} loading={refreshing}>
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
        <StatCard label="Total" value={stats.total} tone="text-primary" />
        <StatCard label="Open" value={stats.open} tone="text-status-open" />
        <StatCard label="In progress" value={stats.inProgress} tone="text-[#9a6a00]" />
        <StatCard label="Resolved" value={stats.resolved} tone="text-success" />
        <StatCard label="Resolution rate" value={`${stats.resolutionRate}%`} tone="text-primary" />
        <StatCard label="New · 7d" value={stats.week} tone="text-primary" sub={stats.stale ? `${stats.stale} stale (14d+)` : undefined} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title, address, ref, contact…"
          className="flex-1 min-w-[200px] rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev placeholder:text-text-muted"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev">
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev">
          <option value="">All categories</option>
          {ISSUE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-rule py-2 px-3 text-sm bg-bg-elev">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <span className="text-xs text-text-muted num ml-auto">{filteredReports.length} shown</span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-bg-elev rounded-xl border border-rule overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg border-b border-rule">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Issue</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Category</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">District</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Contact</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Date</th>
                <th className="px-4 py-3 text-left font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const cat = getCategoryById(report.category);
                return (
                  <tr key={report.id} className="border-b border-rule hover:bg-bg">
                    <td className="px-4 py-3 max-w-[220px]">
                      <button onClick={() => setDetail(report)} className="font-medium text-left hover:text-primary truncate block w-full">
                        {report.title}
                      </button>
                      <span className="text-[11px] font-mono text-text-muted">{report.reference_number}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{cat?.icon} {cat?.label}</td>
                    <td className="px-4 py-3">
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report.id, e.target.value)}
                        className="rounded-md border border-rule bg-bg-elev py-1 px-2 text-xs"
                        aria-label="Change status"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs">{report.districts?.name || '—'}</td>
                    <td className="px-4 py-3 text-xs">
                      {report.contact_email || report.contact_name ? (
                        <span className="text-text-secondary">{report.contact_name || report.contact_email}</span>
                      ) : (
                        <span className="text-text-muted">Anonymous</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{new Date(report.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setDetail(report)} className="text-xs px-2 py-1 rounded bg-black/[0.05] text-text-secondary hover:bg-black/[0.08]">View</button>
                        <button onClick={() => { setNoteModal(report.id); setNoteText(''); }} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100">Note</button>
                        <button onClick={() => handleDelete(report.id)} className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-text-secondary text-sm">No reports match your filters.</div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredReports.map((report) => {
          const cat = getCategoryById(report.category);
          return (
            <div key={report.id} className="bg-bg-elev rounded-xl border border-rule p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <button onClick={() => setDetail(report)} className="min-w-0 flex-1 text-left">
                  <p className="font-medium text-sm text-text-primary truncate">{report.title}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{cat?.icon} {cat?.label} · {report.districts?.name || '—'}</p>
                  <p className="text-[11px] font-mono text-text-muted mt-0.5">{report.reference_number}</p>
                </button>
                <StatusBadge status={report.status as ReportStatus} />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  className="rounded-md border border-rule bg-bg-elev py-1.5 px-2 text-xs flex-1"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button onClick={() => { setNoteModal(report.id); setNoteText(''); }} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700">Note</button>
                <button onClick={() => handleDelete(report.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700">Delete</button>
              </div>
            </div>
          );
        })}
        {filteredReports.length === 0 && (
          <div className="text-center py-8 text-text-secondary text-sm">No reports match your filters.</div>
        )}
      </div>

      {/* Note modal */}
      <Modal open={noteModal !== null} onClose={() => setNoteModal(null)} title="Add Resolution Note">
        <div className="space-y-4">
          <Textarea label="Note" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add an update about this report..." />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNoteModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddNote} disabled={!noteText.trim()}>Add Note</Button>
          </div>
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal open={detail !== null} onClose={() => setDetail(null)} title={detail?.title || 'Report'}>
        {detail && <ReportDetailBody report={detail} />}
      </Modal>
    </div>
  );
}

function StatCard({ label, value, tone, sub }: { label: string; value: string | number; tone: string; sub?: string }) {
  return (
    <div className="bg-bg-elev rounded-xl border border-rule shadow-sm p-4 text-center">
      <p className={`text-2xl font-bold ${tone}`}>{value}</p>
      <p className="text-xs text-text-secondary mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-warning mt-0.5">{sub}</p>}
    </div>
  );
}

function ReportDetailBody({ report }: { report: Report }) {
  const cat = getCategoryById(report.category);
  const authority = AUTHORITY_EMAILS[report.road_authority];
  const verifications = report.verifications?.length || 0;
  return (
    <div className="space-y-4 text-sm">
      {report.photo_url && (
        <div className="relative w-full h-44 rounded-lg overflow-hidden border border-rule">
          <Image src={report.photo_url} alt={report.title} fill className="object-cover" sizes="500px" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={report.status as ReportStatus} />
        <span className="text-text-secondary">{cat?.icon} {cat?.label}</span>
        <span className="font-mono text-xs text-text-muted">{report.reference_number}</span>
      </div>
      <p className="text-text-secondary leading-relaxed">{report.description}</p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <Field label="Location" value={report.address || `${report.lat.toFixed(5)}, ${report.lng.toFixed(5)}`} />
        <Field label="District" value={report.districts?.name || '—'} />
        <Field label="Councillor" value={report.districts?.councillor_name || '—'} />
        <Field label="Routed to" value={`${authority?.name || report.road_authority} (${authority?.email || ''})`} />
        <Field label="Contact" value={report.contact_name || report.contact_email ? `${report.contact_name || ''} ${report.contact_email ? `<${report.contact_email}>` : ''}`.trim() : 'Anonymous'} />
        <Field label="Verifications" value={String(verifications)} />
        <Field label="Submitted" value={new Date(report.created_at).toLocaleString()} />
        <Field label="Resolved" value={report.resolved_at ? new Date(report.resolved_at).toLocaleString() : '—'} />
      </dl>
      <div className="flex gap-3 pt-2 border-t border-rule">
        <Link href={`/reports/${report.id}`} className="text-primary text-xs hover:underline" target="_blank">Public page ↗</Link>
        <Link href={`/track/${report.reference_number}`} className="text-primary text-xs hover:underline" target="_blank">Tracking page ↗</Link>
        {report.photo_url && <a href={report.photo_url} className="text-primary text-xs hover:underline" target="_blank" rel="noreferrer">Full photo ↗</a>}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-text-muted">{label}</dt>
      <dd className="text-text-primary mt-0.5 break-words">{value}</dd>
    </div>
  );
}
