import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedWorkWithUs } from './fallback';

/** "Grow With Purpose" — Figma node 924:23216 (y3775-4354). Dark
 * maroon/red gradient band, 4 white cards. Step numbers ("1./2./3./4.")
 * are the card's 1-based array position, not stored data — the node
 * shows them as a plain numeric prefix on each card, not present as
 * separate text in the underlying data. CMS-first, template-fallback —
 * always renders. */
export function JourneySection({ journey }: { journey: ResolvedWorkWithUs['journey'] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">{journey.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {journey.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-white/80">{journey.body}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {journey.items.map((item, i) => (
            <li key={item.id} className="flex h-full flex-col items-center gap-4 rounded-[24px] border border-[#e0e0df] bg-white p-8 text-center shadow-blog">
              <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-11 text-brand-600" />
              <h3 className="text-lg font-semibold text-ink2">
                {i + 1}. {item.title}
              </h3>
              <p className="text-sm leading-[1.87] opacity-70">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
