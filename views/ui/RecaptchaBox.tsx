'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';

/** Google reCAPTCHA v2 loader types (only what this widget touches). */
declare global {
  interface Window {
    grecaptcha?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => number;
      reset: (id?: number) => void;
    };
    __recaptchaReady?: () => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?onload=__recaptchaReady&render=explicit';

let scriptPromise: Promise<void> | null = null;
function loadRecaptcha(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.grecaptcha?.render) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      window.__recaptchaReady = () => resolve();
      const s = document.createElement('script');
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * The "I'm not a robot" checkbox (Figma 483:7195 / 1499:16743: 302x74, #fafafa, 1px #d6d6d6, r2).
 *
 * - With `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` set it renders Google's real v2 checkbox and reports its token through
 *   `onChange(token)` (null again when it expires) — the server must still verify that token with the secret key.
 * - Without a key it is a working client-side gate in the same design: clicking runs a short "verifying" spinner, then
 *   shows the green tick and reports a placeholder token. That stops accidental/empty submits but is NOT bot protection.
 *
 * The parent form blocks submit until `onChange` has reported a token and passes `invalid` to show the red state.
 */
export function RecaptchaBox({ onChange, invalid = false }: { onChange: (token: string | null) => void; invalid?: boolean }) {
  const [phase, setPhase] = useState<'idle' | 'checking' | 'done'>('idle');
  const hostRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labelId = useId();

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // Real widget.
  const renderReal = useCallback(async () => {
    await loadRecaptcha();
    const host = hostRef.current;
    if (!host || !window.grecaptcha || host.childElementCount > 0) return;
    window.grecaptcha.render(host, {
      sitekey: SITE_KEY,
      callback: (token: string) => onChange(token),
      'expired-callback': () => onChange(null),
      'error-callback': () => onChange(null),
    });
  }, [onChange]);

  useEffect(() => {
    if (SITE_KEY) void renderReal();
  }, [renderReal]);

  if (SITE_KEY) {
    return <div ref={hostRef} className={invalid ? 'rounded-[2px] outline outline-1 outline-[#d93025]' : undefined} />;
  }

  function verify() {
    if (phase !== 'idle') return;
    setPhase('checking');
    timer.current = setTimeout(() => {
      setPhase('done');
      onChange('client-verified');
    }, 900);
  }

  return (
    <div>
      <div
        className={`relative h-[74px] w-[302px] max-w-full rounded-[2px] border bg-[#fafafa] shadow-[0_1px_1px_rgba(0,0,0,0.1)] ${
          invalid && phase !== 'done' ? 'border-[#d93025]' : 'border-[#d6d6d6]'
        }`}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={phase === 'done'}
          aria-labelledby={labelId}
          onClick={verify}
          className="absolute left-[12px] top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-[14px] font-[Roboto,Arial,sans-serif] text-[14px] font-medium text-black focus-visible:outline-none"
        >
          <span
            className={`relative flex size-6 shrink-0 items-center justify-center rounded-[1px] border-2 bg-white transition-colors motion-reduce:transition-none ${
              phase === 'done' ? 'border-transparent' : invalid ? 'border-[#d93025]' : 'border-[#c1c1c1] hover:border-[#9e9e9e]'
            }`}
          >
            {phase === 'checking' && (
              <span className="size-[18px] animate-spin rounded-full border-[3px] border-[#4a90e2] border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
            )}
            {phase === 'done' && (
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="#0f9d58" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span id={labelId}>I&apos;m not a robot</span>
        </button>
        <div className="absolute right-[10px] top-[calc(50%+0.5px)] flex -translate-y-1/2 flex-col items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma-industries/enquiry/recaptcha-logo.svg" alt="" width={48} height={46} className="h-[46px] w-12" />
          <p className="font-[Roboto,Arial,sans-serif] text-[8px] font-medium text-[#a6a6a6]">
            <Link href="/privacy-policy">Privacy</Link> - <Link href="/contact">Terms</Link>
          </p>
        </div>
      </div>
      {invalid && phase !== 'done' && (
        <p role="alert" className="mt-1.5 font-sans text-[12px] text-[#d93025]">
          Please confirm you&apos;re not a robot.
        </p>
      )}
    </div>
  );
}
