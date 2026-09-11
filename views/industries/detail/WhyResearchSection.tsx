import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Why {Title} Research?" — Figma node 384:6404-6408 (y1913-2685), cards
 * shell = rounded-blog/shadow-blog (same as BlogCard/IndustryCard).
 * CMS-first, template-fallback — always renders 3 cards, never
 * collapses. Fallback cards have no photo, so they fall through to the
 * same icon resolver the icon-only sections use. */
export function WhyResearchSection({ whyResearch }: { whyResearch: ResolvedIndustryDetail['whyResearch'] }) {
  return (
    <section className="border-y border-[#d9d9d9]/50 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{whyResearch.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {whyResearch.heading}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyResearch.cards.map((card) => (
            <div key={card.id} className="flex h-full flex-col overflow-hidden rounded-blog border border-card-border bg-white shadow-blog">
              {card.image ? (
                <div className="relative m-4 aspect-[469/260] shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                  <StrapiImage image={card.image} sizes="(min-width: 1024px) 33vw, 100vw" fill className="object-cover" />
                </div>
              ) : (
                <div className="m-4 flex aspect-[469/260] shrink-0 items-center justify-center rounded-2xl bg-slate-50">
                  <DetailCardIcon icon={card.icon} iconIdentifier={card.iconIdentifier} className="size-12 text-brand-600" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-6 pt-2">
                <h3 className="font-sans text-xl font-semibold leading-[1.34] text-ink2">{card.title}</h3>
                {card.description && <p className="font-sans text-sm leading-[1.73] text-black/70">{card.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
