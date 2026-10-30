'use client';

import { useState } from 'react';
import { IndustryCard } from './IndustryCard';
import { Pagination } from '@/views/blog/Pagination';
import { SectionHeader } from './listing/shared';
import type { IndustrySummary } from '@/models/industry';
import type { IndustriesPageContent } from '@/models/industriesPage';

const PAGE_SIZE = 6; // Figma's 3x2 grid (nodes 1384:26881-26886)

/** "Deep Expertise Across Diverse Industries" — Figma node 1384:26772,
 * y1586-2950. Eyebrow cap-top 1669, 50/60 title, 3-line body (1309px),
 * 509x430 cards at x=150/695/1240 (36px column gap, 35px row gap, first
 * row y=1893), pagination row at y=2819 (53.333px squares, 16.667px gap,
 * #ba2c29 active, #c4d7e8 border, #144168 text). Behind it: the faint
 * wave texture (50%) fading to white at the bottom. Industries come from
 * the CMS (`industries` collection) and paginate client-side. */
export function IndustryGridSection({ industries, content }: { industries: IndustrySummary[]; content: IndustriesPageContent['grid'] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(industries.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = industries.slice(start, start + PAGE_SIZE);

  return (
    <section id="industries-grid" className="relative overflow-hidden bg-white pb-16 pt-16 lg:pb-[77.5px] lg:pt-[80px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1388px] bg-[length:1900px_1411px] bg-[position:center_top] bg-repeat"
        style={{ backgroundImage: `url('${content.backgroundImage?.src ?? '/images/industries/wave-pattern.png'}')` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[863px]"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
        <SectionHeader
          eyebrow={content.eyebrow}
          title={content.heading}
          titleMaxWidth="939px"
          bodyMaxWidth="1309px"
          body={content.body}
        />

        {pageItems.length > 0 ? (
          <div className="mt-[41px] grid grid-cols-1 gap-x-[36px] gap-y-[35px] sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((industry, i) => (
              <div key={industry.slug} className="lg:min-h-[430px]">
                <IndustryCard industry={industry} priority={currentPage === 1 && i < 3} fallbackSrc={content.cardFallbackImage?.src} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center opacity-70">Industries are being updated — check back shortly.</p>
        )}

        <div className="mt-[31px]">
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
      </div>
    </section>
  );
}
