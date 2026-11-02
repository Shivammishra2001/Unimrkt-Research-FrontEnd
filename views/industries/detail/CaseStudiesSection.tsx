import { Container } from '@/views/ui/Container';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedIndustryDetail } from './fallback';

/** "{Industry} Success Stories" — Figma node 579:6247-6267 (y9295-10045). A
 * 1900x750 #6c2a4a -> #be2c28 band with a 20% luminosity texture; the copy sits
 * at x=170 (eyebrow, 2-line title, 462px body, 272x60 button) and two 450x510
 * white cards (r24, 1px #eee, 6/6/54 shadow) sit at x=762 / x=1253: a 420x390
 * #05101a photo inset 15px and a 20px/1.34 semibold #04264e title.
 * CMS picks win; otherwise the two latest published case studies. */
export function CaseStudiesSection({ caseStudies }: { caseStudies: ResolvedIndustryDetail['caseStudies'] }) {
  if (!caseStudies) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] py-16 text-white sm:py-20 lg:min-h-[750px] lg:py-0">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/images/industries/texture.jpg')] bg-cover bg-center opacity-20 mix-blend-luminosity"
        aria-hidden="true"
      />
      <Container className="relative lg:flex lg:min-h-[750px] lg:items-center">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,640px)_1fr] lg:items-center lg:gap-16">
          <div>
            {caseStudies.eyebrow && (
              <p className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-white">{caseStudies.eyebrow}</p>
            )}
            <h2 className={`mt-3 text-3xl font-semibold capitalize leading-[1.2] text-white sm:text-4xl lg:leading-[1.1] lg:tracking-[-3px] ${caseStudies.heading.length > 34 ? 'lg:text-[34px] lg:leading-[1.15]' : 'lg:text-[50px]'} max-w-2xl`}>
              {caseStudies.heading}
            </h2>
            {caseStudies.body && <p className="mt-6 max-w-[462px] font-sans text-base leading-[25px] text-white/80">{caseStudies.body}</p>}
            {caseStudies.cta && <Button link={caseStudies.cta} className="mt-8" />}
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:ml-auto lg:w-full lg:max-w-[941px] lg:gap-[41px]">
            {caseStudies.items.slice(0, 2).map((study) => (
              <li
                key={study.id}
                className="group flex min-h-[510px] cursor-pointer flex-col rounded-[24px] border border-[#eee] bg-white p-[15px] shadow-[6px_6px_54px_0px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                <div className="relative aspect-[420/390] w-full shrink-0 overflow-hidden rounded-[24px] bg-[#05101a]">
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
                  {study.image && (
                    <StrapiImage
                      image={study.image}
                      sizes="(min-width: 1024px) 420px, 90vw"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  )}
                </div>
                <p className="px-[14px] pb-[22px] pt-[26px] font-sans text-[20px] font-semibold leading-[1.34] text-[#04264e]">{study.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
