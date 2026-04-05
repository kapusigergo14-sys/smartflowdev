'use client';

import { useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

export type TerminalLineKind = 'prompt' | 'output' | 'comment' | 'success' | 'warn' | 'error';

export interface TerminalLine {
  kind: TerminalLineKind;
  text: string;
}

interface Props {
  lines: TerminalLine[];
  title?: string;
  showCursor?: boolean;
}

export default function Terminal({ lines, title = 'audit ~ smartflowdev.com', showCursor = true }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className={styles.terminal}>
      <div className={styles.titlebar}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body} ref={bodyRef}>
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          let prefix = '';
          let prefixClass = styles.prefix;
          let textClass = styles.text;
          if (line.kind === 'prompt') { prefix = '>'; }
          else if (line.kind === 'output') { prefix = ' '; prefixClass = styles.prefixMuted; }
          else if (line.kind === 'comment') { prefix = '#'; prefixClass = styles.prefixMuted; textClass = styles.textMuted; }
          else if (line.kind === 'success') { prefix = '✓'; textClass = styles.textAccent; }
          else if (line.kind === 'warn') { prefix = '!'; textClass = styles.textAmber; prefixClass = `${styles.prefix} ${styles.textAmber}`; }
          else if (line.kind === 'error') { prefix = '✗'; textClass = styles.textRed; prefixClass = `${styles.prefix} ${styles.textRed}`; }
          return (
            <div key={i} className={styles.line}>
              <span className={prefixClass}>{prefix}</span>
              <span className={textClass}>
                {line.text}
                {isLast && showCursor && <span className="cursor-blink" />}
              </span>
            </div>
          );
        })}
        {lines.length === 0 && showCursor && (
          <div className={styles.line}>
            <span className={styles.prefix}>&gt;</span>
            <span className="cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
