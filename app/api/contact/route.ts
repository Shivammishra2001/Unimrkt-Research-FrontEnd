import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * /contact's lead-capture form posts here (never straight to Strapi —
 * every other Strapi call in this codebase is read-only and goes
 * through controllers/strapi.ts; this is the one write, kept as its own
 * server-side proxy so the Strapi base URL/shape isn't a client
 * concern). Validates the exact 4 fields Figma node 637:10433 draws
 * (Name, Email ID, Phone number, Company name) server-side too — never
 * trust client-side validation alone — then forwards to
 * `api::contact-submission.contact-submission`'s public `create` route.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as ContactFormBody | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';

  if (!name || !email || !company) {
    return NextResponse.json({ error: 'Name, Email ID, and Company name are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE_URL}/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { name, email, phone: phone || undefined, company } }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Something went wrong submitting your enquiry. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong submitting your enquiry. Please try again.' }, { status: 502 });
  }
}
