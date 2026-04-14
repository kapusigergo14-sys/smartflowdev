import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { CHAT_SYSTEM_PROMPT } from '@/lib/chat-system-prompt';

// In-memory rate limit (per-IP, resets hourly)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_HOUR = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimits.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= MAX_MESSAGES_PER_HOUR) return false;
  entry.count++;
  return true;
}

interface ClientMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again in an hour.' },
      { status: 429 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const rawMessages = body.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0 || rawMessages.length > 30) {
    return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
  }

  const messages: ClientMessage[] = rawMessages
    .filter(
      (m: any) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string'
    )
    .map((m: any) => ({
      role: m.role as 'user' | 'assistant',
      content: String(m.content).slice(0, 1000),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json(
      { error: 'Last message must be from user' },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY missing');
    return NextResponse.json(
      { error: 'Chatbot temporarily unavailable' },
      { status: 503 }
    );
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: CHAT_SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const text =
      response.content[0]?.type === 'text' ? response.content[0].text : '';

    return NextResponse.json({ content: text });
  } catch (err: any) {
    console.error('Chat error:', err?.message || err);
    return NextResponse.json(
      { error: 'Could not get a response. Please try again.' },
      { status: 500 }
    );
  }
}
