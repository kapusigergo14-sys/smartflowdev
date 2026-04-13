import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import AddOns from '@/components/AddOns';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturedWork />
        <AddOns />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
