'use client';

import { useState } from 'react';
import styles from './ShareButton.module.css';

interface Props {
  url: string;
  score: number;
}

export default function ShareButton({ url, score }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/audit?u=${encodeURIComponent(url)}`
      : `/audit?u=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select-all via a temporary input
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // give up silently
      }
      document.body.removeChild(input);
    }
  };

  const tweetText = encodeURIComponent(
    `I just scored ${score}/100 on smartflowdev's free website audit. Try yours:`
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(
    shareUrl
  )}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.copyBtn} onClick={handleCopy}>
        {copied ? '✓ Link copied' : 'Copy share link'}
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconBtn}
        aria-label="Share on X / Twitter"
      >
        Share on X
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconBtn}
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
    </div>
  );
}
