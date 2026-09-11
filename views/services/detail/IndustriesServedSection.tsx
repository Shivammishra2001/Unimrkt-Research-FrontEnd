import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedServiceDetail } from './fallback';

/** "Industries We Support" — Figma node 474:6124-6133 (y4987-5599), 10
 * icon cards (`bg-[#fbf6f6]`, border `rgba(163,40,42,0.12)`,
 * `rounded-[20px]`). CMS-first, template-fallback — always renders. */
export function IndustriesServedSection({ industries }: { industries: ResolvedServiceDetail['industries'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{industries.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {industries.heading}
          </h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{industries.body}</p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 rounded-[20px] border border-[rgba(163,40,42,0.12)] bg-[#fbf6f6] px-4 py-8 text-center"
            >
              <span className="flex size-[100px] shrink-0 items-center justify-center rounded-full bg-white">
                <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[50px] text-brand-600" />
              </span>
              <p className="font-sans text-lg font-semibold leading-[1.2] text-heading">{item.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
