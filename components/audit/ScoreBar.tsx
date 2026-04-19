'use client';

import { useEffect, useState } from 'react';
import styles from './ScoreBar.module.css';

interface Props {
  score: number;
}

export default function ScoreBar({ score }: Props) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const target = Math.max(0, Math.min(100, Math.round(score)));
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const tone = score >= 80 ? 'good' : score >= 50 ? 'ok' : 'bad';
  const verdict =
    score >= 80
      ? 'Solid'
      : score >= 60
      ? 'Pretty good'
      : score >= 40
      ? 'Needs work'
      : 'Rough shape';

  return (
    <div className={styles.wrap} data-tone={tone}>
      <div className={styles.top}>
        <div>
          <div className={styles.label}>Overall score</div>
          <div className={styles.score}>
            {animated}
            <span className={styles.max}>/100</span>
          </div>
        </div>
        <div className={styles.verdict}>{verdict}</div>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${animated}%` }}
          aria-hidden="true"
        />
      </div>
      <div className={styles.scale} aria-hidden="true">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
}
