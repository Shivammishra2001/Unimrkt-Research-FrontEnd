import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { TestimonialsModel } from '@/models/domain';

function TestimonialCard({ item }: { item: TestimonialsModel['items'][number] }) {
  return (
    <blockquote className="flex h-full flex-col justify-between gap-6 rounded-xl border border-card-border p-6">
      <p className="text-lg leading-[1.7] opacity-90">&ldquo;{item.quote}&rdquo;</p>
      <footer className="flex items-center gap-3">
        {item.avatar && <StrapiImage image={item.avatar} sizes="48px" className="size-12 rounded-full object-cover" />}
        <cite className="not-italic">
          <span className="block font-semibold text-heading">{item.authorName}</span>
          {(item.authorRole || item.company) && (
            <span className="block text-sm opacity-70">{[item.authorRole, item.company].filter(Boolean).join(', ')}</span>
          )}
        </cite>
      </footer>
    </blockquote>
  );
}

/** blocks.testimonials — grid/carousel/single layout. Carousel uses native
 * scroll-snap (no autoplay, keyboard-accessible via native scroll). */
export function TestimonialsView({ block }: { block: TestimonialsModel; index: number }) {
  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        {(block.heading || block.subheading) && (
          <div className="mx-auto max-w-2xl text-center">
            {block.heading && (
              <Heading as="h2" size="h2">
                {block.heading}
              </Heading>
            )}
            {block.subheading && <Prose className="mt-4">{block.subheading}</Prose>}
          </div>
        )}
        {block.layout === 'carousel' ? (
          <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {block.items.map((item) => (
              <div key={item.id} className="w-80 shrink-0 snap-start">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        ) : block.layout === 'single' ? (
          <div className="mx-auto mt-12 max-w-2xl">{block.items[0] && <TestimonialCard item={block.items[0]} />}</div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
