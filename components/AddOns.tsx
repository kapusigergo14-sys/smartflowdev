import styles from './AddOns.module.css';

const ADDONS = [
  {
    id: 'chatbot',
    badge: 'AI',
    name: 'AI Chatbot',
    headline: 'A 24/7 assistant trained on your business.',
    desc: 'A custom chatbot widget that lives on your site. Answers customer questions, captures leads, books appointments — all styled to match your brand perfectly.',
    bullets: [
      'Brand-matched design',
      'Trained on your services & FAQs',
      'Captures every after-hours lead',
      'Google Calendar integration',
    ],
    accent: '#1B1B1F',
    accentSoft: '#F2F1ED',
    href: '/chatbot',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'phone',
    badge: 'AI',
    name: 'AI Phone Agent',
    headline: 'Never miss a call. Even at 2 AM.',
    desc: 'An AI voice agent that picks up when you can\'t. Answers questions, books appointments, takes messages — and emails you a transcript of every call.',
    bullets: [
      'Natural-sounding voice',
      'Books appointments end-to-end',
      'Email transcripts after each call',
      'Routes urgent calls to you',
    ],
    accent: '#FF3D2E',
    accentSoft: '#FFE9E6',
    href: '/phone-agent',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function AddOns() {
  return (
    <section id="addons" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="pill"><span className="pill-dot"></span> Add-ons</div>
          <h2 className={`display ${styles.title}`}>
            More than<br />
            <span className="gradient-text">just websites.</span>
          </h2>
          <p className={styles.subtitle}>
            We also build AI tools that work alongside your website — chatbots and phone agents
            that capture leads while you sleep.
          </p>
        </div>

        <div className={styles.grid}>
          {ADDONS.map((a) => (
            <div
              key={a.id}
              className={styles.card}
              style={{
                '--card-accent': a.accent,
                '--card-accent-soft': a.accentSoft,
              } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{a.icon}</div>
                <div className={styles.badge}>{a.badge}</div>
              </div>

              <div className={styles.cardName}>{a.name}</div>

              <h3 className={styles.cardHeadline}>{a.headline}</h3>

              <p className={styles.cardDesc}>{a.desc}</p>

              <ul className={styles.bulletList}>
                {a.bullets.map((b) => (
                  <li key={b}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>

              <a href={a.href || '#contact'} className={styles.cardLink}>
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className={styles.bundle}>
          <div className={styles.bundleLeft}>
            <div className={styles.bundleEyebrow}>Bundle deal</div>
            <div className={styles.bundleHeadline}>
              Get the website <span className="gradient-text">+ chatbot + phone agent</span> together.
            </div>
          </div>
          <a href="#contact" className={styles.bundleCta}>
            Talk to us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
