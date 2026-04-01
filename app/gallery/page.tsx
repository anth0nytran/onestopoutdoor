import type { Metadata } from 'next';
import { siteConfig, serviceData } from '../config';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
  description:
    'Real patio cover, concrete, outdoor kitchen & pergola projects by One Stop Outdoor Construction in Richmond, Katy, Houston & Sugar Land TX.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
    description: 'Real outdoor construction projects from Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    url: 'https://onestopoutdoorconstruction.net/gallery',
    images: [{ url: '/logos/main_logo.svg', width: 1200, height: 630, alt: 'One Stop Outdoor Construction Project Gallery — Richmond TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
    description: 'Real outdoor construction projects from Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    images: ['/logos/main_logo.svg'],
  },
};

const photoProjects = [
  { service: 'Patio Cover', location: 'Richmond', label: 'Solid patio cover with concrete base', src: '/OneStopOutdoor_Photos/photo_04.jpg' },
  { service: 'Patio Cover', location: 'Katy', label: 'Gable roof patio extension', src: '/OneStopOutdoor_Photos/photo_05.jpg' },
  { service: 'Concrete', location: 'Sugar Land', label: 'Seamless stamped concrete patio', src: '/OneStopOutdoor_Photos/photo_06.jpg' },
  { service: 'Patio Cover', location: 'Houston', label: 'Gable extension with stamped concrete', src: '/OneStopOutdoor_Photos/photo_07.jpg' },
  { service: 'Patio Cover', location: 'Richmond', label: 'Custom patio cover build', src: '/OneStopOutdoor_Photos/photo_08.jpg' },
  { service: 'Patio Cover', location: 'Rosenberg', label: 'Shed roof style patio cover', src: '/OneStopOutdoor_Photos/photo_09.jpg' },
  { service: 'Outdoor Kitchen', location: 'Katy', label: 'Custom grill station under cover', src: '/OneStopOutdoor_Photos/photo_10.jpg' },
  { service: 'Pergola', location: 'Sugar Land', label: 'Two-story custom deck and pergola', src: '/OneStopOutdoor_Photos/photo_12.jpg' },
  { service: 'Pergola', location: 'Houston', label: 'Wood deck under attached pergola', src: '/OneStopOutdoor_Photos/photo_14.jpg' },
  { service: 'Pergola', location: 'Richmond', label: 'Two-story deck side view', src: '/OneStopOutdoor_Photos/photo_15.jpg' },
  { service: 'Pergola', location: 'Rosenberg', label: 'Attached wood pergola on patio', src: '/OneStopOutdoor_Photos/photo_16.jpg' },
  { service: 'Patio Cover', location: 'Katy', label: 'Solid cover with pergola details', src: '/OneStopOutdoor_Photos/photo_17.jpg' },
  { service: 'Concrete', location: 'Sugar Land', label: 'Stamped concrete installation', src: '/OneStopOutdoor_Photos/photo_18.jpg' },
  { service: 'Concrete', location: 'Houston', label: 'Patio stamped concrete pour', src: '/OneStopOutdoor_Photos/photo_19.jpg' },
  { service: 'Concrete', location: 'Richmond', label: 'Concrete patio foundation', src: '/OneStopOutdoor_Photos/photo_20.jpg' },
  { service: 'Outdoor Kitchen', location: 'Rosenberg', label: 'Outdoor fireplace and TV wall', src: '/OneStopOutdoor_Photos/photo_21.jpg' },
  { service: 'Outdoor Kitchen', location: 'Katy', label: 'Stone fireplace under wood ceiling', src: '/OneStopOutdoor_Photos/photo_22.jpg' },
  { service: 'Outdoor Kitchen', location: 'Sugar Land', label: 'Custom fire feature and patio cover', src: '/OneStopOutdoor_Photos/photo_23.jpg' },
  { service: 'Concrete', location: 'Houston', label: 'Standard concrete pouring', src: '/OneStopOutdoor_Photos/photo_24.jpg' },
  { service: 'Concrete', location: 'Richmond', label: 'Concrete patio extension prep', src: '/OneStopOutdoor_Photos/photo_25.jpg' },
  { service: 'Concrete', location: 'Rosenberg', label: 'Curved concrete patio prep', src: '/OneStopOutdoor_Photos/photo_26.jpg' },
  { service: 'Concrete', location: 'Katy', label: 'Stamping dark concrete patio', src: '/OneStopOutdoor_Photos/photo_27.jpg' },
  { service: 'Outdoor Kitchen', location: 'Sugar Land', label: 'White stone outdoor bar', src: '/OneStopOutdoor_Photos/photo_28.jpg' },
  { service: 'Outdoor Kitchen', location: 'Houston', label: 'Full outdoor kitchen with sink', src: '/OneStopOutdoor_Photos/photo_29.jpg' },
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
      location: ['Richmond', 'Katy', 'Sugar Land', 'Houston', 'Rosenberg'][i % 5],
      label: `${service.title} project video`,
      src: m.src,
    }))
);

// Combine: photos first, then videos (interleaved by service)
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
