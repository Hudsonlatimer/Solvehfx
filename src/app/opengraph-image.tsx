import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SolveHFX — Fix Halifax. Together.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #003865 0%, #001f3a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 72, fontWeight: 800, color: '#F4A300' }}>Solve</span>
          <span style={{ fontSize: 72, fontWeight: 800, color: '#ffffff' }}>HFX</span>
        </div>
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Fix Halifax. Together.
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
            marginTop: 20,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          AI-powered civic reporting for Halifax, Nova Scotia
        </div>
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 48,
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          <span>solvehfx.ca</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
