import Image from 'next/image';
import { Button } from '@/views/ui/Button';
import type { ResolvedOurTeam } from './fallback';

/** Bottom CTA — Figma node 1126:54624 (y4438-4893). Dark navy
 * (`#101723`) rounded band with a white "Talk to Our Experts" button —
 * same shell/copy as every other page's "A Better Way to Understand
 * Your Market" band this session (case-study detail's BottomCtaSection,
 * privacy-policy's), each page owning its own dedicated component per
 * this codebase's established convention even where the copy repeats.
 * The node's own background is a barely-visible (20% opacity,
 * luminosity-blend) texture over a near-solid navy panel — simplified
 * here to the solid navy, the same "decorative overlay" simplification
 * convention used for every other page's subtle mask/blend effects this
 * session. */
export function BottomCtaSection({ bottomCta }: { bottomCta: ResolvedOurTeam['bottomCta'] }) {
  const bodyLines = bottomCta.body.split('\n');

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-[#101723] px-6 py-16 text-center sm:px-12 lg:py-20">
        <Image src="/images/our-team/team-hero-bg.jpg" alt="" fill sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-[819px]">
          <h2 className="text-3xl font-semibold capitalize leading-[1.2] text-white sm:text-4xl lg:text-[50px] lg:tracking-[-2px]">{bottomCta.heading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.9] text-white/90">
            {bodyLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < bodyLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="mt-8 flex justify-center">
            <Button link={bottomCta.action} variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
