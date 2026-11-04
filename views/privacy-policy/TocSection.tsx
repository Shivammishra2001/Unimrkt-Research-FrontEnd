'use client';

import { useEffect, useState } from 'react';
import { H2, TRIM } from './text';
import type { ResolvedPrivacyPolicy } from './fallback';

/** "This Privacy Policy Defines and Regulates:" — Figma node 1114:50556 (y1326-1836). 36px/-2px #a72b31 title, then 12 underlined
 * 16px SemiBold links at 80% on a 40px pitch, each with a 10px red dot 7px in from x220 (text at +24). Only the first two anchors
 * have a drawn body section; the scroll-sync below highlights those while they are in view. */
export function TocSection({ toc }: { toc: ResolvedPrivacyPolicy['toc'] }) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  useEffect(() => {
    const sections = toc.items.map((item) => document.getElementById(item.anchor)).filter((el): el is HTMLElement => el !== null);
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
    <>
      <h2 className={`${H2} mt-12 lg:mt-[70px]`}>{toc.heading}</h2>
      <ul className="mt-6 flex flex-col gap-[28.8px] lg:mt-[33px]">
        {toc.items.map((item) => (
          <li key={item.id} className={`relative pl-6 font-sans text-[16px] font-semibold leading-[2.5] ${TRIM}`}>
            <span className="absolute left-[7px] top-px size-[10px] rounded-full bg-[#b52c2c]" aria-hidden="true" />
            <a
              href={`#${item.anchor}`}
              className={`underline underline-offset-2 transition-colors hover:text-[#a72b31] ${
                activeAnchor === item.anchor ? 'text-[#a72b31]' : 'text-[#02060e] opacity-80'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
