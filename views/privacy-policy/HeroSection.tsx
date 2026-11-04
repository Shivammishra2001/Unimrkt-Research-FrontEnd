import Image from 'next/image';
import { Breadcrumb } from '@/views/ui/Breadcrumb';
import type { ResolvedPrivacyPolicy } from './fallback';

/** /privacy-policy hero + breadcrumb — Figma node 1114:50556 (y0-828). 768px #040112 hero: the 70% shield photo
 * (1114:50564, 2303x906 at -10/-54), a 40% #010913 wash, the 1064px left shade at 80% and the 255px top fade at 85%; the header
 * floats over it. Content at x=217, top-aligned: badge y305, 60/72px -3px title (cap-top 375, 597px wide), 670px intro (524).
 * No CTA is drawn. The saved CMS hero image was already darkened, so the raw Figma photo is used. */
export function HeroSection({ hero }: { hero: ResolvedPrivacyPolicy['hero'] }) {
  const headingLines = hero.heading.split('\n');

  return (
    <>
      <section className="relative w-full overflow-x-clip bg-[#040112] text-white lg:min-h-[768px]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-[0.53%] -top-[7.03%] h-[117.97%] w-[121.21%] opacity-70">
            <Image src="/images/privacy-policy/hero-raw.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#010913]/40" />
          <div
            className="absolute inset-y-0 left-0 w-[1064px] max-w-full opacity-80"
            style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0) 0%, #02050e 63%)' }}
          />
          <div
            className="absolute inset-x-0 top-0 h-[255px] opacity-[0.85]"
            style={{ backgroundImage: 'linear-gradient(to bottom, #06070d 37%, rgba(6,7,13,0) 100%)' }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1466px] px-4 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-16 lg:pt-[305px] min-[1500px]:px-0">
          <p className="inline-flex h-10 items-center gap-3 whitespace-nowrap rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] font-sans text-[13px] font-bold uppercase leading-[15.6px] tracking-[3px] text-white backdrop-blur-[2px]">
            <span className="size-2 shrink-0 rounded-full bg-[#a82c31]" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-[14.5px] max-w-[597px] font-sans text-[36px] font-semibold capitalize leading-[43px] text-white sm:text-[48px] sm:leading-[58px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-3px]">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-[10.8px] max-w-[670px] font-sans text-[16px] font-normal leading-[30.4px] text-white/80">{hero.subheading}</p>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
    </>
  );
}
