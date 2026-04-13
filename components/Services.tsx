import styles from './Services.module.css';

const PILLARS = [
  {
    num: '01',
    name: 'Strategy',
    headline: 'We figure out what\'s actually wrong.',
    desc: 'Free audit. Competitive research. Conversion goals. We start with strategy, not pixels — because a beautiful site that doesn\'t convert is just expensive art.',
    bullets: ['Website audit & scoring', 'Competitor research', 'User flow mapping', 'Conversion goals'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 0 0 20" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Design',
    headline: 'Custom design. No templates.',
    desc: 'Every site is designed from scratch to match your brand. No drag-and-drop builders. No generic themes. No "where have I seen this before" feeling.',
    bullets: ['Custom UI design', 'Mobile-first layouts', 'Brand-matched colors & typography', 'Conversion-optimized'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Build & Launch',
    headline: 'Hand-coded. Lightning fast.',
    desc: 'Built with modern tech (Next.js, React, TypeScript). Lightning fast page loads. SEO-ready. Live on your domain in 5–10 days. No surprises.',
    bullets: ['Custom code (no WordPress)', '<1s load time guaranteed', 'SEO-ready out of the box', 'You own all the source code'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="pill"><span className="pill-dot"></span> What we do</div>
          <h2 className={`display ${styles.title}`}>
            Three things.<br />
            <span className="gradient-text">Done properly.</span>
          </h2>
          <p className={styles.subtitle}>
            Every project follows the same proven process — strategy first, then design, then code.
          </p>
        </div>

        <div className={styles.pillars}>
          {PILLARS.map((p) => (
            <div key={p.num} className={styles.pillar}>
              <div className={styles.pillarLeft}>
                <div className={styles.pillarNum}>{p.num}</div>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <div className={styles.pillarName}>{p.name}</div>
              </div>

              <div className={styles.pillarMid}>
                <h3 className={styles.pillarHeadline}>{p.headline}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>

              <div className={styles.pillarRight}>
                <ul className={styles.bulletList}>
                  {p.bullets.map((b) => (
                    <li key={b}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
