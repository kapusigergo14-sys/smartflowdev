import type { DetectionResult } from '@/lib/detect';
import type { PhaseStatus } from '@/lib/audit-types';
import styles from './DetectionCard.module.css';

interface Props {
  label: string;
  result: DetectionResult | null;
  phaseStatus: PhaseStatus;
  missingCopy: string;
}

export default function DetectionCard({ label, result, phaseStatus, missingCopy }: Props) {
  let state: 'found' | 'missing' | 'unknown' = 'unknown';
  let title = 'Unknown';
  let body = '';
  let confidenceText: string | null = null;

  if (phaseStatus !== 'success' || !result) {
    state = 'unknown';
    title = 'Not checked';
    body = 'We couldn\'t run this check.';
  } else if (result.found) {
    state = 'found';
    title = result.vendor ? `${result.vendor} detected` : 'Detected';
    body = 'Good — this is already on the site.';
    confidenceText = `${result.confidence} confidence`;
  } else {
    state = 'missing';
    title = 'Not detected';
    body = missingCopy;
    confidenceText =
      'Note: some tools load via iframes or delayed scripts — check manually if unsure.';
  }

  return (
    <div className={styles.card} data-state={state}>
      <div className={styles.top}>
        <div className={styles.label}>{label}</div>
        <span className={styles.badge}>
          {state === 'found' ? '✓' : state === 'missing' ? '—' : '?'}
        </span>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      {confidenceText && <div className={styles.meta}>{confidenceText}</div>}
    </div>
  );
}
