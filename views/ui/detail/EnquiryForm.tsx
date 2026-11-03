'use client';

import { useState, type FormEvent } from 'react';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { RecaptchaBox } from '@/views/ui/RecaptchaBox';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { ImageModel } from '@/models/domain';

// Figma 483:7180 — white 434x65 field, r10, no border; 13px Medium #5e5e5e text, 17px inset.
const FIELD_CLASS =
  'h-[65px] w-full rounded-[10px] bg-white px-[17px] font-sans text-[13px] font-medium text-[#5e5e5e] placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600';

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
  const [robotToken, setRobotToken] = useState<string | null>(null);
  const [robotError, setRobotError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!robotToken) {
      setRobotError(true);
      return;
    }
    setSubmitted(true);
  }

  return (
    // Figma 483:7166 (1900x717): #0f1825 base, photo at 30%, a 478px #06070d vignette at 50%; text column
    // at x264 and the 540x590 glass card at x1098 → a 1374px content box.
    <section className="relative overflow-hidden bg-[#0f1825] py-16 text-white sm:py-20 lg:min-h-[717px] lg:pb-[64px] lg:pt-[63px]">
      {image && (
        <div className="absolute -left-[11.05%] -top-[2.4%] h-[104.6%] w-[118.4%] opacity-30" aria-hidden="true">
          <StrapiImage image={image} sizes="100vw" fill className="object-cover" />
        </div>
      )}
      <div
        className="absolute inset-x-0 top-0 h-[478px] opacity-50 [background:linear-gradient(180deg,#06070d_0%,#06070d_37%,rgba(6,7,13,0)_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[1374px] px-4 sm:px-6 lg:px-8 min-[1440px]:px-0">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_540px] lg:items-start lg:gap-x-8">
          <div className="lg:pt-[183px]">
            <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {eyebrow}
            </p>
            <h2 className="mt-[26px] max-w-[443px] font-sans text-3xl font-semibold capitalize leading-[1.2] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] sm:text-4xl lg:text-[50px] lg:leading-[1.2] lg:tracking-[-1px]">
              {heading}
            </h2>
            <p className="mt-[40px] max-w-[606px] font-sans text-base leading-[1.9] text-white/80 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {body}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[540px] rounded-[20px] border border-white/10 bg-white/[0.08] p-6 backdrop-blur-[21px] sm:p-8 lg:px-[52px] lg:py-[50px]">
            {submitted ? (
              <p className="rounded-[10px] bg-white p-5 font-sans text-sm text-[#5e5e5e]">
                Thanks — we&apos;ve received your enquiry and will be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-[26px]">
                <div className="flex flex-col gap-[14px]">
                  <input type="text" name="name" required placeholder="Name*" className={FIELD_CLASS} />
                  <input type="email" name="email" required placeholder="Email ID*" className={FIELD_CLASS} />
                  <div className="flex h-[65px] w-full items-center rounded-[10px] bg-white pl-[17px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/figma-industries/enquiry/flag-in.png" alt="" width={33} height={22} className="h-[22px] w-[33px] shrink-0 object-cover" />
                    <span className="ml-[6.3px] font-sans text-[20px] text-black" aria-hidden="true">
                      +91
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/figma-industries/enquiry/chevron.svg" alt="" width={20} height={20} className="ml-[17.7px] size-5 shrink-0" />
                    <span className="ml-[15.4px] h-[26px] w-[1.6px] shrink-0 bg-[#d9d9d9]" aria-hidden="true" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone number*"
                      className="ml-[13px] h-full min-w-0 flex-1 bg-transparent pr-4 font-sans text-[13px] font-medium text-[#5e5e5e] placeholder:text-[#5e5e5e] focus:outline-none"
                    />
                  </div>
                  <input type="text" name="company" required placeholder="Company name*" className={FIELD_CLASS} />
                </div>

                {/* Figma 483:7195 — reCAPTCHA checkbox widget. */}
                <RecaptchaBox onChange={setRobotToken} invalid={robotError} />

                <button
                  type="submit"
                  className="flex h-[60px] w-full items-center justify-center gap-1 rounded-[4px] bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-10 font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.78px] text-white transition-[filter] duration-300 hover:brightness-110 motion-reduce:transition-none"
                >
                  Send
                  <SendArrowIcon className="size-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
