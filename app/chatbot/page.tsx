import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import s from './chatbot.module.css';

export const metadata: Metadata = {
  title: 'AI Chatbot for Dental Practices — smartflowdev',
  description:
    'A 24/7 AI chatbot trained on your dental practice. Answers patient questions, books appointments, captures after-hours leads. Live in 5 days.',
};

export default function ChatbotPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ──────────────────────────────── */}
        <section className={s.hero}>
          <div className={`container ${s.heroInner}`}>
            <span className="pill">
              <span className="pill-dot" />
              AI Chatbot
            </span>

            <h1 className={`display ${s.heroTitle}`}>
              A 24/7 assistant trained on{' '}
              <span className="gradient-text">your business.</span>
            </h1>

            <p className={s.heroSub}>
              A custom chatbot widget that lives on your site. Answers customer
              questions, captures leads, books appointments — all styled to match
              your brand perfectly.
            </p>

            <a href="mailto:geri@smartflowdev.com" className="btn btn-primary btn-glow">
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </section>

        {/* ── How It Works ──────────────────────── */}
        <ScrollReveal as="section" className={s.howSection}>
          <div className="container">
            <h2 className={s.howTitle}>How it works</h2>

            <div className={s.stepsRow}>
              <ScrollReveal delay={0}>
                <div className={s.step}>
                  <div className={s.stepNumber}>1</div>
                  <h3 className={s.stepTitle}>Train</h3>
                  <p className={s.stepDesc}>
                    Share your FAQs, services, pricing, and policies. We train the
                    AI specifically on your practice — it knows what you offer, your
                    hours, your insurance info.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className={s.step}>
                  <div className={s.stepNumber}>2</div>
                  <h3 className={s.stepTitle}>Install</h3>
                  <p className={s.stepDesc}>
                    We build a branded chatbot widget that matches your
                    site&rsquo;s look and feel. Custom colors, logo, tone of voice.
                    Live on your site in 5 days.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className={s.step}>
                  <div className={s.stepNumber}>3</div>
                  <h3 className={s.stepTitle}>24/7 Live</h3>
                  <p className={s.stepDesc}>
                    The chatbot answers patient questions around the clock.
                    After-hours inquiries don&rsquo;t get lost — they get answered,
                    captured, and optionally booked.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Features ──────────────────────────── */}
        <ScrollReveal as="section">
          <div className="container">
            <h2 className={s.featuresTitle}>Everything your chatbot can do</h2>

            <div className={s.featuresGrid}>
              <ScrollReveal delay={0}>
                <div className={`card ${s.featureCard}`}>
                  <div className={s.featureIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className={s.featureTitle}>Brand-matched design</h3>
                  <p className={s.featureDesc}>
                    Your colors, your logo, your tone. Patients won&rsquo;t know
                    it&rsquo;s AI — it feels like your front desk.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className={`card ${s.featureCard}`}>
                  <div className={s.featureIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h3 className={s.featureTitle}>Trained on your services</h3>
                  <p className={s.featureDesc}>
                    It knows your treatments, pricing, insurance accepted, hours.
                    Real answers, not generic chatbot responses.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className={`card ${s.featureCard}`}>
                  <div className={s.featureIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <h3 className={s.featureTitle}>After-hours lead capture</h3>
                  <p className={s.featureDesc}>
                    Patients visit at 10pm, ask about whitening, and leave their
                    email. You get the lead in your inbox by morning.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className={`card ${s.featureCard}`}>
                  <div className={s.featureIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h3 className={s.featureTitle}>Google Calendar sync</h3>
                  <p className={s.featureDesc}>
                    The chatbot checks your real availability and books
                    appointments directly into your calendar. No double-bookings.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className={`card ${s.featureCard}`}>
                  <div className={s.featureIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className={s.featureTitle}>Appointment booking</h3>
                  <p className={s.featureDesc}>
                    Patients can schedule visits through natural conversation.
                    &ldquo;I need a cleaning next Tuesday&rdquo; — booked.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className={`card ${s.featureCard}`}>
                  <div className={s.featureIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <h3 className={s.featureTitle}>Multilingual</h3>
                  <p className={s.featureDesc}>
                    Serves patients in English, Spanish, or any language your
                    community speaks.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Scenario ──────────────────────────── */}
        <ScrollReveal as="section" className={s.scenario}>
          <div className={s.scenarioInner}>
            <h2 className={s.scenarioTitle}>
              It&rsquo;s 11pm. A patient visits your site.
            </h2>

            <div className={s.chat}>
              <ScrollReveal delay={0}>
                <div className={`${s.bubble} ${s.bubblePatient}`}>
                  <div className={s.bubbleLabel}>Patient</div>
                  Do you take Delta Dental?
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className={`${s.bubble} ${s.bubbleBot}`}>
                  <div className={s.bubbleLabel}>Chatbot</div>
                  Yes! We accept Delta Dental PPO and Premier plans. Would you
                  like to schedule an appointment?
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className={`${s.bubble} ${s.bubblePatient}`}>
                  <div className={s.bubbleLabel}>Patient</div>
                  Can I come in Tuesday morning?
                </div>
              </ScrollReveal>

              <ScrollReveal delay={600}>
                <div className={`${s.bubble} ${s.bubbleBot}`}>
                  <div className={s.bubbleLabel}>Chatbot</div>
                  I have a 9:30 AM slot available on Tuesday. Shall I book that
                  for you?
                </div>
              </ScrollReveal>
            </div>

            <div className={s.chatOutcome}>
              Appointment booked. Patient confirmed. You get an email.
            </div>

            <p className={s.scenarioFooter}>
              Without the chatbot, this patient bounces. Googles the next
              practice. You never know they existed.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Pricing ───────────────────────────── */}
        <ScrollReveal as="section">
          <div className="container">
            <h2 className={s.pricingTitle}>Simple, transparent pricing</h2>

            <div className={`card ${s.pricingCard}`}>
              <div className={s.priceMain}>$2,500</div>
              <div className={s.priceLabel}>one-time setup</div>

              <div className={s.priceSub}>
                <span className={s.priceMonthly}>$49/month</span>
              </div>
              <div className={s.priceMonthlyLabel}>
                hosting, AI, priority support
              </div>
              <div className={s.priceFree}>First month free</div>

              <ul className={s.priceList}>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Custom design matching your brand
                </li>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  AI trained on your practice
                </li>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Full installation on your website
                </li>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  5-day delivery
                </li>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Google Calendar integration
                </li>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Unlimited conversations
                </li>
                <li>
                  <span className={s.checkIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Ongoing updates &amp; improvements
                </li>
              </ul>

              <a href="mailto:geri@smartflowdev.com" className="btn btn-accent btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                Get started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ── CTA ───────────────────────────────── */}
        <ScrollReveal as="section" className={s.cta}>
          <div className={s.ctaInner}>
            <h2 className={s.ctaTitle}>Want to see it in action?</h2>
            <p className={s.ctaSub}>
              Reply &ldquo;show me&rdquo; and I&rsquo;ll send a 2-minute video
              of a real dental chatbot. Or just email us to get started.
            </p>
            <a href="mailto:geri@smartflowdev.com" className={`btn btn-glow ${s.ctaBtn}`}>
              Email geri@smartflowdev.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
