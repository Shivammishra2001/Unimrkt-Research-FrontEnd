'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { MediaGalleryModel } from '@/models/domain';

function PlayButton() {
  return (
    <span className="pointer-events-none absolute inset-[33.78%_42.41%] z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/figma-home/play-btn.svg" alt="" aria-hidden="true" className="block size-full" />
    </span>
  );
}

/**
 * blocks.media-gallery — "Moments of Excellence" grid. `size: 'large'`
 * cards show a static play-button overlay purely from `size`; it is a
 * decorative graphic, not a claim that a video exists — a large item only
 * becomes a clickable link once `videoUrl` is actually set.
 */
export function MediaGalleryView({ block }: { block: MediaGalleryModel; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    // Figma 267:1256: this band's ground is warm off-white #f7f7f4, not the light theme's white.
    <Section
      theme={block.theme}
      anchorId={block.anchorId}
      className={`lg:!pb-[92px] lg:!pt-[67.5px] ${block.theme === 'light' ? '!bg-[#f7f7f4]' : ''}`}
    >
      <Container className="min-[1664px]:px-0">
        <div className="flex flex-col items-center text-center">
          <Heading as="h2" size="h2">
            {block.heading}
          </Heading>
          {block.subheading && <Prose className="mt-[3px] max-w-none text-heading lg:whitespace-nowrap">{block.subheading}</Prose>}
        </div>
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => {
            const isLarge = item.size === 'large';
            const content = (
              <>
                {item.media && (
                  <StrapiImage
                    image={item.media}
                    sizes={isLarge ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                    fill
                    className="object-cover opacity-70"
                  />
                )}
                {isLarge && <PlayButton />}
              </>
            );
            const cardClassName = isLarge
              ? 'relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[790/370] sm:col-span-2'
              : 'relative overflow-hidden rounded-[34.335px] bg-ink-900 aspect-[385/370]';

            return (
              <motion.div key={item.id} whileHover={shouldReduceMotion ? undefined : { scale: 1.015 }} className={cardClassName}>
                {item.videoUrl ? (
                  <a href={item.videoUrl} className="block h-full w-full">
                    {content}
                  </a>
                ) : (
                  <div className="block h-full w-full">{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
        {block.actions.length > 0 && (
          <div className="mt-[46px] flex flex-wrap justify-center gap-3">
            {block.actions.map((action) => (
              <Button key={action.id} link={action} variant={action.variant} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
