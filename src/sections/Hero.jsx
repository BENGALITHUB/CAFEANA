import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import { useSiteContent } from '../context/SiteContentContext';

export default function Hero() {
  const { content } = useSiteContent();
  const hero = content?.hero || {};

  if (hero.visible === false) return null;

  const line1 = hero.headlineLine1 || 'A Little Escape.';
  const line2 = hero.headlineLine2 || 'A Lot of Flavour.';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleScrollTo = (targetId) => {
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const overlayOpacity = typeof hero.overlayOpacity === 'number' ? hero.overlayOpacity : 0.88;

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '6rem',
        paddingBottom: '4rem'
      }}
    >
      {/* Background Image with Cinematic Ken Burns Zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <img
          src={hero.bgImage || '/images/hero-bg.jpg'}
          alt="Cafeana Ambience"
          className="hero-zoom-bg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transformOrigin: 'center center'
          }}
        />

        {/* Cinematic Deep Burgundy / Espresso Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, var(--color-espresso-95) 0%, var(--color-burgundy-90) 50%, var(--color-espresso-95) 100%)',
            opacity: overlayOpacity
          }}
        />

        {/* Ambient Warm Golden Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 30%, rgba(33, 24, 23, 0.7) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Floating Decorative Coffee Beans / Ambient Particles */}
      <div
        className="floating-element-1"
        style={{
          position: 'absolute',
          top: '22%',
          left: '8%',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.4
        }}
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="6" transform="rotate(-30 12 12)" stroke="#C6A36A" strokeWidth="1.2" fill="rgba(101,30,50,0.3)" />
          <path d="M7 14 C10 11, 14 13, 17 10" stroke="#C6A36A" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="floating-element-2"
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '10%',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.35
        }}
      >
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="7" transform="rotate(40 12 12)" stroke="#C6A36A" strokeWidth="1.2" fill="rgba(101,30,50,0.3)" />
          <path d="M6 10 C9 13, 15 11, 18 14" stroke="#C6A36A" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      <div
        className="floating-element-1"
        style={{
          position: 'absolute',
          top: '35%',
          right: '15%',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.25
        }}
      >
        <Sparkles size={28} color="#C6A36A" />
      </div>

      {/* Main Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: hero.textAlignment || 'center' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '960px', margin: hero.textAlignment === 'left' ? '0' : '0 auto' }}
        >
          {/* Small Label */}
          {hero.badge && (
            <motion.div variants={itemVariants} style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
              <span className="tagline-badge">
                <span className="gold-diamond"></span>
                {hero.badge}
                <span className="gold-diamond"></span>
              </span>
            </motion.div>
          )}

          {/* Main Headline (Reveals line by line) */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
              lineHeight: 1.08,
              fontWeight: 500,
              color: 'var(--color-warm-cream)',
              letterSpacing: '-0.02em',
              marginBottom: '1.8rem',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ display: 'block' }}>{line1}</span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                color: 'var(--color-champagne-gold)',
                fontWeight: 400
              }}
            >
              {line2}
            </span>
          </motion.h1>

          {/* Subtle Decorative Divider */}
          <motion.div variants={itemVariants} className="gold-divider" style={{ margin: '1.2rem auto 1.8rem auto' }}>
            <span className="gold-diamond"></span>
          </motion.div>

          {/* Description */}
          {hero.description && (
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                color: 'var(--color-soft-beige)',
                maxWidth: '660px',
                margin: '0 auto 2.8rem auto',
                lineHeight: 1.7,
                fontWeight: 300
              }}
            >
              {hero.description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: hero.textAlignment === 'left' ? 'flex-start' : 'center',
              gap: '1.25rem',
              marginBottom: '3.5rem'
            }}
          >
            {hero.ctaPrimaryText && (
              <Button
                href={hero.ctaPrimaryLink || '#menu'}
                variant="primary"
                size="lg"
                icon={ArrowRight}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(hero.ctaPrimaryLink || '#menu');
                }}
              >
                {hero.ctaPrimaryText}
              </Button>
            )}

            {hero.ctaSecondaryText && (
              <Button
                href={hero.ctaSecondaryLink || '#about'}
                variant="outline"
                size="lg"
                icon={Compass}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(hero.ctaSecondaryLink || '#about');
                }}
              >
                {hero.ctaSecondaryText}
              </Button>
            )}
          </motion.div>

          {/* Brand Signature */}
          {hero.brandSignature && (
            <motion.div variants={itemVariants}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'var(--color-champagne-gold)',
                  display: 'inline-block',
                  borderTop: '1px solid rgba(198, 163, 106, 0.3)',
                  paddingTop: '1.2rem',
                  paddingLeft: '1.5rem',
                  paddingRight: '1.5rem'
                }}
              >
                {hero.brandSignature}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Perfectly Centered Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.8rem',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
          onClick={() => handleScrollTo('#about')}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-soft-beige)',
              opacity: 0.8
            }}
          >
            Scroll to Discover
          </span>
          <div
            style={{
              width: '24px',
              height: '38px',
              borderRadius: '16px',
              border: '1px solid rgba(198, 163, 106, 0.45)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px'
            }}
          >
            <div
              className="scroll-indicator-wheel"
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                backgroundColor: 'var(--color-champagne-gold)'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
