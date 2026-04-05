'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HowItWorks.module.css';

const STEPS = [
  { num: '[01]', title: 'scan', desc: 'We audit your current site in 8 seconds. Tech stack, mobile speed, page weight, the whole lot.' },
  { num: '[02]', title: 'rebuild (5–10d)', desc: 'New homepage, services, about, contact. Modern stack, mobile-first, on-brand. We send you 3 design options.' },
  { num: '[03]', title: 'launch', desc: 'You pick. We deploy to your domain, hand over hosting access, and stick around for 30 days of tweaks.' },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tag}>./how-it-works</div>
          <h2 className={styles.title}>Three steps. No surprises.</h2>
        </div>
        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.num}>{step.num}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <p className={styles.stepDesc}>{step.desc}</p>
              <div className={styles.progressTrack}>
                <div
                  className={`${styles.progressFill} ${visible ? styles.full : ''}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
