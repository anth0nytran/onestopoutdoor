import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config';
import { areaCities } from './data';

export const metadata: Metadata = {
  title: { absolute: 'Service Areas — Richmond, Katy, Houston & Sugar Land TX' },
  description:
    'One Stop Outdoor Construction serves Richmond, Katy, Sugar Land, Rosenberg and Houston TX with patio covers, outdoor kitchens, pergolas and concrete. Licensed, insured, 15+ years.',
  alternates: { canonical: '/service-areas' },
  openGraph: {
    title: 'Service Areas — Richmond, Katy, Houston & Sugar Land TX',
    description:
      'Patio covers, outdoor kitchens, pergolas & concrete across Fort Bend and west Harris County. Licensed, insured.',
    url: `${siteConfig.domain}/service-areas`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Service Areas — One Stop Outdoor Construction' }],
  },
};

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

export default function ServiceAreasIndex() {
  const pageUrl = `${siteConfig.domain}/service-areas`;
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="onestop-site bg-[var(--onestop-cream)] text-[var(--onestop-ink)]">
        {/* ═══ HERO ═══ */}
        <section className={`${shell} pt-10 sm:pt-12 lg:pt-14 pb-10 sm:pb-14`}>
          <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-[var(--onestop-ink)]/70 mb-6 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li><Link href="/" className="hover:text-[var(--onestop-red)] underline-offset-2 hover:underline">Home</Link></li>
              <li aria-hidden className="text-[var(--onestop-ink)]/40">/</li>
              <li className="font-semibold text-[var(--onestop-ink)]">Service Areas</li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--onestop-navy)]/10 text-[var(--onestop-navy)] px-3 py-1.5 text-[0.65rem] sm:text-xs font-bold tracking-wider uppercase">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> Fort Bend &amp; West Harris County
          </span>
          <h1 className="mt-4 sm:mt-5 text-[2rem] leading-[1.08] sm:text-5xl md:text-[3.25rem] lg:text-6xl font-black tracking-tight">
            Service Areas
          </h1>
          <p className="mt-5 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-[var(--onestop-ink)]/80 leading-relaxed">
            One Stop Outdoor Construction builds patio covers, pergolas, outdoor kitchens and concrete patios across five core Texas markets. Pick your city for local pricing, neighborhoods served, and a city-specific FAQ.
          </p>
        </section>

        {/* ═══ CITY CARDS ═══ */}
        <section className={`${shell} pb-14 sm:pb-20 lg:pb-24`}>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areaCities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="group relative flex flex-col rounded-xl border border-[var(--onestop-line)] bg-white hover:border-[var(--onestop-navy)] hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--onestop-navy)]">
                      {c.county}
                    </div>
                    <h2 className="mt-1.5 text-xl sm:text-2xl font-black text-[var(--onestop-ink)] group-hover:text-[var(--onestop-red)] transition-colors leading-tight">
                      {c.city}, {c.state}
                    </h2>
                  </div>
                  {c.priority === 'primary' && (
                    <span className="shrink-0 rounded-full bg-[var(--onestop-red)]/10 text-[var(--onestop-red)] text-[0.6rem] font-black tracking-wider uppercase px-2 py-1">
                      Primary
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm sm:text-[0.95rem] text-[var(--onestop-ink)]/75 leading-relaxed line-clamp-3 flex-1">
                  {c.answerFirst}
                </p>

                <div className="mt-5 pt-4 border-t border-[var(--onestop-line)] flex items-center justify-between gap-3">
                  <span className="text-[0.7rem] font-mono text-[var(--onestop-ink)]/55">
                    ZIPs {c.zip.slice(0, 3).join(', ')}
                  </span>
                  <span className="text-sm font-bold text-[var(--onestop-navy)] group-hover:text-[var(--onestop-red)] transition-colors flex items-center gap-1.5 whitespace-nowrap">
                    View <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="bg-[var(--onestop-red)] text-white">
          <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Don&apos;t see your city?
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              We regularly build in Fulshear, Missouri City, Cinco Ranch, Greatwood, Pecan Grove, Pearland and more. Call and we&apos;ll tell you in 30 seconds if we cover your ZIP.
            </p>
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="mt-7 sm:mt-8 inline-flex items-center justify-center gap-2 bg-white text-[var(--onestop-red)] hover:bg-white/95 font-black px-7 py-4 rounded-lg transition-colors active:scale-[0.98] shadow-md"
            >
              <Phone className="h-5 w-5" /> Call {siteConfig.phone}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
