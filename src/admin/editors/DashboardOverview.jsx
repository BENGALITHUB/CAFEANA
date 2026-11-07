import React from 'react';
import {
  Sparkles,
  UtensilsCrossed,
  Award,
  Camera,
  Layers,
  MapPin,
  Clock,
  Download,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export default function DashboardOverview({ onExportClick }) {
  const { content, setActiveSection, saveStatus } = useSiteContent();

  const menuCategoriesCount = content?.menu?.categories?.length || 0;
  const signatureDishesCount = content?.signatureDishes?.items?.length || 0;
  const galleryItemsCount = content?.gallery?.items?.length || 0;
  const ambienceMomentsCount = content?.ambience?.moments?.length || 0;

  const formatDate = (isoStr) => {
    if (!isoStr) return 'Never';
    try {
      return new Date(isoStr).toLocaleString();
    } catch {
      return isoStr;
    }
  };

  return (
    <div>
      {/* Top Welcome Card */}
      <div
        className="admin-card"
        style={{
          background: 'linear-gradient(135deg, #3B101F 0%, #211817 100%)',
          color: '#F7F0E7',
          border: '1px solid #C6A36A',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C6A36A' }}>
            Visual Content Management System
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: '#F7F0E7', margin: '0.5rem 0 1rem 0', fontWeight: 600 }}>
            Welcome to Cafeana Studio
          </h2>
          <p style={{ color: '#E8D8C5', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
            Modify website copy, upload culinary photography, reorder menu categories, and customize branding in real-time. Changes update the live interactive preview immediately.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="admin-btn admin-btn-gold"
              onClick={() => setActiveSection('hero')}
            >
              <Sparkles size={15} />
              Edit Hero Section
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              style={{ color: '#F7F0E7', borderColor: 'rgba(198,163,106,0.4)' }}
              onClick={() => setActiveSection('menu')}
            >
              <UtensilsCrossed size={15} />
              Manage Menu
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              style={{ color: '#F7F0E7', borderColor: 'rgba(198,163,106,0.4)' }}
              onClick={onExportClick}
            >
              <Download size={15} />
              Export For GitHub
            </button>
          </div>
        </div>

        {/* Ambient watermark icon */}
        <div style={{ position: 'absolute', right: '-15px', bottom: '-25px', opacity: 0.08, pointerEvents: 'none' }}>
          <UtensilsCrossed size={220} color="#C6A36A" />
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#7A6662', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Menu Categories</span>
            <UtensilsCrossed size={18} color="#651E32" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#3B101F' }}>
            {menuCategoriesCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#C6A36A', cursor: 'pointer' }} onClick={() => setActiveSection('menu')}>
            Manage categories →
          </span>
        </div>

        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#7A6662', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Signature Dishes</span>
            <Award size={18} color="#651E32" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#3B101F' }}>
            {signatureDishesCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#C6A36A', cursor: 'pointer' }} onClick={() => setActiveSection('signatureDishes')}>
            Edit dishes →
          </span>
        </div>

        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#7A6662', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Gallery Photos</span>
            <Camera size={18} color="#651E32" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#3B101F' }}>
            {galleryItemsCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#C6A36A', cursor: 'pointer' }} onClick={() => setActiveSection('gallery')}>
            Upload photos →
          </span>
        </div>

        <div className="admin-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#7A6662', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Ambience Moments</span>
            <Layers size={18} color="#651E32" />
          </div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#3B101F' }}>
            {ambienceMomentsCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#C6A36A', cursor: 'pointer' }} onClick={() => setActiveSection('ambience')}>
            Customize moments →
          </span>
        </div>
      </div>

      {/* System Status & Publishing Guide */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Storage &amp; Publishing Status</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #FAF7F2' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A6662' }}>Current Status:</span>
              <strong style={{ fontSize: '0.85rem', color: '#651E32', textTransform: 'uppercase' }}>
                {saveStatus}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #FAF7F2' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A6662' }}>Last Draft Saved:</span>
              <span style={{ fontSize: '0.85rem', color: '#211817' }}>
                {formatDate(content?.lastDraftSaved)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #FAF7F2' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A6662' }}>Last Published Locally:</span>
              <span style={{ fontSize: '0.85rem', color: '#211817' }}>
                {formatDate(content?.lastPublished)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: '#7A6662' }}>Hosting Mode:</span>
              <span style={{ fontSize: '0.85rem', color: '#211817', fontWeight: 600 }}>
                GitHub Pages / Static
              </span>
            </div>
          </div>
        </div>

        {/* Workflow Guide */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Static Publishing Workflow</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#4A3A37', lineHeight: 1.5 }}>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <CheckCircle size={16} color="#651E32" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>1. Edit &amp; Preview:</strong> Adjust any text or imagery; the right side updates immediately in real-time.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <CheckCircle size={16} color="#651E32" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>2. Save Draft / Publish Locally:</strong> Stores updates in your browser's localStorage for instant local review.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
              <CheckCircle size={16} color="#651E32" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>3. Export For GitHub:</strong> Download <code>cafeana-site-content.json</code>, place it in <code>src/data/siteContent.json</code>, and git push.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Sections Directory Grid */}
      <div className="admin-card" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Manage Website Sections</h3>
            <span style={{ fontSize: '0.78rem', color: '#7A6662' }}>
              Click any section below to launch its dedicated live visual editor
            </span>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            onClick={() => setActiveSection('fullPreview')}
          >
            <ExternalLink size={13} />
            Full Preview
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}
        >
          {[
            {
              id: 'header',
              title: 'Header & Navigation',
              desc: `${content?.header?.navLinks?.length || 6} Navigation Links • Sticky Blur Header`,
              visible: content?.header?.visible !== false,
              icon: Sparkles
            },
            {
              id: 'hero',
              title: 'Hero Section',
              desc: `“${content?.hero?.headlineLine1 || 'A Little Escape.'}” • Full Screen`,
              visible: content?.hero?.visible !== false,
              icon: Sparkles
            },
            {
              id: 'about',
              title: 'About Cafeana',
              desc: `${content?.about?.hallmarks?.length || 3} Hallmarks • Asymmetrical Parallax`,
              visible: content?.about?.visible !== false,
              icon: Layers
            },
            {
              id: 'menu',
              title: 'Menu Repertoire',
              desc: `${menuCategoriesCount} Cuisine Categories • Flavour Highlights`,
              visible: content?.menu?.visible !== false,
              icon: UtensilsCrossed
            },
            {
              id: 'signatureDishes',
              title: 'Signature Dishes',
              desc: `${signatureDishesCount} Curated Showcases • Luxury Frames`,
              visible: content?.signatureDishes?.visible !== false,
              icon: Award
            },
            {
              id: 'ambience',
              title: 'Café Ambience',
              desc: `${ambienceMomentsCount} Atmosphere Moments • Interactive Gallery`,
              visible: content?.ambience?.visible !== false,
              icon: Layers
            },
            {
              id: 'gallery',
              title: 'Photo Gallery',
              desc: `${galleryItemsCount} High-Resolution Photos • Lightbox`,
              visible: content?.gallery?.visible !== false,
              icon: Camera
            },
            {
              id: 'contact',
              title: 'Contact & Location',
              desc: 'Hours, Phone, Email, Google Maps & Reservation Form',
              visible: content?.contact?.visible !== false,
              icon: MapPin
            },
            {
              id: 'footer',
              title: 'Footer & Philosophy',
              desc: `Tagline: “${content?.footer?.tagline || 'Snap. Sip. Savour. Repeat.'}”`,
              visible: content?.footer?.visible !== false,
              icon: Clock
            },
            {
              id: 'appearance',
              title: 'Website Appearance',
              desc: 'Burgundy, Gold, Espresso & Cream Palette • Typography',
              visible: true,
              icon: Sparkles
            }
          ].map((sec) => (
            <div
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{
                background: '#FAF7F2',
                border: '1px solid #D4C3B3',
                borderRadius: '4px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#651E32';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(101, 30, 50, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D4C3B3';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <strong style={{ color: '#3B101F', fontSize: '0.95rem' }}>{sec.title}</strong>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '999px',
                      background: sec.visible ? 'rgba(101, 30, 50, 0.1)' : 'rgba(122, 102, 98, 0.15)',
                      color: sec.visible ? '#651E32' : '#7A6662'
                    }}
                  >
                    {sec.visible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#7A6662', lineHeight: 1.4 }}>
                  {sec.desc}
                </p>
              </div>

              <div style={{ marginTop: '0.8rem', fontSize: '0.78rem', color: '#C6A36A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>Edit Section</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
