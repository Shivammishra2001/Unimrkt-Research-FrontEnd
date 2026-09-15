'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/views/ui/Container';
import { LocationPinIcon } from '@/views/ui/icons/LocationPinIcon';
import { Briefcase, Users, Calendar, Search } from 'lucide-react';
import { JobDetailsModal } from './JobDetailsModal';
import { JobApplicationModal } from './JobApplicationModal';
import type { ResolvedWorkWithUs } from './fallback';
import type { JobListingModel } from '@/models/workWithUsPage';

const PAGE_SIZE = 4;
const ALL = 'All';

const SELECT_CLASS =
  'h-[65px] w-full appearance-none rounded-[10px] border border-[#ebebe4] bg-white px-4 pt-[22px] pb-2 font-sans text-sm font-medium text-heading focus:outline-none focus:ring-2 focus:ring-brand-600';

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
    <div className="relative flex flex-col gap-6 rounded-[18px] border border-[#ebebe4] bg-white p-6 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center sm:gap-8">
      <span className="flex size-[74px] shrink-0 items-center justify-center rounded-full bg-brand-600/10 text-brand-600">
        <Briefcase className="size-11" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="flex-1">
        <p className="text-xl font-semibold leading-none text-[#04264e]">{job.title}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
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
      <div className="flex shrink-0 gap-3">
        <motion.button
          type="button"
          onClick={onViewDetails}
          className="flex h-14 items-center justify-center rounded-[4px] border border-[#962b39] px-6 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-[#7e2a43] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 hover:bg-[#962b39]/5"
          {...motionProps}
        >
          View Details
        </motion.button>
        <motion.button
          type="button"
          onClick={onApply}
          className="flex h-14 items-center justify-center rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-6 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 hover:brightness-110"
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
      <section id="open-positions" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{jobs.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {jobs.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{jobs.body}</p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-[20px] border border-[#ebebe4] bg-white p-6 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative flex h-[65px] items-center rounded-[10px] border border-[#ebebe4] bg-white px-4 transition-colors focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600">
              <Search className="size-5 shrink-0 text-heading/50" strokeWidth={1.5} aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for job roles..."
                aria-label="Search for job roles"
                className="ml-3 h-full flex-1 bg-transparent font-sans text-sm text-heading placeholder:text-heading/50 focus:outline-none"
              />
            </div>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department" className={SELECT_CLASS}>
              <option value={ALL}>All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)} aria-label="Filter by job type" className={SELECT_CLASS}>
              <option value={ALL}>All Types</option>
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} aria-label="Filter by location" className={SELECT_CLASS}>
              <option value={ALL}>All Locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-6">
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job) => <JobCard key={job.id} job={job} onViewDetails={() => setDetailsJob(job)} onApply={() => setApplyJob(job)} />)
          ) : (
            <p className="text-center opacity-70">No open positions match your filters right now.</p>
          )}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="flex h-14 items-center justify-center rounded-[4px] border border-[#ebebe4] px-10 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 hover:border-brand-600"
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
