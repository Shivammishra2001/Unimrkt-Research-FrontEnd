import Image from 'next/image';
import type { TrustLogoModel } from '@/models/industry';

type Logo = TrustLogoModel & { width?: number; height?: number };

/** "Trusted by Global Businesses" — Figma 474:5736 + 474:5753-5767 + 474:5901 (y828-1103, #f9f9f7). 24px SemiBold
 * #02060e heading (cap-top +54), then five 265x119 cards 24px apart from +102 (white @ 80%, 1px #eee, r14), each
 * logo centred at its drawn size. CMS logos when the service has them, else the node's five. */
export function ServiceTrustSection({ heading, logos }: { heading: string; logos: Logo[] }) {
  return (
    <section className="bg-[#f9f9f7] px-4 py-12 sm:px-6 lg:px-8 lg:pb-[54px] lg:pt-[47.8px]">
      <h2 className="text-center font-sans text-[22px] font-semibold capitalize leading-[1.2] text-[#02060e] sm:text-[24px]">{heading}</h2>
      <ul className="mx-auto mt-8 grid w-full max-w-[1421px] grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-[25.4px] lg:grid-cols-5 lg:gap-6">
        {logos.map((logo) => (
          <li key={logo.id} className="flex h-[96px] items-center justify-center rounded-[14px] border border-[#eee] bg-white/80 px-4 sm:h-[119px]">
            {logo.image ? (
              <Image
                src={logo.image.src}
                alt={logo.image.alt || logo.name}
                width={logo.width ?? 161}
                height={logo.height ?? 42}
                className="h-auto max-h-[42px] w-auto max-w-[80%] object-contain"
                style={logo.width ? { width: logo.width } : undefined}
              />
            ) : (
              <span className="font-sans text-sm font-semibold uppercase tracking-wide text-[#02060e]/40">{logo.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
