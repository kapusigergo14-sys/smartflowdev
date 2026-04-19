'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** How tall the scrollable container is, in viewport heights. Default 1.5. */
  vh?: number;
  /** Additional inline style passed through */
  style?: CSSProperties;
}

/**
 * ScrollScene tracks scroll progress (0..1) of the wrapper relative to the
 * viewport and exposes it as the `--scene-progress` CSS custom property.
 * Children can drive transforms / opacity from this — no JS animation, no
 * jank. Pure CSS responsiveness.
 */
export default function ScrollScene({ children, className, vh = 1.5, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // Progress: 0 when top of element hits bottom of viewport, 1 when bottom
      // of element leaves top of viewport.
      const total = rect.height + viewport;
      const passed = viewport - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      el.style.setProperty('--scene-progress', String(p));
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ minHeight: `${vh * 100}vh`, ...style }}
    >
      {children}
    </div>
  );
}
