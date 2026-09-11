import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Supporting Every {Title} Segment" — Figma node 384:6207-6221
 * (y4441-5301). Same white rounded-blog/shadow-blog shell as
 * WhyResearchSection, but a small 80px line icon instead of a photo.
 * CMS-first, template-fallback — always renders 4 cards, never
 * collapses. */
export function WhoWeServeSection({ whoWeServe }: { whoWeServe: ResolvedIndustryDetail['whoWeServe'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{whoWeServe.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {whoWeServe.heading}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whoWeServe.cards.map((card) => (
            <div key={card.id} className="flex flex-col gap-6 rounded-blog border border-card-border bg-white p-8 shadow-blog">
              <DetailCardIcon icon={card.icon} iconIdentifier={card.iconIdentifier} className="size-20 text-brand-600" />
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-[22px] font-semibold leading-[1.34] text-ink2">{card.title}</h3>
                {card.description && <p className="font-sans text-sm leading-[1.87] text-black/70">{card.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
