import Image from 'next/image';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';

const BOTTOM_CTA_LINK = {
  id: 'case-study-detail-bottom-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

/** Bottom CTA — Figma node 1107:49842 (y7516-8011). Distinct copy from
 * every other page's "Start Your Research Journey" band (this one
 * reads "A Better Way to Understand Your Market" / "TALK TO OUR
 * EXPERTS" in a white button, not the sitewide gradient pill) — a
 * bespoke component rather than reusing BlogBottomCta, though the
 * background photo is the exact same asset every other bottom-CTA
 * band on the site already uses. Template-level chrome, not
 * per-case-study CMS content — see fallback.ts's header comment. */
export function BottomCtaSection() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-[#101723] px-6 py-16 text-center sm:px-12 lg:py-20">
        <Image src="/images/blog/hero-bg.jpg" alt="" fill sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-[819px]">
          <h2 className="text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            A Better Way to Understand Your Market
          </h2>
          <Prose className="mx-auto mt-4 max-w-2xl text-white/90">
            Your customers are already telling you what they expect. We help you listen, understand and act.
          </Prose>
          <div className="mt-8 flex justify-center">
            <Button link={BOTTOM_CTA_LINK} variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
