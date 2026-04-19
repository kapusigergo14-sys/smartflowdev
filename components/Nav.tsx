'use client';

import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo}>
          <LogoMark size={32} className={styles.logoMark} />
          <span className={styles.logoText}>
            smartflow<span className={styles.logoAccent}>dev</span>
          </span>
        </a>

        <ul className={styles.links}>
          <li><a href="/#work">Work</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>

        <a href="/#contact" className={styles.cta}>
          Start a project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
