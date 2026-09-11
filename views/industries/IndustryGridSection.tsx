'use client';

import { useState } from 'react';
import { Container } from '@/views/ui/Container';
import { IndustryCard } from './IndustryCard';
import { Pagination } from '@/views/blog/Pagination';
import type { IndustrySummary } from '@/models/industry';

const PAGE_SIZE = 6; // Figma's 3x2 grid (node 384:5920-5925)

/** "Deep Expertise Across Diverse Industries" — Figma node 384:5913-5925,
 * 5931. Same "fetch once, paginate client-side" convention already used
 * for /blogs' grid; numbered pagination reuses Pagination.tsx with this
 * page's own exact colors/size (node 384:5931: #ba2c29 active, #c4d7e8
 * border, 53.333px squares, 16.667px gap). */
export function IndustryGridSection({ industries }: { industries: IndustrySummary[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(industries.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = industries.slice(start, start + PAGE_SIZE);

  return (
    <section id="industries-grid" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Industries</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            Deep Expertise Across Diverse Industries
          </h2>
          <p className="mx-auto mt-4 max-w-[833px] text-base leading-[1.9] text-heading/80">
            Delivering industry-specific research and actionable insights that empower businesses to innovate,
            compete, and grow in an ever-evolving marketplace.
          </p>
        </header>

        {pageItems.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((industry, i) => (
              <IndustryCard key={industry.slug} industry={industry} priority={currentPage === 1 && i === 0} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center opacity-70">Industries are being updated — check back shortly.</p>
        )}

        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
            ariaLabel="Industries pagination"
            activeColor="#ba2c29"
            borderColor="#c4d7e8"
            textColor="#144168"
            squareSize="53.333px"
            gap="16.667px"
          />
        </div>
      </Container>
    </section>
  );
}
