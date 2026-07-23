#!/usr/bin/env node

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

execSync('npm unlink', { cwd: rootDir, stdio: 'inherit' });
console.log('Removed global npm link for @xinosolutions/react-datatable.');
