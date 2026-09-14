/**
 * Template + graceful fallback resolver for /our-company — same
 * architecture as views/services/detail/fallback.ts and views/industries/
 * detail/fallback.ts: Priority 1 is the CMS's own `our-company-page`
 * singleType data; Priority 2 is Figma node 617:7561's own verbatim
 * copy (file foaJFuv0vRX8nD43o0ylgB), so the page always renders in
 * full even before an editor has touched the CMS record. Unlike the
 * per-entity industries/services resolvers, there's no `${title}`
 * interpolation here — this is one fixed page, not a template repeated
 * across many records — so every fallback string below is the exact,
 * final Figma copy, not a generic pattern.
 *
 * 3 disclosed exceptions, matching what upsertOurCompanyPageSettings()
 * (backend/scripts/seed.ts) already documents for the same reasons:
 *   1. valuesBody completes a sentence the node itself leaves
 *      mid-clause ("...with our focus on").
 *   2. ecosystemCards' step numbers are rendered from the card's array
 *      position (01-04), not stored — the node's own numbering
 *      (01/01/01/04) is a duplication artifact.
 *   3. faqItems are 5 authored questions, not the node's own
 *      literal placeholder ("What market research services does
 *      Unimrkt offer?", repeated identically across all 5 rows).
 */
import type { OurCompanySettings } from '@/models/ourCompanyPage';
import type { FaqItemModel, LinkModel } from '@/models/domain';
import type { IndustryDetailCardModel } from '@/models/industry';
import type { ServiceStatItemModel } from '@/models/service';

const ASSET_DIR = '/images/our-company';

function localImage(filename: string, alt: string, width: number, height: number) {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

function fallbackCard(idSuffix: string, title: string, description: string, iconIdentifier: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, description, iconIdentifier };
}

function fallbackPhotoCard(idSuffix: string, title: string, filename: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, image: localImage(filename, title, 384, 480) };
}

const FALLBACK_HERO_CTA: LinkModel = { id: 'fallback-hero-cta', label: 'Explore Our Capabilities', href: '/services', isExternal: false, variant: 'primary' };

const FALLBACK_STATS: ServiceStatItemModel[] = [
  { id: 'fallback-stat-countries', value: '90+', label: 'Countries', iconIdentifier: 'global' },
  { id: 'fallback-stat-languages', value: '22+', label: 'Languages', iconIdentifier: 'language-circle' },
  { id: 'fallback-stat-cati', value: '450+', label: 'CATI Stations', iconIdentifier: 'call' },
  { id: 'fallback-stat-years', value: '16+', label: 'Years of Experience', iconIdentifier: 'medal-star' },
];

const FALLBACK_INSIGHTS_CARDS: IndustryDetailCardModel[] = [
  fallbackCard('insight-global-reach', 'Global Reach', 'Access diverse markets across continents.', 'global'),
  fallbackCard('insight-deep-expertise', 'Deep Expertise', 'Experienced researchers across industries.', 'profile-2user'),
  fallbackCard('insight-faster-decisions', 'Faster Decisions', 'Clear insights delivered when they matter.', 'timer'),
  fallbackCard('insight-reliable-quality', 'Reliable Quality', 'Research built on rigorous standards.', 'shield-tick'),
];

const FALLBACK_ECOSYSTEM_CARDS: IndustryDetailCardModel[] = [
  fallbackCard('ecosystem-define', 'Define', 'We define business challenges and research goals to uncover clear opportunities for growth.', 'inspection'),
  fallbackCard('ecosystem-discover', 'Discover', 'We discover insights, trends, and opportunities that help businesses make smarter decisions and grow.', 'discovery'),
  fallbackCard('ecosystem-decode', 'Decode', 'We decode complex data into clear insights that reveal meaning, direction, and opportunities for business growth.', 'decode'),
  fallbackCard('ecosystem-deliver', 'Deliver', 'We deliver actionable insights that empower businesses to make confident decisions and achieve sustainable growth.', 'timing'),
];

const FALLBACK_VALUES_CARDS: IndustryDetailCardModel[] = [
  fallbackCard('values-communication', 'Clear Communication', 'We communicate openly, clearly, and consistently to build trust and ensure shared understanding.', 'chat'),
  fallbackCard('values-innovation', 'Innovation', 'We embrace new ideas, technologies, and approaches to deliver smarter, more effective research solutions.', 'idea'),
  fallbackCard('values-teamwork', 'Team Work', 'We collaborate closely, combining diverse expertise to deliver stronger insights and better outcomes.', 'teamwork'),
  fallbackCard('values-integrity', 'Integrity', 'We uphold honesty, transparency, and ethical practices across every project, partnership, and decision.', 'network'),
  fallbackCard('values-ethics', 'Business Ethics', 'We conduct business responsibly, ethically, and transparently, building lasting trust with every stakeholder.', 'ethics'),
  fallbackCard('values-transparency', 'Transparency', 'We communicate openly, share information clearly, and build trust through every interaction.', 'transparency'),
  fallbackCard('values-wisdom', 'Wisdom', 'We apply knowledge, experience, and thoughtful judgment to create smarter business outcomes.', 'intelligence'),
  fallbackCard('values-diversity', 'Diversity', 'We value diverse perspectives, experiences, and ideas to create stronger, more inclusive outcomes.', 'cultural-diversity'),
];

const FALLBACK_INDUSTRIES_CARDS: IndustryDetailCardModel[] = [
  fallbackPhotoCard('industry-automotive', 'Automotive', 'oc-industry-automotive.jpg'),
  fallbackPhotoCard('industry-healthcare', 'Healthcare', 'oc-industry-healthcare.jpg'),
  fallbackPhotoCard('industry-consumer', 'Consumer', 'oc-industry-consumer.jpg'),
  fallbackPhotoCard('industry-technology', 'Technology', 'oc-industry-technology.jpg'),
  fallbackPhotoCard('industry-financial-services', 'Financial Services', 'oc-industry-financial-services.jpg'),
  fallbackPhotoCard('industry-b2b-industrial', 'B2B & Industrial', 'oc-industry-b2b-industrial.jpg'),
  fallbackPhotoCard('industry-retail-ecommerce', 'Retail & E-commerce', 'oc-industry-retail-ecommerce.jpg'),
  fallbackPhotoCard('industry-media-entertainment', 'Media & Entertainment', 'oc-industry-media-entertainment.jpg'),
];

const FALLBACK_FAQ_ITEMS: FaqItemModel[] = [
  { id: 'fallback-faq-what-we-do', question: 'What does Unimrkt Research do?', answer: 'We are a global market research and consulting firm helping organizations understand markets, consumers, and emerging opportunities through primary and secondary research, data analytics, and strategic consulting.' },
  { id: 'fallback-faq-reach', question: 'How many countries and languages do you operate across?', answer: 'Our research capabilities span 90+ countries and 22+ languages, giving us both global reach and genuine local understanding.' },
  { id: 'fallback-faq-quality', question: 'What quality standards does Unimrkt Research follow?', answer: 'We adhere to ESOMAR principles and hold ISO 20252 and ISO 27001 certifications, reflecting our commitment to research integrity, quality, and data security.' },
  { id: 'fallback-faq-industries', question: 'What industries does Unimrkt Research serve?', answer: 'We work across automotive, healthcare, consumer, technology, financial services, B2B & industrial, retail & e-commerce, and media & entertainment, among others.' },
  { id: 'fallback-faq-difference', question: 'How is Unimrkt Research different from other research firms?', answer: 'We combine global reach, deep category expertise, robust methodologies, and advanced data collection capabilities to turn complex data into insights businesses can act on with confidence.' },
];

export interface ResolvedOurCompany {
  hero: { eyebrow: string; heading: string; subheading: string; image: OurCompanySettings['heroImage']; cta: LinkModel };
  stats: { heading: string; items: ServiceStatItemModel[] };
  about: { eyebrow: string; heading: string; body: string; image: OurCompanySettings['aboutImage'] };
  insights: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  ecosystem: { eyebrow: string; heading: string; subtext: string; items: IndustryDetailCardModel[] };
  values: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  industries: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  faqItems: FaqItemModel[];
  aboutCompany: { eyebrow: string; heading: string; body: string };
}

export function resolveOurCompany(settings: OurCompanySettings): ResolvedOurCompany {
  return {
    hero: {
      eyebrow: settings.heroEyebrow || 'Our Company',
      heading: settings.heroHeading || 'Research That Moves Business Forward',
      subheading:
        settings.heroSubheading ||
        'Introduce Unimrkt as a global market research partner helping organisations understand people, markets, and opportunities.',
      image: settings.heroImage || localImage('our-company-hero-bg.jpg', 'Research That Moves Business Forward', 1900, 768),
      cta: settings.heroCta || FALLBACK_HERO_CTA,
    },
    stats: {
      heading: settings.statsHeading || 'Research Without Borders',
      items: settings.stats.length > 0 ? settings.stats : FALLBACK_STATS,
    },
    about: {
      eyebrow: settings.aboutEyebrow || 'About Unimrkt',
      heading: settings.aboutHeading || 'We Turn Questions Into Clarity',
      body:
        settings.aboutBody ||
        'Founded on 6 December 2009, Unimrkt Research has evolved into a trusted global market research partner, conducting multi-industry research across 90 countries and four continents — the Americas, Europe, Asia Pacific, and Africa. With expertise spanning 22+ foreign languages, we connect businesses with diverse audiences and deliver culturally relevant, actionable insights across markets. Our commitment to quality, security, and research integrity is reflected in our adherence to ESOMAR principles and our ISO 20252 and ISO 27001 certifications. Combining global reach, deep industry expertise, robust methodologies, and advanced data collection capabilities, Unimrkt Research helps organizations better understand their markets, customers, and opportunities to make confident, data-driven decisions.',
      image: settings.aboutImage || localImage('our-company-about-founding.jpg', 'We Turn Questions Into Clarity', 673, 541),
    },
    insights: {
      eyebrow: settings.insightsEyebrow || 'Why Businesses Choose Unimrkt',
      heading: settings.insightsHeading || 'Insights That Move Businesses Forward',
      body:
        settings.insightsBody ||
        'Transforming complex data into clear, actionable insights that help businesses make smarter decisions and unlock new opportunities.',
      items: settings.insightsCards.length > 0 ? settings.insightsCards : FALLBACK_INSIGHTS_CARDS,
    },
    ecosystem: {
      eyebrow: settings.ecosystemEyebrow || 'Our Research Ecosystem',
      heading: settings.ecosystemHeading || 'From Question to Business Decision',
      subtext: settings.ecosystemSubtext || 'A highly visual interactive journey:',
      items: settings.ecosystemCards.length > 0 ? settings.ecosystemCards : FALLBACK_ECOSYSTEM_CARDS,
    },
    values: {
      eyebrow: settings.valuesEyebrow || 'Our Values',
      heading: settings.valuesHeading || 'The Principles Behind Our Work',
      body:
        settings.valuesBody ||
        'We believe that our values not only make us a reliable business partner and consumer research agency, but also a thoughtful one, with our focus on people, integrity, and long-term impact.',
      items: settings.valuesCards.length > 0 ? settings.valuesCards : FALLBACK_VALUES_CARDS,
    },
    industries: {
      eyebrow: settings.industriesEyebrow || 'Industries We Understand',
      heading: settings.industriesHeading || 'Deep Knowledge Across Diverse Industries',
      body:
        settings.industriesBody ||
        'Industry-specific expertise that helps us understand complex markets and deliver insights that drive informed business decisions.',
      items: settings.industriesCards.length > 0 ? settings.industriesCards : FALLBACK_INDUSTRIES_CARDS,
    },
    faqItems: settings.faqItems.length > 0 ? settings.faqItems : FALLBACK_FAQ_ITEMS,
    aboutCompany: {
      eyebrow: settings.aboutCompanyEyebrow || 'About Company',
      heading: settings.aboutCompanyHeading || 'Turning Market Questions Into Business Clarity',
      body:
        settings.aboutCompanyBody ||
        'Unimrkt is a global market research and insights company helping businesses understand markets, consumers, and emerging opportunities. With research capabilities across 90+ countries and 22+ languages, we bring together global reach, local understanding, and deep industry expertise to uncover meaningful perspectives. From defining business challenges to delivering actionable recommendations, our research is designed to help organisations make informed decisions with confidence. Through rigorous methodologies, advanced technology, and a human-centred approach, we transform complex data and diverse perspectives into insights that create measurable business impact.',
    },
  };
}
