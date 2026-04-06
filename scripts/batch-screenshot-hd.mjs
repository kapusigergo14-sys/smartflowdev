// Generate both thumbnail (600w) and HD (1280w) screenshots for popup preview
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readdirSync, unlinkSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PREVIEWS = resolve(__dirname, '../public/style-previews');
const OUT_THUMB = resolve(__dirname, '../public/styles');
const OUT_HD = resolve(__dirname, '../public/styles/hd');

if (!existsSync(OUT_HD)) mkdirSync(OUT_HD, { recursive: true });

async function main() {
  const files = readdirSync(PREVIEWS).filter(f => f.endsWith('.html'));
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  for (const file of files) {
    const slug = basename(file, '.html');
    const page = await ctx.newPage();
    const url = `file:///${resolve(PREVIEWS, file).replace(/\\/g, '/')}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1500);
      const raw = resolve(OUT_THUMB, `${slug}-raw.png`);
      await page.screenshot({ path: raw, fullPage: false });
      // Thumbnail 600w
      await sharp(raw).resize({ width: 600 }).webp({ quality: 82 }).toFile(resolve(OUT_THUMB, `${slug}.webp`));
      // HD 1280w for popup
      await sharp(raw).resize({ width: 1280 }).webp({ quality: 88 }).toFile(resolve(OUT_HD, `${slug}.webp`));
      unlinkSync(raw);
      console.log(`✓ ${slug}`);
    } catch (e) { console.error(`✗ ${slug}: ${e.message?.slice(0,60)}`); }
    await page.close();
  }
  await browser.close();
  console.log(`\nDone! ${files.length} styles (thumb + HD)`);
}
main().catch(e => { console.error(e); process.exit(1); });
