import { NextRequest, NextResponse } from 'next/server';
import { analyzePhoto } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, mimeType } = body as { image: string; mimeType: string };

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: 'Missing image or mimeType' },
        { status: 400 }
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
