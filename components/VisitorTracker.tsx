'use client';

import { useEffect } from 'react';

export function trackCtaClick() {
  try {
    if (typeof window !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', JSON.stringify({ event: 'cta_click' }));
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'cta_click' }),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (err) {
    // Ignore tracking errors
  }
}

export const VisitorTracker: React.FC = () => {
  useEffect(() => {
    // 1. Record Page View on Mount
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'pageview' }),
      }).catch(() => {});
    } catch (err) {
      // Ignore tracking errors
    }

    // 2. Global Event Listener for CTA Button Clicks (e.g. href="#checkout-section")
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const anchor = target.closest('a[href="#checkout-section"]') || target.closest('button[type="submit"]');
        if (anchor) {
          trackCtaClick();
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
};
