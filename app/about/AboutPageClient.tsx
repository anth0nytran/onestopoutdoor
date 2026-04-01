'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  Heart,
  CheckCircle2,
  Clock,
  Star,
  Sparkles,
  Users,
  MapPin,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { siteConfig } from '../config';
import { Stars } from '../components/Stars';

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPageClient() {
  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0">
          <Image
            src="/facebook/filler3.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-[var(--onestop-navy-deep)]/80" />
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white/70">About</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold leading-[1.06] text-white sm:text-4xl tracking-tight">
            About <span className="text-[var(--onestop-gold)]">One Stop Outdoor</span>
          </h1>
          <p className="mt-3 text-base text-white/50 leading-relaxed max-w-xl">
            Family-owned out of Richmond, TX. {siteConfig.yearsInBusiness}+ years building
            patio covers, concrete driveways, outdoor kitchens, and more across the greater Houston area.
          </p>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-white border-b border-slate-100">
        <div className={shell}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: `${siteConfig.yearsInBusiness}+`, label: 'Years in Business' },
              { value: '5.0', label: 'Star Rating' },
              { value: '70%', label: 'Repeat & Referral' },
              { value: '100%', label: 'Satisfaction Guarantee' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="py-10 px-6 text-center"
              >
                <div className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl">{stat.value}</div>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="bg-white py-14 sm:py-28">
        <div className={shell}>
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
            >
                <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight mb-8">
                Our Story
              </h2>
              <div className="space-y-5 text-[0.95rem] leading-[1.8] text-slate-600">
                <p>
                  More than {siteConfig.yearsInBusiness} years ago, {siteConfig.ownerName} started
                  this company out of Richmond with one goal: do the work right, charge a fair
                  price, and leave every property better than he found it. No fancy office, no
                  sales pitch — just honest construction work done to code and built to last.
                </p>
                <p>
                  Word spread. One neighbor told the next. That&apos;s still how most of our
                  work comes in today — 70% of our business is repeat customers and referrals.
                  We&apos;re a family-run operation — not a franchise, not a call center. When
                  you call, you&apos;re talking to someone who&apos;ll actually be on your property.
                </p>
                <p>
                  Our top services — <strong className="text-[var(--onestop-navy-deep)]">patio
                  covers, concrete &amp; driveways, and outdoor kitchens</strong> — are what
                  most people know us for. But we also handle pergolas, roofing, and walkways
                  &amp; pavers. Whatever the job, the standard is the same: show up on time,
                  communicate clearly, and build it right the first time.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-gold)] hover:underline">
                  See our services <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[var(--onestop-gold)] transition-colors">
                  View our work <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Right — photo placeholder + trust badge */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="space-y-5"
            >
              {/* Photo placeholder */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                <Image src="/facebook/ourstory.jpg" alt="One Stop Outdoor Construction crew building a patio cover frame" fill className="object-cover" quality={85} />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[var(--onestop-cream)] border border-slate-200 px-5 py-4">
                <Shield className="h-5 w-5 text-[var(--onestop-gold)] shrink-0" />
                <span className="text-sm font-semibold text-[var(--onestop-navy-deep)]">Full liability insurance on every job — no exceptions</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-[var(--onestop-cream)] py-20 sm:py-24 border-y border-slate-200">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl">
              Customer Reviews
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.testimonials.slice(0, 3).map((t) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="flex flex-col h-full rounded-2xl bg-white border border-slate-200 p-7 shadow-sm"
              >
                <Stars count={5} size="h-4 w-4 text-[#FBBC05]" />
                <p className="mt-4 text-[0.9rem] leading-relaxed text-slate-600 flex-grow line-clamp-[12]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center gap-3 shrink-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--onestop-navy-deep)] text-white text-xs font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--onestop-navy-deep)]">{t.name}</div>
                    <div className="text-xs text-slate-400">Google Review</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-10"
          >
            <Link href="/#reviews" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-gold)] hover:underline">
              See all reviews <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="bg-white py-14 sm:py-28">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight">
              How We Work
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, title: 'Integrity', desc: 'Fair, honest pricing. No upselling. If something isn\'t right, we come back and fix it — no charge, no argument.' },
              { icon: Star, title: 'Quality', desc: 'We don\'t cut corners. From the foundation pour to the final finish, every detail gets the attention it deserves.' },
              { icon: Heart, title: 'Safety', desc: 'Every crew member is trained in proper construction safety, equipment handling, and worksite protocols.' },
              { icon: Clock, title: 'Reliability', desc: 'When we say we\'ll be there, we\'re there. On time, every time, from start to finish.' },
              { icon: Users, title: 'Community', desc: 'This community is our home. We take pride in building for our neighbors.' },
              { icon: Sparkles, title: 'Clean Worksite', desc: 'Every scrap, every piece of debris — cleaned up. Your property stays pristine throughout the project.' },
            ].map((v) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-[var(--onestop-cream)] p-7 hover:shadow-md transition-shadow"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--onestop-navy-deep)]/10">
                  <v.icon className="h-5 w-5 text-[var(--onestop-navy-deep)]" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[var(--onestop-navy-deep)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICE AREAS ═══ */}
      <section className="bg-[var(--onestop-cream)] py-20 sm:py-24 border-t border-slate-200">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-4xl leading-tight">
              Service Areas
            </h2>
            <p className="mt-4 text-base text-slate-500 leading-relaxed">
              Our crews cover the greater Houston area and beyond. If you&apos;re not
              sure whether we serve your neighborhood, just call — we probably do.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
          >
            {siteConfig.allServiceAreas.map((area, i) => {
              const isPrimary = i < 5;
              return (
                <div
                  key={area}
                  className={`flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold ${
                    isPrimary
                      ? 'bg-[var(--onestop-navy-deep)] text-white'
                      : 'bg-white text-[var(--onestop-navy-deep)] border border-slate-200'
                  }`}
                >
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-60" />
                  {area}
                </div>
              );
            })}
          </motion.div>

          <div className="mt-8">
            <p className="text-sm text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-500">Plus neighborhoods:</span>{' '}
              {siteConfig.neighborhoods}
            </p>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/facebook/filler2.jpg"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            quality={65}
            className="object-cover opacity-20 mix-blend-luminosity"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        
        <div className={`${shell} relative z-10`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Get a Free Estimate
            </h2>
            <p className="mt-5 text-base text-white/50 max-w-lg mx-auto leading-relaxed">
              Quality craftsmanship, fair pricing, and the same crew from start to finish.
              Call us or fill out the form — no obligation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all whitespace-nowrap"
              >
                <Phone className="h-4 w-4" /> Call {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap"
              >
                Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-white/30">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> 5-Star Rated</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Free Estimates</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
