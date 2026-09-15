'use client';

import { useRef, useState, type DragEvent } from 'react';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { useModalDismiss } from './useModalDismiss';

const FIELD_CLASS =
  'h-[65px] w-full rounded-xl border border-[#e0e0e0] bg-[#f9f9f7] px-[17px] font-sans text-[13px] font-medium text-heading placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600';
const LABEL_CLASS = 'font-sans text-[15px] font-semibold text-[#04264e]';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

/** Figma draws this field as a dropdown (chevron affordance) but shows
 * it closed with no option list anywhere in the file — per the user's
 * own approved fallback, these are standard year-range experience
 * brackets. Enum keys are identifier-safe (Strapi rejects enum members
 * starting with a digit; see backend's job-application schema.json);
 * labels are the human-readable strings shown here. */
const EXPERIENCE_OPTIONS: { value: string; label: string }[] = [
  { value: 'fresher', label: 'Fresher' },
  { value: 'yrs_1_3', label: '1-3 years' },
  { value: 'yrs_3_5', label: '3-5 years' },
  { value: 'yrs_5_10', label: '5-10 years' },
  { value: 'yrs_10_plus', label: '10+ years' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

function isAcceptedFile(file: File) {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

/**
 * "Apply Now" modal — Figma node 924:23856. Exactly the 7 fields drawn
 * there (Full Name, Email Address, Phone Number, Experience (in Years),
 * Current Location, Resume/CV, Additional Message) — no fields added.
 * "Current Location *" is a plain text input despite its "Select..."
 * placeholder wording: unlike "Experience (in Years)", Figma draws no
 * chevron/dropdown affordance for it (confirmed via get_design_context
 * on both fields side by side), so it's implemented as text, not select.
 *
 * Submits multipart/form-data directly to Strapi's public
 * `POST /api/job-applications` (never a Next.js relay — this task is
 * local-only, and unlike /contact's lead form there is no staging
 * `/api/*` reverse-proxy collision to work around here).
 */
export function JobApplicationModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  useModalDismiss(true, onClose);

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChosen(next: File | null) {
    if (!next) {
      setFile(null);
      return;
    }
    if (!isAcceptedFile(next)) {
      setError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    if (next.size > MAX_FILE_BYTES) {
      setError('File size must be under 5MB.');
      return;
    }
    setError(null);
    setFile(next);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFileChosen(e.dataTransfer.files?.[0] ?? null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const experience = String(data.get('experience') ?? '').trim();
    const location = String(data.get('location') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !phone || !experience || !location) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!file) {
      setError('Please attach your resume (PDF, DOC, or DOCX, max 5MB).');
      return;
    }

    setStatus('submitting');
    setError(null);
    try {
      const payload = new FormData();
      payload.append('data', JSON.stringify({ jobTitle, name, email, phone, experience, location, message: message || undefined }));
      payload.append('files.resume', file);

      const res = await fetch(`${API_BASE_URL}/job-applications`, { method: 'POST', body: payload });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
        setStatus('error');
        setError(body.error?.message ?? 'Something went wrong submitting your application. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong submitting your application. Please try again.');
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- backdrop click-to-close, content stops propagation below
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${jobTitle}`}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#13151b]/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-4xl rounded-[24px] border border-[#eee] bg-white p-6 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application form"
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-heading/60 transition-colors hover:bg-black/5 hover:text-heading"
        >
          <CloseIcon className="size-5" aria-hidden="true" />
        </button>

        <div className="text-center">
          <h2 className="text-[28px] font-semibold leading-none text-[#04264e] sm:text-[32px]">Apply Now</h2>
          <p className="mt-3 font-sans text-[13px] leading-[1.73] text-[#343434]">Fill in your details below to apply for this position.</p>
        </div>

        {status === 'success' ? (
          <p className="mt-10 rounded-xl bg-[#f9f9f7] p-6 text-center font-sans text-sm text-[#464646]">
            Thanks for applying — our HR team will review your application and reach out if your profile is shortlisted.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={LABEL_CLASS} htmlFor="jam-name">
                  Full Name *
                </label>
                <input id="jam-name" name="name" type="text" required placeholder="Enter your full name" className={FIELD_CLASS} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={LABEL_CLASS} htmlFor="jam-email">
                  Email Address *
                </label>
                <input id="jam-email" name="email" type="email" required placeholder="Enter your email address" className={FIELD_CLASS} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={LABEL_CLASS} htmlFor="jam-phone">
                  Phone Number *
                </label>
                <input id="jam-phone" name="phone" type="tel" required placeholder="Enter your 10-digit mobile number" className={FIELD_CLASS} />
              </div>
              <div className="flex flex-col gap-2">
                <label className={LABEL_CLASS} htmlFor="jam-experience">
                  Experience (in Years) *
                </label>
                <select id="jam-experience" name="experience" required defaultValue="" className={`${FIELD_CLASS} appearance-none`}>
                  <option value="" disabled>
                    Select experience
                  </option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={LABEL_CLASS} htmlFor="jam-location">
                  Current Location *
                </label>
                <input id="jam-location" name="location" type="text" required placeholder="Select your current location" className={FIELD_CLASS} />
              </div>
              <div className="flex flex-col gap-2">
                <span className={LABEL_CLASS}>Resume / CV *</span>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`flex h-[65px] w-full items-center justify-between gap-2 rounded-xl border bg-[#f9f9f7] pl-[17px] pr-1.5 transition-colors ${
                    isDragging ? 'border-brand-600 ring-2 ring-brand-600' : 'border-[#e0e0e0]'
                  }`}
                >
                  <span className="truncate font-sans text-[13px] font-medium text-[#5e5e5e]">{file ? file.name : 'Drag & drop your file here'}</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-[52px] shrink-0 items-center justify-center rounded-[10px] bg-[#722a48] px-[18px] font-sans text-xs font-bold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => handleFileChosen(e.target.files?.[0] ?? null)}
                  />
                </div>
                <p className="font-sans text-[11px] font-medium text-[#04264e]">(PDF, DOC or DOCX | Max 5MB)</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={LABEL_CLASS} htmlFor="jam-message">
                Additional Message <span className="font-normal text-[#9cb2cb]">(Optional)</span>
              </label>
              <textarea
                id="jam-message"
                name="message"
                rows={4}
                placeholder="Tell us why you're a great fit for this role..."
                className="w-full resize-none rounded-xl border border-[#e0e0e0] bg-[#f9f9f7] px-[17px] py-4 font-sans text-[13px] font-medium text-heading placeholder:text-[#5e5e5e] focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <p className="font-sans text-[13px] font-medium text-[#04264e]">🔒 Your data is safe with us. We respect your privacy.</p>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mx-auto flex h-14 items-center justify-center rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-110 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
