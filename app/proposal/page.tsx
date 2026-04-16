import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './proposal.module.css';

export const metadata: Metadata = {
  title: 'Website Redesign Proposal — smartflowdev',
  description:
    'Modern dental websites in 7 days. Flat pricing $800–$2,500. Mobile-first, fast, clean.',
  alternates: { canonical: 'https://smartflowdev.com/proposal' },
};

const PROBLEMS = [
  'Loads slowly on phones — patients leave',
  'Looks dated, hurts first impressions',
  'Not mobile-responsive',
  'No HTTPS — browser shows "Not Secure"',
  'Hard to update content yourself',
  'Poor Google ranking, invisible locally',
];

const SOLUTIONS = [
  'Loads in under 2 seconds on any device',
  'Clean, modern design patients trust',
  'Fully responsive, mobile-first',
  'HTTPS included, green padlock always',
  'Easy editor — update text & images yourself',
  'SEO foundation, Schema markup, local visibility',
];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Mobile-first responsive',
    desc: 'Designed for phones first, then scaled up. Over 60% of dental searches happen on mobile.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Fast load (<2s)',
    desc: 'Optimized images, clean code, CDN hosting. No bloated page builders slowing you down.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'HTTPS + security',
    desc: 'SSL certificate included. Patients see the green padlock — trust starts before they read a word.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: 'Easy content updates',
    desc: 'Change text, swap photos, add pages — no developer needed after launch.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'SEO foundation',
    desc: 'Meta tags, Schema markup, sitemap, Google Business Profile optimization included.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Accessibility (WCAG AA)',
    desc: 'Proper contrast, keyboard navigation, screen reader support. Inclusive by default.',
  },
];

const STEPS = [
  {
    day: 'Day 1',
    title: 'Brief & assets',
    desc: 'Quick call or questionnaire. You share your logo, photos, and brand preferences. We lock in the scope.',
  },
  {
    day: 'Day 2–5',
    title: 'Design + build',
    desc: 'We design and develop in parallel. You get a live preview link to watch progress in real time.',
  },
  {
    day: 'Day 6',
    title: 'Your feedback',
    desc: 'Full walkthrough together. You point out changes — we implement them same-day.',
  },
  {
    day: 'Day 7',
    title: 'Live on your domain',
    desc: 'We deploy to your domain, set up hosting, verify SSL, and hand over everything.',
  },
];

const STATS = [
  { number: '75%', label: 'Judge credibility from site' },
  { number: '53%', label: 'Abandon slow mobile sites' },
  { number: '88%', label: 'Never return after bad UX' },
];

interface PricingTier {
  name: string;
  price: string;
  timeline: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

const PRICING: PricingTier[] = [
  {
    name: 'Starter',
    price: '$800',
    timeline: '5-day delivery',
    features: [
      '5-page site',
      'Mobile responsive',
      'HTTPS included',
      'Contact form',
      '1 revision round',
    ],
  },
  {
    name: 'Standard',
    price: '$1,500',
    timeline: '7-day delivery',
    features: [
      '8 pages',
      'SEO + Schema + GMB optimization',
      'Testimonials section',
      'FAQ section',
      'Content editor',
      '3 revision rounds',
    ],
    featured: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Premium',
    price: '$2,500',
    timeline: '10-day delivery',
    features: [
      '12+ pages',
      'AI chatbot ($49/mo, first month free)',
      'Online booking integration',
      'Blog setup',
      'Review system',
      'Unlimited revisions',
      'Ongoing priority support',
    ],
  },
];

export default function ProposalPage() {
  return (
    <>
      <Nav />
      <main className={styles.proposal}>
        {/* ─── Section 1: Hero ─── */}
        <section className={styles.hero}>
          <div className="container">
            <span className={`pill ${styles.heroPill}`}>
              <span className={`pill-dot ${styles.pillDotEmerald}`} />
              Website redesign for dental practices
            </span>
            <h1 className={`display ${styles.heroTitle}`}>
              Modern dental websites in{' '}
              <span className={styles.gradientEmerald}>7 days</span>.
            </h1>
            <p className={styles.heroSub}>
              A focused small studio that redesigns dental practice websites with
              flat pricing — no agency retainer, no open-ended hours, no
              surprises.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statPill}>
                <strong>$800 – $2,500</strong>
                <span>Flat pricing</span>
              </div>
              <div className={styles.statPill}>
                <strong>5–10 days</strong>
                <span>Typical delivery</span>
              </div>
              <div className={styles.statPill}>
                <strong>AI chatbot $49/mo</strong>
                <span>Premium</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Problem / Solution ─── */}
        <section className={styles.compare}>
          <div className="container">
            <h2 className={`display ${styles.sectionTitle}`}>
              An outdated site costs you patients.
            </h2>
            <p className={styles.sectionSub}>
              75% of visitors judge a practice&apos;s credibility from its
              website.
            </p>
            <div className={styles.compareGrid}>
              <div className={`${styles.compareCard} ${styles.compareCardBad}`}>
                <h3 className={styles.compareHeading}>
                  <span className={styles.iconBad}>&#10007;</span>
                  The slow, dated site
                </h3>
                <ul className={styles.compareList}>
                  {PROBLEMS.map((item, i) => (
                    <li key={i}>
                      <span className={styles.iconBad}>&#10007;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.compareCard} ${styles.compareCardGood}`}>
                <h3 className={styles.compareHeading}>
                  <span className={styles.iconGood}>&#10003;</span>
                  The modern, fast site
                </h3>
                <ul className={styles.compareList}>
                  {SOLUTIONS.map((item, i) => (
                    <li key={i}>
                      <span className={styles.iconGood}>&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: What we deliver ─── */}
        <section className={styles.features}>
          <div className="container">
            <h2 className={`display ${styles.sectionTitle}`}>
              Everything a modern dental site needs.
            </h2>
            <div className={styles.featureGrid}>
              {FEATURES.map((f, i) => (
                <div key={i} className={`card ${styles.featureCard}`}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Process ─── */}
        <section className={styles.process}>
          <div className="container">
            <h2 className={`display ${styles.sectionTitle}`}>
              From kick-off to live in 7 days.
            </h2>
            <div className={styles.stepsGrid}>
              {STEPS.map((step, i) => (
                <div key={i} className={`card ${styles.stepCard}`}>
                  <div className={styles.stepDay}>{step.day}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.guarantees}>
              <div className={styles.guaranteePill}>30-day free bug fixes</div>
              <div className={styles.guaranteePill}>Source code is yours</div>
              <div className={styles.guaranteePill}>3 revision rounds</div>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Trust stats ─── */}
        <section className={styles.trust}>
          <div className="container">
            <h2 className={`display ${styles.trustTitle}`}>
              Dental practices that modernize see 30–50% more contact form
              submissions within 60 days.
            </h2>
            <div className={styles.trustGrid}>
              {STATS.map((stat, i) => (
                <div key={i} className={`card ${styles.trustCard}`}>
                  <div className={styles.trustNumber}>{stat.number}</div>
                  <div className={styles.trustLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 6: Pricing ─── */}
        <section className={styles.pricing}>
          <div className="container">
            <h2 className={`display ${styles.sectionTitle}`}>
              Pick your tier. Launch next week.
            </h2>
            <div className={styles.pricingGrid}>
              {PRICING.map((tier) => (
                <div
                  key={tier.name}
                  className={`card ${styles.pricingCard} ${
                    tier.featured ? styles.pricingCardFeatured : ''
                  }`}
                >
                  {tier.badge && (
                    <span className={styles.pricingBadge}>
                      &#9733; {tier.badge}
                    </span>
                  )}
                  <h3 className={styles.pricingName}>{tier.name}</h3>
                  <div className={styles.pricingPrice}>{tier.price}</div>
                  <div className={styles.pricingTimeline}>{tier.timeline}</div>
                  <ul className={styles.pricingFeatures}>
                    {tier.features.map((f, i) => (
                      <li key={i}>
                        <span className={styles.checkIcon}>&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:geri@smartflowdev.com"
                    className={`btn ${
                      tier.featured ? styles.btnEmerald : 'btn-primary'
                    }`}
                  >
                    Get {tier.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 7: CTA ─── */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaInner}>
              <h2 className={`display ${styles.ctaTitle}`}>
                Interested? We&apos;ll build you a free concept.
              </h2>
              <p className={styles.ctaSub}>
                Just reply to our email and we&apos;ll put together a design
                concept for your practice — free of charge, no obligation.
              </p>
              <a
                href="mailto:geri@smartflowdev.com"
                className={`btn ${styles.btnCtaEmail}`}
              >
                Email geri@smartflowdev.com
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <p className={styles.ctaFooter}>
                Gergo Kapusi —{' '}
                <a href="https://smartflowdev.com">smartflowdev.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
