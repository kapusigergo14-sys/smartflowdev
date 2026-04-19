import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';
import s from './IndustryLanding.module.css';

export interface IndustryLandingProps {
  /** Short label that appears in the eyebrow above the hero (e.g. "For plumbing services") */
  eyebrow: string;
  /** Hero headline split into 2 lines. The hot-accent word will be wrapped in red. */
  headlineLeading: string;     // e.g. "Win the calls"
  headlineHotAccent: string;   // e.g. "you're losing"
  headlineTrailing?: string;   // e.g. "at midnight."
  /** Hero subtitle */
  heroSub: string;
  /** Primary CTA mailto / link */
  primaryCtaHref: string;      // e.g. "mailto:geri@smartflowdev.com?subject=..."
  /** Service card 1 (chatbot) — labels and bullet items */
  service1Tag: string;
  service1Title: string;
  service1Desc: string;
  service1Bullets: string[];
  /** Service card 2 (booking) */
  service2Tag: string;
  service2Title: string;
  service2Desc: string;
  service2Bullets: string[];
  /** Stats band — 3 numbers + labels */
  statsHeading: ReactNode;
  stats: Array<{ big: string; label: string }>;
  /** Final CTA */
  finalTitle: ReactNode;
  finalSub: string;
}

const checkSvg = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const arrowSvg = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function IndustryLanding(props: IndustryLandingProps) {
  return (
    <>
      <Nav />
      <main>
        {/* ── Section 1: Hero ───────────────────── */}
        <section className={s.hero}>
          <div className={`container ${s.heroInner}`}>
            <div className={s.eyebrow}>
              <span className={s.eyebrowDot} />
              {props.eyebrow}
            </div>

            <h1 className={s.heroTitle}>
              {props.headlineLeading}{' '}
              <span className={s.accentHot}>{props.headlineHotAccent}</span>
              {props.headlineTrailing ? <> {props.headlineTrailing}</> : null}
            </h1>

            <p className={s.heroSub}>{props.heroSub}</p>

            <div className={s.heroActions}>
              <a href={props.primaryCtaHref} className={s.btnPrimary}>
                Start a project
                {arrowSvg}
              </a>
              <a href="#pricing" className={s.btnSecondary}>
                See pricing
              </a>
            </div>
          </div>
        </section>

        {/* ── Section 2: Two services ──────────── */}
        <ScrollReveal as="section">
          <div className="container">
            <div className={s.sectionHeader}>
              <h2 className={s.sectionTitle}>
                Two things. <span className={s.accentHot}>Done properly.</span>
              </h2>
              <p className={s.sectionSub}>
                We don&rsquo;t redesign your website. We add what&rsquo;s missing — without
                touching what already works.
              </p>
            </div>

            <div className={s.twoUp}>
              <div className={s.serviceCard}>
                <span className={s.serviceTag}>{props.service1Tag}</span>
                <h3 className={s.serviceLabel}>{props.service1Title}</h3>
                <p className={s.serviceDesc}>{props.service1Desc}</p>
                <ul className={s.serviceList}>
                  {props.service1Bullets.map((b) => (
                    <li key={b}>
                      <span className={s.checkIcon}>{checkSvg}</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${s.serviceCard} ${s.hotAccent}`}>
                <span className={s.serviceTag}>{props.service2Tag}</span>
                <h3 className={s.serviceLabel}>{props.service2Title}</h3>
                <p className={s.serviceDesc}>{props.service2Desc}</p>
                <ul className={s.serviceList}>
                  {props.service2Bullets.map((b) => (
                    <li key={b}>
                      <span className={s.checkIcon}>{checkSvg}</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Section 3: Stats band (dark surface) ─── */}
        <ScrollReveal>
          <div className="container">
            <div className={s.statsBand}>
              <div className={`container ${s.statsInner}`}>
                <h2 className={s.statsHeading}>{props.statsHeading}</h2>
                <div className={s.statsGrid}>
                  {props.stats.map((st) => (
                    <div className={s.statBlock} key={st.label}>
                      <div className={s.statBig}>{st.big}</div>
                      <div className={s.statBigLabel}>{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Section 4: Pricing ────────────────── */}
        <ScrollReveal as="section" id="pricing">
          <div className="container">
            <div className={s.sectionHeader}>
              <h2 className={s.sectionTitle}>
                Flat pricing. <span className={s.accentHot}>No surprises.</span>
              </h2>
              <p className={s.sectionSub}>
                Pick a tier. We ship in 5 days. Cancel any month. That&rsquo;s the whole pitch.
              </p>
            </div>

            <div className={s.pricing}>
              <div className={s.priceCard}>
                <div className={s.priceTier}>Starter</div>
                <div className={s.priceMain}>
                  $700<small> setup</small>
                </div>
                <div className={s.priceMonthly}>$49 / month after first free month</div>
                <ul className={s.priceList}>
                  <li><span className={s.checkIcon}>{checkSvg}</span> AI chatbot — 24/7 answers</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Brand-matched to your site</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Basic FAQ training</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Live in 5 business days</li>
                </ul>
                <a href={props.primaryCtaHref} className={s.priceCardCta}>Get Starter</a>
              </div>

              <div className={`${s.priceCard} ${s.priceCardFeatured}`}>
                <span className={s.priceBadge}>Most popular</span>
                <div className={s.priceTier}>Professional</div>
                <div className={s.priceMain}>
                  $1,300<small> setup</small>
                </div>
                <div className={s.priceMonthly}>$79 / month after first free month</div>
                <ul className={s.priceList}>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Everything in Starter</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Online booking integration</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Lead capture &amp; routing</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Custom training on your services</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Email + SMS notifications</li>
                </ul>
                <a href={props.primaryCtaHref} className={s.priceCardCta}>Get Professional</a>
              </div>

              <div className={s.priceCard}>
                <div className={s.priceTier}>Premium</div>
                <div className={s.priceMain}>
                  $1,900<small> setup</small>
                </div>
                <div className={s.priceMonthly}>$129 / month after first free month</div>
                <ul className={s.priceList}>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Everything in Professional</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Multi-channel (web + WhatsApp + SMS)</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> CRM integration (HubSpot, Pipedrive…)</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Monthly tuning &amp; analytics</li>
                  <li><span className={s.checkIcon}>{checkSvg}</span> Priority support</li>
                </ul>
                <a href={props.primaryCtaHref} className={s.priceCardCta}>Get Premium</a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Section 5: Final CTA ─────────────── */}
        <ScrollReveal as="section" className={s.finalCta}>
          <div className="container">
            <h2 className={s.finalTitle}>{props.finalTitle}</h2>
            <p className={s.finalSub}>{props.finalSub}</p>
            <div className={s.heroActions}>
              <a href={props.primaryCtaHref} className={s.btnPrimary}>
                Start a project
                {arrowSvg}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
