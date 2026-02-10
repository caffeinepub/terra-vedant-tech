import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Preflight script to verify all referenced static assets exist before production build.
 * This prevents 404s in production by catching missing assets early.
 */

const REQUIRED_ASSETS = [
  // Header logo
  'IMG-20260210-WA0045-4.jpg',
  // Generated assets
  'generated/terra-vedant-logo.dim_128x128.png',
  'generated/terra-vedant-logo.dim_512x512.png',
  'generated/terra-vedant-tech-hero-bg.dim_1600x900.png',
];

const PUBLIC_DIR = join(process.cwd(), 'frontend', 'public', 'assets');

let hasErrors = false;

console.log('🔍 Verifying static assets...\n');

for (const asset of REQUIRED_ASSETS) {
  const assetPath = join(PUBLIC_DIR, asset);
  const exists = existsSync(assetPath);
  
  if (exists) {
    console.log(`✅ ${asset}`);
  } else {
    console.error(`❌ MISSING: ${asset}`);
    console.error(`   Expected at: ${assetPath}`);
    hasErrors = true;
  }
}

console.log('');

if (hasErrors) {
  console.error('❌ Asset verification failed. Please ensure all required assets exist in frontend/public/assets/');
  process.exit(1);
} else {
  console.log('✅ All assets verified successfully!');
  process.exit(0);
}
