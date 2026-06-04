#!/usr/bin/env node
/**
 * Optimizes public SVG assets used on the home LCP path (SVGO only).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('public');
const jobTypeSvg = path.join(publicDir, 'job-type-background.svg');
const emptyTypeSvg = path.join(publicDir, 'empty-type.svg');

function runSvgo(files) {
  const existing = files.filter((file) => fs.existsSync(file));
  if (existing.length === 0) {
    return;
  }

  try {
    execSync(`npx --yes svgo ${existing.map((f) => JSON.stringify(f)).join(' ')}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.warn('optimize-public-images: SVGO skipped —', error instanceof Error ? error.message : error);
  }
}

runSvgo([jobTypeSvg, emptyTypeSvg]);
