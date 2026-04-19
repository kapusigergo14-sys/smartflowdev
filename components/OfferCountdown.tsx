'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import styles from './OfferCountdown.module.css';

/**
 * 72-hour exclusive-offer countdown. First visit seeds localStorage with
 * the visitor's own t0; every subsequent page load / route change reads
 * the same t0 back so the clock stays honest across the site.
 *
 * If the visitor clears localStorage we just start a new window — a
 * deterministic server-issued offer would need to live behind a URL
 * param, which is out of scope here.
 */

const OFFER_KEY = 'sfd_offer_t0';
const OFFER_WINDOW_MS = 72 * 60 * 60 * 1000;
const DISCOUNT_PCT = 50;

interface OfferState {
  /** Countdown is active (t0 known, not expired). */
  active: boolean;
  /** Formatted "HHh MMm SSs" — empty string when not active. */
  remaining: string;
  /** Milliseconds until expiry. 0 when expired. */
  msLeft: number;
  /** Epoch ms when offer expires, or null pre-hydration. */
  expiresAt: number | null;
  /** Discount percentage (constant 50 for now). */
  discountPct: number;
  /** Apply discount to a base price. */
  discount: (amount: number) => number;
}

const defaultState: OfferState = {
  active: false,
  remaining: '',
  msLeft: 0,
  expiresAt: null,
  discountPct: DISCOUNT_PCT,
  discount: (amount: number) => Math.round(amount * (1 - DISCOUNT_PCT / 100)),
};

const OfferContext = createContext<OfferState>(defaultState);

export function useOffer(): OfferState {
  return useContext(OfferContext);
}

function fmt(msLeft: number): string {
  if (msLeft <= 0) return '';
  const totalSec = Math.floor(msLeft / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

export function OfferProvider({ children }: { children: ReactNode }) {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  // Seed / read t0 from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let t0 = 0;
    try {
      const raw = window.localStorage.getItem(OFFER_KEY);
      t0 = raw ? parseInt(raw, 10) : 0;
      if (!Number.isFinite(t0) || t0 <= 0) t0 = 0;
    } catch {
      t0 = 0;
    }
    if (t0 === 0) {
      t0 = Date.now();
      try { window.localStorage.setItem(OFFER_KEY, String(t0)); } catch {}
    }
    setExpiresAt(t0 + OFFER_WINDOW_MS);
  }, []);

  // 1 Hz tick while countdown active
  useEffect(() => {
    if (expiresAt == null) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [expiresAt]);

  const state = useMemo<OfferState>(() => {
    if (expiresAt == null) return defaultState;
    const msLeft = Math.max(0, expiresAt - now);
    return {
      active: msLeft > 0,
      msLeft,
      remaining: fmt(msLeft),
      expiresAt,
      discountPct: DISCOUNT_PCT,
      discount: (amount: number) => Math.round(amount * (1 - DISCOUNT_PCT / 100)),
    };
  }, [expiresAt, now]);

  return <OfferContext.Provider value={state}>{children}</OfferContext.Provider>;
}

// ─── Banner: shown above pricing section ──────────────────────────────

export function OfferBanner() {
  const { active, remaining } = useOffer();
  if (!active) return null;
  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.bannerBadge}>{DISCOUNT_PCT}% OFF</span>
      <span className={styles.bannerText}>Exclusive — offer expires in</span>
      <span className={styles.bannerTimer}>{remaining}</span>
    </div>
  );
}

// ─── Inline price with crossed-out original ──────────────────────────

interface DiscountPriceProps {
  amount: number;
  prefix?: string;     // e.g. "$" (default)
  suffix?: string;     // e.g. " setup" (rendered after discounted number)
  className?: string;
}

export function DiscountPrice({ amount, prefix = '$', suffix, className }: DiscountPriceProps) {
  const { active, discount } = useOffer();
  if (!active) {
    return (
      <span className={className}>
        {prefix}{amount.toLocaleString()}{suffix ? <small>{suffix}</small> : null}
      </span>
    );
  }
  return (
    <span className={className}>
      <span className={styles.strike}>{prefix}{amount.toLocaleString()}</span>
      <span className={styles.deal}>{prefix}{discount(amount).toLocaleString()}</span>
      {suffix ? <small>{suffix}</small> : null}
    </span>
  );
}
