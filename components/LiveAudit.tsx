'use client';

import { useState, useCallback } from 'react';
import { runAudit } from '@/app/actions/audit';
import type { OutdatedScore } from '@/lib/types';
import Terminal, { TerminalLine } from './Terminal';
import ScoreReveal from './ScoreReveal';
import styles from './LiveAudit.module.css';

type Stage = 'idle' | 'scanning' | 'done';

export default function LiveAudit() {
  const [url, setUrl] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [result, setResult] = useState<OutdatedScore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runStream = useCallback(async (target: string) => {
    setStage('scanning');
    setError(null);

    const newLines: TerminalLine[] = [
      { kind: 'prompt', text: `./scan-site --url=${target}` },
      { kind: 'output', text: 'resolving host...' },
    ];
    setLines([...newLines]);

    const auditPromise = runAudit(target);

    await new Promise(r => setTimeout(r, 400));
    newLines.push({ kind: 'output', text: 'fetching html...' });
    setLines([...newLines]);

    await new Promise(r => setTimeout(r, 600));
    newLines.push({ kind: 'output', text: 'detecting tech stack...' });
    setLines([...newLines]);

    await new Promise(r => setTimeout(r, 500));
    newLines.push({ kind: 'output', text: 'measuring page weight...' });
    setLines([...newLines]);

    await new Promise(r => setTimeout(r, 500));
    newLines.push({ kind: 'output', text: 'running pagespeed insights...' });
    setLines([...newLines]);

    const res = await auditPromise;

    if (res.blocked) {
      newLines.push({ kind: 'error', text: `audit blocked: ${res.error || 'site rejected request'}` });
      setLines([...newLines]);
      setError(res.error || 'blocked');
      setResult(res);
      setStage('done');
      return;
    }

    if (res.signals.wordpress) newLines.push({ kind: 'warn', text: 'wordpress detected' });
    if (res.observations.jqueryVersion) newLines.push({ kind: 'warn', text: `jquery ${res.observations.jqueryVersion} found` });
    else if (res.signals.jquery) newLines.push({ kind: 'warn', text: 'jquery detected' });
    if (res.signals.exposedDirListing) newLines.push({ kind: 'error', text: '/wp-includes/ publicly browsable' });
    if (res.observations.pageWeightMb !== null) {
      const weight = res.observations.pageWeightMb;
      const kind: TerminalLine['kind'] = weight >= 6 ? 'error' : weight >= 3 ? 'warn' : 'success';
      newLines.push({ kind, text: `page weight: ${weight}MB` });
    }
    if (res.signals.psiMobileScore !== null) {
      const psi = res.signals.psiMobileScore;
      const kind: TerminalLine['kind'] = psi < 40 ? 'error' : psi < 70 ? 'warn' : 'success';
      newLines.push({ kind, text: `psi mobile: ${psi}/100` });
    }
    if (res.observations.lcpSeconds !== null) {
      const lcp = res.observations.lcpSeconds;
      const kind: TerminalLine['kind'] = lcp >= 4 ? 'error' : lcp >= 2.5 ? 'warn' : 'success';
      newLines.push({ kind, text: `lcp: ${lcp}s` });
    }
    newLines.push({ kind: 'success', text: 'scan complete.' });
    setLines([...newLines]);

    setResult(res);
    setStage('done');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Enter a website URL');
      return;
    }
    runStream(trimmed);
  };

  const reset = () => {
    setStage('idle');
    setResult(null);
    setError(null);
    setLines([]);
    setUrl('');
  };

  return (
    <section className={styles.section} id="audit">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.tag}>./audit --your-site</div>
          <h2 className={styles.title}>Run a free audit on your site.</h2>
          <p className={styles.subtitle}>
            Paste your URL. We&apos;ll check tech stack, mobile speed, page weight — the same things Google cares about. 8 seconds, no email required.
          </p>
        </div>

        <div className={styles.content}>
          {stage === 'done' && result ? (
            <div className={styles.resultWrap}>
              <ScoreReveal result={result} onReset={reset} />
            </div>
          ) : (
            <>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="your-website.com"
                    className={styles.input}
                    disabled={stage === 'scanning'}
                    autoComplete="url"
                    inputMode="url"
                    spellCheck={false}
                  />
                  <button type="submit" className={styles.submitBtn} disabled={stage === 'scanning'}>
                    {stage === 'scanning' ? 'scanning...' : 'scan it →'}
                  </button>
                </div>
                {error && <div className={styles.errorText}>{error}</div>}
                <div className={styles.trust}>takes 8s. no email required.</div>
              </form>
              {stage === 'scanning' && (
                <div className={styles.terminalWrap}>
                  <Terminal lines={lines} title="audit.sh" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
