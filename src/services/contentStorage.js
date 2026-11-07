import defaultSiteContent from '../data/siteContent.json';
import { ADMIN_STORAGE_KEYS } from '../config/adminConfig';

/**
 * Retrieves the published content for public website rendering
 * Checks localStorage first; falls back to default siteContent.json
 */
export function getPublishedContent() {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEYS.PUBLISHED);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with default to guarantee all keys exist if schema updated
      return deepMerge(defaultSiteContent, parsed);
    }
  } catch (err) {
    console.error('Error reading published content from localStorage:', err);
  }
  return defaultSiteContent;
}

/**
 * Retrieves current editing draft for the admin dashboard
 * Checks draft in localStorage first; falls back to published content
 */
export function getDraftContent() {
  try {
    const draft = localStorage.getItem(ADMIN_STORAGE_KEYS.DRAFT);
    if (draft) {
      const parsed = JSON.parse(draft);
      return deepMerge(getPublishedContent(), parsed);
    }
  } catch (err) {
    console.error('Error reading draft content from localStorage:', err);
  }
  return getPublishedContent();
}

/**
 * Saves current changes as a draft
 * @param {Object} content Full site content state
 */
export function saveDraftContent(content) {
  try {
    const dataWithTimestamp = {
      ...content,
      lastDraftSaved: new Date().toISOString()
    };
    localStorage.setItem(ADMIN_STORAGE_KEYS.DRAFT, JSON.stringify(dataWithTimestamp));
    return true;
  } catch (err) {
    console.error('Error saving draft content:', err);
    throw err;
  }
}

/**
 * Publishes the draft content locally to override public website in current browser
 * @param {Object} content Full site content state
 */
export function publishContentLocally(content) {
  try {
    const dataWithTimestamp = {
      ...content,
      lastPublished: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(dataWithTimestamp);
    localStorage.setItem(ADMIN_STORAGE_KEYS.PUBLISHED, jsonStr);
    // Sync draft with published
    localStorage.setItem(ADMIN_STORAGE_KEYS.DRAFT, jsonStr);
    return true;
  } catch (err) {
    console.error('Error publishing locally:', err);
    throw err;
  }
}

/**
 * Discards current draft and resets to last published or original content
 */
export function resetDraftToPublished() {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEYS.DRAFT);
    return getPublishedContent();
  } catch (err) {
    console.error('Error resetting draft:', err);
    return defaultSiteContent;
  }
}

/**
 * Restores entire site content back to original factory defaults
 */
export function restoreFactoryDefaults() {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEYS.DRAFT);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.PUBLISHED);
    return defaultSiteContent;
  } catch (err) {
    console.error('Error restoring factory defaults:', err);
    return defaultSiteContent;
  }
}

/**
 * Admin Authentication state helpers
 */
export function getAdminAuth() {
  try {
    return sessionStorage.getItem(ADMIN_STORAGE_KEYS.AUTH) === 'authenticated';
  } catch {
    return false;
  }
}

export function setAdminAuth(isAuthenticated) {
  try {
    if (isAuthenticated) {
      sessionStorage.setItem(ADMIN_STORAGE_KEYS.AUTH, 'authenticated');
    } else {
      sessionStorage.removeItem(ADMIN_STORAGE_KEYS.AUTH);
    }
  } catch (err) {
    console.error('Error updating auth state:', err);
  }
}

/**
 * Helper to deep merge default content with user overrides
 */
function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  const output = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (Array.isArray(source[key])) {
        output[key] = source[key];
      } else if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}
