import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from './shared';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:26898-26913 (Components 1088-1107): 480x464 cards, copy verbatim.
const CARDS = [
  {
    icon: 'beyond-infrastructure.svg',
    title: 'Deep Industry Understanding',
    body: 'Research backed by deep knowledge of industry trends, evolving customer expectations, competitive landscapes and market dynamics. We combine sector expertise with rigorous research methodologies to uncover meaningful insights, identify opportunities, understand changing behaviors and help businesses make informed, confident strategic decisions.',
  },
  {
    icon: 'beyond-repair.svg',
    title: 'Cross-Industry Perspective',
    body: 'Identifying meaningful patterns and emerging opportunities by connecting insights across sectors, audiences and markets. Our cross-industry perspective helps uncover shared behaviors, evolving needs and market trends, enabling businesses to discover new possibilities, strengthen strategies and make more informed, forward-looking decisions.',
  },
  {
    icon: 'beyond-research.svg',
    title: 'Specialized Research Expertise',
    body: 'Applying qualitative, quantitative and customized research methodologies to address complex business questions. We combine the right approaches, tools and techniques to explore customer perspectives, validate hypotheses, measure market dynamics and generate reliable insights that support strategic planning, informed decision-making and sustainable business growth.',
  },
  {
    icon: 'beyond-dashboard.svg',
    title: 'Consumer & Market Insights',
    body: 'Understanding customer needs, behaviors, preferences and decision drivers to reveal what truly influences choices. Our research helps businesses identify customer expectations, uncover experience gaps and respond with greater confidence through informed strategies, relevant solutions and meaningful engagement across diverse audiences and markets.',
  },
  {
    icon: 'beyond-configuration.svg',
    title: 'Actionable Business Intelligence',
    body: 'Transforming research findings into practical, actionable insights that support strategy, innovation and growth. We translate complex data into clear direction, helping businesses identify opportunities, solve challenges, refine strategies, develop customer-focused solutions and make confident decisions that create meaningful, measurable impact.',
  },
  {
    icon: 'beyond-growth.svg',
    title: 'Better Decisions, Stronger Growth',
    body: 'Providing clarity that helps organizations make informed decisions, navigate changing markets and identify future opportunities. By turning research and market intelligence into clear, actionable insights, we help businesses understand what matters, respond to evolving needs, strengthen strategic direction and plan for sustainable growth.',
  },
];

/** "Beyond Industries / One Research Partner. Multiple Industries." —
 * Figma 1384:26772, y2950-4678 (#f9f9f7 with a white fade over the bottom
 * 423px) plus the "Have a Question?" band that overlaps its lower edge.
 * Six 480x464 cards (1px #e1e1df, r24, shadow 6 6 54 rgba(0,0,0,.03)) at
 * x=190/710/1230 with 40px gaps, first row y=3287. Icon 70px at (44,66);
 * title 22/29.5px #04264e; body 14/26.18px @ 70%. */
export function BeyondIndustriesSection() {
  return (
    <section className="relative bg-[#f9f9f7] pb-16 pt-16 lg:h-[1728px] lg:pb-0 lg:pt-[96px]">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[423px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative">
        <SectionHeader
          eyebrow="Beyond Industries"
          title="One Research Partner. Multiple Industries."
          titleMaxWidth="1011px"
          bodyMaxWidth="1182px"
          className="px-4 sm:px-6"
          body="Combining cross-industry experience with specialized research expertise, we uncover market opportunities, understand evolving customer behaviors and identify emerging trends. Our research-driven approach transforms data into actionable insights, helping businesses make informed decisions, strengthen strategies, respond to market changes and drive sustainable growth."
        />
        <div className="mx-auto mt-[55.5px] grid w-full max-w-[1520px] grid-cols-1 gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 min-[1600px]:px-0">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-[24px] border border-[#e1e1df] bg-white pb-10 pl-[43px] pr-[39px] pt-[65px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.03)] lg:min-h-[464px]"
            >
              <Image src={`${ICON_DIR}/${card.icon}`} alt="" width={70} height={70} className="size-[70px]" />
              <h3 className="mt-[23.3px] font-sans text-[22px] font-semibold leading-[29.48px] text-[#04264e]">{card.title}</h3>
              <p className="mt-[9.9px] font-sans text-[14px] font-normal leading-[26.18px] text-black opacity-70">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Have a Question? Let's Find the Answer." band — Figma 1384:26920:
 * 1600x455, r50, #6c2a4a -> #be2c28, a 20% luminosity texture, the
 * cut-out couple popping 85px above the band (690x541 at x=817), 52/62px
 * title (-3px) at x=114, 16/30.4px line @ 80%, and a 286x60 #040f1d
 * "Start a Conversation" button. Pulled up over the section above
 * (-264px) exactly like the node. */
export function QuestionBand() {
  return (
    <div className="relative z-10 mx-auto -mt-16 w-full max-w-[1600px] px-4 sm:px-6 lg:-mt-[264px] lg:px-8 min-[1700px]:px-0">
      <div className="relative min-h-[455px] rounded-[30px] bg-gradient-to-r from-gradient-from to-gradient-to lg:rounded-[50px]">
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
          <Image src="/images/industries/texture.jpg" alt="" fill sizes="1600px" className="object-cover opacity-20 mix-blend-luminosity" />
        </div>
        <div className="absolute right-0 top-[-85px] hidden h-[541px] w-[690px] overflow-hidden lg:block lg:right-[93px]" aria-hidden="true">
          <Image
            src="/images/industries/couple-cutout.webp"
            alt=""
            width={931}
            height={621}
            sizes="931px"
            className="absolute left-[-114.5px] top-[-80.3px] max-w-none"
          />
        </div>
        <div className="relative px-6 py-14 sm:px-10 lg:px-0 lg:py-0 lg:pl-[114px] lg:pt-[91px]">
          <h2 className="font-sans text-[34px] font-semibold capitalize leading-[41px] tracking-[-1.5px] text-white sm:text-[44px] sm:leading-[53px] lg:text-[52px] lg:leading-[62.4px] lg:tracking-[-3px]">
            Have a Question?
            <br />
            Let’s Find the Answer.
          </h2>
          <p className="mt-[13px] max-w-[674px] font-sans text-[16px] font-normal leading-[30.4px] text-white opacity-80">
            Research solutions designed around your business objectives, audience and market.
          </p>
          <Link
            href="/contact"
            className="mt-[43px] inline-flex h-[60px] items-center justify-center gap-1 rounded-[4px] bg-[#040f1d] px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 ease-in-out hover:brightness-125 motion-reduce:transition-none"
          >
            Start a Conversation
            <SendArrowIcon className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
