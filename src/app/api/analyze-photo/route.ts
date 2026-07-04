import { NextRequest, NextResponse } from 'next/server';
import { analyzePhoto } from '@/lib/anthropic';
import { getClientIp } from '@/lib/request';

// Reject anything larger than ~8MB of base64 (~6MB raw) before it reaches the
// Claude API. The client already downscales, so legitimate uploads are far
// smaller; this caps cost/abuse from hand-crafted requests.
const MAX_BASE64_LENGTH = 8 * 1024 * 1024;

// Best-effort per-IP throttle. This is per serverless instance (not shared
// state), so it isn't a hard guarantee, but it blunts single-source loops that
// would otherwise run up the Anthropic bill. A shared store (Redis/Upstash)
// would make it strict.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  try {
    if (rateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { image, mimeType } = body as { image: string; mimeType: string };

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: 'Missing image or mimeType' },
        { status: 400 }
      );
    }

    if (image.length > MAX_BASE64_LENGTH) {
      return NextResponse.json(
        { error: 'Image is too large.' },
        { status: 413 }
      );
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(mimeType)) {
      return NextResponse.json(
        { error: 'Invalid image type. Accepted: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    const result = await analyzePhoto(image, mimeType);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Photo analysis failed:', error);
    return NextResponse.json(
      { error: 'Failed to analyze photo. Please try again.' },
      { status: 500 }
    );
  }
}
