import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedOurCompany } from './fallback';

/** "From Question to Business Decision" — Figma node 617:7561
 * (y2607-3369). White/rounded-[24px]/border-[#e0e0df]/shadow-blog cards
 * with a large faded step numeral (`opacity-15`, `text-[66px]`) — a
 * distinct numbered-card shell from every other "01/02/03" pattern on
 * the site (services' methodology cards use a small circular badge, not
 * a giant background numeral). Step numbers are the card's 1-based array
 * position, not stored data — see fallback.ts's header comment for why
 * (the node's own 01/01/01/04 numbering is a duplication artifact). */
export function EcosystemSection({ ecosystem }: { ecosystem: ResolvedOurCompany['ecosystem'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{ecosystem.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {ecosystem.heading}
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-heading/70">{ecosystem.subtext}</p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystem.items.map((item, i) => (
            <li key={item.id} className="relative flex h-full flex-col gap-6 rounded-[24px] border border-[#e0e0df] bg-white p-6 shadow-blog">
              <p className="font-display text-[66px] capitalize leading-[1.2] tracking-[-1px] text-[#02060e] opacity-15">
                {String(i + 1).padStart(2, '0')}
              </p>
              <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[70px] text-brand-600" />
              <div>
                <h3 className="text-[22px] font-semibold text-[#04264e]">{item.title}</h3>
                <p className="mt-2 text-sm leading-[1.87] text-black/70">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
