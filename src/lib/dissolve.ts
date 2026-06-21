import type { Report } from './types';

/**
 * "Dissolve" system for resolved issues.
 *
 * Once an issue is marked resolved it gradually fades over a window, then drops
 * out of the default map / reports views into an archive. This keeps fresh,
 * actionable issues prominent while letting fixed ones quietly recede — without
 * any database changes (it is derived purely from `resolved_at`).
 */

// Days over which a resolved issue fades before it is considered archived.
export const DISSOLVE_FADE_DAYS = 14;

// Opacity floor reached right before an issue archives (kept readable on hover).
export const DISSOLVE_MIN_OPACITY = 0.4;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface DissolveState {
  /** Whether this report is resolved and therefore subject to dissolving. */
  isResolved: boolean;
  /** Whole days since it was resolved, or null if not resolved. */
  daysSinceResolved: number | null;
  /** 1 = fresh/unresolved, fading toward DISSOLVE_MIN_OPACITY as it ages. */
  opacity: number;
  /** How far through the fade window (0–1). */
  progress: number;
  /** True once past the fade window — hidden from default views. */
  archived: boolean;
}

const ACTIVE: DissolveState = {
  isResolved: false,
  daysSinceResolved: null,
  opacity: 1,
  progress: 0,
  archived: false,
};

export function getDissolveState(
  report: Pick<Report, 'status' | 'resolved_at'>
): DissolveState {
  const resolvedAt = report.status === 'resolved' ? report.resolved_at : null;
  if (!resolvedAt) return ACTIVE;

  const ms = Date.now() - new Date(resolvedAt).getTime();
  const days = Math.max(0, ms / DAY_MS);
  const progress = Math.min(1, days / DISSOLVE_FADE_DAYS);
  const archived = days >= DISSOLVE_FADE_DAYS;
  const opacity = 1 - (1 - DISSOLVE_MIN_OPACITY) * progress;

  return {
    isResolved: true,
    daysSinceResolved: Math.floor(days),
    opacity,
    progress,
    archived,
  };
}

/** Split a list into the visible set and the archived (dissolved) set. */
export function partitionByDissolve<T extends Pick<Report, 'status' | 'resolved_at'>>(
  reports: T[]
): { visible: T[]; archived: T[] } {
  const visible: T[] = [];
  const archived: T[] = [];
  for (const r of reports) {
    (getDissolveState(r).archived ? archived : visible).push(r);
  }
  return { visible, archived };
}
