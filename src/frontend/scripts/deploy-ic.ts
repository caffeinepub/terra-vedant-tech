import { execSync } from 'child_process';
import { resolve } from 'path';

/**
 * Repeatable IC mainnet deployment script
 * 
 * This script performs a complete production deployment to Internet Computer mainnet:
 * 1. Runs preflight checks (TypeScript + asset verification)
 * 2. Builds the frontend for production
 * 3. Deploys to IC mainnet using dfx
 * 
 * The script exits with non-zero code if any step fails, making it safe to re-run
 * after fixing errors without requiring manual code edits.
 * 
 * Usage: npx tsx frontend/scripts/deploy-ic.ts
 */

console.log('🚀 Starting IC Mainnet Deployment\n');
console.log('═'.repeat(60));
console.log('');

const rootDir = process.cwd();
const frontendDir = resolve(rootDir, 'frontend');

/**
 * Execute a command and exit on failure
 */
function runStep(stepName: string, command: string, cwd: string = rootDir) {
  console.log(`\n📦 ${stepName}...`);
  console.log(`   Command: ${command}`);
  console.log(`   Working directory: ${cwd}`);
  console.log('');
  
  try {
    execSync(command, {
      cwd,
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    console.log(`\n✅ ${stepName} completed successfully\n`);
  } catch (error) {
    console.error(`\n❌ ${stepName} FAILED`);
    console.error(`   The deployment has been stopped.`);
    console.error(`   Review the error output above and fix the issue.`);
    console.error(`   Then re-run: npx tsx frontend/scripts/deploy-ic.ts\n`);
    process.exit(1);
  }
}

// Step 1: Preflight checks
console.log('STEP 1: PREFLIGHT CHECKS');
console.log('─'.repeat(60));
runStep(
  'Preflight checks (TypeScript + Assets)',
  'npx tsx frontend/scripts/preflight-production.ts',
  rootDir
);

// Step 2: Frontend build
console.log('STEP 2: FRONTEND BUILD');
console.log('─'.repeat(60));
runStep(
  'Frontend production build',
  'pnpm run build:skip-bindings',
  frontendDir
);

// Step 3: IC deployment
console.log('STEP 3: IC MAINNET DEPLOYMENT');
console.log('─'.repeat(60));
runStep(
  'Deploy to Internet Computer mainnet',
  'dfx deploy --network ic',
  rootDir
);

// Success
console.log('═'.repeat(60));
console.log('✅ DEPLOYMENT COMPLETED SUCCESSFULLY!');
console.log('');
console.log('Your application has been deployed to IC mainnet.');
console.log('Next steps:');
console.log('1. Verify the deployment by visiting your canister URL');
console.log('2. Test all functionality in production');
console.log('3. Review DEPLOYMENT.md for post-deployment verification checklist');
console.log('');
