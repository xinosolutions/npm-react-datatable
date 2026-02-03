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

// Check if the content already has the ES module wrapper (to avoid double-wrapping)
if (content.includes('// ES Module wrapper')) {
  console.log('ℹ️  ES module wrapper already exists, skipping...');
  process.exit(0);
}

// Wrap CommonJS output with ES module exports
// The webpack output uses module.exports, we need to convert it to ES module format
const originalContent = content.trim();

// Create a wrapper that simulates CommonJS and converts to ES modules
// Note: React and ReactDOM are peer dependencies, so require() will be handled by the bundler
const wrappedContent = `// ES Module wrapper for CommonJS build
// Import React and ReactDOM as ES modules (Vite will resolve these)
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Simulate CommonJS environment
const module = { exports: {} };
const exports = module.exports;

// Provide require function for webpack externals (peer dependencies)
// Map to the imported ES modules
function require(name) {
  if (name === 'react') return React;
  if (name === 'react-dom') return ReactDOM;
  // Fallback for browser globals (if needed)
  if (typeof window !== 'undefined') {
    if (name === 'react' && window.React) return window.React;
    if (name === 'react-dom' && window.ReactDOM) return window.ReactDOM;
  }
  throw new Error('Cannot find module: ' + name + '. Make sure React and ReactDOM are installed.');
}

// Execute the webpack bundle (it assigns to module.exports)
${originalContent};

// The webpack output is a function that returns the module
// We need to call it to get the actual exports
const webpackModule = typeof module.exports === 'function' ? module.exports() : module.exports;

// Extract DataTable from the module
const DataTable = webpackModule.DataTable || webpackModule.default || webpackModule;

// Export as ES module
export { DataTable };
export default DataTable;
`;

fs.writeFileSync(buildFile, wrappedContent, 'utf8');
console.log('✅ Post-build export wrapping completed');
