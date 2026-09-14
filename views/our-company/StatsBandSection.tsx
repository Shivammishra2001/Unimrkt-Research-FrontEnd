import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedOurCompany } from './fallback';

/** "Research Without Borders" stat band — Figma node 617:7561 (y828-1226,
 * frame "Frame 1686557870"). Frosted-glass cards
 * (`backdrop-blur-[12px] bg-white/65 border-[#e2e2e0] rounded-[19px]`)
 * over the hero's own bottom edge — a distinct shell from every other
 * stat/credential grid on the site, so it isn't a reuse of
 * CredentialsSection.tsx's glass-card treatment (that one is dark/on-image;
 * this one is light/frosted). CMS-first, template-fallback — always
 * renders. */
export function StatsBandSection({ stats }: { stats: ResolvedOurCompany['stats'] }) {
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
