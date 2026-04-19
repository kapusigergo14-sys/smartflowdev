import type { Metadata } from 'next';
import IndustryLanding from '@/components/IndustryLanding';

export const metadata: Metadata = {
  title: 'Website Redesign for Small Business — smartflowdev',
  description:
    'Custom-coded website redesigns for dentists, lawyers, plumbers, HVAC, and other small businesses. Flat pricing from $700, live in 7 days. Mobile-first, SEO-ready, owned by you.',
};

export default function RedesignPage() {
  return (
    <IndustryLanding
      eyebrow="For small businesses"
      headlineLeading="A site that looks like"
      headlineHotAccent="this year,"
      headlineTrailing="not 2013."
      heroSub="Custom-coded redesigns shipped in 7 days. Mobile-first, fast, SEO-ready, and yours to keep — no proprietary builders, no lock-in, no monthly rent on your own website."
      primaryCtaHref="mailto:geri@smartflowdev.com?subject=Website%20redesign%20%E2%80%94%20interested"
      service1Tag="The redesign"
      service1Title="Built from scratch for your brand."
      service1Desc="No templates, no drag-and-drop builders, no generic themes. Every site is designed around your practice, your colors, your story — hand-coded in Next.js and deployed on your domain."
      service1Bullets={[
        'Custom design — no recycled templates',
        'Mobile-first — 70%+ of your visitors',
        'Lightning fast — sub-1-second loads',
        'SEO-ready out of the box',
      ]}
      service2Tag="The launch"
      service2Title="Live on your domain in 7 days."
      service2Desc="One kickoff call, one design review, one launch. No agency ping-pong, no endless revisions, no surprise invoices. Flat price, fixed timeline."
      service2Bullets={[
        'Kickoff call within 48 hours',
        'First mockup within 3 days',
        'Live on your real domain day 7',
        'You own all the source code',
      ]}
      statsHeading={
        <>
          An outdated site is the cheapest way <br />
          to lose customers you never see.
        </>
      }
      stats={[
        { big: '50 ms', label: 'is all it takes for a visitor to judge your site and decide' },
        { big: '70%+', label: 'of traffic comes from mobile — where old sites break first' },
        { big: '7 days', label: 'from kickoff to live on your domain. No surprises.' },
      ]}
      finalTitle={
        <>
          Stop losing leads to a <span style={{ color: 'var(--accent-hot)' }}>2013 website</span>.
        </>
      }
      finalSub="One call, one fixed price, seven days to a site that actually converts. Reply to lock in the April offer — $500 setup, first month of hosting + chatbot free."
    />
  );
}
