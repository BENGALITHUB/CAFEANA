import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function HeaderEditor() {
  const { content, updateSection, updateLogo } = useSiteContent();
  const header = content?.header || {};

  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkHref, setNewLinkHref] = useState('#');

  const handleChange = (field, val) => {
    updateSection('header', { [field]: val });
  };

  const handleLogoChange = (logoUrl) => {
    if (updateLogo) {
      updateLogo(logoUrl);
    } else {
      handleChange('logoImage', logoUrl);
    }
  };

  const currentLogo = header.logoImage || content?.branding?.logoImage || '';

  const handleLinkChange = (index, field, val) => {
    const updated = [...(header.navLinks || [])];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('navLinks', updated);
  };

  const handleDeleteLink = (index) => {
    const updated = (header.navLinks || []).filter((_, i) => i !== index);
    handleChange('navLinks', updated);
  };

  const handleMoveLink = (index, direction) => {
    const links = [...(header.navLinks || [])];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= links.length) return;
    const temp = links[index];
    links[index] = links[targetIdx];
    links[targetIdx] = temp;
    handleChange('navLinks', links);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newLinkName.trim()) return;
    const newLink = {
      id: `nav-${Date.now()}`,
      name: newLinkName.trim(),
      href: newLinkHref.trim() || '#'
    };
    handleChange('navLinks', [...(header.navLinks || []), newLink]);
    setNewLinkName('');
    setNewLinkHref('#');
  };

  return (
    <div>
      {/* Company Logo & Favicon Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Company Logo &amp; Favicon</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Upload your official logo. It updates the Header Navbar, Footer, and browser Favicon instantly.
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
          <span>Transparent PNG or SVG logos automatically render on both the dark navbar and browser tab.</span>
        </div>
      </div>

      {/* Visibility & Sticky Controls */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Header Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={header.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Header Visible</span>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Brand Name</label>
            <input
              type="text"
              className="admin-input"
              value={header.brandName || ''}
              onChange={(e) => handleChange('brandName', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Brand Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={header.brandSubtitle || ''}
              onChange={(e) => handleChange('brandSubtitle', e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">CTA Button Label</label>
            <input
              type="text"
              className="admin-input"
              value={header.ctaText || ''}
              onChange={(e) => handleChange('ctaText', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">CTA Link / Anchor</label>
            <input
              type="text"
              className="admin-input"
              value={header.ctaLink || ''}
              onChange={(e) => handleChange('ctaLink', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={header.isSticky !== false}
              onChange={(e) => handleChange('isSticky', e.target.checked)}
            />
            <span>Enable Sticky Blur Navigation on Scroll</span>
          </label>
        </div>
      </div>

      {/* Navigation Links Management */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Navigation Menu Items</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {(header.navLinks || []).map((link, idx) => (
            <div
              key={link.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto auto',
                gap: '0.5rem',
                alignItems: 'center',
                padding: '0.6rem 0.8rem',
                background: '#FAF7F2',
                border: '1px solid #D4C3B3',
                borderRadius: '4px'
              }}
            >
              <input
                type="text"
                className="admin-input"
                style={{ padding: '0.45rem 0.6rem', fontSize: '0.85rem' }}
                value={link.name}
                onChange={(e) => handleLinkChange(idx, 'name', e.target.value)}
                placeholder="Link Label"
              />
              <input
                type="text"
                className="admin-input"
                style={{ padding: '0.45rem 0.6rem', fontSize: '0.85rem' }}
                value={link.href}
                onChange={(e) => handleLinkChange(idx, 'href', e.target.value)}
                placeholder="#anchor or /url"
              />
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  style={{ padding: '0.4rem', border: 'none' }}
                  onClick={() => handleMoveLink(idx, -1)}
                  disabled={idx === 0}
                  title="Move Up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  style={{ padding: '0.4rem', border: 'none' }}
                  onClick={() => handleMoveLink(idx, 1)}
                  disabled={idx === (header.navLinks || []).length - 1}
                  title="Move Down"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.4rem 0.6rem' }}
                onClick={() => handleDeleteLink(idx)}
                title="Delete Link"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Link Form */}
        <form onSubmit={handleAddLink} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label className="admin-label" style={{ fontSize: '0.72rem' }}>Add New Label</label>
            <input
              type="text"
              className="admin-input"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              placeholder="e.g. Specials"
            />
          </div>
          <div>
            <label className="admin-label" style={{ fontSize: '0.72rem' }}>Target Anchor</label>
            <input
              type="text"
              className="admin-input"
              value={newLinkHref}
              onChange={(e) => setNewLinkHref(e.target.value)}
              placeholder="#specials"
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.75rem 1rem' }}>
            <Plus size={16} />
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
