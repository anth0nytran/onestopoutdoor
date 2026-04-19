import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '../../config';
import { areaCities, getCityBySlug } from '../data';
import AreaPageClient from './AreaPageClient';

interface PageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return areaCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'Service Area Not Found' };
  const url = `${siteConfig.domain}/service-areas/${city.slug}`;
  return {
    title: { absolute: city.titleTag },
    description: city.metaDescription,
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: {
      title: city.titleTag,
      description: city.metaDescription,
      url,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: city.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: city.titleTag,
      description: city.metaDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const pageUrl = `${siteConfig.domain}/service-areas/${city.slug}`;

  // ── Breadcrumb schema ──
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${siteConfig.domain}/service-areas` },
      { '@type': 'ListItem', position: 3, name: `${city.city}, ${city.state}`, item: pageUrl },
    ],
  };

  // ── FAQPage schema (must match visible FAQ) ──
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // ── LocalBusiness schema scoped to this city ──
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${pageUrl}#localbusiness`,
    name: `${siteConfig.businessName} — ${city.city}, ${city.state}`,
    url: pageUrl,
    telephone: siteConfig.cleanPhone,
    image: `${siteConfig.domain}/facebook/hero.jpg`,
    description: city.metaDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.city,
      addressRegion: city.state,
      postalCode: city.zip[0],
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: city.geo.lat, longitude: city.geo.lng },
    sameAs: `https://en.wikipedia.org/wiki/${city.city.replace(/ /g, '_')},_Texas`,
    parentOrganization: {
      '@type': 'LocalBusiness',
      '@id': 'https://onestopoutdoorconstruction.com',
      name: siteConfig.businessName,
    },
    areaServed: [
      { '@type': 'City', name: city.city },
      ...city.neighborhoods.map((n) => ({ '@type': 'Place', name: n })),
    ],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(siteConfig.rating),
      reviewCount: String(siteConfig.reviewCount),
      bestRating: '5',
    },
  };

  // ── Service schema (one entry per core service) ──
  const services = [
    'Patio Covers',
    'Pergolas',
    'Outdoor Kitchens',
    'Stamped Concrete',
    'Concrete Patios & Driveways',
    'Walkways & Pavers',
  ];
  const serviceSchemas = services.map((svc) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${svc} in ${city.city}, ${city.state}`,
    serviceType: svc,
    provider: { '@type': 'LocalBusiness', name: siteConfig.businessName, telephone: siteConfig.cleanPhone },
    areaServed: { '@type': 'City', name: city.city },
    url: pageUrl,
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {serviceSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <AreaPageClient city={city} />
    </>
  );
}
