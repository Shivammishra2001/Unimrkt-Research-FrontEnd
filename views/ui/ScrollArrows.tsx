'use client';

import type { CSSProperties } from 'react';

interface ScrollArrowsProps {
  /** id of the horizontally scrollable track these buttons drive. */
  targetId: string;
  /** Extra classes for each button (positioning is the caller's). */
  className?: string;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  leftClassName?: string;
  rightClassName?: string;
}

/** Figma 267:1497 / 267:1491 — 45px #eee circles with a #0e1626 arrow
 * (mask: /figma-home/arrow-mask.png). Scrolls the track by one card. */
export function ScrollArrows({ targetId, className = '', leftStyle, rightStyle, leftClassName = '', rightClassName = '' }: ScrollArrowsProps) {
  function scrollTrack(direction: -1 | 1) {
    const track = document.getElementById(targetId);
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.getBoundingClientRect().width + 27 : track.clientWidth / 2;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  const button = `flex size-[45px] items-center justify-center rounded-full bg-[#eee] transition-transform hover:scale-105 ${className}`;
  const arrow =
    'block size-[18px] bg-[#0e1626] [mask-image:url(/figma-home/arrow-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]';

  return (
    <>
      <button type="button" aria-label="Previous" onClick={() => scrollTrack(-1)} className={`${button} ${leftClassName}`} style={leftStyle}>
        <span className={arrow} aria-hidden="true" />
      </button>
      <button type="button" aria-label="Next" onClick={() => scrollTrack(1)} className={`${button} ${rightClassName}`} style={rightStyle}>
        <span className={`${arrow} -scale-x-100`} aria-hidden="true" />
      </button>
    </>
  );
}
