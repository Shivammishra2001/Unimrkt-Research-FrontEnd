'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { ImageModel } from '@/models/domain';

const FIELD_CLASS =
  'h-[65px] w-full rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5 font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none focus:ring-2 focus:ring-brand-600';

/**
 * "Get a Free Quote!" enquiry band — Figma node 483:7166-7209
 * (/industries/[slug]) and 474:5979-6022 (/services/[slug]), identical
 * shell on both. Different field set from QuickEnquiryCard
 * (Name/Email/Phone-with-country-code/Company, not Name/Phone/Email/
 * Message), so it's a sibling component rather than a reuse. Copy/
 * background are CMS-first, template-fallback (resolved by each page's
 * own fallback.ts); the form's own fields (labels, checkbox, Send
 * button) are fixed UI chrome, same as QuickEnquiryCard's — never CMS
 * content anywhere in this codebase. Same scope note as
 * QuickEnquiryCard: presentational only — no lead-capture endpoint
 * exists in this codebase yet.
 */
export function EnquiryForm({
  eyebrow,
  heading,
  body,
  image,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  image?: ImageModel;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      {image && <StrapiImage image={image} sizes="100vw" fill className="object-cover" />}
      <div className="absolute inset-0 bg-[#101723]/85" aria-hidden="true" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {heading}
            </h2>
            <p className="mt-6 max-w-[606px] text-base leading-[1.9] text-white/80">{body}</p>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-blog sm:p-8">
            {submitted ? (
              <p className="rounded-[10px] bg-[#fbfbfb] p-5 font-sans text-sm text-[#464646]">
                Thanks — we&apos;ve received your enquiry and will be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="text" name="name" required placeholder="Name*" className={FIELD_CLASS} />
                <input type="email" name="email" required placeholder="Email ID*" className={FIELD_CLASS} />
                <div className="flex h-[65px] w-full items-center gap-3 rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5">
                  <span className="font-sans text-[13px] font-medium text-[#464646]" aria-hidden="true">
                    +91
                  </span>
                  <span className="h-6 w-px bg-[#e4e2e2]" aria-hidden="true" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone number*"
                    className="h-full flex-1 bg-transparent font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none"
                  />
                </div>
                <input type="text" name="company" required placeholder="Company name*" className={FIELD_CLASS} />

                <label className="mt-2 flex items-center gap-3 font-sans text-sm text-[#464646]">
                  <input type="checkbox" required className="size-5 rounded border-[#e4e2e2] text-brand-600 focus:ring-brand-600" />
                  I&apos;m not a robot
                </label>
                <p className="font-sans text-xs text-[#868484]">
                  <Link href="/privacy-policy" className="underline hover:text-brand-600">
                    Privacy
                  </Link>{' '}
                  ·{' '}
                  <Link href="/contact" className="underline hover:text-brand-600">
                    Terms
                  </Link>
                </p>

                <button
                  type="submit"
                  className="mt-2 flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:brightness-110"
                >
                  Send
                  <SendArrowIcon className="size-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
