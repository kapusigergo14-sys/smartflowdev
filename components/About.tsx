import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.avatar}>
              <div className={styles.avatarInner}>
                <span className={styles.initials}>G</span>
              </div>
              <div className={styles.statusDot}></div>
            </div>
            <div className={styles.location}>
              <span className={styles.locationDot}></span>
              Hungary · Working globally
            </div>
          </div>

          <div className={styles.right}>
            <div className="pill"><span className="pill-dot"></span> Who builds this</div>

            <h2 className={`display ${styles.title}`}>
              Hi, I'm <span className="gradient-text">Geri.</span>
            </h2>

            <div className={styles.story}>
              <p>
                I'm a 20-year-old developer based in Hungary, building websites for small businesses
                since I was 15. Self-taught, currently coding 60+ hours a week.
              </p>
              <p>
                I've shipped 140+ sites — for dentists, lawyers, plumbers, agencies. Most of them
                came from word of mouth, which I think says something. No team, no agency overhead,
                no project managers. Just me, hand-crafting one site at a time.
              </p>
              <p>
                If you've been thinking <em>"my site needs an update"</em> for the last six months —
                let's talk. I respond to emails within hours.
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>5+</div>
                <div className={styles.statLabel}>Years coding</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <div className={styles.statNum}>140+</div>
                <div className={styles.statLabel}>Sites shipped</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <div className={styles.statNum}>12</div>
                <div className={styles.statLabel}>Countries served</div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <div className={styles.statNum}>&lt;4h</div>
                <div className={styles.statLabel}>Reply time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
