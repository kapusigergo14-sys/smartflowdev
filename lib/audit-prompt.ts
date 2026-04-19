/**
 * audit-prompt.ts — Claude-powered suggestions for audit results, with
 * deterministic fallback when the API is unavailable or returns garbage.
 */

import Anthropic from '@anthropic-ai/sdk';
import type { DetectionResult, SEOResult } from './detect';
import type { PsiData, Suggestion } from './audit-types';

interface SuggestionInput {
  url: string;
  chatbot: DetectionResult | null;
  booking: DetectionResult | null;
  seo: SEOResult | null;
  psiMobile: PsiData | null;
}

const SUGGESTION_SYSTEM_PROMPT = `You are a website conversion analyst for small business websites. You generate specific, actionable improvement suggestions based on audit data.

STRICT RULES:
- Output exactly 3 suggestions — no more, no less
- Each suggestion must be grounded in the provided findings — never invent data
- Titles: 5-8 words, action-oriented ("Add an AI chatbot" not "Chatbot")
- Descriptions: 1 sentence, explain WHY it matters for conversions
- Prefer conversion > performance > seo > trust (in priority order for impact)
- If the site is already strong, suggest polish refinements instead of fake problems
- Never claim something is missing unless the findings explicitly say "not detected"
- Use plain text — no markdown, no asterisks

OUTPUT FORMAT (JSON array, nothing else):
[
  {"title": "...", "description": "...", "impact": "high|medium|low", "category": "conversion|performance|seo|trust"},
  {"title": "...", "description": "...", "impact": "high|medium|low", "category": "conversion|performance|seo|trust"},
  {"title": "...", "description": "...", "impact": "high|medium|low", "category": "conversion|performance|seo|trust"}
]`;

function buildFindingsText(input: SuggestionInput): string {
  const lines: string[] = [];
  lines.push(`URL: ${input.url}`);

  if (input.chatbot) {
    if (input.chatbot.found) {
      lines.push(`Chatbot: detected (${input.chatbot.vendor}, confidence: ${input.chatbot.confidence})`);
    } else {
      lines.push(`Chatbot: NOT detected`);
    }
  }

  if (input.booking) {
    if (input.booking.found) {
      lines.push(`Online booking: detected (${input.booking.vendor}, confidence: ${input.booking.confidence})`);
    } else {
      lines.push(`Online booking: NOT detected`);
    }
  }

  if (input.psiMobile) {
    lines.push(`PageSpeed mobile score: ${input.psiMobile.score}/100`);
    if (input.psiMobile.lcpSeconds !== null) {
      lines.push(`Largest Contentful Paint: ${input.psiMobile.lcpSeconds.toFixed(1)}s`);
    }
  }

  if (input.seo) {
    lines.push(`HTTPS: ${input.seo.https ? 'yes' : 'NO'}`);
    lines.push(`Mobile viewport meta: ${input.seo.viewport ? 'yes' : 'NO'}`);
    lines.push(`Schema.org structured data: ${input.seo.schema ? 'yes' : 'NO'}`);
    lines.push(`Open Graph image: ${input.seo.ogImage ? 'yes' : 'NO'}`);
    lines.push(`Favicon: ${input.seo.favicon ? 'yes' : 'NO'}`);
    if (input.seo.title) lines.push(`Page title: "${input.seo.title.slice(0, 80)}"`);
  }

  return lines.join('\n');
}

// ─── Deterministic fallback ──────────────────────────────────────────────
//
// Runs when Claude is unavailable. Produces solid suggestions from rules.

function staticSuggestions(input: SuggestionInput): Suggestion[] {
  const candidates: Suggestion[] = [];

  // Conversion wins
  if (input.chatbot && !input.chatbot.found) {
    candidates.push({
      title: 'Add an AI chatbot',
      description:
        "A 24/7 chatbot captures leads after hours and answers common questions, which typically drives a 2-3x increase in inbound inquiries for service businesses.",
      impact: 'high',
      category: 'conversion',
    });
  }

  if (input.booking && !input.booking.found) {
    candidates.push({
      title: 'Add online booking',
      description:
        'Visitors strongly prefer booking online over calling — adding a booking widget removes friction and fills more appointments without staff involvement.',
      impact: 'high',
      category: 'conversion',
    });
  }

  // Performance
  if (input.psiMobile && input.psiMobile.score < 50) {
    candidates.push({
      title: 'Improve mobile load time',
      description: `Your mobile PageSpeed score is ${input.psiMobile.score}/100. Slow mobile sites lose 50%+ of visitors before the page finishes loading.`,
      impact: 'high',
      category: 'performance',
    });
  } else if (input.psiMobile && input.psiMobile.score < 80) {
    candidates.push({
      title: 'Optimize images and scripts',
      description: `Your mobile PageSpeed score is ${input.psiMobile.score}/100. A push toward 90+ will improve both conversions and Google search ranking.`,
      impact: 'medium',
      category: 'performance',
    });
  }

  // Trust & SEO
  if (input.seo && !input.seo.https) {
    candidates.push({
      title: 'Enable HTTPS',
      description:
        "Your site isn't using HTTPS. Modern browsers show a 'Not Secure' warning, and Google penalizes HTTP sites in search ranking.",
      impact: 'high',
      category: 'trust',
    });
  }

  if (input.seo && !input.seo.schema) {
    candidates.push({
      title: 'Add schema.org markup',
      description:
        'Structured data helps search engines show rich results (ratings, hours, services) directly on Google, increasing click-through rates.',
      impact: 'medium',
      category: 'seo',
    });
  }

  if (input.seo && !input.seo.viewport) {
    candidates.push({
      title: 'Add mobile viewport meta tag',
      description:
        'Without a viewport meta tag, mobile browsers render the desktop layout and users pinch-zoom just to read your content.',
      impact: 'medium',
      category: 'performance',
    });
  }

  if (input.seo && !input.seo.ogImage) {
    candidates.push({
      title: 'Add an Open Graph image',
      description:
        "When your site is shared on social media or messaging apps, an OG image dramatically increases click-through. Without one, shares look bland.",
      impact: 'low',
      category: 'trust',
    });
  }

  // Polish for strong sites
  if (candidates.length === 0) {
    candidates.push(
      {
        title: 'Add a customer testimonial section',
        description:
          'Social proof is the single biggest trust signal for service businesses. Real quotes with names and photos dramatically lift contact form conversions.',
        impact: 'medium',
        category: 'trust',
      },
      {
        title: 'Simplify your contact form',
        description:
          'Each extra field drops form completion by ~10%. Keep it to name, email, and message — everything else can come on a follow-up.',
        impact: 'medium',
        category: 'conversion',
      },
      {
        title: 'Add above-the-fold CTA',
        description:
          'The primary action (book, call, contact) should be visible without scrolling. Visitors who have to hunt for the button leave.',
        impact: 'medium',
        category: 'conversion',
      }
    );
  }

  // Return exactly 3
  return candidates.slice(0, 3);
}

// ─── Main: Claude-powered with fallback ─────────────────────────────────

export async function generateSuggestions(input: SuggestionInput): Promise<Suggestion[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // No API key → static rules
  if (!apiKey) {
    return staticSuggestions(input);
  }

  const findings = buildFindingsText(input);

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 700,
      system: SUGGESTION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze these audit findings and return exactly 3 suggestions as JSON:\n\n${findings}`,
        },
      ],
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const parsed = parseSuggestionsJson(text);
    if (parsed && parsed.length >= 3) {
      return parsed.slice(0, 3);
    }

    // Parse failed → fall back
    return staticSuggestions(input);
  } catch {
    // Any API error → fall back to static rules
    return staticSuggestions(input);
  }
}

function parseSuggestionsJson(text: string): Suggestion[] | null {
  try {
    // Find the first [ ... ] block
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return null;

    const validCategories = new Set(['conversion', 'performance', 'seo', 'trust']);
    const validImpacts = new Set(['high', 'medium', 'low']);

    const cleaned: Suggestion[] = [];
    for (const item of parsed) {
      if (
        item &&
        typeof item.title === 'string' &&
        typeof item.description === 'string' &&
        validImpacts.has(item.impact) &&
        validCategories.has(item.category)
      ) {
        cleaned.push({
          title: item.title.slice(0, 80),
          description: item.description.slice(0, 300),
          impact: item.impact,
          category: item.category,
        });
      }
    }
    return cleaned.length > 0 ? cleaned : null;
  } catch {
    return null;
  }
}
