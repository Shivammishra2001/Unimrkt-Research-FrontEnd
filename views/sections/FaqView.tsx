'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { PlusIcon } from '@/views/ui/icons/PlusIcon';
import type { FaqModel } from '@/models/domain';

/** blocks.faq — single-open accordion, height/opacity spring, plus-to-x
 * rotation (45°) rather than swapping icon assets. Reduced motion collapses
 * both the height spring and the icon rotation to a near-instant toggle. */
export function FaqView({ block }: { block: FaqModel; index: number }) {
  const [openId, setOpenId] = useState<string | null>(block.items[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section theme={block.theme} anchorId={block.anchorId} className="relative overflow-hidden">
      {block.background && (
        <StrapiImage image={block.background} sizes="100vw" fill className="absolute inset-0 object-cover opacity-[0.06]" />
      )}
      <Container className="relative flex flex-col items-center">
        {/* Figma node 267:1274 — "Browse Blogs" on the homepage's FAQ
            section, centered above the heading. Optional: no other page
            using blocks.faq sets a cta. */}
        {block.cta && <Button link={block.cta} className="mb-6" />}
        <Heading as="h2" size="h2" className="text-center">
          {block.heading}
        </Heading>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {block.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="rounded-faq border border-faq-border bg-white shadow-faq">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
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
    </Section>
  );
}
