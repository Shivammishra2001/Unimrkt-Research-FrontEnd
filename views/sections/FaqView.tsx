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
  // Figma 267:1242..1246: every row is collapsed at rest.
  const [openId, setOpenId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section theme={block.theme} anchorId={block.anchorId} className="relative lg:!pb-[92px] lg:!pt-[114.5px]">
      {block.background && (
        // Figma 267:1240/1241: a 1900x719 clip with the world map (1377x787 at -71px) @ 8% opacity.
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[719px] overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-[-71px] h-[787px] w-[1377px] -translate-x-1/2 opacity-[0.16]">
            <StrapiImage image={block.background} sizes="1377px" fill className="object-cover" />
          </div>
        </div>
      )}
      <Container className="relative flex flex-col items-center">
        {/* Figma node 267:1274 — "Browse Blogs" on the homepage's FAQ
            section, centered; on desktop it straddles the section's top edge
            (its top sits 51px above it). Optional: no other page using
            blocks.faq sets a cta. */}
        {block.cta && (
          <div className="mb-6 lg:absolute lg:left-1/2 lg:top-[-165.5px] lg:mb-0 lg:-translate-x-1/2">
            <Button link={block.cta} />
          </div>
        )}
        <Heading as="h2" size="h2" className="text-center">
          {block.heading}
        </Heading>
        <div className="mx-auto mt-10 flex w-full max-w-[1160px] flex-col gap-4 lg:mt-[44.5px]">
          {block.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="rounded-faq border border-faq-border bg-white shadow-faq">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex min-h-[88px] w-full items-center justify-between gap-4 px-6 py-5 text-left lg:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="font-accent text-lg font-bold !leading-[1.26] text-faq-text">{item.question}</span>
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
                      <p className="px-6 pb-5 text-sm leading-relaxed opacity-80 lg:px-7">{item.answer}</p>
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
