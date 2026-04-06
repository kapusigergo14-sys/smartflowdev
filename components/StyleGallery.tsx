import Image from 'next/image';
import styles from './StyleGallery.module.css';

interface StyleItem {
  slug: string;
  name: string;
  desc: string;
  tags: string;
  src: string;
}

const ITEMS: StyleItem[] = [
  { slug: 'swiss-modern',   name: 'Swiss Modern',      desc: 'Clean, minimal, Bauhaus-inspired',          tags: 'law · finance · medical',              src: '/styles/swiss-modern.webp' },
  { slug: 'flat-corporate', name: 'Flat Corporate',    desc: 'Professional corporate flat design',         tags: 'real estate · insurance · B2B',        src: '/styles/flat-corporate.webp' },
  { slug: 'luxury-type',    name: 'Luxury Typography', desc: 'Elegant serif-driven editorial layout',      tags: 'dental · hotel · boutique',            src: '/styles/luxury-type.webp' },
  { slug: 'aurora-ui',      name: 'Aurora',            desc: 'Soft gradients, modern and warm',            tags: 'dental · wellness · spa',              src: '/styles/aurora-ui.webp' },
  { slug: 'art-nouveau',    name: 'Art Nouveau',       desc: 'Elegant organic flowing forms',              tags: 'bakery · florist · salon',             src: '/styles/art-nouveau.webp' },
  { slug: 'hero-centric',   name: 'Hero Centric',      desc: 'Bold hero-first, image-driven layout',       tags: 'roofing · construction · auto',        src: '/styles/hero-centric.webp' },
  { slug: 'conversion',     name: 'Conversion Pro',    desc: 'CTA-heavy, built for lead generation',       tags: 'plumbing · HVAC · electrical',         src: '/styles/conversion.webp' },
  { slug: 'feature-rich',   name: 'Feature Showcase',  desc: 'Service-rich layout with clear sections',    tags: 'dental · medical · chiropractic',      src: '/styles/feature-rich.webp' },
  { slug: 'paper-ink',      name: 'Paper & Ink',       desc: 'Warm editorial, newspaper-inspired',          tags: 'law · accounting · consulting',        src: '/styles/paper-ink.webp' },
  { slug: 'terminal-green', name: 'Terminal Green',    desc: 'Developer-focused dark terminal',             tags: 'tech · dev agency · SaaS',             src: '/styles/terminal-green.webp' },
  { slug: 'minimalism',     name: 'Minimalism',        desc: 'Ultra-clean whitespace-first design',         tags: 'dental · law · medical',               src: '/styles/minimalism.webp' },
  { slug: 'neoplastic',     name: 'Neoplastic',        desc: 'Mondrian-inspired geometric blocks',          tags: 'architecture · design · gallery',      src: '/styles/neoplastic.webp' },
];

export default function StyleGallery() {
  return (
    <section className={styles.section} id="styles">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tag}>ls ./design-styles</div>
          <h2 className={styles.title}>Pick your style.</h2>
          <p className={styles.subtitle}>
            Every business is different. Browse the styles below and tell us which one fits your brand — we&apos;ll build your site in that direction.
          </p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item) => (
            <a key={item.slug} href="#contact" className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={item.src}
                  alt={`${item.name} design style preview`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  loading="lazy"
                />
              </div>
              <div className={styles.body}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.desc}>{item.desc}</div>
                <div className={styles.tags}>{item.tags}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
