'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { AuditResult } from '@/lib/audit-types';
import AuditForm from '@/components/audit/AuditForm';
import AuditProgress from '@/components/audit/AuditProgress';
import AuditResults from '@/components/audit/AuditResults';
import styles from './audit.module.css';

type Stage = 'idle' | 'running' | 'done' | 'error';

export default function AuditClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedUrl, setSubmittedUrl] = useState<string>('');
  const autoRanRef = useRef(false);

  const handleSubmit = useCallback(
    async (url: string, opts: { updateQuery?: boolean } = { updateQuery: true }) => {
      setStage('running');
      setError(null);
      setResult(null);
      setSubmittedUrl(url);

      if (opts.updateQuery && typeof window !== 'undefined') {
        const qs = new URLSearchParams();
        qs.set('u', url);
        router.replace(`/audit?${qs.toString()}`, { scroll: false });
      }

      try {
        const res = await fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Something went wrong. Please try again.');
          setStage('error');
          return;
        }

        setResult(data as AuditResult);
        setStage('done');
      } catch {
        setError('Network error. Check your connection and try again.');
        setStage('error');
      }
    },
    [router]
  );

  // Auto-run on page load if ?u=... is present
  useEffect(() => {
    if (autoRanRef.current) return;
    const u = searchParams.get('u');
    if (u && u.length > 0 && u.length < 500) {
      autoRanRef.current = true;
      handleSubmit(u, { updateQuery: false });
    }
  }, [searchParams, handleSubmit]);

  const reset = () => {
    setStage('idle');
    setResult(null);
    setError(null);
    setSubmittedUrl('');
    router.replace('/audit', { scroll: false });
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <header className={styles.header}>
          <div className="pill">
            <span className="pill-dot" />
            Free audit
          </div>
          <h1 className={`${styles.title} display`}>
            Audit your website in <span className="gradient-text">under a minute</span>
          </h1>
          <p className={styles.subtitle}>
            Paste any URL — we&apos;ll check speed, SEO, conversion features, and generate 3 specific
            improvement suggestions. No signup. No email.
          </p>
        </header>

        <div className={styles.panel}>
          {stage === 'idle' && <AuditForm onSubmit={handleSubmit} />}

          {stage === 'running' && <AuditProgress url={submittedUrl} />}

          {stage === 'error' && (
            <div className={styles.errorState}>
              <div className={styles.errorIcon}>!</div>
              <h2 className={styles.errorTitle}>Couldn&apos;t run the audit</h2>
              <p className={styles.errorMsg}>{error}</p>
              <button type="button" className="btn btn-primary" onClick={reset}>
                Try another URL
              </button>
            </div>
          )}

          {stage === 'done' && result && (
            <AuditResults result={result} onReset={reset} />
          )}
        </div>

        <footer className={styles.footer}>
          <p>
            Want us to fix these issues for you?{' '}
            <a href="mailto:geri@smartflowdev.com">geri@smartflowdev.com</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
