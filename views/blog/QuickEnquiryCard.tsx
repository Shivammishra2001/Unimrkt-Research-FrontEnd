'use client';

import { useState, type FormEvent } from 'react';
import { RecaptchaBox } from '@/views/ui/RecaptchaBox';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';

// Figma 1499:16731 — #fbfbfb 440x65 field, 1px #e4e2e2, r10, 13px Medium #464646 text at 20px.
const FIELD =
  'w-full rounded-[10px] border border-[#e4e2e2] bg-[#fbfbfb] px-5 font-sans text-[13px] font-medium text-[#464646] placeholder:text-[#464646] focus:outline-none focus:ring-2 focus:ring-brand-600';

/**
 * "Quick Enquiry" sidebar card — Figma 1499:16726: 512x677 white card (1px #eee, r24, 6/6/54 shadow), 36px inset;
 * 24px SemiBold #04264e title, 14px subtitle at 70%, four fields 12px apart (65/65/65/115), the 302x74 reCAPTCHA box,
 * and a 440x60 gradient Submit.
 *
 * Scope note: no lead-capture endpoint exists in this codebase yet, so submit only shows the acknowledgement.
 */
export function QuickEnquiryCard() {
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
    <div className="rounded-[24px] border border-[#eee] bg-white px-6 pb-[40px] pt-[38px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] sm:px-[35px]">
      <h3 className="font-sans text-[24px] font-semibold leading-[1.34] text-[#04264e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Quick Enquiry
      </h3>
      <p className="mt-[17px] font-sans text-[14px] font-normal leading-[1.73] text-black/70 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        Customer Service, We Make it Better
      </p>

      {submitted ? (
        <p className="mt-[30px] rounded-[10px] bg-[#fbfbfb] p-5 font-sans text-sm text-[#464646]">
          Thanks — we&apos;ve received your enquiry and will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-[30px] flex flex-col gap-3">
          <input type="text" name="name" required placeholder="Name*" className={`${FIELD} h-[65px]`} />
          <input type="tel" name="phone" required placeholder="Phone*" className={`${FIELD} h-[65px]`} />
          <input type="email" name="email" required placeholder="Email*" className={`${FIELD} h-[65px]`} />
          <textarea name="message" placeholder="Message" className={`${FIELD} h-[115px] resize-none py-[22px]`} />

          {/* Figma 1499:16743 — reCAPTCHA checkbox widget. */}
          <RecaptchaBox onChange={setRobotToken} invalid={robotError} />

          <button
            type="submit"
            className="mt-[19px] flex h-[60px] w-full items-center justify-center gap-1 rounded-[4px] bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-10 font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.78px] text-white transition-[filter] duration-300 hover:brightness-110 motion-reduce:transition-none"
          >
            Submit
            <SendArrowIcon className="size-4" aria-hidden="true" />
          </button>
        </form>
      )}
    </div>
  );
}
