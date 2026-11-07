import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import Lightbox from '../components/Lightbox';
import Footer from '../components/Footer';

import Hero from '../sections/Hero';
import About from '../sections/About';
import Menu from '../sections/Menu';
import SignatureDishes from '../sections/SignatureDishes';
import Ambience from '../sections/Ambience';
import Gallery from '../sections/Gallery';
import Contact from '../sections/Contact';

import { initSmoothScroll } from '../animations/gsapConfig';
import { useSiteContent } from '../context/SiteContentContext';
import { Settings } from 'lucide-react';

export default function PublicHome() {
  const { content, isAuthenticated } = useSiteContent();
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const scrollInstance = initSmoothScroll();

    return () => {
      if (scrollInstance && scrollInstance.destroy) {
        scrollInstance.destroy();
      }
    };
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <div className="cafeana-app">
      {/* Custom Luxury Cursor */}
      <CustomCursor />

      {/* Opening Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Navigation */}
      <Navbar />

      {/* Main Public Sections */}
      <main id="main-content">
        <Hero />
        <About />
        <Menu onSelectImage={setActiveLightboxItem} />
        <SignatureDishes onSelectImage={setActiveLightboxItem} />
        <Ambience onSelectImage={setActiveLightboxItem} />
        <Gallery onSelectImage={setActiveLightboxItem} />
        <Contact />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Interactive Lightbox Modal */}
      {activeLightboxItem && (
        <Lightbox
          item={activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
        />
      )}

      {/* Floating Admin Studio quick shortcut (only visible when authenticated) */}
      {isAuthenticated && (
        <a
          href="#/admin/dashboard"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            zIndex: 9999,
            background: 'rgba(59, 16, 31, 0.92)',
            backdropFilter: 'blur(10px)',
            color: '#C6A36A',
            border: '1px solid rgba(198, 163, 106, 0.45)',
            padding: '0.45rem 1rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)',
            textDecoration: 'none'
          }}
          title="Return to Visual Admin Studio"
        >
          <Settings size={14} />
          <span>Admin Studio</span>
        </a>
      )}
    </div>
  );
}
