import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Free website audit — smartflowdev';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #EEF2FF 0%, #FCE7F3 50%, #E0F2FE 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#6366F1',
            letterSpacing: '-0.5px',
          }}
        >
          smartflowdev.com/audit
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#0A0A0A',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            Free website audit.
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#27272A',
              letterSpacing: '-0.5px',
              maxWidth: '900px',
              lineHeight: 1.2,
            }}
          >
            PageSpeed · Chatbot & booking detection · SEO · AI suggestions
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#71717A',
            fontSize: 22,
          }}
        >
          <div>No signup · No email · 5 free audits per day</div>
          <div
            style={{
              background: '#6366F1',
              color: '#fff',
              padding: '16px 28px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            Try yours →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
