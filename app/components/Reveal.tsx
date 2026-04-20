'use client';

import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  distance?: number;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'header' | 'footer';
  className?: string;
} & Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'whileInView' | 'transition' | 'children'>;

const offsetFor = (dir: RevealDirection, distance: number) => {
  switch (dir) {
    case 'up':    return { x: 0, y: distance };
    case 'down':  return { x: 0, y: -distance };
    case 'left':  return { x: distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    default:      return { x: 0, y: 0 };
  }
};

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 16,
  once = true,
  amount = 0.15,
  as = 'div',
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const { x, y } = reduce ? { x: 0, y: 0 } : offsetFor(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    shown:  { opacity: 1, x: 0, y: 0 },
  };

  const MotionTag = motion[as] as typeof motion.div;

  // SSR and first client render: render fully visible (matches server HTML exactly).
  // After hydration, switch to the hidden→shown variant so the reveal plays on scroll.
  if (!mounted) {
    const Tag = as as 'div';
    return (
      <Tag className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealStagger({
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.15,
  className,
  as = 'div',
  ...rest
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section';
} & Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'transition' | 'children'>) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const MotionTag = motion[as] as typeof motion.div;

  if (!mounted) {
    const Tag = as as 'div';
    return (
      <Tag className={className} {...(rest as Record<string, unknown>)}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
