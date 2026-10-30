import Image from 'next/image';
import { SectionHeader } from './shared';
import type { IndustriesPageContent } from '@/models/industriesPage';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27086-27088 (Components 1094-1096). Copy comes from the CMS
// (Pages > Industries); the icons are fixed by card position.
const ICONS = ['case-connection.svg', 'case-cogwheel.svg', 'case-insight.svg'];

/** "From Business Questions to Meaningful Outcomes" — Figma 1384:26772,
 * y6075-6926 (#f9f9f7, a white fade over the top 168px). Three 500x443
 * cards (1px #e0e0df, r24, shadow 6 6 54 rgba(0,0,0,.08)) at x=160/690/
 * 1220 (30px gaps), y=6359. Icon 70px at (48,41); title 22/29.5px
 * #04264e; body 14/26.18px @ 70%. */
export function CaseStudiesSection({ content }: { content: IndustriesPageContent['cases'] }) {
  return (
    <section className="relative bg-[#f9f9f7] py-16 lg:h-[851px] lg:pb-0 lg:pt-[77.6px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[168px]"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.heading}
          titleMaxWidth="1181px"
          bodyMaxWidth="1252px"
          className="px-4 sm:px-6"
          body={content.body}
        />
        <div className="mx-auto mt-[44.9px] grid w-full max-w-[1560px] grid-cols-1 gap-[30px] px-4 sm:px-6 lg:grid-cols-3 lg:px-8 min-[1620px]:px-0">
          {content.cards.map((item, i) => (
            <article
              key={item.title}
              className="group cursor-pointer rounded-[24px] border border-[#e0e0df] bg-white pb-10 pl-[47px] pr-[48px] pt-[40px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none lg:min-h-[443px]"
            >
              <span className="block w-[70px] origin-left transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
                <Image src={`${ICON_DIR}/${ICONS[i % ICONS.length]}`} alt="" width={70} height={70} className="size-[70px]" />
              </span>
              <h3 className="mt-[29.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">{item.title}</h3>
              <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
