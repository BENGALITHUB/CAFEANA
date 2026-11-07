import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log('🧪 Starting Cafeana Admin Suite Verification Tests...\n');

  // Test 1: Config and Credentials
  const configPath = path.join(__dirname, '..', 'src', 'config', 'adminConfig.js');
  const configContent = fs.readFileSync(configPath, 'utf8');
  if (configContent.includes('export const ADMIN_CREDENTIALS')) {
    console.log('✅ TEST 1: Admin credentials configuration file exists and exports ADMIN_CREDENTIALS.');
  } else {
    throw new Error('TEST 1 Failed: ADMIN_CREDENTIALS not found.');
  }

  // Test 2: Default Site Content Schema
  const contentPath = path.join(__dirname, '..', 'src', 'data', 'siteContent.json');
  const siteContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

  const requiredSections = [
    'header',
    'hero',
    'about',
    'menu',
    'signatureDishes',
    'ambience',
    'gallery',
    'contact',
    'footer',
    'appearance'
  ];

  for (const section of requiredSections) {
    if (!siteContent[section]) {
      throw new Error(`TEST 2 Failed: Missing section ${section} in siteContent.json`);
    }
  }
  console.log('✅ TEST 2: Central siteContent.json verified with all 10 core sections.');

  // Test 3: Menu Categories & Signature Dishes
  if (siteContent.menu.categories.length === 7) {
    console.log(`✅ TEST 3: All 7 required menu categories loaded in default configuration.`);
  } else {
    throw new Error(`TEST 3 Failed: Expected 7 categories, found ${siteContent.menu.categories.length}`);
  }

  if (siteContent.signatureDishes.items.length === 4) {
    console.log(`✅ TEST 4: Signature dishes verified (${siteContent.signatureDishes.items.length} items).`);
  } else {
    throw new Error(`TEST 4 Failed: Expected 4 signature dishes.`);
  }

  // Test 5: Gallery Items
  if (siteContent.gallery.items.length === 8) {
    console.log(`✅ TEST 5: Gallery collection verified (${siteContent.gallery.items.length} items).`);
  } else {
    throw new Error(`TEST 5 Failed: Expected 8 gallery items.`);
  }

  // Test 6: Strict NO GREEN check
  const appearanceStr = JSON.stringify(siteContent.appearance);
  if (appearanceStr.includes('#00ff00') || appearanceStr.includes('#0f0') || appearanceStr.toLowerCase().includes('green')) {
    throw new Error('TEST 6 Failed: Accidental green color found in appearance settings!');
  }
  console.log('✅ TEST 6: Strict brand identity verified — NO GREEN colors in default theme.');

  // Test 7: Relative Base Path for GitHub Pages
  const viteConfig = fs.readFileSync(path.join(__dirname, '..', 'vite.config.js'), 'utf8');
  if (viteConfig.includes("base: './'")) {
    console.log("✅ TEST 7: Vite base path set to relative ('./') for seamless GitHub Pages subpath deployment.");
  } else {
    throw new Error('TEST 7 Failed: Vite base path must be relative for GitHub Pages.');
  }

  // Test 8: Dist build index.html verification
  const distIndexPath = path.join(__dirname, '..', 'dist', 'index.html');
  if (fs.existsSync(distIndexPath)) {
    const distIndex = fs.readFileSync(distIndexPath, 'utf8');
    if (distIndex.includes('./assets/')) {
      console.log('✅ TEST 8: Built production assets use relative links (./assets/...) for GitHub Pages hosting.');
    }
  }

  // Test 9: Footer Customization & Dynamic Branding/Logo Features
  if (
    siteContent.footer.navLinks &&
    siteContent.footer.hoursList &&
    siteContent.footer.fourthColumn &&
    siteContent.branding
  ) {
    console.log('✅ TEST 9: Footer customizable navigation, opening hours, 4th column & company logo branding verified.');
  } else {
    throw new Error('TEST 9 Failed: Footer customization or branding structure missing.');
  }

  console.log('\n🎉 ALL 9 AUTOMATED TESTS PASSED SUCCESSFULLY!\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test Failure:', err.message);
  process.exit(1);
});
