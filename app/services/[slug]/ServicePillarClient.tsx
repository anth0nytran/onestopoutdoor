'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ShieldCheck, Star, CheckCircle2, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig, serviceData } from '../../config';
import { areaCities } from '../../service-areas/data';
import type { PillarContent } from '../pillar-data';

// ──────────────────────────────────────────────────────────────────
// Design tokens (keep consistent across all new pages)
// ──────────────────────────────────────────────────────────────────
const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';
const shellNarrow = 'mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10';
const sectionPad = 'py-14 sm:py-20 lg:py-24';
const sectionPadTight = 'py-12 sm:py-16 lg:py-20';
const h1 = 'text-[2rem] leading-[1.08] sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black tracking-tight text-[var(--onestop-ink)]';
const h2 = 'text-2xl sm:text-3xl lg:text-[2.5rem] font-black leading-tight tracking-tight text-[var(--onestop-ink)]';
const h3 = 'text-lg sm:text-xl font-bold text-[var(--onestop-ink)]';
const bodyLg = 'text-base sm:text-lg leading-relaxed text-[var(--onestop-ink)]/80';
const body = 'text-[0.95rem] sm:text-base leading-relaxed text-[var(--onestop-ink)]/80';

interface Props {
  pillar: PillarContent;
  serviceTitle: string;
  galleryImages: string[];
  galleryVideos: string[];
  hasGallery: boolean;
}

export default function ServicePillarClient({
  pillar, serviceTitle, galleryImages, galleryVideos, hasGallery,
}: Props) {
  return (
    <main className="onestop-site bg-[var(--onestop-cream)] text-[var(--onestop-ink)]">
      {/* ═══ BREADCRUMB ═══ */}
      <nav aria-label="Breadcrumb" className={`${shell} pt-5 sm:pt-7 text-xs sm:text-sm text-[var(--onestop-ink)]/70`}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li><Link href="/" className="hover:text-[var(--onestop-red)] underline-offset-2 hover:underline">Home</Link></li>
          <li aria-hidden className="text-[var(--onestop-ink)]/40">/</li>
          <li><Link href="/services" className="hover:text-[var(--onestop-red)] underline-offset-2 hover:underline">Services</Link></li>
          <li aria-hidden className="text-[var(--onestop-ink)]/40">/</li>
          <li className="font-semibold text-[var(--onestop-ink)]">{serviceTitle}</li>
        </ol>
      </nav>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className={`${shell} pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20`}>
        
        {/* ─── HERO HEADER (Always on top) ─── */}
        <header className="mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--onestop-navy)]/10 text-[var(--onestop-navy)] px-3 py-1.5 text-[0.65rem] sm:text-xs font-bold tracking-wider uppercase">
            Serving Richmond · Katy · Sugar Land · Rosenberg · Houston
          </span>
          <h1 className={`mt-4 sm:mt-5 text-[2rem] sm:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight text-[var(--onestop-ink)]`}>{pillar.h1}</h1>
          <p className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-[var(--onestop-ink)]/80 max-w-3xl">
            {pillar.answerFirst}
          </p>
          
          <div className="mt-8 grid grid-cols-2 md:flex md:flex-wrap gap-3 max-w-2xl">
            <TrustBadge icon={<Star className="h-4 w-4" />} label={`${siteConfig.rating.toFixed(1)} · ${siteConfig.reviewCount} reviews`} />
            <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} label="Licensed & Insured" />
            <TrustBadge icon={<CheckCircle2 className="h-4 w-4" />} label={`${siteConfig.yearsInBusiness}+ Years`} />
            <TrustBadge icon={<Clock className="h-4 w-4" />} label="Free Estimates" />
          </div>
        </header>

        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ─── LEFT COLUMN: Main Story ─── */}
          <div className="md:col-span-7 xl:col-span-8 space-y-14 sm:space-y-20">

            {/* INTRO */}
            <div className="space-y-5 sm:space-y-6">
              {pillar.intro.map((p, i) => (
                <p key={i} className={bodyLg}>{p}</p>
              ))}
            </div>

            {/* MATERIALS / VARIANTS */}
            {pillar.materials && pillar.materials.length > 0 && (
              <div>
                <h2 className={h2}>Materials &amp; options</h2>
                <p className={`mt-4 ${bodyLg}`}>
                  Every {serviceTitle.toLowerCase()} starts with picking the right material for your budget, climate and HOA. Here&apos;s what we install and honest pros/cons for each.
                </p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {pillar.materials.map((m, i) => (
                    <article key={i} className="rounded-xl border border-[var(--onestop-line)] bg-white p-5 sm:p-6 shadow-sm">
                      <h3 className={h3}>{m.name}</h3>
                      <p className={`mt-2 text-sm leading-relaxed text-[var(--onestop-ink)]/80`}>{m.description}</p>
                      
                      <div className="mt-5 pt-5 border-t border-[var(--onestop-line)] flex gap-4">
                         <div className="flex-1">
                           <div className="text-[0.65rem] font-bold text-[var(--onestop-ink)]/50 uppercase tracking-wider mb-1">Cost</div>
                           <div className="text-sm font-bold">{m.costRange}</div>
                         </div>
                         <div className="flex-1">
                           <div className="text-[0.65rem] font-bold text-[var(--onestop-ink)]/50 uppercase tracking-wider mb-1">Lifespan</div>
                           <div className="text-sm font-bold">{m.lifespan}</div>
                         </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-4">
                        <div>
                          <div className="text-[0.65rem] font-bold text-[var(--onestop-navy)] uppercase tracking-wider mb-2">Pros</div>
                          <ul className="space-y-1.5 text-sm text-[var(--onestop-ink)]/80 leading-snug">
                            {m.pros.map((p, j) => (
                              <li key={j} className="flex gap-2"><span className="text-[var(--onestop-navy)] font-bold shrink-0">✓</span>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* PROCESS */}
            <div className="rounded-2xl bg-[var(--onestop-navy-deep)] text-white p-8 sm:p-10 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                How we build your {serviceTitle.toLowerCase()}
              </h2>
              <p className="mt-3 text-base text-white/75">
                Every project follows the same proven process — so you always know what&apos;s next.
              </p>
              <ol className="mt-8 space-y-6">
                {pillar.process.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="shrink-0 h-8 w-8 rounded-full bg-[var(--onestop-red)] text-white flex items-center justify-center font-black text-sm mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold leading-snug">{s.step}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">{s.description}</p>
                      <p className="mt-2 text-[0.7rem] font-mono text-white/55 tracking-wide uppercase">⏱ {s.timeline}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* PRICING */}
            <div>
              <h2 className={h2}>{serviceTitle} pricing</h2>
              <p className={`mt-4 ${bodyLg}`}>
                Real ranges from projects we&apos;ve actually built across Fort Bend and west Houston. Every quote is itemized — no surprises.
              </p>
              <div className="mt-8 overflow-hidden rounded-xl border border-[var(--onestop-line)] bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--onestop-cream)] border-b border-[var(--onestop-line)]">
                    <tr>
                      <th className="text-left p-4 font-black uppercase tracking-wider text-[0.65rem] text-[var(--onestop-ink)]/60">Tier</th>
                      <th className="text-left p-4 font-black uppercase tracking-wider text-[0.65rem] text-[var(--onestop-ink)]/60">Range</th>
                      <th className="text-left p-4 font-black uppercase tracking-wider text-[0.65rem] text-[var(--onestop-ink)]/60">Includes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--onestop-line)]">
                    {pillar.pricing.map((p, i) => (
                      <tr key={i} className="hover:bg-[var(--onestop-cream)]/40 transition-colors">
                        <td className="p-4 font-bold text-[var(--onestop-ink)] align-top">{p.tier}</td>
                        <td className="p-4 font-mono font-bold text-[var(--onestop-red)] align-top whitespace-nowrap">{p.range}</td>
                        <td className="p-4 text-[var(--onestop-ink)]/80 align-top">{p.includes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className={h2}>{serviceTitle} FAQ</h2>
              <div className="mt-8 divide-y divide-[var(--onestop-line)] border-y border-[var(--onestop-line)]">
                {pillar.faqs.map((f, i) => (
                  <details key={i} className="group py-5 sm:py-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base sm:text-lg font-bold text-[var(--onestop-ink)] leading-snug hover:text-[var(--onestop-navy)] transition-colors">
                      <span>{f.q}</span>
                      <span className="shrink-0 text-[var(--onestop-red)] text-2xl leading-none font-light group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[var(--onestop-ink)]/80 pr-8">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: Sticky Sidebar ─── */}
          <div className="md:col-span-5 xl:col-span-4 md:sticky md:top-28 space-y-6 md:order-last order-first mb-12 md:mb-0">
            
            {/* Animated Image Carousel */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--onestop-line)] bg-slate-900 shadow-xl">
               <ImageCarousel images={hasGallery && galleryImages.length > 0 ? galleryImages.slice(0,5) : [pillar.fallbackImage]} alt={serviceTitle} />
            </div>

            {/* Quick Details Box */}
            <div className="rounded-xl border border-[var(--onestop-line)] bg-white p-6 shadow-md">
               <h3 className="text-[0.65rem] font-bold text-[var(--onestop-ink)]/50 uppercase tracking-wider mb-4">Quick Details</h3>
               <dl className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--onestop-line)] pb-3">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Typical Range</dt>
                     <dd className="font-bold text-[var(--onestop-ink)]">{pillar.pricing[0]?.range || 'Varies'}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--onestop-line)] pb-3">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Coverage</dt>
                     <dd className="font-bold text-[var(--onestop-ink)] text-right">Fort Bend &<br/>West Houston</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--onestop-line)] pb-3">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Consultation</dt>
                     <dd className="font-bold text-[var(--onestop-ink)]">Free On-Site</dd>
                  </div>
                  <div className="flex justify-between pb-1">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Warranty</dt>
                     <dd className="font-bold text-[var(--onestop-ink)]">Included</dd>
                  </div>
               </dl>
               
               <Link href="/contact" className="mt-6 w-full flex items-center justify-center gap-2 bg-[var(--onestop-red)] hover:brightness-110 text-white font-black px-6 py-4 rounded-full transition-all active:scale-[0.98] shadow-sm">
                 Request a Quote <ArrowRight className="h-4 w-4" />
               </Link>
            </div>

            {/* Call Box */}
            <div className="rounded-xl bg-[var(--onestop-navy-deep)] p-6 text-center shadow-md">
               <div className="text-[0.65rem] font-bold text-white/50 uppercase tracking-wider mb-2">Call or Text Anytime</div>
               <a href={`tel:${siteConfig.cleanPhone}`} className="text-[1.35rem] font-black text-white hover:text-[var(--onestop-red)] transition-colors">
                  {siteConfig.phone}
               </a>
               <div className="mt-2 text-[0.7rem] font-semibold text-[var(--onestop-red)]">Licensed & Insured • 15+ Years</div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ GALLERY (Bottom Full Width) ═══ */}
      {hasGallery && (
        <section className="bg-white border-y border-[var(--onestop-line)]">
          <div className={`${shell} ${sectionPad}`}>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="max-w-2xl">
                <h2 className={h2}>{serviceTitle} gallery</h2>
                <p className={`mt-3 ${body}`}>Recent projects across Fort Bend and Harris County.</p>
              </div>
              <Link href="/gallery" className="shrink-0 text-sm font-bold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] underline-offset-4 hover:underline whitespace-nowrap">
                Full gallery →
              </Link>
            </div>
            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
              {galleryImages.slice(0, 8).map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-[var(--onestop-line)] hover:shadow-lg transition-shadow">
                  <Image
                    src={src}
                    alt={`${serviceTitle} project ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SERVICE AREAS ═══ */}
      <section className="bg-[var(--onestop-cream)] border-b border-[var(--onestop-line)]">
        <div className={`${shell} ${sectionPad}`}>
          <div className="max-w-3xl">
            <h2 className={h2}>Where we build {serviceTitle.toLowerCase()}</h2>
            <p className={`mt-4 ${bodyLg}`}>
              We serve five core Texas markets. Pick your city for local pricing, neighborhoods and HOA details.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {areaCities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="group rounded-xl border border-[var(--onestop-line)] bg-white hover:border-[var(--onestop-navy)] hover:shadow-md hover:-translate-y-0.5 transition-all p-4 sm:p-5"
              >
                <div className="flex items-center gap-1.5 text-[var(--onestop-navy)]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider truncate">{c.county.split(' / ')[0]}</span>
                </div>
                <h3 className="mt-1.5 text-base sm:text-lg font-black text-[var(--onestop-ink)] group-hover:text-[var(--onestop-red)] transition-colors leading-tight">
                  {c.city}, {c.state}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RELATED SERVICES ═══ */}
      {pillar.relatedServices.length > 0 && (
        <section className="bg-white border-b border-[var(--onestop-line)]">
          <div className={`${shell} ${sectionPadTight}`}>
            <h2 className={h2}>Often paired with</h2>
            <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pillar.relatedServices.map((relatedSlug) => {
                const s = serviceData.find((x) => x.slug === relatedSlug);
                if (!s) return null;
                return (
                  <Link
                    key={relatedSlug}
                    href={`/services/${relatedSlug}`}
                    className="group rounded-xl border border-[var(--onestop-line)] bg-[var(--onestop-cream)] hover:border-[var(--onestop-navy)] hover:shadow-md hover:-translate-y-0.5 transition-all p-5 sm:p-6"
                  >
                    <h3 className="text-lg sm:text-xl font-black text-[var(--onestop-ink)] group-hover:text-[var(--onestop-red)] transition-colors">
                      {s.title} <ArrowRight className="inline h-4 w-4 ml-1 align-middle" />
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-[var(--onestop-red)] text-white">
        <div className={`mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10 ${sectionPadTight} text-center`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Ready to start your {serviceTitle.toLowerCase()} project?
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Free on-site estimate. Honest pricing. {siteConfig.yearsInBusiness}+ years across Fort Bend &amp; Harris County.
          </p>
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-md sm:max-w-none mx-auto">
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--onestop-red)] hover:bg-white/95 font-black px-7 py-4 rounded-full transition-colors active:scale-[0.98] shadow-md"
            >
              <Phone className="h-5 w-5" /> Call {siteConfig.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[var(--onestop-red)] font-black px-7 py-4 rounded-full transition-colors active:scale-[0.98]"
            >
              Request an Estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ImageCarousel({ images, alt }: { images: string[], alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full group">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`${alt} image ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          sizes="(max-width: 1024px) 100vw, 42vw"
          priority={i === 0}
        />
      ))}
      
      {images.length > 1 && (
        <>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
             {images.map((_, i) => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />
             ))}
          </div>
        </>
      )}
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--onestop-line)] bg-white px-3 py-2.5 text-xs font-bold text-[var(--onestop-ink)] leading-tight shadow-sm">
      <span className="text-[var(--onestop-red)] shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
