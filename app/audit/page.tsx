import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuditClient from './AuditClient';

export const metadata: Metadata = {
  title: 'Free website audit — smartflowdev',
  description:
    'Paste your URL and get a full website audit in seconds: PageSpeed, chatbot & booking detection, SEO basics, and 3 AI-generated improvement suggestions. Free, no signup.',
  alternates: { canonical: 'https://smartflowdev.com/audit' },
  openGraph: {
    title: 'Free website audit — smartflowdev',
    description:
      'Get a full audit of your website in under a minute. PageSpeed, detection, SEO, and AI suggestions. Free, no signup.',
    url: 'https://smartflowdev.com/audit',
    type: 'website',
  },
};

export default function AuditPage() {
  return (
    <Suspense fallback={null}>
      <AuditClient />
    </Suspense>
  );
}
