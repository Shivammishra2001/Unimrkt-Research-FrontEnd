'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/views/ui/Container';
import type { ResolvedPrivacyPolicy } from './fallback';

/** "This Privacy Policy Defines and Regulates:" — Figma node 1114:50556
 * (y1326-1834). Red H2 + a 12-item underlined anchor list with a small
 * red dot marker (`#B52C2C`, matching the node's own Ellipse 25 asset).
 * Only 2 of the 12 anchors have a matching section actually drawn
 * further down the page (#What-qualifies-as-Personal-Data and
 * #What-Constitutes-the-Lawful-Collection-and-Use-of-Personal-Data,
 * wired onto BodySection's two real headings) — the other 10 render as
 * plain links with no matching target, exactly as drawn (see
 * fallback.ts's header comment). Client component: tracks which of
 * those 2 real sections is in view and highlights the matching TOC
 * entry — the "active anchor scroll sync" this page's directive asked
 * for, layered onto the design's own palette rather than inventing a
 * new visual state. */
export function TocSection({ toc }: { toc: ResolvedPrivacyPolicy['toc'] }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const anchors = toc.items.map((item) => item.anchor);
    const sections = anchors
      .map((anchor) => document.getElementById(anchor))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveAnchor(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc.items]);

  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-24">
      <Container>
        <h2 className="max-w-[704px] text-[28px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-[#a72b31] sm:text-[32px] lg:text-4xl lg:tracking-[-2px]">
          {toc.heading}
        </h2>
        <ul className="mt-6 flex max-w-[691px] flex-col">
          {toc.items.map((item) => (
            <li key={item.id} className="flex items-start gap-3 py-[15px] text-base leading-[1.4]">
              <span className="mt-[7px] size-[10px] shrink-0 rounded-full bg-[#b52c2c]" aria-hidden="true" />
              <a
                href={`#${item.anchor}`}
                className={`underline underline-offset-2 opacity-80 transition-colors hover:opacity-100 ${
                  activeAnchor === item.anchor ? 'font-semibold text-[#b52c2c] opacity-100' : 'text-heading'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
