import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedServiceDetail } from './fallback';

/** "Our {Title} Services" — Figma node 474:5922-5923/727:xxxx
 * (y1867-2726). Dark photo cards (`rounded-[30px]`, `bg-[#01040c]`,
 * bottom gradient scrim, white title). Figma's real typeface here is
 * "Lato SemiBold" — not already configured in tailwind.config.ts's
 * fontFamily set (Montserrat/Inter/Quicksand/Anton only) — substituted
 * with `font-nav` (Inter), the closest already-configured clean sans,
 * same "documented substitution" convention as the Anton stat-numeral
 * swap in tailwind.config.ts. Reuses `service.features` (previously
 * always empty) rather than a new field — see fallback.ts's header
 * comment. CMS-first, template-fallback — always renders. */
export function CapabilitiesSection({ capabilities }: { capabilities: ResolvedServiceDetail['capabilities'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{capabilities.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {capabilities.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{capabilities.body}</p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.items.map((item) => (
            <div key={item.id} className="relative aspect-[384/480] overflow-hidden rounded-[30px] bg-[#01040c]">
              {item.icon && <StrapiImage image={item.icon} sizes="(min-width: 1024px) 25vw, 50vw" fill className="object-cover" />}
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
