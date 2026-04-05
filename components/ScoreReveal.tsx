'use client';

import type { OutdatedScore } from '@/lib/types';
import styles from './ScoreReveal.module.css';

interface Props {
  result: OutdatedScore;
  onReset: () => void;
}

function verdictFor(result: OutdatedScore): string {
  if (result.blocked) return `scan blocked — ${result.error || 'site rejected our request'}. this can happen with strict security, still worth a manual review.`;
  const s = result.score;
  if (s >= 70) return `significantly outdated. this is costing you leads — the kind of site that makes people bounce back to google.`;
  if (s >= 50) return `visibly dated. competitors running newer stacks will convert better than you on the same traffic.`;
  if (s >= 30) return `some warning signs. worth refreshing before competitors pull further ahead.`;
  return `you're in the top 15%. most of my clients weren't. if you still want an outside eye, happy to take a look.`;
}

function colorClass(score: number): string {
  if (score >= 70) return 'red';
  if (score >= 40) return 'amber';
  return 'green';
}

function psiColor(psi: number | null): string {
  if (psi === null) return '';
  if (psi < 30) return 'bad';
  if (psi < 50) return 'warn';
  return 'good';
}

function weightColor(mb: number | null): string {
  if (mb === null) return '';
  if (mb >= 6) return 'bad';
  if (mb >= 3) return 'warn';
  return 'good';
}

function lcpColor(s: number | null): string {
  if (s === null) return '';
  if (s >= 4) return 'bad';
  if (s >= 2.5) return 'warn';
  return 'good';
}

function jqColor(v: string | null): string {
  if (!v) return '';
  if (v.startsWith('1.')) return 'bad';
  if (v.startsWith('2.')) return 'warn';
  return 'good';
}

export default function ScoreReveal({ result, onReset }: Props) {
  const cls = colorClass(result.score);
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>$ ./scan-site --complete</div>

      <div className={styles.scoreRow}>
        <div className={`${styles.score} ${styles[cls]}`}>{result.score}</div>
        <div>
          <div className={styles.scoreLabel}>/ 100 outdated</div>
          <div className={styles.scoreLabel} style={{ marginTop: 4, fontSize: '0.7rem' }}>signals: {result.breakdown}</div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricKey}>PSI_MOBILE</span>
          <span className={`${styles.metricVal} ${styles[psiColor(result.signals.psiMobileScore)] || ''}`}>
            {result.signals.psiMobileScore !== null ? `${result.signals.psiMobileScore}/100` : 'n/a'}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricKey}>PAGE_WEIGHT</span>
          <span className={`${styles.metricVal} ${styles[weightColor(result.observations.pageWeightMb)] || ''}`}>
            {result.observations.pageWeightMb !== null ? `${result.observations.pageWeightMb}MB` : 'n/a'}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricKey}>LCP</span>
          <span className={`${styles.metricVal} ${styles[lcpColor(result.observations.lcpSeconds)] || ''}`}>
            {result.observations.lcpSeconds !== null ? `${result.observations.lcpSeconds}s` : 'n/a'}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricKey}>JQUERY</span>
          <span className={`${styles.metricVal} ${styles[jqColor(result.observations.jqueryVersion)] || ''}`}>
            {result.observations.jqueryVersion || (result.signals.jquery ? 'detected' : 'none')}
          </span>
        </div>
      </div>

      <p className={styles.verdict}>verdict: {verdictFor(result)}</p>

      <div className={styles.ctaRow}>
        <button className={styles.primaryBtn} onClick={scrollToContact}>
          &gt; fix_this.sh
        </button>
        <button className={styles.secondaryBtn} onClick={onReset}>
          scan another
        </button>
      </div>
    </div>
  );
}
