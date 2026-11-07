import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import LivePreview from './LivePreview';
import EditorToolbar from './components/EditorToolbar';
import PreviewToolbar from './components/PreviewToolbar';
import ExportModal from './components/ExportModal';

import DashboardOverview from './editors/DashboardOverview';
import HeaderEditor from './editors/HeaderEditor';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import MenuEditor from './editors/MenuEditor';
import SignatureEditor from './editors/SignatureEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import AmbienceEditor from './editors/AmbienceEditor';
import GalleryEditor from './editors/GalleryEditor';
import ContactEditor from './editors/ContactEditor';
import FooterEditor from './editors/FooterEditor';
import AppearanceEditor from './editors/AppearanceEditor';
import SettingsEditor from './editors/SettingsEditor';

import { useSiteContent } from '../context/SiteContentContext';
import { exportConfigurationToFile } from '../services/exportService';

export default function AdminDashboard() {
  const { isAuthenticated, activeSection, content } = useSiteContent();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportMeta, setExportMeta] = useState(null);

  // Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleExportSuccess = (meta) => {
    setExportMeta(meta);
    setExportModalOpen(true);
  };

  const handleExportDirect = () => {
    const meta = exportConfigurationToFile(content);
    handleExportSuccess(meta);
  };

  const sectionTitles = {
    dashboard: 'Studio Dashboard',
    header: 'Header & Navigation',
    hero: 'Hero Section',
    about: 'About Cafeana',
    menu: 'Menu Repertoire',
    signatureDishes: 'Signature Dishes',
    experience: 'Signature Experience',
    ambience: 'Café Ambience',
    gallery: 'Photo Gallery',
    contact: 'Contact & Location',
    footer: 'Footer & Branding',
    appearance: 'Visual Identity',
    fullPreview: 'Live Website Preview',
    settings: 'Settings & Data Management'
  };

  const renderActiveEditor = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview onExportClick={handleExportDirect} />;
      case 'header':
        return <HeaderEditor />;
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'menu':
        return <MenuEditor />;
      case 'signatureDishes':
        return <SignatureEditor />;
      case 'experience':
        return <ExperienceEditor />;
      case 'ambience':
        return <AmbienceEditor />;
      case 'gallery':
        return <GalleryEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'footer':
        return <FooterEditor />;
      case 'appearance':
        return <AppearanceEditor />;
      case 'settings':
        return <SettingsEditor onExportSuccess={handleExportSuccess} />;
      case 'fullPreview':
        return null;
      default:
        return <DashboardOverview onExportClick={handleExportDirect} />;
    }
  };

  const isDedicatedFullPreview = activeSection === 'fullPreview';
  const isDashboardOverview = activeSection === 'dashboard';

  return (
    <div className="admin-app">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header / Action Toolbar */}
        <EditorToolbar
          title={sectionTitles[activeSection] || 'Admin Studio'}
          onExportSuccess={handleExportSuccess}
        />

        {/* Workspace Display */}
        {isDedicatedFullPreview ? (
          <div className="admin-preview-pane" style={{ flex: '1 1 auto', minHeight: 0, height: '100%' }}>
            <PreviewToolbar
              showFullPreview={true}
              onToggleFullPreview={() => {}}
            />
            <div className="admin-preview-viewport-wrap">
              <LivePreview showFullPreview={true} />
            </div>
          </div>
        ) : isDashboardOverview ? (
          <div className="admin-dashboard-container">
            <DashboardOverview onExportClick={handleExportDirect} />
          </div>
        ) : (
          /* Split View: Left Editor & Right Live Preview */
          <div className="admin-split-view">
            {/* Left Editor Controls */}
            <div className="admin-editor-pane">
              {renderActiveEditor()}
            </div>

            {/* Right Live Synchronized Preview */}
            <div className="admin-preview-pane">
              <PreviewToolbar
                showFullPreview={showFullPreview}
                onToggleFullPreview={() => setShowFullPreview(!showFullPreview)}
              />
              <div className="admin-preview-viewport-wrap">
                <LivePreview showFullPreview={showFullPreview} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Instructions Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        metadata={exportMeta}
      />
    </div>
  );
}
