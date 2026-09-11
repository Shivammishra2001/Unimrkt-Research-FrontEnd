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
}

/** Reused for both long-form content blocks — "What We Do" (Figma node
 * 384:6360-6366, 579:8010) and the mirrored "{Title} Research" block
 * (384:6361-6364, 384:6475). Every field is CMS-driven
 * (`whatWeDo*`/`empower*`); renders nothing without a `heading`. */
export function ContentBlock({ eyebrow, heading, body, cta, image, frame, imageSide }: ContentBlockProps) {
  if (!heading) return null;

  const imageBlock = image && (
    <div className="relative mx-auto aspect-[643/501] w-full max-w-[560px]">
      {frame === 'circle' ? (
        <>
          <div className="absolute inset-0 rounded-full bg-white/10" style={{ margin: '-5%' }} aria-hidden="true" />
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <StrapiImage image={image} sizes="(min-width: 1024px) 45vw, 90vw" fill className="object-cover" />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 overflow-hidden rounded-[40px] bg-[#232128]">
          <StrapiImage image={image} sizes="(min-width: 1024px) 45vw, 90vw" fill className="object-cover opacity-90" />
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className={imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}>
            {eyebrow && <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>}
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {heading}
            </h2>
            {body && <p className="mt-6 max-w-[500px] text-base leading-[1.9] text-heading/80">{body}</p>}
            {cta && <Button link={cta} className="mt-8" />}
          </div>
          {imageBlock && <div className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}>{imageBlock}</div>}
        </div>
      </Container>
    </section>
  );
}
