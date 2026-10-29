'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SectionHeader } from './shared';

const ICON_DIR = '/icons/industries';

// Figma nodes 1384:27056 (open) and 27020/27048/… (closed rows). The node
// only draws a description for the first question, so only that row
// expands; the other five are static rows exactly as drawn.
const QUESTIONS = [
  {
    icon: 'q-globe.svg',
    title: 'Market Opportunity',
    body: 'Identifying emerging trends, unmet needs and changing customer expectations to uncover opportunities for growth. Our research helps businesses understand market potential, assess competitive dynamics and identify the spaces where new products, services and strategies can create meaningful value.',
  },
  { icon: 'q-user.svg', title: 'Consumer Behavior' },
  { icon: 'q-ranking.svg', title: 'Competitive Landscape' },
  { icon: 'q-product.svg', title: 'Product & Innovation' },
  { icon: 'q-review.svg', title: 'Customer Experience' },
  { icon: 'q-trend.svg', title: 'Future Trends' },
];

/** "From Questions to Insights" — Figma 1384:26772, y4869-6075. A 666x737
 * card (#1a3546 + hard-light glass overlay, r30) at x=197 carries the
 * cut-out woman (590x809, rising 72px above it); the 734px list starts at
 * x=919: 64px #f6eaea icon rings with 34px icons, 18/27px titles
 * (#04264e), 20px plus / 19.7px dash glyphs, 105px row pitch with 1px
 * #bbb @ 40% dividers. Row 1 is open (description 14/26.6px @ 70%). */
export function QuestionsInsightsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white pb-16 pt-16 lg:h-[1206px] lg:pb-0 lg:pt-[93.6px]">
      <SectionHeader
        eyebrow="What We Help You Understand"
        title="From Questions to Insights"
        titleMaxWidth="658px"
        bodyMaxWidth="1182px"
        className="px-4 sm:px-6"
        body="Turning complex business questions into clear, actionable insights through structured research, reliable data and thoughtful analysis. We help businesses move beyond information to understand what matters, why it matters and how those insights can support confident decisions."
      />

      <div className="mx-auto mt-12 flex w-full max-w-[1506px] flex-col gap-10 px-4 sm:px-6 lg:mt-[158.9px] lg:flex-row lg:gap-0 lg:px-8 min-[1560px]:px-0">
        <div className="relative hidden h-[737px] w-[666px] min-w-[380px] shrink rounded-[30px] bg-[#1a3546] lg:block">
          <Image src={`${ICON_DIR}/card-bg-160.svg`} alt="" width={666} height={737} className="absolute inset-0 size-full mix-blend-hard-light" />
          <div className="absolute left-[4.5%] top-[-9.77%] aspect-[590/809] w-[88.6%] overflow-hidden">
            <Image
              src="/images/industries/woman-cutout.webp"
              alt="Researcher thinking through a business question"
              width={1320}
              height={880}
              sizes="1320px"
              className="absolute left-[-76.62%] top-[-8.81%] h-[108.81%] w-[223.71%] max-w-none"
            />
          </div>
        </div>

        <ul className="w-full min-w-0 lg:ml-[56px] lg:max-w-[734px] lg:flex-1 lg:pt-[34px]">
          {QUESTIONS.map((item, i) => {
            const expandable = Boolean(item.body);
            const isOpen = expandable && openIndex === i;
            const row = (
              <>
                <span className="relative mt-0 size-[64px] shrink-0 lg:mt-[6px]" aria-hidden="true">
                  <Image src={`${ICON_DIR}/q-ring.svg`} alt="" width={64} height={64} className="absolute inset-0 size-full" />
                  <Image src={`${ICON_DIR}/${item.icon}`} alt="" width={34} height={34} className="absolute left-[15px] top-[15px] size-[34px]" />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className={`block font-sans text-[18px] font-semibold leading-[27px] text-[#04264e] ${isOpen ? '' : 'lg:mt-[18.5px]'}`}>{item.title}</span>
                  <AnimatePresence initial={false}>
                    {isOpen && item.body && (
                      <motion.span
                        key="body"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-[24px] block max-w-[620px] font-sans text-[14px] font-normal leading-[26.6px] text-[#02060e] opacity-70">
                          {item.body}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                {expandable && (
                  <Image
                    src={`${ICON_DIR}/${isOpen ? 'q-dash.svg' : 'q-chevron.svg'}`}
                    alt=""
                    width={20}
                    height={20}
                    className={`mt-[6px] shrink-0 ${isOpen ? 'h-[1.7px] w-[19.7px] lg:mt-[44px]' : 'size-5 lg:mt-[28px]'}`}
                    aria-hidden="true"
                  />
                )}
              </>
            );
            return (
              <li key={item.title} className={i === 0 ? '' : 'mt-[20px]'}>
                {i > 0 && <div className="-ml-[10px] mb-[20px] hidden h-px w-[calc(100%+10px)] max-w-[763px] bg-[#bbb]/40 lg:block" aria-hidden="true" />}
                {expandable ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start gap-[21px] text-left"
                  >
                    {row}
                  </button>
                ) : (
                  <div className="flex w-full items-start gap-[21px]">{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
