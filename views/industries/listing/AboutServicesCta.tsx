import Image from 'next/image';
import { Button } from '@/views/ui/Button';
import { SectionHeader } from './shared';

const CTA_LINK = {
  id: 'industries-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

/** "About Our Services" copy + closing CTA — Figma 1384:26772, y11105-
 * 12171. Eyebrow cap-top 11208, 2-line 50/60px title (854px), two body
 * paragraphs (1281px, 16/30.4px @ 80%); the white fade over the last
 * 151px. Then the shared 1740x455 r40 #101723 CTA band at y=11676 (20%
 * people photo, 227px bottom gradient, title cap-top +119, body +186,
 * button +289), 40px above the footer. */
export function AboutServicesCta() {
  return (
    <>
      <section className="bg-white pb-16 pt-16 lg:h-[571px] lg:pb-0 lg:pt-[99.6px]">
        <SectionHeader
          eyebrow="About Our Services"
          title="Comprehensive Research Solutions for Smarter Business Decisions"
          titleMaxWidth="854px"
          bodyMaxWidth="1281px"
          className="px-4 sm:px-6"
          body={
            <>
              <p className="mb-[30.4px]">
                At Unimrkt Research, we provide end-to-end market research services that empower businesses with accurate data, actionable
                insights, and strategic intelligence. From primary data collection and qualitative research to quantitative studies, business
                research, and research support functions, our tailored solutions help organizations understand markets, customers, and emerging
                opportunities.
              </p>
              <p>
                Backed by experienced researchers, advanced methodologies, and global capabilities, we deliver reliable research solutions
                across diverse industries. Whether you&apos;re launching a new product, evaluating market opportunities, or strengthening your
                competitive position, Unimrkt Research provides the insights you need to make confident, data-driven decisions and achieve
                sustainable growth.
              </p>
            </>
          }
        />
      </section>

      <section className="bg-white px-4 pb-10 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1740px]">
          <div className="relative flex min-h-[455px] flex-col items-center overflow-hidden rounded-[40px] bg-[#101723] px-6 pb-16 pt-16 text-center lg:pb-[106px] lg:pt-[108px]">
            <Image
              src="/images/industries/cta-people.jpg"
              alt=""
              width={1838}
              height={1034}
              sizes="1838px"
              className="pointer-events-none absolute left-[-96px] top-[-203px] max-w-none opacity-20"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[227px] rounded-b-[40px] opacity-70"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgba(8,19,32,0) 0%, #081320 63%)' }}
              aria-hidden="true"
            />
            <h2 className="relative font-sans text-[30px] font-semibold capitalize leading-[34px] text-white sm:text-[36px] sm:leading-[41px] lg:text-[50px] lg:leading-[57px] lg:tracking-[-2px]">
              Start Your Research Journey
            </h2>
            <p className="relative mt-[10px] max-w-[819px] font-sans text-[16px] font-medium leading-[33.6px] text-white">
              Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business
              decisions.
            </p>
            <div className="relative mt-9 flex justify-center lg:mt-[47px]">
              <Button link={CTA_LINK} variant="secondary" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
