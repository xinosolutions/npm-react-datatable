#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const pkg = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'),
);

console.log(`Linking ${pkg.name} (build + npm link)...\n`);

execSync('npm run build:local', { cwd: rootDir, stdio: 'inherit' });

try {
  execSync('npm unlink', { cwd: rootDir, stdio: 'pipe' });
} catch {
  // no prior link
}

execSync('npm link', { cwd: rootDir, stdio: 'inherit' });

console.log(`
Registered global link for ${pkg.name}.

In your consumer app directory:

  npm link ${pkg.name}

Restart the consumer dev server after linking.
`);
