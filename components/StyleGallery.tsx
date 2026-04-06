'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './StyleGallery.module.css';

interface StyleItem {
  slug: string;
  name: string;
  desc: string;
  tags: string;
  src: string;
  hdSrc: string;
}

const ITEMS: StyleItem[] = [
  { slug: 'swiss-modern',      name: 'Swiss Modern',        desc: 'Clean, precise, Bauhaus-inspired',           tags: 'law · finance · medical',              src: '/styles/swiss-modern.webp',      hdSrc: '/styles/hd/swiss-modern.webp' },
  { slug: 'luxury-type',       name: 'Luxury Typography',   desc: 'Elegant serif, champagne gold accents',      tags: 'dental · hotel · boutique',            src: '/styles/luxury-type.webp',       hdSrc: '/styles/hd/luxury-type.webp' },
  { slug: 'aurora-ui',         name: 'Aurora',              desc: 'Vibrant gradients, modern warmth',            tags: 'dental · wellness · spa',              src: '/styles/aurora-ui.webp',         hdSrc: '/styles/hd/aurora-ui.webp' },
  { slug: 'warm-professional', name: 'Warm Professional',   desc: 'Approachable, trust-building warmth',         tags: 'dental · medical · wellness',          src: '/styles/warm-professional.webp', hdSrc: '/styles/hd/warm-professional.webp' },
  { slug: 'art-nouveau',       name: 'Art Nouveau',         desc: 'Organic flowing forms, nature-inspired',     tags: 'bakery · florist · salon',             src: '/styles/art-nouveau.webp',       hdSrc: '/styles/hd/art-nouveau.webp' },
  { slug: 'flat-corporate',    name: 'Flat Corporate',      desc: 'Professional blue, sharp & clean',           tags: 'real estate · insurance · B2B',        src: '/styles/flat-corporate.webp',    hdSrc: '/styles/hd/flat-corporate.webp' },
  { slug: 'hero-centric',      name: 'Hero Centric',        desc: 'Bold dark hero, high-contrast CTAs',         tags: 'roofing · construction · auto',        src: '/styles/hero-centric.webp',      hdSrc: '/styles/hd/hero-centric.webp' },
  { slug: 'conversion-pro',    name: 'Conversion Pro',      desc: 'CTA-focused, built to capture leads',        tags: 'plumbing · HVAC · electrical',         src: '/styles/conversion-pro.webp',    hdSrc: '/styles/hd/conversion-pro.webp' },
  { slug: 'feature-showcase',  name: 'Feature Showcase',    desc: 'Service-rich grid with clear sections',      tags: 'dental · medical · chiropractic',      src: '/styles/feature-showcase.webp',  hdSrc: '/styles/hd/feature-showcase.webp' },
  { slug: 'paper-ink',         name: 'Paper & Ink',         desc: 'Warm editorial, newspaper-inspired',         tags: 'law · accounting · consulting',        src: '/styles/paper-ink.webp',         hdSrc: '/styles/hd/paper-ink.webp' },
  { slug: 'minimalist-serif',  name: 'Minimalist Motion',   desc: 'Ultra-airy, italic serif, premium SaaS feel', tags: 'dental · law · medical',               src: '/styles/minimalist-serif.webp',  hdSrc: '/styles/hd/minimalist-serif.webp' },
  { slug: 'de-stijl',          name: 'De Stijl',            desc: 'Mondrian-inspired geometric blocks',         tags: 'architecture · design · gallery',      src: '/styles/de-stijl.webp',          hdSrc: '/styles/hd/de-stijl.webp' },
];

export default function StyleGallery() {
  const [selected, setSelected] = useState<StyleItem | null>(null);

  return (
    <>
      <section className={styles.section} id="styles">
        <div className="container">
          <div className={styles.header}>
            <div className={styles.tag}>ls ./design-styles</div>
            <h2 className={styles.title}>Pick your style.</h2>
            <p className={styles.subtitle}>
              Every business is different. Click any style to preview it full-size — then tell us which one fits your brand.
            </p>
          </div>
          <div className={styles.grid}>
            {ITEMS.map((item) => (
              <button
                key={item.slug}
                className={styles.card}
                onClick={() => setSelected(item)}
                type="button"
              >
                <div className={styles.thumb}>
                  <Image
                    src={item.src}
                    alt={`${item.name} design style preview`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    loading="lazy"
                  />
                  <div className={styles.overlay}>Click to preview</div>
                </div>
                <div className={styles.body}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.desc}>{item.desc}</div>
                  <div className={styles.tags}>{item.tags}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen modal */}
      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelected(null)} type="button">
              ✕
            </button>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{selected.name}</h3>
              <span className={styles.modalTags}>{selected.tags}</span>
            </div>
            <div className={styles.modalImage}>
              <Image
                src={selected.hdSrc}
                alt={`${selected.name} full preview`}
                width={1280}
                height={900}
                quality={90}
                priority
              />
            </div>
            <div className={styles.modalFooter}>
              <p className={styles.modalDesc}>{selected.desc}</p>
              <a href="#contact" className={styles.modalCta} onClick={() => setSelected(null)}>
                I want this style →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
