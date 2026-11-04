import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedWorkWithUs } from './fallback';

// The exact pictograms drawn in Figma 921:17985 / 924:18239 / 921:18007 / 924:18287 / 921:18037 / 924:18305 / 921:18093 / 924:18312 (50px).
const VALUE_ICONS: Record<string, string> = {
  'clear communication': 'clear',
  'team work': 'team',
  innovation: 'innovation',
  'business ethics': 'ethics',
  wisdom: 'wisdom',
  diversity: 'diversity',
  integrity: 'integrity',
  transparency: 'transparency',
};

/** "What Drives Us" — Figma node 924:23216 (y828-1660, 832px, wave pattern, 1px rule at the bottom): 13px #cc1f1f eyebrow
 * (cap-top +87), 52px/-3px title (+120), 80% intro (+185), then eight 287x230 cards (#fbf6f6, 1px rgba(163,40,42,.12), r20)
 * in 4 columns 31px apart, rows 32px apart: 100px white disc (1px #872b3e/10) 42px from the top with the node's own 50px pictogram, 18px SemiBold title
 * (cap-top 160). Figma defines no hover variant; on request the card only lifts 4px with a soft shadow and the icon disc zooms slightly — colours stay static. */
export function WwuValues({ values }: { values: ResolvedWorkWithUs['values'] }) {
  return (
    <section className="relative overflow-hidden border-b border-[#e6e6e2] bg-white px-4 pb-14 pt-14 sm:px-6 lg:pb-[94px] lg:pt-[87px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[832px] bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
        style={{ backgroundImage: "url('/images/gallery/wave-pattern.png')" }}
        aria-hidden="true"
      />
      <div className="relative text-center">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {values.eyebrow}
        </p>
        <h2 className="mt-[26px] font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {values.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-[969px] font-sans text-[16px] font-normal leading-[1.9] text-[#02060e]/80 lg:mt-[29px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          {values.body}
        </p>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-[1241px] grid-cols-2 gap-4 lg:mt-[47px] lg:grid-cols-4 lg:gap-x-5 lg:gap-y-6 min-[1536px]:left-[15px] min-[1536px]:gap-x-[31px] min-[1536px]:gap-y-8">
        {values.items.map((item) => {
          const key = VALUE_ICONS[item.title.trim().toLowerCase()];
          return (
            <div
              key={item.id}
              className="group flex min-h-[200px] cursor-pointer flex-col items-center rounded-[20px] border border-[rgba(163,40,42,0.12)] bg-[#fbf6f6] px-3 pt-8 text-center transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none lg:h-[230px] lg:pt-[41px]"
            >
              <span className="flex size-[100px] items-center justify-center rounded-full border border-[#872b3e]/10 bg-white transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none">
                {key ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/figma-wwu/value-${key}.svg`}
                    alt=""
                    width={50}
                    height={50}
                    className={`size-[50px] ${key === 'wisdom' ? '-translate-y-0.5' : ''}`}
                  />
                ) : (
                  <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[50px] text-[#a3282a]" />
                )}
              </span>
              <p className="mt-4 font-sans text-[16px] font-semibold capitalize leading-[1.2] text-[#02060e] sm:text-[18px] lg:mt-[18px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
