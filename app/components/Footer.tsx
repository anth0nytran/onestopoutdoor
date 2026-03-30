import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Star,
  Truck,
} from 'lucide-react';
import { siteConfig } from '../config';

export function Footer() {
  const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

  return (
    <footer className="bg-[var(--onestop-navy-deep)] text-white">

      {/* MAIN GRID */}
      <div className={`${shell} py-16 sm:py-20`}>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* 0. Brand & Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-extrabold text-2xl sm:text-3xl tracking-tight inline-block">
              ONE STOP <span className="text-[var(--onestop-red)]">OUTDOOR</span>
            </Link>
            <p className="mt-4 text-sm text-white/50 max-w-md leading-relaxed font-medium">
              Quality outdoor construction serving Richmond, Katy, Houston, Sugar Land &amp; Rosenberg TX. {siteConfig.yearsInBusiness}+ years of trusted service. Licensed &amp; insured. Free estimates.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Fast Response &amp; Quick Scheduling</div>
                <a href={`tel:${siteConfig.cleanPhone}`} className="text-xl font-extrabold text-white hover:text-white transition-colors">{siteConfig.phone}</a>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center bg-[var(--onestop-red)] px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:brightness-110 transition-all rounded-lg">
                Get Free Estimate
              </Link>
            </div>
          </div>

          {/* 1. Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><Link href="/services#patio-covers" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/30" />Patio Covers</Link></li>
              <li><Link href="/services#concrete-driveways" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/30" />Concrete &amp; Driveways</Link></li>
              <li><Link href="/services#outdoor-kitchens" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/30" />Outdoor Kitchens</Link></li>
              <li><Link href="/services#pergolas" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/30" />Pergolas</Link></li>
              <li><Link href="/services#roofing" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/30" />Roofing Services</Link></li>
              <li><Link href="/services#walkways-pavers" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/30" />Walkways &amp; Pavers</Link></li>
            </ul>
          </div>

          {/* 2. Service Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">Service Areas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm text-white/50 font-medium">
              {siteConfig.allServiceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs text-white/40 leading-relaxed font-medium">
                <span className="text-white/50 block mb-2 font-bold uppercase tracking-wider text-[0.7rem]">Communities We Serve</span>
                {siteConfig.neighborhoods}
              </p>
            </div>
          </div>

          {/* 3. Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/50 font-medium">
              <li><Link href="/about" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> About One Stop Outdoor</Link></li>
              <li><Link href="/#reviews" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Customer Reviews</Link></li>
              <li><Link href="/gallery" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Our Recent Work</Link></li>
              <li><Link href="/blog" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Construction Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline transition-colors flex items-center gap-2"><ArrowRight className="h-3 w-3 text-white/20" /> Contact &amp; Free Estimate</Link></li>
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4 text-sm text-white/60 font-semibold">
              <div className="flex items-center gap-3"><Shield className="h-4 w-4 text-white/30" />Licensed &amp; Insured</div>
              <div className="flex items-center gap-3"><Star className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" /> {siteConfig.rating} Stars — {siteConfig.reviewCount}+ Reviews</div>
              <div className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-white/30" />{siteConfig.yearsInBusiness}+ Years Experience</div>
              <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-white/30" />70% Repeat &amp; Referral</div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 bg-black/20">
        <div className={`${shell} py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-white/30 font-medium tracking-wide`}>
          <p>&copy; {new Date().getFullYear()} One Stop Outdoor Construction &mdash; Richmond, TX. All rights reserved.</p>
          <p>Quality Outdoor Construction since {new Date().getFullYear() - siteConfig.yearsInBusiness}. Website by <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">QuickLaunchWeb</a></p>
        </div>
      </div>

    </footer>
  );
}
