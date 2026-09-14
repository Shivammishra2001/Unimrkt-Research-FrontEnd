import { Container } from '@/views/ui/Container';
import type { ResolvedWorkWithUs } from './fallback';

/** "Join Us" + "Disclaimer : Beware of Fraud" — Figma node 924:23216
 * (y4493-5124). Plain left-aligned text, no cards or images — the only
 * content this node draws here is the application instructions and the
 * fraud-awareness disclaimer. CMS-first, template-fallback — always
 * renders. */
export function JoinUsSection({ joinUs, disclaimer }: { joinUs: ResolvedWorkWithUs['joinUs']; disclaimer: ResolvedWorkWithUs['disclaimer'] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-brand-600">{joinUs.heading}</h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{joinUs.body}</p>

          <h2 className="mt-12 text-2xl font-bold text-brand-600">{disclaimer.heading}</h2>
          <p className="mt-4 text-base leading-[1.9] text-heading/80">{disclaimer.body}</p>
        </div>
      </Container>
    </section>
  );
}
