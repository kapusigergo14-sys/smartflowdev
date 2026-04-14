import ChatWidget from '@/components/ChatWidget';
import styles from './page.module.css';

export const metadata = {
  title: 'Bright Smile Dental — Modern Dentistry in Denver',
  description: 'Live chatbot demo by smartflowdev.com',
};

const SERVICES = [
  {
    name: 'Cleanings & Checkups',
    desc: 'Routine preventive care to keep your smile healthy.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9 2 7 4 7 7c0 3 2 5 5 5s5-2 5-5c0-3-2-5-5-5zM6 22v-6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v6" />
      </svg>
    ),
  },
  {
    name: 'Cosmetic Dentistry',
    desc: 'Whitening, veneers, and smile makeovers.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: 'Invisalign',
    desc: 'Clear aligners for a straighter smile.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 12 15 23 4" transform="translate(-4 2)" />
      </svg>
    ),
  },
  {
    name: 'Emergency Care',
    desc: 'Same-day appointments for urgent dental issues.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const TEAM = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Lead Dentist, DDS',
    bio: '15 years · UCLA graduate · Preventive & family dentistry',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Dr. Michael Ross',
    role: 'General Dentistry, DMD',
    bio: '8 years · Cosmetic specialist · Smile makeovers',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&h=400&q=80',
  },
  {
    name: 'Lisa Martinez',
    role: 'Lead Dental Hygienist, RDH',
    bio: '12 years · Preventive care · Patient education',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&h=400&q=80',
  },
];

export default function DentalChatbotDemo() {
  return (
    <div className={styles.page}>
      {/* Disclaimer banner */}
      <div className={styles.banner}>
        <span className={styles.bannerPill}>DEMO</span>
        This is a demo site by{' '}
        <a href="https://smartflowdev.com" className={styles.bannerLink}>
          smartflowdev.com
        </a>
        . Try the chat widget bottom-right →
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoMark}>BS</div>
            <span className={styles.logoText}>Bright Smile Dental</span>
          </div>
          <nav className={styles.nav}>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="tel:+17205550142" className={styles.headerCta}>
            Call Us
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>New patients welcome · Denver, CO</div>
          <h1 className={styles.heroTitle}>
            Your Smile.<br />
            <span className={styles.heroTitleAccent}>Our Priority.</span>
          </h1>
          <p className={styles.heroSub}>
            Modern dental care in the heart of Denver. Free consultation for new
            patients, $30 off your first cleaning.
          </p>
          <div className={styles.heroCtas}>
            <a href="tel:+17205550142" className={styles.heroBtnPrimary}>
              Book an Appointment
            </a>
            <a href="#services" className={styles.heroBtnSecondary}>
              View Services →
            </a>
          </div>
          <div className={styles.heroTrust}>
            <div className={styles.trustItem}>
              <strong>4.9★</strong>
              <span>247 Google reviews</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <strong>15+</strong>
              <span>years experience</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <strong>All major</strong>
              <span>insurance accepted</span>
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
            alt="Dental office"
          />
        </div>
      </section>

      {/* Services */}
      <section id="services" className={styles.services}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>What we do</div>
          <h2 className={styles.sectionTitle}>Complete dental care, one practice.</h2>
        </div>
        <div className={styles.servicesGrid}>
          {SERVICES.map((s) => (
            <div key={s.name} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className={styles.team}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>Meet the team</div>
          <h2 className={styles.sectionTitle}>People who care about your smile.</h2>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map((t) => (
            <div key={t.name} className={styles.teamCard}>
              <div className={styles.teamPhoto}>
                <img src={t.photo} alt={t.name} />
              </div>
              <div className={styles.teamInfo}>
                <h3>{t.name}</h3>
                <div className={styles.teamRole}>{t.role}</div>
                <p>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={styles.contact}>
        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactLabel}>Visit us</div>
            <div className={styles.contactValue}>
              142 Oak Avenue<br />
              Denver, CO 80202
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactLabel}>Call us</div>
            <div className={styles.contactValue}>
              <a href="tel:+17205550142">(720) 555-0142</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactLabel}>Hours</div>
            <div className={styles.contactValue}>
              Mon–Thu 8am–6pm<br />
              Fri 8am–4pm · Sat 9am–2pm<br />
              Sunday closed
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>© 2026 Bright Smile Dental · Denver, Colorado</div>
          <div className={styles.footerRight}>
            Demo built by{' '}
            <a href="https://smartflowdev.com" target="_blank" rel="noopener noreferrer">
              smartflowdev.com
            </a>
          </div>
        </div>
      </footer>

      {/* Chat widget */}
      <ChatWidget
        practiceName="Bright Smile Dental"
        accentColor="#0d9488"
        welcomeMessage="Hi! 👋 I'm the Bright Smile assistant. I can help with services, hours, pricing, or book you an appointment. What can I help with?"
        quickReplies={[
          'What are your hours?',
          'How much is a cleaning?',
          'Book an appointment',
          'Do you take insurance?',
        ]}
      />
    </div>
  );
}
