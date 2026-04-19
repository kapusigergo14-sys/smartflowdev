'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Skip SSR — three.js needs `window` and the bundle is ~400KB gz.
// `loading: null` means we render nothing while the chunk downloads; the
// warm-white html fallback shows through instead.
const ShaderScene = dynamic(() => import('./ShaderScene'), {
  ssr: false,
  loading: () => null,
});

/**
 * Site-wide animated shader gradient. Fixed at z-index:-1 behind all
 * content, visible on every page. Only mounts when:
 *   1. viewport is ≥ 768px (mobile battery / data saver skip)
 *   2. user has NOT requested reduced motion
 *   3. ~400ms after paint so H1 / LCP ships first
 *
 * Sections with solid `background: var(--bg-card)` will cover the shader
 * naturally. Transparent sections (body, hero) let it show through.
 */
export default function SiteBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    if (window.innerWidth < 768) return;

    const t = window.setTimeout(() => setEnabled(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {enabled && <ShaderScene />}
      {/* Warm-white wash from left→right so text-heavy left edge stays
          readable while the hot-red glow remains visible on the right. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(250, 250, 247, 0.82) 0%, rgba(250, 250, 247, 0.5) 55%, rgba(250, 250, 247, 0.2) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
