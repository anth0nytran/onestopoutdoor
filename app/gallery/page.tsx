import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone, MapPin, Camera } from 'lucide-react';
import { siteConfig } from '../config';

export const metadata: Metadata = {
  title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
  description:
    'Real patio cover, concrete, outdoor kitchen & pergola projects by One Stop Outdoor Construction in Richmond, Katy, Houston & Sugar Land TX.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Our Work — Patio Covers, Concrete & More in Richmond TX',
    description: 'Real outdoor construction projects from Richmond, Katy, Houston, Sugar Land & surrounding areas.',
    url: 'https://onestopoutdoorconstruction.net/gallery',
  },
};

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const projects = [
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

      {/* ═══ PAGE HEADER ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0 bg-[url('/facebook/filler.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="absolute inset-0 bg-[var(--onestop-navy-deep)]/80" />
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white/70">Gallery</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Our Work
          </h1>
          <p className="mt-3 text-base text-white/50 leading-relaxed max-w-lg">
            Every project below was completed by our team across Richmond, Katy, Houston, Sugar Land, Rosenberg and surrounding areas.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-white/40">
            <span className="flex items-center gap-1.5">
              <Camera className="h-4 w-4 text-white/50" /> {projects.length}+ completed projects
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-white/50" /> {siteConfig.serviceAreas.length} cities served
            </span>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY GRID ═══ */}
      <section className="bg-white py-16 sm:py-20">
        <div className={shell}>
          {/* Filter hint */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[var(--onestop-navy-deep)]">All Projects</h2>
              <p className="text-sm text-slate-400 mt-0.5">Patio covers, concrete, outdoor kitchens, pergolas, roofing & more</p>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full bg-[var(--onestop-cream)] border border-slate-200 px-4 py-1.5 text-xs font-semibold text-[var(--onestop-navy-deep)]">
              {projects.length} projects
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => {
              return (
                <div
                  key={`${project.service}-${project.location}-${i}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Photo view */}
                  <div className="relative bg-slate-100 overflow-hidden aspect-[4/3]">
                    <img
                      src={project.src}
                      alt={`${project.service} in ${project.location} - ${project.label}`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--onestop-navy-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Info strip — clean bottom bar */}
                  <div className="px-5 py-4 border-t border-slate-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--onestop-gold)]">
                          {project.service}
                        </span>
                        <p className="text-sm font-bold text-[var(--onestop-navy-deep)] mt-0.5">
                          {project.label}
                        </p>
                      </div>
                      <span className="shrink-0 mt-1 flex items-center gap-1 rounded-full bg-[var(--onestop-cream)] px-2.5 py-1 text-[0.7rem] font-semibold text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {project.location}, TX
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <a 
              href="https://www.facebook.com/profile.php?id=100063553814373&sk=photos_by" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 rounded-lg bg-[#1877F2] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:bg-[#1877F2]/90 transition-colors"
            >
              See More Photos on Facebook <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-[var(--onestop-cream)] border-y border-slate-200 py-10 sm:py-12">
        <div className={shell}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-[var(--onestop-navy-deep)]">{siteConfig.yearsInBusiness}+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[var(--onestop-navy-deep)]">500+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[var(--onestop-navy-deep)]">{siteConfig.rating}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Google Rating</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[var(--onestop-navy-deep)]">{siteConfig.serviceAreas.length}+</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('/facebook/filler2.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        <div className={`${shell} relative z-10`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to start your project?
            </h2>
            <p className="mt-3 text-base text-white/50 leading-relaxed">
              Get a free, no-obligation estimate for your project. We serve Richmond, Katy, Houston, Sugar Land and surrounding areas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--onestop-red)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all shadow-lg shadow-[var(--onestop-red)]/20"
              >
                Get Your Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-8 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
