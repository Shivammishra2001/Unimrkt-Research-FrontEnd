import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { MedalIcon } from '@/views/ui/icons/MedalIcon';
import { LocationPinIcon } from '@/views/ui/icons/LocationPinIcon';
import { LanguageIcon } from '@/views/ui/icons/LanguageIcon';
import { LikeIcon } from '@/views/ui/icons/LikeIcon';

const EXPLORE_LINK = { id: 'industries-hero-explore', label: 'Explore Industries', href: '#industries-grid', isExternal: false, variant: 'secondary' as const };
const TALK_LINK = { id: 'industries-hero-talk', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'primary' as const };

// Figma node 384:5881 — verbatim figures, already used elsewhere sitewide
// (homepage stats-band / About-Unimrkt hero), just laid out here as an
// icon+value+label row inside the hero's dark band.
const STATS = [
  { Icon: MedalIcon, value: '16+', label: 'Years of Excellence' },
  { Icon: LocationPinIcon, value: '90+', label: 'Countries Covered' },
  { Icon: LanguageIcon, value: '22+', label: 'Languages Supported' },
  { Icon: LikeIcon, value: '250K+', label: 'Surveys Annually' },
] as const;

/** /industries hero — Figma node 384:5771 (y0-881). Dark bg photo
 * ("2432629_Electricity_Power"), eyebrow, H1, subheading, two CTAs, and
 * the 4-stat row inside the same dark band (confirmed by y-coordinates —
 * not a separate section), followed by the breadcrumb bar. */
export function IndustryHero() {
  return (
    <>
      <section className="relative flex min-h-[560px] w-full flex-col justify-end overflow-hidden text-white sm:min-h-[680px] lg:min-h-[830px]">
        <Image src="/images/industries/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040112] via-[#040112]/75 to-[#040112]/40" />
        <div className="absolute inset-0 bg-[#040112]/35" />
        <div className="relative z-10 mx-auto flex w-full max-w-container flex-col gap-10 px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-[65px] lg:pt-40">
          <div>
            <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
              <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
              Industries We Serve
            </p>
            <h1 className="mt-3 max-w-[768px] text-4xl font-semibold capitalize leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
              Industry Expertise. Insights That Drive Growth.
            </h1>
            <p className="mt-6 max-w-[757px] text-base leading-[1.9] text-white/85 sm:text-lg">
              Data-driven market research solutions tailored to the unique challenges of your industry.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button link={EXPLORE_LINK} />
              <Button link={TALK_LINK} />
            </div>
          </div>

          <div className="flex flex-wrap gap-x-[108px] gap-y-8">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-5">
                <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon className="size-[39px] text-white" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-[14px]">
                  <p className="text-[36px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-white">{value}</p>
                  <p className="whitespace-nowrap text-base leading-[1.9] text-white/80">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full border-b border-card-border bg-white shadow-card">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-sans text-sm font-semibold text-[#b52c2c]">
            Home
          </Link>
          <ChevronIcon className="size-3.5 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="font-sans text-sm text-[#868484]">Industries</span>
        </div>
      </div>
    </>
  );
}
