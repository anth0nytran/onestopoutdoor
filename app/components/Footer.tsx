import Link from 'next/link';
import Image from 'next/image';
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
            <Link href="/" className="inline-block">
              <Image
                src="/logos/main_logo.svg"
                alt="One Stop Outdoor Construction"
                width={220}
                height={60}
                className="h-14 sm:h-16 w-auto brightness-0 invert"
              />
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
            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <a href="https://www.facebook.com/p/One-Stop-Outdoor-Construction-Texas-100063553814373/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/onestopoutdoorconstruction" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@onestopoutdoorcons" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z"/></svg>
              </a>
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
              <div className="flex items-center gap-3"><Star className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" /> {siteConfig.rating} Star Rated on Google</div>
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
