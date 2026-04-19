/**
 * detect.ts — Website technology detectors for the audit tool
 *
 * Pure functions: HTML string → DetectionResult. No I/O, no side effects.
 * Designed for HIGH accuracy — multi-signal confirmation, anti-false-positive.
 *
 * Usage:
 *   const chatbot = detectChatbot(html);
 *   if (chatbot.found) console.log(`Has ${chatbot.vendor} (${chatbot.confidence})`);
 */

export type Confidence = 'high' | 'medium' | 'low';

export interface DetectionResult {
  found: boolean;
  vendor: string | null;
  confidence: Confidence;
  evidence: string[]; // strings that matched (for debugging / display)
}

export interface SEOResult {
  https: boolean;
  viewport: boolean;
  schema: boolean;
  ogImage: boolean;
  favicon: boolean;
  language: string | null;
  title: string | null;
  description: string | null;
}

// ─── Vendor signature library ─────────────────────────────────────────────
//
// Each vendor has a set of signals. Minimum 1 signal = low confidence.
// 2+ signals = high confidence. Designed to match on <script src> patterns
// or known JS globals, NOT on prose/blog text.

interface VendorSignature {
  name: string;
  // Patterns that should appear in <script src="..."> attributes
  scriptSrcPatterns: RegExp[];
  // Patterns that should appear elsewhere (inline scripts, settings, etc.)
  auxiliaryPatterns?: RegExp[];
}

const CHATBOT_VENDORS: VendorSignature[] = [
  {
    name: 'Intercom',
    scriptSrcPatterns: [/widget\.intercom\.io/i, /js\.intercomcdn\.com/i],
    auxiliaryPatterns: [/intercomSettings/i, /Intercom\(['"]/i],
  },
  {
    name: 'Drift',
    scriptSrcPatterns: [/js\.driftt\.com/i, /drift\.com\/embed/i],
    auxiliaryPatterns: [/drift\.load/i, /driftt\.chat/i],
  },
  {
    name: 'Tidio',
    scriptSrcPatterns: [/code\.tidio\.co/i],
    auxiliaryPatterns: [/tidioIdentify/i, /tidioChatApi/i],
  },
  {
    name: 'Crisp',
    scriptSrcPatterns: [/client\.crisp\.chat/i],
    auxiliaryPatterns: [/\$crisp/i, /CRISP_WEBSITE_ID/i],
  },
  {
    name: 'Tawk.to',
    scriptSrcPatterns: [/embed\.tawk\.to/i],
    auxiliaryPatterns: [/Tawk_API/i],
  },
  {
    name: 'Zendesk Chat',
    scriptSrcPatterns: [/static\.zdassets\.com.*web_widget/i, /assets\.zendesk\.com/i],
    auxiliaryPatterns: [/zE\(/i, /zEmbed/i],
  },
  {
    name: 'HubSpot Chat',
    scriptSrcPatterns: [/js\.hs-scripts\.com/i, /js\.hs-analytics\.net/i, /js\.usemessages\.com/i],
    auxiliaryPatterns: [/hubspot/i, /_hsq/i],
  },
  {
    name: 'LiveChat',
    scriptSrcPatterns: [/cdn\.livechatinc\.com/i, /static\.livechat\.com/i],
    auxiliaryPatterns: [/LC_API/i, /__lc\./i],
  },
  {
    name: 'Olark',
    scriptSrcPatterns: [/static\.olark\.com/i],
    auxiliaryPatterns: [/olark\(/i],
  },
  {
    name: 'Freshchat',
    scriptSrcPatterns: [/wchat\.freshchat\.com/i, /widget\.freshworks\.com/i],
    auxiliaryPatterns: [/fcWidget/i, /freshchat/i],
  },
  {
    name: 'JivoChat',
    scriptSrcPatterns: [/code\.jivosite\.com/i, /code\.jivo\.ru/i],
    auxiliaryPatterns: [/jivo_api/i],
  },
  {
    name: 'Gorgias',
    scriptSrcPatterns: [/config\.gorgias\.chat/i, /assets\.gorgias\.chat/i],
    auxiliaryPatterns: [/GorgiasChat/i],
  },
  {
    name: 'Chatwoot',
    scriptSrcPatterns: [/chatwoot\.com\/packs/i],
    auxiliaryPatterns: [/chatwootSDK/i],
  },
  {
    name: 'HelpCrunch',
    scriptSrcPatterns: [/embed\.helpcrunch\.com/i],
    auxiliaryPatterns: [/HelpCrunch/i],
  },
  {
    name: 'Userlike',
    scriptSrcPatterns: [/userlike-cdn-widgets/i],
    auxiliaryPatterns: [/userlikeCustomData/i],
  },
  {
    name: 'Landbot',
    scriptSrcPatterns: [/landbot\.io\/umd/i, /static\.landbot\.io/i],
    auxiliaryPatterns: [/Landbot/i],
  },
  {
    name: 'ManyChat',
    scriptSrcPatterns: [/widget\.manychat\.com/i],
  },
  {
    name: 'Ada',
    scriptSrcPatterns: [/static\.ada\.support/i],
    auxiliaryPatterns: [/adaEmbed/i],
  },
  {
    name: 'Botpress',
    scriptSrcPatterns: [/cdn\.botpress\.cloud/i],
    auxiliaryPatterns: [/botpressWebChat/i],
  },
];

const BOOKING_VENDORS: VendorSignature[] = [
  {
    name: 'Calendly',
    scriptSrcPatterns: [/assets\.calendly\.com/i],
    auxiliaryPatterns: [/calendly-badge-widget/i, /Calendly\.initInlineWidget/i, /calendly\.com\/[a-z0-9-]+\//i],
  },
  {
    name: 'Acuity',
    scriptSrcPatterns: [/embed\.acuityscheduling\.com/i],
    auxiliaryPatterns: [/acuityscheduling\.com\/schedule/i],
  },
  {
    name: 'Setmore',
    scriptSrcPatterns: [/storage\.googleapis\.com\/fullintegration-live/i, /assets\.setmore\.com/i],
    auxiliaryPatterns: [/setmore\.com\/book/i],
  },
  {
    name: 'Nexhealth',
    scriptSrcPatterns: [/app\.nexhealth\.com/i],
    auxiliaryPatterns: [/nexhealth/i],
  },
  {
    name: 'Square Appointments',
    scriptSrcPatterns: [/square\.site/i],
    auxiliaryPatterns: [/squareup\.com\/appointments/i],
  },
  {
    name: 'Cal.com',
    scriptSrcPatterns: [/cal\.com\/embed/i, /app\.cal\.com\/embed/i],
    auxiliaryPatterns: [/Cal\.init/i],
  },
  {
    name: 'Booksy',
    scriptSrcPatterns: [/booksy\.com\/widget/i],
    auxiliaryPatterns: [/booksy\.com\/[a-z-]+\/b\//i],
  },
  {
    name: 'Zocdoc',
    scriptSrcPatterns: [/zocdoc\.com\/widget/i],
  },
  {
    name: 'SimplyBook',
    scriptSrcPatterns: [/secure\.simplybook\.me/i, /simplybook\.me\/widget/i],
    auxiliaryPatterns: [/SimplybookWidget/i],
  },
  {
    name: 'LocalMed',
    scriptSrcPatterns: [/widgets\.localmed\.com/i],
  },
  {
    name: 'DentalHQ',
    scriptSrcPatterns: [/dentalhq\.com/i],
  },
  {
    name: 'Modento',
    scriptSrcPatterns: [/modento\.io/i],
  },
  {
    name: '10to8',
    scriptSrcPatterns: [/10to8\.com\/book/i],
  },
  {
    name: 'Timely',
    scriptSrcPatterns: [/book\.gettimely\.com/i],
  },
];

// ─── Low-level parsing helpers ────────────────────────────────────────────

/**
 * Extract `<script>` tag contents + src attributes from HTML.
 * Uses a simple regex — not a full parser, but good enough for detection.
 */
function extractScriptTags(html: string): { src: string[]; inline: string[] } {
  const src: string[] = [];
  const inline: string[] = [];

  // Match <script ... src="..."> (self-closing or not)
  const scriptTagRegex = /<script\b[^>]*>([\s\S]*?)<\/script>|<script\b[^>]*\/?>/gi;
  const srcAttrRegex = /src\s*=\s*["']([^"']+)["']/i;

  let match: RegExpExecArray | null;
  while ((match = scriptTagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const innerContent = match[1] || '';
    const srcMatch = fullTag.match(srcAttrRegex);
    if (srcMatch) src.push(srcMatch[1]);
    if (innerContent.trim()) inline.push(innerContent);
  }

  return { src, inline };
}

/**
 * Match vendor signatures against script data.
 * Returns the strongest match (by signal count).
 */
function matchVendor(
  vendors: VendorSignature[],
  scriptSrcs: string[],
  inlineScripts: string[]
): { vendor: VendorSignature; signalCount: number; evidence: string[] } | null {
  const inlineBlob = inlineScripts.join('\n');
  let best: { vendor: VendorSignature; signalCount: number; evidence: string[] } | null = null;

  for (const vendor of vendors) {
    const evidence: string[] = [];
    let signalCount = 0;

    // Script src patterns — high signal
    for (const pattern of vendor.scriptSrcPatterns) {
      const match = scriptSrcs.find((s) => pattern.test(s));
      if (match) {
        evidence.push(`script src: ${match}`);
        signalCount++;
      }
    }

    // Auxiliary patterns — lower signal but still evidence
    if (vendor.auxiliaryPatterns) {
      for (const pattern of vendor.auxiliaryPatterns) {
        if (pattern.test(inlineBlob)) {
          const extracted = inlineBlob.match(pattern)?.[0] || '';
          evidence.push(`inline: ${extracted.slice(0, 60)}`);
          signalCount++;
        }
      }
    }

    if (signalCount > 0) {
      if (!best || signalCount > best.signalCount) {
        best = { vendor, signalCount, evidence };
      }
    }
  }

  return best;
}

// ─── Public detectors ─────────────────────────────────────────────────────

export function detectChatbot(html: string): DetectionResult {
  const { src, inline } = extractScriptTags(html);
  const match = matchVendor(CHATBOT_VENDORS, src, inline);

  if (!match) {
    return { found: false, vendor: null, confidence: 'high', evidence: [] };
  }

  const confidence: Confidence = match.signalCount >= 2 ? 'high' : 'medium';
  return {
    found: true,
    vendor: match.vendor.name,
    confidence,
    evidence: match.evidence,
  };
}

export function detectBooking(html: string): DetectionResult {
  const { src, inline } = extractScriptTags(html);
  const match = matchVendor(BOOKING_VENDORS, src, inline);

  if (!match) {
    return { found: false, vendor: null, confidence: 'high', evidence: [] };
  }

  const confidence: Confidence = match.signalCount >= 2 ? 'high' : 'medium';
  return {
    found: true,
    vendor: match.vendor.name,
    confidence,
    evidence: match.evidence,
  };
}

export function detectSEO(html: string, finalUrl: string): SEOResult {
  const lowerHtml = html.toLowerCase();

  const https = finalUrl.startsWith('https://');

  const viewport = /<meta[^>]*name\s*=\s*["']viewport["']/i.test(html);

  // Schema.org: look for JSON-LD script tag
  const schemaMatch = html.match(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  let schema = false;
  if (schemaMatch) {
    try {
      const parsed = JSON.parse(schemaMatch[1].trim());
      schema = !!(parsed['@context'] || parsed['@type']);
    } catch {
      // invalid JSON-LD — still counts as attempted schema
      schema = true;
    }
  }

  const ogImage = /<meta[^>]*property\s*=\s*["']og:image["']/i.test(html);
  const favicon = /<link[^>]*rel\s*=\s*["'](icon|shortcut icon)["']/i.test(html);

  const langMatch = html.match(/<html[^>]*lang\s*=\s*["']([^"']+)["']/i);
  const language = langMatch ? langMatch[1] : null;

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  const descMatch = html.match(/<meta[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']+)["']/i);
  const description = descMatch ? descMatch[1].trim() : null;

  // Silence unused var warning
  void lowerHtml;

  return {
    https,
    viewport,
    schema,
    ogImage,
    favicon,
    language,
    title,
    description,
  };
}
