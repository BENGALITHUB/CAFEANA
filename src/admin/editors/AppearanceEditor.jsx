import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, Check, Sparkles } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function AppearanceEditor() {
  const { content, updateSection, updateLogo } = useSiteContent();
  const appearance = content?.appearance || {};
  const currentLogo = content?.branding?.logoImage || content?.header?.logoImage || content?.footer?.logoImage || '';
  const [colorWarning, setColorWarning] = useState('');

  const handleLogoChange = (logoUrl) => {
    if (updateLogo) {
      updateLogo(logoUrl);
    } else {
      updateSection('branding', { logoImage: logoUrl, favicon: logoUrl });
      updateSection('header', { logoImage: logoUrl });
      updateSection('footer', { logoImage: logoUrl });
    }
  };

  const handleChange = (field, val) => {
    // Brand guidance check for non-traditional luxury tones
    if (typeof val === 'string' && val.startsWith('#')) {
      const hex = val.replace('#', '');
      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        if (g > 140 && g > r * 1.1 && g > b * 1.1) {
          setColorWarning('Brand Notice: Cafeana luxury brand guidelines recommend staying within burgundy, espresso, champagne-gold, and cream palettes.');
        } else {
          setColorWarning('');
        }
      }
    }
    updateSection('appearance', { [field]: val });
  };

  const handleResetColors = () => {
    updateSection('appearance', {
      primaryBurgundy: '#651E32',
      deepBurgundy: '#3B101F',
      espresso: '#211817',
      warmCream: '#F7F0E7',
      champagneGold: '#C6A36A',
      softBeige: '#E8D8C5'
    });
    setColorWarning('');
  };

  return (
    <div>
      {/* Company Logo & Favicon Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Company Logo &amp; Favicon</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Upload your company logo. Synchronizes across the website Navbar, Footer, and browser Favicon.
            </span>
          </div>
        </div>

        <ImageUploader
          label="Company Logo (PNG, SVG, JPG, WebP, ICO)"
          value={currentLogo}
          originalValue=""
          onChange={handleLogoChange}
          onReset={() => handleLogoChange('')}
        />

        <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.9rem', background: '#FAF7F2', border: '1px solid #D4C3B3', borderRadius: '4px', fontSize: '0.8rem', color: '#4A3A37', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={15} color="#651E32" style={{ flexShrink: 0 }} />
          <span>Transparent PNG or SVG images provide optimal rendering across light &amp; dark themes and browser tabs.</span>
        </div>
      </div>

      {/* Brand Color Tokens */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Brand Color Palette</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Enforces strict Cafeana luxury standards (Burgundy, Gold, Espresso, Cream)
            </span>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
            onClick={handleResetColors}
          >
            <RotateCcw size={13} />
            Reset Colors
          </button>
        </div>

        {colorWarning && (
          <div style={{ background: '#FAF0E6', border: '1px solid #C6A36A', padding: '0.75rem 1rem', borderRadius: '4px', display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem', color: '#8A1C2C', fontSize: '0.82rem' }}>
            <AlertTriangle size={16} />
            <span>{colorWarning}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Primary Burgundy</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={appearance.primaryBurgundy || '#651E32'}
                onChange={(e) => handleChange('primaryBurgundy', e.target.value)}
                style={{ width: '40px', height: '38px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              />
              <input
                type="text"
                className="admin-input"
                value={appearance.primaryBurgundy || '#651E32'}
                onChange={(e) => handleChange('primaryBurgundy', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Deep Burgundy</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={appearance.deepBurgundy || '#3B101F'}
                onChange={(e) => handleChange('deepBurgundy', e.target.value)}
                style={{ width: '40px', height: '38px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              />
              <input
                type="text"
                className="admin-input"
                value={appearance.deepBurgundy || '#3B101F'}
                onChange={(e) => handleChange('deepBurgundy', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Espresso Brown</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={appearance.espresso || '#211817'}
                onChange={(e) => handleChange('espresso', e.target.value)}
                style={{ width: '40px', height: '38px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              />
              <input
                type="text"
                className="admin-input"
                value={appearance.espresso || '#211817'}
                onChange={(e) => handleChange('espresso', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Warm Cream</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={appearance.warmCream || '#F7F0E7'}
                onChange={(e) => handleChange('warmCream', e.target.value)}
                style={{ width: '40px', height: '38px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              />
              <input
                type="text"
                className="admin-input"
                value={appearance.warmCream || '#F7F0E7'}
                onChange={(e) => handleChange('warmCream', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Champagne Gold</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={appearance.champagneGold || '#C6A36A'}
                onChange={(e) => handleChange('champagneGold', e.target.value)}
                style={{ width: '40px', height: '38px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              />
              <input
                type="text"
                className="admin-input"
                value={appearance.champagneGold || '#C6A36A'}
                onChange={(e) => handleChange('champagneGold', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Soft Beige</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={appearance.softBeige || '#E8D8C5'}
                onChange={(e) => handleChange('softBeige', e.target.value)}
                style={{ width: '40px', height: '38px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              />
              <input
                type="text"
                className="admin-input"
                value={appearance.softBeige || '#E8D8C5'}
                onChange={(e) => handleChange('softBeige', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography & Shape */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Typography &amp; UI Styling</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Main Heading Font</label>
            <select
              className="admin-select"
              value={appearance.fontHeading || 'Cormorant Garamond'}
              onChange={(e) => handleChange('fontHeading', e.target.value)}
            >
              <option value="Cormorant Garamond">Cormorant Garamond (Default Luxury)</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Cinzel">Cinzel</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Body Text Font</label>
            <select
              className="admin-select"
              value={appearance.fontBody || 'DM Sans'}
              onChange={(e) => handleChange('fontBody', e.target.value)}
            >
              <option value="DM Sans">DM Sans (Default Clean)</option>
              <option value="Inter">Inter</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Button Corner Style</label>
            <select
              className="admin-select"
              value={appearance.buttonRadius || '2px'}
              onChange={(e) => handleChange('buttonRadius', e.target.value)}
            >
              <option value="0px">Sharp Luxury (0px)</option>
              <option value="2px">Classic Cafeana (2px)</option>
              <option value="6px">Subtle Rounded (6px)</option>
              <option value="999px">Pill / Oval (999px)</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Animation Framework</label>
            <div style={{ marginTop: '0.6rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={appearance.animationsEnabled !== false}
                  onChange={(e) => handleChange('animationsEnabled', e.target.checked)}
                />
                <span>Enable GSAP ScrollTrigger &amp; Lenis</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
