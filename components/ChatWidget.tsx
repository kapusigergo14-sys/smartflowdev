'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import styles from './ChatWidget.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  practiceName: string;
  accentColor?: string;
  welcomeMessage: string;
  quickReplies: string[];
  apiEndpoint?: string;
  autoOpenDelayMs?: number;
}

export default function ChatWidget({
  practiceName,
  accentColor = '#0d9488',
  welcomeMessage,
  quickReplies,
  apiEndpoint = '/api/chat/demo',
  autoOpenDelayMs = 3000,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-open once per session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadyOpened = sessionStorage.getItem('sfd_chat_auto_opened');
    if (alreadyOpened || hasAutoOpened) return;
    const t = setTimeout(() => {
      setIsOpen(true);
      setHasAutoOpened(true);
      sessionStorage.setItem('sfd_chat_auto_opened', '1');
    }, autoOpenDelayMs);
    return () => clearTimeout(t);
  }, [autoOpenDelayMs, hasAutoOpened]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content || '...' },
      ]);
    } catch (e: any) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const cssVars = { '--chat-accent': accentColor } as React.CSSProperties;

  return (
    <div className={styles.container} style={cssVars}>
      {/* Floating bubble (when closed) */}
      {!isOpen && (
        <button
          className={styles.bubble}
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className={styles.bubbleDot}></span>
        </button>
      )}

      {/* Chat card (when open) */}
      {isOpen && (
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerTitle}>{practiceName}</div>
                <div className={styles.headerStatus}>
                  <span className={styles.statusDot}></span> Online now
                </div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className={styles.messages}>
            {/* Welcome bubble */}
            <div className={`${styles.message} ${styles.assistant}`}>
              <div className={styles.bubbleMsg}>{welcomeMessage}</div>
            </div>

            {/* Quick replies (first view only) */}
            {messages.length === 0 && (
              <div className={styles.quickReplies}>
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    className={styles.quickReplyBtn}
                    onClick={() => sendMessage(qr)}
                    disabled={isLoading}
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Conversation */}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  m.role === 'user' ? styles.user : styles.assistant
                }`}
              >
                <div className={styles.bubbleMsg}>{m.content}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={`${styles.bubbleMsg} ${styles.typing}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && <div className={styles.errorBanner}>{error}</div>}
          </div>

          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              disabled={isLoading}
              maxLength={1000}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={!input.trim() || isLoading}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          <div className={styles.footer}>
            Powered by{' '}
            <a href="https://smartflowdev.com" target="_blank" rel="noopener noreferrer">
              smartflowdev.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
