import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getPublishedContent,
  getDraftContent,
  saveDraftContent,
  publishContentLocally,
  resetDraftToPublished,
  restoreFactoryDefaults,
  getAdminAuth,
  setAdminAuth
} from '../services/contentStorage';
import { ADMIN_CREDENTIALS } from '../config/adminConfig';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children, isAdmin = false }) {
  // Initialize state based on whether context is consumed inside Admin or Public site
  const [content, setContent] = useState(() => {
    return isAdmin ? getDraftContent() : getPublishedContent();
  });

  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'unsaved' | 'published'
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(() => getAdminAuth());

  // Listen for storage events (e.g. when published in admin tab, public tab refreshes state)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cafeana_site_content_published' && !isAdmin) {
        setContent(getPublishedContent());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isAdmin]);

  // Synchronize browser tab favicon with uploaded company logo
  useEffect(() => {
    const logo = content?.branding?.logoImage || content?.header?.logoImage || content?.footer?.logoImage;
    const faviconEl = document.getElementById('site-favicon') || document.querySelector("link[rel*='icon']");
    if (faviconEl) {
      if (logo) {
        if (logo.includes('image/svg') || logo.endsWith('.svg')) {
          faviconEl.type = 'image/svg+xml';
        } else if (logo.includes('image/png') || logo.endsWith('.png')) {
          faviconEl.type = 'image/png';
        } else {
          faviconEl.type = 'image/x-icon';
        }
        faviconEl.href = logo;
      } else {
        faviconEl.type = 'image/svg+xml';
        faviconEl.href = '/favicon.svg';
      }
    }
  }, [content?.branding?.logoImage, content?.header?.logoImage, content?.footer?.logoImage]);

  /**
   * Updates company logo everywhere (Header, Footer, Branding, and Browser Favicon)
   */
  const updateLogo = useCallback((logoUrl) => {
    setContent((prev) => {
      const next = {
        ...prev,
        branding: {
          ...(prev.branding || {}),
          logoImage: logoUrl,
          favicon: logoUrl
        },
        header: {
          ...(prev.header || {}),
          logoImage: logoUrl
        },
        footer: {
          ...(prev.footer || {}),
          logoImage: logoUrl
        }
      };
      setSaveStatus('unsaved');
      return next;
    });
  }, []);

  /**
   * Updates an entire section (e.g. 'hero', 'about', 'menu')
   */
  const updateSection = useCallback((sectionKey, updatedData) => {
    setContent((prev) => {
      const next = {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          ...updatedData
        }
      };
      setSaveStatus('unsaved');
      return next;
    });
  }, []);

  /**
   * Sets entire content (used for imports or resets)
   */
  const setEntireContent = useCallback((newContent) => {
    setContent(newContent);
    setSaveStatus('unsaved');
  }, []);

  /**
   * Saves current draft to browser storage
   */
  const handleSaveDraft = useCallback(() => {
    try {
      saveDraftContent(content);
      setSaveStatus('saved');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [content]);

  /**
   * Publishes locally to current browser
   */
  const handlePublishLocally = useCallback(() => {
    try {
      publishContentLocally(content);
      setSaveStatus('published');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [content]);

  /**
   * Resets draft changes
   */
  const handleResetDraft = useCallback(() => {
    const restored = resetDraftToPublished();
    setContent(restored);
    setSaveStatus('saved');
  }, []);

  /**
   * Restores factory defaults
   */
  const handleRestoreDefaults = useCallback(() => {
    const defaults = restoreFactoryDefaults();
    setContent(defaults);
    setSaveStatus('saved');
  }, []);

  /**
   * Admin Authentication
   */
  const login = useCallback((username, password) => {
    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setAdminAuth(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password.' };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setAdminAuth(false);
  }, []);

  const value = {
    content,
    updateSection,
    setEntireContent,
    saveStatus,
    setSaveStatus,
    previewMode,
    setPreviewMode,
    activeSection,
    setActiveSection,
    handleSaveDraft,
    handlePublishLocally,
    handleResetDraft,
    handleRestoreDefaults,
    isAuthenticated,
    login,
    logout,
    updateLogo,
    isAdmin
  };

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
