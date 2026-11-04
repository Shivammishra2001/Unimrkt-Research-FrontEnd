import Image from 'next/image';
import { EYEBROW_CLASS, H2_CLASS, BODY_CLASS } from './shared';
import type { IndustriesPageContent } from '@/models/industriesPage';

const ICON_DIR = '/icons/industries';

/** px on the 602x645 illustration canvas -> cqw of the illustration box, so it scales as a unit with its width. */
const u = (px: number) => `${((px / 602) * 100).toFixed(4)}cqw`;

/** "Our Industries" intro — Figma 1384:26773 (y828-1586, #f9f9f7, 758px).
 * Eyebrow cap-top 923 (#cc1f1f), title 50/60 (-3px, 723px wide, #02060e),
 * three 16/30.4 paragraphs @ 80% (849px wide) at x=180; the worker
 * illustration sits at x=1078,y=884. */
export function IntroSection({ content }: { content: IndustriesPageContent['intro'] }) {
  const workerSrc = content.image?.src ?? '/images/industries/worker-cutout.webp';
  return (
    <section className="bg-[#f9f9f7] py-16 lg:min-h-[758px] lg:pb-12 lg:pt-0">
      <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-0 lg:px-8 lg:pt-[92px] min-[1580px]:px-0">
        <div className="min-w-0 lg:max-w-[849px] lg:flex-1">
          <p className={`${EYEBROW_CLASS} text-[#cc1f1f]`}>{content.eyebrow}</p>
          <h2 className={`${H2_CLASS} mt-[7px] max-w-[723px] text-[#02060e]`}>{content.heading}</h2>
          <div className={`${BODY_CLASS} mt-[12px] text-[#02060e] opacity-80`}>
            {content.paragraphs.map((paragraph, i) => (
              <p key={i} className={i < content.paragraphs.length - 1 ? 'mb-[30.4px]' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        {/* Worker illustration — Figma 1384:26777, 602x645 at (1078,884): two
            rings (#CC1F1F @ 10% outline, #FBF1F1 disc), the cut-out
            photo clipped to the disc (image 140) plus its unclipped upper
            half (image 141, 566x551) so the head rises above the ring.
            Both photo boxes are mirrored horizontally, as drawn. */}
        <div className="relative mx-auto aspect-[602/645] w-[clamp(277px,calc(100vw-2rem),420px)] shrink-0 [container-type:inline-size] lg:ml-8 lg:mt-[-36px] lg:w-[clamp(340px,36vw,602px)] xl:ml-[49px]" aria-hidden="true">
          <Image src={`${ICON_DIR}/intro-ring-outer.svg`} alt="" width={597.574} height={597.574} className="absolute max-w-none" style={{ left: u(0.43), top: u(47.58), width: u(597.574), height: u(597.574) }} />
          <Image src={`${ICON_DIR}/intro-ring-inner.svg`} alt="" width={539.627} height={539.627} className="absolute max-w-none" style={{ left: u(29.4), top: u(76.55), width: u(539.627), height: u(539.627) }} />
          <div
            className="absolute -scale-x-100 overflow-hidden"
            style={{
              left: u(36),
              top: u(1),
              width: u(566),
              height: u(646),
              maskImage: `url(${ICON_DIR}/intro-circle-mask.svg)`,
              WebkitMaskImage: `url(${ICON_DIR}/intro-circle-mask.svg)`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: `${u(-6.603)} ${u(75.55)}`,
              WebkitMaskPosition: `${u(-6.603)} ${u(75.55)}`,
              maskSize: `${u(539.627)} ${u(539.627)}`,
              WebkitMaskSize: `${u(539.627)} ${u(539.627)}`,
            }}
          >
            <Image
              src={workerSrc}
              alt=""
              width={1424}
              height={949}
              sizes="1424px"
              className="absolute left-[-14.59%] top-[-27.42%] h-[146.81%] w-[251.57%] max-w-none"
            />
          </div>
          <div className="absolute -scale-x-100 overflow-hidden" style={{ left: u(36), top: 0, width: u(566), height: u(551) }}>
            <Image
              src={workerSrc}
              alt={content.image?.alt || 'Industry professional holding a safety helmet'}
              width={1424}
              height={949}
              sizes="1424px"
              className="absolute left-[-14.59%] top-[-32.18%] h-[172.25%] w-[251.57%] max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
