import { Container } from '@/views/ui/Container';
import type { ResolvedOurCompany } from './fallback';

/** "Turning Market Questions Into Business Clarity" — Figma node
 * 617:7561 (y7438-8009). Centered eyebrow/heading/paragraph band, same
 * shell as BlogListingView's "About Our Blog" section. CMS-first,
 * template-fallback — always renders. */
export function AboutCompanySection({ aboutCompany }: { aboutCompany: ResolvedOurCompany['aboutCompany'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[850px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{aboutCompany.eyebrow}</p>
          <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-2px]">
            {aboutCompany.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.9] text-heading/80">{aboutCompany.body}</p>
        </div>
      </Container>
    </section>
  );
}
