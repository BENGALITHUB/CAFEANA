import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, ArrowRight } from 'lucide-react';
import Button from './Button';
import { useSiteContent } from '../context/SiteContentContext';

export default function Navbar({ inPreview = false }) {
  const { content } = useSiteContent();
  const header = content?.header || {};

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = header.navLinks || [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'menu', 'experience', 'gallery', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (header.visible === false) return null;

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''} ${inPreview ? 'in-preview' : ''}`}
        style={
          inPreview
            ? { position: 'sticky', top: 0, left: 0, right: 0, width: '100%', zIndex: 50 }
            : !header.isSticky
            ? { position: 'absolute' }
            : {}
        }
      >
        <div className="navbar-container">
          {/* Brand Logo */}
          <a href="#home" className="brand-logo" onClick={(e) => handleLinkClick(e, '#home')}>
            {header.logoImage || content?.branding?.logoImage ? (
              <div className="brand-icon-wrap" style={{ padding: '2px', background: 'rgba(33, 24, 23, 0.6)' }}>
                <img
                  src={header.logoImage || content?.branding?.logoImage}
                  alt={header.brandName || 'Brand Logo'}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }}
                />
              </div>
            ) : (
              <div className="brand-icon-wrap">
                <UtensilsCrossed size={20} strokeWidth={1.8} />
              </div>
            )}
            <div className="brand-title-wrap">
              <span className="brand-name">{header.brandName || 'CAFEANA'}</span>
              <span className="brand-subtitle">{header.brandSubtitle || 'Restaurant & Café'}</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links-desktop">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.id || link.name}>
                    <a
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA */}
          <div className="nav-actions">
            <a
              href={header.ctaLink || '#menu'}
              className="nav-cta-btn"
              onClick={(e) => handleLinkClick(e, header.ctaLink || '#menu')}
            >
              {header.ctaText || 'Explore Menu'}
              <ArrowRight size={15} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" style={{ display: 'flex' }}>
          <ul className="mobile-drawer-links">
            {navLinks.map((link) => (
              <li key={link.id || link.name}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <Button
            href={header.ctaLink || '#menu'}
            variant="primary"
            size="md"
            icon={ArrowRight}
            onClick={(e) => handleLinkClick(e, header.ctaLink || '#menu')}
          >
            {header.ctaText || 'Explore Menu'}
          </Button>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-champagne-gold)',
              marginTop: '3rem'
            }}
          >
            Snap • Sip • Savour • Repeat
          </p>
        </div>
      )}
    </>
  );
}
