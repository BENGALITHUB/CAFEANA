import React from 'react';

export default function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  light = false,
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`section-heading-wrap ${className}`}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        maxWidth: isCenter ? '820px' : '720px',
        margin: isCenter ? '0 auto 4rem auto' : '0 0 3.5rem 0'
      }}
    >
      {badge && (
        <div style={{ display: 'flex', justifyContent: isCenter ? 'center' : 'flex-start' }}>
          <span className="tagline-badge">
            <span className="gold-diamond"></span>
            {badge}
            <span className="gold-diamond"></span>
          </span>
        </div>
      )}

      {title && (
        <h2
          style={{
            fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.15,
            fontWeight: 500,
            color: light ? 'var(--color-espresso)' : 'var(--color-warm-cream)',
            letterSpacing: '-0.015em',
            marginBottom: '1.25rem'
          }}
        >
          {title}
        </h2>
      )}

      {/* Decorative Gold Line */}
      <div
        className="gold-divider"
        style={{
          margin: isCenter ? '1.2rem auto' : '1.2rem 0',
          justifyContent: isCenter ? 'center' : 'flex-start'
        }}
      >
        <span className="gold-diamond"></span>
      </div>

      {description && (
        <p
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
            color: light ? 'var(--text-secondary-dark)' : 'var(--text-secondary-light)',
            lineHeight: 1.75,
            maxWidth: '680px',
            margin: isCenter ? '0 auto' : '0'
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
