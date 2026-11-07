import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Coffee } from 'lucide-react';
import Button from '../components/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useSiteContent } from '../context/SiteContentContext';

export default function About() {
  const { content } = useSiteContent();
  const about = content?.about || {};
  const sectionRef = useScrollAnimation();

  if (about.visible === false) return null;

  const defaultHallmarks = [
    {
      id: 'h1',
      icon: Sparkles,
      title: 'Global Harmony',
      desc: 'Authentic Thai, Chinese, Continental, and Indian flavours side-by-side.'
    },
    {
      id: 'h2',
      icon: ShieldCheck,
      title: 'Obsessive Hygiene',
      desc: 'Pristine kitchen standards, fresh sourcing, and uncompromised care.'
    },
    {
      id: 'h3',
      icon: Coffee,
      title: 'Comfort & Vibe',
      desc: 'Warm lighting, relaxed seating, and a space made for unforgettable conversations.'
    }
  ];

  const icons = [Sparkles, ShieldCheck, Coffee];
  const hallmarks = (about.hallmarks || defaultHallmarks).map((h, i) => ({
    ...h,
    icon: icons[i % icons.length] || Sparkles
  }));

  return (
    <section ref={sectionRef} id="about" className="section section-cream" style={{ position: 'relative' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4.5rem',
            alignItems: 'center'
          }}
        >
          {/* Asymmetrical Image Composition with Parallax & Clip Reveal */}
          <div style={{ position: 'relative' }}>
            {/* Primary Large Interior Photograph */}
            <div
              className="gsap-clip-reveal"
              style={{
                position: 'relative',
                width: '88%',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(33, 24, 23, 0.18)',
                border: '1px solid rgba(101, 30, 50, 0.12)'
              }}
            >
              <img
                src={about.mainImage || '/images/about-interior.jpg'}
                alt="Cafeana Warm Interior Ambience"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(33, 24, 23, 0.45) 100%)'
                }}
              />
            </div>

            {/* Overlapping Secondary Food Photography with Parallax */}
            <div
              className="gsap-parallax"
              data-speed="0.25"
              style={{
                position: 'absolute',
                bottom: '-2.5rem',
                right: '0',
                width: '58%',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(33, 24, 23, 0.28)',
                border: '4px solid var(--color-warm-cream)',
                zIndex: 3
              }}
            >
              <img
                src={about.secondaryImage || '/images/about-food.jpg'}
                alt="Artisan Culinary Plating at Cafeana"
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Heritage Badge Pill */}
            <div
              style={{
                position: 'absolute',
                top: '-1.5rem',
                left: '-1rem',
                background: 'var(--color-primary-burgundy)',
                color: 'var(--color-warm-cream)',
                padding: '0.8rem 1.4rem',
                borderRadius: '2px',
                border: '1px solid var(--color-champagne-gold)',
                boxShadow: '0 10px 25px rgba(101, 30, 50, 0.35)',
                zIndex: 5
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  letterSpacing: '0.15em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Heart size={14} fill="#C6A36A" stroke="#C6A36A" />
                {about.sealText || 'Crafted With Devotion'}
              </span>
            </div>
          </div>

          {/* Editorial Brand Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {about.badge && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="tagline-badge">
                  <span className="gold-diamond"></span>
                  {about.badge}
                  <span className="gold-diamond"></span>
                </span>
              </div>
            )}

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                lineHeight: 1.15,
                fontWeight: 500,
                color: 'var(--color-espresso)',
                letterSpacing: '-0.015em',
                marginBottom: '1.5rem'
              }}
            >
              {about.title || 'More Than Just a Café.'}
            </h2>

            {/* Highlight Lead Quote */}
            {about.quote && (
              <p
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-primary-burgundy)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  borderLeft: '2px solid var(--color-champagne-gold)',
                  paddingLeft: '1.25rem'
                }}
              >
                {about.quote}
              </p>
            )}

            {about.description && (
              <p style={{ color: 'var(--text-secondary-dark)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {about.description}
              </p>
            )}

            {/* Hallmarks Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(101, 30, 50, 0.15)'
              }}
            >
              {hallmarks.map(({ icon: Icon, title, desc }) => (
                <div key={title}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(101, 30, 50, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                      color: 'var(--color-primary-burgundy)'
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.18rem',
                      color: 'var(--color-espresso)',
                      marginBottom: '0.35rem',
                      fontWeight: 600
                    }}
                  >
                    {title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted-dark)', lineHeight: 1.5 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            <Button
              href={about.ctaLink || '#menu'}
              variant="cream"
              size="md"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(about.ctaLink || '#menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {about.ctaText || 'Explore Our Menu'}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
