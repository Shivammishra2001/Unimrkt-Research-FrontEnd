import { ScrollCards } from '@/views/industries/detail/ScrollCards';

/** "How it works" — Figma 1495:16486-16590 (y3139-3887, #f9f9f7): 13px #cc1f1f eyebrow (cap-top +83), 52px/-3px title, 80%
 * intro, then 460x282 step cards (1px #e0e0df, r24, 6/6/54 shadow) in a scroller that bleeds off the right edge, with the
 * 3-dot pager under the row. Card: 70px #a3282a disc (48, 44.5) with a 32px white numeral, 22px SemiBold #04264e title
 * (cap-top 151), 14px/1.87 copy at 70% (188). */
const STEPS = [
  { n: '01', title: 'Share Your Requirement', copy: 'Tell us about your business question, target audience, market or research objective.' },
  { n: '02', title: 'Discuss Your Objectives', copy: 'Our team connects with you to understand the context, challenges and desired outcomes.' },
  { n: '03', title: 'Define The Approach', copy: 'We recommend the appropriate methodology, audience, geography and research approach.' },
  { n: '04', title: 'Receive A Proposal', copy: 'You receive a clear research plan aligned with your objectives, timelines and requirements.' },
] as const;

export function HowItWorksSection() {
  return (
    <section className="bg-[#f9f9f7] py-16 lg:pb-[181px] lg:pt-[83px]">
      <div className="px-4 text-center sm:px-6">
        <p className="font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-[#cc1f1f] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          How it works
        </p>
        <h2 className="mx-auto mt-[26px] max-w-[905px] font-sans text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] sm:text-[42px] lg:text-[52px] lg:tracking-[-3px] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          What Happens After You Contact Us?
        </h2>
        <p className="mx-auto mt-6 max-w-[885px] font-sans text-[16px] font-normal leading-[1.9] text-[#02060e]/80 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
          A simple process designed to understand your requirement and connect you with the right research expertise.
        </p>
      </div>

      <div className="mt-8 lg:mt-[47px] lg:[&_[role=tablist]]:!-mt-4">
        <ScrollCards label="How it works">
          {STEPS.map((step) => (
            <li key={step.n} className="w-[min(460px,86vw)] shrink-0">
              <div className="relative h-[282px] rounded-[24px] border border-[#e0e0df] bg-white shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]">
                <span className="absolute left-[10.43%] top-[44.5px] flex size-[70px] items-center justify-center rounded-full bg-[#a3282a] font-sans text-[32px] font-semibold leading-[1.2] text-white">
                  {step.n}
                </span>
                <h3 className="absolute left-[10.43%] top-[151px] font-sans text-[22px] font-semibold leading-[1.34] text-[#04264e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {step.title}
                </h3>
                <p className="absolute left-[10.43%] right-[11.3%] top-[188px] font-sans text-[14px] font-normal leading-[1.87] text-black/70 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {step.copy}
                </p>
              </div>
            </li>
          ))}
        </ScrollCards>
      </div>
    </section>
  );
}
