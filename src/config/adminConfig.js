/**
 * Cafeana Admin Configuration
 * 
 * IMPORTANT SECURITY LIMITATION:
 * This is a static frontend application hosted on GitHub Pages or static hosting.
 * Hardcoded credentials provide only basic private editing access restriction,
 * not cryptographic server-side authentication.
 * 
 * Replace these placeholder credentials with your chosen username and password.
 */
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "cafeana2024"
};

export const ADMIN_STORAGE_KEYS = {
  AUTH: "cafeana_admin_auth_token",
  DRAFT: "cafeana_site_content_draft",
  PUBLISHED: "cafeana_site_content_published",
  HISTORY: "cafeana_site_content_history"
};
