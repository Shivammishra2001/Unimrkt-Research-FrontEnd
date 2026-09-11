'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/views/ui/Container';
import { PlusIcon } from '@/views/ui/icons/PlusIcon';
import type { FaqItemModel } from '@/models/domain';

/**
 * Shared accordion mechanics (single-open, plus-to-x rotation,
 * height/opacity spring) for both /blogs (the 5 static sitewide
 * questions + "Browse Blogs" CTA, Figma 522:4788-4832) and
 * /blogs/[slug] (the post's own `faqItems`, no CTA — Figma
 * 587:3414-596:4068, confirmed no button sits above that heading).
 * Bespoke duplicate of ServiceFaqAccordion's pattern — /blogs isn't a
 * dynamic-zone page either, so it can't reuse blocks.faq/FaqView
 * directly, same reasoning as that component's own comment.
 */
export function BlogFaqAccordion({
  heading,
  items,
  showCta = false,
}: {
  heading: string;
  items: FaqItemModel[];
  showCta?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <Image
        src="/mock/faq-worldmap-bg.svg"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-contain opacity-[0.05]"
      />
      <Container className="relative flex flex-col items-center">
        {showCta && (
          <Link
            href="/blogs"
            className="inline-flex h-[60px] items-center justify-center gap-2 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-transform hover:brightness-110"
          >
            Browse Blogs
          </Link>
        )}
        <h2 className={`${showCta ? 'mt-6' : ''} max-w-3xl text-center capitalize text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[50px] lg:tracking-[-3px]`}>
          {heading}
        </h2>

        <div className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="rounded-faq border border-[#f9edf8] bg-white shadow-faq">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-accent text-lg font-bold text-faq-text">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                    className="shrink-0 text-faq-text"
                  >
                    <PlusIcon className="size-5" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed opacity-80">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** The 5 static sitewide questions (Figma node 522:4791-4795, verbatim) —
 * this page has no `blogs-page` CMS singleType (see the plan's scope
 * note), so this is static copy, not fetched content. Exported so
 * BlogListingView can pass it to the shared accordion above. */
export const SITEWIDE_BLOG_FAQ_ITEMS: FaqItemModel[] = [
  {
    id: 'topics',
    question: 'What topics does the Unimrkt Research Blog cover?',
    answer:
      'The blog covers market research methodologies, industry trends, consumer behavior, business strategy, and emerging opportunities across the sectors Unimrkt Research serves.',
  },
  {
    id: 'audience',
    question: 'Who should read the Unimrkt Research Blog?',
    answer:
      'Business leaders, marketers, product teams, and researchers looking for practical, data-driven perspective on markets, customers, and research best practices.',
  },
  {
    id: 'frequency',
    question: 'How often is new content published?',
    answer: 'New articles are published regularly, drawing on ongoing research engagements and industry developments as they happen.',
  },
  {
    id: 'expertise',
    question: 'Are the blog articles based on industry expertise?',
    answer:
      'Yes — every article is written or reviewed by researchers and analysts who work directly on the studies and engagements the content is based on.',
  },
  {
    id: 'value',
    question: 'How can the Unimrkt Research Blog help my business?',
    answer:
      'It helps you spot emerging trends earlier, benchmark against research best practices, and make market-entry and strategy decisions with more confidence.',
  },
];
