import { Container } from '@/views/ui/Container';
import type { ResolvedWorkWithUs } from './fallback';

/** "Build Your Career. Create Meaningful Impact." — Figma node
 * 924:23216 (y6134-6607). Centered eyebrow/heading/paragraph band, same
 * shell as views/our-company/AboutCompanySection.tsx. CMS-first,
 * template-fallback — always renders. */
export function AboutCareersSection({ aboutCareers }: { aboutCareers: ResolvedWorkWithUs['aboutCareers'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[850px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{aboutCareers.eyebrow}</p>
          <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-2px]">
            {aboutCareers.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.9] text-heading/80">{aboutCareers.body}</p>
        </div>
      </Container>
    </section>
  );
}
