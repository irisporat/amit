'use client';

import { useEffect } from 'react';

/**
 * Handles smooth scrolling to a section anchor when navigating
 * from another page (e.g. /coffee → /#about).
 */
export default function ScrollToSection() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Retry once after a short delay (sections may still be rendering)
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
