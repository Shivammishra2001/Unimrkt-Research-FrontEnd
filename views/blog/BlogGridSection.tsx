'use client';

import { useCallback, useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
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
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => {
          const isActive = tab.slug === activeSlug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => handleCategoryChange(tab.slug)}
              aria-pressed={isActive}
              className={`min-h-[44px] rounded-[3px] px-6 py-2 font-sans text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-gradient-from to-gradient-to text-white'
                  : 'border border-[#dedede] bg-white text-[#1e1e1e] hover:border-brand-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {pageItems.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              priority={i === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center opacity-70">No posts in this category yet.</p>
      )}

      <div className="mt-12">
        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
      </div>
    </div>
  );
}
