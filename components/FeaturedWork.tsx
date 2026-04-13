'use client';

import { useState } from 'react';
import styles from './FeaturedWork.module.css';

export default function FeaturedWork() {
  const [interactive, setInteractive] = useState(false);

  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="pill"><span className="pill-dot"></span> Latest project</div>
          <h2 className={`display ${styles.title}`}>
            A live prototype.<br />
            <span className="gradient-text">Built in a day.</span>
          </h2>
          <p className={styles.sub}>
            Every project we ship is interactive from day one. Here&apos;s a full landing
            page we prototyped &mdash; animations, menu, scene transitions, all live.
          </p>
        </div>

        <div className={styles.frameWrap}>
          <div className={styles.frame}>
            <div className={styles.browserBar}>
              <div className={styles.dots}>
                <span style={{ background: '#ff5f57' }}></span>
                <span style={{ background: '#febc2e' }}></span>
                <span style={{ background: '#28c840' }}></span>
              </div>
              <div className={styles.spacer}></div>
              <div className={styles.liveBadge}>
                <span className={styles.liveDot}></span> LIVE
              </div>
            </div>

            <div className={styles.iframeWrap}>
              <iframe
                src="/obsidian/index.html"
                title="Obsidian AI — live prototype"
                className={styles.iframe}
                style={{ pointerEvents: interactive ? 'auto' : 'none' }}
                loading="lazy"
              />

              {!interactive && (
                <button
                  type="button"
                  className={styles.interactOverlay}
                  onClick={() => setInteractive(true)}
                  aria-label="Activate interactive preview"
                >
                  <div className={styles.interactCard}>
                    <div className={styles.interactIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div className={styles.interactText}>
                      <div className={styles.interactTitle}>Click to interact</div>
                      <div className={styles.interactHint}>Open the menu. Explore the fleet. It&apos;s all live.</div>
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className={styles.infoBar}>
              <div className={styles.infoLeft}>
                <div className={styles.clientName}>Obsidian AI</div>
                <div className={styles.clientIndustry}>Enterprise security &middot; Columbus, OH</div>
              </div>
              <div className={styles.stack}>
                <span>React 19</span>
                <span>Spline 3D</span>
                <span>TypeScript</span>
                <span>Tailwind v4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
