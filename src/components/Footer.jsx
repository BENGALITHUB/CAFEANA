import { assetUrl } from '../services/assetUrl';
import React from 'react';
import { UtensilsCrossed, Instagram, Facebook, Twitter, Youtube, Clock, ArrowUp } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function Footer() {
  const { content } = useSiteContent();
  const footer = content?.footer || {};
  const contact = content?.contact || {};
  const header = content?.header || {};

  if (footer.visible === false) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const customLogo = footer.logoImage || content?.branding?.logoImage || header.logoImage;

  const navLinks = footer.navLinks || header.navLinks || [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const hoursList = footer.hoursList || [
    { id: 'hr-1', days: 'Monday – Thursday', hours: contact.hoursWeekday || '11:00 AM – 11:00 PM' },
    { id: 'hr-2', days: 'Friday – Saturday', hours: contact.hoursWeekend || '11:00 AM – 12:30 AM' },
    { id: 'hr-3', days: 'Sunday', hours: contact.hoursSunday || '10:30 AM – 11:30 PM' }
  ];

  const fourthCol = footer.fourthColumn || {
    enabled: true,
    title: footer.promiseTitle || 'The Promise',
    text: footer.promiseText || '“A Little Escape. A Lot of Flavour.” We craft every cup of coffee and every recipe with genuine devotion to culinary art and guest serenity.',
    tagline: footer.tagline || 'Snap. Sip. Savour. Repeat.'
  };
  const isFourthColActive = fourthCol.enabled !== false;
  const customColumns = footer.customColumns || [];
  const totalColumns = 3 + (isFourthColActive ? 1 : 0) + customColumns.length;

  const socialList = [
    { icon: Instagram, label: 'Instagram', href: contact.socialLinks?.instagram || '#instagram' },
    { icon: Facebook, label: 'Facebook', href: contact.socialLinks?.facebook || '#facebook' },
    { icon: Twitter, label: 'Twitter', href: contact.socialLinks?.twitter || '#twitter' },
    { icon: Youtube, label: 'YouTube', href: contact.socialLinks?.youtube || '#youtube' },
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-deep-burgundy)',
        backgroundImage: 'radial-gradient(circle at 50% 0%, var(--color-primary-burgundy) 0%, var(--color-deep-burgundy) 70%, var(--color-espresso) 100%)',
        borderTop: '1px solid rgba(198, 163, 106, 0.25)',
        color: 'var(--color-warm-cream)',
        paddingTop: '6rem',
        paddingBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Top Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '240px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--color-champagne-gold), transparent)'
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${totalColumns >= 4 ? '210px' : '260px'}, 1fr))`,
            gap: '3.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.25rem' }}>
              {customLogo ? (
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-champagne-gold)',
                    overflow: 'hidden',
                    background: 'rgba(33, 24, 23, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={assetUrl(customLogo)}
                    alt={footer.brandName || 'Brand Logo'}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-champagne-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-champagne-gold)',
                    background: 'rgba(33, 24, 23, 0.4)',
                    flexShrink: 0
                  }}
                >
                  <UtensilsCrossed size={20} strokeWidth={1.8} />
                </div>
              )}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                    display: 'block',
                    lineHeight: 1
                  }}
                >
                  {footer.brandName || 'CAFEANA'}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.28em',
                    color: 'var(--color-champagne-gold)',
                    textTransform: 'uppercase'
                  }}
                >
                  {footer.brandSubtitle || 'Restaurant & Café'}
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--color-soft-beige)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.8rem' }}>
              {footer.brandDescription || 'Where global flavours meet comfort, quality, and good vibes. Every dish is prepared with care, passion, and meticulous hygiene.'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialList.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(198, 163, 106, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-champagne-gold)',
                    background: 'rgba(33, 24, 23, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-burgundy)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(198, 163, 106, 0.35)';
                    e.currentTarget.style.backgroundColor = 'rgba(33, 24, 23, 0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                letterSpacing: '0.08em',
                color: 'var(--color-champagne-gold)',
                marginBottom: '1.5rem',
                position: 'relative'
              }}
            >
              {footer.navigationTitle || 'Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {navLinks.map((item) => (
                <li key={item.id || item.name}>
                  <a
                    href={item.href}
                    style={{
                      color: 'var(--color-soft-beige)',
                      fontSize: '0.92rem',
                      transition: 'color 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-champagne-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-soft-beige)')}
                  >
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-champagne-gold)' }}>♦</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dining / Opening Hours */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                letterSpacing: '0.08em',
                color: 'var(--color-champagne-gold)',
                marginBottom: '1.5rem'
              }}
            >
              {footer.hoursTitle || 'Opening Hours'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {hoursList.map((slot) => (
                <li key={slot.id || slot.days} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Clock size={16} color="var(--color-champagne-gold)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-warm-cream)', fontSize: '0.9rem' }}>{slot.days}</strong>
                    <span style={{ color: 'var(--color-soft-beige)', fontSize: '0.85rem' }}>{slot.hours}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Configurable 4th Column */}
          {isFourthColActive && (
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  letterSpacing: '0.08em',
                  color: 'var(--color-champagne-gold)',
                  marginBottom: '1.5rem'
                }}
              >
                {fourthCol.title || footer.promiseTitle || 'The Promise'}
              </h4>
              {fourthCol.text && (
                <p style={{ color: 'var(--color-soft-beige)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  {fourthCol.text}
                </p>
              )}
              {fourthCol.tagline && (
                <div
                  style={{
                    padding: '0.8rem 1.2rem',
                    background: 'rgba(33, 24, 23, 0.45)',
                    border: '1px solid rgba(198, 163, 106, 0.25)',
                    borderRadius: '2px',
                    textAlign: 'center'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      letterSpacing: '0.12em',
                      color: 'var(--color-champagne-gold)',
                      fontStyle: 'italic',
                      display: 'block'
                    }}
                  >
                    {fourthCol.tagline}
                  </span>
                </div>
              )}
              {fourthCol.ctaText && (
                <a
                  href={fourthCol.ctaLink || '#contact'}
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    background: 'var(--color-primary-burgundy)',
                    color: 'var(--color-warm-cream)',
                    border: '1px solid var(--color-champagne-gold)',
                    borderRadius: '2px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {fourthCol.ctaText}
                </a>
              )}
            </div>
          )}

          {/* Additional Dynamic Custom Columns (Column 5, 6, etc.) */}
          {customColumns.map((col) => (
            <div key={col.id}>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  letterSpacing: '0.08em',
                  color: 'var(--color-champagne-gold)',
                  marginBottom: '1.5rem'
                }}
              >
                {col.title || 'Untitled Column'}
              </h4>
              {col.text && (
                <p style={{ color: 'var(--color-soft-beige)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                  {col.text}
                </p>
              )}
              {col.tagline && (
                <div
                  style={{
                    padding: '0.8rem 1.2rem',
                    background: 'rgba(33, 24, 23, 0.45)',
                    border: '1px solid rgba(198, 163, 106, 0.25)',
                    borderRadius: '2px',
                    textAlign: 'center',
                    marginBottom: col.ctaText ? '1rem' : 0
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.15rem',
                      letterSpacing: '0.12em',
                      color: 'var(--color-champagne-gold)',
                      fontStyle: 'italic',
                      display: 'block'
                    }}
                  >
                    {col.tagline}
                  </span>
                </div>
              )}
              {col.ctaText && (
                <a
                  href={col.ctaLink || '#'}
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'var(--color-primary-burgundy)',
                    color: 'var(--color-warm-cream)',
                    border: '1px solid var(--color-champagne-gold)',
                    borderRadius: '2px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {col.ctaText}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(198, 163, 106, 0.2)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'var(--color-soft-beige)', margin: 0 }}>
            &copy; {new Date().getFullYear()} {footer.copyright || 'CAFEANA Restaurant & Café. All rights reserved.'}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                color: 'var(--color-champagne-gold)',
                textTransform: 'uppercase'
              }}
            >
              Crafted For Connoisseurs
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-champagne-gold)',
                background: 'rgba(33, 24, 23, 0.6)',
                color: 'var(--color-champagne-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.25s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
