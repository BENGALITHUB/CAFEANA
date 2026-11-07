import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useSiteContent } from '../context/SiteContentContext';

export default function Menu({ onSelectImage }) {
  const { content } = useSiteContent();
  const menu = content?.menu || {};

  if (menu.visible === false) return null;

  const categories = (menu.categories || []).filter((cat) => cat.visible !== false);

  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedCatId, setExpandedCatId] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'Complete Repertoire' },
    { id: 'kitchen', label: 'Main Kitchen' },
    { id: 'beverages', label: 'Coffee & Mocktails' },
    { id: 'desserts', label: 'Sweet Artistry' },
  ];

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'kitchen') return ['thai', 'chinese', 'continental', 'indian'].includes(cat.id);
    if (activeFilter === 'beverages') return ['coffee', 'mocktails'].includes(cat.id);
    if (activeFilter === 'desserts') return cat.id === 'desserts';
    return true;
  });

  const toggleExpand = (e, catId) => {
    e.stopPropagation();
    setExpandedCatId(expandedCatId === catId ? null : catId);
  };

  return (
    <section id="menu" className="section section-espresso" style={{ position: 'relative' }}>
      {/* Background ambient gradient */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(101, 30, 50, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading
          badge={menu.badge || 'CULINARY REPERTOIRE'}
          title={menu.title || 'A World of Flavours, Under One Roof.'}
          description={menu.description || 'From fragrant Asian woks and simmering copper handis to refined European gastronomy, handcrafted coffees, and vibrant mocktails — embark on an unforgettable culinary escape.'}
          align="center"
        />

        {/* Filter Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3.5rem'
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '0.65rem 1.6rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  border: isActive
                    ? '1px solid var(--color-champagne-gold)'
                    : '1px solid rgba(198, 163, 106, 0.25)',
                  backgroundColor: isActive
                    ? 'var(--color-primary-burgundy)'
                    : 'rgba(33, 24, 23, 0.5)',
                  color: isActive ? 'var(--color-warm-cream)' : 'var(--color-soft-beige)',
                  boxShadow: isActive ? '0 4px 18px rgba(101, 30, 50, 0.5)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                    e.currentTarget.style.color = 'var(--color-champagne-gold)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(198, 163, 106, 0.25)';
                    e.currentTarget.style.color = 'var(--color-soft-beige)';
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {filteredCategories.map((cat, idx) => {
            const hasItems = Array.isArray(cat.items) && cat.items.length > 0;
            const isExpanded = expandedCatId === cat.id;

            return (
              <motion.div
                layout
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="luxury-card menu-card clickable"
                onClick={() => onSelectImage && onSelectImage(cat)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                {/* Card Image Wrap */}
                <div
                  className="img-cover-wrap"
                  style={{
                    height: '240px',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Vignette Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(33, 24, 23, 0.85) 100%)'
                    }}
                  />

                  {/* Tag pill */}
                  {cat.tag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(59, 16, 31, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(198, 163, 106, 0.35)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '2px',
                        fontSize: '0.72rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-champagne-gold)',
                        fontWeight: 500
                      }}
                    >
                      {cat.tag}
                    </div>
                  )}

                  {/* Open Lightbox icon hint */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(33, 24, 23, 0.7)',
                      border: '1px solid rgba(198, 163, 106, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-champagne-gold)'
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '1.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    background: 'linear-gradient(180deg, rgba(59, 16, 31, 0.35) 0%, rgba(33, 24, 23, 0.75) 100%)'
                  }}
                >
                  <div>
                    {cat.subtitle && (
                      <span
                        style={{
                          fontFamily: 'var(--font-editorial)',
                          fontStyle: 'italic',
                          fontSize: '0.9rem',
                          color: 'var(--color-champagne-gold)',
                          display: 'block',
                          marginBottom: '0.4rem'
                        }}
                      >
                        {cat.subtitle}
                      </span>
                    )}

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.8rem',
                        color: 'var(--color-warm-cream)',
                        marginBottom: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      {cat.name}
                    </h3>

                    {cat.description && (
                      <p
                        style={{
                          fontSize: '0.94rem',
                          color: 'var(--color-soft-beige)',
                          lineHeight: 1.65,
                          marginBottom: '1.5rem'
                        }}
                      >
                        {cat.description}
                      </p>
                    )}
                  </div>

                  {/* Highlights tags */}
                  <div>
                    {Array.isArray(cat.highlights) && cat.highlights.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.45rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid rgba(198, 163, 106, 0.15)'
                        }}
                      >
                        {cat.highlights.map((item) => (
                          <span
                            key={item}
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.72rem',
                              letterSpacing: '0.08em',
                              color: 'var(--color-champagne-gold)',
                              background: 'rgba(198, 163, 106, 0.08)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '2px',
                              border: '1px solid rgba(198, 163, 106, 0.18)'
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Optional Dishes list if admin added items */}
                    {hasItems && (
                      <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px dashed rgba(198, 163, 106, 0.2)' }}>
                        <button
                          type="button"
                          onClick={(e) => toggleExpand(e, cat.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            color: 'var(--color-champagne-gold)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            padding: '0.4rem 0'
                          }}
                        >
                          <span>{cat.items.length} Featured Dishes</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isExpanded && (
                          <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {cat.items.map((dish) => (
                              <div
                                key={dish.id || dish.name}
                                style={{
                                  padding: '0.6rem',
                                  background: 'rgba(33, 24, 23, 0.5)',
                                  borderRadius: '2px',
                                  border: '1px solid rgba(198, 163, 106, 0.15)',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <div>
                                  <strong style={{ color: 'var(--color-warm-cream)', fontSize: '0.88rem', display: 'block' }}>
                                    {dish.name}
                                  </strong>
                                  {dish.description && (
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-soft-beige)' }}>
                                      {dish.description}
                                    </span>
                                  )}
                                </div>
                                {dish.price && (
                                  <span style={{ color: 'var(--color-champagne-gold)', fontWeight: 600, fontSize: '0.85rem' }}>
                                    {dish.price}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
