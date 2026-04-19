import type { Metadata } from 'next';
import IndustryLanding from '@/components/IndustryLanding';

export const metadata: Metadata = {
  title: 'AI Chatbot + Online Booking for Plumbers — smartflowdev',
  description:
    'Custom-built AI chatbot for plumbing services. Captures emergency calls 24/7, books service visits, qualifies leaks before they leak you. Live in 5 days.',
};

export default function PlumberPage() {
  return (
    <IndustryLanding
      eyebrow="For plumbing services"
      headlineLeading="Win the calls"
      headlineHotAccent="you're losing"
      headlineTrailing="at midnight."
      heroSub="Custom AI chatbot + online booking — captures emergency leaks, water heater failures, and after-hours requests while you sleep. Live on your site in 5 business days."
      primaryCtaHref="mailto:geri@smartflowdev.com?subject=Plumber%20chatbot%20%E2%80%94%20interested"
      service1Tag="The chatbot"
      service1Title="An AI tech that never sleeps."
      service1Desc="Trained on your service area, response times, and pricing. It answers customer questions 24/7 — even at 2am when the basement is filling."
      service1Bullets={[
        'Triages emergency vs. routine in seconds',
        'Quotes call-out fees and arrival windows',
        'Captures address + photo of the leak',
        'Brand-matched to your existing site',
      ]}
      service2Tag="The booking"
      service2Title="Book the truck without a phone call."
      service2Desc="Customers pick a time slot that works for them and your dispatcher sees it instantly. No phone tag, no missed appointments."
      service2Bullets={[
        'Live availability synced to your calendar',
        'SMS + email reminders to cut no-shows',
        'Photo upload so techs arrive prepared',
        'Custom service categories and zones',
      ]}
      statsHeading={
        <>
          Customers in 2026 don&rsquo;t wait. <br />
          They Google the next number.
        </>
      }
      stats={[
        { big: '67%', label: 'of after-hours calls go to voicemail and never call back' },
        { big: '4.2x', label: 'higher conversion when a site books instantly vs. requires a call' },
        { big: '< 5 days', label: 'from kickoff to live on your existing website' },
      ]}
      finalTitle={
        <>
          Stop losing the next <span style={{ color: 'var(--accent-hot)' }}>burst pipe</span>.
        </>
      }
      finalSub="We install the chatbot + booking on your existing site. No redesign, no migration, no downtime. Reply to lock in the April 25 offer — $500 setup, first month free."
    />
  );
}
