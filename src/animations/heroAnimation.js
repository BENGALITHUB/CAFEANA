import { gsap } from './gsapConfig';

/**
 * Triggers entrance animation for the Hero section once preloader finishes
 * @param {HTMLElement} heroElement Target element
 */
export function animateHeroEntrance(heroElement) {
  if (!heroElement) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    heroElement.querySelectorAll('.hero-headline-line'),
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
  ).fromTo(
    heroElement.querySelectorAll('.hero-fade-item'),
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
    '-=0.5'
  );

  return tl;
}
