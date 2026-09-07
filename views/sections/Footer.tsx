import type { ComponentType, SVGProps } from 'react';
import Link from 'next/link';
import { Container } from '@/views/ui/Container';
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

/** Gradient footer with columns, socials, copyright bar — driven entirely
 * by GlobalModel.footer. */
export function Footer({ footer }: { footer: FooterModel }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to font-accent text-white">
      <Container className="relative py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footer.socialLinks.length > 0 && (
            <div className="flex gap-3 lg:col-span-1">
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
                      <Icon className="size-4" aria-hidden="true" />
                    ) : (
                      <span className="text-xs font-semibold">{social.label[0]}</span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
          {footer.columns.map((column) => (
            <div key={column.id}>
              <h3 className="font-accent text-sm font-semibold uppercase tracking-[0.06em] text-white/70">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      {footer.copyright && (
        <div className="relative border-t border-white/10 bg-black/10 py-5">
          <p className="text-center text-[13px] text-white/90">{footer.copyright}</p>
        </div>
      )}
    </footer>
  );
}
