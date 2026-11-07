import { gsap, ScrollTrigger } from './gsapConfig';

/**
 * Initializes global scroll animations across registered sections
 */
export function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Reveal clip-path images
  const clipImages = document.querySelectorAll('.img-reveal-clip');
  clipImages.forEach((img) => {
    gsap.fromTo(
      img,
      { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
      {
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        duration: 1.3,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  // Footer reveal animation
  const footer = document.querySelector('footer');
  if (footer) {
    gsap.fromTo(
      footer,
      { opacity: 0.8, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%'
        }
      }
    );
  }
}
