'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/views/ui/Container';
import { LocationPinIcon } from '@/views/ui/icons/LocationPinIcon';
import { Briefcase, Users, Calendar, Search, ChevronDown } from 'lucide-react';
import { JobDetailsModal } from './JobDetailsModal';
import { JobApplicationModal } from './JobApplicationModal';
import type { ResolvedWorkWithUs } from './fallback';
import type { JobListingModel } from '@/models/workWithUsPage';

const PAGE_SIZE = 4;
const ALL = 'All';

/** Figma 924:23469: 260x64 r8 white box (1px #ededed) 4px below an 11px SemiBold uppercase #0e1b2e label, 12px #5e5e5e value, 20px chevron at the right. */
function FilterSelect({ label, value, onChange, all, options }: { label: string; value: string; onChange: (v: string) => void; all: string; options: string[] }) {
  return (
    <label className="relative block h-[68px] lg:w-[260px] lg:shrink-0">
      <span className="absolute left-4 top-0 z-10 font-nav text-[11px] font-semibold uppercase leading-[1.34] text-[#0e1b2e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Filter by ${label.toLowerCase()}`}
        className="absolute inset-x-0 bottom-0 h-16 w-full cursor-pointer appearance-none rounded-[8px] border border-[#ededed] bg-white pl-[17px] pr-12 pt-[10px] font-nav text-[12px] font-normal text-[#5e5e5e] transition-colors hover:border-[#d6d6d6] focus:border-[#a3282a] focus:outline-none"
      >
        <option value={ALL}>{all}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute bottom-[22px] right-3 size-5 text-[#02060e]" strokeWidth={1.5} aria-hidden="true" />
    </label>
  );
}

/** Figma defines no distinct hover/pressed variant for this button shape
 * anywhere in the file (plain static frames, not a component with a
 * "State" property) — this is the exact same tap/hover scale as
 * views/ui/Button.tsx, the one motion spec already established
 * sitewide, applied here by hand only because this button's own
 * maroon-outline styling has no equivalent in Button.tsx's variant set. */
function useButtonMotionProps() {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 }, transition: { duration: 0.15 } };
}

function JobCard({ job, onViewDetails, onApply }: { job: JobListingModel; onViewDetails: () => void; onApply: () => void }) {
  const motionProps = useButtonMotionProps();
  return (
    <div className="relative flex flex-col gap-6 rounded-[18px] border border-[#ebebe4] bg-white p-6 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:gap-8 lg:h-[164px] lg:gap-[36px] lg:px-[36px] lg:py-0">
      <span className="flex size-[74px] shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-600">
        <Briefcase className="size-11" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="flex-1">
        <p className="font-nav text-[20px] font-semibold leading-none text-[#04264e] lg:text-[22px]">{job.title}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 lg:mt-[16px]">
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#032246]">
            <LocationPinIcon className="size-5 text-brand-600" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#032246]">
            <Briefcase className="size-5 text-brand-600" strokeWidth={1.5} />
            {job.jobType}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#032246]">
            <Users className="size-5 text-brand-600" strokeWidth={1.5} />
            {job.department}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-[#032246]">
            <Calendar className="size-5 text-brand-600" strokeWidth={1.5} />
            {job.postedDate}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 gap-3 lg:ml-auto">
        <motion.button
          type="button"
          onClick={onViewDetails}
          className="flex h-14 w-full items-center justify-center rounded-[4px] border border-[#962b39] px-6 font-sans sm:w-[190px] text-[13px] font-bold uppercase tracking-[0.06em] text-[#7e2a43] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 hover:bg-[#962b39]/5"
          {...motionProps}
        >
          View Details
        </motion.button>
        <motion.button
          type="button"
          onClick={onApply}
          className="flex h-14 w-full items-center justify-center rounded-[4px] bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-6 font-sans sm:w-[190px] text-[13px] font-bold uppercase tracking-[0.78px] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 hover:brightness-110"
          {...motionProps}
        >
          Apply Now
        </motion.button>
      </div>
    </div>
  );
}

/**
 * "Find Your Next Opportunity" — Figma node 924:23216 (y2481-3775).
 * Search + Department/Job Type/Location filters (options derived from
 * the real job list itself, not invented — the node's own dropdowns are
 * shown closed with no enumerable option list) + job cards + "Load
 * More". CMS-first, template-fallback — always renders.
 */
export function JobsSection({ jobs }: { jobs: ResolvedWorkWithUs['jobs'] }) {
  const loadMoreMotionProps = useButtonMotionProps();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState(ALL);
  const [jobType, setJobType] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [detailsJob, setDetailsJob] = useState<JobListingModel | null>(null);
  const [applyJob, setApplyJob] = useState<JobListingModel | null>(null);

  const departments = useMemo(() => Array.from(new Set(jobs.items.map((j) => j.department))), [jobs.items]);
  const jobTypes = useMemo(() => Array.from(new Set(jobs.items.map((j) => j.jobType))), [jobs.items]);
  const locations = useMemo(() => Array.from(new Set(jobs.items.map((j) => j.location))), [jobs.items]);

  const filtered = useMemo(
    () =>
      jobs.items.filter((job) => {
        const matchesSearch = search.trim() === '' || job.title.toLowerCase().includes(search.trim().toLowerCase());
        const matchesDepartment = department === ALL || job.department === department;
        const matchesJobType = jobType === ALL || job.jobType === jobType;
        const matchesLocation = location === ALL || job.location === location;
        return matchesSearch && matchesDepartment && matchesJobType && matchesLocation;
      }),
    [jobs.items, search, department, jobType, location]
  );

  const visibleJobs = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <section id="open-positions" className="bg-[#f9f9f7] py-16 sm:py-20 lg:pb-[76px] lg:pt-[88px]">
      <Container>
        <div className="mx-auto text-center">
          <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{jobs.eyebrow}</p>
          <h2 className="mt-[26px] font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            {jobs.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-[817px] font-sans text-[16px] leading-[1.9] text-[#02060e]/80 lg:mt-[29px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">{jobs.body}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setVisibleCount(PAGE_SIZE);
          }}
          className="mx-auto mt-10 max-w-[1387px] rounded-[18px] border border-[#efefe9] bg-white/85 p-4 backdrop-blur-[12px] lg:mt-[48px] lg:px-[35px] lg:py-[33px]"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-end lg:gap-x-[16px]">
            <div className="relative flex h-16 items-center rounded-[8px] border border-[#ededed] bg-white px-[13px] transition-colors focus-within:border-[#a3282a] lg:mb-0 lg:w-[330px] lg:shrink-0">
              <Search className="size-6 shrink-0 text-[#02060e]" strokeWidth={1.5} aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for job roles..."
                aria-label="Search for job roles"
                className="ml-[10px] h-full min-w-0 flex-1 bg-transparent font-nav text-[13px] font-medium text-[#02060e] placeholder:text-[#5e5e5e] focus:outline-none"
              />
            </div>
            <FilterSelect label="Department" value={department} onChange={setDepartment} all="All Departments" options={departments} />
            <FilterSelect label="Job Type" value={jobType} onChange={setJobType} all="All Types" options={jobTypes} />
            <FilterSelect label="Location" value={location} onChange={setLocation} all="All Locations" options={locations} />
            <button
              type="submit"
              className="flex h-[60px] items-center justify-center rounded-[4px] bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-10 font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.78px] text-white transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:col-span-2 lg:ml-[1px] lg:w-[141px] lg:shrink-0 lg:px-0"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mx-auto mt-8 flex max-w-[1384px] flex-col gap-[14px] lg:mt-[44px]">
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job) => <JobCard key={job.id} job={job} onViewDetails={() => setDetailsJob(job)} onApply={() => setApplyJob(job)} />)
          ) : (
            <p className="text-center opacity-70">No open positions match your filters right now.</p>
          )}
        </div>

        {jobs.items.length > 0 && (
          <div className="mt-10 flex justify-center lg:mt-[36px]">
            <motion.button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              disabled={!hasMore}
              className="flex h-14 w-[208px] items-center justify-center rounded-[10px] border border-[#e1e1dc] px-10 font-sans text-[11px] font-bold uppercase tracking-[0.66px] text-[#04264e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 hover:border-brand-600"
              {...loadMoreMotionProps}
            >
              Load More
            </motion.button>
          </div>
        )}
      </Container>
      </section>

      {detailsJob && (
        <JobDetailsModal
          job={detailsJob}
          onClose={() => setDetailsJob(null)}
          onApply={() => {
            setApplyJob(detailsJob);
            setDetailsJob(null);
          }}
        />
      )}
      {applyJob && <JobApplicationModal jobTitle={applyJob.title} onClose={() => setApplyJob(null)} />}
    </>
  );
}
