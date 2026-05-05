import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { siteConfig } from './config';

export const metadata: Metadata = {
  title: 'Patio Covers Richmond & Katy TX · 5★ × 32 · Free Estimate | One Stop Outdoor',
  description: 'Custom patio covers, pergolas, outdoor kitchens & stamped concrete in Richmond, Katy, Sugar Land & Houston TX. 15+ years, licensed, insured, 5.0 ★ Google. Free estimate — (832) 945-8084.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Patio Covers Richmond & Katy TX · 5★ × 32 · Free Estimate | One Stop Outdoor',
    description: 'Custom patio covers, pergolas, outdoor kitchens & stamped concrete in Richmond, Katy, Sugar Land & Houston TX. 15+ years, licensed, insured, 5.0 ★ Google.',
    url: 'https://onestopoutdoorconstruction.com',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'One Stop Outdoor Construction — Patio Covers & Outdoor Construction in Richmond TX' }],
  },
};

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteConfig.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
