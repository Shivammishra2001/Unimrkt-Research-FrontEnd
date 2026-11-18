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
 *
 * Deliberately NOT under /api/* : on the staging deployment, the reverse
 * proxy routes the entire public /api/* prefix straight to Strapi (that
 * is how /api/our-company-page, /api/contact-page, etc. resolve at all)
 * — confirmed by /api/preview and /api/revalidate also returning
 * Strapi's own 404 shape / a bare 405 on that domain, not this
 * project's Next.js route handlers, which is a pre-existing
 * characteristic of that proxy, not something this route changes. A
 * route handler actually needs to live outside /api/* to be reachable
 * on that domain at all.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  message?: unknown;
  service?: unknown;
  source?: unknown;
  /** Honeypot: hidden from people, so anything typed here came from a bot. */
  website?: unknown;
}

/** Forms allowed to post here. The /contact form sends no `source` and keeps its required Company field; the blog's
 * Quick Enquiry card (Name / Phone / Email / Message) has no company field and requires a phone instead; the chat
 * widget's inline form (Name / Email / Phone required; Company, Service, Brief optional) is stored as "Chat Widget". */
const SOURCES = new Set(['contact-page', 'blog-quick-enquiry', 'Chat Widget']);
/** Optional +country code, then 6–15 digits with the usual separators. */
const PHONE_RE = /^\+?[0-9][0-9 ()-]{5,20}$/;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as ContactFormBody | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : '';
  const service = typeof body.service === 'string' ? body.service.trim().slice(0, 120) : '';
  const source = typeof body.source === 'string' && SOURCES.has(body.source) ? body.source : 'contact-page';

  // A filled honeypot is a bot: answer as if it worked, store nothing.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ success: true });
  }

  if (source === 'Chat Widget') {
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, Email and Phone are required.' }, { status: 400 });
    }
    const digits = phone.replace(/\D/g, '').length;
    if (!PHONE_RE.test(phone) || digits < 6 || digits > 15) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }
  } else if (source === 'blog-quick-enquiry') {
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, Phone and Email are required.' }, { status: 400 });
    }
  } else if (!name || !email || !company) {
    return NextResponse.json({ error: 'Name, Email ID, and Company name are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE_URL}/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { name, email, phone: phone || undefined, company: company || undefined, service: service || undefined, message: message || undefined, source } }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Something went wrong submitting your enquiry. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Something went wrong submitting your enquiry. Please try again.' }, { status: 502 });
  }
}
