import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedContact } from './fallback';

// The exact pictograms drawn in Figma 1008:26036-26063 (44px, #a3282a).
const STAT_ICONS: Record<string, string> = {
  global: '/figma-contact/stat-global.svg',
  'language-circle': '/figma-contact/stat-language.svg',
  call: '/figma-contact/stat-call.svg',
  'medal-star': '/figma-contact/stat-medal.svg',
};

/** "Research at a Global Scale" band — Figma 637:10433 (y828-1225, 397px, #f9f9f7): 28px title (cap-top +43), four
 * 240x248 frosted cards (white 65%, blur 12, 1px #e2e2e0, r19) 30px apart — 80px icon disc 37px from the top, 34px Bold
 * #04264e figure and 16px label 15/12px below. CMS-first, template-fallback. */
export function ContactStats({ stats }: { stats: ResolvedContact['stats'] }) {
  return (
    <section className="bg-[#f9f9f7] px-4 py-14 sm:px-6 lg:pb-[58px] lg:pt-[43px]">
      <h2 className="text-center font-sans text-[24px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#02060e] sm:text-[28px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
        {stats.heading}
      </h2>
      <div className="mx-auto mt-8 grid max-w-[1050px] grid-cols-2 gap-4 lg:mt-[28px] lg:grid-cols-4 lg:gap-[30px]">
        {stats.items.map((stat) => {
          const icon = stat.iconIdentifier ? STAT_ICONS[stat.iconIdentifier] : undefined;
          return (
            <div
              key={stat.id}
              className="flex min-h-[220px] flex-col items-center rounded-[19px] border border-[#e2e2e0] bg-white/65 px-3 pt-8 text-center backdrop-blur-[12px] lg:h-[248px] lg:pt-[37px]"
            >
              <span className="flex size-20 items-center justify-center rounded-full border border-[#a3282a]/10 bg-white/80">
                {icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={icon} alt="" width={44} height={44} className="size-11" />
                ) : (
                  <DetailCardIcon iconIdentifier={stat.iconIdentifier} className="size-11 text-[#a3282a]" />
                )}
              </span>
              <p className="mt-[15px] font-sans text-[30px] font-bold leading-[1.34] text-[#04264e] sm:text-[34px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {stat.value}
              </p>
              <p className="mt-3 font-sans text-[16px] font-normal leading-[1.34] text-black [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
