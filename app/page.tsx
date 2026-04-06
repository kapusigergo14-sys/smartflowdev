import Hero from '@/components/Hero';
import StyleGallery from '@/components/StyleGallery';
import BeforeAfterWall from '@/components/BeforeAfterWall';
import LiveAudit from '@/components/LiveAudit';
import HowItWorks from '@/components/HowItWorks';
import WhoIAm from '@/components/WhoIAm';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import ScanLineDivider from '@/components/ScanLineDivider';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ScanLineDivider />
      <StyleGallery />
      <ScanLineDivider />
      <BeforeAfterWall />
      <ScanLineDivider />
      <LiveAudit />
      <ScanLineDivider />
      <HowItWorks />
      <ScanLineDivider />
      <WhoIAm />
      <ScanLineDivider />
      <Pricing />
      <ScanLineDivider />
      <ContactForm />
      <Footer />
    </main>
  );
}
