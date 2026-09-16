/**
 * Template + graceful fallback resolver for /case-study/[slug] — Figma
 * node 1107:49842 ("Case Study Details Page", file
 * foaJFuv0vRX8nD43o0ylgB). Same architecture as
 * views/case-study/fallback.ts: Priority 1 is the matched
 * `api::case-study.case-study` entry's own detail fields (per-entry
 * content); Priority 2 is the `case-study-page` settings singleType's
 * own shared chrome fields; Priority 3 (whenever both are empty) is
 * this node's own verbatim copy — applied per-field exactly like every
 * other CMS-first page this session, not as an all-or-nothing switch.
 *
 * Section eyebrows ("THE CHALLENGE", "THE RESEARCH QUESTION", "OUR
 * APPROACH", "WHAT WE UNCOVERED", "THE IMPACT", "RELATED CASE STUDY"),
 * the "Our client needed to understand:" label, the "Trusted by Global
 * Businesses" heading, the FAQ heading, the "Related Case Study"
 * panel's own copy, and the bottom CTA are template-level chrome
 * identical across every case study — not per-entry CMS content, see
 * models/caseStudy.ts's header comment — but they're now CMS-editable
 * via the `case-study-page` settings singleType (models/caseStudyPage.ts)
 * rather than hardcoded constants.
 */
import type { CaseStudyDetail } from '@/models/caseStudy';
import type { CaseStudyPageSettings } from '@/models/caseStudyPage';
import type { IndustryDetailCardModel, TrustLogoModel } from '@/models/industry';
import type { FaqItemModel, LinkModel } from '@/models/domain';
import type { ImageModel } from '@/models/domain';

const ASSET_DIR = '/images/case-study-detail';

function localImage(filename: string, alt: string, width: number, height: number): ImageModel {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

function card(idSuffix: string, title: string, description: string, iconFile: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, description, icon: localImage(iconFile, title, 70, 70) };
}

function panel(idSuffix: string, title: string, imageFile: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, image: localImage(imageFile, title, 700, 460) };
}

function impactCard(idSuffix: string, title: string, iconFile: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, icon: localImage(iconFile, title, 44, 44) };
}

const FALLBACK_TRUST_LOGOS: TrustLogoModel[] = [
  { id: 'fallback-trust-suzuki', name: 'Suzuki', image: localImage('csd-logo-suzuki.png', 'Suzuki', 265, 119) },
  { id: 'fallback-trust-cocacola', name: 'Coca-Cola', image: localImage('csd-logo-cocacola.png', 'Coca-Cola', 265, 119) },
  { id: 'fallback-trust-hdfc', name: 'HDFC Bank', image: localImage('csd-logo-hdfc.png', 'HDFC Bank', 265, 119) },
  { id: 'fallback-trust-amazon', name: 'Amazon', image: localImage('csd-logo-amazon.png', 'Amazon', 265, 119) },
  { id: 'fallback-trust-airtel', name: 'Airtel', image: localImage('csd-logo-airtel.png', 'Airtel', 265, 119) },
];

const FALLBACK_CHALLENGE_BULLETS = [
  'What customers truly value when choosing financial services',
  'How expectations differ across customer segments',
  'What drives trust, consideration, and loyalty',
  'How digital experiences influence financial decisions',
  'Where existing customer journeys create friction',
  'Which service improvements could create stronger engagement',
];

const FALLBACK_RESEARCH_QUESTION_ITEMS: IndustryDetailCardModel[] = [
  card('rq-trust', 'Trust', 'What makes customers feel confident about a financial provider?', 'csd-icon-trust.png'),
  card('rq-convenience', 'Convenience', 'How important are speed, accessibility, and ease of use?', 'csd-icon-convenience.png'),
  card('rq-digital', 'Digital Experience', 'What do customers expect from websites, apps, and digital services?', 'csd-icon-digital-experience.png'),
  card('rq-value', 'Value', 'Which product features, pricing factors, and benefits influence decisions?', 'csd-icon-value.png'),
  card('rq-relationship', 'Relationship', 'What makes customers stay, engage, and recommend a financial brand?', 'csd-icon-relationship.png'),
];

const FALLBACK_APPROACH_STEPS: IndustryDetailCardModel[] = [
  card('approach-define', 'Define', 'Established research objectives, customer segments and key business questions.', 'csd-icon-define.png'),
  card('approach-discover', 'Discover', 'Conducted qualitative conversations to uncover motivations, pain points and unmet expectations.', 'csd-icon-discover.png'),
  card('approach-measure', 'Measure', 'Used structured surveys to quantify customer preferences and identify meaningful patterns.', 'csd-icon-measure.png'),
  card('approach-segment', 'Segment', 'Compared responses across customer profiles, needs and behavioural characteristics.', 'csd-icon-segment.png'),
  card('approach-analyse', 'Analyse', 'Identified the strongest drivers of consideration, satisfaction and loyalty.', 'csd-icon-analyse.png'),
  card('approach-activate', 'Activate', 'Translated findings into practical recommendations for customer experience and service strategy.', 'csd-icon-activate.png'),
];

const FALLBACK_UNCOVERED_PANELS: IndustryDetailCardModel[] = [
  panel('uncovered-confidence', 'Simplicity builds confidence', 'csd-uncovered-1-confidence.jpg'),
  panel('uncovered-digital', 'Digital convenience is now an expectation', 'csd-uncovered-2-digital.jpg'),
  panel('uncovered-trust', 'Trust remains the foundation', 'csd-uncovered-3-trust.jpg'),
  panel('uncovered-personalisation', 'Personalisation creates relevance', 'csd-uncovered-4-personalisation.jpg'),
  panel('uncovered-loyalty', 'Service experience influences loyalty', 'csd-uncovered-5-loyalty.jpg'),
];

const FALLBACK_IMPACT_ITEMS: IndustryDetailCardModel[] = [
  impactCard('impact-understanding', 'Sharper Customer Understanding', 'csd-icon-understanding.png'),
  impactCard('impact-gaps', 'Identified Experience Gaps', 'csd-icon-gaps.svg'),
  impactCard('impact-segmentation', 'Stronger Customer Segmentation', 'csd-icon-segmentation.png'),
  impactCard('impact-strategy', 'More Relevant Product Strategy', 'csd-icon-strategy.png'),
  impactCard('impact-decisions', 'Confident, Data Driven Decisions', 'csd-icon-decisions.png'),
];

const FALLBACK_FAQ_ITEMS: FaqItemModel[] = [
  {
    id: 'fallback-faq-help',
    question: 'How can customer research help financial services companies?',
    answer:
      'It reveals what customers actually value — beyond product features — so financial providers can prioritize the experiences, channels, and services that build trust and loyalty.',
  },
  {
    id: 'fallback-faq-areas',
    question: 'What areas can Unimrkt research in Banking & Finance?',
    answer:
      'We research customer expectations, digital adoption, product and pricing perception, service experience, and the factors driving trust and retention across banking, insurance, and financial services.',
  },
  {
    id: 'fallback-faq-methods',
    question: 'What research methods can be used for financial services research?',
    answer: 'We combine structured surveys, CATI, in-depth interviews, and focus groups to capture both the scale of quantitative data and the depth of qualitative insight.',
  },
  {
    id: 'fallback-faq-gaps',
    question: 'How does research identify customer experience gaps?',
    answer: 'By comparing what customers expect at each stage of their journey against what they actually experience, surfacing the specific moments where friction or disappointment occurs.',
  },
  {
    id: 'fallback-faq-segment',
    question: 'Can research help financial companies segment their customers?',
    answer: 'Yes — comparing responses across customer profiles, needs, and behaviours reveals distinct segments with different expectations, priorities, and value drivers.',
  },
  {
    id: 'fallback-faq-strategy',
    question: 'How can research insights support product strategy?',
    answer: 'Insights highlight which product features, pricing factors, and service qualities actually influence decisions, helping teams prioritize what to build or improve next.',
  },
  {
    id: 'fallback-faq-actionable',
    question: 'How does Unimrkt turn research into actionable insights?',
    answer: 'We translate findings into clear, practical recommendations mapped directly to business decisions — not just data, but a defined path to improving experience and strategy.',
  },
];

const FALLBACK_BOTTOM_CTA_ACTION: LinkModel = {
  id: 'fallback-case-study-detail-bottom-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary',
};

export interface ResolvedCaseStudyDetail {
  title: string;
  category: string;
  hero: { subheading: string; image?: ImageModel };
  trust: { heading: string; logos: TrustLogoModel[] };
  challenge: { eyebrow: string; heading: string; body: string; needsLabel: string; bullets: string[]; closing: string; photo?: ImageModel };
  researchQuestion: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  approach: { eyebrow: string; heading: string; body: string; steps: IndustryDetailCardModel[] };
  uncovered: { eyebrow: string; heading: string; body: string; panels: IndustryDetailCardModel[] };
  impact: { eyebrow: string; heading: string; body: string; image?: ImageModel; items: IndustryDetailCardModel[] };
  related: { eyebrow: string; heading: string; body: string };
  faqHeading: string;
  faqItems: FaqItemModel[];
  bottomCta: { heading: string; body: string; action: LinkModel };
}

export function resolveCaseStudyDetail(cs: CaseStudyDetail, settings: CaseStudyPageSettings): ResolvedCaseStudyDetail {
  return {
    title: cs.title,
    category: cs.category,
    hero: {
      subheading:
        cs.heroSubheading ||
        'How research uncovered evolving customer needs, digital expectations, and decision-making drivers to help a financial services organization strengthen its customer strategy.',
      image: cs.heroImage || cs.coverImage || localImage('csd-hero-photo.jpg', cs.title, 1250, 702),
    },
    trust: {
      heading: settings.detailTrustHeading || 'Trusted by Global Businesses',
      logos: cs.trustLogos.length > 0 ? cs.trustLogos : FALLBACK_TRUST_LOGOS,
    },
    challenge: {
      eyebrow: settings.detailChallengeEyebrow || 'The Challenge',
      heading: cs.challengeHeading || 'Financial Expectations Were Changing Faster Than Ever',
      body:
        cs.challengeBody ||
        'As financial services become increasingly digital, customers expect more than competitive products. They want simplicity, transparency, personalization, speed, and seamless experiences across every interaction.',
      needsLabel: settings.detailChallengeNeedsLabel || 'Our client needed to understand:',
      bullets: cs.challengeBullets && cs.challengeBullets.length > 0 ? cs.challengeBullets : FALLBACK_CHALLENGE_BULLETS,
      closing:
        cs.challengeClosing ||
        'The challenge was to move beyond basic satisfaction scores and uncover the real motivations behind customer expectations.',
      photo: cs.challengePhoto || localImage('csd-challenge-photo.jpg', cs.title, 443, 653),
    },
    researchQuestion: {
      eyebrow: settings.detailResearchQuestionEyebrow || 'The Research Question',
      heading: cs.researchQuestionHeading || 'What Do Customers Really Expect From Their Financial Providers?',
      body:
        cs.researchQuestionBody ||
        'We explored the complete customer perspective — from awareness and consideration to selection, usage, and ongoing engagement.',
      items: cs.researchQuestionItems.length > 0 ? cs.researchQuestionItems : FALLBACK_RESEARCH_QUESTION_ITEMS,
    },
    approach: {
      eyebrow: settings.detailApproachEyebrow || 'Our Approach',
      heading: cs.approachHeading || 'Turning customer conversations into actionable intelligence',
      body:
        cs.approachBody ||
        'Unimrkt designed a structured research approach combining quantitative measurement with qualitative exploration to understand both what customers think and why they think it. This reflects Unimrkt’s BFSI capabilities across surveys, CATI, interviews, focus groups, and other research methodologies.',
      steps: cs.approachSteps.length > 0 ? cs.approachSteps : FALLBACK_APPROACH_STEPS,
    },
    uncovered: {
      eyebrow: settings.detailUncoveredEyebrow || 'What We Uncovered',
      heading: cs.uncoveredHeading || 'Customers Wanted More Than Financial Products',
      body:
        cs.uncoveredBody ||
        'The research revealed that customers increasingly evaluate financial providers based on the overall experience, not simply the product itself.',
      panels: cs.uncoveredPanels.length > 0 ? cs.uncoveredPanels : FALLBACK_UNCOVERED_PANELS,
    },
    impact: {
      eyebrow: settings.detailImpactEyebrow || 'The Impact',
      heading: cs.impactHeading || 'From Customer Understanding To Confident Decision-Making',
      body:
        cs.impactBody ||
        'The research provided the client with a clearer view of what customers value, what drives their financial decisions, and where their experiences fall short. These insights helped transform customer feedback into practical opportunities for improving products, experiences and future strategies.',
      image: cs.impactImage || localImage('csd-impact-bg.jpg', cs.title, 1800, 987),
      items: cs.impactItems.length > 0 ? cs.impactItems : FALLBACK_IMPACT_ITEMS,
    },
    related: {
      eyebrow: settings.detailRelatedEyebrow || 'Related Case Study',
      heading: settings.detailRelatedHeading || 'Discovering What Matters',
      body: settings.detailRelatedBody || 'Uncovering insights that drive smarter decisions.',
    },
    faqHeading: settings.detailFaqHeading || 'Frequently Asked Questions',
    faqItems: cs.faqItems.length > 0 ? cs.faqItems : FALLBACK_FAQ_ITEMS,
    bottomCta: {
      heading: settings.bottomCtaHeading || 'A Better Way to Understand Your Market',
      body: settings.bottomCtaBody || 'Your customers are already telling you what they expect. We help you listen, understand and act.',
      action: settings.bottomCtaAction || FALLBACK_BOTTOM_CTA_ACTION,
    },
  };
}
