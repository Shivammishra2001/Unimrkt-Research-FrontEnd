'use client';

import { useState, type FormEvent } from 'react';
import { RecaptchaBox } from '@/views/ui/RecaptchaBox';
import Image from 'next/image';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { ResolvedContact } from './fallback';

// Figma 1008:44763 — white 434x65 field, r10, no border, 13px Medium #5e5e5e text, 17px inset.
const FIELD_CLASS =
  'h-[65px] w-full rounded-[10px] border-none bg-white px-[17px] font-sans text-[13px] font-medium text-[#5e5e5e] placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * "Let's Team Up!" contact form — Figma node 637:10433 (frame "Group 1597880793", y3887-4592, dark band): 13px eyebrow
 * (cap-top +106), 52px Inter title (+136), 90% intro (+209), then the 888px field block at +266 — two 434x65 fields per row,
 * 20px apart, the phone row's flag box 105px wide — the 302x74 reCAPTCHA box at +170 and a 264x60 gradient Send button.
 * Exactly the 4 fields drawn in the node — Name, Email ID, Phone number, Company name. The phone field's flag+chevron is a
 * static India-code indicator (the node shows no dropdown interaction). Posts to /contact-submit (NOT under /api/* — see
 * that route's own header comment), this project's one real lead-capture endpoint — client-side validation here is a UX
 * nicety, not the source of truth; the route re-validates server-side.
 */
export function ContactFormSection({ form }: { form: ResolvedContact['form'] }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [robotToken, setRobotToken] = useState<string | null>(null);
  const [robotError, setRobotError] = useState(false);

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
    if (!robotToken) {
      setRobotError(true);
      return;
    }

    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, recaptchaToken: robotToken }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setError(body.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      formEl.reset();
      setRobotToken(null);
      setRobotError(false);
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact-form" className="relative overflow-hidden bg-[#101723] px-4 py-16 sm:px-6 lg:pb-[105px] lg:pt-[106px]">
      {form.image && <StrapiImage image={form.image} sizes="100vw" fill className="object-cover opacity-[0.16]" />}
      <div className="relative mx-auto flex w-full max-w-[888px] flex-col items-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {form.eyebrow}
        </p>
        <h2 className="mt-[21px] text-center font-nav text-[34px] font-semibold leading-[1.2] tracking-[-1px] text-white sm:text-[42px] lg:text-[52px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {form.heading}
        </h2>
        <p className="mt-6 max-w-[524px] text-center font-sans text-[16px] font-normal leading-[1.9] text-white/90 lg:mt-[35px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {form.subheading}
        </p>

        {status === 'success' ? (
          <p className="mt-10 max-w-md rounded-[10px] bg-white p-5 text-center font-sans text-sm text-[#464646]">
            Thanks — we&apos;ve received your enquiry and will be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex w-full flex-col gap-5 lg:mt-[46px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input type="text" name="name" required placeholder="Name*" className={FIELD_CLASS} />
              <input type="email" name="email" required placeholder="Email ID*" className={FIELD_CLASS} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex h-[65px] w-full gap-[7px]">
                <span className="flex h-full w-[105px] shrink-0 items-center gap-3 rounded-[10px] bg-white pl-[13px]">
                  <Image src="/images/contact/contact-flag-india.png" alt="" width={45} height={30} className="h-[30px] w-[45px] rounded-[2px] object-cover" />
                  <ChevronIcon className="size-4 shrink-0 rotate-90 text-[#5e5e5e]" aria-hidden="true" />
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="h-full min-w-0 flex-1 rounded-[10px] border-none bg-white px-[19px] font-sans text-[13px] font-medium text-[#5e5e5e] placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
              <input type="text" name="company" required placeholder="Company name*" className={FIELD_CLASS} />
            </div>

            <RecaptchaBox onChange={setRobotToken} invalid={robotError} />

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mx-auto mt-2 flex h-[60px] w-full max-w-[264px] items-center justify-center gap-1 rounded-[4px] bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-10 font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.78px] text-white transition-[filter] duration-300 hover:brightness-110 disabled:opacity-60 motion-reduce:transition-none lg:mt-[10px]"
            >
              {status === 'submitting' ? 'Sending…' : 'Send'}
              <SendArrowIcon className="size-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
