/**
 * Export and Import Service for Cafeana Configuration
 */

/**
 * Downloads the complete configuration object as a formatted JSON file
 * @param {Object} content The full site content object
 * @param {string} filename Default: 'cafeana-site-content.json'
 */
export function exportConfigurationToFile(content, filename = 'cafeana-site-content.json') {
  const exportData = {
    ...content,
    exportedAt: new Date().toISOString(),
    generator: 'Cafeana Visual Admin Suite'
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  // Return file size metadata
  return {
    byteSize: blob.size,
    isLarge: blob.size > 3 * 1024 * 1024 // Warning if > 3MB
  };
}

/**
 * Reads and validates an imported JSON configuration file
 * @param {File} file 
 * @returns {Promise<Object>}
 */
export function importConfigurationFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided.'));
    }

    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      return reject(new Error('Invalid file type. Please select a .json file.'));
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);

        // Basic schema verification
        if (!parsed.header || !parsed.hero || !parsed.menu) {
          return reject(new Error('Invalid configuration file. Required sections are missing.'));
        }

        resolve(parsed);
      } catch {
        reject(new Error('Failed to parse JSON file. Ensure the file contains valid JSON.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading configuration file.'));
    };

    reader.readAsText(file);
  });
}
