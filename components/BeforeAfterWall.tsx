import BeforeAfterSlider from './BeforeAfterSlider';
import styles from './BeforeAfterWall.module.css';

interface PortfolioItem {
  slug: string;
  filename: string;
  industry: string;
  beforeSrc: string;
  afterSrc: string;
}

// 6 curated concepts — one per template (A-F). These are unsolicited redesigns.
const ITEMS: PortfolioItem[] = [
  { slug: 'neil-gilbert',     filename: 'neil-gilbert.webp',     industry: 'Legal · UK',       beforeSrc: '/portfolio/neil-gilbert-before.webp',     afterSrc: '/portfolio/neil-gilbert-after.webp' },
  { slug: 'girvan-dental',    filename: 'girvan-dental.webp',    industry: 'Dental · UK',      beforeSrc: '/portfolio/girvan-dental-before.webp',    afterSrc: '/portfolio/girvan-dental-after.webp' },
  { slug: 'hunter-french',    filename: 'hunter-french.webp',    industry: 'Real Estate · AU', beforeSrc: '/portfolio/hunter-french-before.webp',    afterSrc: '/portfolio/hunter-french-after.webp' },
  { slug: 'nuova-plumbing',   filename: 'nuova-plumbing.webp',   industry: 'Plumbing · USA',   beforeSrc: '/portfolio/nuova-plumbing-before.webp',   afterSrc: '/portfolio/nuova-plumbing-after.webp' },
  { slug: 'burnbank-roofing', filename: 'burnbank-roofing.webp', industry: 'Roofing · UK',     beforeSrc: '/portfolio/burnbank-roofing-before.webp', afterSrc: '/portfolio/burnbank-roofing-after.webp' },
  { slug: 'garage-service',   filename: 'garage-service.webp',   industry: 'Auto · UK',        beforeSrc: '/portfolio/garage-service-before.webp',   afterSrc: '/portfolio/garage-service-after.webp' },
];

export default function BeforeAfterWall() {
  return (
    <section className={styles.section} id="work">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tag}>ls ./concepts</div>
          <h2 className={styles.title}>Real websites. Rethought.</h2>
          <p className={styles.subtitle}>
            These are <strong>unsolicited redesign concepts</strong> — real small-business websites I audited and rebuilt to show what&apos;s possible. None of these companies hired me; I used them to demonstrate range across industries.
          </p>
          <p className={styles.disclaimer}># drag the divider on any pair · left = live today · right = my proposed rebuild</p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <BeforeAfterSlider
              key={item.slug}
              filename={item.filename}
              industry={item.industry}
              beforeSrc={item.beforeSrc}
              afterSrc={item.afterSrc}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
