import Image from 'next/image';
import { SectionHeader } from './shared';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27086-27088 (Components 1094-1096), copy verbatim.
const CASES = [
  {
    icon: 'case-connection.svg',
    title: 'The Challenge',
    body: 'The starting point of every research project is understanding the business challenge. We identify the key questions, market gaps, customer needs and decision-making challenges that require deeper clarity. This helps define the research direction, focus on what matters most and establish a clear foundation for meaningful, actionable insights.',
  },
  {
    icon: 'case-cogwheel.svg',
    title: 'The Approach',
    body: 'We design the right research methodology around the business objective, identify and reach the most relevant audiences, and gather reliable, meaningful evidence. From research design and audience selection to fieldwork and data collection, every step is carefully planned to ensure the findings are accurate, relevant and useful for decision-making.',
  },
  {
    icon: 'case-insight.svg',
    title: 'The Insight',
    body: 'We analyze the research to uncover meaningful patterns, customer behaviors, emerging needs, market trends and hidden opportunities. By connecting the findings and looking beyond surface-level responses, we turn complex research data into clear insights that reveal what matters most and where businesses can create greater value and impact.',
  },
];

/** "From Business Questions to Meaningful Outcomes" — Figma 1384:26772,
 * y6075-6926 (#f9f9f7, a white fade over the top 168px). Three 500x443
 * cards (1px #e0e0df, r24, shadow 6 6 54 rgba(0,0,0,.08)) at x=160/690/
 * 1220 (30px gaps), y=6359. Icon 70px at (48,41); title 22/29.5px
 * #04264e; body 14/26.18px @ 70%. */
export function CaseStudiesSection() {
  return (
    <section className="relative bg-[#f9f9f7] py-16 lg:h-[851px] lg:pb-0 lg:pt-[77.6px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[168px]"
        style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          eyebrow="Featured Case Studies"
          title="From Business Questions to Meaningful Outcomes"
          titleMaxWidth="1181px"
          bodyMaxWidth="1252px"
          className="px-4 sm:px-6"
          body="Explore how Unimrkt helps businesses address complex challenges through focused research, deeper customer understanding and actionable insights. Each case study showcases the journey from the initial business question to decisions that create measurable value."
        />
        <div className="mx-auto mt-[44.9px] grid w-full max-w-[1560px] grid-cols-1 gap-[30px] px-4 sm:px-6 lg:grid-cols-3 lg:px-8 min-[1620px]:px-0">
          {CASES.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-[#e0e0df] bg-white pb-10 pl-[47px] pr-[48px] pt-[40px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] lg:min-h-[443px]"
            >
              <Image src={`${ICON_DIR}/${item.icon}`} alt="" width={70} height={70} className="size-[70px]" />
              <h3 className="mt-[29.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">{item.title}</h3>
              <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
