#!/usr/bin/env node

/**
 * Script to copy files from application/src/RactDataTable to react-datatable/src/RactDataTable
 * Usage: node scripts/copy-files.js
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../../application/src/RactDataTable');
const targetDir = path.join(__dirname, '../src/RactDataTable');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  try {
    // Check if source directory exists
    if (!fs.existsSync(sourceDir)) {
      console.error(`❌ Source directory not found: ${sourceDir}`);
      console.error('Please ensure you are running this from the react-datatable directory');
      process.exit(1);
    }

    // Remove target directory if it exists
    if (fs.existsSync(targetDir)) {
      console.log(`🗑️  Removing existing target directory: ${targetDir}`);
      fs.rmSync(targetDir, { recursive: true, force: true });
    }

    // Create target directory
    fs.mkdirSync(targetDir, { recursive: true });

    // Copy files
    console.log(`📁 Copying files from: ${sourceDir}`);
    console.log(`📁 To: ${targetDir}`);
    copyRecursiveSync(sourceDir, targetDir);

    console.log('✅ Files copied successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review the copied files');
    console.log('   2. Run: npm run build');
    console.log('   3. Test the build');
    console.log('   4. Update version in package.json');
    console.log('   5. Run: npm publish --access public');
  } catch (error) {
    console.error('❌ Error copying files:', error.message);
    process.exit(1);
  }
}

main();
