import { assetUrl } from '../services/assetUrl';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useSiteContent } from '../context/SiteContentContext';

export default function Gallery({ onSelectImage }) {
  const { content } = useSiteContent();
  const gallery = content?.gallery || {};

  const [filter, setFilter] = useState('All');

  if (gallery.visible === false) return null;

  const items = (gallery.items || []).filter((item) => item.visible !== false);

  // Collect unique categories present in items
  const uniqueCats = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
  const categories = ['All', ...uniqueCats];

  const filteredItems = items.filter(
    (item) => filter === 'All' || item.category === filter
  );

  return (
    <section id="gallery" className="section section-espresso" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badge={gallery.badge || 'VISUAL DIARY'}
          title={gallery.title || 'Moments Captured at Cafeana.'}
          description={gallery.description || 'Every plate served, every espresso pulled, and every evening shared becomes part of our living tapestry. Explore our curated photography.'}
          align="center"
        />

        {/* Category Filters */}
        {categories.length > 1 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.65rem',
              marginBottom: '3.5rem'
            }}
          >
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.55rem 1.4rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    border: isActive
                      ? '1px solid var(--color-champagne-gold)'
                      : '1px solid rgba(198, 163, 106, 0.2)',
                    backgroundColor: isActive
                      ? 'var(--color-primary-burgundy)'
                      : 'rgba(33, 24, 23, 0.45)',
                    color: isActive ? 'var(--color-warm-cream)' : 'var(--color-soft-beige)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Gallery Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="gallery-item clickable"
                onClick={() => onSelectImage && onSelectImage(item)}
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(198, 163, 106, 0.2)'
                }}
              >
                <img
                  src={assetUrl(item.image)}
                  alt={item.title || 'Cafeana Visual'}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Dark Vignette Overlay on Hover */}
                <div
                  className="gallery-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(33, 24, 23, 0.2) 0%, rgba(59, 16, 31, 0.85) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    opacity: 0,
                    transition: 'opacity 0.35s ease',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(33, 24, 23, 0.8)',
                        border: '1px solid var(--color-champagne-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-champagne-gold)'
                      }}
                    >
                      <Eye size={18} />
                    </div>
                  </div>

                  <div>
                    {item.category && (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'var(--color-champagne-gold)',
                          display: 'block',
                          marginBottom: '0.25rem'
                        }}
                      >
                        {item.category}
                      </span>
                    )}
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        color: 'var(--color-warm-cream)',
                        margin: 0
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
