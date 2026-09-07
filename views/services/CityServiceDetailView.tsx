import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { BlockDispatcher } from '@/controllers/BlockDispatcher';
import type { MergedCityService } from '@/models/location-service';

/** /services/:city/:service — merged master+override hero (with a
 * "Localized for {city}" editorial badge when isOverridden) + local
 * phone/address, feature grid, and BlockDispatcher over merged blocks. */
export function CityServiceDetailView({ service }: { service: MergedCityService }) {
  return (
    <>
      {/* Same Navbar-clearance reasoning as ServiceDetailView: this
          hardcoded header, not the merged service's own blocks.hero, is
          the page's actual first element. */}
      <Section theme="dark" className="!pt-28">
        <Container>
          {service.isOverridden && (
            <span className="inline-flex items-center rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-brand-400">
              Localized for {service.city.name}
            </span>
          )}
          <Heading as="h1" size="display" className="mt-4 !text-white">
            {service.title}
          </Heading>
          <Prose className="mt-4 max-w-2xl text-white/80">{service.summary}</Prose>
          {service.price && (
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-5 py-2 text-lg font-semibold text-brand-500 backdrop-blur-sm">
              {service.price}
            </span>
          )}
          {(service.localPhone || service.localAddress) && (
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.localPhone && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-white/50">Phone</dt>
                  <dd className="mt-1 text-white/90">{service.localPhone}</dd>
                </div>
              )}
              {service.localAddress && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-white/50">Address</dt>
                  <dd className="mt-1 text-white/90">{service.localAddress}</dd>
                </div>
              )}
            </dl>
          )}
        </Container>
      </Section>
      {service.features.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24">
          <Container>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature) => (
                <li key={feature.id} className="rounded-xl border border-card-border p-6">
                  <Heading as="h3" size="h3">
                    {feature.title}
                  </Heading>
                  <Prose className="mt-3">{feature.description}</Prose>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <BlockDispatcher blocks={service.blocks} />
    </>
  );
}
