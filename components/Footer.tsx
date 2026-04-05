'use client';

import { useEffect, useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [scanning, setScanning] = useState(8);

  useEffect(() => {
    const tick = () => {
      setScanning((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.max(3, Math.min(14, next));
      });
    };
    const interval = setInterval(tick, 20000 + Math.random() * 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.brand}>smartflowdev</div>
          <div className={styles.counter}>
            <span>142</span> sites rebuilt · <span>{scanning}</span> scanning right now
          </div>
          <nav className={styles.nav}>
            <a href="#work">work</a>
            <a href="#pricing">pricing</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
