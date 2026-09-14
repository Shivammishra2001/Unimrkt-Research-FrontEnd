import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedWorkWithUs } from './fallback';

/** "What Drives Us" — Figma node 924:23216 (y828-1660). Light pink
 * cards (`bg-[#fbf6f6] border-[rgba(163,40,42,0.12)] rounded-[20px]`) —
 * a distinct shell from every other Values-style card on the site
 * (/our-company's is dark glassmorphic); the 8 cards' own content is
 * the exact same "Core Values" set as /our-company's, just presented
 * differently on this page — see fallback.ts's header comment.
 *
 * No hover state: these cards carry no href/onClick — they're
 * decorative/informational, not a link or button — and Figma itself
 * defines no interactive variant for them (plain static frames, no
 * "State" property, confirmed via Dev Mode). Adding a hover-only lift
 * or shadow to a non-clickable card would imply an interaction that
 * doesn't exist, so none is added here (unlike Button.tsx-driven CTAs
 * elsewhere on this page, which do get real hover/focus treatment). */
export function ValuesSection({ values }: { values: ResolvedWorkWithUs['values'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{values.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {values.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{values.body}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 rounded-[20px] border border-[rgba(163,40,42,0.12)] bg-[#fbf6f6] p-8 text-center"
            >
              <span className="flex size-[100px] items-center justify-center rounded-full bg-white">
                <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[50px] text-brand-600" />
              </span>
              <p className="text-lg font-semibold capitalize text-heading">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
