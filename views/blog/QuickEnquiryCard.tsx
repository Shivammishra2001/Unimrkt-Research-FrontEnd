'use client';

import { useState, type FormEvent } from 'react';

/**
 * "Quick Enquiry" sidebar card — Figma node 593:3866. Exact styling:
 * fields `bg-[#fbfbfb]` / border `#e4e2e2` / `rounded-[10px]`; gradient
 * Submit button (`gradient-from`→`gradient-to`).
 *
 * Scope note (see the plan): no lead-capture endpoint exists anywhere in
 * this codebase yet (no `/contact` implementation, no CRM/email
 * webhook). This is presentational — client-side required-field state
 * plus a friendly acknowledgment on submit — not wired to a real
 * backend. Swap `handleSubmit` for a real POST once a submission target
 * (Strapi email plugin, a new `enquiry` content-type) is decided.
 */
export function QuickEnquiryCard() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-[24px] border border-card-border bg-white p-8 shadow-blog">
      <h3 className="font-sans text-2xl font-semibold leading-[1.34] text-ink2">Quick Enquiry</h3>
      <p className="mt-1 font-sans text-sm leading-[1.73] text-black/70">Customer Service, We Make it Better</p>

      {submitted ? (
        <p className="mt-6 rounded-[10px] bg-[#fbfbfb] p-5 font-sans text-sm text-[#464646]">
          Thanks — we&apos;ve received your enquiry and will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            name="name"
            required
            placeholder="Name*"
            className="h-[65px] w-full rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5 font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone*"
            className="h-[65px] w-full rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5 font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email*"
            className="h-[65px] w-full rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5 font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className="min-h-[115px] w-full resize-none rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5 py-[18px] font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
          <button
            type="submit"
            className="mt-2 flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:brightness-110"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
