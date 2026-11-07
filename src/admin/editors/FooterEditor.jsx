import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Clock,
  Compass,
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { useSiteContent } from '../../context/SiteContentContext';

export default function FooterEditor() {
  const { content, updateSection, updateLogo } = useSiteContent();
  const footer = content?.footer || {};
  const header = content?.header || {};
  const contact = content?.contact || {};

  // Local state for new navigation item
  const [newNavName, setNewNavName] = useState('');
  const [newNavHref, setNewNavHref] = useState('#');

  // Local state for new hours slot
  const [newHoursDays, setNewHoursDays] = useState('');
  const [newHoursTime, setNewHoursTime] = useState('');

  const handleChange = (field, val) => {
    updateSection('footer', { [field]: val });
  };

  // Logo Handler: updates logo across footer, header, branding, and browser favicon
  const handleLogoChange = (logoUrl) => {
    if (updateLogo) {
      updateLogo(logoUrl);
    } else {
      handleChange('logoImage', logoUrl);
    }
  };

  // Current Logo value
  const currentLogo = footer.logoImage || content?.branding?.logoImage || header.logoImage || '';

  // Current Navigation Links
  const currentNavLinks = footer.navLinks || header.navLinks || [
    { id: 'fnav-1', name: 'Home', href: '#home' },
    { id: 'fnav-2', name: 'About', href: '#about' },
    { id: 'fnav-3', name: 'Menu', href: '#menu' },
    { id: 'fnav-4', name: 'Experience', href: '#experience' },
    { id: 'fnav-5', name: 'Gallery', href: '#gallery' },
    { id: 'fnav-6', name: 'Contact', href: '#contact' }
  ];

  const handleNavChange = (index, field, val) => {
    const updated = [...currentNavLinks];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('navLinks', updated);
  };

  const handleDeleteNav = (index) => {
    const updated = currentNavLinks.filter((_, i) => i !== index);
    handleChange('navLinks', updated);
  };

  const handleMoveNav = (index, direction) => {
    const links = [...currentNavLinks];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= links.length) return;
    const temp = links[index];
    links[index] = links[targetIdx];
    links[targetIdx] = temp;
    handleChange('navLinks', links);
  };

  const handleAddNav = (e) => {
    e.preventDefault();
    if (!newNavName.trim()) return;
    const newItem = {
      id: `fnav-${Date.now()}`,
      name: newNavName.trim(),
      href: newNavHref.trim() || '#'
    };
    handleChange('navLinks', [...currentNavLinks, newItem]);
    setNewNavName('');
    setNewNavHref('#');
  };

  const handleSyncNavFromHeader = () => {
    if (header.navLinks && header.navLinks.length > 0) {
      handleChange('navLinks', [...header.navLinks]);
    }
  };

  // Current Opening Hours List
  const currentHoursList = footer.hoursList || [
    { id: 'hr-1', days: 'Monday – Thursday', hours: contact.hoursWeekday || '11:00 AM – 11:00 PM' },
    { id: 'hr-2', days: 'Friday – Saturday', hours: contact.hoursWeekend || '11:00 AM – 12:30 AM' },
    { id: 'hr-3', days: 'Sunday', hours: contact.hoursSunday || '10:30 AM – 11:30 PM' }
  ];

  const handleHoursChange = (index, field, val) => {
    const updated = [...currentHoursList];
    updated[index] = { ...updated[index], [field]: val };
    handleChange('hoursList', updated);
  };

  const handleDeleteHours = (index) => {
    const updated = currentHoursList.filter((_, i) => i !== index);
    handleChange('hoursList', updated);
  };

  const handleMoveHours = (index, direction) => {
    const list = [...currentHoursList];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    handleChange('hoursList', list);
  };

  const handleAddHours = (e) => {
    e.preventDefault();
    if (!newHoursDays.trim()) return;
    const newSlot = {
      id: `hr-${Date.now()}`,
      days: newHoursDays.trim(),
      hours: newHoursTime.trim() || '11:00 AM – 11:00 PM'
    };
    handleChange('hoursList', [...currentHoursList, newSlot]);
    setNewHoursDays('');
    setNewHoursTime('');
  };

  const handlePopulateHoursFromContact = () => {
    const populated = [
      { id: 'hr-1', days: 'Monday – Thursday', hours: contact.hoursWeekday || '11:00 AM – 11:00 PM' },
      { id: 'hr-2', days: 'Friday – Saturday', hours: contact.hoursWeekend || '11:00 AM – 12:30 AM' },
      { id: 'hr-3', days: 'Sunday', hours: contact.hoursSunday || '10:30 AM – 11:30 PM' }
    ];
    handleChange('hoursList', populated);
  };

  // Fourth Column Settings
  const fourthCol = footer.fourthColumn || {
    enabled: true,
    title: footer.promiseTitle || 'The Promise',
    text: footer.promiseText || '“A Little Escape. A Lot of Flavour.” We craft every cup of coffee and every recipe with genuine devotion to culinary art and guest serenity.',
    tagline: footer.tagline || 'Snap. Sip. Savour. Repeat.',
    ctaText: '',
    ctaLink: ''
  };

  const handleFourthColChange = (field, val) => {
    const updated = { ...fourthCol, [field]: val };
    handleChange('fourthColumn', updated);
    // Backward compatibility updates
    if (field === 'title') handleChange('promiseTitle', val);
    if (field === 'text') handleChange('promiseText', val);
    if (field === 'tagline') handleChange('tagline', val);
  };

  return (
    <div>
      {/* 1. Company Logo & Favicon Suite */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Company Logo &amp; Favicon</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Upload your company logo here. It automatically updates the website Navbar, Footer, and browser tab Favicon in real-time.
            </span>
          </div>
        </div>

        <ImageUploader
          label="Company Logo (PNG, SVG, JPG, WebP, or ICO)"
          value={currentLogo}
          originalValue=""
          onChange={handleLogoChange}
          onReset={() => handleLogoChange('')}
        />

        <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#FAF7F2', border: '1px solid #D4C3B3', borderRadius: '4px', fontSize: '0.82rem', color: '#4A3A37', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="#651E32" style={{ flexShrink: 0 }} />
          <span>
            <strong>Automatic Favicon Sync:</strong> Transparent PNGs and SVGs are recommended for maximum crispness in both dark headers and browser tabs.
          </span>
        </div>
      </div>

      {/* 2. Column 1: Brand & Identity */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Column 1: Brand &amp; Identity</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Main brand presentation in the left footer column
            </span>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={footer.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Footer Visible</span>
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Brand Name</label>
            <input
              type="text"
              className="admin-input"
              value={footer.brandName || ''}
              onChange={(e) => handleChange('brandName', e.target.value)}
              placeholder="CAFEANA"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Brand Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={footer.brandSubtitle || ''}
              onChange={(e) => handleChange('brandSubtitle', e.target.value)}
              placeholder="Restaurant & Café"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Brand Description</label>
          <textarea
            className="admin-textarea"
            style={{ minHeight: '80px' }}
            value={footer.brandDescription || ''}
            onChange={(e) => handleChange('brandDescription', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Closing Brand Tagline</label>
          <input
            type="text"
            className="admin-input"
            value={footer.tagline || ''}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="Snap. Sip. Savour. Repeat."
          />
        </div>
      </div>

      {/* 3. Column 2: Footer Navigation Links */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Column 2: Navigation Links</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Manage navigation links displayed in the footer
            </span>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            onClick={handleSyncNavFromHeader}
            title="Sync all links from the header navbar"
          >
            <RefreshCw size={13} />
            Sync from Navbar
          </button>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Column Heading</label>
          <input
            type="text"
            className="admin-input"
            value={footer.navigationTitle || 'Navigation'}
            onChange={(e) => handleChange('navigationTitle', e.target.value)}
            placeholder="Navigation"
          />
        </div>

        <label className="admin-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
          Footer Menu Items
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
          {currentNavLinks.map((item, idx) => (
            <div
              key={item.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto auto',
                gap: '0.5rem',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                background: '#FAF7F2',
                border: '1px solid #D4C3B3',
                borderRadius: '4px'
              }}
            >
              <input
                type="text"
                className="admin-input"
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                value={item.name}
                onChange={(e) => handleNavChange(idx, 'name', e.target.value)}
                placeholder="Link Label"
              />
              <input
                type="text"
                className="admin-input"
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                value={item.href}
                onChange={(e) => handleNavChange(idx, 'href', e.target.value)}
                placeholder="#anchor or /url"
              />
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                <button
                  type="button"
                  className="admin-btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => handleMoveNav(idx, -1)}
                  disabled={idx === 0}
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="admin-btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => handleMoveNav(idx, 1)}
                  disabled={idx === currentNavLinks.length - 1}
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
              <button
                type="button"
                className="admin-btn-icon"
                style={{ width: '28px', height: '28px', color: '#8A1C2C' }}
                onClick={() => handleDeleteNav(idx)}
                title="Delete Link"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Link Form */}
        <form onSubmit={handleAddNav} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', background: '#FAF7F2', padding: '0.75rem', borderRadius: '4px', border: '1px dashed #C6A36A' }}>
          <input
            type="text"
            className="admin-input"
            style={{ padding: '0.45rem 0.6rem', fontSize: '0.85rem' }}
            placeholder="Add Link Label (e.g. Specials)"
            value={newNavName}
            onChange={(e) => setNewNavName(e.target.value)}
          />
          <input
            type="text"
            className="admin-input"
            style={{ padding: '0.45rem 0.6rem', fontSize: '0.85rem' }}
            placeholder="Target (#menu, /specials)"
            value={newNavHref}
            onChange={(e) => setNewNavHref(e.target.value)}
          />
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>
            <Plus size={14} /> Add Link
          </button>
        </form>
      </div>

      {/* 4. Column 3: Opening Hours & Timing */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Column 3: Opening Hours</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Manage days and dining hours displayed in the footer
            </span>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            onClick={handlePopulateHoursFromContact}
            title="Populate from Contact Info section"
          >
            <RefreshCw size={13} />
            Reset to Contact Hours
          </button>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Column Heading</label>
          <input
            type="text"
            className="admin-input"
            value={footer.hoursTitle || 'Opening Hours'}
            onChange={(e) => handleChange('hoursTitle', e.target.value)}
            placeholder="Opening Hours"
          />
        </div>

        <label className="admin-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
          Schedule Time Slots
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
          {currentHoursList.map((slot, idx) => (
            <div
              key={slot.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr auto auto',
                gap: '0.5rem',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                background: '#FAF7F2',
                border: '1px solid #D4C3B3',
                borderRadius: '4px'
              }}
            >
              <input
                type="text"
                className="admin-input"
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                value={slot.days}
                onChange={(e) => handleHoursChange(idx, 'days', e.target.value)}
                placeholder="Days (e.g. Monday – Thursday)"
              />
              <input
                type="text"
                className="admin-input"
                style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                value={slot.hours}
                onChange={(e) => handleHoursChange(idx, 'hours', e.target.value)}
                placeholder="Hours (e.g. 11:00 AM – 11:00 PM)"
              />
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                <button
                  type="button"
                  className="admin-btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => handleMoveHours(idx, -1)}
                  disabled={idx === 0}
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  className="admin-btn-icon"
                  style={{ width: '28px', height: '28px' }}
                  onClick={() => handleMoveHours(idx, 1)}
                  disabled={idx === currentHoursList.length - 1}
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
              <button
                type="button"
                className="admin-btn-icon"
                style={{ width: '28px', height: '28px', color: '#8A1C2C' }}
                onClick={() => handleDeleteHours(idx)}
                title="Delete Slot"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Hours Slot Form */}
        <form onSubmit={handleAddHours} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr auto', gap: '0.5rem', background: '#FAF7F2', padding: '0.75rem', borderRadius: '4px', border: '1px dashed #C6A36A' }}>
          <input
            type="text"
            className="admin-input"
            style={{ padding: '0.45rem 0.6rem', fontSize: '0.85rem' }}
            placeholder="Days (e.g. Sunday Brunch)"
            value={newHoursDays}
            onChange={(e) => setNewHoursDays(e.target.value)}
          />
          <input
            type="text"
            className="admin-input"
            style={{ padding: '0.45rem 0.6rem', fontSize: '0.85rem' }}
            placeholder="Hours (10:00 AM – 4:00 PM)"
            value={newHoursTime}
            onChange={(e) => setNewHoursTime(e.target.value)}
          />
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>
            <Plus size={14} /> Add Slot
          </button>
        </form>
      </div>

      {/* 5. Column 4: Flexible 4th Column */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Column 4: Flexible 4th Column</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Add an optional 4th column for brand philosophy, reservations, or custom notices
            </span>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={fourthCol.enabled !== false}
              onChange={(e) => handleFourthColChange('enabled', e.target.checked)}
            />
            <span style={{ fontWeight: 600, color: fourthCol.enabled !== false ? '#651E32' : '#7A6662' }}>
              {fourthCol.enabled !== false ? '4th Column Enabled' : '4th Column Disabled'}
            </span>
          </label>
        </div>

        {fourthCol.enabled !== false ? (
          <div>
            <div className="admin-form-group">
              <label className="admin-label">Column Title</label>
              <input
                type="text"
                className="admin-input"
                value={fourthCol.title || ''}
                onChange={(e) => handleFourthColChange('title', e.target.value)}
                placeholder="The Promise / Reservations / Private Dining"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Column Body Text</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '90px' }}
                value={fourthCol.text || ''}
                onChange={(e) => handleFourthColChange('text', e.target.value)}
                placeholder="Enter philosophy, reservation notice, or custom details..."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Highlight Tagline / Badge</label>
              <input
                type="text"
                className="admin-input"
                value={fourthCol.tagline || ''}
                onChange={(e) => handleFourthColChange('tagline', e.target.value)}
                placeholder="Snap. Sip. Savour. Repeat."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Optional CTA Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={fourthCol.ctaText || ''}
                  onChange={(e) => handleFourthColChange('ctaText', e.target.value)}
                  placeholder="e.g. Book a Table (leave empty if none)"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">CTA Button Link</label>
                <input
                  type="text"
                  className="admin-input"
                  value={fourthCol.ctaLink || ''}
                  onChange={(e) => handleFourthColChange('ctaLink', e.target.value)}
                  placeholder="#contact or https://..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '1.25rem', background: '#FAF7F2', borderRadius: '4px', textAlign: 'center', color: '#7A6662', fontSize: '0.88rem' }}>
            <span>The 4th column is currently disabled. The footer is dynamically displaying 3 spacious columns (Brand Info, Navigation, and Opening Hours).</span>
          </div>
        )}
      </div>

      {/* 6. Copyright Notice */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Copyright Notice</h3>
        </div>

        <div className="admin-form-group" style={{ marginBottom: 0 }}>
          <label className="admin-label">Bottom Bar Copyright Text</label>
          <input
            type="text"
            className="admin-input"
            value={footer.copyright || ''}
            onChange={(e) => handleChange('copyright', e.target.value)}
            placeholder="CAFEANA Restaurant & Café. All rights reserved."
          />
        </div>
      </div>
    </div>
  );
}
