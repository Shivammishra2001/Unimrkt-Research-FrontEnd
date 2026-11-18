import Image from 'next/image';
import { SectionHeader } from '@/views/industries/listing/shared';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedServiceDetail } from './fallback';

/** iconIdentifier (CMS) -> the 50px line illustration Figma 474:5264-5603 draws on that card. */
const INDUSTRY_ICONS = new Set(['car', 'heart-pulse', 'landmark', 'shopping-bag', 'cpu', 'factory', 'flash', 'shopping-cart', 'radio', 'more']);

/** "Industries We Support" — Figma 474:5732-5735 + 474:5742-5744/5900 + 474:6124-6133 (y4686-5599, white with the
 * wave artwork at 50%). Eyebrow cap-top +103, 50/60 title, 2-line body (969px), then ten 287x230 cards in a 5x2 grid
 * (31px / 32px gaps) from y4988: #fbf6f6, 1px #a3282a @ 12%, r20; a 90px white disc (1.7px #872b3e @ 10%) at +42
 * holding the 50px icon, the 18px SemiBold #02060e label (cap +160). Hover (474:5263): the card turns #a3282a, the
 * label white, and it grows ~4%. */
export function IndustriesServedSection({ industries }: { industries: ResolvedServiceDetail['industries'] }) {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:pb-[119px] lg:pt-[99.6px]">
      <div className="pointer-events-none absolute left-1/2 top-[-150px] h-[1590px] w-[3632px] -translate-x-1/2 opacity-50" aria-hidden="true">
        <Image src="/images/services/listing/showcase-waves.webp" alt="" fill sizes="3632px" className="object-cover" />
      </div>
      <div className="relative">
        <SectionHeader
          eyebrow={industries.eyebrow}
          title={industries.heading}
          titleMaxWidth="1100px"
          bodyMaxWidth="969px"
          className="px-4 sm:px-6"
          body={<div className="lg:mt-[3px]">{industries.body}</div>}
        />
        <ul className="mx-auto mt-10 grid w-full max-w-[1623px] grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-6 md:grid-cols-5 md:gap-3 lg:mt-[43px] lg:grid-cols-5 lg:gap-x-[31px] lg:gap-y-8 lg:px-8 min-[1700px]:max-w-[1559px] min-[1700px]:px-0">
          {industries.items.map((item) => (
            <li
              key={item.id}
              className="group flex min-h-[190px] flex-col items-center rounded-[20px] border border-[rgba(163,40,42,0.12)] bg-[#fbf6f6] px-3 pb-8 pt-8 text-center transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.042] hover:bg-[#a3282a] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:min-h-[230px] sm:pt-[42px]"
            >
              <span className="flex size-[76px] shrink-0 items-center justify-center rounded-full border-[1.7px] border-[#872b3e]/10 bg-white sm:size-[90px]">
                {!item.icon && item.iconIdentifier && INDUSTRY_ICONS.has(item.iconIdentifier) ? (
                  <Image src={`/icons/services/detail/industry-${item.iconIdentifier}.svg`} alt="" width={50} height={50} className="size-10 sm:size-[50px]" />
                ) : (
                  <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-10 text-[#a3282a] sm:size-[50px]" />
                )}
              </span>
              <p className="mt-[23.3px] font-sans text-[16px] font-semibold capitalize leading-[1.2] text-[#02060e] transition-colors duration-500 group-hover:text-white md:text-[15px] lg:text-[18px]">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
