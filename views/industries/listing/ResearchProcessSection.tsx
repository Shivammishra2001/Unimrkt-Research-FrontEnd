'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { SectionHeader } from './shared';
import { DotPagination } from '../DotPagination';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27094-27097 (Components 1101-1104), copy verbatim.
const STEPS = [
  {
    no: '01',
    icon: 'process-clipboard.svg',
    title: 'Understand',
    body: 'We begin by understanding your business question, objectives and the decisions you need to make. By identifying the core challenge, market context and information gaps, we establish a clear research direction that keeps the study focused, relevant and aligned with your strategic priorities, customer needs and desired business outcomes.',
  },
  {
    no: '02',
    icon: 'process-brush.svg',
    title: 'Design',
    body: 'We select the right research methodology and audience based on your objectives, market and business needs. From qualitative and quantitative approaches to specialized research techniques, we identify the most relevant participants, markets and channels to ensure meaningful data, reliable findings and insights that directly address your research questions.',
  },
  {
    no: '03',
    icon: 'process-presentation.svg',
    title: 'Research',
    body: 'We gather relevant primary and secondary data from credible sources and carefully selected audiences. Through surveys, interviews, discussions, desk research and other appropriate methods, we collect reliable evidence that provides a comprehensive understanding of market conditions, customer behaviors, industry trends and the factors influencing key business decisions.',
  },
  {
    no: '04',
    icon: 'process-chart.svg',
    title: 'Analyze',
    body: 'We analyze the research to identify meaningful patterns, key drivers, emerging trends and untapped opportunities. By connecting data points across audiences, markets and industries, we uncover what influences decisions, where gaps exist and which opportunities can help businesses strengthen strategies and respond effectively to changing market needs.',
  },
];

/** "Turning Research Into Impact" — Figma 1384:26772, y7704-8668
 * (#f9f9f7 with a 6% luminosity texture). Four 460x540 cards (1px
 * #e0e0df, r24, shadow 6 6 54 rgba(0,0,0,.08)) at x=150 with 28px gaps in
 * a horizontal row that runs off the frame's right edge (the 4th card
 * starts at x=1614), y=8002; 78x15 dots at y=8568. Step number 66/79.2px
 * @ 15%, icon 70px at (48,155), title 22px, body 14/26.18px @ 70%. */
export function ResearchProcessSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActive(i);
  }

  function onScroll() {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    setActive(Math.min(STEPS.length - 1, Math.round(track.scrollLeft / (first.offsetWidth + 28))));
  }

  return (
    <section className="relative overflow-hidden bg-[#f9f9f7] py-16 lg:h-[964px] lg:pb-0 lg:pt-[80.6px]">
      <Image src="/images/industries/process-bg.jpg" alt="" fill sizes="1900px" className="pointer-events-none object-cover object-top opacity-[0.06] mix-blend-luminosity" />
      <div className="relative">
        <SectionHeader
          eyebrow="Industry Research Process"
          title="Turning Research Into Impact"
          titleMaxWidth="718px"
          bodyMaxWidth="1234px"
          className="px-4 sm:px-6"
          body="Transforming industry questions, market data and customer insights into actionable strategies that help businesses make informed decisions. Our research connects evidence with business objectives, uncovering meaningful opportunities, addressing challenges and enabling organizations to create measurable impact, strengthen strategies and support sustainable growth."
        />
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="mt-[31.5px] flex snap-x snap-mandatory gap-[28px] overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] sm:px-6 lg:scroll-pl-[max(32px,calc(50vw-800px))] lg:pl-[max(32px,calc(50vw-800px))] lg:pr-8 [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((step) => (
            <li
              key={step.no}
              className="relative w-[85vw] shrink-0 snap-start rounded-[24px] border border-[#e0e0df] bg-white pb-6 pl-[47px] pr-[41px] pt-[33px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] sm:w-[460px] lg:min-h-[540px]"
            >
              <p className="font-sans text-[66px] font-semibold capitalize leading-[79.2px] tracking-[-1px] text-[#02060e] opacity-15">{step.no}</p>
              <Image src={`${ICON_DIR}/${step.icon}`} alt="" width={70} height={70} className="mt-[41.8px] size-[70px]" />
              <h3 className="mt-[13.8px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">{step.title}</h3>
              <p className="mt-[9.4px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{step.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-[2px] flex justify-center">
          <DotPagination count={STEPS.length - 1} activeIndex={Math.min(active, STEPS.length - 2)} onSelect={scrollToIndex} />
        </div>
      </div>
    </section>
  );
}
