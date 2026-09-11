/**
 * Verbatim from backend/scripts/seed.ts's upsertHomePage() / upsertAboutPage()
 * / upsertNestedDemoPage() — same copy, same block order, same field values
 * the real backend seeds. Block counts are read directly off that source
 * (home = 12 blocks: hero×3, service-band, stats-band, industry-grid,
 * content×2, media-gallery, blog-teaser, faq, cta) rather than off
 * FRONTEND_SPEC.md's "11 blocks" summary, which undercounts by one against
 * the actual seed script — this repo's own source is the tie-breaker per
 * SYSTEM_ARCHITECTURE.md's own stated rule.
 */
import type { StrapiBlock, StrapiLink, StrapiPage, StrapiPageResponse, StrapiPageSlugsResponse } from '@/models/strapi';
import { MOCK_IMAGES } from './media';

const NOW = '2026-01-05T09:10:00.000Z';

let nextLinkId = 100;
function link(label: string, href: string, isExternal: boolean, variant: StrapiLink['variant']): StrapiLink {
  nextLinkId += 1;
  return { id: nextLinkId, label, href, isExternal, variant };
}

let nextBlockId = 1;
function blockId(): number {
  nextBlockId += 1;
  return nextBlockId;
}

let nextItemId = 1;
function itemId(): number {
  nextItemId += 1;
  return nextItemId;
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

const homeBlocks: StrapiBlock[] = [
  {
    __component: 'blocks.hero',
    id: blockId(),
    eyebrow: 'Market Intelligence',
    heading: 'Structured Market Data for Unprecedented Clarity',
    subheading:
      'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    media: MOCK_IMAGES.heroPhoto,
    mediaAlignment: 'background',
    actions: [link('Discover the unimrkt', '/about', false, 'primary')],
    sideMenu: [
      { id: itemId(), label: 'Online Bulletin Board', href: '/services' },
      { id: itemId(), label: 'Intercept Interview', href: '/services' },
      { id: itemId(), label: 'Country Research', href: '/services' },
      { id: itemId(), label: 'Competitive Intelligence', href: '/services' },
      { id: itemId(), label: 'Survey Programming', href: '/services' },
      { id: itemId(), label: 'In-Depth Interview', href: '/services' },
      { id: itemId(), label: 'Telephonic Interview', href: '/services' },
    ],
    headingSize: null,
    theme: 'dark',
    anchorId: null,
  },
  {
    __component: 'blocks.hero',
    id: blockId(),
    eyebrow: 'About Unimrkt',
    heading: 'Global Research, Local Understanding',
    subheading:
      'As a trusted market research company, we partner with forward-thinking organizations to deliver accurate insights, meaningful intelligence, and data-driven strategies that support informed decision-making, sustainable growth, and industry leadership.',
    media: MOCK_IMAGES.momentsLarge,
    mediaAlignment: 'below',
    actions: [link('Get Started Today', '/contact', false, 'primary')],
    sideMenu: [],
    headingSize: 'h2',
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.service-band',
    id: blockId(),
    heading: 'Research Solutions That Drive Growth',
    body:
      'Delivering end-to-end research solutions that transform data into confident business decisions, enabling organizations to uncover opportunities, understand markets, and drive sustainable growth.',
    background: MOCK_IMAGES.servicesEarth,
    cta: link('Talk to Our Experts', '/contact', false, 'secondary'),
    items: [
      { id: itemId(), label: 'Research Support', href: '/services' },
      { id: itemId(), label: 'Qualitative Research', href: '/services' },
      { id: itemId(), label: 'Quantitative Research', href: '/services' },
      { id: itemId(), label: 'Business Research', href: '/services' },
    ],
    anchorId: null,
  },
  {
    __component: 'blocks.stats-band',
    id: blockId(),
    heading: null,
    items: [
      { id: itemId(), value: '250000+', label: 'Surveys Completed Annually' },
      { id: itemId(), value: '450+', label: 'Global Clients' },
      { id: itemId(), value: '16+ Years', label: 'Of Research Excellence' },
    ],
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.hero',
    id: blockId(),
    eyebrow: null,
    heading: '500+ Advanced CATI Workstations',
    subheading:
      'Equipped to deliver high-volume, accurate, and efficient telephone research nationwide, supported by advanced technology, skilled interviewers, and robust quality control processes.',
    media: MOCK_IMAGES.momentsSmall,
    mediaAlignment: 'left',
    actions: [link('Get Started Today', '/contact', false, 'primary')],
    sideMenu: [],
    headingSize: null,
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.industry-grid',
    id: blockId(),
    heading: 'Industries We Serve',
    subheading: 'Helping organizations make smarter decisions through global research expertise and industry insights.',
    background: MOCK_IMAGES.industryCityscape,
    cta: link('Talk to Our Experts', '/contact', false, 'primary'),
    // Every real card shares the same accent color — there is no
    // per-industry palette on the source canvas (seed.ts's own comment).
    items: [
      { id: itemId(), title: 'Healthcare & Life Sciences', image: MOCK_IMAGES.industryHealthcare, accentColor: '#7f3856' },
      { id: itemId(), title: 'Banking & Financial Services', image: MOCK_IMAGES.industryBanking, accentColor: '#7f3856' },
      { id: itemId(), title: 'Retail & Consumer Goods', image: MOCK_IMAGES.industryRetail, accentColor: '#7f3856' },
      { id: itemId(), title: 'Automotive & Mobility', image: MOCK_IMAGES.industryAutomotive, accentColor: '#7f3856' },
    ],
    anchorId: null,
  },
  {
    __component: 'blocks.content',
    id: blockId(),
    heading: 'Unlock the Power of Marketplaces',
    body: 'Unimrkt conducts multi-industry research across 90 countries in over 22 languages.',
    media: null,
    mediaAlignment: 'none',
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.media-gallery',
    id: blockId(),
    heading: 'Moments of Excellence',
    subheading:
      'Showcasing the expertise, innovation, and dedication behind every research project and client success story.',
    actions: [
      link('Browse Gallery', '/#gallery', false, 'secondary'),
      link('Browse Blogs', '/#blogs', false, 'secondary'),
    ],
    // The two `large` items show the play-button overlay purely from
    // `size` — no videoUrl here on purpose, matching seed.ts: no real
    // embedded video exists in the source assets.
    items: [
      { id: itemId(), media: MOCK_IMAGES.momentsLarge, size: 'large', videoUrl: null },
      { id: itemId(), media: MOCK_IMAGES.momentsLarge, size: 'large', videoUrl: null },
      { id: itemId(), media: MOCK_IMAGES.momentsSmall, size: 'small', videoUrl: null },
      { id: itemId(), media: MOCK_IMAGES.momentsSmall, size: 'small', videoUrl: null },
      { id: itemId(), media: MOCK_IMAGES.momentsSmall, size: 'small', videoUrl: null },
      { id: itemId(), media: MOCK_IMAGES.momentsSmall, size: 'small', videoUrl: null },
    ],
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.blog-teaser',
    id: blockId(),
    eyebrow: 'Latest Blogs',
    heading: 'Exploring Market Trends',
    actions: [],
    posts: [
      {
        id: itemId(),
        title: 'All You Need to Know About Online Market Research',
        excerpt:
          'In a world where consumer behavior evolves faster than a trending topic, online market research has become essential.',
        image: MOCK_IMAGES.blogPhoto,
        href: '/#blogs',
      },
      {
        id: itemId(),
        title: 'Why Field-Based Quantitative Market Research Remains Critical in 2026',
        excerpt: 'Over the past few years, the research landscape has shifted rapidly.',
        image: MOCK_IMAGES.blogFieldResearch,
        href: '/#blogs',
      },
      {
        id: itemId(),
        title: 'AI and the Workforce in 2026: Transformation, Disruption, or Both?',
        excerpt: 'In 2026, artificial intelligence is no longer an emerging tool.',
        image: MOCK_IMAGES.blogAiWorkforce,
        href: '/#blogs',
      },
    ],
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.faq',
    id: blockId(),
    heading: 'Frequently Asked Questions',
    background: MOCK_IMAGES.faqWorldmap,
    cta: { id: 9001, label: 'Browse Blogs', href: '/blogs', isExternal: false, variant: 'primary' },
    // Authored answer copy, not extracted — the accordion is collapsed by
    // default on the source canvas, so no answer text was ever visible to
    // pull (seed.ts's own disclosure).
    items: [
      {
        id: itemId(),
        question: 'What market research services does Unimrkt offer?',
        answer:
          'Our services span qualitative and quantitative research, CATI surveys, business research, global panel solutions, data analytics, and end-to-end research support.',
      },
      {
        id: itemId(),
        question: 'What industries does Unimrkt serve?',
        answer:
          'We work across healthcare & life sciences, banking & financial services, retail & consumer goods, automotive & mobility, and more — see Industries We Serve above.',
      },
      {
        id: itemId(),
        question: "What is Unimrkt's global research reach?",
        answer:
          'We operate across 90+ countries in over 22 languages, combining worldwide research capabilities with deep local expertise.',
      },
      {
        id: itemId(),
        question: 'How does Unimrkt ensure data quality and reliability?',
        answer:
          'Every engagement runs through robust quality control processes, trained interviewers, and 500+ CATI workstations built for high-volume, accurate telephone research.',
      },
      {
        id: itemId(),
        question: 'Why choose Unimrkt as your research partner?',
        answer:
          '16+ years of research excellence, 250,000+ surveys completed annually, and a track record of turning complex data into clear strategic direction.',
      },
    ],
    anchorId: null,
  },
  {
    __component: 'blocks.content',
    id: blockId(),
    heading: 'Global Research, Local Understanding',
    body:
      'At Unimrkt Research, we empower organizations with reliable market intelligence, actionable insights, and data-driven strategies that support confident decision-making. Since 2009, we have been helping businesses across industries uncover opportunities, understand consumer behavior, and navigate evolving market landscapes through comprehensive research solutions. With a strong global presence across 90+ countries and 22+ languages, we combine worldwide research capabilities with deep local expertise to deliver accurate, relevant, and impactful insights. Our services span qualitative and quantitative research, CATI surveys, business research, global panel solutions, data analytics, and end-to-end research support. Backed by 16+ years of research excellence, 500+ CATI workstations, and 250,000+ surveys completed annually, we are committed to delivering high-quality data and meaningful intelligence that drive growth, innovation, and business success.',
    media: null,
    mediaAlignment: 'none',
    theme: 'light',
    anchorId: null,
  },
  {
    __component: 'blocks.cta',
    id: blockId(),
    heading: 'Global Research Panel',
    body:
      'Access a diverse network of verified respondents across multiple countries, demographics, and industries, enabling reliable market research, faster data collection, and meaningful insights at a global scale.',
    actions: [link('Explore Our Global Panel', '/#global-panel', false, 'primary')],
    background: MOCK_IMAGES.momentsLarge,
    theme: 'dark',
    anchorId: null,
  },
];

const homePage: StrapiPage = {
  id: 1,
  documentId: 'mock-page-home',
  title: 'Home',
  slug: 'home',
  seo: {
    id: 1,
    metaTitle: 'Unimrkt Research — Structured Market Data',
    metaDescription:
      'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    shareImage: null,
    keywords: null,
    preventIndexing: false,
  },
  blocks: homeBlocks,
  createdAt: NOW,
  updatedAt: NOW,
  publishedAt: NOW,
};

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

const aboutPage: StrapiPage = {
  id: 2,
  documentId: 'mock-page-about',
  title: 'About',
  slug: 'about',
  seo: {
    id: 2,
    metaTitle: 'About — UniMarket',
    metaDescription: 'UniMarket is built by a small team who got tired of redeploying a marketing site for every copy change.',
    shareImage: null,
    keywords: null,
    preventIndexing: false,
  },
  blocks: [
    {
      __component: 'blocks.hero',
      id: blockId(),
      eyebrow: 'Our story',
      heading: 'A CMS engine, not a homepage',
      subheading: 'Every page on this site — including this one — is a Strapi entry, not a route.',
      media: null,
      mediaAlignment: 'below',
      actions: [link('Back to home', '/', false, 'secondary')],
      sideMenu: [],
      headingSize: null,
      theme: 'light',
      anchorId: null,
    },
    {
      __component: 'blocks.cta',
      id: blockId(),
      heading: 'Want to see it in Strapi?',
      body: 'Open Content Manager -> Page -> About to edit this exact block list.',
      actions: [link('Get started', '/signup', false, 'primary')],
      background: null,
      theme: 'accent',
      anchorId: null,
    },
  ],
  createdAt: NOW,
  updatedAt: NOW,
  publishedAt: NOW,
};

// ---------------------------------------------------------------------------
// Nested-route demo page — reachable at /about/cloud, looked up by its
// flat slug "cloud" (see seed.ts's upsertNestedDemoPage() comment).
// ---------------------------------------------------------------------------

const cloudPage: StrapiPage = {
  id: 3,
  documentId: 'mock-page-cloud',
  title: 'Cloud Services',
  slug: 'cloud',
  seo: {
    id: 3,
    metaTitle: 'Cloud Services — UniMarket',
    metaDescription: 'Reachable at /about/cloud — resolved by its slug "cloud", not its full URL.',
    shareImage: null,
    keywords: null,
    preventIndexing: false,
  },
  blocks: [
    {
      __component: 'blocks.hero',
      id: blockId(),
      eyebrow: 'Nested route demo',
      heading: 'This page lives at /about/cloud',
      subheading: 'Its Strapi slug is just "cloud" — the catch-all route resolves by the final URL segment.',
      media: null,
      mediaAlignment: 'below',
      actions: [],
      sideMenu: [],
      headingSize: null,
      theme: 'dark',
      anchorId: null,
    },
  ],
  createdAt: NOW,
  updatedAt: NOW,
  publishedAt: NOW,
};

export const MOCK_PAGES: Record<string, StrapiPage> = {
  home: homePage,
  about: aboutPage,
  cloud: cloudPage,
};

export function mockPageResponse(slug: string): StrapiPageResponse | undefined {
  const page = MOCK_PAGES[slug];
  return page ? { data: page, meta: {} } : undefined;
}

export const MOCK_PAGE_SLUGS_RESPONSE: StrapiPageSlugsResponse = {
  data: Object.values(MOCK_PAGES).map((p) => ({ id: p.id, slug: p.slug, updatedAt: p.updatedAt })),
  meta: {},
};
