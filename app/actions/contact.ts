'use server';

import { Resend } from 'resend';
import type { ContactPayload, ContactResult } from '@/lib/types';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function esc(s: string): string {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function submitContact(prevState: ContactResult | null, formData: FormData): Promise<ContactResult> {
  const name = String(formData.get('name') || '').trim().slice(0, 100);
  const email = String(formData.get('email') || '').trim().slice(0, 200);
  const website = String(formData.get('website') || '').trim().slice(0, 300);
  const style = String(formData.get('style') || '').trim().slice(0, 100);
  const message = String(formData.get('message') || '').trim().slice(0, 2000);

  if (!name) return { ok: false, error: 'Name required' };
  if (!email || !isValidEmail(email)) return { ok: false, error: 'Valid email required' };
  if (!message || message.length < 10) return { ok: false, error: 'Message too short (min 10 chars)' };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !TO_EMAIL || !FROM_EMAIL) {
    console.error('Contact form not fully configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)');
    return { ok: false, error: 'Contact form temporarily unavailable' };
  }

  const resend = new Resend(apiKey);
  const html = `
    <div style="font-family: monospace; max-width: 600px; background: #0d1117; color: #e6edf3; padding: 24px; border: 1px solid #30363d; border-radius: 6px;">
      <div style="color: #39d353; font-weight: 700; margin-bottom: 16px;">&gt; new_inquiry.sh</div>
      <div style="margin-bottom: 8px;"><span style="color: #8b949e;">name:</span> ${esc(name)}</div>
      <div style="margin-bottom: 8px;"><span style="color: #8b949e;">email:</span> ${esc(email)}</div>
      <div style="margin-bottom: 8px;"><span style="color: #8b949e;">website:</span> ${esc(website) || '-'}</div>
      <div style="margin-bottom: 8px;"><span style="color: #8b949e;">style:</span> <span style="color: #39d353; font-weight: 600;">${esc(style) || 'Not sure yet'}</span></div>
      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #30363d; white-space: pre-wrap;">${esc(message)}</div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `smartflowdev inquiry — ${name}`,
      html,
    });
    if (error) {
      console.error('Resend error:', error);
      return { ok: false, error: 'Could not send — please try again' };
    }
    return { ok: true };
  } catch (err: any) {
    console.error('Send failed:', err?.message);
    return { ok: false, error: 'Could not send — please try again' };
  }
}
