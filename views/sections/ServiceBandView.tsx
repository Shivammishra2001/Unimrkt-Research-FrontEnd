import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Button } from '@/views/ui/Button';
import type { ServiceBandModel } from '@/models/domain';

/** blocks.service-band — dark glassmorphic band: solid-red highlight panel
 * + a row of frosted-glass service pills over a background photo. This
 * component has no `theme` field on its Strapi schema — it is always dark,
 * unconditionally, never driven by block.theme. */
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
          <div className="rounded-lg bg-brand-600 p-8 lg:col-span-1">
            <Heading as="h2" size="h3" className="!text-white">
              {block.heading}
            </Heading>
            {block.body && <p className="mt-4 text-sm leading-relaxed opacity-90">{block.body}</p>}
            {block.cta && <Button link={block.cta} variant={block.cta.variant} className="mt-6" />}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {block.items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group flex h-full min-h-[155px] flex-col justify-between rounded-lg bg-glass p-6 backdrop-blur-glass transition-colors hover:bg-white/15"
              >
                <span className="font-sans text-lg font-semibold">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
