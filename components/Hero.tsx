import styles from './Hero.module.css';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.bgLayer} aria-hidden="true">
        <HeroBackground />
        <div className={styles.bgOverlay} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Booking projects for May
          </div>

          <h1 className={styles.headline}>
            Websites that<br />
            don't lose <span className={styles.accentHot}>customers.</span>
          </h1>

          <p className={styles.subtitle}>
            Custom-coded sites for small businesses. Fast, conversion-focused, and
            shipped in 5–10 days — not five months.
          </p>

          <div className={styles.actions}>
            <a href="#contact" className={styles.btnPrimary}>
              Start a project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#work" className={styles.btnSecondary}>
              See our work
            </a>
          </div>
        </div>

        <aside className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>The numbers</span>
          </div>
          <ul className={styles.statsList}>
            <li>
              <span className={styles.statNum}>140<small>+</small></span>
              <span className={styles.statLabel}>Sites shipped</span>
            </li>
            <li>
              <span className={styles.statNum}>5–10<small>d</small></span>
              <span className={styles.statLabel}>Turnaround</span>
            </li>
            <li>
              <span className={styles.statNum}>12</span>
              <span className={styles.statLabel}>Countries</span>
            </li>
            <li>
              <span className={styles.statNum}>$700<small>+</small></span>
              <span className={styles.statLabel}>Starts at</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
