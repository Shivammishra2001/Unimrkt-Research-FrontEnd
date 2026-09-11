import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedServiceDetail } from './fallback';

/** "About {Title}" — Figma node 474:5897-6069 (y1103-1867). Framed photo
 * (`rounded-[40px]`, same shell as /industries/[slug]'s ContentBlock
 * "rounded" variant) on the right, a 3-item icon+label row (Figma node
 * 474:6050-6065) beneath the body copy on the left. CMS-first,
 * template-fallback — always renders. */
export function OverviewSection({ overview }: { overview: ResolvedServiceDetail['overview'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{overview.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {overview.heading}
            </h2>
            <p className="mt-6 max-w-[560px] text-base leading-[1.9] text-heading/80">{overview.body}</p>

            {overview.features.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
                {overview.features.map((feature) => (
                  <div key={feature.id} className="flex items-center gap-3">
                    <span className="flex size-[70px] shrink-0 items-center justify-center rounded-full bg-[#fbf6f6]">
                      <DetailCardIcon icon={feature.icon} iconIdentifier={feature.iconIdentifier} className="size-[34px] text-brand-600" />
                    </span>
                    <p className="max-w-[148px] font-sans text-[15px] font-semibold capitalize leading-[1.4] text-heading">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {overview.image && (
            <div className="relative mx-auto aspect-[673/541] w-full max-w-[620px] overflow-hidden rounded-[40px] bg-[#232128]">
              <StrapiImage image={overview.image} sizes="(min-width: 1024px) 45vw, 90vw" fill className="object-cover" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
