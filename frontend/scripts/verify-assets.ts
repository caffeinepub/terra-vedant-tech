import { existsSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Preflight script to verify all referenced static assets exist before production build.
 * This prevents 404s in production by catching missing assets early.
 * 
 * Checks assets referenced in:
 * - frontend/src/content/brandAssets.ts (header logo, generated logos, hero background)
 * 
 * Usage: npx tsx frontend/scripts/verify-assets.ts
 */

const REQUIRED_ASSETS = [
  // Header logo (from brandAssets.ts)
  'IMG-20260210-WA0045-4.jpg',
  // Generated logos (from brandAssets.ts)
  'generated/terra-vedant-logo.dim_128x128.png',
  'generated/terra-vedant-logo.dim_512x512.png',
  // Hero background (from brandAssets.ts)
  'generated/terra-vedant-tech-hero-bg.dim_1600x900.png',
];

const PUBLIC_DIR = resolve(process.cwd(), 'frontend', 'public', 'assets');

let hasErrors = false;

console.log('🔍 Verifying static assets...');
console.log(`   Assets directory: ${PUBLIC_DIR}\n`);

for (const asset of REQUIRED_ASSETS) {
  const assetPath = join(PUBLIC_DIR, asset);
  const exists = existsSync(assetPath);
  
  if (exists) {
    console.log(`   ✅ ${asset}`);
  } else {
    console.error(`   ❌ MISSING: ${asset}`);
    console.error(`      Expected at: ${assetPath}`);
    hasErrors = true;
  }
}

console.log('');

if (hasErrors) {
  console.error('❌ Asset verification failed');
  console.error('   Missing assets detected. Please ensure all required assets exist.');
  console.error('   Check that files are in: frontend/public/assets/');
  console.error('   Generated assets should be in: frontend/public/assets/generated/\n');
  process.exit(1);
} else {
  console.log('✅ All required static assets verified successfully!');
  process.exit(0);
}
