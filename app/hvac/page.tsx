import type { Metadata } from 'next';
import IndustryLanding from '@/components/IndustryLanding';

export const metadata: Metadata = {
  title: 'AI Chatbot + Online Booking for HVAC — smartflowdev',
  description:
    'Custom-built AI chatbot for HVAC contractors. Captures broken-AC calls at midnight, books seasonal maintenance, qualifies emergency vs. routine. Live in 5 days.',
};

export default function HvacPage() {
  return (
    <IndustryLanding
      eyebrow="For HVAC contractors"
      headlineLeading="Capture every"
      headlineHotAccent="broken-AC call,"
      headlineTrailing="even at 2am."
      heroSub="Custom AI chatbot + online booking — handles emergency repair requests, seasonal maintenance scheduling, and after-hours leads while your office is closed. Live in 5 business days."
      primaryCtaHref="mailto:geri@smartflowdev.com?subject=HVAC%20chatbot%20%E2%80%94%20interested"
      service1Tag="The chatbot"
      service1Title="An AI dispatcher that never sleeps."
      service1Desc="Trained on your service area, response times, and pricing. Triages emergencies, quotes diagnostic fees, and books arrival windows — even when the office is dark."
      service1Bullets={[
        'Distinguishes emergency vs. maintenance',
        'Quotes diagnostic fee and tech ETA',
        'Captures unit make/model and symptoms',
        'Brand-matched to your existing site',
      ]}
      service2Tag="The booking"
      service2Title="Book a service visit without a phone call."
      service2Desc="Homeowners pick from real availability and your dispatcher sees it instantly. Seasonal tune-ups fill themselves without a single call back."
      service2Bullets={[
        'Live calendar sync (Google, Outlook, Jobber)',
        'SMS + email reminders cut no-shows',
        'Photo upload so techs arrive with the right part',
        'Maintenance contracts &amp; recurring visits',
      ]}
      statsHeading={
        <>
          When the AC dies on a Sunday, <br />
          your competitor answers first.
        </>
      }
      stats={[
        { big: '73%', label: 'of HVAC emergency calls happen outside business hours' },
        { big: '3.8x', label: 'more bookings when site offers instant scheduling vs. callback' },
        { big: '< 5 days', label: 'from kickoff to live on your existing website' },
      ]}
      finalTitle={
        <>
          Don&rsquo;t miss the next <span style={{ color: 'var(--accent-hot)' }}>heatwave</span>.
        </>
      }
      finalSub="We install the chatbot + booking on your existing site. No redesign, no migration, no downtime. Reply to lock in the April 25 offer — $500 setup, first month free."
    />
  );
}
