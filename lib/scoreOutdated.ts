import type { OutdatedScore } from './types';
import { getPsiDetails } from './psi';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function extractHtmlSignals(html: string): {
  signals: {
    wordpress: boolean;
    jquery: boolean;
    brokenBuilder: boolean;
    legacyPages: boolean;
    noViewport: boolean;
  };
  jqueryVersion: string | null;
} {
  const wordpress = /wp-content|wp-includes|wp-json/i.test(html);
  const jquery = /jquery(\.min)?\.js|wp-includes\/js\/jquery/i.test(html);

  // jQuery version detection
  let jqueryVersion: string | null = null;
  const jqPatterns = [
    /jquery(?:[\/\-\.]min)?\.js\?ver=(\d+\.\d+(?:\.\d+)?)/i,
    /jquery[\/\-](\d+\.\d+(?:\.\d+)?)(?:\.min)?\.js/i,
    /jquery\/(\d+\.\d+(?:\.\d+)?)\//i,
  ];
  for (const re of jqPatterns) {
    const m = html.match(re);
    if (m) { jqueryVersion = m[1]; break; }
  }

  const brokenBuilder = /\[\/?et_pb_[a-z_]+\]|\[\/?vc_[a-z_]+\]|\[\/?cs_[a-z_]+\]|WordPress database error|PHP (Warning|Notice|Fatal error)/i.test(html);
  const legacyPages = /href=["'][^"']*\.(html|php|htm)(\?[^"']*)?["']/i.test(html);
  const noViewport = !/name=["']viewport["']/i.test(html);

  return {
    signals: { wordpress, jquery, brokenBuilder, legacyPages, noViewport },
    jqueryVersion,
  };
}

async function checkExposedDirListing(origin: string): Promise<boolean> {
  const paths = [
    '/wp-includes/js/jquery/',
    '/wp-content/uploads/',
    '/wp-includes/js/',
    '/wp-content/plugins/',
  ];
  for (const p of paths) {
    try {
      const res = await fetch(origin + p, {
        headers: { 'User-Agent': UA },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      const text = await res.text();
      if (/<title>Index of \//i.test(text) || /<h1>Index of \//i.test(text)) {
        return true;
      }
    } catch { /* skip */ }
  }
  return false;
}

// Approximate page weight by summing Content-Length of HTML + <script src> + <link href> assets
async function approximatePageWeight(html: string, baseUrl: string): Promise<number | null> {
  const resources = new Set<string>();
  // Scripts
  const scriptMatches = html.matchAll(/<script[^>]*\ssrc=["']([^"']+)["']/gi);
  for (const m of scriptMatches) resources.add(m[1]);
  // Stylesheets
  const linkMatches = html.matchAll(/<link[^>]*\srel=["']stylesheet["'][^>]*\shref=["']([^"']+)["']|<link[^>]*\shref=["']([^"']+)["'][^>]*\srel=["']stylesheet["']/gi);
  for (const m of linkMatches) resources.add(m[1] || m[2]);
  // Images (heuristic first 10)
  const imgMatches = Array.from(html.matchAll(/<img[^>]*\ssrc=["']([^"']+)["']/gi));
  for (const m of imgMatches.slice(0, 10)) resources.add(m[1]);

  let totalBytes = new Blob([html]).size; // HTML itself
  const urls = Array.from(resources).slice(0, 30).map((u) => {
    try { return new URL(u, baseUrl).toString(); } catch { return null; }
  }).filter(Boolean) as string[];

  const results = await Promise.allSettled(
    urls.map(async (u) => {
      try {
        const res = await fetch(u, {
          method: 'HEAD',
          headers: { 'User-Agent': UA },
          signal: AbortSignal.timeout(4000),
        });
        const cl = res.headers.get('content-length');
        return cl ? parseInt(cl, 10) : 0;
      } catch {
        return 0;
      }
    })
  );
  for (const r of results) {
    if (r.status === 'fulfilled' && typeof r.value === 'number') totalBytes += r.value;
  }
  if (totalBytes === 0) return null;
  return Math.round((totalBytes / 1024 / 1024) * 10) / 10;
}

export async function scoreOutdated(
  url: string,
  opts: { skipPsi?: boolean } = {}
): Promise<OutdatedScore> {
  const result: OutdatedScore = {
    score: 0,
    breakdown: '',
    signals: {
      wordpress: false, jquery: false, exposedDirListing: false, brokenBuilder: false,
      legacyPages: false, noViewport: false, psiMobileScore: null,
    },
    observations: {
      jqueryVersion: null, pageWeightMb: null, lcpSeconds: null,
      renderBlockingCount: null, unoptimizedImages: false,
    },
    loadTime: null,
    blocked: false,
  };

  // Normalize URL
  let normalizedUrl = url.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  let html = '';
  try {
    const t0 = Date.now();
    const resp = await fetch(normalizedUrl, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(12000),
      redirect: 'follow',
    });
    result.loadTime = (Date.now() - t0) / 1000;
    if (!resp.ok) {
      result.blocked = true;
      result.error = `HTTP ${resp.status}`;
      return result;
    }
    html = await resp.text();
  } catch (err: any) {
    result.blocked = true;
    result.error = err?.message?.slice(0, 100) || 'fetch_failed';
    return result;
  }

  const { signals: htmlSignals, jqueryVersion } = extractHtmlSignals(html);
  Object.assign(result.signals, htmlSignals);
  result.observations.jqueryVersion = jqueryVersion;

  // Page weight approximation
  try {
    const baseUrl = new URL(normalizedUrl);
    result.observations.pageWeightMb = await approximatePageWeight(html, baseUrl.origin + '/');
    // Exposed directory listing
    result.signals.exposedDirListing = await checkExposedDirListing(baseUrl.origin);
  } catch { /* skip */ }

  // PSI
  if (!opts.skipPsi) {
    const psi = await getPsiDetails(normalizedUrl);
    result.signals.psiMobileScore = psi.score;
    result.observations.lcpSeconds = psi.lcpSeconds;
    result.observations.renderBlockingCount = psi.renderBlockingCount;
    result.observations.unoptimizedImages = psi.unoptimizedImages;
  }

  // Calculate score
  const parts: string[] = [];
  let score = 0;
  if (result.signals.wordpress) { score += 25; parts.push('wp=25'); }
  if (result.signals.jquery) { score += 15; parts.push('jq=15'); }
  if (result.signals.exposedDirListing) { score += 15; parts.push('dir=15'); }
  if (result.signals.brokenBuilder) { score += 20; parts.push('broken=20'); }
  if (result.signals.legacyPages) { score += 10; parts.push('legacy=10'); }
  if (result.signals.noViewport) { score += 10; parts.push('noviewport=10'); }
  if (typeof result.signals.psiMobileScore === 'number') {
    if (result.signals.psiMobileScore < 30) {
      score += 20; parts.push(`psiCritical=20(${result.signals.psiMobileScore})`);
    } else if (result.signals.psiMobileScore < 50) {
      score += 10; parts.push(`psiPoor=10(${result.signals.psiMobileScore})`);
    }
  }
  if (result.loadTime !== null && result.loadTime > 5) {
    score += 10; parts.push(`slow=10(${result.loadTime.toFixed(1)}s)`);
  }
  if (result.observations.pageWeightMb !== null) {
    if (result.observations.pageWeightMb >= 6) {
      score += 15; parts.push(`heavy=15(${result.observations.pageWeightMb}MB)`);
    } else if (result.observations.pageWeightMb >= 4) {
      score += 10; parts.push(`heavy=10(${result.observations.pageWeightMb}MB)`);
    }
  }
  if (result.observations.jqueryVersion && /^1\./.test(result.observations.jqueryVersion)) {
    score += 10; parts.push(`oldJq=10(${result.observations.jqueryVersion})`);
  }
  if (result.observations.renderBlockingCount !== null && result.observations.renderBlockingCount >= 5) {
    score += 5; parts.push(`blocking=5(${result.observations.renderBlockingCount})`);
  }
  if (result.observations.lcpSeconds !== null && result.observations.lcpSeconds >= 4) {
    score += 10; parts.push(`slowLcp=10(${result.observations.lcpSeconds}s)`);
  }

  result.score = Math.min(100, score);
  result.breakdown = parts.join(';') || 'no_signals';
  return result;
}
