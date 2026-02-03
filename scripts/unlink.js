#!/usr/bin/env node

/**
 * Script to unlink react-datatable package from the application
 * This restores the local import in App.jsx
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const reactDatatableDir = join(rootDir, 'react-datatable');
const applicationDir = join(rootDir, 'application');
const appJsxPath = join(applicationDir, 'src', 'App.jsx');

console.log('🔓 Unlinking react-datatable from application...\n');

try {
  // Step 1: Unlink the package in application
  console.log('🔓 Unlinking package from application...');
  try {
    execSync('npm unlink @xinosolutions/react-datatable', {
      cwd: applicationDir,
      stdio: 'inherit'
    });
  } catch (error) {
    // Ignore if already unlinked
    console.log('⚠️  Package may already be unlinked or not found');
  }

  // Step 2: Reinstall the package from npm (if it exists in package.json)
  console.log('\n📦 Reinstalling package from npm...');
  try {
    execSync('npm install', {
      cwd: applicationDir,
      stdio: 'inherit'
    });
  } catch (error) {
    console.log('⚠️  Could not reinstall package, continuing...');
  }

  // Step 3: Update App.jsx to use local import
  console.log('\n📝 Updating App.jsx to use local import...');
  let appJsxContent = readFileSync(appJsxPath, 'utf8');
  
  // Comment out package import
  appJsxContent = appJsxContent.replace(
    /^import\s+\{\s*DataTable\s*\}\s+from\s+["']@xinosolutions\/react-datatable["'];?$/m,
    "// import { DataTable } from '@xinosolutions/react-datatable';"
  );
  
  // Uncomment local import
  appJsxContent = appJsxContent.replace(
    /^\/\/\s*import\s+\{\s*DataTable\s*\}\s+from\s+["']\.\/RactDataTable["'];?$/m,
    "import { DataTable } from './RactDataTable';"
  );

  writeFileSync(appJsxPath, appJsxContent, 'utf8');

  console.log('\n✅ Successfully unlinked react-datatable from application!');
  console.log('📝 App.jsx has been updated to use local import.');
  console.log('\n💡 To link again, run: npm run link (from root) or node scripts/link.js');
} catch (error) {
  console.error('\n❌ Error unlinking package:', error.message);
  process.exit(1);
}
