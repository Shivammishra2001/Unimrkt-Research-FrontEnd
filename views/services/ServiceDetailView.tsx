import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { BlockDispatcher } from '@/controllers/BlockDispatcher';
import type { ServiceDetail } from '@/models/service';

/** /services/:slug — dedicated dark hero banner (title/summary/thumbnail/
 * price badge) + feature grid + BlockDispatcher over service.blocks. */
export function ServiceDetailView({ service }: { service: ServiceDetail }) {
  return (
    <>
      {/* Tracks the Navbar's current compact height — this hardcoded
          banner, not the service's own blocks.hero, is the page's actual
          first element, so it owns Navbar clearance. */}
      <div className="relative w-full overflow-hidden border-b border-slate-800 bg-[#0a0f1d] px-6 pb-20 pt-24 text-white sm:px-12 sm:pt-28">
        <Container className="px-0">
          <div className={service.thumbnail ? 'grid items-center gap-10 lg:grid-cols-2' : 'max-w-2xl'}>
            <div>
              <Heading as="h1" size="display" className="!text-white">
                {service.title}
              </Heading>
              <Prose className="mt-4 text-white/80">{service.summary}</Prose>
              {service.basePrice && (
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-5 py-2 text-lg font-semibold text-brand-500 backdrop-blur-sm">
                  {service.basePrice}
                </span>
              )}
            </div>
            {/* Every currently-seeded service has no thumbnail, so this is
                dead code in practice today — disclosed rather than
                silently removed, since a future service could set one. */}
            {service.thumbnail && (
              <StrapiImage
                image={service.thumbnail}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="w-full rounded-2xl object-cover"
              />
            )}
          </div>
        </Container>
      </div>
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
