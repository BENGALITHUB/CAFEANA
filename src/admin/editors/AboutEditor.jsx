import React from 'react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function AboutEditor() {
  const { content, updateSection } = useSiteContent();
  const about = content?.about || {};

  const handleChange = (field, val) => {
    updateSection('about', { [field]: val });
  };

  const handleHallmarkChange = (index, field, val) => {
    const updated = [...(about.hallmarks || [])];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('hallmarks', updated);
  };

  return (
    <div>
      {/* Visibility */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">About Section Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={about.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>About Section Visible</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Badge Label</label>
          <input
            type="text"
            className="admin-input"
            value={about.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Main Section Heading</label>
          <input
            type="text"
            className="admin-input"
            value={about.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Featured Quote (Editorial Italics)</label>
          <textarea
            className="admin-textarea"
            value={about.quote || ''}
            onChange={(e) => handleChange('quote', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Brand Narrative / Body Description</label>
          <textarea
            className="admin-textarea"
            style={{ minHeight: '120px' }}
            value={about.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">CTA Button Label</label>
            <input
              type="text"
              className="admin-input"
              value={about.ctaText || ''}
              onChange={(e) => handleChange('ctaText', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">CTA Link</label>
            <input
              type="text"
              className="admin-input"
              value={about.ctaLink || ''}
              onChange={(e) => handleChange('ctaLink', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Decorative Seal Text</label>
          <input
            type="text"
            className="admin-input"
            value={about.sealText || ''}
            onChange={(e) => handleChange('sealText', e.target.value)}
          />
        </div>
      </div>

      {/* Hallmarks / Brand Pillars */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Brand Pillars (3 Hallmarks)</h3>
        </div>

        {(about.hallmarks || []).map((h, idx) => (
          <div
            key={h.id || idx}
            style={{
              padding: '1rem',
              background: '#FAF7F2',
              borderRadius: '4px',
              border: '1px solid #D4C3B3',
              marginBottom: '1rem'
            }}
          >
            <div className="admin-form-group">
              <label className="admin-label">Pillar {idx + 1} Title</label>
              <input
                type="text"
                className="admin-input"
                value={h.title || ''}
                onChange={(e) => handleHallmarkChange(idx, 'title', e.target.value)}
              />
            </div>
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Pillar {idx + 1} Description</label>
              <input
                type="text"
                className="admin-input"
                value={h.desc || ''}
                onChange={(e) => handleHallmarkChange(idx, 'desc', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Photography Composition</h3>
        </div>

        <ImageUploader
          label="Primary Interior Photograph"
          value={about.mainImage}
          originalValue="/images/about-interior.jpg"
          onChange={(newVal) => handleChange('mainImage', newVal)}
        />

        <div style={{ marginTop: '1.5rem' }}>
          <ImageUploader
            label="Secondary Plating Photograph"
            value={about.secondaryImage}
            originalValue="/images/about-food.jpg"
            onChange={(newVal) => handleChange('secondaryImage', newVal)}
          />
        </div>
      </div>
    </div>
  );
}
