import type { NextRequest } from 'next/server';

/**
 * Best-effort trustworthy client IP.
 *
 * On Vercel the platform sets `x-real-ip` (and the rightmost entry of
 * `x-forwarded-for`) to the real edge-observed client address. A client can
 * *prepend* values to `x-forwarded-for`, so the naive leftmost read is
 * spoofable — we prefer `x-real-ip`, then fall back to the last XFF hop.
 */
export function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }

  return 'unknown';
}

/**
 * Strip CR/LF (and collapse whitespace) so caller-supplied text can never be
 * used to inject additional email headers when interpolated into a Subject
 * line, and cap the length to keep subjects sane.
 */
export function sanitizeHeader(value: string, maxLength = 160): string {
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}
