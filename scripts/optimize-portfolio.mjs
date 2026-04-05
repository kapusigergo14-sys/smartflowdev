// One-time optimizer: reads 8 curated before/after PNG pairs from leadgen/output/redesigns,
// produces WebP files in public/portfolio/ + manifest.json with blurDataURLs.
import sharp from 'sharp';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REDESIGNS = resolve(__dirname, '../../leadgen/output/redesigns');
const OUT = resolve(__dirname, '../public/portfolio');

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const PAIRS = [
  { slug: 'dentist-leeds', folder: 'dentist-leeds' },
  { slug: 'attari-law', folder: 'attari-law-solicitors' },
  { slug: 'all-smiles', folder: 'all-smiles-dental' },
  { slug: 'whitechapel', folder: 'dental-implant-surgery-in-whitechapel-london' },
  { slug: 'criminal-qld', folder: 'criminal-lawyer-solicitor-queensland' },
  { slug: 'brite-care', folder: 'brite-care-dental-practice' },
  { slug: 'chesterfield', folder: 'chesterfield-road-dental-practice' },
  { slug: 'fallowfield', folder: 'dentist-in-fallowfield' },
];

async function optimize(inputPath, outputPath) {
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

async function makeBlur(inputPath) {
  const buf = await sharp(inputPath).resize(10).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function main() {
  const manifest = [];
  for (const pair of PAIRS) {
    const folder = resolve(REDESIGNS, pair.folder);
    const beforeIn = resolve(folder, 'current-site.png');
    const afterIn = resolve(folder, 'a-desktop.png');
    if (!existsSync(beforeIn)) { console.warn(`skip ${pair.slug}: missing ${beforeIn}`); continue; }
    if (!existsSync(afterIn)) { console.warn(`skip ${pair.slug}: missing ${afterIn}`); continue; }

    const beforeOut = resolve(OUT, `${pair.slug}-before.webp`);
    const afterOut = resolve(OUT, `${pair.slug}-after.webp`);
    await optimize(beforeIn, beforeOut);
    await optimize(afterIn, afterOut);

    const blurDataURL = await makeBlur(beforeIn);
    manifest.push({
      slug: pair.slug,
      beforeSrc: `/portfolio/${pair.slug}-before.webp`,
      afterSrc: `/portfolio/${pair.slug}-after.webp`,
      blurDataURL,
    });
    console.log(`✓ ${pair.slug}`);
  }
  writeFileSync(resolve(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\n${manifest.length} pairs optimized → public/portfolio/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
