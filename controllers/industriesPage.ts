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
import type { IndustriesCard, IndustriesPageContent, StrapiIndustriesPage } from '@/models/industriesPage';

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
  const r: Partial<StrapiIndustriesPage> = raw ?? {};

  return {
    hero: {
      eyebrow: text(r.heroEyebrow, d.heroEyebrow),
      heading: text(r.heroHeading, d.heroHeading),
      subheading: text(r.heroSubheading, d.heroSubheading),
      image: img(r.heroImage, text(r.heroHeading, d.heroHeading)),
      primaryCta: link('industries-hero-explore', r.heroPrimaryCta, d.heroPrimaryCta),
      secondaryCta: link('industries-hero-talk', r.heroSecondaryCta, d.heroSecondaryCta),
    },
    intro: {
      eyebrow: text(r.introEyebrow, d.introEyebrow),
      heading: text(r.introHeading, d.introHeading),
      paragraphs: paragraphs(r.introBody, d.introBody),
      image: img(r.introImage, text(r.introHeading, d.introHeading)),
    },
    grid: {
      ...head(r.gridEyebrow, r.gridHeading, r.gridBody, { eyebrow: d.gridEyebrow, heading: d.gridHeading, body: d.gridBody }),
      backgroundImage: img(r.gridBackgroundImage),
      cardFallbackImage: img(r.gridCardFallbackImage),
    },
    beyond: {
      ...head(r.beyondEyebrow, r.beyondHeading, r.beyondBody, { eyebrow: d.beyondEyebrow, heading: d.beyondHeading, body: d.beyondBody }),
      cards: list(r.beyondCards, d.beyondCards, card, same),
    },
    band: {
      heading: text(r.bandHeading, d.bandHeading),
      body: text(r.bandBody, d.bandBody),
      cta: link('industries-band-cta', r.bandCta, d.bandCta),
      backgroundImage: img(r.bandBackgroundImage),
      personImage: img(r.bandPersonImage, text(r.bandHeading, d.bandHeading)),
    },
    insights: {
      ...head(r.insightsEyebrow, r.insightsHeading, r.insightsBody, { eyebrow: d.insightsEyebrow, heading: d.insightsHeading, body: d.insightsBody }),
      items: list(r.insightsItems, d.insightsItems, card, same),
      backgroundImage: img(r.insightsBackgroundImage),
      cutoutImage: img(r.insightsCutoutImage, text(r.insightsHeading, d.insightsHeading)),
    },
    cases: {
      ...head(r.casesEyebrow, r.casesHeading, r.casesBody, { eyebrow: d.casesEyebrow, heading: d.casesHeading, body: d.casesBody }),
      cards: list(r.caseCards, d.caseCards, card, same),
    },
    reach: {
      ...head(r.reachEyebrow, r.reachHeading, r.reachBody, { eyebrow: d.reachEyebrow, heading: d.reachHeading, body: d.reachBody }),
      stats: list(r.reachStats, d.reachStats, (s) => ({ value: s.value, label: s.label, icon: toImageModel(s.icon, s.label) }), same),
    },
    process: {
      ...head(r.processEyebrow, r.processHeading, r.processBody, { eyebrow: d.processEyebrow, heading: d.processHeading, body: d.processBody }),
      steps: list(r.processSteps, d.processSteps, card, same),
    },
    testimonials: {
      eyebrow: text(r.testimonialsEyebrow, d.testimonialsEyebrow),
      heading: text(r.testimonialsHeading, d.testimonialsHeading),
      items: list(
        r.testimonials,
        d.testimonials,
        (t) => ({ title: t.title, quote: t.quote ?? '', name: t.name, role: t.role ?? '' }),
        same,
      ),
    },
    faq: {
      cta: link('industries-faq-cta', r.faqCta, d.faqCta),
      heading: text(r.faqHeading, d.faqHeading),
      items: list(
        r.faqItems,
        d.faqItems,
        (f) => ({ id: `industries-faq-${f.id}`, question: f.question, answer: f.answer }),
        (f) => ({ id: `industries-faq-${f.question}`, question: f.question, answer: f.answer }),
      ),
    },
    about: {
      eyebrow: text(r.aboutEyebrow, d.aboutEyebrow),
      heading: text(r.aboutHeading, d.aboutHeading),
      paragraphs: paragraphs(r.aboutBody, d.aboutBody),
    },
    finalCta: {
      heading: text(r.finalCtaHeading, d.finalCtaHeading),
      body: text(r.finalCtaBody, d.finalCtaBody),
      action: link('industries-cta', r.finalCtaAction, d.finalCtaAction),
      image: img(r.finalCtaImage),
    },
    seo: normalizeSeo(r.seo, 'Industries'),
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
