import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

// Always run live — never cached. A scheduled ping to this route issues a tiny
// query against Supabase, which keeps a free-tier project from auto-pausing
// (and avoids the cold-start latency that caused slow first loads).
export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();
  try {
    const supabase = await createServiceClient();
    const { error } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      status: 'ok',
      db: 'reachable',
      ms: Date.now() - startedAt,
    });
  } catch {
    return NextResponse.json(
      { status: 'degraded', db: 'unreachable', ms: Date.now() - startedAt },
      { status: 503 }
    );
  }
}
