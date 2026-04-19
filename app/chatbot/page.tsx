import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { OfferBanner, DiscountPrice } from '@/components/OfferCountdown';
import s from './chatbot.module.css';

export const metadata: Metadata = {
  title: 'AI Chatbot + Online Booking for Dental Practices — smartflowdev',
  description:
    'Custom-built, brand-matched AI chatbot + online booking system for dental practices. Live on your website within 5 business days.',
};

const checkSvg = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ChatbotPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Section 1: Hero ──────────────────────── */}
        <section className={s.hero}>
          <div className={`container ${s.heroInner}`}>
            <span className="pill">
              <span className="pill-dot" />
              For dental practices
            </span>

            <h1 className={`display ${s.heroTitle}`}>
              Ship a chatbot that feels{' '}
              <span className="gradient-text">native</span> to your site.
            </h1>

            <p className={s.heroSub}>
              Custom-built, brand-matched AI chatbot + online booking system — built
              end-to-end and live on your website within 5 business days.
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

        {/* ── Section 2: Two things ────────────────── */}
        <ScrollReveal as="section" className={s.twoThings}>
          <div className="container">
            <div className={s.sectionHeader}>
              <span className="pill">
                <span className="pill-dot" />
                What we do
              </span>
              <h2 className={`display ${s.sectionTitle}`}>
                Two things.{' '}
                <span className="gradient-text">Done properly.</span>
              </h2>
              <p className={s.sectionSub}>
                We don&rsquo;t redesign your website. We add what&rsquo;s missing — without
                touching what already works.
              </p>
            </div>

            <div className={s.twoCards}>
              <ScrollReveal delay={0}>
                <div className={`${s.serviceCard} ${s.serviceCardIndigo}`}>
                  <div className={s.serviceBlob} />
                  <div className={s.serviceIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <h3 className={s.serviceLabel}>AI chatbot</h3>
                  <p className={s.serviceDesc}>
                    Trained on your practice data — services, hours, pricing, FAQs. Answers
                    patient questions 24/7 and flags urgent cases.
                  </p>
                  <ul className={s.serviceChecks}>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Brand-matched to your site</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Handles after-hours enquiries</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Captures every lead automatically</li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className={`${s.serviceCard} ${s.serviceCardAmber}`}>
                  <div className={s.serviceBlob} />
                  <div className={s.serviceIcon}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h3 className={s.serviceLabel}>Online booking</h3>
                  <p className={s.serviceDesc}>
                    Patients book in 3 clicks. Synced to your Google Calendar instantly.
                    SMS reminders included.
                  </p>
                  <ul className={s.serviceChecks}>
                    <li><span className={`${s.checkIcon} ${s.checkIconAmber}`}>{checkSvg}</span> Google Calendar sync</li>
                    <li><span className={`${s.checkIcon} ${s.checkIconAmber}`}>{checkSvg}</span> SMS appointment reminders</li>
                    <li><span className={`${s.checkIcon} ${s.checkIconAmber}`}>{checkSvg}</span> Works on mobile (most do)</li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={300}>
              <div className={s.tagRow}>
                <span className={s.tag}>Branded</span>
                <span className={s.tag}>24/7 online</span>
                <span className={s.tag}>Turnkey install</span>
                <span className={s.tag}>No dev work for you</span>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* ── Section 3: The chatbot ───────────────── */}
        <ScrollReveal as="section" className={s.chatbotSection}>
          <div className={`container ${s.splitRow}`}>
            <div className={s.splitLeft55}>
              <span className="pill">
                <span className="pill-dot" />
                The chatbot
              </span>
              <h2 className={`display ${s.splitTitle}`}>
                Looks like your site.{' '}
                <span className="gradient-text">Built from scratch.</span>
              </h2>
              <p className={s.splitSub}>
                Not a generic Intercom widget slapped on. We match your colors, typography,
                tone — so it feels native. Patients don&rsquo;t even notice it&rsquo;s a
                chatbot at first.
              </p>

              <div className={s.featureGrid}>
                {[
                  ['Brand-matched', 'Pixel-perfect to your design'],
                  ['Trained on you', 'Services, hours, pricing, FAQs'],
                  ['24/7 on', 'Even at 2 AM'],
                  ['Lead capture', 'Every message to reception'],
                  ['Emergency triage', 'Flags urgent cases'],
                  ['Analytics', 'Tracked in Google Analytics'],
                ].map(([title, desc], i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <div className={s.featureMini}>
                      <span className={s.checkIcon}>{checkSvg}</span>
                      <div>
                        <strong>{title}</strong>
                        <span className={s.featureMiniDesc}>{desc}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal delay={200} className={s.splitRight45}>
              <div className={s.chatMockup}>
                <div className={s.chatHeader}>
                  <div className={s.chatHeaderLeft}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    <span>Chat with us</span>
                  </div>
                  <div className={s.chatOnline}>
                    <span className={s.greenDot} />
                    Online now
                  </div>
                </div>

                <div className={s.chatMessages}>
                  <div className={`${s.chatBubble} ${s.chatBubbleBot}`}>
                    Hi! 👋 How can I help today? I can book appointments, answer questions, or connect you to reception.
                  </div>
                  <div className={`${s.chatBubble} ${s.chatBubbleUser}`}>
                    I&rsquo;d like to book a check-up for my son.
                  </div>
                  <div className={`${s.chatBubble} ${s.chatBubbleBot}`}>
                    Sure! What day works for you — this week or next? 📅
                  </div>
                </div>

                <div className={s.chatInput}>
                  <span className={s.chatInputText}>Type your message...</span>
                  <button className={s.chatSendBtn} aria-label="Send">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        {/* ── Section 4: Online booking ────────────── */}
        <ScrollReveal as="section" className={s.bookingSection}>
          <div className={`container ${s.splitRow} ${s.splitRowReverse}`}>
            <ScrollReveal delay={200} className={s.splitLeft45}>
              <div className={s.calendarMockup}>
                <div className={s.calHeader}>
                  <span className={s.calLabel}>RESERVE APPOINTMENT</span>
                  <h4 className={s.calTitle}>Pick a time</h4>
                </div>

                <div className={s.calGrid}>
                  <div className={s.calDays}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <span key={i} className={s.calDayHeader}>{d}</span>
                    ))}
                  </div>
                  <div className={s.calDates}>
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((d) => (
                      <span key={d} className={`${s.calDate} ${d === 10 ? s.calDateSelected : ''}`}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <span className={s.calLabel} style={{ marginTop: '20px', display: 'block' }}>AVAILABLE TIMES</span>
                <div className={s.timeSlots}>
                  {['9:00', '10:30', '11:00', '14:00', '15:30', '16:00'].map((t, i) => (
                    <button key={i} className={`${s.timeSlot} ${t === '11:00' ? s.timeSlotSelected : ''}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <button className={s.calConfirm}>
                  Confirm booking
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </ScrollReveal>

            <div className={s.splitRight55}>
              <span className="pill">
                <span className="pill-dot" />
                Online booking
              </span>
              <h2 className={`display ${s.splitTitle}`}>
                <span className="gradient-text">3 clicks.</span> Done.
              </h2>
              <p className={s.splitSub}>
                Patients pick a date, a time, a service. Appointment lands in your Google
                Calendar in seconds. No phone tag, no hold music, no missed calls.
              </p>

              <div className={s.featureGrid}>
                {[
                  ['Calendar sync', 'Instant Google Calendar entry'],
                  ['SMS reminders', '24h before appointment'],
                  ['Mobile-first', 'Most patients book from phone'],
                  ['Self-service', 'Reschedule without calling'],
                  ['Auto-confirm', 'Email to patient instantly'],
                  ['Your workflow', 'Integrates with your tools'],
                ].map(([title, desc], i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <div className={s.featureMini}>
                      <span className={s.checkIcon}>{checkSvg}</span>
                      <div>
                        <strong>{title}</strong>
                        <span className={s.featureMiniDesc}>{desc}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Section 5: Stats (dark) ──────────────── */}
        <ScrollReveal as="section" className={s.statsSection}>
          <div className="container">
            <div className={s.sectionHeader}>
              <span className={`pill ${s.pillDark}`}>
                <span className="pill-dot" />
                The data
              </span>
              <h2 className={`display ${s.statsSectionTitle}`}>
                Patients in 2026 don&rsquo;t{' '}
                <span className={s.roseText}>wait.</span>
              </h2>
              <p className={s.statsSubtitle}>
                This is how people actually choose and book dental care now. Not predictions —
                actual behavior across tens of thousands of patient journeys.
              </p>
            </div>

            <div className={s.statsGrid}>
              {[
                { value: '73%', color: 'lime', text: 'expect a reply within 1 hour' },
                { value: '68%', color: 'lime', text: 'prefer online booking over phone' },
                { value: '3\u00D7', color: 'amber', text: 'more bookings with chatbot + booking' },
                { value: '7\u00D7', color: 'rose', text: 'higher conversion when responding in 1h' },
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className={s.statCard}>
                    <div className={`${s.statValue} ${s[`stat_${stat.color}`]}`}>
                      {stat.value}
                    </div>
                    <p className={s.statText}>{stat.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <p className={s.statsSource}>
              Sources: Google Consumer Insights, HubSpot Research 2025, BrightLocal Consumer Survey
            </p>
          </div>
        </ScrollReveal>

        {/* ── Section 6: Pricing ───────────────────── */}
        <ScrollReveal as="section" id="pricing" className={s.pricingSection}>
          <div className="container">
            <div className={s.pricingHeader}>
              <div>
                <span className="pill">
                  <span className="pill-dot" />
                  Pricing
                </span>
                <h2 className={`display ${s.sectionTitle}`}>
                  Pick a plan.{' '}
                  <span className="gradient-text">Cancel anytime.</span>
                </h2>
              </div>
              <p className={s.pricingNote}>One-time setup + optional monthly</p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <OfferBanner />
            </div>

            <div className={s.pricingGrid}>
              {/* Starter */}
              <ScrollReveal delay={0}>
                <div className={`${s.priceCard}`}>
                  <h3 className={s.planName}>Starter</h3>
                  <div className={s.planPrice}><DiscountPrice amount={700} /></div>
                  <div className={s.planPriceLabel}>one-time setup</div>
                  <div className={s.planMonthly}>+$49 <span>/month</span></div>
                  <div className={s.planMonthlyLabel}>support, hosting &amp; updates</div>
                  <div className={s.planDivider} />
                  <ul className={s.planFeatures}>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Branded chatbot setup</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Google Calendar booking</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Hosting &amp; maintenance</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> 30-day post-launch support</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Email support</li>
                  </ul>
                  <a href="mailto:geri@smartflowdev.com" className={`btn btn-primary btn-glow ${s.planBtn}`}>
                    Get started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>

              {/* Professional */}
              <ScrollReveal delay={100}>
                <div className={s.priceCardFeaturedWrap}>
                  <span className={s.popularBadge}>MOST POPULAR</span>
                  <div className={`${s.priceCard} ${s.priceCardFeatured}`}>
                    <h3 className={s.planName}>Professional</h3>
                    <div className={s.planPrice}><DiscountPrice amount={1300} /></div>
                    <div className={s.planPriceLabel}>one-time setup</div>
                    <div className={s.planMonthly}>+$79 <span>/month</span></div>
                    <div className={s.planMonthlyLabel}>support, hosting &amp; updates</div>
                    <div className={s.planDivider} />
                    <ul className={s.planFeatures}>
                      <li><span className={s.checkIcon}>{checkSvg}</span> Everything in Starter</li>
                      <li><span className={s.checkIcon}>{checkSvg}</span> SMS appointment reminders</li>
                      <li><span className={s.checkIcon}>{checkSvg}</span> Analytics dashboard</li>
                      <li><span className={s.checkIcon}>{checkSvg}</span> 90-day post-launch support</li>
                      <li><span className={s.checkIcon}>{checkSvg}</span> Priority support</li>
                      <li><span className={s.checkIcon}>{checkSvg}</span> Quarterly updates</li>
                    </ul>
                    <a href="mailto:geri@smartflowdev.com" className={`btn btn-accent btn-glow ${s.planBtn}`}>
                      Get started
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* Premium */}
              <ScrollReveal delay={200}>
                <div className={`${s.priceCard}`}>
                  <h3 className={`${s.planName} ${s.planNameAccent}`}>Premium</h3>
                  <div className={s.planPrice}><DiscountPrice amount={1900} /></div>
                  <div className={s.planPriceLabel}>one-time setup</div>
                  <div className={s.planMonthly}>+$129 <span>/month</span></div>
                  <div className={s.planMonthlyLabel}>support, hosting &amp; updates</div>
                  <div className={s.planDivider} />
                  <ul className={s.planFeatures}>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Everything in Professional</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> AI phone agent</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Custom training data</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> 12-month post-launch support</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Dedicated account manager</li>
                    <li><span className={s.checkIcon}>{checkSvg}</span> Monthly strategy calls</li>
                  </ul>
                  <a href="mailto:geri@smartflowdev.com" className={`btn btn-primary btn-glow ${s.planBtn}`}>
                    Get started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Section 7: CTA ───────────────────────── */}
        <ScrollReveal as="section" className={s.ctaSection}>
          <div className="container">
            <div className={s.sectionHeader}>
              <span className="pill">
                <span className="pill-dot" />
                Let&rsquo;s do this
              </span>
              <h2 className={`display ${s.sectionTitle}`}>
                Live on your site in{' '}
                <span className="gradient-text">5 business days.</span>
              </h2>
              <p className={s.sectionSub}>
                Reply to the email and we&rsquo;ll take it from there — built end-to-end
                and installed on your website within 5 business days of order confirmation.
              </p>
            </div>

            <div className={s.stepsRow}>
              {[
                { num: '01', title: 'Reply', desc: 'Hit reply to the email. Tell us which plan fits.' },
                { num: '02', title: 'We build', desc: 'End-to-end production matched to your brand.' },
                { num: '03', title: 'Go live', desc: 'Installed and live on your site in 5 days.' },
              ].map((step, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className={s.stepCard}>
                    <span className={s.stepNum}>{step.num}</span>
                    <h3 className={s.stepTitle}>{step.title}</h3>
                    <p className={s.stepDesc}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={450}>
              <div className={s.ctaBar}>
                <div className={s.ctaBarLeft}>
                  <a href="mailto:geri@smartflowdev.com" className="btn btn-accent btn-glow">
                    Reply to this email
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                  <span className={s.ctaBarHint}>or just ask questions — we reply within hours</span>
                </div>
                <div className={s.ctaBarRight}>
                  <a href="mailto:geri@smartflowdev.com" className={s.ctaBarEmail}>geri@smartflowdev.com</a>
                  <a href="https://smartflowdev.com" className={s.ctaBarSite}>smartflowdev.com</a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
