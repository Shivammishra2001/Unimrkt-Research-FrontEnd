import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { BlockDispatcher } from '@/controllers/BlockDispatcher';
import type { IndustryDetail } from '@/models/industry';

/** /industries/:slug — mirrors ServiceDetailView's dark hero banner +
 * BlockDispatcher pattern, minus the features grid (industries have none). */
export function IndustryDetailView({ industry }: { industry: IndustryDetail }) {
  return (
    <>
      {/* Same Navbar-clearance banner treatment as ServiceDetailView — see
          the comment there for why this hardcoded pt-32/pt-36 exists. */}
      <div className="relative w-full overflow-hidden border-b border-slate-800 bg-[#0a0f1d] px-6 pb-20 pt-32 text-white sm:px-12 sm:pt-36">
        <Container className="px-0">
          <div className={industry.icon ? 'grid items-center gap-10 lg:grid-cols-2' : 'max-w-2xl'}>
            <div>
              <Heading as="h1" size="display" className="!text-white">
                {industry.title}
              </Heading>
              {industry.summary && <Prose className="mt-4 text-white/80">{industry.summary}</Prose>}
            </div>
            {industry.icon && (
              <StrapiImage
                image={industry.icon}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="w-full rounded-2xl object-cover"
              />
            )}
          </div>
        </Container>
      </div>
      <BlockDispatcher blocks={industry.blocks} />
    </>
  );
}
