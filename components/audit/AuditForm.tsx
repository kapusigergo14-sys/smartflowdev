'use client';

import { useState } from 'react';
import styles from './AuditForm.module.css';

interface Props {
  onSubmit: (url: string) => void;
}

export default function AuditForm({ onSubmit }: Props) {
  const [url, setUrl] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setLocalError('Enter a website URL to audit.');
      return;
    }
    if (trimmed.length < 4 || !trimmed.includes('.')) {
      setLocalError('That doesn\'t look like a valid URL. Try something like example.com.');
      return;
    }
    setLocalError(null);
    onSubmit(trimmed);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="audit-url" className={styles.label}>
        Your website URL
      </label>
      <div className={styles.inputRow}>
        <input
          id="audit-url"
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (localError) setLocalError(null);
          }}
          placeholder="example.com"
          className={styles.input}
          autoComplete="url"
          inputMode="url"
          spellCheck={false}
          autoFocus
          aria-invalid={!!localError}
          aria-describedby={localError ? 'audit-url-error' : undefined}
        />
        <button type="submit" className={styles.submitBtn}>
          Run free audit →
        </button>
      </div>
      {localError && (
        <div id="audit-url-error" className={styles.errorText} role="alert">
          {localError}
        </div>
      )}
      <ul className={styles.trust}>
        <li>Takes 20-40 seconds</li>
        <li>No signup, no email required</li>
        <li>5 free audits per day</li>
      </ul>
    </form>
  );
}
