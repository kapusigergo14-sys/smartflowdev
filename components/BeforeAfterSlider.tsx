'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './BeforeAfterSlider.module.css';

interface Props {
  filename: string;
  industry: string;
  beforeSrc: string;
  afterSrc: string;
  blurDataURL?: string;
  priority?: boolean;
}

export default function BeforeAfterSlider({ filename, industry, beforeSrc, afterSrc, blurDataURL, priority }: Props) {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Track container width via ResizeObserver so the inner "after" image stays full-width
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const setPctFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rel = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, rel)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setPctFromClientX(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setPctFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const innerWidth = containerWidth > 0 ? `${containerWidth}px` : '100%';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.filename}>{filename}</span>
        <span className={styles.tag}>{industry}</span>
      </div>
      <div
        className={styles.slider}
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Before/After comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className={styles.imageWrap}>
          <Image
            src={beforeSrc}
            alt="Before redesign"
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            priority={priority}
            draggable={false}
          />
        </div>
        <div className={styles.after} style={{ width: `${pct}%` }}>
          <div className={styles.afterInner} style={{ width: innerWidth }}>
            <Image
              src={afterSrc}
              alt="After redesign"
              fill
              sizes="(max-width: 768px) 90vw, 33vw"
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
              draggable={false}
            />
          </div>
        </div>
        <div className={styles.handle} style={{ left: `${pct}%` }}>
          <div className={styles.grip}>⇄</div>
        </div>
        <span className={styles.labelBefore}>before</span>
        <span className={styles.labelAfter}>after</span>
      </div>
    </div>
  );
}
