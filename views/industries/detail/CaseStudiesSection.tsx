import { Container } from '@/views/ui/Container';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedIndustryDetail } from './fallback';

/** "{Title} Success Stories" — Figma node 579:6247-6258 (y9479-10229),
 * gradient band reusing the site's `gradient-from`/`gradient-to` tokens.
 * Deliberately CMS-only, no template fallback (see fallback.ts's header
 * comment: a "success story" is a claim about a specific completed
 * engagement — inventing one would misrepresent real client work, unlike
 * the generic capability copy the rest of this page falls back to).
 * Renders nothing until real case studies are authored for this
 * industry. */
export function CaseStudiesSection({ caseStudies }: { caseStudies: ResolvedIndustryDetail['caseStudies'] }) {
  if (!caseStudies) return null;

  return (
    <section className="bg-gradient-to-r from-gradient-from to-gradient-to py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">{caseStudies.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {caseStudies.heading}
            </h2>
            {caseStudies.body && <p className="mt-6 max-w-md text-base leading-[1.9] text-white/85">{caseStudies.body}</p>}
            {caseStudies.cta && <Button link={caseStudies.cta} className="mt-8" />}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {caseStudies.items.map((study) => (
              <div key={study.id} className="flex flex-col overflow-hidden rounded-blog border border-card-border bg-white shadow-blog">
                {study.image && (
                  <div className="relative aspect-[420/390] shrink-0 overflow-hidden bg-slate-900">
                    <StrapiImage image={study.image} sizes="(min-width: 1024px) 22vw, 45vw" fill className="object-cover" />
                  </div>
                )}
                <p className="p-6 font-sans text-xl font-semibold leading-[1.34] text-ink2">{study.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
