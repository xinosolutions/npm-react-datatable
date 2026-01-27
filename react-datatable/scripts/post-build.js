#!/usr/bin/env node

/**
 * Post-build script to ensure proper exports for ES module compatibility
 * This wraps the webpack output to support both default and named exports
 */

const fs = require('fs');
const path = require('path');

const buildFile = path.join(__dirname, '../build/index.js');

if (!fs.existsSync(buildFile)) {
  console.error('❌ Build file not found:', buildFile);
  process.exit(1);
}

// Read the built file
let content = fs.readFileSync(buildFile, 'utf8');

// The webpack bundle creates a function that returns a module with exports
// We need to wrap it to ensure both default and named exports work
// Extract the module function and wrap it properly

// Check if the content already has the wrapper (to avoid double-wrapping)
if (content.includes('// Support for ES module named imports')) {
  console.log('ℹ️  Export wrapper already exists, skipping...');
  process.exit(0);
}

// Webpack already creates both default and DataTable exports internally
// The webpack runtime function returns an object with __esModule: true, default, and DataTable
// We don't need to modify the output - webpack handles this correctly
// This script is kept for potential future modifications but currently just passes through
const wrappedContent = content.trim();

fs.writeFileSync(buildFile, wrappedContent, 'utf8');
console.log('✅ Post-build export wrapping completed');
