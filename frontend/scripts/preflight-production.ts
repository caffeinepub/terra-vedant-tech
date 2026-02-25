import { execSync } from 'child_process';
import { resolve } from 'path';

/**
 * Production preflight runner that executes all pre-deployment checks:
 * 1. TypeScript compilation (no emit)
 * 2. Static asset verification
 * 
 * Exits with code 0 only when all checks pass, code 1 if any check fails.
 * 
 * Usage: npx tsx frontend/scripts/preflight-production.ts
 */

console.log('🚀 Running production preflight checks...\n');
console.log('Working directory:', process.cwd());
console.log('');

let hasErrors = false;

// Check 1: TypeScript compilation
console.log('📝 Step 1: TypeScript compilation check...');
try {
  const frontendDir = resolve(process.cwd(), 'frontend');
  execSync('npx tsc --noEmit', { 
    cwd: frontendDir,
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  console.log('✅ TypeScript compilation passed\n');
} catch (error) {
  console.error('❌ TypeScript compilation failed');
  console.error('   Fix all TypeScript errors before deploying to production.\n');
  hasErrors = true;
}

// Check 2: Static asset verification
console.log('🔍 Step 2: Static asset verification...');
try {
  execSync('npx tsx frontend/scripts/verify-assets.ts', { 
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  console.log(''); // verify-assets.ts already prints success message
} catch (error) {
  console.error('❌ Asset verification failed');
  console.error('   Ensure all required assets exist in frontend/public/assets/\n');
  hasErrors = true;
}

// Final result
console.log('═'.repeat(60));
if (hasErrors) {
  console.error('❌ PRODUCTION PREFLIGHT CHECKS FAILED');
  console.error('   Please fix the errors above before deploying to production.');
  console.error('   Review DEPLOYMENT.md for troubleshooting guidance.\n');
  process.exit(1);
} else {
  console.log('✅ ALL PRODUCTION PREFLIGHT CHECKS PASSED');
  console.log('   Your application is ready for production deployment!');
  console.log('');
  console.log('   Recommended next step:');
  console.log('   Run the automated deployment script:');
  console.log('   → npx tsx frontend/scripts/deploy-ic.ts');
  console.log('');
  console.log('   Or deploy manually:');
  console.log('   1. cd frontend && pnpm run build:skip-bindings');
  console.log('   2. dfx deploy --network ic\n');
  process.exit(0);
}
