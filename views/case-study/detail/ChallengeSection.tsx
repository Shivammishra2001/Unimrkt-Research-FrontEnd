import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedCaseStudyDetail } from './fallback';

/** "The Challenge" — Figma node 1107:49842 (y1398-2056). Circular photo
 * (pale-pink ring behind a white circle) + eyebrow/heading/body/
 * "Our client needed to understand:" label/6-item bullet list/closing
 * paragraph. CMS-first, template-fallback — always renders. */
export function ChallengeSection({ challenge, photoAlt }: { challenge: ResolvedCaseStudyDetail['challenge']; photoAlt: string }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-[524px] shrink-0 rounded-full bg-[#fbeae9]">
            <div className="absolute inset-[4.5%] overflow-hidden rounded-full bg-white">
              {challenge.photo && <StrapiImage image={{ ...challenge.photo, alt: photoAlt }} sizes="(min-width: 1024px) 40vw, 90vw" fill className="object-cover" />}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{challenge.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[38px] lg:tracking-[-1px]">{challenge.heading}</h2>
            <p className="mt-4 text-base leading-[1.9] text-heading/80">{challenge.body}</p>

            <p className="mt-6 font-sans text-base text-heading/90">{challenge.needsLabel}</p>
            <ul className="mt-2 flex flex-col gap-2">
              {challenge.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-base font-semibold leading-[1.9] text-heading/90">
                  <span className="mt-3 size-2.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-base leading-[1.9] text-heading/80">{challenge.closing}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
