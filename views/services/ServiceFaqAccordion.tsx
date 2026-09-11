'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { PlusIcon } from '@/views/ui/icons/PlusIcon';
import type { ServicesPageFaq } from '@/models/servicesPage';

/**
 * /services FAQ — Figma node 474:6304's accordion, now CMS-driven
 * (blocks.faq nested on the services-page singleType). Mirrors
 * blocks.faq's (views/sections/FaqView.tsx) exact interaction pattern
 * (single-open, plus-to-x rotation, height/opacity spring) since
 * /services isn't a dynamic-zone page and can't reuse that block
 * directly. Styling values (border/shadow/radius) follow this section's
 * own spec rather than blocks.faq's `rounded-faq`/`shadow-faq` tokens.
 */
export function ServiceFaqAccordion({ faq }: { faq: ServicesPageFaq }) {
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Dotted world map — Figma node 474:6296-6298, a masked worldmap
          silhouette at ~5% opacity centered behind the accordion. */}
      {faq.background && (
        <Image src={faq.background.src} alt="" fill sizes="100vw" className="pointer-events-none absolute inset-0 object-contain opacity-[0.05]" />
      )}
      <Container className="relative">
        <Heading as="h2" size="h2" className="text-center">
          {faq.heading}
        </Heading>
        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4">
          {faq.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex min-h-[44px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-lg font-bold text-heading">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                    className="shrink-0 text-heading"
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
