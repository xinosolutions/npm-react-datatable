#!/usr/bin/env node

/**
 * Deployment script for react-datatable package
 * This script automates the deployment process
 * Usage: node scripts/deploy.js [version-type]
 * version-type: patch, minor, major (default: patch)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function execCommand(command, options = {}) {
  try {
    console.log(`\n🔧 Running: ${command}`);
    execSync(command, { stdio: 'inherit', ...options });
    return true;
  } catch (error) {
    console.error(`\n❌ Error executing: ${command}`);
    return false;
  }
}

function getCurrentVersion() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

async function main() {
  console.log('🚀 React DataTable Deployment Script\n');
  console.log('=' .repeat(50));

  // Step 1: Copy files
  console.log('\n📋 Step 1: Copying files from application...');
  const copyScript = path.join(__dirname, 'copy-files.js');
  if (!execCommand(`node "${copyScript}"`)) {
    console.error('❌ Failed to copy files. Exiting.');
    process.exit(1);
  }

  // Step 2: Check if build directory exists
  const buildDir = path.join(__dirname, '../build');
  if (fs.existsSync(buildDir)) {
    console.log('\n📋 Step 2: Cleaning previous build...');
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  // Step 3: Build
  console.log('\n📋 Step 2: Building package...');
  if (!execCommand('npm run build', { cwd: path.join(__dirname, '..') })) {
    console.error('❌ Build failed. Exiting.');
    process.exit(1);
  }

  // Step 4: Verify build
  const buildFile = path.join(buildDir, 'index.js');
  if (!fs.existsSync(buildFile)) {
    console.error('❌ Build output not found. Exiting.');
    process.exit(1);
  }
  console.log('✅ Build successful!');

  // Step 5: Version management
  const versionType = process.argv[2] || 'patch';
  const currentVersion = getCurrentVersion();
  console.log(`\n📋 Step 3: Current version: ${currentVersion}`);
  console.log(`📋 Step 3: Version type: ${versionType}`);

  const proceed = await question('\n❓ Do you want to bump the version? (y/n): ');
  let newVersion = currentVersion;
  
  if (proceed.toLowerCase() === 'y') {
    if (!execCommand(`npm version ${versionType}`, { cwd: path.join(__dirname, '..') })) {
      console.error('❌ Version bump failed. Exiting.');
      process.exit(1);
    }
    newVersion = getCurrentVersion();
    console.log(`✅ Version updated to: ${newVersion}`);
  } else {
    console.log(`ℹ️  Keeping current version: ${currentVersion}`);
  }

  // Step 6: Dry run
  console.log('\n📋 Step 4: Running dry-run...');
  const dryRun = await question('❓ Do you want to run npm publish --dry-run? (y/n): ');
  if (dryRun.toLowerCase() === 'y') {
    execCommand('npm publish --dry-run', { cwd: path.join(__dirname, '..') });
  }

  // Step 7: Publish
  console.log('\n📋 Step 5: Publishing to npm...');
  const confirm = await question('❓ Are you logged in to npm? (npm login) (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('⚠️  Please run: npm login');
    console.log('Then run: npm publish --access public');
    rl.close();
    process.exit(0);
  }

  const publish = await question('❓ Ready to publish? (y/n): ');
  if (publish.toLowerCase() !== 'y') {
    console.log('❌ Publishing cancelled.');
    rl.close();
    process.exit(0);
  }

  if (!execCommand('npm publish --access public', { cwd: path.join(__dirname, '..') })) {
    console.error('❌ Publishing failed.');
    rl.close();
    process.exit(1);
  }

  console.log('\n✅ Package published successfully!');
  const publishedVersion = getCurrentVersion();
  console.log(`\n📦 Package: @xinosolutions/react-datatable@${publishedVersion}`);
  console.log('🌐 View at: https://www.npmjs.com/package/@xinosolutions/react-datatable');
  console.log('\n📝 Next steps:');
  console.log('   1. Verify package on npm website');
  console.log('   2. Test installation: npm install @xinosolutions/react-datatable');
  console.log('   3. Update documentation if needed');

  rl.close();
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  rl.close();
  process.exit(1);
});
