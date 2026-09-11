'use client';

import { useCallback, useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
import { Pagination } from './Pagination';
import type { BlogCategory, BlogSummary } from '@/models/blog';

const PAGE_SIZE = 9; // Figma's 3x3 grid (node 522:4933-5037)

// Figma node 522:4914's filter bar shows shorter labels than the full
// enum values two of the five categories store — display text only,
// filtering still happens on the real category value.
const CATEGORY_TABS: Array<{ value: BlogCategory | 'All'; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'Primary Research', label: 'Primary Research' },
  { value: 'Qualitative Research', label: 'Qualitative' },
  { value: 'Quantitative Research', label: 'Quantitative' },
  { value: 'Business Research', label: 'Business Research' },
  { value: 'Research Support Functions', label: 'Research Support Functions' },
];

/** Figma nodes 522:4914 (category filter), 522:4933-5037 (3x3 grid),
 * 522:5050 (pagination). All three are client-side over the full post
 * pool passed in from the server page — same "fetch once, filter/page in
 * the browser" convention GalleryView.tsx already uses, just with a real
 * numbered Pagination instead of Load More since that's what this design
 * shows. */
export function BlogGridSection({ posts }: { posts: BlogSummary[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory)),
    [posts, activeCategory]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleCategoryChange = useCallback((category: BlogCategory | 'All') => {
    setActiveCategory(category);
    setCurrentPage(1);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORY_TABS.map((tab) => {
          const isActive = tab.value === activeCategory;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleCategoryChange(tab.value)}
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
