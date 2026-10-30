/** /industries' CMS content (Pages > Industries). Every field falls back to
 * the copy the page shipped with (views/industries/defaultContent.json), so
 * the page renders identically before the entry exists or when a field is
 * emptied. */
import { cache } from 'react';
import { getIndustriesPageSettings, StrapiError } from './strapi';
import { normalizeSeo } from './normalize';
import { toImageModel } from './image';
import defaults from '@/views/industries/defaultContent.json';
import type { LinkModel } from '@/models/domain';
import type { StrapiLink, StrapiMedia } from '@/models/strapi';
import type { IndustriesCard, IndustriesPageContent, StrapiIndustriesPage, StrapiIndustriesSections } from '@/models/industriesPage';

type DefaultLink = { label: string; href: string; isExternal: boolean; variant: string };

const text = (value: string | null | undefined, fallback: string): string => (value && value.trim() ? value : fallback);

const paragraphs = (value: string | null | undefined, fallback: string): string[] =>
  text(value, fallback)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

function link(id: string, raw: StrapiLink | null | undefined, fallback: DefaultLink): LinkModel {
  const src = raw && raw.label && raw.href ? raw : fallback;
  return { id, label: src.label, href: src.href, isExternal: src.isExternal, variant: src.variant as LinkModel['variant'] };
}

function list<R, D, O>(raw: R[] | null | undefined, fallback: D[], map: (item: R) => O, mapDefault: (item: D) => O): O[] {
  return raw && raw.length > 0 ? raw.map(map) : fallback.map(mapDefault);
}

const card = (c: { title: string; body: string | null; icon?: StrapiMedia | null }): IndustriesCard => ({
  title: c.title,
  body: c.body ?? '',
  icon: toImageModel(c.icon, c.title),
});
const same = <T,>(c: T): T => c;
const img = (m: StrapiMedia | null | undefined, alt = '') => toImageModel(m, alt);

function head(
  eyebrow: string | null | undefined,
  heading: string | null | undefined,
  body: string | null | undefined,
  def: { eyebrow: string; heading: string; body: string },
) {
  return { eyebrow: text(eyebrow, def.eyebrow), heading: text(heading, def.heading), body: text(body, def.body) };
}

export function normalizeIndustriesPage(raw: StrapiIndustriesPage | null): IndustriesPageContent {
  const d = defaults;
  const blocks = raw?.blocks ?? [];
  // Each section is its own `industries-page.<key>` block; a missing one falls back to the shipped copy.
  const sec = <K extends keyof StrapiIndustriesSections>(key: K): Partial<StrapiIndustriesSections[K]> =>
    (blocks.find((b) => b.__component === `industries-page.${key}`) as Partial<StrapiIndustriesSections[K]> | undefined) ?? {};

  const hero = sec('hero');
  const intro = sec('intro');
  const grid = sec('grid');
  const beyond = sec('beyond');
  const band = sec('band');
  const insights = sec('insights');
  const cases = sec('cases');
  const reach = sec('reach');
  const process = sec('process');
  const testimonials = sec('testimonials');
  const faq = sec('faq');
  const about = sec('about');
  const finalCta = sec('final-cta');

  return {
    hero: {
      eyebrow: text(hero.eyebrow, d.heroEyebrow),
      heading: text(hero.heading, d.heroHeading),
      subheading: text(hero.subheading, d.heroSubheading),
      image: img(hero.image, text(hero.heading, d.heroHeading)),
      primaryCta: link('industries-hero-explore', hero.primaryCta, d.heroPrimaryCta),
      secondaryCta: link('industries-hero-talk', hero.secondaryCta, d.heroSecondaryCta),
    },
    intro: {
      eyebrow: text(intro.eyebrow, d.introEyebrow),
      heading: text(intro.heading, d.introHeading),
      paragraphs: paragraphs(intro.body, d.introBody),
      image: img(intro.image, text(intro.heading, d.introHeading)),
    },
    grid: {
      ...head(grid.eyebrow, grid.heading, grid.body, { eyebrow: d.gridEyebrow, heading: d.gridHeading, body: d.gridBody }),
      backgroundImage: img(grid.backgroundImage),
      cardFallbackImage: img(grid.cardFallbackImage),
    },
    beyond: {
      ...head(beyond.eyebrow, beyond.heading, beyond.body, { eyebrow: d.beyondEyebrow, heading: d.beyondHeading, body: d.beyondBody }),
      cards: list(beyond.cards, d.beyondCards, card, same),
    },
    band: {
      heading: text(band.heading, d.bandHeading),
      body: text(band.body, d.bandBody),
      cta: link('industries-band-cta', band.cta, d.bandCta),
      backgroundImage: img(band.backgroundImage),
      personImage: img(band.personImage, text(band.heading, d.bandHeading)),
    },
    insights: {
      ...head(insights.eyebrow, insights.heading, insights.body, { eyebrow: d.insightsEyebrow, heading: d.insightsHeading, body: d.insightsBody }),
      items: list(insights.items, d.insightsItems, card, same),
      backgroundImage: img(insights.backgroundImage),
      cutoutImage: img(insights.cutoutImage, text(insights.heading, d.insightsHeading)),
    },
    cases: {
      ...head(cases.eyebrow, cases.heading, cases.body, { eyebrow: d.casesEyebrow, heading: d.casesHeading, body: d.casesBody }),
      cards: list(cases.cards, d.caseCards, card, same),
    },
    reach: {
      ...head(reach.eyebrow, reach.heading, reach.body, { eyebrow: d.reachEyebrow, heading: d.reachHeading, body: d.reachBody }),
      stats: list(reach.stats, d.reachStats, (s) => ({ value: s.value, label: s.label, icon: toImageModel(s.icon, s.label) }), same),
    },
    process: {
      ...head(process.eyebrow, process.heading, process.body, { eyebrow: d.processEyebrow, heading: d.processHeading, body: d.processBody }),
      steps: list(process.steps, d.processSteps, card, same),
    },
    testimonials: {
      eyebrow: text(testimonials.eyebrow, d.testimonialsEyebrow),
      heading: text(testimonials.heading, d.testimonialsHeading),
      items: list(
        testimonials.items,
        d.testimonials,
        (t) => ({ title: t.title, quote: t.quote ?? '', name: t.name, role: t.role ?? '' }),
        same,
      ),
    },
    faq: {
      cta: link('industries-faq-cta', faq.cta, d.faqCta),
      heading: text(faq.heading, d.faqHeading),
      items: list(
        faq.items,
        d.faqItems,
        (f) => ({ id: `industries-faq-${f.id}`, question: f.question, answer: f.answer }),
        (f) => ({ id: `industries-faq-${f.question}`, question: f.question, answer: f.answer }),
      ),
    },
    about: {
      eyebrow: text(about.eyebrow, d.aboutEyebrow),
      heading: text(about.heading, d.aboutHeading),
      paragraphs: paragraphs(about.body, d.aboutBody),
    },
    finalCta: {
      heading: text(finalCta.heading, d.finalCtaHeading),
      body: text(finalCta.body, d.finalCtaBody),
      action: link('industries-cta', finalCta.action, d.finalCtaAction),
      image: img(finalCta.image),
    },
    seo: normalizeSeo(raw?.seo, 'Industries'),
  };
}

export const getIndustriesPageContent = cache(async (): Promise<IndustriesPageContent> => {
  try {
    const res = await getIndustriesPageSettings();
    return normalizeIndustriesPage(res.data);
  } catch (err) {
    // Entry not created yet (404): ship the built-in copy. Any other failure
    // (backend down) is surfaced by the page's own industry/blog fetches.
    if (err instanceof StrapiError && err.status === 404) return normalizeIndustriesPage(null);
    throw err;
  }
});
