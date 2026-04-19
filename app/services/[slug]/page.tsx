import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig, serviceData } from '../../config';
import { pillarContent, getPillarBySlug } from '../pillar-data';
import { areaCities } from '../../service-areas/data';
import ServicePillarClient from './ServicePillarClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(pillarContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return { title: 'Service Not Found' };
  const url = `${siteConfig.domain}/services/${slug}`;
  return {
    title: { absolute: pillar.titleTag },
    description: pillar.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: pillar.titleTag,
      description: pillar.metaDescription,
      url,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: pillar.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pillar.titleTag,
      description: pillar.metaDescription,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ServicePillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const service = serviceData.find((s) => s.slug === slug);
  const pageUrl = `${siteConfig.domain}/services/${slug}`;

  // Gather images for gallery — prefer serviceData.media, fallback to pillar.fallbackImage.
  const galleryImages = (service?.media ?? [])
    .filter((m) => m.type === 'image')
    .map((m) => m.src);
  const galleryVideos = (service?.media ?? [])
    .filter((m) => m.type === 'video')
    .map((m) => m.src);
  const hasGallery = galleryImages.length > 0;

  // Schema ── BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.domain}/services` },
      { '@type': 'ListItem', position: 3, name: service?.title ?? pillar.h1, item: pageUrl },
    ],
  };

  // Schema ── Service
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service?.title ?? pillar.h1,
    serviceType: service?.title ?? pillar.h1,
    description: pillar.metaDescription,
    url: pageUrl,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.businessName,
      telephone: siteConfig.cleanPhone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Richmond',
        addressRegion: 'TX',
        postalCode: '77407',
        addressCountry: 'US',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(siteConfig.rating),
        reviewCount: String(siteConfig.reviewCount),
        bestRating: '5',
      },
    },
    areaServed: areaCities.map((c) => ({ '@type': 'City', name: c.city })),
    hasOfferCatalog: pillar.pricing.length > 0 ? {
      '@type': 'OfferCatalog',
      name: `${service?.title ?? pillar.h1} pricing`,
      itemListElement: pillar.pricing.map((p) => {
        // Extract numeric min/max from range strings like "$3,000 – $7,000" or "$6 – $12 per sq ft".
        const nums = (p.range.match(/\$([\d,]+)/g) ?? []).map((n) => Number(n.replace(/[$,]/g, '')));
        const priceSpec = nums.length >= 2
          ? { '@type': 'PriceSpecification', minPrice: nums[0], maxPrice: nums[1], priceCurrency: 'USD' }
          : undefined;
        return {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: p.tier },
          description: p.includes,
          ...(priceSpec ? { priceSpecification: priceSpec } : {}),
        };
      }),
    } : undefined,
  };

  // Schema ── FAQPage (must match visible FAQ)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pillar.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServicePillarClient
        pillar={pillar}
        serviceTitle={service?.title ?? pillar.h1}
        galleryImages={galleryImages}
        galleryVideos={galleryVideos}
        hasGallery={hasGallery}
      />
    </>
  );
}
