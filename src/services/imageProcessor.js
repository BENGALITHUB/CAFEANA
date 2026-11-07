/**
 * Browser-side Image Processor & Optimizer
 * Compresses, resizes, and converts uploaded images to efficient Data URLs.
 */

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const COMPRESSION_QUALITY = 0.82;
const MAX_FILE_SIZE_WARNING_BYTES = 1.5 * 1024 * 1024; // 1.5MB

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon'
];

/**
 * Validates whether the file is an acceptable image
 * @param {File} file 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  const isSvg = type === 'image/svg+xml' || name.endsWith('.svg');
  const isIco = type.includes('icon') || name.endsWith('.ico');
  const isStandard = SUPPORTED_IMAGE_TYPES.includes(type);

  if (!isStandard && !isSvg && !isIco) {
    return { valid: false, error: 'Unsupported format. Please upload PNG, SVG, JPG, WebP, or ICO.' };
  }
  return { valid: true };
}

/**
 * Optimizes an uploaded image file by resizing and compressing via canvas
 * @param {File} file 
 * @returns {Promise<{ dataUrl: string, originalSize: number, optimizedSize: number, isLarge: boolean }>}
 */
export function optimizeImage(file) {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return reject(new Error(validation.error));
    }

    const originalSize = file.size;
    const reader = new FileReader();

    // Directly read SVG / ICO without canvas distortion to preserve razor sharpness
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg') || file.name.toLowerCase().endsWith('.ico')) {
      reader.onload = (e) => {
        resolve({
          dataUrl: e.target.result,
          originalSize,
          optimizedSize: originalSize,
          isLarge: false
        });
      };
      reader.onerror = () => reject(new Error('Failed to read vector/icon file.'));
      reader.readAsDataURL(file);
      return;
    }

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Preserve aspect ratio while scaling down oversized images
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        // Smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Preserve PNG transparency for logos and icons
        let dataUrl = '';
        if (file.type === 'image/png') {
          dataUrl = canvas.toDataURL('image/png');
        } else {
          try {
            dataUrl = canvas.toDataURL('image/webp', COMPRESSION_QUALITY);
            if (!dataUrl.startsWith('data:image/webp')) {
              dataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
            }
          } catch {
            dataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
          }
        }

        // Calculate approximate size in bytes of dataURL
        const head = 'data:image/webp;base64,';
        const strLength = dataUrl.length - head.length;
        const optimizedSize = Math.round((strLength * 3) / 4);

        resolve({
          dataUrl,
          originalSize,
          optimizedSize,
          isLarge: optimizedSize > MAX_FILE_SIZE_WARNING_BYTES
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image. The file may be corrupted.'));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.readAsDataURL(file);
  });
}
