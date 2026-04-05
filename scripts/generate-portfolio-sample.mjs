// Generate a single portfolio sample: scrape + render template A for a given URL
// Usage: node scripts/generate-portfolio-sample.mjs --url https://example.com --slug sample-1 --industry Legal
import { spawn } from 'node:child_process';
import { mkdirSync, existsSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LEADGEN = resolve(__dirname, '../../leadgen');
const OUT = resolve(__dirname, '../public/portfolio');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { url: '', slug: '', industry: 'Legal' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) out.url = args[i + 1];
    if (args[i] === '--slug' && args[i + 1]) out.slug = args[i + 1];
    if (args[i] === '--industry' && args[i + 1]) out.industry = args[i + 1];
  }
  return out;
}

async function main() {
  const { url, slug, industry } = parseArgs();
  if (!url || !slug) {
    console.error('Usage: --url <url> --slug <slug> [--industry Dental|Legal|Roofing|...]');
    process.exit(1);
  }

  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

  console.log(`\n[1/2] Running leadgen pipeline for ${url}...`);
  // Create temp lead JSON
  const leadJson = {
    source: 'portfolio-sample',
    date: new Date().toISOString().slice(0, 10),
    leads: [
      {
        name: slug,
        website: url,
        contactUrl: url,
        country: 'Unknown',
        industry,
        email: 'test@example.com',
      },
    ],
  };
  const tmpLead = resolve(LEADGEN, `output/leads/_portfolio-${slug}.json`);
  writeFileSync(tmpLead, JSON.stringify(leadJson, null, 2));

  // Run pipeline in dry-run mode (PDFs generated, NO email sent)
  const pipeline = spawn('npx', ['ts-node', 'scripts/process-chatgpt-list.ts', '--file', tmpLead, '--dry-run', '--no-score'], {
    cwd: LEADGEN,
    shell: true,
    stdio: 'inherit',
  });

  await new Promise((resolve, reject) => {
    pipeline.on('close', (code) => code === 0 ? resolve() : reject(new Error('pipeline failed')));
  });

  console.log('\n[2/2] Pipeline done. Check output/redesigns/ for screenshots.');
  console.log(`    Manually optimize the best screenshot with sharp.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
