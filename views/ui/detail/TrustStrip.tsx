import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { MedalIcon } from '@/views/ui/icons/MedalIcon';
import type { ImageModel } from '@/models/domain';

export interface TrustStripLogo {
  id: string;
  name: string;
  image?: ImageModel;
}

/** "Trusted by {Title} Leaders" / "Trusted by Global Businesses" — same
 * card shell on both /industries/[slug] (Figma 384:6206/6375) and
 * /services/[slug] (Figma 474:5736/5901): `bg-white/80`,
 * `rounded-[14px]`, border `#eee`. CMS-first, template-fallback: without
 * real seeded logos, renders the same card shell with a generic
 * "Industry Partner"-style placeholder (disclosed, not a real brand)
 * rather than collapsing. */
export function TrustStrip({ heading, logos }: { heading: string; logos: TrustStripLogo[] }) {
  return (
    <section className="bg-[#f9f9f7] py-16 sm:py-20">
      <Container>
        <h2 className="text-center font-sans text-2xl font-semibold leading-[1.2] text-heading sm:text-[28px]">
          {heading}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) => (
            <div key={logo.id} className="flex h-[119px] items-center justify-center gap-2 rounded-[14px] border border-[#eee] bg-white/80 px-4">
              {logo.image ? (
                <StrapiImage image={logo.image} sizes="180px" className="max-h-[77%] w-auto object-contain" />
              ) : (
                <>
                  <MedalIcon className="size-6 text-heading/25" aria-hidden="true" />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wide text-heading/25">{logo.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
