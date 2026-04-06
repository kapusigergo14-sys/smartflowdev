import BeforeAfterSlider from './BeforeAfterSlider';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollTo = (id: string) => `document.getElementById('${id}')?.scrollIntoView({behavior:'smooth'})`;

  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.topbar}>
          <span className={styles.logo}>smartflowdev</span>
          <nav className={styles.topbarLinks}>
            <a href="#styles">styles</a>
            <a href="#work">work</a>
            <a href="#pricing">pricing</a>
            <a href="#contact">contact</a>
          </nav>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.preHeading}>./smartflowdev --help</div>
            <h1 className={styles.heading}>
              I rebuild <span className={styles.headingAccent}>outdated websites</span> for small businesses.
            </h1>
            <p className={styles.subheading}>
              Flat $1,500. 7-day delivery. You get three design options, pick one, and it ships live to your domain. No retainers. No account managers. Just me.
            </p>
            <div className={styles.ctaRow}>
              <a href="#contact" className={styles.primaryBtn}>
                &gt; start_project.sh
              </a>
              <a href="#audit" className={styles.secondaryBtn}>
                run a free audit →
              </a>
            </div>
            <div className={styles.proofBar}>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>140+</span>
                <span className={styles.proofLabel}>sites rebuilt</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>$1,500</span>
                <span className={styles.proofLabel}>flat price</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>7 days</span>
                <span className={styles.proofLabel}>delivery</span>
              </div>
              <div className={styles.proofItem}>
                <span className={styles.proofNum}>30 days</span>
                <span className={styles.proofLabel}>free tweaks</span>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <BeforeAfterSlider
              filename="neil-gilbert.webp"
              industry="Legal · UK"
              beforeSrc="/portfolio/neil-gilbert-before.webp"
              afterSrc="/portfolio/neil-gilbert-after.webp"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}
