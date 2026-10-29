import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/views/ui/icons/SocialIcons';
import type { FooterModel } from '@/models/domain';

// The domain model carries no explicit "platform" enum for a social link —
// only label/href — so the icon is matched by label text (case-insensitive),
// with a text-initial fallback for a platform this map doesn't recognize.
const SOCIAL_ICON_BY_LABEL: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  x: XIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

/** Certification badges (Figma 267:1555) — static artwork, not CMS-managed. */
const CERTIFICATION_BADGES = [
  { src: '/figma-home/footer/badge-1.png', alt: 'ISO certification' },
  { src: '/figma-home/footer/badge-3.png', alt: 'ISO certification' },
  { src: '/figma-home/footer/badge-2.png', alt: 'MRSI member' },
];

/** Rendered size of each social glyph (Figma 267:1544). */
const SOCIAL_ICON_SIZE: Record<string, string> = {
  facebook: 'size-[22px]',
  x: 'size-[17.6px]',
  twitter: 'size-[17.6px]',
  linkedin: 'size-[16.4px]',
  instagram: 'size-[16.5px]',
};

/** Gradient footer — Figma 267:1522 (1900px: logo/tagline/badges at x=150, three
 * link columns, socials at x=1510, 83px copyright bar). Built as a responsive
 * grid rather than a scaled canvas so type stays at its real size (14px links,
 * 18px headings, 13px copyright) at every width: 1 column on phones, 2 from
 * 640px, brand + 3 columns from 1024px, with the socials joining the row from
 * 1280px. Columns, socials and copyright are driven entirely by
 * GlobalModel.footer. */
export function Footer({ footer }: { footer: FooterModel }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to font-accent text-white">
      {/* Figma 267:1524: the same wallpaper-over-gradient highlight as the service band. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma-home/services-gradient-wallpaper.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
      />
      <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pb-[43px] lg:pt-16 min-[1700px]:px-0">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[minmax(240px,1.3fr)_repeat(3,minmax(0,1fr))] xl:grid-cols-[minmax(240px,333px)_repeat(3,minmax(0,1fr))_auto] xl:gap-x-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <StrapiImage image={footer.logo} sizes="167px" className="h-[120px] w-auto rounded-[50%] object-contain" />
            {footer.tagline && <p className="mt-5 max-w-xs text-[14px] leading-[1.53] lg:max-w-[333px]">{footer.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-[10px] lg:mt-[52px]">
              {CERTIFICATION_BADGES.map((badge) => (
                <span key={badge.src} className="flex size-20 items-center justify-center rounded-full bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={badge.src} alt={badge.alt} className="size-[95%] rounded-full object-contain" />
                </span>
              ))}
            </div>
          </div>
          {footer.columns.map((column) => (
            <div key={column.id} className="min-w-0 lg:pt-3">
              <h3 className="font-accent text-[18px] font-semibold leading-[1.26] text-white">{column.heading}</h3>
              <ul className="mt-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="block text-[14px] leading-[2.2] text-white transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {footer.socialLinks.length > 0 && (
            <div className="sm:col-span-2 lg:col-span-4 lg:pt-3 xl:col-span-1">
              <h3 className="font-accent text-[18px] font-semibold leading-[1.26] text-white">Connect with us</h3>
              <div className="mt-4 flex gap-[7.765px]">
                {footer.socialLinks.map((social) => {
                  const Icon = SOCIAL_ICON_BY_LABEL[social.label.toLowerCase()];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.isExternal ? '_blank' : undefined}
                      rel={social.isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className="flex size-11 items-center justify-center rounded-full bg-footer-social text-white transition-transform hover:scale-105"
                    >
                      {Icon ? (
                        <Icon className={SOCIAL_ICON_SIZE[social.label.toLowerCase()] ?? 'size-4'} aria-hidden="true" />
                      ) : (
                        <span className="text-xs font-semibold">{social.label[0]}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {footer.copyright && (
        <div className="relative bg-[#51223d]/20 px-4 py-5 lg:py-[30px]">
          <p className="text-center text-[13px] font-medium leading-[2] text-white">{footer.copyright}</p>
        </div>
      )}
    </footer>
  );
}
