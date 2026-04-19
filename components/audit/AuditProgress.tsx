'use client';

import { useEffect, useState } from 'react';
import styles from './AuditProgress.module.css';

interface Props {
  url: string;
}

// Display-only progress stepper. The real audit runs on the server;
// these labels simulate sequential reveal so the wait feels purposeful.
const STEPS = [
  { label: 'Fetching page HTML', delay: 600 },
  { label: 'Running PageSpeed Insights', delay: 1800 },
  { label: 'Capturing screenshots', delay: 1200 },
  { label: 'Detecting chatbot & booking', delay: 900 },
  { label: 'Checking SEO basics', delay: 700 },
  { label: 'Generating AI suggestions', delay: 1400 },
];

export default function AuditProgress({ url }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Advance through steps but stop at the last one — stay "in progress"
    // until the parent actually swaps to results.
    if (activeIndex >= STEPS.length - 1) return;
    const t = setTimeout(() => setActiveIndex((i) => i + 1), STEPS[activeIndex].delay);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.spinner} aria-hidden="true" />
        <div>
          <h2 className={styles.title}>Auditing your website</h2>
          <p className={styles.url}>{url}</p>
        </div>
      </div>

      <ol className={styles.steps}>
        {STEPS.map((step, i) => {
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;
          const state = isDone ? 'done' : isActive ? 'active' : 'pending';
          return (
            <li key={step.label} className={styles.step} data-state={state}>
              <span className={styles.check} aria-hidden="true">
                {isDone ? '✓' : isActive ? '' : ''}
              </span>
              <span className={styles.label}>{step.label}</span>
            </li>
          );
        })}
      </ol>

      <p className={styles.hint}>This usually takes 20-40 seconds. Keep this tab open.</p>
    </div>
  );
}
