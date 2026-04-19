/**
 * audit.ts — Orchestrator for the website audit pipeline.
 *
 * runAudit(url) runs all phases in parallel where possible, with per-phase
 * timeouts and graceful degradation. Each phase returns a PhaseResult<T>
 * so the UI can render partial results when something fails.
 */

import { detectChatbot, detectBooking, detectSEO } from './detect';
import { generateSuggestions } from './audit-prompt';
import type {
  AuditResult,
  PhaseResult,
  FetchData,
  ScreenshotData,
  PsiData,
  Suggestion,
} from './audit-types';
import type { DetectionResult, SEOResult } from './detect';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0 Safari/537.36 smartflowdev-audit/1.0';

// ─── URL normalization ───────────────────────────────────────────────────

export function normalizeUrl(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  let url = input.trim();

  // Strip leading @, protocol slashes etc.
  url = url.replace(/^@+/, '');

  // Add https:// if no protocol
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const parsed = new URL(url);
    // Allow only http/https
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    // Disallow localhost / IPs / internal
    const host = parsed.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') return null;
    if (host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.')) return null;
    if (!host.includes('.')) return null; // must have a TLD
    return parsed.toString();
  } catch {
    return null;
  }
}

// ─── Phase helpers ───────────────────────────────────────────────────────

function success<T>(data: T, startedAt: number): PhaseResult<T> {
  return { status: 'success', data, error: null, durationMs: Date.now() - startedAt };
}

function failed<T>(error: string, startedAt: number): PhaseResult<T> {
  return { status: 'failed', data: null, error, durationMs: Date.now() - startedAt };
}

function skipped<T>(reason: string): PhaseResult<T> {
  return { status: 'skipped', data: null, error: reason, durationMs: 0 };
}

async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

// ─── Phase: fetch HTML ───────────────────────────────────────────────────

async function fetchPhase(url: string): Promise<PhaseResult<FetchData>> {
  const startedAt = Date.now();
  try {
    const res = await withTimeout(
      fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        redirect: 'follow',
      }),
      10_000,
      'fetch'
    );

    if (!res.ok) {
      return failed<FetchData>(`Site returned HTTP ${res.status}`, startedAt);
    }

    // Read limited bytes (max 2MB)
    const text = await res.text();
    const truncated = text.slice(0, 2_000_000);

    return success<FetchData>(
      {
        html: truncated,
        finalUrl: res.url,
        statusCode: res.status,
        contentLength: text.length,
      },
      startedAt
    );
  } catch (err: any) {
    const msg = err?.message || String(err);
    // Categorize common errors
    if (/timed out/i.test(msg)) return failed<FetchData>('Site took too long to respond', startedAt);
    if (/certificate/i.test(msg)) return failed<FetchData>('SSL certificate error', startedAt);
    if (/enotfound|getaddrinfo/i.test(msg)) return failed<FetchData>('Domain not found', startedAt);
    if (/econnrefused/i.test(msg)) return failed<FetchData>('Connection refused', startedAt);
    return failed<FetchData>(`Fetch failed: ${msg.slice(0, 100)}`, startedAt);
  }
}

// ─── Phase: PageSpeed Insights ───────────────────────────────────────────

async function psiPhase(url: string, strategy: 'mobile' | 'desktop'): Promise<PhaseResult<PsiData>> {
  const startedAt = Date.now();
  const apiKey =
    process.env.PSI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_PLACES_API_KEY ||
    '';

  if (!apiKey) {
    return skipped<PsiData>('No GOOGLE_API_KEY configured');
  }

  try {
    const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    endpoint.searchParams.set('url', url);
    endpoint.searchParams.set('strategy', strategy);
    endpoint.searchParams.set('category', 'performance');
    endpoint.searchParams.set('key', apiKey);

    // PSI can genuinely take 60-90s on slow sites; keep a tight budget so the
    // overall request fits inside Vercel's 60s Pro limit.
    const res = await withTimeout(fetch(endpoint.toString()), 45_000, `PSI ${strategy}`);
    if (!res.ok) {
      return failed<PsiData>(`PSI API HTTP ${res.status}`, startedAt);
    }

    const data = (await res.json()) as any;
    const lighthouse = data?.lighthouseResult;
    const audits = lighthouse?.audits;
    const score = lighthouse?.categories?.performance?.score;

    if (typeof score !== 'number') {
      return failed<PsiData>('PSI returned no performance score', startedAt);
    }

    const lcpSeconds = audits?.['largest-contentful-paint']?.numericValue
      ? audits['largest-contentful-paint'].numericValue / 1000
      : null;
    const clsScore = audits?.['cumulative-layout-shift']?.numericValue ?? null;
    const tbt = audits?.['total-blocking-time']?.numericValue ?? null;

    return success<PsiData>(
      {
        score: Math.round(score * 100),
        lcpSeconds,
        clsScore,
        tbt,
        strategy,
      },
      startedAt
    );
  } catch (err: any) {
    const msg = err?.message || String(err);
    return failed<PsiData>(`PSI ${strategy} failed: ${msg.slice(0, 100)}`, startedAt);
  }
}

// ─── Phase: screenshot via ScreenshotOne ─────────────────────────────────

async function screenshotPhase(url: string): Promise<PhaseResult<ScreenshotData>> {
  const startedAt = Date.now();
  const apiKey = process.env.SCREENSHOTONE_ACCESS_KEY;

  if (!apiKey) {
    return skipped<ScreenshotData>('No SCREENSHOTONE_ACCESS_KEY configured');
  }

  const buildUrl = (viewport: 'mobile' | 'desktop'): string => {
    const params = new URLSearchParams({
      access_key: apiKey,
      url,
      viewport_width: viewport === 'mobile' ? '390' : '1440',
      viewport_height: viewport === 'mobile' ? '844' : '900',
      device_scale_factor: '2',
      format: 'jpg',
      image_quality: '80',
      block_ads: 'true',
      block_cookie_banners: 'true',
      block_trackers: 'true',
      cache: 'true',
      cache_ttl: '3600',
      response_type: 'by_format',
    });
    return `https://api.screenshotone.com/take?${params.toString()}`;
  };

  try {
    // ScreenshotOne returns the image directly — we just need the URL.
    // The URL IS the image (they serve it directly). We just verify both exist.
    const mobileUrl = buildUrl('mobile');
    const desktopUrl = buildUrl('desktop');

    // Quick HEAD check to both URLs in parallel to catch errors early
    const [mobileCheck, desktopCheck] = await Promise.all([
      withTimeout(fetch(mobileUrl, { method: 'HEAD' }), 20_000, 'screenshot mobile').catch(() => null),
      withTimeout(fetch(desktopUrl, { method: 'HEAD' }), 20_000, 'screenshot desktop').catch(() => null),
    ]);

    const mobileOk = mobileCheck?.ok ?? false;
    const desktopOk = desktopCheck?.ok ?? false;

    if (!mobileOk && !desktopOk) {
      return failed<ScreenshotData>('Both screenshots failed', startedAt);
    }

    return success<ScreenshotData>(
      {
        mobileUrl: mobileOk ? mobileUrl : null,
        desktopUrl: desktopOk ? desktopUrl : null,
      },
      startedAt
    );
  } catch (err: any) {
    return failed<ScreenshotData>(`Screenshot failed: ${err?.message || err}`, startedAt);
  }
}

// ─── Phase: synchronous detections ───────────────────────────────────────

function chatbotPhase(html: string): PhaseResult<DetectionResult> {
  const startedAt = Date.now();
  try {
    const result = detectChatbot(html);
    return success(result, startedAt);
  } catch (err: any) {
    return failed<DetectionResult>(`Chatbot detection error: ${err?.message || err}`, startedAt);
  }
}

function bookingPhase(html: string): PhaseResult<DetectionResult> {
  const startedAt = Date.now();
  try {
    const result = detectBooking(html);
    return success(result, startedAt);
  } catch (err: any) {
    return failed<DetectionResult>(`Booking detection error: ${err?.message || err}`, startedAt);
  }
}

function seoPhase(html: string, finalUrl: string): PhaseResult<SEOResult> {
  const startedAt = Date.now();
  try {
    const result = detectSEO(html, finalUrl);
    return success(result, startedAt);
  } catch (err: any) {
    return failed<SEOResult>(`SEO detection error: ${err?.message || err}`, startedAt);
  }
}

// ─── Score calculation ──────────────────────────────────────────────────

function computeOverallScore(phases: AuditResult['phases']): number {
  let totalPoints = 0;
  let maxPoints = 0;

  // PSI mobile (40 points). If PSI failed/skipped, we don't penalize the site
  // for something we couldn't measure — we remove those points from the max.
  if (phases.psiMobile.status === 'success' && phases.psiMobile.data) {
    totalPoints += (phases.psiMobile.data.score / 100) * 40;
    maxPoints += 40;
  }

  // SEO basics (30 points total)
  if (phases.seo.status === 'success' && phases.seo.data) {
    const seo = phases.seo.data;
    if (seo.https) totalPoints += 12;
    if (seo.viewport) totalPoints += 6;
    if (seo.schema) totalPoints += 6;
    if (seo.ogImage) totalPoints += 4;
    if (seo.favicon) totalPoints += 2;
    maxPoints += 30;
  }

  // Chatbot (15 points — bonus for having one)
  if (phases.chatbot.status === 'success') {
    if (phases.chatbot.data?.found) totalPoints += 15;
    maxPoints += 15;
  }

  // Booking (15 points — bonus for having one)
  if (phases.booking.status === 'success') {
    if (phases.booking.data?.found) totalPoints += 15;
    maxPoints += 15;
  }

  if (maxPoints === 0) return 0;
  return Math.round((totalPoints / maxPoints) * 100);
}

// ─── Main orchestrator ──────────────────────────────────────────────────

export async function runAudit(inputUrl: string): Promise<AuditResult | { error: string }> {
  const normalizedUrl = normalizeUrl(inputUrl);
  if (!normalizedUrl) {
    return { error: 'Invalid URL. Please enter a valid website address.' };
  }

  const totalStartedAt = Date.now();

  // Phase 1: fetch HTML (blocking — everything depends on it)
  const fetchResult = await fetchPhase(normalizedUrl);

  if (fetchResult.status !== 'success' || !fetchResult.data) {
    // Build a minimal error audit result
    return {
      url: normalizedUrl,
      fetchedAt: new Date().toISOString(),
      overallScore: 0,
      phases: {
        fetch: fetchResult,
        screenshot: skipped<ScreenshotData>('Fetch failed'),
        psiMobile: skipped<PsiData>('Fetch failed'),
        psiDesktop: skipped<PsiData>('Fetch failed'),
        chatbot: skipped<DetectionResult>('Fetch failed'),
        booking: skipped<DetectionResult>('Fetch failed'),
        seo: skipped<SEOResult>('Fetch failed'),
        suggestions: skipped<Suggestion[]>('Fetch failed'),
      },
      errors: [fetchResult.error || 'Could not fetch page'],
      totalDurationMs: Date.now() - totalStartedAt,
    };
  }

  const { html, finalUrl } = fetchResult.data;

  // Phase 2: external checks in parallel. PSI mobile is the only PSI call
  // we actually wait for — desktop is skipped for v1 because running both in
  // parallel on a slow site can blow Vercel's 60s request budget.
  const [screenshotResult, psiMobileResult] = await Promise.all([
    screenshotPhase(finalUrl),
    psiPhase(finalUrl, 'mobile'),
  ]);
  const psiDesktopResult: PhaseResult<PsiData> = skipped<PsiData>(
    'Desktop PSI skipped — mobile is the primary signal'
  );

  // Phase 3: synchronous HTML detections
  const chatbotResult = chatbotPhase(html);
  const bookingResult = bookingPhase(html);
  const seoResult = seoPhase(html, finalUrl);

  // Phase 4: AI-powered suggestions (with fallback)
  const suggestionsResult = await (async (): Promise<PhaseResult<Suggestion[]>> => {
    const startedAt = Date.now();
    try {
      const suggestions = await generateSuggestions({
        url: finalUrl,
        chatbot: chatbotResult.data,
        booking: bookingResult.data,
        seo: seoResult.data,
        psiMobile: psiMobileResult.data,
      });
      return success(suggestions, startedAt);
    } catch (err: any) {
      return failed<Suggestion[]>(`Suggestions failed: ${err?.message || err}`, startedAt);
    }
  })();

  const phases: AuditResult['phases'] = {
    fetch: fetchResult,
    screenshot: screenshotResult,
    psiMobile: psiMobileResult,
    psiDesktop: psiDesktopResult,
    chatbot: chatbotResult,
    booking: bookingResult,
    seo: seoResult,
    suggestions: suggestionsResult,
  };

  const overallScore = computeOverallScore(phases);

  const errors: string[] = [];
  for (const [name, phase] of Object.entries(phases)) {
    if (phase.status === 'failed' && phase.error) {
      errors.push(`${name}: ${phase.error}`);
    }
  }

  return {
    url: finalUrl,
    fetchedAt: new Date().toISOString(),
    overallScore,
    phases,
    errors,
    totalDurationMs: Date.now() - totalStartedAt,
  };
}
