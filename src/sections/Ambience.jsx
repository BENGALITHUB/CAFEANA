import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Users, Moon, Palette } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useSiteContent } from '../context/SiteContentContext';

export default function Ambience({ onSelectImage }) {
  const { content } = useSiteContent();
  const ambience = content?.ambience || {};
  const sectionRef = useScrollAnimation();

  const [selectedIdx, setSelectedIdx] = useState(0);

  if (ambience.visible === false) return null;

  const moments = (ambience.moments || []).filter((m) => m.visible !== false);
  if (moments.length === 0) return null;

  const icons = [Moon, Coffee, Users, Palette];
  const safeIdx = selectedIdx < moments.length ? selectedIdx : 0;
  const currentMoment = moments[safeIdx];

  return (
    <section ref={sectionRef} className="section section-cream" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badge={ambience.badge || 'THE CAFEANA ATMOSPHERE'}
          title={ambience.title || 'Good Food. Great Company. Beautiful Moments.'}
          description={ambience.description || 'Designed as a tranquil sanctuary where time slows down. Immerse yourself in warm amber lighting, plush seating, and an ambience that celebrates genuine human connection.'}
          align="center"
          light
        />

        {/* Feature Interactive Ambience Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4.5rem'
          }}
        >
          {/* Main Visual Display */}
          {currentMoment && (
            <motion.div
              key={currentMoment.id || safeIdx}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 25px 55px rgba(33, 24, 23, 0.22)',
                border: '1px solid rgba(101, 30, 50, 0.15)',
                cursor: 'pointer'
              }}
              onClick={() => onSelectImage && onSelectImage(currentMoment)}
            >
              <div style={{ height: '440px', width: '100%' }}>
                <img
                  src={currentMoment.image}
                  alt={currentMoment.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(33, 24, 23, 0.85) 100%)'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem',
                  color: 'var(--color-warm-cream)'
                }}
              >
                {currentMoment.tag && (
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--color-champagne-gold)',
                      display: 'block',
                      marginBottom: '0.4rem'
                    }}
                  >
                    {currentMoment.tag}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.9rem',
                    marginBottom: '0.6rem',
                    color: 'var(--color-warm-cream)'
                  }}
                >
                  {currentMoment.title}
                </h3>
                {currentMoment.description && (
                  <p style={{ color: 'var(--color-soft-beige)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
                    {currentMoment.description}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Interactive Selector Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {moments.map((moment, idx) => {
              const isSelected = safeIdx === idx;
              const Icon = icons[idx % icons.length] || Coffee;

              return (
                <div
                  key={moment.id || idx}
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    padding: '1.4rem 1.6rem',
                    borderRadius: '4px',
                    border: isSelected
                      ? '1px solid var(--color-primary-burgundy)'
                      : '1px solid rgba(101, 30, 50, 0.12)',
                    backgroundColor: isSelected
                      ? 'var(--color-primary-burgundy)'
                      : 'rgba(232, 216, 197, 0.35)',
                    color: isSelected ? 'var(--color-warm-cream)' : 'var(--color-espresso)',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    boxShadow: isSelected ? '0 10px 25px rgba(101, 30, 50, 0.25)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(232, 216, 197, 0.65)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'rgba(232, 216, 197, 0.35)';
                    }
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(101, 30, 50, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isSelected ? 'var(--color-champagne-gold)' : 'var(--color-primary-burgundy)'
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: isSelected ? 'var(--color-warm-cream)' : 'var(--color-espresso)',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {moment.title}
                    </h4>
                    {moment.tag && (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: isSelected ? 'var(--color-champagne-gold)' : 'var(--text-muted-dark)'
                        }}
                      >
                        {moment.tag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
