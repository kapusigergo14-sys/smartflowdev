import styles from './Pricing.module.css';

interface Tier {
  name: string;
  tag: string;
  price: number;
  note: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

const TIERS: Tier[] = [
  {
    name: 'Starter',
    tag: 'single page',
    price: 800,
    note: '5-day delivery · no retainers',
    features: [
      'Single landing page, custom design',
      'Mobile-first, modern stack',
      'Contact form wired up',
      '2 design options to pick from',
      '14 days of free tweaks',
      'You own the code',
    ],
    cta: 'get starter →',
  },
  {
    name: 'Standard',
    tag: 'full rebuild',
    price: 1500,
    note: '7-day delivery · most popular',
    features: [
      '4 pages (home + services + about + contact)',
      '3 design options to pick from',
      'SEO basics, analytics, contact form',
      'Mobile-first, modern stack',
      '30 days of free tweaks',
      'You own the code + hosting handoff',
    ],
    featured: true,
    cta: 'get standard →',
  },
  {
    name: 'Premium',
    tag: 'large scope',
    price: 3000,
    note: '10-day delivery · starts at',
    features: [
      '10+ pages, custom sections',
      '3 design options + full content strategy',
      'Advanced SEO, blog setup, booking integration',
      'E-commerce / payments (if needed)',
      '60 days of free tweaks',
      'Priority support, you own everything',
    ],
    cta: 'get premium →',
  },
];

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tag}>./pricing --flat</div>
          <h2 className={styles.title}>Flat pricing. No retainers.</h2>
          <p className={styles.subtitle}>
            Pick the scope that fits. You pay the flat number, I ship in the stated window. If it doesn&apos;t match the mockups, you don&apos;t pay.
          </p>
        </div>

        <div className={styles.grid}>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`${styles.card} ${tier.featured ? styles.cardFeatured : ''}`}
            >
              {tier.featured && <span className={styles.badge}>most popular</span>}
              <div className={styles.cardTag}>{tier.tag}</div>
              <div className={styles.cardName}>{tier.name}</div>
              <div className={styles.price}>
                <span className={styles.priceCurrency}>USD</span>
                <span className={styles.priceAmount}>{tier.price.toLocaleString('en-US')}</span>
              </div>
              <div className={styles.priceNote}>{tier.note}</div>
              <ul className={styles.features}>
                {tier.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`${styles.cta} ${tier.featured ? styles.ctaFilled : styles.ctaOutline}`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className={styles.footnote}>
          not sure which fits? send me your current site — i&apos;ll tell you what&apos;s realistic in 1 reply.
        </p>
      </div>
    </section>
  );
}
