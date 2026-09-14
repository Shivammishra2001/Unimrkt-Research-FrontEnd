import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedContact } from './fallback';

/** "Research at a Global Scale" stat band — Figma node 637:10433
 * (y828-1225, frame "Frame 1686557870"). Same frosted-glass card shell
 * as views/our-company/StatsBandSection.tsx (same 4 values, different
 * heading — reimplemented per-page rather than shared, same convention
 * as every other page-scoped section this session). CMS-first,
 * template-fallback — always renders. */
export function StatsBandSection({ stats }: { stats: ResolvedContact['stats'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <h2 className="text-center text-2xl font-semibold leading-[1.2] text-heading sm:text-3xl lg:text-[36px]">{stats.heading}</h2>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.items.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center gap-4 rounded-[19px] border border-[#e2e2e0] bg-white/65 p-6 text-center backdrop-blur-[12px]"
            >
              <span className="flex size-20 items-center justify-center rounded-full border border-brand-600/10 bg-white/80">
                <DetailCardIcon iconIdentifier={stat.iconIdentifier} className="size-11 text-brand-600" />
              </span>
              <div>
                <p className="font-display text-3xl font-bold text-heading sm:text-[34px]">{stat.value}</p>
                <p className="mt-3 text-base text-black">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
