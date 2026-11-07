import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useSiteContent } from '../context/SiteContentContext';

export default function SignatureDishes({ onSelectImage }) {
  const { content } = useSiteContent();
  const sig = content?.signatureDishes || {};
  const sectionRef = useScrollAnimation();

  if (sig.visible === false) return null;

  const items = (sig.items || []).filter((item) => item.visible !== false);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section section-burgundy"
      style={{
        position: 'relative',
        background: 'radial-gradient(circle at 50% 30%, var(--color-primary-burgundy) 0%, var(--color-deep-burgundy) 65%, var(--color-espresso) 100%)'
      }}
    >
      <div className="container">
        <SectionHeading
          badge={sig.badge || 'THE ART OF GASTRONOMY'}
          title={sig.title || 'Crafted with Care. Served with Love.'}
          description={sig.description || 'Every signature creation at Cafeana is an ode to culinary mastery. Prepared with patience, pristine ingredients, and an unwavering commitment to flavour perfection.'}
          align="center"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {items.map((item, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={item.id || index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '4.5rem',
                  alignItems: 'center',
                  direction: isEven ? 'rtl' : 'ltr'
                }}
              >
                {/* Image Showcase Frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    direction: 'ltr',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectImage && onSelectImage(item)}
                >
                  <div
                    className="luxury-card"
                    style={{
                      position: 'relative',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      padding: '8px',
                      background: 'rgba(33, 24, 23, 0.45)',
                      border: '1px solid rgba(198, 163, 106, 0.3)'
                    }}
                  >
                    <div
                      className="img-cover-wrap"
                      style={{
                        height: '420px',
                        width: '100%',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, transparent 50%, rgba(33, 24, 23, 0.6) 100%)'
                        }}
                      />
                    </div>

                    {/* Corner Gold Flourishes */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        width: '16px',
                        height: '16px',
                        borderTop: '2px solid var(--color-champagne-gold)',
                        borderLeft: '2px solid var(--color-champagne-gold)',
                        pointerEvents: 'none'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        width: '16px',
                        height: '16px',
                        borderBottom: '2px solid var(--color-champagne-gold)',
                        borderRight: '2px solid var(--color-champagne-gold)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>

                  {/* Accent Badge floating */}
                  {item.accent && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-1rem',
                        left: isEven ? 'auto' : '2rem',
                        right: isEven ? '2rem' : 'auto',
                        background: 'var(--color-espresso)',
                        border: '1px solid var(--color-champagne-gold)',
                        padding: '0.6rem 1.4rem',
                        borderRadius: '2px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                        zIndex: 3
                      }}
                    >
                      <Award size={16} color="var(--color-champagne-gold)" />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--color-champagne-gold)',
                          fontWeight: 600
                        }}
                      >
                        {item.accent}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Editorial Content Column */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ direction: 'ltr' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        color: 'var(--color-champagne-gold)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      0{index + 1} / 0{items.length}
                    </span>
                    <span style={{ color: 'rgba(198, 163, 106, 0.4)' }}>•</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-soft-beige)'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                      color: 'var(--color-warm-cream)',
                      marginBottom: '1.25rem',
                      lineHeight: 1.15
                    }}
                  >
                    {item.title}
                  </h3>

                  {item.quote && (
                    <p
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontStyle: 'italic',
                        fontSize: '1.15rem',
                        color: 'var(--color-champagne-gold)',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem'
                      }}
                    >
                      {item.quote}
                    </p>
                  )}

                  {item.description && (
                    <p
                      style={{
                        fontSize: '1rem',
                        color: 'var(--color-soft-beige)',
                        lineHeight: 1.8,
                        marginBottom: '2rem'
                      }}
                    >
                      {item.description}
                    </p>
                  )}

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--color-champagne-gold)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                    onClick={() => onSelectImage && onSelectImage(item)}
                  >
                    <Sparkles size={16} />
                    <span>View Craft Details</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
