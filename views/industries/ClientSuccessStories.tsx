'use client';

import { useRef, useState } from 'react';
import { Container } from '@/views/ui/Container';
import { DotPagination } from './DotPagination';

// Figma nodes 363:3230/3501/3504 ("Component 920/921/922") — copy pulled
// verbatim from the 3 actual card instances. Deliberately NOT the seeded
// `testimonial` collection type: that content is placeholder dev-CMS-demo
// copy about the CMS platform itself, not real client work (confirmed
// while building /blogs this session) — using it here would present fake
// quotes as real client testimonials.
const TESTIMONIALS = [
  {
    title: 'Exceptional Research. Actionable Results.',
    quote:
      'Unimrkt Research delivered comprehensive market intelligence that gave us a clear understanding of customer behavior and competitive trends. Their insights played a key role in shaping our strategic decisions.',
    name: 'David Anderson',
    role: 'Head of Market Strategy',
  },
  {
    title: 'A Trusted Extension of Our Team',
    quote:
      'From research design to final reporting, the Unimrkt team demonstrated professionalism, accuracy, and deep industry expertise. Their commitment to quality made them a trusted research partner for our organization.',
    name: 'Jennifer Collins',
    role: 'Director – Customer Insights',
  },
  {
    title: 'Insights That Drive Better Decisions',
    quote:
      'The team provided high-quality data, meaningful analysis, and actionable recommendations that helped us confidently enter new markets. Their research exceeded our expectations at every stage.',
    name: 'Rajesh Mehta',
    role: 'Vice President – Business Intelligence',
  },
];

/** "Client Success Stories" — Figma node 384:5916-5930. 3 white cards
 * (rounded-blog/shadow-blog, same shell as blog/industry cards) in a
 * horizontally-scrolling row on narrow viewports, with dot pagination
 * tracking scroll position — same scroll-snap mechanic FeaturedBlogSection
 * already uses for its card row. */
export function ClientSuccessStories() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    if (!card) return;
    const step = card.offsetWidth + 32;
    setActiveIndex(Math.round(track.scrollLeft / step));
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Client Success Stories</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            Trusted Research Partner for Businesses Worldwide
          </h2>
        </header>

        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="w-[85vw] shrink-0 snap-start rounded-blog border border-card-border bg-white p-8 shadow-blog sm:w-[420px] lg:w-auto"
            >
              <span className="font-serif text-5xl leading-none text-brand-600" aria-hidden="true">
                &ldquo;
              </span>
              <h3 className="mt-4 font-sans text-xl font-semibold leading-[1.34] text-ink2">{t.title}</h3>
              <p className="mt-4 font-sans text-sm leading-[1.87] text-black/70">{t.quote}</p>
              <div className="mt-6 flex flex-col gap-1">
                <p className="font-sans text-base font-semibold leading-[1.34] text-ink2">{t.name}</p>
                <p className="font-sans text-sm leading-[1.87] text-black/70">{t.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center lg:hidden">
          <DotPagination count={TESTIMONIALS.length} activeIndex={activeIndex} onSelect={scrollToIndex} />
        </div>
      </Container>
    </section>
  );
}
