'use server';

import { Resend } from 'resend';
import { BUDGET_OPTIONS } from '@/lib/types';
import type { ContactResult } from '@/lib/types';

const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function esc(s: string): string {
  return s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function submitContact(
  _prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const name = String(formData.get('name') || '').trim().slice(0, 100);
  const email = String(formData.get('email') || '').trim().slice(0, 200);
  const website = String(formData.get('website') || '').trim().slice(0, 300);
  const budgetRaw = String(formData.get('budget') || '').trim().slice(0, 50);
  const message = String(formData.get('message') || '').trim().slice(0, 2000);

  if (!name) return { ok: false, error: 'Please enter your name' };
  if (!email || !isValidEmail(email)) return { ok: false, error: 'Please enter a valid email' };
  if (!message || message.length < 10) return { ok: false, error: 'Message needs at least 10 characters' };

  const budget = (BUDGET_OPTIONS as readonly string[]).includes(budgetRaw) ? budgetRaw : '';

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !TO_EMAIL || !FROM_EMAIL) {
    console.error('Contact form not fully configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)');
    return { ok: false, error: 'Contact form temporarily unavailable' };
  }

  const resend = new Resend(apiKey);
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; color: #0a0a0a;">
      <div style="border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden;">
        <div style="padding: 24px 28px; background: #6366f1; color: #ffffff;">
          <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.8; font-weight: 600;">New project brief</div>
          <div style="font-size: 22px; font-weight: 700; margin-top: 4px;">${esc(name)}</div>
        </div>
        <div style="padding: 28px 28px 8px 28px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; width: 120px; color: #71717a; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; color: #0a0a0a; font-size: 14px; font-weight: 500;">
                <a href="mailto:${esc(email)}" style="color: #6366f1; text-decoration: none;">${esc(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; color: #71717a; font-size: 13px;">Website</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; color: #0a0a0a; font-size: 14px; font-weight: 500;">${esc(website) || '<span style="color:#a1a1aa;">—</span>'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; color: #71717a; font-size: 13px;">Budget</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f4f4f5; color: #0a0a0a; font-size: 14px; font-weight: 600;">${esc(budget) || '<span style="color:#a1a1aa;">Not specified</span>'}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 28px 28px 28px;">
          <div style="color: #71717a; font-size: 13px; margin-bottom: 10px;">Message</div>
          <div style="padding: 18px; background: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; color: #0a0a0a; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${esc(message)}</div>
        </div>
      </div>
      <div style="padding: 16px 4px; color: #a1a1aa; font-size: 12px; text-align: center;">Sent from smartflowdev.com · Reply directly to this email to reach ${esc(name)}.</div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      reply_to: email,
      subject: `New project brief — ${name}${budget ? ` · ${budget}` : ''}`,
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
