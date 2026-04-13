import LogoMark from './LogoMark';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <LogoMark size={36} className={styles.logoMark} />
              <span className={styles.logoText}>
                smartflow<span className={styles.logoAccent}>dev</span>
              </span>
            </div>
            <p className={styles.tagline}>
              Beautiful websites that make money. Built for small businesses around the world.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkCol}>
              <h4>Studio</h4>
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Connect</h4>
              <a href="#contact">Contact</a>
              <a href="mailto:geri@smartflowdev.com">Email</a>
              <a href="https://twitter.com/smartflowdev" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://github.com/smartflowdev" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>© 2026 smartflowdev. Made with care in Hungary.</div>
          <div className={styles.email}>geri@smartflowdev.com</div>
        </div>
      </div>
    </footer>
  );
}
