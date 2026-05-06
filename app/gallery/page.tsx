import type { Metadata } from 'next';
import { siteConfig, serviceData } from '../config';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Project Gallery — Patio Covers, Pool Decks & Concrete | Richmond, Katy & Fulshear TX',
  description:
    'Real 2026 projects: covered patios in Fulshear, pool decks in Richmond, outdoor kitchens, pergolas & stamped concrete. Built by One Stop Outdoor Construction across Richmond, Katy, Houston & Sugar Land TX.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Project Gallery — Patio Covers, Pool Decks & Concrete | Richmond, Katy & Fulshear TX',
    description: 'Real 2026 projects: covered patios in Fulshear, pool decks in Richmond, outdoor kitchens, pergolas & stamped concrete across Fort Bend & west Harris County.',
    url: 'https://www.onestopoutdoorconstruction.com/gallery',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'One Stop Outdoor Construction Project Gallery — Richmond, Katy & Fulshear TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Gallery — Patio Covers, Pool Decks & Concrete | Richmond, Katy & Fulshear TX',
    description: 'Real 2026 projects: covered patios in Fulshear, pool decks in Richmond, outdoor kitchens & stamped concrete across Fort Bend & west Harris County.',
    images: ['/og-image.jpg'],
  },
};

const cities = ['Richmond', 'Katy', 'Sugar Land', 'Houston', 'Rosenberg'];

const photoProjects = [
  // Newest 2026 projects — featured at the top
  {
    service: 'Patio Cover',
    location: 'Fulshear',
    src: '/photos_new_web/patio-cover/covered-patio-concrete-fulshear-1.jpg',
  },
  {
    service: 'Patio Cover',
    location: 'Fulshear',
    src: '/photos_new_web/patio-cover/covered-patio-concrete-fulshear-2.jpg',
  },
  {
    service: 'Concrete',
    location: 'Richmond',
    src: '/photos_new_web/concrete/pool-rose-garden-richmond-1.jpg',
  },
  {
    service: 'Concrete',
    location: 'Richmond',
    src: '/photos_new_web/concrete/pool-rose-garden-richmond-2.jpg',
  },
  // Concrete — newest Richmond projects (shown first)
  ...[12, 13, 14, 15, 16].map((n) => ({
    service: 'Concrete',
    location: 'Richmond',
    src: `/photos_new_web/concrete/concrete-${n}.jpg`,
  })),
  // Outdoor Kitchen — newest Richmond projects (shown first)
  ...[10, 11].map((n) => ({
    service: 'Outdoor Kitchen',
    location: 'Richmond',
    src: `/photos_new_web/outdoor-kitchen/outdoor-kitchen-${n}.jpg`,
  })),
  // Patio Cover — existing photos
  ...Array.from({ length: 11 }, (_, i) => ({
    service: 'Patio Cover',
    location: cities[i % cities.length],
    src: `/photos_new_web/patio-cover/patio-cover-${i + 1}.jpg`,
  })),
  // Concrete — existing photos
  ...Array.from({ length: 11 }, (_, i) => ({
    service: 'Concrete',
    location: cities[i % cities.length],
    src: `/photos_new_web/concrete/concrete-${i + 1}.jpg`,
  })),
  // Outdoor Kitchen — existing photos
  ...Array.from({ length: 9 }, (_, i) => ({
    service: 'Outdoor Kitchen',
    location: cities[i % cities.length],
    src: `/photos_new_web/outdoor-kitchen/outdoor-kitchen-${i + 1}.jpg`,
  })),
  // Pergola — existing photos
  { service: 'Pergola', location: 'Sugar Land', src: '/service/IMG_6339.jpeg' },
  { service: 'Pergola', location: 'Houston', src: '/OneStopOutdoor_Photos/photo_14.jpg' },
  { service: 'Pergola', location: 'Richmond', src: '/OneStopOutdoor_Photos/photo_15.jpg' },
  { service: 'Pergola', location: 'Rosenberg', src: '/OneStopOutdoor_Photos/photo_16.jpg' },
];

// Map service slugs to gallery-friendly labels
const slugToService: Record<string, string> = {
  'patio-covers': 'Patio Cover',
  'concrete-driveways': 'Concrete',
  'outdoor-kitchens': 'Outdoor Kitchen',
  'pergolas': 'Pergola',
  'roofing': 'Roofing',
  'walkways-pavers': 'Walkways & Pavers',
};

// Pull video entries from serviceData into the gallery
const videoProjects = serviceData.flatMap((service) =>
  service.media
    .filter((m) => m.type === 'video')
    .map((m, i) => ({
      service: slugToService[service.slug] || service.title,
      location: cities[i % cities.length],
      src: m.src,
    }))
);

// Combine: photos first, then videos
const allProjects = [
  ...photoProjects.map((p) => ({ ...p, type: 'image' as const })),
  ...videoProjects.map((p) => ({ ...p, type: 'video' as const })),
];

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
              { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${siteConfig.domain}/gallery` },
            ],
          }),
        }}
      />
      <GalleryPageClient projects={allProjects} />
    </>
  );
}
