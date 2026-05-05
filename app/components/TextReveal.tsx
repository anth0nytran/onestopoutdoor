'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useState, type ElementType, type ReactNode } from 'react';

type Split = 'word' | 'char' | 'line';

type TextRevealProps = {
  children: string;
  as?: ElementType;
  className?: string;
  split?: Split;
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
};

const container: Variants = {
  hidden: {},
  shown: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const item: Variants = {
  hidden: { y: '110%', opacity: 0 },
  shown: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  children,
  as: Tag = 'span',
  className,
  split = 'word',
  stagger = 0.035,
  duration,
  delay = 0,
  once = true,
  amount = 0.4,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // SSR / first paint — emit plain text so the server HTML matches and the
  // page stays crawlable. Motion kicks in only after hydration.
  if (!mounted || reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const tokens = split === 'char' ? Array.from(children) : children.split(/(\s+)/);

  const MotionTag = motion(Tag);
  // aria-label is prohibited on generic <span>; only expose it on semantic tags
  // (headings, paragraphs, etc.) where implicit role supports labelling.
  const tagName = typeof Tag === 'string' ? Tag : '';
  const isHeading = /^h[1-6]$/i.test(tagName);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount, margin: '0px 0px -80px 0px' }}
      variants={container}
      custom={{ stagger, delay }}
      {...(isHeading ? { 'aria-label': children } : {})}
    >
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`s-${i}`} aria-hidden={isHeading || undefined} style={{ whiteSpace: 'pre' }}>{token}</span>
          );
        }
        return (
          <span
            key={`${token}-${i}`}
            aria-hidden={isHeading || undefined}
            className="inline-block overflow-hidden align-baseline"
            style={{ lineHeight: 'inherit' }}
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={item}
              transition={duration ? { duration, ease: [0.22, 1, 0.36, 1] } : undefined}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

export function TextRevealLines({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      className={className}
      initial={{ y: '40%', opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
}
