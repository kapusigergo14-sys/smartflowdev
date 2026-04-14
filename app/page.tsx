import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import AddOns from '@/components/AddOns';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

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
      <ChatWidget
        practiceName="smartflowdev"
        accentColor="#6366F1"
        welcomeMessage="Hi! 👋 I'm the smartflowdev assistant. Ask me about what we build, our process, timelines, or how to start a project."
        quickReplies={[
          'What do you build?',
          'How long does it take?',
          'Can I see examples?',
          'How do I start a project?',
        ]}
        autoOpenDelayMs={0}
        teaserDelayMs={30000}
      />
    </>
  );
}
