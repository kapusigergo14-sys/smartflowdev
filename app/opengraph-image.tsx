import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'smartflowdev — modern websites for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0d1117',
          backgroundImage:
            'radial-gradient(circle at 90% 10%, rgba(57, 211, 83, 0.15) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(57, 211, 83, 0.08) 0%, transparent 50%)',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#39d353', fontSize: 28, fontWeight: 700 }}>&gt;</span>
          <span style={{ color: '#e6edf3', fontSize: 28, fontWeight: 700 }}>smartflowdev</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ color: '#39d353', fontSize: 22, fontWeight: 500 }}>$ ./smartflowdev --help</div>
          <div
            style={{
              color: '#e6edf3',
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 16px',
            }}
          >
            <span>I rebuild</span>
            <span style={{ color: '#39d353' }}>outdated websites</span>
            <span>for small businesses.</span>
          </div>
          <div style={{ color: '#8b949e', fontSize: 24, fontWeight: 500 }}>
            Flat $1,500 · 7-day delivery · 140+ sites rebuilt
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 32,
            paddingTop: 20,
            borderTop: '1px dashed #30363d',
            color: '#8b949e',
            fontSize: 18,
          }}
        >
          <span>
            <span style={{ color: '#39d353', fontWeight: 700 }}>140+</span> rebuilt
          </span>
          <span>
            <span style={{ color: '#39d353', fontWeight: 700 }}>$1,500</span> flat
          </span>
          <span>
            <span style={{ color: '#39d353', fontWeight: 700 }}>7 days</span> delivery
          </span>
        </div>
      </div>
    ),
    size
  );
}
