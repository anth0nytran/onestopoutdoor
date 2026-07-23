import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config';
import { Stars } from '../components/Stars';

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

export const metadata: Metadata = {
  title: 'Reviews — 5.0★ from 32 Verified Google Customers',
  description: `Read all ${siteConfig.reviewCount} verified 5-star Google reviews for ${siteConfig.businessName}. Real customers across Richmond, Katy, Sugar Land & Houston TX on patio covers, stamped concrete, outdoor kitchens & more.`,
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Reviews — 5.0★ from 32 Verified Google Customers',
    description: `Real, verified 5-star reviews for ${siteConfig.businessName} from homeowners across Richmond, Katy, Sugar Land & Houston TX.`,
    url: `${siteConfig.domain}/reviews`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${siteConfig.businessName} customer reviews` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reviews — 5.0★ from 32 Verified Google Customers',
    description: `Real, verified 5-star reviews for ${siteConfig.businessName}.`,
    images: ['/og-image.jpg'],
  },
};

export default function ReviewsPage() {
  const reviews = siteConfig.testimonials;

  // Schema ── BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.domain },
      { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${siteConfig.domain}/reviews` },
    ],
  };

  // Schema ── LocalBusiness with aggregateRating + full review list
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.domain}/#business`,
    name: siteConfig.businessName,
    url: siteConfig.domain,
    telephone: siteConfig.cleanPhone,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(siteConfig.rating),
      reviewCount: String(siteConfig.reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(t.stars), bestRating: '5' },
      reviewBody: t.quote,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-[var(--onestop-cream)] py-14 sm:py-18">
        <div className={shell}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[var(--onestop-navy-deep)] transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[var(--onestop-navy-deep)]">Reviews</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-app-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--onestop-navy-deep)] leading-tight mb-5">
              What Our Customers Say
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-full bg-white/70 px-4 py-2 shadow-sm">
                <span className="text-2xl font-extrabold text-[var(--onestop-navy-deep)]">{siteConfig.rating.toFixed(1)}</span>
                <Stars count={5} size="h-5 w-5 text-[#FBBC05]" />
              </div>
              <p className="text-base text-slate-600 font-medium">
                Rated {siteConfig.rating.toFixed(1)} across {siteConfig.reviewCount} verified Google reviews. Here&rsquo;s what homeowners
                across Richmond, Katy, Sugar Land, Rosenberg &amp; Houston say about their projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews Grid (full text — every review crawlable) ── */}
      <section className="py-14 sm:py-18 bg-white">
        <div className={shell}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t) => (
              <article
                key={t.name}
                className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-6 sm:p-7 relative overflow-hidden group flex flex-col"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--onestop-navy)]/10 group-hover:bg-[var(--onestop-navy)] transition-colors" />

                <div className="flex items-center gap-1 mb-3">
                  <Stars count={t.stars} size="h-4 w-4 text-[#FBBC05]" />
                </div>

                <div className="flex-1">
                  <p className="text-[0.95rem] leading-relaxed text-slate-600 italic font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--onestop-navy)] text-sm font-bold text-white shadow-md">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-[var(--onestop-navy-deep)] truncate">{t.name}</div>
                    <div className="text-[0.7rem] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-[#4285F4]" /> Verified Google Review
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        <div className={`${shell} relative z-10 text-center`}>
          <h2 className="font-[family-name:var(--font-app-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Join Them?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            {siteConfig.businessName} serves Richmond, Katy, Houston, Sugar Land, Rosenberg, and surrounding
            areas. Get the same quality craftsmanship these homeowners did — free, no-pressure estimate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--onestop-red)] px-7 py-3.5 font-semibold text-white shadow-lg hover:brightness-110 transition"
            >
              Get a Free Estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.cleanPhone}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
