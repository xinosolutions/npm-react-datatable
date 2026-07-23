#!/usr/bin/env node
/**
 * Manual deploy for @xinosolutions/react-datatable
 * Usage: node scripts/deploy.mjs [patch|minor|major]
 * Allow dirty tree: ALLOW_DIRTY=1 npm run deploy
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

function question(rl, query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function execCommand(command, options = {}) {
  try {
    console.log(`\nRunning: ${command}`);
    execSync(command, {
      stdio: 'inherit',
      ...options,
      cwd: options.cwd ?? rootDir,
    });
    return true;
  } catch {
    console.error(`\nError executing: ${command}`);
    return false;
  }
}

function getCurrentVersion() {
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

function assertBuildArtifacts() {
  const buildFile = path.join(rootDir, 'build', 'index.js');
  if (!fs.existsSync(buildFile)) {
    console.error(`Missing build output: ${buildFile}`);
    process.exit(1);
  }
}

function gitWorkingTreeClean() {
  try {
    const out = execSync('git status --porcelain', {
      cwd: rootDir,
      encoding: 'utf8',
    }).trim();
    return out === '';
  } catch {
    return true;
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('@xinosolutions/react-datatable — manual deploy\n');

  if (!process.env.ALLOW_DIRTY && !gitWorkingTreeClean()) {
    console.error(
      'Git working tree is not clean. Commit or stash, or set ALLOW_DIRTY=1.',
    );
    rl.close();
    process.exit(1);
  }

  const buildDir = path.join(rootDir, 'build');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  if (!execCommand('npm run build')) {
    rl.close();
    process.exit(1);
  }
  assertBuildArtifacts();
  console.log('\nBuild OK.');

  const versionType = process.argv[2] || 'patch';
  const currentVersion = getCurrentVersion();
  console.log(`\nCurrent version: ${currentVersion}`);
  console.log(`Default version bump type: ${versionType}`);

  const proceed = await question(rl, '\nBump version? (y/n): ');
  if (proceed.toLowerCase() === 'y') {
    if (!execCommand(`npm version ${versionType}`)) {
      rl.close();
      process.exit(1);
    }
    console.log(`Version is now ${getCurrentVersion()}`);
  } else {
    console.log(`Keeping version: ${getCurrentVersion()}`);
  }

  const dryRun = await question(rl, '\nRun npm publish --dry-run? (y/n): ');
  if (dryRun.toLowerCase() === 'y') {
    execCommand('npm publish --dry-run --access public');
  }

  const loginOk = await question(
    rl,
    '\nLogged in to npm (npm login)? (y/n): ',
  );
  if (loginOk.toLowerCase() !== 'y') {
    console.log('Run: npm login');
    console.log('Then: npm publish --access public');
    rl.close();
    process.exit(0);
  }

  const publish = await question(rl, 'Ready to publish? (y/n): ');
  if (publish.toLowerCase() !== 'y') {
    console.log('Publishing cancelled.');
    rl.close();
    process.exit(0);
  }

  if (!execCommand('npm publish --access public')) {
    rl.close();
    process.exit(1);
  }

  console.log('\nPublish complete.');
  console.log(
    `https://www.npmjs.com/package/@xinosolutions/react-datatable/v/${getCurrentVersion()}`,
  );
  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
