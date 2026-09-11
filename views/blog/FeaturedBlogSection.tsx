'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/views/ui/Container';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import { BlogCard } from './BlogCard';
import type { BlogSummary } from '@/models/blog';

/**
 * "Latest Blogs" strip — Figma nodes 522:4808-4828. A large gradient
 * panel (title + excerpt only, no photo — the design's texture overlay
 * is decorative, not a post cover image) for the single most-recent
 * post, plus the next 3 most-recent posts as a horizontally-scrolling
 * row of the same BlogCard used in the grid (same scroll-by-card-width
 * mechanic as views/sections/BlogTeaserView.tsx). `posts` is the full,
 * already `order`-ascending pool — the large slot and the row are both
 * derived from it here, no separate "featured" flag needed.
 */
export function FeaturedBlogSection({ posts, heading = 'Latest Blogs' }: { posts: BlogSummary[]; heading?: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [featured, ...rest] = posts;
  const latestThree = rest.slice(0, 3);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!track || !card) return;
    const step = card.clientWidth + 32;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  if (!featured) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <p className="font-nav text-[13px] font-semibold uppercase tracking-wider text-heading">{heading}</p>
          {latestThree.length > 0 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous post"
                className="flex size-[45px] items-center justify-center rounded-full border border-ink2/20 text-ink2 transition-colors hover:bg-ink2/5"
              >
                <ArrowRightIcon className="size-4 rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next post"
                className="flex size-[45px] items-center justify-center rounded-full border border-ink2/20 text-ink2 transition-colors hover:bg-ink2/5"
              >
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <Link
            href={`/blogs/${featured.slug}`}
            className="flex shrink-0 flex-col justify-between gap-10 rounded-blog bg-gradient-to-br from-gradient-from to-gradient-to p-8 text-white shadow-blog lg:w-[320px]"
          >
            <h3 className="font-nav text-4xl font-semibold leading-[1.2] tracking-[-1px]">{featured.title}</h3>
            <p className="font-sans text-sm leading-[1.4] text-white/90">{featured.excerpt}</p>
          </Link>

          {latestThree.length > 0 && (
            <ul
              ref={trackRef}
              className="flex flex-1 snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {latestThree.map((post) => (
                <li key={post.slug} className="w-72 shrink-0 snap-start sm:w-80">
                  <BlogCard post={post} sizes="320px" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
