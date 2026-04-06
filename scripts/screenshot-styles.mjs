// Screenshot 12 designmd.app style previews for the "Pick your style" gallery
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/styles');

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

// Conservative, professional styles that dental/legal/roofing/plumbing/auto clients would pick
const STYLES = [
  { slug: 'swiss-modern',     url: 'https://designmd.app/en/library/swiss-modern',             name: 'Swiss Modern',        desc: 'Clean, minimal, Bauhaus-inspired',             tags: 'law · finance · medical' },
  { slug: 'flat-corporate',   url: 'https://designmd.app/en/library/flat-design-corporativo',  name: 'Flat Corporate',      desc: 'Professional corporate flat design',            tags: 'real estate · insurance · B2B' },
  { slug: 'luxury-type',      url: 'https://designmd.app/en/library/luxury-typography',        name: 'Luxury Typography',   desc: 'Elegant serif-driven editorial layout',         tags: 'dental · hotel · boutique' },
  { slug: 'aurora-ui',        url: 'https://designmd.app/en/library/aurora-ui',                name: 'Aurora',              desc: 'Soft gradients, modern and warm',               tags: 'dental · wellness · spa' },
  { slug: 'art-nouveau',      url: 'https://designmd.app/en/library/art-nouveau',              name: 'Art Nouveau',         desc: 'Elegant organic flowing forms',                 tags: 'bakery · florist · salon' },
  { slug: 'hero-centric',     url: 'https://designmd.app/en/library/hero-centric-design',      name: 'Hero Centric',        desc: 'Bold hero-first, image-driven layout',          tags: 'roofing · construction · auto' },
  { slug: 'conversion',       url: 'https://designmd.app/en/library/conversion-optimized',     name: 'Conversion Pro',      desc: 'CTA-heavy, built for lead generation',          tags: 'plumbing · HVAC · electrical' },
  { slug: 'feature-rich',     url: 'https://designmd.app/en/library/feature-rich-showcase',    name: 'Feature Showcase',    desc: 'Service-rich layout with clear sections',       tags: 'dental · medical · chiropractic' },
  { slug: 'paper-ink',        url: 'https://designmd.app/en/library/paper-ink',                name: 'Paper & Ink',         desc: 'Warm editorial, newspaper-inspired',            tags: 'law · accounting · consulting' },
  { slug: 'terminal-green',   url: 'https://designmd.app/en/library/terminal-green',           name: 'Terminal Green',      desc: 'Developer-focused dark terminal',               tags: 'tech · dev agency · SaaS' },
  { slug: 'minimalism',       url: 'https://designmd.app/en/library/minimalism-swiss-style',   name: 'Minimalism',          desc: 'Ultra-clean whitespace-first design',           tags: 'dental · law · medical' },
  { slug: 'neoplastic',       url: 'https://designmd.app/en/library/neoplastic',               name: 'Neoplastic',          desc: 'Mondrian-inspired geometric blocks',            tags: 'architecture · design · gallery' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });

  for (const style of STYLES) {
    try {
      const page = await context.newPage();
      await page.goto(style.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // let animations settle

      // Screenshot the page
      const rawPath = resolve(OUT, `${style.slug}-raw.png`);
      await page.screenshot({ path: rawPath, fullPage: false });
      await page.close();

      // Optimize to WebP
      const webpPath = resolve(OUT, `${style.slug}.webp`);
      await sharp(rawPath)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(webpPath);

      // Cleanup raw
      const fs = await import('node:fs');
      fs.unlinkSync(rawPath);

      console.log(`✓ ${style.slug} (${style.name})`);
    } catch (err) {
      console.error(`✗ ${style.slug}: ${err.message?.slice(0, 80)}`);
    }
  }

  await browser.close();
  console.log(`\nDone! ${STYLES.length} styles → public/styles/`);

  // Write manifest
  const fs = await import('node:fs');
  fs.writeFileSync(resolve(OUT, 'manifest.json'), JSON.stringify(STYLES.map(s => ({
    slug: s.slug,
    name: s.name,
    desc: s.desc,
    tags: s.tags,
    src: `/styles/${s.slug}.webp`,
  })), null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
