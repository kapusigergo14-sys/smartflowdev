'use client';

import { useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContact } from '@/app/actions/contact';
import { BUDGET_OPTIONS } from '@/lib/types';
import type { ContactResult } from '@/lib/types';
import styles from './Contact.module.css';

const initialState: ContactResult | null = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`btn btn-primary ${styles.submit}`}>
      {pending ? (
        <>
          <span className={styles.spinner} aria-hidden="true"></span>
          Sending…
        </>
      ) : (
        <>
          Send message
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </>
      )}
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useFormState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
    // Server-state reset: a fresh submission clears prev state naturally once user submits again.
    // To fully wipe success state, force remount via key — simpler: reload fragment.
    window.location.hash = '#contact';
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* ── Left: narrative ───────────────────────────── */}
          <div className={styles.left}>
            <div className="pill"><span className="pill-dot"></span> Let&apos;s talk</div>

            <h2 className={`display ${styles.title}`}>
              Ready to ship a<br />
              site <span className="gradient-text">that actually works?</span>
            </h2>

            <p className={styles.sub}>
              Tell me about your project. I read every message myself and reply within a few hours.
            </p>

            <div className={styles.meta}>
              <a href="mailto:geri@smartflowdev.com" className={styles.metaCard}>
                <div className={styles.metaIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div className={styles.metaBody}>
                  <div className={styles.metaLabel}>Email</div>
                  <div className={styles.metaValue}>geri@smartflowdev.com</div>
                </div>
                <svg className={styles.metaArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>

              <div className={styles.metaCard}>
                <div className={styles.metaIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className={styles.metaBody}>
                  <div className={styles.metaLabel}>Response time</div>
                  <div className={styles.metaValue}>Within hours · Mon–Fri</div>
                </div>
              </div>

              <div className={styles.metaCard}>
                <div className={styles.metaIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.metaBody}>
                  <div className={styles.metaLabel}>Based in</div>
                  <div className={styles.metaValue}>Hungary · Working globally</div>
                </div>
              </div>
            </div>

            <div className={styles.signature}>
              <div className={styles.sigAvatar}>G</div>
              <div className={styles.sigText}>
                <div className={styles.sigName}>Geri</div>
                <div className={styles.sigRole}>Founder · I reply personally</div>
              </div>
            </div>
          </div>

          {/* ── Right: form card ──────────────────────────── */}
          <div className={styles.right}>
            <div className={styles.card}>
              {state?.ok ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Got it.</h3>
                  <p className={styles.successSub}>
                    Thanks — I&apos;ll reply within a few hours. Keep an eye on your inbox (and the spam folder, just in case).
                  </p>
                  <button type="button" onClick={resetForm} className={styles.successBack}>
                    ← Send another
                  </button>
                </div>
              ) : (
                <form ref={formRef} action={formAction} className={styles.form} noValidate>
                  <div className={styles.formHeader}>
                    <span className={styles.eyebrow}>PROJECT BRIEF</span>
                    <span className={styles.stepCounter}>5 fields · 60 seconds</span>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-name" className={styles.label}>
                      Your name <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      className={styles.input}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-email" className={styles.label}>
                      Email <span className={styles.req}>*</span>
                    </label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      className={styles.input}
                      placeholder="jane@company.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-website" className={styles.label}>
                      Current website <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="c-website"
                      name="website"
                      type="text"
                      maxLength={300}
                      className={styles.input}
                      placeholder="your-site.com"
                      autoComplete="url"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-budget" className={styles.label}>
                      Project budget
                    </label>
                    <div className={styles.selectWrap}>
                      <select
                        id="c-budget"
                        name="budget"
                        className={styles.select}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a range…</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <svg className={styles.selectCaret} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="c-message" className={styles.label}>
                      Project details <span className={styles.req}>*</span>
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={5}
                      className={styles.textarea}
                      placeholder="Tell me what you&apos;re trying to build, who it&apos;s for, and what needs to change."
                    />
                  </div>

                  {state && !state.ok && state.error && (
                    <div className={styles.error}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {state.error}
                    </div>
                  )}

                  <SubmitButton />

                  <p className={styles.fineprint}>
                    By submitting, you agree to receive a reply at your email. No mailing list, no spam — just a human reply.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
