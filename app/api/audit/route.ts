/**
 * POST /api/audit
 *
 * Body: { url: string }
 * Returns: AuditResult JSON (or { error } with appropriate status)
 *
 * Features:
 * - IP rate limit: 5 audits / 24h
 * - Per-URL cache: 1h TTL (same URL returns cached result)
 * - URL normalization + validation via runAudit's normalizeUrl
 * - Graceful error mapping to friendly messages
 */

import { NextResponse } from 'next/server';
import { runAudit, normalizeUrl } from '@/lib/audit';
import type { AuditResult } from '@/lib/audit-types';

export const runtime = 'nodejs';
// Allow up to 60s on Vercel Pro. On Hobby plans this is capped at 10s
// so we rely on short per-phase timeouts + ScreenshotOne (no headless browser).
export const maxDuration = 60;

// ─── Rate limit: 5 audits / 24h per IP ──────────────────────────────────

interface RateEntry {
  count: number;
  resetAt: number;
}
const rateLimits = new Map<string, RateEntry>();
const MAX_AUDITS_PER_DAY = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || entry.resetAt < now) {
    const newEntry = { count: 1, resetAt: now + DAY_MS };
    rateLimits.set(ip, newEntry);
    return { allowed: true, remaining: MAX_AUDITS_PER_DAY - 1, resetAt: newEntry.resetAt };
  }

  if (entry.count >= MAX_AUDITS_PER_DAY) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_AUDITS_PER_DAY - entry.count, resetAt: entry.resetAt };
}

// ─── URL cache: 1h TTL ──────────────────────────────────────────────────

interface CacheEntry {
  result: AuditResult;
  cachedAt: number;
}
const auditCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 60 * 1000;

function getCached(url: string): AuditResult | null {
  const entry = auditCache.get(url);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
    auditCache.delete(url);
    return null;
  }
  return entry.result;
}

function setCached(url: string, result: AuditResult): void {
  auditCache.set(url, { result, cachedAt: Date.now() });
  // Opportunistic cleanup: drop expired entries when map grows
  if (auditCache.size > 200) {
    const now = Date.now();
    for (const [k, v] of auditCache.entries()) {
      if (now - v.cachedAt > CACHE_TTL_MS) auditCache.delete(k);
    }
  }
}

// ─── Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  // Parse body
  let body: { url?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body.url !== 'string' || body.url.length === 0 || body.url.length > 2000) {
    return NextResponse.json(
      { error: 'Please provide a valid website URL.' },
      { status: 400 }
    );
  }

  // Normalize before rate-limiting so retries on same URL don't burn quota
  const normalized = normalizeUrl(body.url);
  if (!normalized) {
    return NextResponse.json(
      { error: 'That does not look like a valid website address. Try something like example.com.' },
      { status: 400 }
    );
  }

  // Cache hit: serve without touching rate limit
  const cached = getCached(normalized);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { 'X-Audit-Cache': 'HIT' },
    });
  }

  // Rate limit
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    const hoursLeft = Math.ceil((rl.resetAt - Date.now()) / (60 * 60 * 1000));
    return NextResponse.json(
      {
        error: `You've used your ${MAX_AUDITS_PER_DAY} free audits for today. Come back in ${hoursLeft}h or email us to run more.`,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(MAX_AUDITS_PER_DAY),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(rl.resetAt / 1000)),
        },
      }
    );
  }

  // Run the audit
  try {
    const result = await runAudit(normalized);

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    setCached(normalized, result);

    return NextResponse.json(result, {
      headers: {
        'X-Audit-Cache': 'MISS',
        'X-RateLimit-Limit': String(MAX_AUDITS_PER_DAY),
        'X-RateLimit-Remaining': String(rl.remaining),
        'X-RateLimit-Reset': String(Math.floor(rl.resetAt / 1000)),
      },
    });
  } catch (err: any) {
    console.error('Audit error:', err?.message || err);
    return NextResponse.json(
      { error: 'Something went wrong while auditing. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
