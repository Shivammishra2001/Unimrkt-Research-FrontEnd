import Image from 'next/image';
import { EYEBROW_CLASS, H2_CLASS, BODY_CLASS } from '@/views/industries/listing/shared';
import type { ServicesListingContent } from './content';

const RING_DIR = '/icons/industries';
const PHOTO = '/images/services/listing/about-colleagues.webp';

/** px on the 603.23x639.89 artwork canvas -> cqw of the artwork box, so the rings, mask and photo scale as one unit. */
const u = (px: number) => `${((px / 603.23) * 100).toFixed(4)}cqw`;

/** "About Our Services" intro — Figma 1231:77071 (#f9f9f7, y828-1586) + 1231:77245-77249 + artwork 1231:77359.
 * Eyebrow cap-top 948, 50/60 title (-3px, 723px), three 16/30.4 paragraphs @ 80% (849px) at x180. The artwork canvas
 * starts at (1072.77, 887.26): the 10% #cc1f1f outline ring (597.574, at 5.66/42.32) and the #fbf1f1 disc (539.627, at
 * 34.63/71.29) are the same rings as /industries; the colleagues photo (587.84x610.88, mirrored) is clipped to the disc,
 * and its top 306px is repeated unclipped so the two heads rise above the ring. */
export function ServicesIntro({ content }: { content: ServicesListingContent['intro'] }) {
  const photo = content.image?.src ?? PHOTO;
  return (
    <section className="bg-[#f9f9f7] py-16 lg:min-h-[758px] lg:pb-12 lg:pt-0">
      <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-0 lg:px-8 lg:pt-[117px] min-[1580px]:px-0">
        <div className="min-w-0 lg:max-w-[849px] lg:flex-1">
          <p className={`${EYEBROW_CLASS} text-[#cc1f1f]`}>{content.eyebrow}</p>
          <h2 className={`${H2_CLASS} mt-[7px] max-w-[723px] text-[#02060e]`}>{content.heading}</h2>
          <div className={`${BODY_CLASS} mt-[12px] text-[#02060e] opacity-80 lg:mt-[22px]`}>
            {content.paragraphs.map((paragraph, i) => (
              <p key={i} className={i < content.paragraphs.length - 1 ? 'mb-[30.4px]' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto aspect-[603.23/639.89] w-[clamp(277px,calc(100vw-2rem),420px)] shrink-0 [container-type:inline-size] lg:ml-8 lg:mt-[-59px] lg:w-[clamp(340px,36vw,603px)] xl:ml-[44px]"
          aria-hidden="true"
        >
          <Image src={`${RING_DIR}/intro-ring-outer.svg`} alt="" width={597.574} height={597.574} className="absolute max-w-none" style={{ left: u(5.66), top: u(42.32), width: u(597.574), height: u(597.574) }} />
          <Image src={`${RING_DIR}/intro-ring-inner.svg`} alt="" width={539.627} height={539.627} className="absolute max-w-none" style={{ left: u(34.63), top: u(71.29), width: u(539.627), height: u(539.627) }} />
          {/* Photo clipped to the disc. The mask sits in the box's own (unflipped) space; only the photo is mirrored. */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: 0,
              top: 0,
              width: u(587.836),
              height: u(610.875),
              maskImage: `url(${RING_DIR}/intro-circle-mask.svg)`,
              WebkitMaskImage: `url(${RING_DIR}/intro-circle-mask.svg)`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: `${u(34.627)} ${u(71.289)}`,
              WebkitMaskPosition: `${u(34.627)} ${u(71.289)}`,
              maskSize: `${u(539.627)} ${u(539.627)}`,
              WebkitMaskSize: `${u(539.627)} ${u(539.627)}`,
            }}
          >
            <Image src={photo} alt="" width={1600} height={1067} sizes="(min-width: 1024px) 940px, 660px" className="absolute left-[-25.88%] top-0 h-full w-[155.86%] max-w-none -scale-x-100" />
          </div>
          <div className="absolute overflow-hidden" style={{ left: u(0.45), top: 0, width: u(587.387), height: u(306.191) }}>
            <Image src={photo} alt="" width={1600} height={1067} sizes="(min-width: 1024px) 940px, 660px" className="absolute left-[-25.88%] top-0 h-[199.66%] w-[155.86%] max-w-none -scale-x-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
