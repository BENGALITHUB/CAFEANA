import React from 'react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function HeroEditor() {
  const { content, updateSection } = useSiteContent();
  const hero = content?.hero || {};

  const handleChange = (field, val) => {
    updateSection('hero', { [field]: val });
  };

  return (
    <div>
      {/* Visibility & General */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Hero Visibility &amp; Alignment</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={hero.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Hero Visible</span>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Text Alignment</label>
            <select
              className="admin-select"
              value={hero.textAlignment || 'center'}
              onChange={(e) => handleChange('textAlignment', e.target.value)}
            >
              <option value="center">Centered (Default)</option>
              <option value="left">Left Aligned</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">
              Overlay Darkness: {Math.round((hero.overlayOpacity ?? 0.88) * 100)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="0.98"
              step="0.02"
              value={hero.overlayOpacity ?? 0.88}
              onChange={(e) => handleChange('overlayOpacity', parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </div>
        </div>
      </div>

      {/* Typography & Copy */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Headlines &amp; Narrative</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Small Badge Label</label>
          <input
            type="text"
            className="admin-input"
            value={hero.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
            placeholder="e.g. WELCOME TO CAFEANA"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Main Headline (Line 1)</label>
            <input
              type="text"
              className="admin-input"
              value={hero.headlineLine1 || ''}
              onChange={(e) => handleChange('headlineLine1', e.target.value)}
              placeholder="A Little Escape."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Main Headline (Line 2 - Italic)</label>
            <input
              type="text"
              className="admin-input"
              value={hero.headlineLine2 || ''}
              onChange={(e) => handleChange('headlineLine2', e.target.value)}
              placeholder="A Lot of Flavour."
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description / Subtitle</label>
          <textarea
            className="admin-textarea"
            value={hero.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Where global flavours meet comfort..."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Brand Signature Tagline</label>
          <input
            type="text"
            className="admin-input"
            value={hero.brandSignature || ''}
            onChange={(e) => handleChange('brandSignature', e.target.value)}
            placeholder="SNAP. SIP. SAVOUR. REPEAT."
          />
        </div>
      </div>

      {/* Call To Actions */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Action Buttons</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Primary Button Label</label>
            <input
              type="text"
              className="admin-input"
              value={hero.ctaPrimaryText || ''}
              onChange={(e) => handleChange('ctaPrimaryText', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Primary Button Link</label>
            <input
              type="text"
              className="admin-input"
              value={hero.ctaPrimaryLink || ''}
              onChange={(e) => handleChange('ctaPrimaryLink', e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Secondary Button Label</label>
            <input
              type="text"
              className="admin-input"
              value={hero.ctaSecondaryText || ''}
              onChange={(e) => handleChange('ctaSecondaryText', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Secondary Button Link</label>
            <input
              type="text"
              className="admin-input"
              value={hero.ctaSecondaryLink || ''}
              onChange={(e) => handleChange('ctaSecondaryLink', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Background Imagery */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Hero Background Image</h3>
        </div>

        <ImageUploader
          label="Cinematic Restaurant Background"
          value={hero.bgImage}
          originalValue="/images/hero-bg.jpg"
          onChange={(newVal) => handleChange('bgImage', newVal)}
        />
      </div>
    </div>
  );
}
