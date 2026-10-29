import type { ReactNode } from 'react';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { geometry } from '@/views/ui/stage';
import type { ContentModel } from '@/models/domain';
import type { OfficeLocationModel } from '@/models/contactPage';

/** Figma 1794:16824 photos. The homepage design uses these exact shots (the CMS's
 * contact-page photos differ), so they win; the CMS image is the fallback for any
 * office not listed here. */
const OFFICE_PHOTO_FALLBACKS: { match: RegExp; src: string }[] = [
  { match: /india/i, src: '/figma-home/offices/india.jpg' },
  { match: /united states|usa|america/i, src: '/figma-home/offices/usa.jpg' },
  { match: /united kingdom|uk|britain/i, src: '/figma-home/offices/uk.jpg' },
];

const FIELD_LABEL = 'font-nav text-[12px] font-bold uppercase leading-normal tracking-[1.2px] text-[#1e1e1e]';

function OfficeField({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div>
      <div className="flex h-[22px] items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" aria-hidden="true" className="size-[22px] shrink-0" />
        <p className={FIELD_LABEL}>{label}</p>
      </div>
      {/* Figma trims value text to cap height: pull the half-leading (0.365em) back in. */}
      <div className="ml-[26px] mt-1.5 text-[14px] leading-[1.43] text-black [&>p]:-my-[0.365em]">{children}</div>
    </div>
  );
}

/** One office card — Figma 1794:16574: 462x583, radius 24, #eee border, soft shadow. */
function OfficeCard({ office }: { office: OfficeLocationModel }) {
  const figmaPhoto = OFFICE_PHOTO_FALLBACKS.find((f) => f.match.test(office.name))?.src;
  const title = /office$/i.test(office.name.trim()) ? office.name : `${office.name} Office`;
  const phoneLabel = office.phoneLabel?.replace(/:\s*$/, '') || 'Queries';
  return (
    <article className="rounded-blog border border-card-border bg-white p-[10px] shadow-blog lg:aspect-[462/583] lg:w-[24.3158cqw] lg:shrink-0 lg:rounded-[1.2632cqw] lg:p-[0.5263cqw]">
      <div className="relative aspect-[442/274] overflow-hidden rounded-[24px] bg-slate-100 lg:rounded-[1.2632cqw]">
        {figmaPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={figmaPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : office.image ? (
          <StrapiImage image={office.image} sizes="(min-width: 1024px) 24vw, 100vw" fill className="object-cover" />
        ) : null}
      </div>
      <div className="px-5 pb-5 pt-[18px] lg:px-[1.1579cqw] lg:pb-0 lg:pt-[1.0526cqw] lg:text-[length:var(--fs)]" style={geometry({ fs: 16 })}>
        <h3 className="font-sans text-[20px] font-semibold leading-[1.34] text-ink2">{title}</h3>
        <div className="mt-[27.5px] flex flex-col gap-5">
          <OfficeField icon="/figma-home/offices/icon-location.svg" label="Location">
            <p className="text-[13px] [&]:!my-0 [&]:h-[34px]">{office.address}</p>
          </OfficeField>
          <OfficeField icon="/figma-home/offices/icon-sms.svg" label="Email">
            <p>{office.email}</p>
          </OfficeField>
          {office.phone && (
            <OfficeField icon="/figma-home/offices/icon-call.svg" label={phoneLabel}>
              <p>{office.phone}</p>
            </OfficeField>
          )}
        </div>
      </div>
    </article>
  );
}

/** blocks.content — heading + body, optional image. `mediaAlignment:
 * 'none'` skips media entirely; `'left'`/`'right'` puts it beside the text
 * in a two-column grid; `'below'` runs the image full-width underneath.
 * A `'below'` block that carries a contact email AND has offices to show is
 * Figma 1794:16813 ("Unlock the Power of Marketplaces"): a centered heading
 * (last word in brand red) over three office cards and a "email us" row,
 * on the wave texture — a 1900x1070 canvas scaled from lg up. */
export function ContentView({
  block,
  offices = [],
}: {
  block: ContentModel;
  index: number;
  offices?: OfficeLocationModel[];
}) {
  const isBelow = block.mediaAlignment === 'below';
  const hasSideMedia = (block.mediaAlignment === 'left' || block.mediaAlignment === 'right') && !!block.media;
  const mediaFirst = block.mediaAlignment === 'left';

  if (isBelow && block.contactEmail && offices.length > 0) {
    // "Unlock the Power" / "of Marketplaces" — break before the last two words, last word red.
    const words = (block.heading ?? '').split(/\s+/).filter(Boolean);
    const last = words.pop() ?? '';
    const prev = words.pop();
    return (
      <Section
        theme={block.theme}
        anchorId={block.anchorId}
        className="relative overflow-hidden lg:!py-0 lg:[container-type:inline-size]"
      >
        {/* Figma 1794:16813 (frame y 5417, 1899x1070): the wave texture (waves-texture.png — the
            exact Figma export) is two 3222x1410 copies at 50% opacity clipped to the frame. Image
            94 sits at y 5049, i.e. 367.85px ABOVE the frame top, so the waves run from the very top
            edge down to y 1043; image 95 starts at y 1044 and only fills the last 26px. From lg up
            both are sized/offset in cqw so the waves scale with the section; below lg a single
            cover layer fills the taller stacked section. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[url('/figma-home/waves-texture.png')] bg-cover bg-center opacity-50 lg:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma-home/waves-texture.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%+0.5558cqw)] top-[-19.3606cqw] z-0 hidden h-[74.2503cqw] w-[169.5829cqw] max-w-none -translate-x-1/2 object-cover opacity-50 lg:block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma-home/waves-texture.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%+0.5558cqw)] top-[54.9474cqw] z-0 hidden h-[74.2503cqw] w-[169.5829cqw] max-w-none -translate-x-1/2 object-cover opacity-50 lg:block"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:h-[56.3158cqw] lg:max-w-none lg:px-0">
          <div
            className="text-center lg:absolute lg:left-0 lg:right-0 lg:top-[var(--t)]"
            style={geometry({ t: 100.5 })}
          >
            {block.heading && (
              <Heading as="h2" size="h2" className="lg:!tracking-[-1px]">
                {words.length > 0 && <>{words.join(' ')}<br /></>}
                {prev && <>{prev} </>}
                <span className="text-brand-600">{last}</span>
              </Heading>
            )}
            <Prose className="mt-2 text-heading lg:mt-[7.4px] lg:whitespace-nowrap">{block.body}</Prose>
          </div>
          <div
            className="mt-10 flex flex-col gap-6 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:mt-0 lg:flex-row lg:gap-[1.9474cqw]"
            style={geometry({ l: 220, t: 306 })}
          >
            {offices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </div>
          {block.contactPrompt && (
            <p
              className="mt-10 flex flex-wrap items-center justify-center gap-[14px] text-center text-base leading-[1.9] lg:absolute lg:left-0 lg:right-0 lg:top-[var(--t)] lg:mt-0"
              style={geometry({ t: 937 })}
            >
              <span className="opacity-80">{block.contactPrompt}</span>
              <a
                href={`mailto:${block.contactEmail}`}
                className="inline-flex h-[43px] items-center rounded-[7px] border border-[rgba(211,100,74,0.1)] bg-[rgba(106,27,9,0.06)] px-[23px] font-sans text-[13px] font-bold uppercase leading-[1.2] tracking-[3px] text-brand-600"
              >
                {block.contactEmail}
              </a>
            </p>
          )}
        </div>
      </Section>
    );
  }

  if (block.mediaAlignment === 'none' && block.heading) {
    // Figma 267:1257 ("Global Research, Local Understanding"): a #f7f7f4 band, a
    // centered heading whose first clause is brand red, and the body as
    // centered paragraphs (blank line between), 1299px wide.
    const comma = block.heading.indexOf(',');
    const lead = comma >= 0 ? block.heading.slice(0, comma + 1) : '';
    const rest = comma >= 0 ? block.heading.slice(comma + 1) : block.heading;
    const paragraphs = block.body.split(/\n\s*\n/).filter(Boolean);
    return (
      <Section
        theme={block.theme}
        anchorId={block.anchorId}
        className="!bg-[#f7f7f4] lg:min-h-[550px] lg:!pb-0 lg:!pt-[65.5px]"
      >
        <Container className="text-center">
          <Heading as="h2" size="h2">
            {lead && <span className="text-brand-600">{lead}</span>}
            {rest}
          </Heading>
          <div className="mx-auto mt-[23px] max-w-[1299px]">
            {paragraphs.map((text, i) => (
              <Prose key={i} className={`text-heading ${i > 0 ? 'mt-[30.4px]' : ''}`}>
                {text}
              </Prose>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className={hasSideMedia ? 'grid items-center gap-10 lg:grid-cols-2' : 'mx-auto max-w-2xl text-center'}>
          {hasSideMedia && mediaFirst && block.media && (
            <StrapiImage
              image={block.media}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full rounded-2xl object-cover"
            />
          )}
          <div>
            {block.heading && (
              <Heading as="h2" size="h2">
                {block.heading}
              </Heading>
            )}
            <Prose className="mt-6">{block.body}</Prose>
          </div>
          {hasSideMedia && !mediaFirst && block.media && (
            <StrapiImage
              image={block.media}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full rounded-2xl object-cover"
            />
          )}
        </div>
        {isBelow && block.media && (
          <StrapiImage
            image={block.media}
            sizes="100vw"
            className="mx-auto mt-10 w-full max-w-5xl object-contain"
          />
        )}
        {block.contactPrompt && block.contactEmail && (
          <p className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-center text-sm opacity-80">
            <span>{block.contactPrompt}</span>
            <a
              href={`mailto:${block.contactEmail}`}
              className="rounded-btn border border-slate-200 px-5 py-2 font-semibold text-brand-600 hover:bg-slate-50"
            >
              {block.contactEmail}
            </a>
          </p>
        )}
      </Container>
    </Section>
  );
}
