import React from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import { getThemeVariables } from '../services/themeManager';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Menu from '../sections/Menu';
import SignatureDishes from '../sections/SignatureDishes';
import Ambience from '../sections/Ambience';
import Gallery from '../sections/Gallery';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function LivePreview({ showFullPreview }) {
  const { previewMode, activeSection, content } = useSiteContent();

  const renderActiveSectionOnly = () => {
    switch (activeSection) {
      case 'header':
        return (
          <div style={{ position: 'relative', width: '100%' }}>
            <Navbar inPreview={true} />
            <Hero />
          </div>
        );

      case 'hero':
        return (
          <div style={{ position: 'relative', width: '100%' }}>
            <Navbar inPreview={true} />
            <Hero />
          </div>
        );

      case 'about':
        return <About />;

      case 'menu':
        return <Menu />;

      case 'signatureDishes':
        return <SignatureDishes />;

      case 'experience':
        return (
          <>
            <SignatureDishes />
            <Ambience />
          </>
        );

      case 'ambience':
        return <Ambience />;

      case 'gallery':
        return <Gallery />;

      case 'contact':
        return <Contact />;

      case 'footer':
        return <Footer />;

      case 'dashboard':
      case 'appearance':
      case 'settings':
      case 'fullPreview':
      default:
        return (
          <>
            <Navbar inPreview={true} />
            <Hero />
            <About />
            <Menu />
            <SignatureDishes />
            <Ambience />
            <Gallery />
            <Contact />
            <Footer />
          </>
        );
    }
  };

  const isFull = showFullPreview || activeSection === 'fullPreview' || activeSection === 'dashboard';
  const themeVars = getThemeVariables(content?.appearance || {});

  return (
    <div className={`admin-preview-viewport ${previewMode}`} style={themeVars}>
      <div
        className="live-preview-content"
        style={{
          width: '100%',
          overflowX: 'hidden',
          position: 'relative',
          ...themeVars
        }}
      >
        {isFull ? (
          <>
            <Navbar inPreview={true} />
            <Hero />
            <About />
            <Menu />
            <SignatureDishes />
            <Ambience />
            <Gallery />
            <Contact />
            <Footer />
          </>
        ) : (
          renderActiveSectionOnly()
        )}
      </div>
    </div>
  );
}
