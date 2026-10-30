import { Breadcrumb } from '@/views/ui/Breadcrumb';
import Image from 'next/image';
import { Button } from '@/views/ui/Button';
import type { IndustriesPageContent } from '@/models/industriesPage';

/** /industries hero + breadcrumb — Figma node 1384:26772 (y0-828).
 * Hero group: 768px, #040112 base, the electricity-power photo at 70%
 * (2645x1487 at 3.95,-70.25), a 40% #010913 wash and a 255px top fade
 * (#06070d, 85%) under the transparent navbar (views/sections/Navbar.tsx
 * makes the header transparent on this route). Pill 273x40 at y=276,
 * title cap-top 346 (60/72px, -3px), subtitle 16/30.4px @ 80%, buttons
 * 264x60 (gradient) and 272x60 (1px white outline), 20px apart. */
export function IndustryHero({ content }: { content: IndustriesPageContent['hero'] }) {
  const heroSrc = content.image?.src ?? '/images/industries/hero.webp';
  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#040112] text-white lg:h-[768px]">
        <Image
          src={heroSrc}
          alt=""
          priority
          width={2645}
          height={1487}
          sizes="2645px"
          className="pointer-events-none absolute left-[3.95px] top-[-70.25px] hidden max-w-none opacity-70 lg:block"
        />
        <Image src={heroSrc} alt="" fill sizes="100vw" className="object-cover object-[60%_center] opacity-70 lg:hidden" />
        <div className="absolute inset-0 bg-[#010913]/40" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 h-[255px] opacity-[0.85]"
          style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-0 lg:pt-[276px] min-[1500px]:px-0">
          <p className="inline-flex h-10 w-[273px] items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h1 className="mt-[14.5px] max-w-[768px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
            {content.heading.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-[12.8px] max-w-[757px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">
            {content.subheading}
          </p>
          <div className="mt-[44.3px] flex flex-wrap gap-5">
            <Button link={content.primaryCta} />
            <Button link={content.secondaryCta} className="border border-white" />
          </div>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/'},{ label: 'Industries'}]} />
    </>
  );
}
