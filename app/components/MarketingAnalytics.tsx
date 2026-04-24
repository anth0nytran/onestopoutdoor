'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

function getPathFromHref(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin ? `${url.pathname}${url.hash}` : url.hostname;
  } catch {
    return href.slice(0, 120);
  }
}

function getLinkEvent(anchor: HTMLAnchorElement) {
  const href = anchor.href || anchor.getAttribute('href') || '';
  const label = anchor.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) || anchor.getAttribute('aria-label') || 'Unlabeled';

  if (href.startsWith('tel:')) {
    return {
      name: 'Phone CTA Clicked',
      properties: {
        placement: anchor.closest('header') ? 'header' : anchor.closest('footer') ? 'footer' : 'page',
        path: window.location.pathname,
      },
    };
  }

  if (href.includes('/contact')) {
    return {
      name: 'Estimate CTA Clicked',
      properties: {
        label,
        target: getPathFromHref(href),
        path: window.location.pathname,
      },
    };
  }

  if (anchor.target === '_blank') {
    return {
      name: 'External Link Clicked',
      properties: {
        label,
        target: getPathFromHref(href),
        path: window.location.pathname,
      },
    };
  }

  return null;
}

export function MarketingAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const linkEvent = getLinkEvent(anchor);
      if (!linkEvent) return;

      track(linkEvent.name, linkEvent.properties);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
