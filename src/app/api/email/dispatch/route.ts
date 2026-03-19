import { NextRequest, NextResponse } from 'next/server';
import { dispatchEmails } from '@/lib/resend';
import type { Report, District, RoadAuthority } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
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
