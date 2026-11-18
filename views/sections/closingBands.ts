import type { ClosingBandsSettings, LinkModel } from '@/models/domain';

/** The three closing bands with every field filled. */
export interface ResolvedClosingBands {
  blog: { eyebrow: string; heading: string; description: string };
  faq: { heading: string; cta: LinkModel };
  finalCta: { heading: string; body: string; action: LinkModel };
}

/** Built-in copy — used only when neither the page override nor Global has a value. */
const BUILT_IN: ResolvedClosingBands = {
  blog: {
    eyebrow: 'Latest Blogs',
    heading: 'Exploring Market Trends',
    description: 'Discover Emerging Market Trends That Shape Smarter Business Decisions.',
  },
  faq: {
    heading: 'Frequently Asked Questions',
    cta: { id: 'faq-band-cta', label: 'Browse Blogs', href: '/blogs', isExternal: false, variant: 'primary' },
  },
  finalCta: {
    heading: 'Start Your Research Journey',
    body: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
    action: { id: 'final-cta-action', label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
  },
};

/**
 * Field by field: the page's own override (Service / Industry / page record) → Global Header, Footer & SEO → built-in
 * copy. A band's button is taken whole from whichever level sets it.
 */
export function resolveClosingBands(global?: ClosingBandsSettings, override?: ClosingBandsSettings): ResolvedClosingBands {
  const pick = <T,>(...values: Array<T | undefined>) => values.find((v) => v !== undefined) as T;
  return {
    blog: {
      eyebrow: pick(override?.blog?.eyebrow, global?.blog?.eyebrow, BUILT_IN.blog.eyebrow),
      heading: pick(override?.blog?.heading, global?.blog?.heading, BUILT_IN.blog.heading),
      description: pick(override?.blog?.description, global?.blog?.description, BUILT_IN.blog.description),
    },
    faq: {
      heading: pick(override?.faq?.heading, global?.faq?.heading, BUILT_IN.faq.heading),
      cta: pick(override?.faq?.cta, global?.faq?.cta, BUILT_IN.faq.cta),
    },
    finalCta: {
      heading: pick(override?.finalCta?.heading, global?.finalCta?.heading, BUILT_IN.finalCta.heading),
      body: pick(override?.finalCta?.body, global?.finalCta?.body, BUILT_IN.finalCta.body),
      action: pick(override?.finalCta?.action, global?.finalCta?.action, BUILT_IN.finalCta.action),
    },
  };
}
