import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedOurCompany } from './fallback';

/** "We Turn Questions Into Clarity" — Figma node 617:7561 (y1226-1954).
 * Text-left/photo-right 2-column band, matching this site's established
 * ContentBlock shell (rounded photo frame, eyebrow/heading/body on the
 * opposite side). CMS-first, template-fallback — always renders. */
export function AboutFoundingSection({ about }: { about: ResolvedOurCompany['about'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{about.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {about.heading}
            </h2>
            <p className="mt-6 text-base leading-[1.9] text-heading/80">{about.body}</p>
          </div>
          <div className="relative aspect-[673/541] overflow-hidden rounded-[24px] bg-slate-100">
            {about.image && <StrapiImage image={about.image} sizes="(min-width: 1024px) 50vw, 100vw" fill className="object-cover" />}
          </div>
        </div>
      </Container>
    </section>
  );
}
