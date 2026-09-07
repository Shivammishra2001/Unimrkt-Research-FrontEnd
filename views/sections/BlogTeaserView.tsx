'use client';

import { useRef } from 'react';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import type { BlogTeaserModel } from '@/models/domain';

/** blocks.blog-teaser — fixed gradient panel (left) + a horizontally
 * scrolling card row bleeding off the right edge. Not a centered heading
 * over a wrapped grid. */
export function BlogTeaserView({ block }: { block: BlogTeaserModel; index: number }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const step = card.clientWidth + 32;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex shrink-0 flex-col justify-between gap-10 rounded-2xl bg-gradient-to-br from-gradient-from to-gradient-to p-8 text-white lg:w-72">
            <div>
              {block.eyebrow && (
                <p className="font-nav text-sm font-semibold uppercase tracking-[0.08em] text-white/80">{block.eyebrow}</p>
              )}
              {/* Inter, the only non-Montserrat heading on the page. */}
              <h2 className="mt-2 font-nav text-4xl font-semibold leading-[1.2] lg:text-[52px] lg:tracking-[-1px]">
                {block.heading}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {block.actions.map((action) => (
                <Button key={action.id} link={action} variant={action.variant} />
              ))}
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  aria-label="Previous post"
                  className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
                >
                  <ArrowRightIcon className="size-4 rotate-180" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  aria-label="Next post"
                  className="flex size-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
                >
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <ul
            ref={trackRef}
            className="flex flex-1 snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {block.posts.map((post) => (
              <li key={post.id} className="w-72 shrink-0 snap-start">
                <a href={post.href} className="block overflow-hidden rounded-blog shadow-blog">
                  {post.image && (
                    <StrapiImage image={post.image} sizes="288px" className="aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-ink2">{post.title}</h3>
                    {post.excerpt && <p className="mt-2 text-sm leading-relaxed opacity-70">{post.excerpt}</p>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
