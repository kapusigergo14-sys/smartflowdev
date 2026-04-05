import styles from './ScanLineDivider.module.css';

export default function ScanLineDivider() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.line} />
    </div>
  );
}
