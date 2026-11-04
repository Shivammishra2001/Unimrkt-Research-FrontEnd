import { StrapiImage } from '@/views/ui/StrapiImage';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedWorkWithUs } from './fallback';

/** "More Than Just a Job" — Figma node 924:23216 (y1660-2481, 821px): a 673x620 r24 photo at (150, +95) and, from x906, the
 * 13px #cc1f1f eyebrow (cap-top +125), 52px/-3px title (+158), 833px intro (+229), 24px SemiBold "Benefits:" (+322) and the
 * 8 benefits in two columns 400px apart, rows 82px apart from +365 — a 64px #a3282a disc with a 34px icon, 16px SemiBold
 * #02060e label 13px after it. No hover: plain rows, no variant in the node. */
export function WwuBenefits({ benefits }: { benefits: ResolvedWorkWithUs['benefits'] }) {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:pb-[106px] lg:pt-[95px]">
      <div className="mx-auto grid w-full max-w-[1600px] items-start gap-10 lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] lg:gap-x-10 min-[1536px]:grid-cols-[673px_minmax(0,1fr)] min-[1536px]:gap-x-[83px]">
        <div className="relative aspect-[673/620] overflow-hidden rounded-[24px] bg-slate-100">
          {benefits.image && <StrapiImage image={benefits.image} sizes="(min-width: 1024px) 673px, 100vw" fill className="object-cover" />}
        </div>
        <div className="lg:pt-[30px]">
          <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            {benefits.eyebrow}
          </p>
          <h2 className="mt-[26px] font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            {benefits.heading}
          </h2>
          <p className="mt-6 max-w-[833px] font-sans text-[16px] font-normal leading-[1.9] text-[#02060e]/80 lg:mt-[33px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            {benefits.body}
          </p>

          <p className="mt-8 font-sans text-[24px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e] lg:mt-[73px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
            {benefits.label}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-x-[36px] gap-y-[18px] sm:grid-cols-2 lg:mt-[43px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-0">
            {benefits.items.map((item) => (
              <div key={item.id} className="flex h-16 items-center gap-[13px]">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#a3282a] text-white">
                  <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[34px] text-white" />
                </span>
                <p className="font-sans text-[14px] font-semibold leading-[1.3] text-[#02060e] sm:text-[16px]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
