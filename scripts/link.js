#!/usr/bin/env node

/**
 * Script to link react-datatable package locally to the application
 * This allows testing the package during development
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync, mkdirSync, copyFileSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const reactDatatableDir = join(rootDir, 'react-datatable');
const applicationDir = join(rootDir, 'application');
const appJsxPath = join(applicationDir, 'src', 'App.jsx');
const sourceDir = join(applicationDir, 'src', 'RactDataTable');
const targetDir = join(reactDatatableDir, 'src', 'RactDataTable');

/**
 * Recursively copy files from source to destination
 */
function copyRecursiveSync(src, dest) {
  const exists = existsSync(src);
  const stats = exists && statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        join(src, childItemName),
        join(dest, childItemName)
      );
    });
  } else {
    copyFileSync(src, dest);
  }
}

console.log('🔗 Linking react-datatable to application...\n');

try {
  // Step 1: Copy files from application to react-datatable
  console.log('📋 Step 1: Copying files from application to react-datatable...');
  
  if (!existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  // Remove target directory if it exists
  if (existsSync(targetDir)) {
    console.log('🗑️  Removing existing target directory...');
    rmSync(targetDir, { recursive: true, force: true });
  }

  // Create target directory and copy files
  mkdirSync(targetDir, { recursive: true });
  console.log(`📁 Copying from: ${sourceDir}`);
  console.log(`📁 Copying to: ${targetDir}`);
  copyRecursiveSync(sourceDir, targetDir);
  console.log('✅ Files copied successfully!');

  // Step 2: Clean build directory before building
  const buildDir = join(reactDatatableDir, 'build');
  if (existsSync(buildDir)) {
    console.log('\n🗑️  Step 2: Cleaning previous build directory...');
    rmSync(buildDir, { recursive: true, force: true });
    console.log('✅ Build directory cleaned!');
  }

  // Step 3: Build the react-datatable package
  console.log('\n📦 Step 3: Building react-datatable package...');
  execSync('npm run build', {
    cwd: reactDatatableDir,
    stdio: 'inherit'
  });

  // Verify build was created
  const buildFile = join(buildDir, 'index.js');
  if (!existsSync(buildFile)) {
    throw new Error('Build file not found after build. Build may have failed.');
  }
  const buildStats = statSync(buildFile);
  console.log(`✅ Build verified! File size: ${(buildStats.size / 1024).toFixed(2)} KB`);
  console.log(`   Build time: ${buildStats.mtime.toLocaleString()}`);

  // Step 4: Unlink existing link if it exists (to ensure fresh link)
  console.log('\n🔓 Step 4: Unlinking existing package link (if any)...');
  try {
    execSync('npm unlink @xinosolutions/react-datatable', {
      cwd: applicationDir,
      stdio: 'pipe' // Use pipe to suppress errors if not linked
    });
  } catch (error) {
    // Ignore if not linked
  }

  // Step 5: Create global link in react-datatable
  console.log('\n🔗 Step 5: Creating global link for react-datatable...');
  try {
    execSync('npm unlink', {
      cwd: reactDatatableDir,
      stdio: 'pipe' // Use pipe to suppress errors if not linked
    });
  } catch (error) {
    // Ignore if not linked
  }
  execSync('npm link', {
    cwd: reactDatatableDir,
    stdio: 'inherit'
  });

  // Step 6: Link the package in application
  console.log('\n🔗 Step 6: Linking package in application...');
  execSync('npm link @xinosolutions/react-datatable', {
    cwd: applicationDir,
    stdio: 'inherit'
  });

  // Step 7: Update App.jsx to use the linked package
  console.log('\n📝 Updating App.jsx to use linked package...');
  let appJsxContent = readFileSync(appJsxPath, 'utf8');
  
  // Comment out local import
  appJsxContent = appJsxContent.replace(
    /^import\s+\{\s*DataTable\s*\}\s+from\s+["']\.\/RactDataTable["'];?$/m,
    "// import { DataTable } from './RactDataTable';"
  );
  
  // Uncomment the package import
  appJsxContent = appJsxContent.replace(
    /^\/\/\s*import\s+\{\s*DataTable\s*\}\s+from\s+["']@xinosolutions\/react-datatable["'];?$/m,
    "import { DataTable } from '@xinosolutions/react-datatable';"
  );

  writeFileSync(appJsxPath, appJsxContent, 'utf8');

  console.log('\n✅ Successfully linked react-datatable to application!');
  console.log('📝 App.jsx has been updated to use the linked package.');
  console.log('\n⚠️  IMPORTANT: If your dev server is running, please restart it to see the changes!');
  console.log('   (Stop the server with Ctrl+C and run: npm run dev)');
  console.log('\n💡 To unlink, run: npm run unlink (from root) or node scripts/unlink.js');
} catch (error) {
  console.error('\n❌ Error linking package:', error.message);
  process.exit(1);
}
