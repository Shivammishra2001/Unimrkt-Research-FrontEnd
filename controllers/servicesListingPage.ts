/** /services' CMS content (Pages > Services). Every field falls back to the Figma copy the page shipped with
 * (SERVICES_LISTING_FALLBACK in views/services/listing/content.ts), so the page renders identically before the entry
 * exists or when a field is emptied. Same pattern as controllers/industriesPage.ts. */
import { cache } from 'react';
import { getServicesListingPageSettings, StrapiError } from './strapi';
import { isInactiveError } from './errors';
import { normalizeSeo } from './normalize';
import { toImageModel } from './image';
import { SERVICES_LISTING_FALLBACK as F, type ServicesListingContent } from '@/views/services/listing/content';
import type { LinkModel } from '@/models/domain';
import type { StrapiLink } from '@/models/strapi';
import type { StrapiServicesListingPage, StrapiServicesSections } from '@/models/servicesListingPage';

const text = (value: string | null | undefined, fallback: string): string => (value && value.trim() ? value : fallback);

const paragraphs = (value: string | null | undefined, fallback: string[]): string[] =>
  value && value.trim()
    ? value
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : fallback;

/** A CMS link counts once it has both a label and an href; otherwise the shipped one (keeping its id). */
const link = (raw: StrapiLink | null | undefined, fallback: LinkModel): LinkModel =>
  raw && raw.label && raw.href ? { id: fallback.id, label: raw.label, href: raw.href, isExternal: !!raw.isExternal, variant: raw.variant ?? fallback.variant } : fallback;

export function normalizeServicesListingPage(raw: StrapiServicesListingPage | null): ServicesListingContent {
  const blocks = raw?.blocks ?? [];
  const sec = <K extends keyof StrapiServicesSections>(key: K): Partial<StrapiServicesSections[K]> =>
    (blocks.find((b) => b.__component === `services-page.${key}`) as Partial<StrapiServicesSections[K]> | undefined) ?? {};

  const hero = sec('hero');
  const intro = sec('intro');
  const showcase = sec('showcase');
  const why = sec('why');
  const process = sec('process');
  const band = sec('band');
  const coverage = sec('coverage');
  const industries = sec('industries');
  const caseBand = sec('case-band');
  const testimonials = sec('testimonials');
  const faq = sec('faq');
  const about = sec('about');
  const finalCta = sec('final-cta');

  const [projects, clients] = F.caseBand.stats;

  return {
    hero: {
      eyebrow: text(hero.eyebrow, F.hero.eyebrow),
      heading: text(hero.heading, F.hero.heading),
      subheading: text(hero.subheading, F.hero.subheading),
      image: toImageModel(hero.image, text(hero.heading, F.hero.heading)),
      actions: [link(hero.primaryCta, F.hero.actions[0]), link(hero.secondaryCta, F.hero.actions[1])],
    },
    intro: {
      eyebrow: text(intro.eyebrow, F.intro.eyebrow),
      heading: text(intro.heading, F.intro.heading),
      paragraphs: paragraphs(intro.body, F.intro.paragraphs),
      image: toImageModel(intro.image, text(intro.heading, F.intro.heading)),
    },
    showcase: {
      eyebrow: text(showcase.eyebrow, F.showcase.eyebrow),
      heading: text(showcase.heading, F.showcase.heading),
      body: text(showcase.body, F.showcase.body),
    },
    why: {
      heading: text(why.heading, F.why.heading),
      body: text(why.body, F.why.body),
      // The built-in icon follows the card's position; an uploaded icon replaces it.
      stats: why.stats?.length
        ? why.stats.map((s, i) => ({ id: `why-${s.id ?? i}`, value: s.value, label: s.label, iconIdentifier: F.why.stats[i % F.why.stats.length].iconIdentifier, icon: toImageModel(s.icon, s.label) }))
        : F.why.stats,
    },
    process: {
      eyebrow: text(process.eyebrow, F.process.eyebrow),
      heading: text(process.heading, F.process.heading),
      body: text(process.body, F.process.body),
      steps: process.steps?.length ? process.steps.map((s) => ({ title: s.title, body: s.body ?? '', icon: toImageModel(s.icon, s.title) })) : F.process.steps,
    },
    band: {
      heading: text(band.heading, F.band.heading),
      body: text(band.body, F.band.body),
      cta: link(band.cta, F.band.cta),
      personImage: toImageModel(band.personImage, ''),
    },
    coverage: {
      eyebrow: text(coverage.eyebrow, F.coverage.eyebrow),
      heading: text(coverage.heading, F.coverage.heading),
      body: text(coverage.body, F.coverage.body),
      cards: coverage.cards?.length
        ? coverage.cards.map((c, i) => ({ title: c.title, body: c.body ?? '', icon: F.coverage.cards[i % F.coverage.cards.length].icon, iconImage: toImageModel(c.icon, c.title) }))
        : F.coverage.cards,
    },
    industries: {
      eyebrow: text(industries.eyebrow, F.industries.eyebrow),
      heading: text(industries.heading, F.industries.heading),
      body: text(industries.body, F.industries.body),
    },
    caseBand: {
      eyebrow: text(caseBand.eyebrow, F.caseBand.eyebrow),
      heading: text(caseBand.heading, F.caseBand.heading),
      body: text(caseBand.body, F.caseBand.body),
      cta: link(caseBand.cta, F.caseBand.cta),
      stats: [
        { value: text(caseBand.projectsValue, projects.value), label: text(caseBand.projectsLabel, projects.label), caption: text(caseBand.projectsCaption, projects.caption ?? '') },
        { value: text(caseBand.clientsValue, clients.value), label: text(caseBand.clientsLabel, clients.label) },
      ],
      personImage: toImageModel(caseBand.personImage, ''),
      chartImage: toImageModel(caseBand.chartImage, ''),
    },
    testimonials: {
      eyebrow: text(testimonials.eyebrow, F.testimonials.eyebrow),
      heading: text(testimonials.heading, F.testimonials.heading),
    },
    faq: {
      cta: link(faq.cta, F.faq.cta),
      heading: text(faq.heading, F.faq.heading),
      items: faq.items?.length ? faq.items.map((f) => ({ id: `services-faq-${f.id}`, question: f.question, answer: f.answer })) : F.faq.items,
    },
    about: {
      eyebrow: text(about.eyebrow, F.about.eyebrow),
      heading: text(about.heading, F.about.heading),
      paragraphs: paragraphs(about.body, F.about.paragraphs),
    },
    finalCta: {
      heading: text(finalCta.heading, F.finalCta.heading),
      body: text(finalCta.body, F.finalCta.body),
      action: link(finalCta.action, F.finalCta.action),
      image: toImageModel(finalCta.image, ''),
    },
    seo: normalizeSeo(raw?.seo, 'Services'),
  };
}

export const getServicesListingContent = cache(async (): Promise<ServicesListingContent> => {
  try {
    const res = await getServicesListingPageSettings();
    return normalizeServicesListingPage(res.data);
  } catch (err) {
    // Entry not created yet (404): ship the built-in copy. Any other failure (backend down) is surfaced by the
    // page's own category fetch.
    if (err instanceof StrapiError && err.status === 404 && !isInactiveError(err)) return normalizeServicesListingPage(null);
    throw err;
  }
});
