import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { IndustryGridModel } from '@/models/domain';

/** blocks.industry-grid — left-aligned heading over a dark cityscape band,
 * card grid below. Every real seeded card shares the same accentColor
 * (#7f3856) — there is no per-industry palette on the source design. */
export function IndustryGridView({ block }: { block: IndustryGridModel; index: number }) {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-white sm:py-20 lg:py-24">
      {block.background && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${block.background.src})` }}
          aria-hidden="true"
        />
      )}
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Heading as="h2" size="h2" className="!tracking-[-2px] text-white">
              {block.heading}
            </Heading>
            {block.subheading && <p className="mt-4 text-lg opacity-80">{block.subheading}</p>}
          </div>
          {block.cta && <Button link={block.cta} variant={block.cta.variant} />}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item) => (
            <div
              key={item.id}
              className="group relative flex aspect-[380/399] flex-col justify-end overflow-hidden rounded-industry p-3 transition-transform hover:-translate-y-1"
              style={{ backgroundColor: item.accentColor }}
            >
              {item.image && (
                <div className="absolute inset-3 bottom-[23%] overflow-hidden rounded-[27px] bg-white">
                  <StrapiImage image={item.image} sizes="(min-width: 1024px) 25vw, 50vw" fill className="object-cover" />
                </div>
              )}
              <h3 className="relative z-10 px-2 pb-2 font-sans text-lg font-semibold text-white">{item.title}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
