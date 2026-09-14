'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ResolvedContact } from './fallback';

const FIELD_CLASS =
  'h-[65px] w-full rounded-[10px] border-none bg-white px-[17px] font-sans text-[13px] font-medium text-[#5e5e5e] placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * "Let's Team Up!" contact form — Figma node 637:10433 (frame
 * "Group 1597880818", y2450-2944). Exactly the 4 fields drawn in the
 * node — Name, Email ID, Phone number, Company name — nothing added
 * (no message/textarea field; the node has none). The phone field's
 * flag+chevron is rendered as a static India-code indicator (matching
 * this site's existing EnquiryForm.tsx convention of a fixed "+91"
 * prefix, not a real country picker — the node itself shows no dropdown
 * interaction, just the flag glyph). Posts to /api/contact, this
 * project's one real lead-capture endpoint (see that route's own header
 * comment) — client-side validation here is a UX nicety, not the source
 * of truth; the API route re-validates server-side.
 */
export function ContactFormSection({ form }: { form: ResolvedContact['form'] }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();

    if (!name || !email || !company) {
      setError('Please fill in Name, Email ID, and Company name.');
      return;
    }

    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setError(body.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      formEl.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#080d16] py-16 sm:py-20 lg:py-24">
      {form.image && <StrapiImage image={form.image} sizes="100vw" fill className="object-cover" />}
      <Container className="relative flex flex-col items-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{form.eyebrow}</p>
        <h2 className="mt-3 text-center text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
          {form.heading}
        </h2>
        <p className="mt-4 max-w-xl text-center text-base leading-[1.9] text-white/80">{form.subheading}</p>

        {status === 'success' ? (
          <p className="mt-10 max-w-md rounded-[10px] bg-white p-5 text-center font-sans text-sm text-[#464646]">
            Thanks — we&apos;ve received your enquiry and will be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-3xl flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input type="text" name="name" required placeholder="Name*" className={FIELD_CLASS} />
              <input type="email" name="email" required placeholder="Email ID*" className={FIELD_CLASS} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex h-[65px] w-full items-center gap-3 rounded-[10px] bg-white px-[17px]">
                <Image src="/images/contact/contact-flag-india.png" alt="" width={30} height={20} className="h-5 w-[30px] rounded-[2px] object-cover" />
                <ChevronIcon className="size-3 shrink-0 rotate-180 text-[#5e5e5e]" aria-hidden="true" />
                <span className="h-6 w-px bg-[#e4e2e2]" aria-hidden="true" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="h-full flex-1 bg-transparent font-sans text-[13px] font-medium text-[#5e5e5e] placeholder:text-[#5e5e5e] focus:outline-none"
                />
              </div>
              <input type="text" name="company" required placeholder="Company name*" className={FIELD_CLASS} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2px] border border-[#d6d6d6] bg-[#fafafa] px-4 py-4 shadow-[0px_1px_1px_rgba(0,0,0,0.1)] sm:w-fit">
              <label className="flex items-center gap-3.5 font-sans text-sm text-black">
                <input type="checkbox" required className="size-6 rounded-[1px] border-2 border-[#c1c1c1] text-brand-600 focus:ring-brand-600" />
                I&apos;m not a robot
              </label>
              <p className="font-sans text-[10px] text-[#a6a6a6]">
                <Link href="/privacy-policy" className="underline hover:text-white">
                  Privacy
                </Link>{' '}
                -{' '}
                <Link href="/contact" className="underline hover:text-white">
                  Terms
                </Link>
              </p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mx-auto flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:brightness-110 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Send'}
              <SendArrowIcon className="size-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </Container>
    </section>
  );
}
