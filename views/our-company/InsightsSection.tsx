import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedOurCompany } from './fallback';

/** "Insights That Move Businesses Forward" — Figma node 617:7561
 * (y1954-2607). Same white/rounded-[24px]/border-[#e0e0df]/shadow-blog
 * card shell as views/sections/WhyChooseUsView.tsx (built for this exact
 * node/section in an earlier pass) — reimplemented as a page-scoped
 * section component rather than imported, since that View is a
 * dynamiczone block bound to `blocks.why-choose-us`/page.page, and this
 * page is a dedicated route with its own singleType fields. CMS-first,
 * template-fallback — always renders. */
export function InsightsSection({ insights }: { insights: ResolvedOurCompany['insights'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">{insights.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {insights.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{insights.body}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {insights.items.map((item) => (
            <li
              key={item.id}
              className="flex h-full flex-col items-center gap-4 rounded-[24px] border border-[#e0e0df] bg-white p-8 text-center shadow-blog"
            >
              <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-11 text-brand-600" />
              <h3 className="text-lg font-semibold text-ink2">{item.title}</h3>
              <p className="text-sm leading-[1.87] opacity-70">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
