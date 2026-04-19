'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ShieldCheck, Star, CheckCircle2, ArrowRight, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig, serviceData } from '../../config';
import type { AreaCity } from '../data';

// Pricing snapshot — starting ranges shown per-service on every area page.
// Pulled from pillar data ranges so the story is consistent site-wide.
const PRICE_SNAPSHOT = [
  { slug: 'patio-covers', label: 'Patio Cover', startingAt: '$3,000', note: 'Basic aluminum · 12\'×12\'' },
  { slug: 'outdoor-kitchens', label: 'Outdoor Kitchen', startingAt: '$8,000', note: 'L-shape w/ built-in grill' },
  { slug: 'concrete-driveways', label: 'Stamped Concrete', startingAt: '$12/sf', note: 'Installed, sealed' },
  { slug: 'pergolas', label: 'Pergola', startingAt: '$5,000', note: 'Pine 10\'×12\' w/ stain' },
];

// ──────────────────────────────────────────────────────────────────
// Design tokens — aligned with ServicePillarClient
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
  city: AreaCity;
}

const PILLAR_LINKS = [
  { label: 'Patio Covers', slug: 'patio-covers' },
  { label: 'Pergolas', slug: 'pergolas' },
  { label: 'Outdoor Kitchens', slug: 'outdoor-kitchens' },
  { label: 'Concrete & Stamped', slug: 'concrete-driveways' },
  { label: 'Walkways & Pavers', slug: 'walkways-pavers' },
  { label: 'Roofing', slug: 'roofing' },
];

export default function AreaPageClient({ city }: Props) {
  return (
    <main className="onestop-site bg-[var(--onestop-cream)] text-[var(--onestop-ink)]">
      {/* ═══ BREADCRUMB ═══ */}
      <nav aria-label="Breadcrumb" className={`${shell} pt-5 sm:pt-7 text-xs sm:text-sm text-[var(--onestop-ink)]/70`}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <li><Link href="/" className="hover:text-[var(--onestop-red)] underline-offset-2 hover:underline">Home</Link></li>
          <li aria-hidden className="text-[var(--onestop-ink)]/40">/</li>
          <li><Link href="/service-areas" className="hover:text-[var(--onestop-red)] underline-offset-2 hover:underline">Service Areas</Link></li>
          <li aria-hidden className="text-[var(--onestop-ink)]/40">/</li>
          <li className="font-semibold text-[var(--onestop-ink)]">{city.city}, {city.state}</li>
        </ol>
      </nav>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className={`${shell} pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20`}>
        
        {/* ─── HERO HEADER (Always on top) ─── */}
        <header className="mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--onestop-navy)]/10 text-[var(--onestop-navy)] px-3 py-1.5 text-[0.65rem] sm:text-xs font-bold tracking-wider uppercase max-w-full">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{city.county} · Serving {city.city}, {city.state}</span>
          </span>
          <h1 className={`mt-4 sm:mt-5 text-[2rem] sm:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight text-[var(--onestop-ink)]`}>{city.h1}</h1>
          <p className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-[var(--onestop-ink)]/80 max-w-3xl">
            {city.answerFirst}
          </p>

          <div className="mt-8 grid grid-cols-2 md:flex md:flex-wrap gap-3 max-w-2xl">
            <TrustBadge icon={<Star className="h-4 w-4" />} label={`${siteConfig.rating.toFixed(1)} · ${siteConfig.reviewCount} reviews`} />
            <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} label="Licensed & Insured" />
            <TrustBadge icon={<CheckCircle2 className="h-4 w-4" />} label={`${siteConfig.yearsInBusiness}+ Years`} />
            <TrustBadge icon={<MapPin className="h-4 w-4" />} label={`${city.zip.length} ZIPs Served`} />
          </div>
        </header>

        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ─── LEFT COLUMN: Main Story ─── */}
          <div className="md:col-span-7 xl:col-span-8 space-y-14 sm:space-y-20">

            {/* INTRO */}
            <div className="space-y-5 sm:space-y-6">
              {city.intro.map((p, i) => (
                <p key={i} className={bodyLg}>{p}</p>
              ))}
            </div>

            {/* WHY US */}
            <div>
              <h2 className={h2}>Why {city.city} homeowners choose One Stop Outdoor</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {city.whyUs.map((item, i) => (
                  <div key={i} className="rounded-xl border border-[var(--onestop-line)] bg-white p-5 sm:p-6 shadow-sm">
                    <h3 className={h3}>{item.heading}</h3>
                    <p className={`mt-2 text-sm leading-relaxed text-[var(--onestop-ink)]/80`}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES GRID */}
            <div>
              <h2 className={h2}>Services we offer in {city.city}</h2>
              <p className={`mt-4 ${bodyLg}`}>
                One contractor, one warranty, every outdoor trade in-house. Click any service for materials, pricing and photos.
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {PILLAR_LINKS.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group rounded-xl border border-[var(--onestop-line)] bg-white hover:border-[var(--onestop-navy)] hover:shadow-md hover:-translate-y-0.5 transition-all px-4 py-5 text-center"
                  >
                    <span className="block text-sm sm:text-base font-bold text-[var(--onestop-ink)] group-hover:text-[var(--onestop-red)] transition-colors leading-tight">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-[var(--onestop-ink)]/55 group-hover:text-[var(--onestop-red)]/70 transition-colors">
                      View details →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* PRICING SNAPSHOT */}
            <div className="rounded-2xl bg-[var(--onestop-navy-deep)] text-white p-8 sm:p-10 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                {city.city} pricing snapshot
              </h2>
              <p className="mt-3 text-base text-white/75">
                Starting ranges from real {city.city}-area projects. Every quote is on-site, itemized, and free.
              </p>
              <div className="mt-8 grid gap-3 sm:gap-4 grid-cols-2">
                {PRICE_SNAPSHOT.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/services/${p.slug}`}
                    className="group rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-1.5 text-white/50">
                      <DollarSign className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[0.6rem] font-bold uppercase tracking-wider">Starting at</span>
                    </div>
                    <div className="mt-1 text-2xl font-black text-[var(--onestop-red)] leading-none drop-shadow-sm">
                      {p.startingAt}
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-white group-hover:text-[var(--onestop-red)] transition-colors leading-tight">
                      {p.label}
                    </h3>
                    <p className="mt-1 text-xs text-white/50 leading-snug">{p.note}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className={h2}>{city.city}, {city.state} FAQ</h2>
              <div className="mt-8 divide-y divide-[var(--onestop-line)] border-y border-[var(--onestop-line)]">
                {city.faqs.map((f, i) => (
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
            
            {/* Hero Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--onestop-line)] bg-slate-900 shadow-xl">
               <Image
                src={city.heroImage}
                alt={`Outdoor construction project in ${city.city}, ${city.state} — One Stop Outdoor Construction`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>

            {/* Interactive Map */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[var(--onestop-line)] bg-white shadow-md group">
               <iframe
                  title={`Map of One Stop Outdoor Construction service area near ${city.city}, ${city.state}`}
                  src={`https://maps.google.com/maps?q=${city.geo.lat},${city.geo.lng}&z=11&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Quick Details Box */}
            <div className="rounded-xl border border-[var(--onestop-line)] bg-white p-6 shadow-md">
               <h3 className="text-[0.65rem] font-bold text-[var(--onestop-ink)]/50 uppercase tracking-wider mb-4">Service Area Details</h3>
               <dl className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--onestop-line)] pb-3">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Coverage</dt>
                     <dd className="font-bold text-[var(--onestop-ink)] text-right">{city.city} &amp;<br/>{city.county}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--onestop-line)] pb-3">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Neighborhoods</dt>
                     <dd className="font-bold text-[var(--onestop-ink)] text-right">{city.neighborhoods[0]}, {city.neighborhoods[1]}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[var(--onestop-line)] pb-3">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Consultation</dt>
                     <dd className="font-bold text-[var(--onestop-ink)]">Free On-Site</dd>
                  </div>
                  <div className="flex justify-between pb-1">
                     <dt className="font-semibold text-[var(--onestop-ink)]/70">Permits/HOA</dt>
                     <dd className="font-bold text-[var(--onestop-ink)]">Handled by us</dd>
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

      {/* ═══ PROOF / REVIEWS (Bottom Full Width) ═══ */}
      <section className="bg-white border-y border-[var(--onestop-line)]">
        <div className={`${shell} ${sectionPad}`}>
          <div className="max-w-3xl">
            <h2 className={h2}>Recent reviews from {city.city} and nearby</h2>
          </div>
          <div className={`mt-8 sm:mt-10 grid gap-4 sm:gap-5 ${city.proofQuotes.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {city.proofQuotes.map((r, i) => (
              <blockquote key={i} className="rounded-xl border border-[var(--onestop-line)] bg-slate-50 p-5 sm:p-6 lg:p-7 shadow-sm">
                <div className="flex gap-0.5 text-[var(--onestop-red)] mb-3">
                  {[0,1,2,3,4].map((n) => <Star key={n} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-[0.95rem] sm:text-base text-[var(--onestop-ink)]/90 leading-relaxed italic">&ldquo;{r.quote}&rdquo;</p>
                <footer className="mt-4 text-xs sm:text-sm font-bold text-[var(--onestop-ink)]">— {r.author}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 sm:mt-10">
            <Link href="/#reviews" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] underline-offset-4 hover:underline">
              Read all {siteConfig.reviewCount}+ reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ RECENT PROJECTS GALLERY ═══ */}
      <section className={`${shell} ${sectionPad}`}>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="max-w-2xl">
            <h2 className={h2}>Recent projects near {city.city}</h2>
            <p className={`mt-3 ${body}`}>
              A snapshot of patio covers, outdoor kitchens and stamped concrete we&apos;ve built across {city.county}.
            </p>
          </div>
          <Link href="/gallery" className="shrink-0 text-sm font-bold text-[var(--onestop-navy)] hover:text-[var(--onestop-red)] underline-offset-4 hover:underline whitespace-nowrap">
            Full gallery →
          </Link>
        </div>
        <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
          {[
            ...serviceData.find((s) => s.slug === 'patio-covers')?.media.filter((m) => m.type === 'image').slice(0, 3) ?? [],
            ...serviceData.find((s) => s.slug === 'outdoor-kitchens')?.media.filter((m) => m.type === 'image').slice(0, 3) ?? [],
            ...serviceData.find((s) => s.slug === 'concrete-driveways')?.media.filter((m) => m.type === 'image').slice(0, 2) ?? [],
          ].slice(0, 8).map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border border-[var(--onestop-line)] hover:shadow-lg transition-shadow">
              <Image
                src={img.src}
                alt={`One Stop Outdoor Construction project near ${city.city}, ${city.state}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-[var(--onestop-red)] text-white">
        <div className={`mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10 ${sectionPadTight} text-center`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Ready to start your {city.city} backyard?
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Free on-site estimate. Honest pricing. {siteConfig.yearsInBusiness}+ years building across {city.county}.
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

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[var(--onestop-line)] bg-white px-3 py-2.5 text-xs font-bold text-[var(--onestop-ink)] leading-tight shadow-sm">
      <span className="text-[var(--onestop-red)] shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
