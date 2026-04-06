'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { submitContact } from '@/app/actions/contact';
import styles from './ContactForm.module.css';

const STYLE_OPTIONS = [
  { value: '', label: 'Not sure yet', tags: '', hdSrc: '' },
  { value: 'Swiss Modern', label: 'Swiss Modern', tags: 'law · finance · medical', hdSrc: '/styles/hd/swiss-modern.webp' },
  { value: 'Luxury Typography', label: 'Luxury Typography', tags: 'dental · hotel · boutique', hdSrc: '/styles/hd/luxury-type.webp' },
  { value: 'Aurora', label: 'Aurora', tags: 'dental · wellness · spa', hdSrc: '/styles/hd/aurora-ui.webp' },
  { value: 'Warm Professional', label: 'Warm Professional', tags: 'dental · medical · wellness', hdSrc: '/styles/hd/warm-professional.webp' },
  { value: 'Art Nouveau', label: 'Art Nouveau', tags: 'bakery · florist · salon', hdSrc: '/styles/hd/art-nouveau.webp' },
  { value: 'Flat Corporate', label: 'Flat Corporate', tags: 'real estate · insurance · B2B', hdSrc: '/styles/hd/flat-corporate.webp' },
  { value: 'Hero Centric', label: 'Hero Centric', tags: 'roofing · construction · auto', hdSrc: '/styles/hd/hero-centric.webp' },
  { value: 'Conversion Pro', label: 'Conversion Pro', tags: 'plumbing · HVAC · electrical', hdSrc: '/styles/hd/conversion-pro.webp' },
  { value: 'Feature Showcase', label: 'Feature Showcase', tags: 'dental · medical · chiropractic', hdSrc: '/styles/hd/feature-showcase.webp' },
  { value: 'Paper & Ink', label: 'Paper & Ink', tags: 'law · accounting · consulting', hdSrc: '/styles/hd/paper-ink.webp' },
  { value: 'Minimalist Motion', label: 'Minimalist Motion', tags: 'dental · law · medical', hdSrc: '/styles/hd/minimalist-serif.webp' },
  { value: 'De Stijl', label: 'De Stijl', tags: 'architecture · design · gallery', hdSrc: '/styles/hd/de-stijl.webp' },
];

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? 'sending...' : '> send.sh'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, null);
  const [selectedStyle, setSelectedStyle] = useState('');

  const current = STYLE_OPTIONS.find(s => s.value === selectedStyle);
  const hasPreview = current && current.hdSrc;

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.grid}>
          {/* LEFT: Form */}
          <div className={styles.formSide}>
            <div className={styles.tag}>./contact --new</div>
            <h2 className={styles.title}>Let&apos;s talk about your site.</h2>
            <p className={styles.subtitle}>
              Drop a message. I reply within 12 hours — usually faster.
            </p>

            {state?.ok ? (
              <div className={styles.statusOk}>message sent. talk soon.</div>
            ) : (
              <form className={styles.form} action={formAction}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>name</label>
                  <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>email</label>
                  <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="website" className={styles.label}>website (optional)</label>
                  <input id="website" name="website" type="text" maxLength={300} placeholder="your-site.com" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="style" className={styles.label}>preferred style</label>
                  <select
                    id="style"
                    name="style"
                    className={styles.select}
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                  >
                    {STYLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>message</label>
                  <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={4} />
                </div>
                {state?.error && <div className={styles.statusErr}>{state.error}</div>}
                <SubmitBtn />
              </form>
            )}
          </div>

          {/* RIGHT: Live preview */}
          <div className={styles.previewSide}>
            <div className={`${styles.previewCard} ${hasPreview ? styles.active : ''}`}>
              <div className={styles.previewImage}>
                {hasPreview ? (
                  <Image
                    key={current.hdSrc}
                    src={current.hdSrc}
                    alt={`${current.label} preview`}
                    fill
                    sizes="(max-width: 900px) 90vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                ) : (
                  <div className={styles.previewPlaceholder}>
                    <div className={styles.icon}>◇</div>
                    <div>Pick a style from the dropdown<br />to preview it here</div>
                  </div>
                )}
              </div>
              {hasPreview && (
                <div className={styles.previewInfo}>
                  <span className={styles.previewName}>{current.label}</span>
                  <span className={styles.previewTags}>{current.tags}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
