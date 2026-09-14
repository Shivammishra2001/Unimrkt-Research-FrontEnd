import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedWorkWithUs } from './fallback';

/** "More Than Just a Job" — Figma node 924:23216 (y1660-2481). Photo
 * left, eyebrow/heading/body + "Benefits:" label + 8-item 2-column
 * benefit grid right (red circular icon badge + label, no card
 * background — a plain list, distinct from every card-grid shell
 * elsewhere on the site). CMS-first, template-fallback — always
 * renders. No hover state, same reasoning as ValuesSection.tsx: these
 * rows carry no href/onClick and Figma defines no interactive variant
 * for them. */
export function BenefitsSection({ benefits }: { benefits: ResolvedWorkWithUs['benefits'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative aspect-[673/620] overflow-hidden rounded-[24px] bg-slate-100">
            {benefits.image && <StrapiImage image={benefits.image} sizes="(min-width: 1024px) 50vw, 100vw" fill className="object-cover" />}
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{benefits.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
              {benefits.heading}
            </h2>
            <p className="mt-4 text-base leading-[1.9] text-heading/80">{benefits.body}</p>

            <p className="mt-8 text-lg font-bold text-heading">{benefits.label}</p>
            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {benefits.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[34px] text-white" />
                  </span>
                  <p className="text-base font-medium text-heading">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
