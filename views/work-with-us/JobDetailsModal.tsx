'use client';

import { Briefcase, Users, Calendar } from 'lucide-react';
import { LocationPinIcon } from '@/views/ui/icons/LocationPinIcon';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { useModalDismiss } from '@/views/ui/useModalDismiss';
import type { JobListingModel, JobDescriptionBlock } from '@/models/workWithUsPage';

/**
 * "View Details" modal — Figma node 924:23508. Card: bg-white,
 * border-[#eee], rounded-[24px], shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)].
 * Backdrop: bg-[#13151b] at 90% opacity (node 924:23796). Heading color
 * #a3282a (= this project's brand-600 token, confirmed against
 * ValuesSection.tsx's identical rgba(163,40,42,...) usage).
 *
 * Only the node's own named example job ("Executive – Language &
 * Communication") has descriptionItems/skillsItems/qualificationsItems
 * content — every other seeded job leaves them empty, and each section
 * below is omitted entirely when its array is empty rather than
 * inventing filler copy for jobs Figma never drew a detail view for.
 */
function DescriptionList({ items }: { items: JobDescriptionBlock[] }) {
  return (
    <ul className="list-disc space-y-4 pl-5 font-sans text-sm font-medium leading-[1.8] text-[#032246]">
      {items.map((item, i) => (
        <li key={i}>
          {item.text}
          {item.subItems && item.subItems.length > 0 && (
            <ol className="mt-2 list-decimal space-y-1.5 pl-5">
              {item.subItems.map((sub, j) => (
                <li key={j}>{sub}</li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-3 pl-5 font-sans text-sm font-medium leading-[1.8] text-[#032246]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function JobDetailsModal({ job, onClose, onApply }: { job: JobListingModel; onClose: () => void; onApply: () => void }) {
  useModalDismiss(true, onClose);

  const hasAnySection =
    (job.descriptionItems && job.descriptionItems.length > 0) ||
    (job.skillsItems && job.skillsItems.length > 0) ||
    (job.qualificationsItems && job.qualificationsItems.length > 0);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- backdrop click-to-close, content stops propagation below
    <div role="dialog" aria-modal="true" aria-label={job.title} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#13151b]/90 p-4 sm:p-8" onClick={onClose}>
      <div
        className="relative my-auto w-full max-w-4xl rounded-[24px] border border-[#eee] bg-white p-6 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close job details"
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-heading/60 transition-colors hover:bg-black/5 hover:text-heading"
        >
          <CloseIcon className="size-5" aria-hidden="true" />
        </button>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="flex size-[90px] shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-600">
            <Briefcase className="size-11" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold leading-none text-[#04264e] sm:text-[26px]">{job.title}</h2>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="flex items-center gap-1.5 text-[17px] font-medium text-[#032246]">
                <LocationPinIcon className="size-6 text-brand-600" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 text-[17px] font-medium text-[#032246]">
                <Briefcase className="size-6 text-brand-600" strokeWidth={1.5} />
                {job.jobType}
              </span>
              <span className="flex items-center gap-1.5 text-[17px] font-medium text-[#032246]">
                <Users className="size-6 text-brand-600" strokeWidth={1.5} />
                {job.department}
              </span>
              <span className="flex items-center gap-1.5 text-[17px] font-medium text-[#032246]">
                <Calendar className="size-6 text-brand-600" strokeWidth={1.5} />
                {job.postedDate}
              </span>
            </div>
          </div>
        </div>

        {/* No detail-modal content exists for any job but the node's own
            named example anywhere in the Figma file or the CMS — see
            fallback.ts / seed.ts's header comments. Rather than invent
            filler copy for the other jobs, each section (and the gap
            above the Apply button) is simply omitted when its array is
            empty; only the header (icon/title/meta) and the Apply Now
            button below are guaranteed to render for every job. */}
        {hasAnySection && (
          <div className="mt-8 flex flex-col gap-8">
            {job.descriptionItems && job.descriptionItems.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-brand-600 sm:text-[22px]">Job Description</h3>
                <div className="mt-4">
                  <DescriptionList items={job.descriptionItems} />
                </div>
              </div>
            )}
            {job.skillsItems && job.skillsItems.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-brand-600 sm:text-[22px]">Skills Required</h3>
                <div className="mt-4">
                  <BulletList items={job.skillsItems} />
                </div>
              </div>
            )}
            {job.qualificationsItems && job.qualificationsItems.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-brand-600 sm:text-[22px]">Qualifications and Experience</h3>
                <div className="mt-4">
                  <BulletList items={job.qualificationsItems} />
                </div>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={onApply}
          className="mt-10 flex h-14 items-center justify-center rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
