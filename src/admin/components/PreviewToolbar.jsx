import React from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, Eye } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export default function PreviewToolbar({ showFullPreview, onToggleFullPreview }) {
  const { previewMode, setPreviewMode, activeSection } = useSiteContent();

  const sectionLabels = {
    dashboard: 'Complete Website',
    header: 'Navbar & Header',
    hero: 'Hero Section',
    about: 'About Cafeana',
    menu: 'Menu Repertoire',
    signatureDishes: 'Signature Dishes',
    ambience: 'Café Ambience',
    gallery: 'Photo Gallery',
    contact: 'Contact & Location',
    footer: 'Footer',
    appearance: 'Complete Appearance'
  };

  return (
    <div className="admin-preview-toolbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Eye size={16} color="#C6A36A" />
        <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F7F0E7', fontWeight: 600 }}>
          Live Preview: {showFullPreview ? 'Full Website' : (sectionLabels[activeSection] || 'Section')}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Device Viewport Switcher */}
        <div style={{ display: 'flex', background: '#181211', borderRadius: '4px', padding: '2px', border: '1px solid rgba(198,163,106,0.2)' }}>
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            title="Desktop View (100%)"
            style={{
              background: previewMode === 'desktop' ? '#651E32' : 'transparent',
              color: previewMode === 'desktop' ? '#FFF' : '#A89585',
              border: 'none',
              padding: '0.35rem 0.65rem',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem'
            }}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode('tablet')}
            title="Tablet View (768px)"
            style={{
              background: previewMode === 'tablet' ? '#651E32' : 'transparent',
              color: previewMode === 'tablet' ? '#FFF' : '#A89585',
              border: 'none',
              padding: '0.35rem 0.65rem',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem'
            }}
          >
            <Tablet size={14} />
            <span>Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            title="Mobile View (390px)"
            style={{
              background: previewMode === 'mobile' ? '#651E32' : 'transparent',
              color: previewMode === 'mobile' ? '#FFF' : '#A89585',
              border: 'none',
              padding: '0.35rem 0.65rem',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem'
            }}
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Toggle Full Preview Mode */}
        <button
          type="button"
          onClick={onToggleFullPreview}
          className="admin-btn admin-btn-outline"
          style={{
            borderColor: 'rgba(198,163,106,0.3)',
            color: '#C6A36A',
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            background: showFullPreview ? 'rgba(198,163,106,0.15)' : 'transparent'
          }}
          title={showFullPreview ? 'Show Section Only' : 'Show Full Website'}
        >
          <Maximize2 size={13} />
          <span>{showFullPreview ? 'Section View' : 'Full Preview'}</span>
        </button>
      </div>
    </div>
  );
}
