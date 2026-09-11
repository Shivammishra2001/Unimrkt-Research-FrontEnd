import { Container } from '@/views/ui/Container';
import type { ResolvedServiceDetail } from './fallback';

/** "Research Methodologies" — Figma node 474:5741-5767 (y3978-4686). White
 * cards (`border-[#e0e0df]`, `rounded-[24px]`, `shadow-blog`), a small
 * circular numbered badge (70px, brand-600 fill, white "0N") — a
 * different shell from /industries/[slug]'s Methodologies section
 * (which reuses the solid-accentColor `blocks.industry-item` card). This
 * node's number is purely positional (index + 1), not stored data.
 * CMS-first, template-fallback — always renders. */
export function MethodologiesSection({ methodologies }: { methodologies: ResolvedServiceDetail['methodologies'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{methodologies.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {methodologies.heading}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methodologies.items.map((item, i) => (
            <div key={item.id} className="relative overflow-hidden rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-blog">
              <span className="flex size-[70px] items-center justify-center rounded-full bg-brand-600">
                <span className="font-sans text-[32px] font-semibold capitalize leading-[1.2] text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>
              <h3 className="mt-6 font-sans text-xl font-semibold leading-[1.34] text-ink2">{item.title}</h3>
              {item.description && <p className="mt-4 max-w-[360px] text-sm leading-[1.87] text-black/70">{item.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
