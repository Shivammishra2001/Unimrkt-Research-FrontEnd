import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/views/ui/icons/SocialIcons';
import { geometry } from '@/views/ui/stage';
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

/** Rendered size of each social glyph (Figma 267:1544), px at the 1900 canvas -> em at lg. */
const SOCIAL_ICON_SIZE: Record<string, string> = {
  facebook: 'size-[22px] lg:size-[1.5714em]',
  x: 'size-[17.6px] lg:size-[1.2571em]',
  twitter: 'size-[17.6px] lg:size-[1.2571em]',
  linkedin: 'size-[16.4px] lg:size-[1.1714em]',
  instagram: 'size-[16.5px] lg:size-[1.1786em]',
};

/** Left edge of each link column on the 1900px canvas (Figma 267:1531/1535/1539). */
const COLUMN_LEFT = [607, 904, 1262] as const;

/** Gradient footer — Figma 267:1522, a 1900x529 canvas scaled with container
 * units from lg up (views/ui/stage.ts), stacked below. Columns, socials and
 * copyright are driven entirely by GlobalModel.footer. */
export function Footer({ footer }: { footer: FooterModel }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to font-accent text-white lg:[container-type:inline-size]">
      {/* Figma 267:1524: the same wallpaper-over-gradient highlight as the service band. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma-home/services-gradient-wallpaper.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
      />
      <div className="relative px-4 pt-14 sm:px-6 lg:h-[27.8421cqw] lg:p-0">
        <div className="grid gap-10 sm:grid-cols-2 lg:block">
          <div className="lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]" style={geometry({ l: 150, t: 64 })}>
            <StrapiImage image={footer.logo} sizes="167px" className="h-[120px] w-auto rounded-[50%] object-contain" />
          </div>
          {footer.tagline && (
            <p
              className="max-w-xs text-[14px] leading-[1.53] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none lg:text-[length:var(--fs)]"
              style={geometry({ l: 150, t: 205, w: 333, fs: 14 })}
            >
              {footer.tagline}
            </p>
          )}
          {footer.columns.map((column, i) => (
            <div
              key={column.id}
              className="lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:text-[length:var(--fs)]"
              style={geometry({ l: COLUMN_LEFT[i] ?? COLUMN_LEFT[COLUMN_LEFT.length - 1], t: 76, fs: 14 })}
            >
              <h3 className="font-accent text-[18px] font-semibold leading-[1.26] text-white lg:text-[1.2857em]">
                {column.heading}
              </h3>
              <ul className="mt-3 lg:mt-[0.9143em]">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="block text-[14px] leading-[2.2] text-white transition-colors hover:text-white/80 lg:text-[1em]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {footer.socialLinks.length > 0 && (
            <div
              className="lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:text-[length:var(--fs)]"
              style={geometry({ l: 1510, t: 76, fs: 14 })}
            >
              <h3 className="font-accent text-[18px] font-semibold leading-[1.26] text-white lg:text-[1.2857em]">
                Connect with us
              </h3>
              <div className="mt-4 flex gap-[7.765px] lg:mt-[1.6em] lg:gap-[0.5546em]">
                {footer.socialLinks.map((social) => {
                  const Icon = SOCIAL_ICON_BY_LABEL[social.label.toLowerCase()];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.isExternal ? '_blank' : undefined}
                      rel={social.isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className="flex size-11 items-center justify-center rounded-full bg-footer-social text-white transition-transform hover:scale-105 lg:size-[3.1429em]"
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
          <div
            className="flex gap-[10px] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:gap-[0.5263cqw]"
            style={geometry({ l: 150, t: 298 })}
          >
            {CERTIFICATION_BADGES.map((badge) => (
              <span
                key={badge.src}
                className="flex size-20 items-center justify-center rounded-full bg-white lg:size-[4.2105cqw]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={badge.src} alt={badge.alt} className="size-[95%] rounded-full object-contain" />
              </span>
            ))}
          </div>
        </div>
      </div>
      {footer.copyright && (
        <div className="relative mt-10 bg-[#51223d]/20 py-5 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:flex lg:h-[4.3684cqw] lg:items-center lg:justify-center lg:py-0">
          <p className="text-center text-[13px] font-medium leading-[2] text-white lg:text-[0.6842cqw]">
            {footer.copyright}
          </p>
        </div>
      )}
    </footer>
  );
}
