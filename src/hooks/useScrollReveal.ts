import { useEffect } from 'react';

/**
 * High-performance hook that attaches an IntersectionObserver to all elements
 * matching selector (defaults to '[data-reveal]') and adds the 'is-revealed' class
 * once they enter the viewport.
 * Automatically unobserves elements once revealed to save CPU/GPU cycles.
 */
export function useScrollReveal(dependency?: unknown) {
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const revealElement = (el: Element) => {
      el.classList.add('is-revealed');
    };

    // Immediately check already visible elements
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        revealElement(el);
      }
    });

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.05,
    });

    elements.forEach((el) => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });

    // Safety fallback: reveal all elements after a short timeout so nothing remains hidden
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
        revealElement(el);
      });
    }, 1200);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [dependency]);
}
