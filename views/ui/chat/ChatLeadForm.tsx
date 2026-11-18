'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';

export interface ChatLead {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

/** Common dialling codes; the list stays short so the select fits the 380px panel. */
const COUNTRY_CODES = ['+91', '+1', '+44', '+971', '+61', '+65', '+49', '+33', '+81', '+27'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = 'name' | 'email' | 'phone';

const INPUT =
  'h-10 w-full rounded-lg border bg-white px-3 font-sans text-base text-[#2b2b2b] sm:text-[13px] placeholder:text-[#9a9898] focus:outline-none focus:ring-2 focus:ring-brand-600';
const LABEL = 'mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.04em] text-[#5b5959]';

/**
 * The callback form drawn inside the chat stream. Validates inline (name, a valid email, a 6–15 digit phone), posts
 * to /contact-submit as source "Chat Widget" — the same pipeline as the /contact and blog enquiry forms — and hands
 * the submitted values back so the chat can show a summary card and a personalised confirmation.
 */
export function ChatLeadForm({
  intro,
  serviceOptions,
  autoFocus,
  onSubmitted,
}: {
  intro: string;
  serviceOptions: string[];
  autoFocus: boolean;
  onSubmitted: (lead: ChatLead) => void;
}) {
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({ name: '', email: '', code: '+91', phone: '', company: '', service: '', message: '', website: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (autoFocus) nameRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (key in errors) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your work email.';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please enter a valid email address.';
    const digits = values.phone.replace(/\D/g, '').length;
    if (!values.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (digits < 6 || digits > 15 || /[^0-9 ()-]/.test(values.phone.trim())) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate();
    const first = (['name', 'email', 'phone'] as const).find((f) => found[f]);
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const lead: ChatLead = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: `${values.code} ${values.phone.trim()}`,
      company: values.company.trim(),
      service: values.service,
      message: values.message.trim(),
    };
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, website: values.website, source: 'Chat Widget' }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      onSubmitted(lead);
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className="mt-1 font-sans text-[11px] text-[#c62828]">
        {errors[f]}
      </p>
    ) : null;
  const fieldProps = (f: Field) => ({
    id: `${uid}-${f}`,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? `${uid}-${f}-err` : undefined,
    className: `${INPUT} ${errors[f] ? 'border-[#c62828]' : 'border-[#dcdada]'}`,
  });

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Request a callback" className="w-full rounded-2xl rounded-bl-sm border border-[#e4e2e2] bg-white p-3.5 shadow-sm">
      <p className="mb-3 font-sans text-[13px] leading-snug text-[#464646]">{intro}</p>
      <div className="flex flex-col gap-2.5">
        <div>
          <label htmlFor={`${uid}-name`} className={LABEL}>
            Full name <span className="text-brand-600">*</span>
          </label>
          <input ref={nameRef} type="text" autoComplete="name" maxLength={160} value={values.name} onChange={set('name')} {...fieldProps('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={LABEL}>
            Work email <span className="text-brand-600">*</span>
          </label>
          <input type="email" autoComplete="email" inputMode="email" maxLength={200} value={values.email} onChange={set('email')} {...fieldProps('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={LABEL}>
            Phone / WhatsApp <span className="text-brand-600">*</span>
          </label>
          <div className="flex gap-1.5">
            <select
              aria-label="Country code"
              value={values.code}
              onChange={set('code')}
              className="h-10 w-[76px] shrink-0 rounded-lg border border-[#dcdada] bg-white px-2 font-sans text-base text-[#2b2b2b] sm:text-[13px] focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input type="tel" autoComplete="tel-national" inputMode="tel" maxLength={24} value={values.phone} onChange={set('phone')} {...fieldProps('phone')} />
          </div>
          {err('phone')}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`${uid}-company`} className={LABEL}>
              Company
            </label>
            <input id={`${uid}-company`} type="text" autoComplete="organization" maxLength={160} value={values.company} onChange={set('company')} className={`${INPUT} border-[#dcdada]`} />
          </div>
          <div>
            <label htmlFor={`${uid}-service`} className={LABEL}>
              Research area
            </label>
            <select id={`${uid}-service`} value={values.service} onChange={set('service')} className={`${INPUT} border-[#dcdada] px-2`}>
              <option value="">Select…</option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-message`} className={LABEL}>
            Project brief
          </label>
          <textarea
            id={`${uid}-message`}
            rows={2}
            maxLength={2000}
            value={values.message}
            onChange={set('message')}
            placeholder="Target audience, markets, timeline…"
            className="w-full resize-none rounded-lg border border-[#dcdada] bg-white px-3 py-2 font-sans text-base text-[#2b2b2b] sm:text-[13px] placeholder:text-[#9a9898] focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        </div>
        {/* Honeypot — off-screen and skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </div>
        {status === 'error' && (
          <p role="alert" className="font-sans text-[12px] text-[#c62828]">
            {serverError}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-0.5 flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-gradient-from to-gradient-to font-sans text-[13px] font-semibold uppercase tracking-[0.04em] text-white transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Request Callback'}
        </button>
      </div>
    </form>
  );
}
