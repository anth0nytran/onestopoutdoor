'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X, ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig, navLinks, serviceData } from '../config';
import { areaCities } from '../service-areas/data';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };
  
  const toggleDropdown = (label: string) => {
    setOpenDropdown(prev => prev === label ? null : label);
  };

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <motion.div
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[var(--onestop-navy)] text-white"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center justify-center gap-2 py-2 text-center">
          <span className="text-[0.7rem] sm:text-xs font-bold tracking-wide">
            Serving Richmond, Katy, Houston, Sugar Land &amp; Rosenberg
          </span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <a href={`tel:${siteConfig.cleanPhone}`} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-extrabold text-white hover:text-white/80 transition-colors duration-200">
            <Phone className="h-3 w-3" /> Call Now: {siteConfig.phone}
          </a>
        </div>
      </motion.div>

      {/* ═══ HEADER ═══ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50"
      >
        <div className={`bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-[0_1px_0_rgba(0,0,0,0.06)]'}`}>
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex items-center justify-between h-16 sm:h-[4.5rem]">

            {/* Brand */}
            <Link href="/" className="group leading-none relative">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Image
                  src="/logos/main_logo.svg"
                  alt="One Stop Outdoor Construction"
                  width={200}
                  height={56}
                  priority
                  className="h-10 sm:h-14 w-auto"
                />
              </motion.div>
            </Link>

            {/* Nav links */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((l, i) => {
                const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href.replace('/#', '/'));
                const isServices = l.label === 'Services';
                const isAreas = l.label === 'Areas';
                const hasDropdown = isServices || isAreas;

                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                    className={hasDropdown ? "relative group" : ""}
                  >
                    <Link
                      href={l.href}
                      className={`relative px-3.5 py-2 flex items-center gap-1 text-[0.82rem] font-semibold rounded-lg transition-all duration-200 ${isActive ? 'text-[var(--onestop-navy-deep)] bg-[var(--onestop-navy)]/5' : 'text-slate-500 hover:text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy)]/5'}`}
                    >
                      {l.label}
                      {hasDropdown && <ChevronDown className="h-3 w-3 opacity-50 transition-transform group-hover:rotate-180" />}
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${isActive ? 'w-5 bg-[var(--onestop-red)]' : 'w-0 bg-[var(--onestop-red)] group-hover:w-5'}`} />
                    </Link>
                    
                    {hasDropdown && (
                      <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        {/* Invisible bridge to prevent hover loss */}
                        <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" />
                        
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100/80 transform scale-[0.97] group-hover:scale-100 origin-top transition-all duration-300 overflow-hidden">
                          {isServices && (
                            <div className="w-[640px] p-6 grid grid-cols-2 gap-x-8 gap-y-3">
                              {serviceData.map(s => (
                                <Link 
                                  key={s.slug} 
                                  href={`/services/${s.slug}`} 
                                  className="group/item flex flex-col p-3 rounded-xl hover:bg-[var(--onestop-navy)]/5 transition-all duration-200"
                                >
                                  <span className="text-[0.95rem] font-bold text-[var(--onestop-navy-deep)] group-hover/item:text-[var(--onestop-red)] transition-colors flex items-center gap-1.5">
                                    {s.title}
                                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                  </span>
                                  <span className="text-[0.75rem] leading-relaxed text-slate-500 mt-1 line-clamp-2 pr-2">
                                    {s.summary}
                                  </span>
                                </Link>
                              ))}
                              <div className="col-span-2 pt-4 mt-2 border-t border-slate-100 flex justify-center">
                                <Link href="/services" className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--onestop-red)] hover:bg-[var(--onestop-red)]/10 rounded-full transition-colors">
                                  View All Services <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          )}
                          
                          {isAreas && (
                            <div className="w-[500px] p-6 grid grid-cols-2 gap-x-6 gap-y-3">
                              {areaCities.map(a => (
                                <Link 
                                  key={a.slug} 
                                  href={`/service-areas/${a.slug}`} 
                                  className="group/item flex items-center gap-3.5 p-3 rounded-xl hover:bg-[var(--onestop-navy)]/5 transition-all duration-200"
                                >
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--onestop-navy)]/5 flex items-center justify-center text-[var(--onestop-navy-deep)] group-hover/item:bg-[var(--onestop-red)] group-hover/item:text-white group-hover/item:shadow-md group-hover/item:shadow-[var(--onestop-red)]/20 transition-all duration-300">
                                    <MapPin className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <span className="block text-[0.9rem] font-bold text-[var(--onestop-navy-deep)] group-hover/item:text-[var(--onestop-red)] transition-colors">
                                      {a.city}, {a.state}
                                    </span>
                                    <span className="block text-[0.7rem] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                                      Service Area
                                    </span>
                                  </div>
                                </Link>
                              ))}
                              <div className="col-span-2 pt-4 mt-2 border-t border-slate-100 flex justify-center">
                                <Link href="/service-areas" className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--onestop-red)] hover:bg-[var(--onestop-red)]/10 rounded-full transition-colors">
                                  View All Areas <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Right side — phone + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="hidden sm:flex items-center gap-4"
            >
              <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center gap-1.5 text-sm font-bold text-[var(--onestop-navy-deep)] hover:text-[var(--onestop-red)] transition-colors duration-200">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[var(--onestop-navy)]/8">
                  <Phone className="h-3.5 w-3.5 text-[var(--onestop-navy)]" />
                </div>
                {siteConfig.phone}
              </a>
              <Link href="/contact" className="relative bg-[var(--onestop-red)] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[var(--onestop-red)]/15 hover:-translate-y-px active:translate-y-0 group">
                <span className="relative z-10">Call Now</span>
                <span className="absolute inset-0 bg-[var(--onestop-navy-deep)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>

            {/* Mobile menu toggle */}
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center lg:hidden text-[var(--onestop-navy-deep)]" onClick={() => setMobileMenuOpen((o) => !o)} aria-label="Menu">
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-white border-b border-slate-100 lg:hidden"
            >
              <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 flex flex-col gap-1 py-5">
                <nav className="flex flex-col">
                  {navLinks.map((l, i) => {
                    const isServices = l.label === 'Services';
                    const isAreas = l.label === 'Areas';
                    const hasDropdown = isServices || isAreas;
                    const isOpen = openDropdown === l.label;

                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            href={l.href}
                            onClick={closeMobileMenu}
                            className="flex-1 py-3.5 text-base font-semibold text-[var(--onestop-navy-deep)] transition-colors hover:text-[var(--onestop-red)]"
                          >
                            {l.label}
                          </Link>
                          {hasDropdown && (
                            <button 
                              onClick={() => toggleDropdown(l.label)} 
                              className="p-3.5 -mr-3.5 text-[var(--onestop-navy-deep)] transition-colors hover:text-[var(--onestop-red)]"
                              aria-label={`Toggle ${l.label} menu`}
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isOpen && hasDropdown && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-2 pb-4 pl-4 border-l-2 border-[var(--onestop-red)]/20 ml-2 mt-2">
                                {isServices && (
                                  <>
                                    {serviceData.map(s => (
                                      <Link key={s.slug} onClick={closeMobileMenu} href={`/services/${s.slug}`} className="group py-2 text-sm font-medium text-slate-600 transition-colors hover:text-[var(--onestop-navy-deep)] flex flex-col">
                                        <span className="font-bold text-[var(--onestop-navy-deep)] group-hover:text-[var(--onestop-red)] transition-colors">{s.title}</span>
                                        <span className="text-xs text-slate-400 mt-0.5 line-clamp-1">{s.summary}</span>
                                      </Link>
                                    ))}
                                    <Link onClick={closeMobileMenu} href="/services" className="inline-flex items-center gap-1.5 mt-2 py-2 text-xs font-bold uppercase tracking-wider text-[var(--onestop-red)]">
                                      View All Services <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  </>
                                )}
                                {isAreas && (
                                  <>
                                    {areaCities.map(a => (
                                      <Link key={a.slug} onClick={closeMobileMenu} href={`/service-areas/${a.slug}`} className="group flex items-center gap-3 py-2 text-sm font-medium text-slate-600 transition-colors">
                                        <MapPin className="h-4 w-4 text-slate-400 group-hover:text-[var(--onestop-red)] transition-colors" />
                                        <span className="font-bold text-[var(--onestop-navy-deep)] group-hover:text-[var(--onestop-red)] transition-colors">{a.city}</span>
                                      </Link>
                                    ))}
                                    <Link onClick={closeMobileMenu} href="/service-areas" className="inline-flex items-center gap-1.5 mt-2 py-2 text-xs font-bold uppercase tracking-wider text-[var(--onestop-red)]">
                                      View All Areas <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </nav>
                <div className="mt-3 flex flex-col gap-3">
                  <a href={`tel:${siteConfig.cleanPhone}`} className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--onestop-navy-deep)]">
                    <Phone className="h-4 w-4" /> {siteConfig.phone}
                  </a>
                  <Link href="/contact" onClick={closeMobileMenu} className="block text-center bg-[var(--onestop-red)] py-4 rounded-lg text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--onestop-navy-deep)]">
                    Call Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
