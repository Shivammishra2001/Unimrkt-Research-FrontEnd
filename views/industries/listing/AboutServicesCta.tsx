import Image from 'next/image';
import { Button } from '@/views/ui/Button';
import type { IndustriesPageContent } from '@/models/industriesPage';
import { SectionHeader } from './shared';

/** "About Our Services" copy + closing CTA — Figma 1384:26772, y11105-
 * 12171. Eyebrow cap-top 11208, 2-line 50/60px title (854px), two body
 * paragraphs (1281px, 16/30.4px @ 80%); the white fade over the last
 * 151px. Then the shared 1740x455 r40 #101723 CTA band at y=11676 (20%
 * people photo, 227px bottom gradient, title cap-top +119, body +186,
 * button +289), 40px above the footer. */
export function AboutServicesCta({ about, finalCta, detail = false, compact = false }: { about: IndustriesPageContent['about']; finalCta: IndustriesPageContent['finalCta']; /** Industry detail page: Figma 384:6574-6576 geometry. */ detail?: boolean; /** /contact (Figma 1495:16699-16701): copy starts 66px down, one-line title, band at y+518. */ compact?: boolean }) {
  return (
    <>
      <section className={`relative bg-[#f9f9f7] pb-16 pt-16 ${compact ? 'lg:h-[518px] lg:pt-[65.6px]' : `lg:h-[571px] ${detail ? 'lg:pt-[98.6px]' : 'lg:pt-[99.6px]'}`} lg:pb-0`}>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[151px]"
          style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 86.538%)' }}
          aria-hidden="true"
        />
        <SectionHeader
          eyebrow={about.eyebrow}
          title={about.heading}
          titleMaxWidth={compact ? '920px' : detail ? '764px' : '854px'}
          detail={detail}
          bodyMaxWidth="1281px"
          className="px-4 sm:px-6"
          body={about.paragraphs.map((paragraph, i) => (
            <p key={i} className={i < about.paragraphs.length - 1 ? 'mb-[30.4px]' : undefined}>
              {paragraph}
            </p>
          ))}
        />
      </section>

      <FinalCtaBand finalCta={finalCta} />
    </>
  );
}

/** The shared closing band (Figma 1384:26772 / 522:4769 / 1499:16832): 1740x455 r40 #101723, 40px above the footer. */
export function FinalCtaBand({ finalCta }: { finalCta: IndustriesPageContent['finalCta'] }) {
  return (
    <>
      <section className="bg-white px-4 pb-10 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1740px]">
          <div className="relative flex min-h-[455px] flex-col items-center overflow-hidden rounded-[40px] bg-[#101723] px-6 pb-16 pt-16 text-center lg:pb-[106px] lg:pt-[108px]">
            <Image
              src={finalCta.image?.src ?? '/images/industries/cta-people.jpg'}
              alt=""
              width={1838}
              height={1034}
              sizes="1838px"
              className="pointer-events-none absolute left-[-96px] top-[-203px] max-w-none opacity-20"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[227px] rounded-b-[40px] opacity-70"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgba(8,19,32,0) 0%, #081320 63%)' }}
              aria-hidden="true"
            />
            <h2 className="relative font-sans text-[30px] font-semibold capitalize leading-[34px] text-white sm:text-[36px] sm:leading-[41px] lg:text-[50px] lg:leading-[57px] lg:tracking-[-2px]">
              {finalCta.heading}
            </h2>
            <p className="relative mt-[10px] max-w-[819px] font-sans text-[16px] font-medium leading-[33.6px] text-white">
              {finalCta.body}
            </p>
            <div className="relative mt-9 flex justify-center lg:mt-[47px]">
              <Button link={finalCta.action} variant={finalCta.action.variant} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
