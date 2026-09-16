import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Button } from '@/views/ui/Button';
import { ArrowRightIcon } from '@/views/ui/icons/ArrowRightIcon';
import type { ServiceBandModel } from '@/models/domain';

/** blocks.service-band — dark glassmorphic band: a gradient highlight
 * panel + a row of frosted-glass service cards over a background photo.
 * Every card sits collapsed (title + outline arrow) until hovered/focused,
 * then lifts, reveals its description, and the arrow fills solid —
 * a hover-expand interaction, not a static grid of equal-height pills.
 * This component has no `theme` field on its Strapi schema — it is always
 * dark, unconditionally, never driven by block.theme. */
export function ServiceBandView({ block }: { block: ServiceBandModel; index: number }) {
  return (
    <section id={block.anchorId} className="relative overflow-hidden bg-ink-700 py-16 text-white sm:py-20 lg:py-24">
      {block.background && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${block.background.src})` }}
          aria-hidden="true"
        />
      )}
      <Container className="relative">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Figma's real (Component 176) treatment is the gradient panel,
              not a flat brand-600 fill — same tokens the CTA/footer bands
              already use. */}
          <div className="rounded-lg bg-gradient-to-br from-gradient-from to-gradient-to p-8 lg:col-span-1">
            <Heading as="h2" size="h3" className="!text-white">
              {block.heading}
            </Heading>
            {block.body && <p className="mt-4 text-sm leading-relaxed opacity-90">{block.body}</p>}
            {block.cta && <Button link={block.cta} variant={block.cta.variant} className="mt-6" />}
          </div>
          {/* items-end + overflow-visible: a hovered card lifts up and
              grows via transform/max-height without shoving its siblings
              (transforms don't consume layout space) or getting clipped by
              the grid's own bounds. */}
          <div className="grid items-end gap-4 overflow-visible sm:grid-cols-2 lg:col-span-3">
            {block.items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group relative flex flex-col justify-end gap-3 rounded-lg border border-white/10 bg-glass p-6 backdrop-blur-glass transition-all duration-300 ease-out hover:-translate-y-8 hover:bg-white/15 hover:shadow-2xl hover:shadow-black/40 lg:hover:-translate-y-12"
              >
                {item.description && (
                  <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-300 ease-out group-hover:max-h-40 group-hover:opacity-100">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-sans text-lg font-semibold">{item.label}</h3>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 ease-out group-hover:border-brand-600 group-hover:bg-brand-600">
                    <ArrowRightIcon className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
