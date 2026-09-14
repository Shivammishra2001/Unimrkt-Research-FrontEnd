import { Container } from '@/views/ui/Container';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ResolvedContact } from './fallback';

/** "Work With unimrkt" — Figma node 637:10433 (y3859-4314). A distinct
 * careers-themed bottom band, NOT the sitewide "Start Your Research
 * Journey" BlogBottomCta reused everywhere else — different copy,
 * different CTA ("Apply Now" -> /work-with-us), same dark
 * rounded-[40px] photo-band shell. CMS-first, template-fallback —
 * always renders. */
export function WorkWithUsSection({ workWithUs }: { workWithUs: ResolvedContact['workWithUs'] }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] bg-[#101723] px-6 py-16 text-center sm:px-12 lg:py-20">
          {workWithUs.image && (
            <StrapiImage image={workWithUs.image} sizes="(min-width: 1024px) 1740px, 100vw" fill className="object-cover opacity-20" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#081320] to-transparent opacity-70" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="capitalize text-3xl font-semibold leading-[1.14] text-white sm:text-4xl lg:text-[50px] lg:tracking-[-2px]">
              {workWithUs.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-[2.1] text-white">{workWithUs.body}</p>
            <div className="mt-8 flex justify-center">
              <Button link={workWithUs.cta} variant="secondary" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
