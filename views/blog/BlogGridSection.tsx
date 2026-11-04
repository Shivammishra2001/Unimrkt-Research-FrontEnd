'use client';

import { useCallback, useMemo, useState } from 'react';
import { BlogListCard } from './BlogListCard';
import { Pagination } from './Pagination';
import type { BlogSummary } from '@/models/blog';
import type { CategoryModel } from '@/models/category';

const PAGE_SIZE = 9; // Figma's 3x3 grid (node 522:4933-5037)
const ALL_SLUG = 'all';

/** Figma nodes 522:4914 (category filter), 522:4933-5037 (3x3 grid),
 * 522:5050 (pagination). All three are client-side over the full post
 * pool passed in from the server page — same "fetch once, filter/page in
 * the browser" convention GalleryView.tsx already uses, just with a real
 * numbered Pagination instead of Load More since that's what this design
 * shows.
 *
 * `categories` (fetched from `/api/categories`, see app/blogs/page.tsx)
 * drives the tab list — no hardcoded array. Filtering matches on
 * `category.slug`, and each tab's label uses `category.label` (falls
 * back to the full name in normalizeCategory() when a category has no
 * `shortLabel` — Figma node 522:4914's filter bar shows a shorter label
 * than the full name for exactly 2 of the original 5 categories; that
 * per-category choice now lives on the Category itself, admin-editable,
 * instead of being hardcoded here). */
export function BlogGridSection({ posts, categories }: { posts: BlogSummary[]; categories: CategoryModel[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(ALL_SLUG);
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = useMemo(() => [{ slug: ALL_SLUG, label: 'All' }, ...categories], [categories]);

  const filtered = useMemo(
    () => (activeSlug === ALL_SLUG ? posts : posts.filter((p) => p.category?.slug === activeSlug)),
    [posts, activeSlug]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveSlug(slug);
    setCurrentPage(1);
  }, []);

  return (
    <div>
      {/* Figma 522:4836-4837: title (cap-top y898) + 2-line intro (y967) under the 60px section lead-in. */}
      <h2 className="text-center font-sans text-[34px] font-semibold capitalize leading-[1.2] tracking-[-1.5px] text-[#02060e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] sm:text-[42px] lg:text-[50px] lg:tracking-[-3px]">
        Insights &amp; Stories
      </h2>
      <p className="mx-auto mt-6 max-w-[966px] text-center font-sans text-[16px] font-normal leading-[1.9] text-[#02060e]/80 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:mt-[34px]">
        Explore expert insights, industry trends, research methodologies, and success stories designed to help businesses stay
        informed, uncover opportunities, make data-driven decisions, and achieve sustainable growth.
      </p>

      {/* Figma 522:4914 — 56px tabs, 12px gap; active #6c2a4a -> #be2c28 / 13.234px, inactive white + #dedede / 13.125px. */}
      {/* Below lg the pills form one momentum-scrolling row (full-bleed to the gutter edge) instead of wrapping into stacked lines. */}
      <div
        role="group"
        aria-label="Filter posts by category"
        className="-mx-4 mt-10 flex snap-x scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:mt-[69px] lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const isActive = tab.slug === activeSlug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => handleCategoryChange(tab.slug)}
              aria-pressed={isActive}
              className={`flex h-[56px] shrink-0 snap-start items-center justify-center whitespace-nowrap rounded-[3px] pb-[10px] pt-[9px] font-sans font-semibold uppercase leading-[normal] transition-colors motion-reduce:transition-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] px-[30px] text-[13.234px] text-white'
                  : 'border border-[#dedede] bg-white px-[29px] text-[13.125px] text-[#1e1e1e] hover:border-[#be2c28] hover:text-[#be2c28]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {pageItems.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[41px] lg:grid-cols-3">
          {pageItems.map((post, i) => (
            <BlogListCard key={post.slug} post={post} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center opacity-70">No posts in this category yet.</p>
      )}

      <div className="mt-12 lg:mt-[59.6px]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
          squareSize="48.762px"
          gap="15.238px"
          radius="4.571px"
          borderWidth="0.762px"
          fontSize="10.45px"
          iconSize="18.286px"
        />
      </div>
    </div>
  );
}
