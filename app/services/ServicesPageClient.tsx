'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ChevronDown,
  Shield,
  Star,
} from 'lucide-react';
import { siteConfig } from '../config';
import { Stars } from '../components/Stars';
import { useState } from 'react';

interface ServiceItem {
  slug: string;
  title: string;
  image: string;
  summary: string;
  details: string[];
  turnaround: string;
  longDescription: string;
  keywords: string[];
}

interface FaqItem {
  q: string;
  a: string;
}

const shell = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function FaqAccordion({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--onestop-navy)]"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-base font-bold text-[var(--onestop-navy-deep)] sm:text-lg">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--onestop-gold)] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPageClient({
  services,
  faqs,
}: {
  services: ServiceItem[];
  faqs: FaqItem[];
}) {
  return (
    <>
      {/* ═══ PAGE HEADER ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-10 sm:py-14 lg:py-16">
        <div className="absolute inset-0 bg-[url('/facebook/filler.jpg')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="absolute inset-0 bg-[var(--onestop-navy-deep)]/80" />
        <div className={`${shell} relative z-10`}>
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white/70">Services</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.08]">
            Our Services
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/50 max-w-xl">
            Patio covers, concrete, outdoor kitchens, pergolas, roofing, and walkways.
            {' '}{siteConfig.yearsInBusiness}+ years serving Richmond, Katy, Houston, Sugar Land,
            and Rosenberg.
          </p>

          {/* Quick-nav pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:border-white/30 hover:text-white transition-all"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICE SECTIONS ═══ */}
      {services.map((service, idx) => {
        const isEven = idx % 2 === 0;
        const bgClass = isEven ? 'bg-white' : 'bg-[var(--onestop-cream)]';

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`${bgClass} scroll-mt-20 py-14 sm:py-24 lg:py-28`}
          >
            <div className={shell}>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  idx % 2 !== 0 ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Photo placeholder */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="lg:[direction:ltr]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                    <Image src={service.image} alt={service.title} fill className="object-cover" quality={85} />
                    {/* Turnaround badge */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--onestop-navy-deep)] px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-white">
                      <Clock className="h-3 w-3 text-[var(--onestop-gold)]" />
                      {service.turnaround}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeUp}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="lg:[direction:ltr]"
                >
                  <h2 className="text-2xl font-extrabold tracking-tight text-[var(--onestop-navy-deep)] sm:text-3xl lg:text-4xl">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-[1.05rem]">
                    {service.longDescription}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-slate-500 sm:text-base">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--onestop-navy)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--onestop-red)] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
                    >
                      Get Free Estimate <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={`tel:${siteConfig.cleanPhone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--onestop-navy-deep)]/15 px-6 py-3.5 text-sm font-bold text-[var(--onestop-navy-deep)] hover:bg-[var(--onestop-navy-deep)]/5 transition-all"
                    >
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ MID-PAGE CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-[var(--onestop-navy-deep)] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('/facebook/filler2.jpg')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--onestop-navy-deep)]/90 to-transparent" />
        
        <div className={`${shell} relative z-10`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="mt-5 text-base text-white/50 max-w-lg mx-auto leading-relaxed">
              Every project starts with a free, no-pressure estimate. Call us or fill out the form.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--onestop-red)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all"
              >
                Get Your Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/5 transition-all"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-white/30">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> Licensed &amp; Insured</span>
              <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[var(--onestop-gold)]" /> {siteConfig.reviewCount}+ 5-Star Reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="bg-white py-14 sm:py-24">
        <div className={shell}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-2xl font-extrabold text-[var(--onestop-navy-deep)] sm:text-3xl lg:text-4xl">
              Our Process
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Free Consultation', desc: 'We visit your property, assess the scope, and discuss your options at no cost.' },
              { step: '02', title: 'Custom Proposal', desc: 'You receive a detailed, transparent quote with no hidden fees or surprises.' },
              { step: '03', title: 'Expert Build', desc: 'Our crew handles construction with quality craftsmanship and clean worksite practices.' },
              { step: '04', title: 'Final Walkthrough', desc: 'We walk through the finished project together and make sure everything meets our standards.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--onestop-navy-deep)] text-lg font-extrabold text-white">
                  {item.step}
                </div>
                <h3 className="mt-5 text-base font-bold text-[var(--onestop-navy-deep)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-[var(--onestop-cream)] py-14 sm:py-24">
        <div className={shell}>
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--onestop-navy-deep)] sm:text-3xl lg:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base text-slate-500 max-w-sm leading-relaxed">
                Don&apos;t see your question? We&apos;re happy to help — just give us a call.
              </p>
              <a href={`tel:${siteConfig.cleanPhone}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--onestop-navy-deep)] hover:text-[var(--onestop-gold)] transition-colors">
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </motion.div>

            <div>
              {faqs.map((faq, i) => (
                <FaqAccordion key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('/facebook/filler2.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/40" />
        
        <div className={`${shell} relative z-10`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl leading-tight">
                Ready to get started? Call us today.
              </h2>
              <p className="mt-3 text-base text-white/50">
                Quality craftsmanship. Fair pricing. {siteConfig.yearsInBusiness}+ years of trust.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--onestop-red)] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all"
              >
                Get Free Estimate <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/5 transition-all"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
