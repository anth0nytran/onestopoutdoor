import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileCTA } from "./components/MobileCTA";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-app-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const displayFont = Inter_Tight({
  variable: "--font-app-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-app-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://onestopoutdoorconstruction.com'),
  title: {
    default: "Patio Covers & Outdoor Construction | Richmond TX",
    template: "%s | One Stop Outdoor Construction",
  },
  description: "Patio covers, concrete, outdoor kitchens & pergolas in Richmond, Katy, Houston & Sugar Land TX. 15+ years. Licensed & insured. Free estimates — (832) 945-8084.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Patio Covers & Outdoor Construction in Richmond TX | One Stop Outdoor Construction",
    description: "Patio covers, concrete, outdoor kitchens & pergolas in Richmond, Katy, Houston & Sugar Land TX. 15+ years. Licensed & insured. Free estimates — (832) 945-8084.",
    url: 'https://onestopoutdoorconstruction.com',
    siteName: 'One Stop Outdoor Construction',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'One Stop Outdoor Construction — Patio Covers, Concrete & Outdoor Kitchens in Richmond, Katy & Houston TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Quality Outdoor Construction | One Stop Outdoor Construction",
    description: "Patio covers, concrete, outdoor kitchens, pergolas & roofing for Richmond, Katy, Houston, Sugar Land & Rosenberg TX. Licensed & insured. Free estimates.",
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/logos/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
              "name": "One Stop Outdoor Construction",
              "image": "https://onestopoutdoorconstruction.com/facebook/hero.jpg",
              "@id": "https://onestopoutdoorconstruction.com",
              "url": "https://onestopoutdoorconstruction.com",
              "telephone": "+18329458084",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+18329458084",
                "contactType": "sales",
                "areaServed": ["Richmond TX", "Katy TX", "Houston TX", "Sugar Land TX", "Rosenberg TX"],
                "availableLanguage": ["English", "Spanish"]
              },
              "description": "Quality patio covers, concrete, outdoor kitchens, pergolas, roofing and walkways serving Richmond, Katy, Houston, Sugar Land & Rosenberg TX. 15+ years in business. Licensed & insured. Free estimates.",
              "sameAs": [
                "https://www.facebook.com/p/One-Stop-Outdoor-Construction-Texas-100063553814373/",
                "https://www.instagram.com/onestopoutdoorconstruction",
                "https://www.tiktok.com/@onestopoutdoorcons"
              ],
              "founder": {
                "@type": "Person",
                "name": "David Arabzadeh",
                "jobTitle": "Owner & Lead Contractor",
                "worksFor": { "@type": "Organization", "name": "One Stop Outdoor Construction" },
                "description": "David Arabzadeh is the owner and lead contractor of One Stop Outdoor Construction. Since 2011 he has personally led 300+ patio-cover, outdoor-kitchen and concrete projects across Richmond, Katy, Sugar Land and greater Houston.",
                "knowsAbout": ["Patio Covers", "Pergolas", "Outdoor Kitchens", "Stamped Concrete", "Residential Construction", "Fort Bend County HOA Approvals"]
              },
              "employee": {
                "@type": "Person",
                "name": "David Arabzadeh",
                "jobTitle": "Owner & Lead Contractor"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Richmond",
                "addressRegion": "TX",
                "postalCode": "77407",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.5823,
                "longitude": -95.7607
              },
              "areaServed": [
                { "@type": "City", "name": "Richmond", "sameAs": "https://en.wikipedia.org/wiki/Richmond,_Texas" },
                { "@type": "City", "name": "Katy", "sameAs": "https://en.wikipedia.org/wiki/Katy,_Texas" },
                { "@type": "City", "name": "Houston", "sameAs": "https://en.wikipedia.org/wiki/Houston" },
                { "@type": "City", "name": "Sugar Land", "sameAs": "https://en.wikipedia.org/wiki/Sugar_Land,_Texas" },
                { "@type": "City", "name": "Rosenberg", "sameAs": "https://en.wikipedia.org/wiki/Rosenberg,_Texas" },
                { "@type": "City", "name": "Missouri City", "sameAs": "https://en.wikipedia.org/wiki/Missouri_City,_Texas" },
                { "@type": "City", "name": "Fulshear", "sameAs": "https://en.wikipedia.org/wiki/Fulshear,_Texas" },
                { "@type": "City", "name": "Stafford", "sameAs": "https://en.wikipedia.org/wiki/Stafford,_Texas" },
                { "@type": "City", "name": "Pearland", "sameAs": "https://en.wikipedia.org/wiki/Pearland,_Texas" }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "17:00"
              },
              "priceRange": "$$",
              "foundingDate": "2011",
              "knowsLanguage": ["en", "es"],
              "paymentAccepted": "Cash, Credit Card, Check, Zelle",
              "currenciesAccepted": "USD",
              "slogan": "Quality Outdoor Construction You Can Trust",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "32",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Barbara Autry Huyser" },
                  "reviewBody": "I can't rave about this company enough. Communication was excellent throughout the project. The transformation was completed in 8 working days. I would recommend these guys to anyone for any outdoor projects.",
                  "datePublished": "2025-09-15"
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Vishakha Dastidar" },
                  "reviewBody": "Amazing people! Outstanding team! His efficient team finished the job earlier than expected and under budget. He quoted the best price of all the contractors and delivered excellent workmanship.",
                  "datePublished": "2025-08-20"
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Angelina Smith" },
                  "reviewBody": "One Stop Outdoor Construction Texas is one of the best contractors I have ever done business with. David was patient and came out to my house three times before we decided to proceed. His team is very skilled and efficient.",
                  "datePublished": "2025-07-10"
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "AC Nguyen" },
                  "reviewBody": "We had a vision for our patio and David and his crew built it into existence. His mission was to build it so it looked like it came with the house initially, and he exceeded expectations.",
                  "datePublished": "2025-06-05"
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Art DRjr" },
                  "reviewBody": "Reasonable price and best of all, quality work. Every crew member is pleasant and polite. We had a covered patio, with concrete floor, stamped concrete, and other work done. All completed within 5 days. 100% recommended.",
                  "datePublished": "2025-05-22"
                },
                {
                  "@type": "Review",
                  "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                  "author": { "@type": "Person", "name": "Jennifer Clark" },
                  "reviewBody": "David did our patio in April this year and we love it! He was extremely professional and reasonably priced. Unlike most contractors, he was always there when he said he would be.",
                  "datePublished": "2025-04-18"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Outdoor Construction Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Patio Covers", "description": "Custom patio cover installation — lattice, solid insulated, aluminum with optional skylights and ceiling fans" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Concrete & Driveways", "description": "Decorative concrete, stamped concrete, colored concrete, driveway installation in Richmond, Katy & Houston TX" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Outdoor Kitchens", "description": "Custom outdoor kitchen design and construction with built-in grills, countertops, and stone veneer" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pergolas", "description": "Custom pergola design and installation for outdoor living spaces" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roofing Services", "description": "Residential roofing including shingle, metal, flat, and green roofing installations" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Walkways & Pavers", "description": "Paver stone walkway design and installation with flagstone, slate, and natural stone options" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stamped Concrete", "description": "Decorative stamped concrete for driveways, patios, pool decks and walkways" } }
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "One Stop Outdoor Construction",
              "alternateName": ["One Stop Outdoor", "OSOC", "One Stop Outdoor Construction LLC"],
              "url": "https://onestopoutdoorconstruction.com"
            })
          }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        <div className="onestop-site min-h-screen bg-white text-slate-900 selection:bg-[var(--onestop-navy)] selection:text-white">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <MobileCTA />
        </div>
      </body>
    </html>
  );
}
