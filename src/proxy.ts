import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Only run the Supabase session refresh on routes that actually need an
// authenticated user. Public pages (home, map, reports, blog, …) no longer pay
// a blocking auth round-trip on every request, which was inflating TTFB.
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login'],
};
