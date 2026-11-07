/**
 * Dynamic Theme & CSS Custom Properties Manager
 * Applies customized colors, typography, and styling in real-time across the app and preview.
 */

export function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== 'string') return `rgba(101, 30, 50, ${alpha})`;
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
}

/**
 * Returns a key-value map of CSS custom properties for a given appearance config
 */
export function getThemeVariables(appearance = {}) {
  const primaryBurgundy = appearance.primaryBurgundy || '#651E32';
  const deepBurgundy = appearance.deepBurgundy || '#3B101F';
  const espresso = appearance.espresso || '#211817';
  const warmCream = appearance.warmCream || '#F7F0E7';
  const champagneGold = appearance.champagneGold || '#C6A36A';
  const softBeige = appearance.softBeige || '#E8D8C5';

  const fontHeading = appearance.fontHeading || 'Cormorant Garamond';
  const fontEditorial = appearance.fontEditorial || 'Playfair Display';
  const fontBody = appearance.fontBody || 'DM Sans';
  const buttonRadius = appearance.buttonRadius || '2px';

  return {
    // Core Brand Palette
    '--color-primary-burgundy': primaryBurgundy,
    '--color-deep-burgundy': deepBurgundy,
    '--color-espresso': espresso,
    '--color-warm-cream': warmCream,
    '--color-champagne-gold': champagneGold,
    '--color-soft-beige': softBeige,
    '--color-white': '#FFFFFF',

    // Translucent & Ambient Variations
    '--color-burgundy-90': hexToRgba(deepBurgundy, 0.92),
    '--color-burgundy-75': hexToRgba(deepBurgundy, 0.75),
    '--color-burgundy-50': hexToRgba(primaryBurgundy, 0.5),
    '--color-espresso-95': hexToRgba(espresso, 0.95),
    '--color-espresso-80': hexToRgba(espresso, 0.8),
    '--color-gold-30': hexToRgba(champagneGold, 0.3),
    '--color-gold-15': hexToRgba(champagneGold, 0.15),
    '--color-cream-10': hexToRgba(warmCream, 0.1),
    '--color-cream-20': hexToRgba(warmCream, 0.2),

    // Semantic Typography Colors
    '--text-primary-light': warmCream,
    '--text-secondary-light': softBeige,
    '--text-gold': champagneGold,
    '--text-primary-dark': espresso,

    // Typography
    '--font-heading': `'${fontHeading}', Georgia, serif`,
    '--font-editorial': `'${fontEditorial}', Georgia, serif`,
    '--font-body': `'${fontBody}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,

    // Button Styling
    '--button-radius': buttonRadius
  };
}

/**
 * Applies the theme CSS variables directly to the document root (:root)
 */
export function applyThemeVariables(appearance = {}) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const vars = getThemeVariables(appearance);

  Object.entries(vars).forEach(([key, value]) => {
    if (value !== undefined) {
      root.style.setProperty(key, value);
    }
  });

  // Dynamically load Google Font if a non-default font is selected
  loadDynamicGoogleFonts([appearance.fontHeading, appearance.fontEditorial, appearance.fontBody]);
}

/**
 * Dynamically loads Google Fonts link tags when custom fonts are picked
 */
function loadDynamicGoogleFonts(fontFamilies = []) {
  if (typeof document === 'undefined') return;

  const validFonts = fontFamilies
    .filter(Boolean)
    .filter((f) => !['Cormorant Garamond', 'Playfair Display', 'DM Sans'].includes(f));

  if (validFonts.length === 0) return;

  const linkId = 'dynamic-google-fonts';
  let link = document.getElementById(linkId);
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  const queryFamilies = validFonts.map((f) => `family=${f.replace(/\s+/g, '+')}:wght@400;500;600;700`).join('&');
  link.href = `https://fonts.googleapis.com/css2?${queryFamilies}&display=swap`;
}
