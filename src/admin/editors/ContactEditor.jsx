import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';

export default function ContactEditor() {
  const { content, updateSection } = useSiteContent();
  const contact = content?.contact || {};
  const socialLinks = contact.socialLinks || {};

  const handleChange = (field, val) => {
    updateSection('contact', { [field]: val });
  };

  const handleSocialChange = (network, val) => {
    updateSection('contact', {
      socialLinks: {
        ...socialLinks,
        [network]: val
      }
    });
  };

  return (
    <div>
      {/* Visibility & Headers */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Contact Section Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={contact.visible !== false}
              onChange={(e) => handleChange('visible', e.target.checked)}
            />
            <span>Contact Section Visible</span>
          </label>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Section Badge</label>
          <input
            type="text"
            className="admin-input"
            value={contact.badge || ''}
            onChange={(e) => handleChange('badge', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Main Heading</label>
          <input
            type="text"
            className="admin-input"
            value={contact.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Intro Description</label>
          <textarea
            className="admin-textarea"
            value={contact.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
      </div>

      {/* Address & Contact Information */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Location &amp; Communication</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Restaurant Name</label>
          <input
            type="text"
            className="admin-input"
            value={contact.restaurantName || ''}
            onChange={(e) => handleChange('restaurantName', e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Street Address</label>
            <input
              type="text"
              className="admin-input"
              value={contact.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="[Restaurant Address Placeholder]"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">City, State, Zip</label>
            <input
              type="text"
              className="admin-input"
              value={contact.cityStateZip || ''}
              onChange={(e) => handleChange('cityStateZip', e.target.value)}
              placeholder="[City, State, Postal Code Placeholder]"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Phone Number</label>
            <input
              type="text"
              className="admin-input"
              value={contact.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="[+XX XXXXX XXXXX]"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Reservation Email</label>
            <input
              type="email"
              className="admin-input"
              value={contact.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="reservations@cafeana-placeholder.com"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Google Maps URL / Directions Link</label>
          <input
            type="text"
            className="admin-input"
            value={contact.googleMapsEmbedUrl || ''}
            onChange={(e) => handleChange('googleMapsEmbedUrl', e.target.value)}
          />
        </div>
      </div>

      {/* Operating Hours */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Operating Hours</h3>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Monday – Thursday</label>
          <input
            type="text"
            className="admin-input"
            value={contact.hoursWeekday || ''}
            onChange={(e) => handleChange('hoursWeekday', e.target.value)}
            placeholder="11:00 AM – 11:00 PM"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Friday – Saturday</label>
          <input
            type="text"
            className="admin-input"
            value={contact.hoursWeekend || ''}
            onChange={(e) => handleChange('hoursWeekend', e.target.value)}
            placeholder="11:00 AM – 12:30 AM"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Sunday</label>
          <input
            type="text"
            className="admin-input"
            value={contact.hoursSunday || ''}
            onChange={(e) => handleChange('hoursSunday', e.target.value)}
            placeholder="10:30 AM – 11:30 PM"
          />
        </div>
      </div>

      {/* Social Media Links */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Social Media Profiles</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Instagram URL</label>
            <input
              type="text"
              className="admin-input"
              value={socialLinks.instagram || ''}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Facebook URL</label>
            <input
              type="text"
              className="admin-input"
              value={socialLinks.facebook || ''}
              onChange={(e) => handleSocialChange('facebook', e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Twitter / X URL</label>
            <input
              type="text"
              className="admin-input"
              value={socialLinks.twitter || ''}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">YouTube URL</label>
            <input
              type="text"
              className="admin-input"
              value={socialLinks.youtube || ''}
              onChange={(e) => handleSocialChange('youtube', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
