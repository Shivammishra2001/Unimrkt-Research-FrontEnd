import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedWorkWithUs } from './fallback';

/** "Grow With Purpose" — Figma node 924:23216 (y3775-4428, 653px): #6c2a4a -> #be2c28 with the mirrored wallpaper at 20%
 * luminosity; white 13px eyebrow (cap-top +85), 52px Inter/-1px title (+113), 90% intro (+180); four 330x320 white cards
 * (1px #e0e0df, r24, 6/6/54 shadow) 40px apart from +242: 70px icon at 71, 24px SemiBold #04264e "1. Apply" title (cap-top 171),
 * 14px/1.6 copy at 70% (210). Step numbers are each card's 1-based position. No hover: the node defines none. */
export function WwuJourney({ journey }: { journey: ResolvedWorkWithUs['journey'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-4 py-16 text-white sm:px-6 lg:pb-[86px] lg:pt-[85px]">
      <div
        className="pointer-events-none absolute -left-[15.6%] -top-[38.2%] h-[176.1%] w-[131.2%] -scale-x-100 bg-[url('/images/industries/case-studies-wallpaper.jpg')] bg-[length:100%_100%] opacity-[0.12] mix-blend-luminosity"
        aria-hidden="true"
      />
      <div className="relative text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {journey.eyebrow}
        </p>
        <h2 className="mt-[19px] font-nav text-[32px] font-semibold leading-[1.2] tracking-[-1px] text-white sm:text-[40px] lg:text-[52px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {journey.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-[865px] font-sans text-[16px] font-normal leading-[1.9] text-white/90 lg:mt-[29px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {journey.body}
        </p>
      </div>

      <ul className="relative mx-auto mt-10 grid max-w-[1440px] grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[56px] lg:grid-cols-4 lg:gap-[40px]">
        {journey.items.map((item, i) => (
          <li
            key={item.id}
            className="flex min-h-[320px] flex-col items-center rounded-[24px] border border-[#e0e0df] bg-white px-6 pb-8 pt-[71px] text-center shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]"
          >
            <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[70px] text-[#a3282a]" />
            <h3 className="mt-[30px] font-sans text-[24px] font-semibold leading-[1.34] text-[#04264e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {i + 1}. {item.title}
            </h3>
            <p className="mt-[27px] max-w-[202px] font-sans text-[14px] font-normal leading-[1.6] text-black/70 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
