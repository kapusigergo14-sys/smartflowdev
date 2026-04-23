'use client';

import { useEffect, useState } from 'react';
import { useOffer } from './OfferCountdown';
import styles from './OfferTopBar.module.css';

const DISMISS_KEY = 'sfd_offer_topbar_dismissed_wk1';

/**
 * Site-wide sticky offer banner rendered above <Nav /> when the 7-day
 * countdown is live. Click "Claim it" scrolls to #pricing on the
 * current page (or navigates to /#pricing from sub-pages without one).
 * "×" dismisses for the rest of the localStorage session.
 *
 * Contract with Nav: this bar sets `--topbar-h` on <html> to its own
 * rendered height, and Nav.module.css uses `top: var(--topbar-h, 0)`
 * so the nav slides down underneath it. When the bar is not rendered,
 * `--topbar-h` is 0px and Nav sits at top as usual.
 */
export default function OfferTopBar() {
  const { active, remaining } = useOffer();
  const [dismissed, setDismissed] = useState(false);

  // Read dismissal once
  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === '1') {
        setDismissed(true);
      }
    } catch {
      // localStorage blocked — behave as not dismissed
    }
  }, []);

  // Keep Nav's top offset in sync
  useEffect(() => {
    const visible = active && !dismissed;
    const h = visible ? 44 : 0;
    document.documentElement.style.setProperty('--topbar-h', `${h}px`);
    return () => {
      document.documentElement.style.setProperty('--topbar-h', '0px');
    };
  }, [active, dismissed]);

  const handleClaim = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('pricing');
    if (!el) return; // let the /#pricing href navigate
    e.preventDefault();
    // Manual offset so the section header clears the fixed top bar + nav
    // (scrollIntoView ignores scroll-margin in some browsers when called
    // programmatically with behavior:smooth).
    const rect = el.getBoundingClientRect();
    const topbarH = 44; // matches OfferTopBar height
    const navH = 72;    // rough Nav height — padding + content
    const target = rect.top + window.pageYOffset - topbarH - navH - 16;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {}
    setDismissed(true);
  };

  if (!active || dismissed) return null;

  return (
    <div className={styles.bar} role="status" aria-live="polite">
      <div className={styles.inner}>
        <span className={styles.badge}>50% OFF</span>
        <span className={styles.text}>Exclusive — offer expires in</span>
        <span className={styles.timer}>{remaining}</span>
        <a href="/#pricing" onClick={handleClaim} className={styles.cta}>
          Claim it
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
      <button
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss offer banner"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
