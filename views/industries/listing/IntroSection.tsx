import Image from 'next/image';
import { EYEBROW_CLASS, H2_CLASS, BODY_CLASS } from './shared';

const ICON_DIR = '/icons/industries';

/** "Our Industries" intro — Figma 1384:26773 (y828-1586, #f9f9f7, 758px).
 * Eyebrow cap-top 923 (#cc1f1f), title 50/60 (-3px, 723px wide, #02060e),
 * three 16/30.4 paragraphs @ 80% (849px wide) at x=180; the worker
 * illustration sits at x=1078,y=884. */
export function IntroSection() {
  return (
    <section className="bg-[#f9f9f7] py-16 min-[1500px]:h-[758px] min-[1500px]:py-0">
      <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-10 px-4 sm:px-6 lg:px-8 min-[1500px]:flex-row min-[1500px]:gap-0 min-[1500px]:pt-[92px] min-[1580px]:px-0">
        <div className="min-[1500px]:w-[849px] min-[1500px]:shrink-0">
          <p className={`${EYEBROW_CLASS} text-[#cc1f1f]`}>Our Industries</p>
          <h2 className={`${H2_CLASS} mt-[7px] max-w-[723px] text-[#02060e]`}>Understanding Industries. Uncovering Opportunities.</h2>
          <div className={`${BODY_CLASS} mt-[12px] text-[#02060e] opacity-80`}>
            <p className="mb-[30.4px]">
              Every industry operates within a unique ecosystem shaped by customer expectations, market trends, competition, technology and
              regulatory changes. Unimrkt Research helps organizations understand these dynamics through industry-focused research designed
              around specific business questions and objectives.
            </p>
            <p className="mb-[30.4px]">
              Our research explores market opportunities, customer behavior, competitive landscapes, emerging trends, product preferences and
              changing industry needs. By combining primary, qualitative, quantitative and business research capabilities, we provide a
              comprehensive view of the markets and audiences that matter most.
            </p>
            <p>
              From established sectors to emerging markets, our approach can be adapted to different industries, geographies and audiences. We
              bring together industry context, reliable data and meaningful analysis to help businesses identify opportunities, understand
              challenges and make informed strategic decisions with greater confidence.
            </p>
          </div>
        </div>
        {/* Worker illustration — Figma 1384:26777, 602x645 at (1078,884): two
            rings (#CC1F1F @ 10% outline, #FBF1F1 disc), the cut-out
            photo clipped to the disc (image 140) plus its unclipped upper
            half (image 141, 566x551) so the head rises above the ring.
            Both photo boxes are mirrored horizontally, as drawn. */}
        <div className="mx-auto h-[645px] w-[602px] shrink-0 max-sm:h-[387px] max-sm:w-[361px] min-[1500px]:ml-[49px] min-[1500px]:mt-[-36px]">
          <div className="relative h-[645px] w-[602px] origin-top-left max-sm:scale-[0.6]" aria-hidden="true">
            <Image src={`${ICON_DIR}/intro-ring-outer.svg`} alt="" width={597.574} height={597.574} className="absolute left-[0.43px] top-[47.58px] size-[597.574px] max-w-none" />
            <Image src={`${ICON_DIR}/intro-ring-inner.svg`} alt="" width={539.627} height={539.627} className="absolute left-[29.4px] top-[76.55px] size-[539.627px] max-w-none" />
            <div
              className="absolute left-[36px] top-px h-[646px] w-[566px] -scale-x-100 overflow-hidden"
              style={{
                maskImage: `url(${ICON_DIR}/intro-circle-mask.svg)`,
                WebkitMaskImage: `url(${ICON_DIR}/intro-circle-mask.svg)`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: '-6.603px 75.55px',
                WebkitMaskPosition: '-6.603px 75.55px',
                maskSize: '539.627px 539.627px',
                WebkitMaskSize: '539.627px 539.627px',
              }}
            >
              <Image
                src="/images/industries/worker-cutout.webp"
                alt=""
                width={1424}
                height={949}
                sizes="1424px"
                className="absolute left-[-14.59%] top-[-27.42%] h-[146.81%] w-[251.57%] max-w-none"
              />
            </div>
            <div className="absolute left-[36px] top-0 h-[551px] w-[566px] -scale-x-100 overflow-hidden">
              <Image
                src="/images/industries/worker-cutout.webp"
                alt="Industry professional holding a safety helmet"
                width={1424}
                height={949}
                sizes="1424px"
                className="absolute left-[-14.59%] top-[-32.18%] h-[172.25%] w-[251.57%] max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
