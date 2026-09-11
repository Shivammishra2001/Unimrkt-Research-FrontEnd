import Image from 'next/image';
import { Container } from '@/views/ui/Container';
import { DetailCardIcon } from '@/views/ui/detail/DetailCardIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "Our Expertise" — Figma node 384:6453-6473 (y2686-3624). Cards
 * (`border-[#e0e0df]`, `rounded-[24px]`, `shadow-blog`'s exact shadow,
 * ghost `0N.` number 66px/opacity-15/`heading` token). CMS-first,
 * template-fallback — always renders, never collapses. The wave-photo
 * band behind the cards is decorative site chrome (not per-industry
 * content), same static asset for every industry. */
export function ExpertiseStrip({ expertise }: { expertise: ResolvedIndustryDetail['expertise'] }) {
  return (
    <section className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
      <Image src="/images/industries/detail/expertise-wave-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[#040112]/70" aria-hidden="true" />
      <Container className="relative">
        <header className="mx-auto max-w-[900px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{expertise.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-white sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {expertise.heading}
          </h2>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {expertise.items.map((item, i) => (
            <div key={item.id} className="flex flex-col justify-between gap-8 rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-blog" style={{ minHeight: '260px' }}>
              <p className="font-sans text-[44px] font-semibold leading-[1.2] tracking-[-1px] text-heading opacity-15 sm:text-[56px]">
                {String(i + 1).padStart(2, '0')}.
              </p>
              <div className="flex flex-col gap-4">
                <DetailCardIcon icon={item.icon} iconIdentifier={item.iconIdentifier} className="size-[60px] text-brand-600" />
                <p className="font-sans text-[22px] font-semibold capitalize leading-[1.3] tracking-[-1px] text-heading">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
