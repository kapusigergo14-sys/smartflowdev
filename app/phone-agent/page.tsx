import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './phone-agent.module.css';

export const metadata: Metadata = {
  title: 'AI Phone Agent for Dental Practices — smartflowdev',
  description:
    'Never miss a call. An AI voice agent that picks up 24/7, answers patient questions, books appointments, and emails you a transcript.',
};

const STEPS = [
  {
    num: '1',
    title: 'Patient calls',
    desc: 'A patient calls your practice outside office hours (or when your staff is busy). The AI phone agent picks up instantly.',
  },
  {
    num: '2',
    title: 'AI answers',
    desc: "The agent greets by name ('Thank you for calling Smile Dental!'), understands the question, and gives accurate answers based on your practice info.",
  },
  {
    num: '3',
    title: 'Books appointment',
    desc: 'If the patient wants to schedule, the agent checks your real calendar availability and books the slot. No human needed.',
  },
  {
    num: '4',
    title: 'You get a transcript',
    desc: 'Within minutes, you receive an email with the full call transcript, patient name, phone number, and what was discussed.',
  },
];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    title: 'Natural-sounding voice',
    desc: "Not a robotic IVR. A conversational AI that sounds like a real receptionist. Patients often don't realize it's AI.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: 'Books appointments end-to-end',
    desc: 'Checks your Google Calendar, finds open slots, books confirmed appointments. Sends confirmation to both you and the patient.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email transcripts',
    desc: 'Every call is transcribed and emailed to you within 5 minutes. Full conversation, caller ID, and summary.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        <path d="M14.05 2a9 9 0 0 1 8 7.94" />
        <path d="M14.05 6A5 5 0 0 1 18 10" />
      </svg>
    ),
    title: 'Routes urgent calls',
    desc: "If a patient says 'emergency' or 'pain', the agent immediately transfers to your personal phone. You set the rules.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Custom greeting & personality',
    desc: 'Your practice name, your tone, your hours. The agent introduces itself exactly how you want.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Business hours awareness',
    desc: 'Knows when you\'re open vs closed. During hours: takes messages. After hours: handles everything autonomously.',
  },
];

const CONVERSATION = [
  {
    role: 'ai' as const,
    text: 'Thank you for calling Riverside Dental. How can I help you tonight?',
  },
  {
    role: 'patient' as const,
    text: 'Hi, I have really bad tooth pain. Can I get an appointment tomorrow?',
  },
  {
    role: 'ai' as const,
    text: "I'm sorry to hear that. Let me check our availability for tomorrow... I have a 9:00 AM slot with Dr. Johnson. Would that work?",
  },
  {
    role: 'patient' as const,
    text: 'Yes, 9 AM is perfect.',
  },
  {
    role: 'ai' as const,
    text: "Done! You're booked for 9:00 AM tomorrow with Dr. Johnson. You'll receive a confirmation text shortly. Is there anything else I can help with?",
  },
];

export default function PhoneAgentPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ─── Section 1: Hero ─── */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <span className={`pill ${styles.pillAmber}`}>
                <span className={`pill-dot ${styles.pillDotAmber}`} />
                AI Phone Agent
              </span>
              <h1 className={`display ${styles.heroTitle}`}>
                Never miss a call. Even at{' '}
                <span className={styles.amberText}>2 AM</span>.
              </h1>
              <p className={styles.heroSub}>
                An AI voice agent that picks up when you can&apos;t. Answers
                questions, books appointments, takes messages — and emails you a
                transcript of every call.
              </p>
              <a
                href="mailto:geri@smartflowdev.com"
                className={`btn btn-glow ${styles.btnAmber}`}
              >
                Get started
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ─── Section 2: How it works ─── */}
        <ScrollReveal as="section" className={styles.howSection}>
          <div className="container">
            <h2 className={styles.howTitle}>How it works</h2>
            <div className={styles.stepsRow}>
              {STEPS.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 130}>
                  <div className={styles.step}>
                    <div className={styles.stepNumber}>{step.num}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section 3: Features ─── */}
        <ScrollReveal as="section">
          <div className="container">
            <h2 className={styles.featuresTitle}>
              Everything your front desk does — at 2 AM.
            </h2>
            <div className={styles.featuresGrid}>
              {FEATURES.map((f, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className={`card ${styles.featureCard}`}>
                    <div className={styles.featureIcon}>{f.icon}</div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section 4: Scenario ─── */}
        <ScrollReveal as="section" className={styles.scenario}>
          <div className={styles.scenarioInner}>
            <h2 className={styles.scenarioTitle}>
              Tuesday, 2:17 AM. Your phone rings.
            </h2>
            <div className={styles.chat}>
              {CONVERSATION.map((msg, i) => (
                <ScrollReveal key={i} delay={i * 200}>
                  <div
                    className={`${styles.bubble} ${
                      msg.role === 'ai' ? styles.bubbleAi : styles.bubblePatient
                    }`}
                  >
                    <div className={styles.bubbleLabel}>
                      {msg.role === 'ai' ? 'AI Agent' : 'Patient'}
                    </div>
                    {msg.text}
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className={styles.chatOutcome}>
              &#8594; Appointment booked. Transcript emailed. Patient taken care
              of. You slept through it.
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Section 5: CTA ─── */}
        <ScrollReveal as="section" className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={`display ${styles.ctaTitle}`}>
              Want to hear a demo?
            </h2>
            <p className={styles.ctaSub}>
              Email us and we&apos;ll set up a 60-second demo call to your
              phone. You&apos;ll see exactly what your patients would experience.
            </p>
            <a
              href="mailto:geri@smartflowdev.com"
              className={`btn btn-glow ${styles.ctaBtn}`}
            >
              Email geri@smartflowdev.com
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
