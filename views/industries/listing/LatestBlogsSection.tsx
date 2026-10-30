"use client";

import { useRef } from "react";
import Link from "next/link";
import { StrapiImage } from "@/views/ui/StrapiImage";
import { ArrowRightIcon } from "@/views/ui/icons/ArrowRightIcon";
import { EYEBROW_CLASS } from "./shared";
import type { BlogSummary } from "@/models/blog";

/** "Latest Blogs / Exploring Market Trends" — Figma 1384:26772, y9489-
 * 10119. A flush-left 861x462 #6c2a4a -> #be2c28 panel (eyebrow cap-top
 * 9595, Inter 600 52/62.4px title with -1px tracking, 14/19.6px line @
 * 90%, two 45px circular arrows at y=9825) and a row of 492x510 post cards
 * (1px #eee, r24, shadow 6 6 54 rgba(0,0,0,.08)) starting at x=563, 34px
 * apart, y=9609. Card: 440x291 image at (26,29) r30, title 20/26.8px
 * #04264e (2 lines), excerpt 14/20px @ 70% (2 lines). Posts are CMS
 * (`blog` collection), ordered by `order`: the first post supplies the
 * panel's title/excerpt (same convention as the other blog strips), the
 * remaining posts are the cards. */
export function LatestBlogsSection({ posts }: { posts: BlogSummary[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({
      left: direction * (card.clientWidth + 34),
      behavior: "smooth",
    });
  }

  const [featured, ...rest] = posts;
  if (!featured) return null;

  return (
    <section className="relative bg-transparent lg:h-[630px]">
      <div className="bg-gradient-to-r from-gradient-from to-gradient-to px-4 py-12 sm:px-6 lg:absolute lg:left-0 lg:top-0 lg:h-[462px] lg:w-[861px] lg:py-0 lg:pl-[150px] lg:pr-0">
        <p className={`${EYEBROW_CLASS} text-white lg:pt-[102.6px]`}>
          Latest Blogs
        </p>
        <h2 className="mt-[19px] max-w-[353px] font-nav text-[36px] font-semibold leading-[43px] tracking-[-1px] text-white lg:text-[52px] lg:leading-[62.4px]">
          <Link href={`/blogs/${featured.slug}`}>{featured.title}</Link>
        </h2>
        <p className="mt-[22px] max-w-[334px] font-sans text-[14px] font-normal leading-[19.6px] text-white opacity-90">
          {featured.excerpt}
        </p>
        <div className="mt-[30px] flex gap-[10px]">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous post"
            className="flex size-[45px] items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-300 ease-in-out hover:bg-white/15"
          >
            <ArrowRightIcon
              className="size-[18px] rotate-180"
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next post"
            className="flex size-[45px] items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-300 ease-in-out hover:bg-white/15"
          >
            <ArrowRightIcon className="size-[18px]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {rest.length > 0 && (
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-[34px] overflow-x-auto scroll-smooth px-4 py-8 [scrollbar-width:none] sm:px-6 lg:absolute lg:inset-x-0 lg:top-[120px] lg:py-0 lg:pb-8 lg:scroll-pl-[563px] lg:pl-[563px] lg:pr-8 [&::-webkit-scrollbar]:hidden"
        >
          {rest.map((post, i) => (
            <li
              key={post.slug}
              className="w-[85vw] shrink-0 snap-start sm:w-[492px]"
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="group flex h-full min-h-[510px] cursor-pointer flex-col rounded-[24px] border border-[#eee] bg-white p-[25px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-[440/291] w-full overflow-hidden rounded-[30px] bg-slate-100">
                  {post.coverImage && (
                    <StrapiImage
                      image={post.coverImage}
                      sizes="440px"
                      priority={i === 0}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  )}
                </div>
                <h3 className="mt-[45.4px] line-clamp-2 px-[9px] font-sans text-[20px] font-semibold leading-[26.8px] text-[#04264e]">
                  {post.title}
                </h3>
                <p className="mt-[28px] line-clamp-2 px-[9px] font-sans text-[14px] font-normal leading-[20px] text-black opacity-70">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
