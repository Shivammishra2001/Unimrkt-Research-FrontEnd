import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedOurCompany } from './fallback';

/** "Deep Knowledge Across Diverse Industries" — Figma node 617:7561
 * (y4550-5886). Same dark photo-card shell as
 * views/services/detail/CapabilitiesSection.tsx (`rounded-[30px]`,
 * `bg-[#01040c]`, bottom gradient scrim, white title, `font-nav`
 * substituted for the node's "Lato SemiBold" — same documented
 * substitution as that component), 8 cards across 2 rows instead of 4
 * across 1. CMS-first, template-fallback — always renders. */
export function IndustriesSection({ industries }: { industries: ResolvedOurCompany['industries'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{industries.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {industries.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{industries.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.items.map((item) => (
            <div key={item.id} className="relative aspect-[384/480] overflow-hidden rounded-[30px] bg-[#01040c]">
              {item.image && <StrapiImage image={item.image} sizes="(min-width: 1024px) 25vw, 50vw" fill className="object-cover" />}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" aria-hidden="true" />
              <p className="absolute bottom-[13%] left-[12.5%] font-nav text-[21px] font-semibold leading-[1.33] text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
