import Badge from '@/components/ui/Badge';
import type { ReportStatus } from '@/lib/types';

const statusConfig: Record<ReportStatus, { label: string; variant: 'info' | 'warning' | 'success' }> = {
  open: { label: 'Open', variant: 'info' },
  in_progress: { label: 'In Progress', variant: 'warning' },
  resolved: { label: 'Resolved', variant: 'success' },
};

interface StatusBadgeProps {
  status: ReportStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.open;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
