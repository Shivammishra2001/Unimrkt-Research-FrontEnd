import { Container } from '@/views/ui/Container';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { LinkModel, ImageModel } from '@/models/domain';

interface ContentBlockProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  cta?: LinkModel;
  image?: ImageModel;
  /** 'rounded' = node 579:8010 (40px rounded rect, dark #232128 backdrop).
   * 'circle' = node 384:6475 (circular frame, translucent ring). */
  frame: 'rounded' | 'circle';
  imageSide: 'left' | 'right';
  /** Desktop section height from the Figma frame, e.g. 'lg:min-h-[777px]'. */
  minHeightClass?: string;
}

/** Reused for both long-form content blocks — "What We Do" (Figma node
 * 384:6360-6366, 579:8010) and the mirrored "{Title} Research" block
 * (384:6361-6364, 384:6475). Every field is CMS-driven
 * (`whatWeDo*`/`empower*`); renders nothing without a `heading`. */
export function ContentBlock({ eyebrow, heading, body, cta, image, frame, imageSide, minHeightClass }: ContentBlockProps) {
  if (!heading) return null;

  const imageBlock = image && (
    <div className={`relative mx-auto w-full ${frame === 'rounded' ? 'aspect-[686/534] max-w-[686px]' : 'aspect-[660/688] max-w-[560px] lg:max-w-[660px]'}`}>
      {frame === 'circle' ? (
        // Figma 384:6475 (660x688): 1px #CC1F1F/10% ring, #FBF1F1 596px disc, the cut-out clipped to the disc
        // (742x656 box at -53/-60), and a second copy of its top 387px breaking out above the disc.
        <>
          <div className="absolute left-0 top-[4.07%] h-[95.93%] w-full rounded-full border border-[#cc1f1f]/10" aria-hidden="true" />
          <div className="absolute left-[4.85%] top-[8.72%] h-[86.63%] w-[90.3%] overflow-hidden rounded-full bg-[#fbf1f1]">
            <div className="absolute -left-[8.89%] -top-[10.07%] h-[110.07%] w-[124.5%] overflow-hidden">
              <div className="absolute -top-[13.07%] left-0 h-[113.07%] w-full">
                <StrapiImage image={image} sizes="(min-width: 1024px) 742px, 90vw" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute left-[4.85%] top-0 h-[56.25%] w-[88.64%] overflow-hidden">
            <div className="absolute -left-[9.06%] -top-[22.13%] h-[191.49%] w-[126.84%]">
              <StrapiImage image={image} sizes="(min-width: 1024px) 742px, 90vw" fill className="object-cover" />
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 overflow-hidden rounded-[40px] bg-[#232128]">
          <StrapiImage image={image} sizes="(min-width: 1024px) 45vw, 90vw" fill className="object-cover opacity-90" />
        </div>
      )}
    </div>
  );

  // Figma 384:6362 — two paragraphs with one blank line (30.4px) between them.
  const paragraphs = (body ?? '').split(/\r?\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <section className={`flex items-center bg-white py-16 sm:py-20 lg:items-start ${frame === 'circle' ? 'lg:pb-[97px]' : 'lg:pb-[103px]'} lg:pt-[72px] ${minHeightClass ?? ''}`}>
      <Container className="w-full max-w-[1600px] min-[1700px]:px-0">
        <div className={`grid gap-12 ${frame === 'circle' ? 'lg:items-start' : 'items-center'} ${frame === 'circle' ? 'lg:grid-cols-[minmax(0,884px)_minmax(0,660px)] lg:gap-x-0' : 'lg:grid-cols-[minmax(0,833px)_minmax(0,686px)] lg:gap-x-16'}`}>
          <div className={`${imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'} ${frame === 'circle' ? 'lg:pt-[96px]' : ''}`}>
            {eyebrow && <p className="font-sans text-[13px] font-bold uppercase tracking-[3px] text-brand-600">{eyebrow}</p>}
            <h2 className={`mt-3 ${frame === 'circle' ? 'max-w-[780px]' : 'max-w-[460px]'} lg:mt-[3px] font-sans text-3xl font-semibold capitalize leading-[1.2] text-[#02060e] sm:text-4xl lg:text-[50px] lg:leading-[1.2] lg:tracking-[-3px]`}>
              {heading}
            </h2>
            {paragraphs.length > 0 && (
              <div className={`mt-6 ${frame === 'circle' ? 'max-w-[808px]' : 'max-w-[833px]'} font-sans text-[16px] leading-[1.9] text-[#02060e]/80 lg:mt-[15px]`}>
                {paragraphs.map((p, i) => (
                  <p key={i} className={i > 0 ? 'mt-[30.4px]' : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            )}
            {cta && <Button link={cta} className="mt-8 lg:mt-[50px]" />}
          </div>
          {imageBlock && <div className={`${imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'} ${frame === 'circle' ? 'lg:mt-[35px]' : 'lg:mt-3'}`}>{imageBlock}</div>}
        </div>
      </Container>
    </section>
  );
}
