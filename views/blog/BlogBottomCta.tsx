import Image from 'next/image';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';

const BOTTOM_CTA_LINK = {
  id: 'blog-bottom-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

/**
 * "Start Your Research Journey" band — identical on both /blogs (Figma
 * 522:4769-4779) and /blogs/[slug] (Figma 587:3392-3402), and the same
 * shape ServiceListingView/GalleryView already use for their own closing
 * CTA. Extracted so every page renders one shared component instead of
 * duplicated JSX.
 */
export function BlogBottomCta() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-[#101723] px-6 py-16 text-center sm:px-12 lg:py-20">
        <Image src="/images/blog/hero-bg.jpg" alt="" fill sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover opacity-20" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-[819px]">
          <h2 className="capitalize text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[50px] lg:tracking-[-2px]">
            Start Your Research Journey
          </h2>
          <Prose className="mx-auto mt-4 max-w-2xl text-white/90">
            Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make
            confident business decisions.
          </Prose>
          <div className="mt-8 flex justify-center">
            <Button link={BOTTOM_CTA_LINK} variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
