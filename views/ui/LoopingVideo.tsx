'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface VideoSource {
  src: string;
  type?: string;
}

interface LoopingVideoProps {
  /** Best format first — the browser plays the first one it supports. */
  sources: VideoSource[];
  /** Still frame shown until the first frame is ready (and the fallback for reduced motion). */
  poster?: string;
  /**
   * Alternative to `poster` for when the still is framed differently from the
   * footage (e.g. a pre-cropped CMS photo vs. a zoomed/offset video): rendered
   * as a full-size layer over the video (`absolute inset-0`, so the parent
   * must be positioned) and faded out once the first frame is playing. It
   * stays up for reduced motion or a blocked autoplay.
   */
  fallback?: ReactNode;
  className?: string;
  /** "metadata" by default: the footage is started by play() on mount, so only the header is fetched up front. */
  preload?: 'none' | 'metadata' | 'auto';
}

/**
 * Decorative, silent, looping background footage: `loop muted playsInline`,
 * no controls, started on mount.
 *
 * React serializes `muted` as a property, not an HTML attribute, so the
 * server-rendered <video> arrives un-muted and a browser refuses to autoplay
 * it before hydration anyway. Playback is therefore started only by the
 * effect (muted forced first) — there is no `autoPlay` attribute, so footage
 * can never start before the reduced-motion check runs.
 *
 * The markup is identical on server and client whatever the motion
 * preference: useReducedMotion() reads matchMedia on the first client render,
 * so swapping <video> for <img> would be a hydration mismatch. Reduced-motion
 * visitors simply never get play() — the native `poster` (or `fallback`)
 * stays up. For everyone else it also stays up until the first frame plays.
 */
export function LoopingVideo({ sources, poster, fallback, className, preload = 'metadata' }: LoopingVideoProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      setPlaying(false);
      return;
    }
    video.muted = true;
    video.defaultMuted = true;
    const start = () => {
      const attempt = video.play();
      // A blocked autoplay just leaves the poster frame showing.
      if (attempt) attempt.catch(() => undefined);
    };
    // Only decode what is on (or about to be on) screen: several full-width
    // loops playing at once is what makes the home page stutter. Each video
    // plays while within ~300px of the viewport and pauses otherwise.
    if (typeof IntersectionObserver === 'undefined') {
      start();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : video.pause()),
      { rootMargin: '300px 0px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion, sources]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- decorative footage, no audio track */}
      <video
        ref={ref}
        className={className}
        loop
        muted
        playsInline
        controls={false}
        preload={preload}
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        // With a semi-transparent fallback on top, a paused video's first
        // frame would show through it — keep the video hidden until it plays.
        style={fallback && !playing ? { visibility: 'hidden' } : undefined}
        onPlaying={() => setPlaying(true)}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      {fallback && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${playing ? 'opacity-0' : 'opacity-100'}`}
        >
          {fallback}
        </div>
      )}
    </>
  );
}
