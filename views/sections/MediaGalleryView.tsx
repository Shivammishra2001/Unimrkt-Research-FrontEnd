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
    <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg">
        <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7-11-7Z" />
        </svg>
      </span>
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
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading as="h2" size="h2">
              {block.heading}
            </Heading>
            {block.subheading && <Prose className="mt-4 max-w-2xl">{block.subheading}</Prose>}
          </div>
          {block.actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {block.actions.map((action) => (
                <Button key={action.id} link={action} variant={action.variant} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.items.map((item) => {
            const isLarge = item.size === 'large';
            const content = (
              <>
                {item.media && (
                  <StrapiImage
                    image={item.media}
                    sizes={isLarge ? '(min-width: 640px) 66vw, 100vw' : '(min-width: 640px) 33vw, 100vw'}
                    fill
                    className="object-cover"
                  />
                )}
                {isLarge && <PlayButton />}
              </>
            );
            const cardClassName = isLarge
              ? 'relative overflow-hidden rounded-video bg-ink-900 aspect-[790/370] sm:col-span-2'
              : 'relative overflow-hidden rounded-video bg-ink-900 aspect-[385/370]';

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
      </Container>
    </Section>
  );
}
