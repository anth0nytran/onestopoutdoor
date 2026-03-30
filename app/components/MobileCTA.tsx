'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config';

export function MobileCTA() {
  const [show, setShow] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        const pastFold = y > 400;

        // scrolling down & past fold → show
        if (delta > 4 && pastFold) setShow(true);
        // scrolling up → hide
        if (delta < -6) setShow(false);
        // back at top → hide
        if (y < 100) setShow(false);

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="fixed bottom-0 inset-x-0 z-50 sm:hidden pointer-events-none"
        >
          <div
            className="pointer-events-auto mx-3 mb-[calc(env(safe-area-inset-bottom,6px)+6px)] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(20px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
              boxShadow: '0 -1px 0 rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex gap-2 p-2">
              <a
                href={`tel:${siteConfig.cleanPhone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--onestop-red)] h-12 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-white rounded-xl active:scale-[0.96] transition-transform duration-150"
              >
                <Phone className="h-[15px] w-[15px]" strokeWidth={2.5} />
                Call Now
              </a>
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--onestop-navy-deep)] h-12 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-white rounded-xl active:scale-[0.96] transition-transform duration-150"
              >
                Free Quote
                <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
