'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Skip SSR entirely — three.js needs `window` and the bundle is heavy
// enough that even deferred SSR hurts first paint. `loading: null` means
// we render nothing while the chunk downloads (the warm-white body bg
// fills the gap invisibly).
const ShaderScene = dynamic(() => import('./ShaderScene'), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero background wrapper. The shader scene is only mounted when:
 *   1. The viewport is ≥ 768px wide (mobile battery / data saver skip)
 *   2. The user has NOT requested reduced motion
 *   3. ~400ms after paint, so the main content ships first
 *
 * All other clients see the plain warm-white `--bg` body color.
 */
export default function HeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    if (window.innerWidth < 768) return;

    // Defer mount so the headline paints first — LCP is on the H1,
    // not on the shader plane.
    const t = window.setTimeout(() => setEnabled(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  if (!enabled) return null;
  return <ShaderScene />;
}
