import { NextRequest, NextResponse } from 'next/server';
import { dispatchEmails } from '@/lib/resend';
import type { Report, District, RoadAuthority } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // This endpoint sends email from our verified domain to arbitrary
    // councillor/authority addresses, so it must never be publicly callable.
    // Normal submissions dispatch email in-process via /api/reports; this route
    // is internal-only and requires a shared secret. If the secret isn't
    // configured, fail closed.
    const expected = process.env.INTERNAL_API_SECRET;
    const provided = request.headers.get('x-internal-secret');
    if (!expected || provided !== expected) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { report, district, authority } = (await request.json()) as {
      report: Report;
      district: District | null;
      authority: RoadAuthority;
    };

    if (!report || !report.id || !report.title) {
      return NextResponse.json(
        { error: 'Valid report data is required' },
        { status: 400 }
      );
    }

    const result = await dispatchEmails({ report, district, authority });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Email dispatch failed:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
