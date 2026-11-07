import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';

/**
 * Hook for GSAP ScrollTrigger clip-path and parallax reveals
 * @param {Object} options Configuration options
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Clip-path reveal animation for image containers
      const clipElements = el.querySelectorAll('.gsap-clip-reveal');
      clipElements.forEach((clipEl) => {
        gsap.fromTo(
          clipEl,
          { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: clipEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 2. Parallax vertical scroll movement
      const parallaxElements = el.querySelectorAll('.gsap-parallax');
      parallaxElements.forEach((parEl) => {
        const speed = parseFloat(parEl.getAttribute('data-speed')) || 0.15;
        gsap.fromTo(
          parEl,
          { y: -30 * speed },
          {
            y: 40 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: parEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // 3. Staggered fade and slide for child cards
      const staggerContainers = el.querySelectorAll('.gsap-stagger-container');
      staggerContainers.forEach((container) => {
        const items = container.querySelectorAll('.gsap-stagger-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }, ref);

    return () => ctx.revert();
  }, [options]);

  return ref;
}

export default useScrollAnimation;
