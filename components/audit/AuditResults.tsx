'use client';

import type { AuditResult } from '@/lib/audit-types';
import ScoreBar from './ScoreBar';
import DetectionCard from './DetectionCard';
import SuggestionList from './SuggestionList';
import ShareButton from './ShareButton';
import styles from './AuditResults.module.css';

interface Props {
  result: AuditResult;
  onReset: () => void;
}

export default function AuditResults({ result, onReset }: Props) {
  const { phases, overallScore, url } = result;

  const screenshot = phases.screenshot.status === 'success' ? phases.screenshot.data : null;
  const psiMobile = phases.psiMobile.status === 'success' ? phases.psiMobile.data : null;
  const chatbot = phases.chatbot.status === 'success' ? phases.chatbot.data : null;
  const booking = phases.booking.status === 'success' ? phases.booking.data : null;
  const seo = phases.seo.status === 'success' ? phases.seo.data : null;
  const suggestions = phases.suggestions.status === 'success' ? phases.suggestions.data : null;

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <p className={styles.auditedLabel}>Audited</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.auditedUrl}
          >
            {url}
          </a>
        </div>
        <button type="button" className={styles.resetBtn} onClick={onReset}>
          Audit another site
        </button>
      </header>

      <ScoreBar score={overallScore} />

      {/* Screenshots */}
      {screenshot && (screenshot.mobileUrl || screenshot.desktopUrl) && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>How it looks</h3>
          <div className={styles.screenshotGrid}>
            {screenshot.desktopUrl && (
              <figure className={styles.screenshotFig}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshot.desktopUrl}
                  alt={`Desktop screenshot of ${url}`}
                  className={styles.screenshotDesktop}
                  loading="lazy"
                />
                <figcaption>Desktop</figcaption>
              </figure>
            )}
            {screenshot.mobileUrl && (
              <figure className={styles.screenshotFig}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshot.mobileUrl}
                  alt={`Mobile screenshot of ${url}`}
                  className={styles.screenshotMobile}
                  loading="lazy"
                />
                <figcaption>Mobile</figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Performance */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Mobile performance</h3>
        <div className={styles.metricGrid}>
          <MetricCard
            label="Google PageSpeed"
            value={psiMobile ? `${psiMobile.score}/100` : '—'}
            tone={psiMobile ? scoreTone(psiMobile.score) : 'neutral'}
            sub={psiMobile?.lcpSeconds != null ? `LCP ${psiMobile.lcpSeconds.toFixed(1)}s` : undefined}
          />
          <MetricCard
            label="Largest Contentful Paint"
            value={psiMobile?.lcpSeconds != null ? `${psiMobile.lcpSeconds.toFixed(1)}s` : '—'}
            tone={
              psiMobile?.lcpSeconds == null
                ? 'neutral'
                : psiMobile.lcpSeconds <= 2.5
                ? 'good'
                : psiMobile.lcpSeconds <= 4
                ? 'ok'
                : 'bad'
            }
            sub="Good is under 2.5s"
          />
        </div>
        {(phases.psiMobile.status === 'skipped' || phases.psiMobile.status === 'failed') && (
          <p className={styles.noteText}>
            PageSpeed data unavailable — {phases.psiMobile.error || 'not run'}.
          </p>
        )}
      </section>

      {/* Features */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Features</h3>
        <div className={styles.cardGrid}>
          <DetectionCard
            label="AI chatbot"
            result={chatbot}
            phaseStatus={phases.chatbot.status}
            missingCopy="We couldn't detect a chatbot on this page."
          />
          <DetectionCard
            label="Online booking"
            result={booking}
            phaseStatus={phases.booking.status}
            missingCopy="We couldn't detect an online booking widget."
          />
        </div>
      </section>

      {/* SEO + Trust */}
      {seo && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>SEO & Trust</h3>
          <div className={styles.checklist}>
            <CheckItem ok={seo.https} label="HTTPS enabled" />
            <CheckItem ok={seo.viewport} label="Mobile viewport meta tag" />
            <CheckItem ok={seo.schema} label="Schema.org structured data" />
            <CheckItem ok={seo.ogImage} label="Open Graph image" />
            <CheckItem ok={seo.favicon} label="Favicon" />
          </div>
        </section>
      )}

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>3 suggestions to improve this</h3>
          <SuggestionList suggestions={suggestions} />
        </section>
      )}

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Share this audit</h3>
        <ShareButton url={url} score={overallScore} />
      </section>

      <div className={styles.ctaBox}>
        <h3>Want us to implement these for you?</h3>
        <p>We&apos;ll ship a new site or upgrade this one in 5-10 days. Flat pricing from $800.</p>
        <a href="mailto:geri@smartflowdev.com" className="btn btn-primary">
          Email geri@smartflowdev.com
        </a>
      </div>
    </div>
  );
}

function scoreTone(score: number): 'good' | 'ok' | 'bad' {
  if (score >= 80) return 'good';
  if (score >= 50) return 'ok';
  return 'bad';
}

function MetricCard({
  label,
  value,
  tone,
  sub,
}: {
  label: string;
  value: string;
  tone: 'good' | 'ok' | 'bad' | 'neutral';
  sub?: string;
}) {
  return (
    <div className={styles.metricCard} data-tone={tone}>
      <div className={styles.metricLabel}>{label}</div>
      <div className={styles.metricValue}>{value}</div>
      {sub && <div className={styles.metricSub}>{sub}</div>}
    </div>
  );
}

function CheckItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={styles.checkItem} data-ok={ok}>
      <span className={styles.checkIcon} aria-hidden="true">
        {ok ? '✓' : '×'}
      </span>
      <span>{label}</span>
    </div>
  );
}
