'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scroll-snap row + dot pager logic, correct in both directions.
 *
 * A card's scroll target is its position inside the scrolled content minus the track's `scroll-padding-left` (what `snap-start` aligns
 * to) — not `offsetLeft`, which also contains the track's own padding and made every jump overshoot and fight the snap. The active card is
 * the one whose snap position is nearest the current scroll; at the far end the last card is active even if it can't reach the snap start.
 */
export function useSnapTrack<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);
  // A dot click's target (clamped to what the track can actually reach). While it is pending, scroll events don't re-pick the active card.
  const pending = useRef<{ index: number; left: number } | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sync = useCallback(() => {
    const track = ref.current;
    if (!track || track.children.length === 0) return;
    if (pending.current) {
      if (Math.abs(track.scrollLeft - pending.current.left) <= 2) {
        setActive(pending.current.index);
        // Smooth scrolling keeps emitting events at the landing position; clear the jump only once they stop.
        if (settle.current) clearTimeout(settle.current);
        settle.current = setTimeout(() => {
          pending.current = null;
        }, 250);
      }
      return;
    }
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 2 && track.scrollLeft >= maxScroll - 2) {
      setActive(track.children.length - 1);
      return;
    }
    const trackLeft = track.getBoundingClientRect().left;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const offset = (child as HTMLElement).getBoundingClientRect().left - trackLeft + track.scrollLeft;
      const dist = Math.abs(offset - pad - track.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const track = ref.current;
    // Any manual scrolling (wheel, touch, drag, keys) cancels a pending dot jump.
    const cancel = () => {
      pending.current = null;
      if (settle.current) clearTimeout(settle.current);
    };
    window.addEventListener('resize', sync);
    track?.addEventListener('wheel', cancel, { passive: true });
    track?.addEventListener('touchstart', cancel, { passive: true });
    track?.addEventListener('pointerdown', cancel);
    track?.addEventListener('keydown', cancel);
    return () => {
      window.removeEventListener('resize', sync);
      track?.removeEventListener('wheel', cancel);
      track?.removeEventListener('touchstart', cancel);
      track?.removeEventListener('pointerdown', cancel);
      track?.removeEventListener('keydown', cancel);
    };
  }, [sync]);

  const goTo = useCallback((index: number) => {
    const track = ref.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const pad = parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const target = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - pad;
    const left = Math.min(Math.max(0, target), Math.max(0, track.scrollWidth - track.clientWidth));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (settle.current) clearTimeout(settle.current);
    pending.current = Math.abs(track.scrollLeft - left) <= 2 ? null : { index, left };
    track.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
    setActive(index);
  }, []);

  return { ref, active, onScroll: sync, goTo };
}
