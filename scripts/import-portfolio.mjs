// Import 6 curated portfolio samples from leadgen redesigns, each using a unique template.
import sharp from 'sharp';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REDESIGNS = resolve(__dirname, '../../leadgen/output/redesigns');
const OUT = resolve(__dirname, '../public/portfolio');

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// Each business → a unique template (A-F). No repeats.
const MAPPING = [
  { slug: 'neil-gilbert',   folder: 'neil-gilbert-solicitors',  template: 'a', industry: 'Legal · UK',       title: 'neil-gilbert.webp' },
  { slug: 'girvan-dental',  folder: 'girvan-dental-practice',   template: 'b', industry: 'Dental · UK',      title: 'girvan-dental.webp' },
  { slug: 'hunter-french',  folder: 'home',                     template: 'c', industry: 'Real Estate · AU', title: 'hunter-french.webp' },
  { slug: 'nuova-plumbing', folder: 'nuova-plumbing-ltd',       template: 'd', industry: 'Plumbing · USA',   title: 'nuova-plumbing.webp' },
  { slug: 'burnbank-roofing', folder: 'burnbank-roofing-roofers-ayrshire-roof-repairs-ayr-free-quotations', template: 'e', industry: 'Roofing · UK', title: 'burnbank-roofing.webp' },
  { slug: 'garage-service', folder: 'the-garage',               template: 'f', industry: 'Auto · UK',        title: 'garage-service.webp' },
];

async function optimize(inputPath, outputPath) {
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

async function main() {
  const manifest = [];
  for (const item of MAPPING) {
    const folder = resolve(REDESIGNS, item.folder);
    const beforeIn = resolve(folder, 'current-site.png');
    const afterIn = resolve(folder, `${item.template}-desktop.png`);

    if (!existsSync(beforeIn)) { console.warn(`SKIP ${item.slug}: no current-site.png in ${folder}`); continue; }
    if (!existsSync(afterIn)) { console.warn(`SKIP ${item.slug}: no ${item.template}-desktop.png in ${folder}`); continue; }

    const beforeOut = resolve(OUT, `${item.slug}-before.webp`);
    const afterOut = resolve(OUT, `${item.slug}-after.webp`);
    await optimize(beforeIn, beforeOut);
    await optimize(afterIn, afterOut);

    manifest.push({
      slug: item.slug,
      industry: item.industry,
      filename: item.title,
      template: item.template.toUpperCase(),
      beforeSrc: `/portfolio/${item.slug}-before.webp`,
      afterSrc: `/portfolio/${item.slug}-after.webp`,
    });
    console.log(`✓ ${item.slug} (template ${item.template.toUpperCase()})`);
  }
  writeFileSync(resolve(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\n${manifest.length}/6 pairs optimized → public/portfolio/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
