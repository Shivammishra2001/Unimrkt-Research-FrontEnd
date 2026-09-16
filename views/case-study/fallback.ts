/**
 * Template + graceful fallback resolver for /case-study — Figma node
 * 1023:45614 ("Case Study", file foaJFuv0vRX8nD43o0ylgB). Same
 * architecture as views/work-with-us/fallback.ts, but narrower in
 * scope: per this task's own directive, the ONLY backend content type
 * built for this page is `api::case-study.case-study` (the "Case Study
 * Explorer" grid's cards — Priority 1 is that collection's real data,
 * falling back to this node's own 6 cards when empty). Every other
 * section (hero, "Our Approach" steps, testimonials, FAQ, "About Case
 * Study") has no CMS backing at all — this task's schema location was
 * explicitly scoped to `backend/src/api/case-study/` only, not a
 * `case-study-page` singleType — so those sections are this node's own
 * verbatim copy, always.
 *
 * One disclosed decision (confirmed with the user before building):
 * each card's arrow-right CTA (drawn on every Component 1055-1060) is
 * rendered but not a real link — this node only draws the listing
 * grid, no case-study detail page exists yet, so wiring a
 * `/case-study/[slug]` href would 404.
 *
 * The "Research Type" filter dropdown (Frame 1686557982) is shown
 * closed in Figma with no option list anywhere in the file, and unlike
 * "Industries" — derivable from the real `category` field every card
 * already has — no research-type dimension exists anywhere in the
 * drawn content or the schema. It renders visually (matching the node)
 * but disabled, rather than inventing option values with no backing
 * data; see ExplorerSection.tsx's own comment.
 */
import type { CaseStudySummary } from '@/models/caseStudy';
import type { FaqItemModel, LinkModel, ImageModel } from '@/models/domain';

const ASSET_DIR = '/images/case-study';

function localImage(filename: string, alt: string, width: number, height: number): ImageModel {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

const FALLBACK_HERO_CTA: LinkModel = { id: 'fallback-hero-cta', label: 'Explore Case Studies', href: '#case-studies', isExternal: false, variant: 'primary' };

// Verbatim content of the node's own 6 cards (Component 1055-1060) —
// used only when api::case-study.case-study has no published entries.
const FALLBACK_CASE_STUDIES: CaseStudySummary[] = [
  {
    id: 'fallback-cs-banking',
    slug: 'understanding-customer-expectations-in-a-changing-financial-market',
    title: 'Understanding Customer Expectations in a Changing Financial Market',
    excerpt: 'Uncover evolving customer needs and expectations shaping today’s financial landscape.',
    category: 'BANKING & FINANCE',
    coverImage: localImage('cs-story-banking-finance.jpg', 'Understanding Customer Expectations in a Changing Financial Market', 900, 505),
  },
  {
    id: 'fallback-cs-healthcare',
    slug: 'mapping-patient-needs-across-the-healthcare-journey',
    title: 'Mapping Patient Needs Across the Healthcare Journey',
    excerpt: 'Understand patient needs across every healthcare touchpoint.',
    category: 'HEALTHCARE',
    coverImage: localImage('cs-story-healthcare.jpg', 'Mapping Patient Needs Across the Healthcare Journey', 900, 599),
  },
  {
    id: 'fallback-cs-automotive',
    slug: 'understanding-the-future-of-mobility',
    title: 'Understanding the Future of Mobility',
    excerpt: 'Explore evolving mobility trends, behaviours, and consumer expectations.',
    category: 'AUTOMOTIVE',
    coverImage: localImage('cs-story-automotive.jpg', 'Understanding the Future of Mobility', 900, 514),
  },
  {
    id: 'fallback-cs-fmcg',
    slug: 'finding-the-next-consumer-growth-opportunity',
    title: 'Finding the Next Consumer Growth Opportunity',
    excerpt: 'Identify emerging consumer trends and opportunities driving sustainable growth.',
    category: 'FMCG',
    coverImage: localImage('cs-story-fmcg.jpg', 'Finding the Next Consumer Growth Opportunity', 900, 599),
  },
  {
    id: 'fallback-cs-telecom',
    slug: 'decoding-digital-adoption-across-markets',
    title: 'Decoding Digital Adoption Across Markets',
    excerpt: 'Uncover digital behaviors, adoption patterns, and market opportunities across regions.',
    category: 'IT & TELECOM',
    coverImage: localImage('cs-story-it-telecom.jpg', 'Decoding Digital Adoption Across Markets', 900, 504),
  },
  {
    id: 'fallback-cs-energy',
    slug: 'understanding-changing-energy-consumption',
    title: 'Understanding Changing Energy Consumption',
    excerpt: 'Track evolving energy habits, consumption patterns, and emerging market needs.',
    category: 'ENERGY & UTILITIES',
    coverImage: localImage('cs-story-energy-utilities.jpg', 'Understanding Changing Energy Consumption', 900, 599),
  },
];

export interface ApproachStep {
  id: string;
  number: number;
  title: string;
  body: string;
  icon: string;
}

// "Our Approach" — 4 cards (Component 1061-1064), verbatim.
const APPROACH_STEPS: ApproachStep[] = [
  { id: 'challenge', number: 1, title: 'The Challenge', body: 'What business problem needed solving?', icon: 'cs-icon-challenge.png' },
  { id: 'research', number: 2, title: 'The Research', body: 'Which methodology was used?', icon: 'cs-icon-research.png' },
  { id: 'insight', number: 3, title: 'The Insight', body: 'What did the research reveal?', icon: 'cs-icon-insight.png' },
  { id: 'impact', number: 4, title: 'The Impact', body: 'How did the insight support the business?', icon: 'cs-icon-impact.png' },
];

export interface TestimonialCard {
  id: string;
  heading: string;
  quote: string;
  roleLine: string;
  orgLine: string;
}

// 3 testimonial cards (Component 1065-1067), verbatim. Distinct shape
// from api::testimonial.testimonial (which requires a real authorName
// and pairs it with a company) — these cards show only a generic
// role + organization-type line, never a name, so reusing that
// existing collection would mean inventing a name value it requires
// but the node never draws. Out of this task's declared schema scope
// anyway (backend/src/api/case-study/ only), so left as static copy.
const TESTIMONIALS: TestimonialCard[] = [
  {
    id: 'testimonial-marketing',
    heading: 'Expertise That Drives Better Decisions',
    quote: 'Unimrkt brought strong research expertise and a clear understanding of our business challenge. The insights helped us make more confident, data-driven decisions.',
    roleLine: 'Marketing Director',
    orgLine: 'Consumer Brand',
  },
  {
    id: 'testimonial-strategy',
    heading: 'Insights That Strengthen Strategy',
    quote: 'The team was responsive, thorough and highly focused on data quality. Their research approach gave us actionable insights that directly supported our strategy.',
    roleLine: 'Strategy Head',
    orgLine: 'Global Organization',
  },
  {
    id: 'testimonial-business',
    heading: 'Turning Research Into Impact',
    quote: 'What stood out was Unimrkt’s ability to turn complex research findings into clear, practical insights. It was a valuable partnership from start to finish.',
    roleLine: 'Business Head',
    orgLine: 'Leading Enterprise',
  },
];

// 7 FAQ questions verified via get_design_context on each accordion
// instance (metadata's own `name` attribute is unreliable — see this
// session's recurring FAQ-staleness note in every other page's
// fallback.ts). Accordion is collapsed on canvas; answers authored in
// the same voice as every other FAQ section this session.
const FAQ_ITEMS: FaqItemModel[] = [
  { id: 'fallback-faq-learn', question: 'What can I learn from a Unimrkt case study?', answer: 'Each case study walks through a real business challenge, the research methodology used to address it, and the insights that shaped the client’s decisions.' },
  { id: 'fallback-faq-types', question: 'What types of research projects are featured in the case studies?', answer: 'Our case studies span primary and secondary research, qualitative and quantitative studies, and projects across consumer, B2B, and industrial markets.' },
  { id: 'fallback-faq-approach', question: 'How does Unimrkt approach a research challenge?', answer: 'We start by clarifying the business question, design a methodology suited to it, gather and analyze the data, and translate the findings into clear, actionable recommendations.' },
  { id: 'fallback-faq-industry', question: 'Can I find a case study relevant to my industry?', answer: 'Yes — use the Industries filter above to browse case studies from the sector closest to your business.' },
  { id: 'fallback-faq-methodologies', question: 'What research methodologies does Unimrkt use?', answer: 'We use a mix of surveys, interviews, focus groups, and secondary data analysis, selecting the combination that best fits each project’s objectives.' },
  { id: 'fallback-faq-demonstrate', question: 'How do case studies demonstrate the impact of research?', answer: 'Each case study connects the research findings directly to the business outcome they informed, showing how the insight translated into a real decision or result.' },
  { id: 'fallback-faq-similar', question: 'Can Unimrkt conduct a similar research project for my business?', answer: 'Absolutely — reach out to our team to discuss your research needs and we’ll help design a project suited to your goals.' },
];

export interface ResolvedCaseStudy {
  hero: { eyebrow: string; heading: string; subheading: string; image?: ImageModel; cta: LinkModel };
  explorer: {
    eyebrow: string;
    heading: string;
    body: string;
    allLabel: string;
    industriesLabel: string;
    researchTypeLabel: string;
    items: CaseStudySummary[];
  };
  approach: { eyebrow: string; heading: string; steps: ApproachStep[] };
  testimonials: { eyebrow: string; heading: string; items: TestimonialCard[] };
  faqItems: FaqItemModel[];
  about: { eyebrow: string; heading: string; body: string };
}

export function resolveCaseStudy(caseStudies: CaseStudySummary[]): ResolvedCaseStudy {
  return {
    hero: {
      eyebrow: 'CASE STUDIES',
      heading: 'Turning Research Into Business Impact',
      subheading: 'Unimrkt Research helps businesses uncover opportunities, understand consumers and make confident, data-driven decisions.',
      image: localImage('cs-hero-bg.jpg', 'Turning Research Into Business Impact', 1900, 848),
      cta: FALLBACK_HERO_CTA,
    },
    explorer: {
      eyebrow: 'Case Study Explorer',
      heading: 'Explore Our Research Stories',
      body: 'Discover how we solve complex research challenges across industries, markets and methodologies.',
      allLabel: 'All',
      industriesLabel: 'Industries',
      researchTypeLabel: 'Research Type',
      items: caseStudies.length > 0 ? caseStudies : FALLBACK_CASE_STUDIES,
    },
    approach: {
      eyebrow: 'Our Approach',
      heading: 'Every Case Study Starts With the Right Question',
      steps: APPROACH_STEPS,
    },
    testimonials: {
      eyebrow: 'Testimonial',
      heading: 'Trusted by Teams That Value Better Insights',
      items: TESTIMONIALS,
    },
    faqItems: FAQ_ITEMS,
    about: {
      eyebrow: 'About Case Study',
      heading: 'Research That Creates Real Impact',
      body: 'Our case studies showcase how Unimrkt Research helps organizations navigate complex business challenges with meaningful, data-driven insights. From understanding consumer behavior to identifying market opportunities, each project demonstrates our ability to turn research into clear, actionable direction. Explore our work to see the challenges we addressed, the methodologies we applied and the insights that helped clients make more informed business decisions.',
    },
  };
}
