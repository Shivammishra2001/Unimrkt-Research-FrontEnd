import Link from 'next/link';
import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { SendArrowIcon } from '@/views/ui/icons/SendArrowIcon';
import type { ResolvedIndustryDetail } from './fallback';

/** "{Industry} Success Stories" — Figma node 579:6247-6267 (y9295, 1900x750). A
 * #6c2a4a -> #be2c28 band with a 20% luminosity texture. Copy column at x=170: eyebrow
 * (Inter SemiBold 18, cap-top y219), 2-line 52px Inter title (y255), 462px 14px body at
 * 90% (y387) and a 272x60 white button (y486). Two 450x510 cards (white, 1px #eee, r24,
 * 6/6/54 shadow) at x=762 / x=1253, y=122: a 420x390 photo inset 15/17px and a
 * 20px/1.34 semibold #04264e title whose cap-top sits at y=433.
 * CMS picks win; otherwise the two latest published case studies. */
// Summary shown on hover when the CMS item has none (the two Automotives cards).
const FALLBACK_SUMMARY: Record<string, string> = {
  'vehicle product acceptance study through car clinics': 'Understanding customer preferences before product launch.',
  'future mobility & car design preference research': 'Capturing consumer insights for next-generation vehicle development.',
};

export function CaseStudiesSection({ caseStudies }: { caseStudies: ResolvedIndustryDetail['caseStudies'] }) {
  if (!caseStudies) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] py-16 text-white sm:py-20 lg:min-h-[750px] lg:pb-[118px] lg:pt-[122px]">
      {/* Figma 579:6251 — greyscale wallpaper 2419x1361 at (-259, -306), mirrored, 20% luminosity. */}
      <div
        className="pointer-events-none absolute -left-[13.63%] top-[-40.9%] h-[181.9%] w-[127.3%] -scale-x-100 bg-[url('/images/industries/case-studies-wallpaper.jpg')] bg-[length:100%_100%] opacity-[0.12] mix-blend-luminosity"
        aria-hidden="true"
      />
      <Container className="relative lg:!max-w-[1560px] min-[1700px]:px-0">
        <div className="grid gap-12 lg:max-w-[1533px] lg:grid-cols-[minmax(0,551px)_minmax(0,450px)_minmax(0,450px)] lg:items-start lg:gap-x-[41px] lg:gap-y-0">
          <div className="lg:pt-[97px]">
            {caseStudies.eyebrow && (
              <p className="font-nav text-[18px] font-semibold uppercase leading-[1.1] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                {caseStudies.eyebrow}
              </p>
            )}
            <h2
              className={`mt-4 max-w-[400px] font-nav font-semibold capitalize leading-[1.2] tracking-[-1px] text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:mt-[23px] ${
                caseStudies.heading.length > 34 ? 'text-3xl lg:text-[38px] lg:leading-[1.2]' : 'text-3xl sm:text-4xl lg:text-[52px] lg:leading-[1.2]'
              }`}
            >
              {caseStudies.heading}
            </h2>
            {caseStudies.body && (
              <p className="mt-6 max-w-[462px] font-sans text-[14px] font-normal leading-[1.4] text-white/90 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] lg:mt-[32px]">
                {caseStudies.body}
              </p>
            )}
            {caseStudies.cta && (
              <Link
                href={caseStudies.cta.href}
                target={caseStudies.cta.isExternal ? '_blank' : undefined}
                rel={caseStudies.cta.isExternal ? 'noopener noreferrer' : undefined}
                className="mt-8 inline-flex h-[60px] cursor-pointer items-center justify-center gap-1 rounded-[4px] border border-white bg-white px-10 font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.78px] text-[#a3282a] lg:mt-[49px]"
              >
                {caseStudies.cta.label}
                <SendArrowIcon className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {caseStudies.items.slice(0, 2).map((study) => {
            const summary = study.description || FALLBACK_SUMMARY[study.title.trim().toLowerCase()];
            const hasMore = Boolean(summary || study.href);
            const body = (
              <>
                {/* Photo: Figma 420x390; on hover it slides up to 270px to make room for the summary + link. */}
                <div className={`relative aspect-[420/390] w-full shrink-0 overflow-hidden rounded-[24px] bg-[#05101a] transition-[height] duration-300 ease-in-out motion-reduce:transition-none lg:aspect-auto lg:h-[390px] ${hasMore ? 'lg:group-hover:h-[270px] lg:group-focus-visible:h-[270px]' : ''}`}>
                  {study.image && (
                    <StrapiImage image={study.image} sizes="(min-width: 1024px) 420px, 90vw" fill className="object-cover" />
                  )}
                </div>
                <p className="mt-[26px] max-w-[400px] px-4 font-sans text-[20px] font-semibold leading-[1.34] text-[#04264e] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {study.title}
                </p>
                {hasMore && (
                  <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] delay-75 duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100 motion-reduce:transition-none max-lg:hidden">
                    <div className="min-h-0 overflow-hidden px-4">
                      {summary && (
                        <p className="mt-3 line-clamp-3 font-sans text-[13px] leading-[1.6] text-[#04264e]/70">{summary}</p>
                      )}
                      {study.href && (
                        <span className="mt-3 inline-flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[#A6192E]">
                          EXPLORE
                          <SendArrowIcon className="size-3" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </>
            );
            const cardClass =
              'group flex min-h-[510px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#eee] bg-white px-[14px] pb-[35px] pt-4 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-shadow duration-300 ease-out hover:shadow-xl focus-visible:shadow-xl focus-visible:outline-none lg:h-[510px]';
            return study.href ? (
              <Link key={study.id} href={study.href} className={cardClass}>
                {body}
              </Link>
            ) : (
              <div key={study.id} className={cardClass}>
                {body}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
