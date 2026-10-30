'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { H2_CLASS } from './shared';
import { PlusIcon } from '@/views/ui/icons/PlusIcon';
import type { IndustriesPageContent } from '@/models/industriesPage';

/** FAQ — Figma 1384:26772, y10119-11105. A 222x60 gradient "Browse
 * Blogs" button (y=10162), the 50/60px title (cap-top 10321), then 1160x90
 * rows (1px #f9edf8, r14, shadow 0 8 14 rgba(235,235,241,.7)) at x=370
 * with 16px gaps from y=10413; Quicksand 700 18/22.7px #280c27 at x=28,
 * 30px plus at the right. Single-open accordion; the faint world map
 * (5%) sits behind. The node repeats one placeholder question in rows
 * 2-6, so the real items keep the previously authored copy. */
export function IndustryFaqSection({ content }: { content: IndustriesPageContent['faq'] }) {
  const items = content.items;
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-16 lg:h-[986px] lg:pb-0 lg:pt-[43px]">
      {/* Figma 1384:27167: the same 1900x719 clip as the home FAQ (world map 1377x787 at -71px) @ 8%. */}
      <div className="pointer-events-none absolute inset-x-0 top-[93px] h-[719px] overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-71px] h-[787px] w-[1377px] -translate-x-1/2 opacity-[0.08]">
          <Image src="/figma-home/faq-worldmap.png" alt="" fill sizes="1377px" className="object-cover" />
        </div>
      </div>
      <div className="relative flex flex-col items-center px-4 sm:px-6">
        <Link
          href={content.cta.href}
          className="inline-flex h-[60px] w-[222px] items-center justify-center gap-1 rounded-[4px] bg-gradient-to-r from-gradient-from to-gradient-to px-10 font-sans text-[13px] font-bold uppercase leading-[16.9px] tracking-[0.78px] text-white transition-[filter] duration-300 ease-in-out hover:brightness-110 motion-reduce:transition-none"
        >
          {content.cta.label}
        </Link>
        <h2 className={`${H2_CLASS} mt-[43px] text-center text-[#02060e]`}>{content.heading}</h2>

        <div className="mt-[44.9px] flex w-full max-w-[1160px] flex-col gap-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-[14px] border border-[#f9edf8] bg-white shadow-[0px_8px_14px_0px_rgba(235,235,241,0.7)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-[88px] w-full items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <span className="font-accent text-[18px] font-bold leading-[22.68px] text-[#280c27]">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeInOut' }}
                    className="flex size-[30px] shrink-0 items-center justify-center text-[#280c27]"
                  >
                    <PlusIcon className="size-[22.5px]" aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 font-sans text-[14px] leading-[26.18px] text-black opacity-70">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
