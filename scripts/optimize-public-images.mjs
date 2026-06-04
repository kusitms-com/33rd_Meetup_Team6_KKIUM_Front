#!/usr/bin/env node
/**
 * Optimizes public raster/SVG assets used on the home LCP path.
 * - SVGO for SVGs
 * - Extracts embedded JPEG from job-type-background.svg when present
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const publicDir = path.resolve('public');
const jobTypeSvg = path.join(publicDir, 'job-type-background.svg');
const emptyTypeSvg = path.join(publicDir, 'empty-type.svg');

function runSvgo(files) {
  const existing = files.filter((file) => fs.existsSync(file));
  if (existing.length === 0) {
    return;
  }

  execSync(`npx --yes svgo ${existing.map((f) => JSON.stringify(f)).join(' ')}`, {
    stdio: 'inherit',
  });
}

function extractJobTypeTexture() {
  if (!fs.existsSync(jobTypeSvg)) {
    return;
  }

  const svg = fs.readFileSync(jobTypeSvg, 'utf8');
  const match = svg.match(/xlink:href="data:image\/jpeg;base64,([^"]+)"/);
  if (!match) {
    console.log('optimize-public-images: no embedded JPEG in job-type-background.svg');
    return;
  }

  const texturePath = path.join(
    os.tmpdir(),
    `kkium-job-type-texture-${process.pid}.jpg`,
  );
  const optPath = path.join(publicDir, 'job-type-background-opt.jpg');

  try {
    fs.writeFileSync(texturePath, Buffer.from(match[1], 'base64'));
    execSync(
      `sips -Z 400 -s format jpeg -s formatOptions 55 ${JSON.stringify(texturePath)} --out ${JSON.stringify(optPath)}`,
      { stdio: 'inherit' },
    );
    console.log('optimize-public-images: wrote job-type-background-opt.jpg');
  } finally {
    fs.rmSync(texturePath, { force: true });
  }
}

runSvgo([jobTypeSvg, emptyTypeSvg]);
extractJobTypeTexture();
