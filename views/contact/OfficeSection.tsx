import Image from 'next/image';
import { Container } from '@/views/ui/Container';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { LocationPinIcon } from '@/views/ui/icons/LocationPinIcon';
import type { ResolvedContact } from './fallback';

/** vuesax/linear/sms — plain envelope outline, matches the icon set
 * already used elsewhere on the site for an email row. */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** vuesax/linear/call — plain handset outline. */
function CallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M9.5 12.5c1.5 3 3.5 5 6.5 6.5l2-2c.4-.4 1-.5 1.5-.3 1 .3 2 .5 3 .5.6 0 1 .4 1 1v3c0 .6-.4 1-1 1C11 22.2 2.8 14 2.8 3c0-.6.4-1 1-1h3c.6 0 1 .4 1 1 0 1 .2 2 .5 3 .2.5 0 1-.3 1.4l-2 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OfficeCard({ office }: { office: ResolvedContact['office']['items'][number] }) {
  if (office.featured) {
    return (
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#6c2a4a] to-[#be2c28] p-8 text-white">
        {office.image && (
          <StrapiImage image={office.image} sizes="645px" fill className="object-cover opacity-[0.16] mix-blend-luminosity" />
        )}
        <div className="relative flex flex-col gap-[22px]">
          <p className="text-[22px] font-semibold leading-[1.34] tracking-[-1px] text-white">{office.name}</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3.5">
              <LocationPinIcon className="size-6 shrink-0 text-white" />
              <p className="text-base leading-[1.4] text-white">{office.address}</p>
            </div>
            <div className="flex items-center gap-3.5">
              <MailIcon className="size-6 shrink-0 text-white" />
              <p className="text-base leading-[1.4] text-white">{office.email}</p>
            </div>
            <div className="flex items-center gap-3.5">
              <CallIcon className="size-6 shrink-0 text-white" />
              <p className="text-base leading-[1.4] text-white">
                {office.phoneLabel && <span className="font-semibold">{office.phoneLabel} </span>}
                {office.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-blog">
      <p className="text-[22px] font-semibold leading-[1.34] tracking-[-1px] text-heading">{office.name}</p>
      <div className="mt-[22px] flex flex-col gap-4">
        <div className="flex items-start gap-3.5">
          <LocationPinIcon className="size-6 shrink-0 text-brand-600" />
          <p className="text-base leading-[1.4] text-heading/80">{office.address}</p>
        </div>
        <div className="flex items-center gap-3.5">
          <MailIcon className="size-6 shrink-0 text-brand-600" />
          <p className="text-base leading-[1.4] text-heading/80">{office.email}</p>
        </div>
        <div className="flex items-center gap-3.5">
          <CallIcon className="size-6 shrink-0 text-brand-600" />
          <p className="text-base leading-[1.4] text-heading/80">
            {office.phoneLabel && <span className="font-semibold">{office.phoneLabel} </span>}
            {office.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * "Our Presence" — Figma node 637:10433 (y1225-2344). Office cards
 * stacked left (India featured in a gradient card, US/UK plain white
 * cards); the node's right-hand decoration is an intricate multi-hundred
 * -vector abstract India street map with a single pin — simplified here
 * to a pin + label on the node's own faint watermark texture, same
 * "don't pixel-trace an extremely complex decorative vector illustration"
 * precedent as GalleryView.tsx's wave-texture substitution. CMS-first,
 * template-fallback — always renders. */
export function OfficeSection({ office }: { office: ResolvedContact['office'] }) {
  const featuredOffice = office.items.find((o) => o.featured) ?? office.items[0];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <Image src="/images/contact/contact-presence-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">{office.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-1px]">
            {office.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {office.items.map((item) => (
              <OfficeCard key={item.id} office={item} />
            ))}
          </div>
          <div className="hidden min-h-[400px] items-center justify-center rounded-[24px] border border-[#e0e0df] bg-[#fbfbfb] lg:flex">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
                <LocationPinIcon className="size-7" />
              </span>
              {featuredOffice && <p className="text-sm font-semibold text-heading">{featuredOffice.name}</p>}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
