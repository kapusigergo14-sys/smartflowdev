import { chromium } from 'playwright';
import sharp from 'sharp';
import { readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PREVIEWS = resolve(__dirname, '../public/style-previews');
const OUT = resolve(__dirname, '../public/styles');

async function main() {
  const files = readdirSync(PREVIEWS).filter(f => f.endsWith('.html'));
  console.log(`Found ${files.length} HTML previews`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  for (const file of files) {
    const slug = basename(file, '.html');
    const page = await context.newPage();
    const url = `file:///${resolve(PREVIEWS, file).replace(/\\/g, '/')}`;

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1500);

      const rawPath = resolve(OUT, `${slug}-raw.png`);
      await page.screenshot({ path: rawPath, fullPage: false });

      // Optimize to WebP
      await sharp(rawPath)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(resolve(OUT, `${slug}.webp`));

      unlinkSync(rawPath);
      console.log(`✓ ${slug}`);
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message?.slice(0, 80)}`);
    }
    await page.close();
  }

  await browser.close();
  console.log(`\nDone! ${files.length} screenshots → public/styles/`);
}

main().catch(e => { console.error(e); process.exit(1); });
