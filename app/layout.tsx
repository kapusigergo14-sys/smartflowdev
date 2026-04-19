import type { Metadata } from 'next';
import { inter } from './fonts';
import SiteBackground from '@/components/SiteBackground';
import { OfferProvider } from '@/components/OfferCountdown';
import OfferTopBar from '@/components/OfferTopBar';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://smartflowdev.com'),
  title: 'smartflowdev — modern websites for small businesses',
  description: 'Website redesigns for dentists, lawyers, roofers, and other local businesses. Flat pricing from $800, 7-day delivery, real results.',
  alternates: {
    canonical: 'https://smartflowdev.com',
  },
  openGraph: {
    title: 'smartflowdev — modern websites for small businesses',
    description: 'Website redesigns for small businesses. Flat pricing from $800, 7-day delivery.',
    url: 'https://smartflowdev.com',
    siteName: 'smartflowdev',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'smartflowdev — modern websites for small businesses',
    description: 'Website redesigns for small businesses. Flat pricing from $800, 7-day delivery.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'smartflowdev',
  url: 'https://smartflowdev.com',
  description: 'Website redesigns for small businesses. Flat pricing, 7-day delivery.',
  areaServed: 'Worldwide',
  priceRange: '$800 - $3000',
  serviceType: 'Website Design & Development',
  provider: {
    '@type': 'Person',
    name: 'Geri',
  },
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '800', priceCurrency: 'USD', description: 'Single landing page, 5-day delivery' },
    { '@type': 'Offer', name: 'Standard', price: '1500', priceCurrency: 'USD', description: 'Full 4-page rebuild, 7-day delivery' },
    { '@type': 'Offer', name: 'Premium', price: '3000', priceCurrency: 'USD', description: '10+ pages, 10-day delivery' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SiteBackground />
        <OfferProvider>
          <OfferTopBar />
          {children}
        </OfferProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
