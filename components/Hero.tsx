import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.backdrop}>
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.pill}>
          <span className={styles.pillDot}></span>
          Available for new projects
        </div>

        <h1 className={`display ${styles.headline}`}>
          Beautiful websites that<br />
          <span className="gradient-text">make money.</span>
        </h1>

        <p className={styles.subtitle}>
          We design and build conversion-focused websites for small businesses —
          custom-coded, beautifully designed, live in 5–10 days.
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

        <div className={styles.trustStrip}>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>140+</span>
            <span className={styles.trustLabel}>Websites shipped</span>
          </div>
          <div className={styles.trustDot}></div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>5–10</span>
            <span className={styles.trustLabel}>Day turnaround</span>
          </div>
          <div className={styles.trustDot}></div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>12</span>
            <span className={styles.trustLabel}>Countries served</span>
          </div>
          <div className={styles.trustDot}></div>
          <div className={styles.trustItem}>
            <span className={styles.trustNum}>$800</span>
            <span className={styles.trustLabel}>Starter price</span>
          </div>
        </div>
      </div>
    </section>
  );
}
