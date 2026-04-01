'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Phone,
  MapPin,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Filter,
} from 'lucide-react';
import { siteConfig } from '../config';

interface GalleryItem {
  service: string;
  location: string;
  label: string;
  src: string;
  type: 'image' | 'video';
}

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

/* ── Lightbox ── */
function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: GalleryItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const item = items[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm" onClick={onClose}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <div>
          <span className="text-sm font-semibold text-white/60">
            {index + 1} / {items.length}
          </span>
          <span className="ml-3 text-sm text-white/40">{item.label}</span>
        </div>
        <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-all">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={prev} className="absolute left-2 sm:left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button type="button" onClick={next} className="absolute right-2 sm:right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="relative w-full max-w-5xl max-h-[75vh] flex items-center justify-center">
          {item.type === 'video' ? (
            <video
              key={item.src}
              src={item.src}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] max-w-full rounded-lg"
            />
          ) : (
            <div className="relative w-full max-h-[75vh] aspect-[4/3]">
              <Image key={item.src} src={item.src} alt={item.label} fill sizes="90vw" className="object-contain rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Info strip */}
      <div className="flex items-center justify-center gap-4 px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--onestop-gold)]">
          {item.service}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-white/40">
          <MapPin className="h-3 w-3" /> {item.location}, TX
        </span>
      </div>
    </div>
  );
}

export default function GalleryPageClient({ projects }: { projects: GalleryItem[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Get unique service categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.service)))];

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.service === activeFilter);

  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0">
          <Image src="/facebook/filler.jpg" alt="" aria-hidden fill priority sizes="100vw" className="object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-[var(--onestop-navy-deep)]/80" />
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white/70">Gallery</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">Our Work</h1>
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
          {/* Header + Filter */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[var(--onestop-navy-deep)]">
                {activeFilter === 'All' ? 'All Projects' : activeFilter}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                {activeFilter !== 'All' && ' — showing filtered results'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              <span className="font-semibold uppercase tracking-wider">Filter</span>
            </div>
          </div>

          {/* Filter pills */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = cat === activeFilter;
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.service === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[var(--onestop-navy-deep)] text-white shadow-lg'
                      : 'bg-[var(--onestop-cream)] text-[var(--onestop-navy-deep)] border border-slate-200 hover:bg-[var(--onestop-navy-deep)]/5 hover:border-[var(--onestop-navy-deep)]/20'
                  }`}
                >
                  {cat}
                  <span className={`rounded-full px-1.5 py-0.5 text-[0.6rem] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <button
                key={`${project.service}-${project.location}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left cursor-pointer"
              >
                {/* Media */}
                <div className="relative bg-slate-100 overflow-hidden aspect-[4/3]">
                  {project.type === 'video' ? (
                    <>
                      <video
                        src={project.src}
                        preload="metadata"
                        playsInline
                        muted
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-[var(--onestop-navy-deep)] ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={project.src}
                      alt={`${project.service} in ${project.location} - ${project.label}`}
                      fill
                     
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--onestop-navy-deep)]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info strip */}
                <div className="px-5 py-4 border-t border-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[var(--onestop-gold)]">
                        {project.service}
                        {project.type === 'video' && <span className="ml-1.5 text-slate-400">Video</span>}
                      </span>
                      <p className="text-sm font-bold text-[var(--onestop-navy-deep)] mt-0.5">{project.label}</p>
                    </div>
                    <span className="shrink-0 mt-1 flex items-center gap-1 rounded-full bg-[var(--onestop-cream)] px-2.5 py-1 text-[0.7rem] font-semibold text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {project.location}, TX
                    </span>
                  </div>
                </div>
              </button>
            ))}
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
        <div className="absolute inset-0">
          <Image src="/facebook/filler2.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-20 mix-blend-luminosity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        <div className={`${shell} relative z-10`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to start your project?</h2>
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox items={filtered} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}
