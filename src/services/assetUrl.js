// Public assets must stay under the site's deployment base on GitHub Pages.
// Leave uploaded images and external URLs unchanged.
export function assetUrl(value, base = import.meta.env.BASE_URL) {
  if (typeof value !== 'string' || !value.startsWith('/images/')) return value;
  return `${base.replace(/\/$/, '')}${value}`;
}
