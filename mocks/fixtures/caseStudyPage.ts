/**
 * A representative subset (1 approach step, 1 testimonial, 1 FAQ item,
 * not all 4/3/7) — matches this mocks/ directory's existing convention
 * (see ourCompanyPage.ts) of illustrative, not exhaustive, fixtures.
 */
import type { StrapiCaseStudyPageResponse } from '@/models/caseStudyPage';

export const MOCK_CASE_STUDY_PAGE_RESPONSE: StrapiCaseStudyPageResponse = {
  data: {
    heroEyebrow: 'CASE STUDIES',
    heroHeading: 'Turning Research Into Business Impact',
    heroSubheading: 'Unimrkt Research helps businesses uncover opportunities, understand consumers and make confident, data-driven decisions.',
    heroImage: null,
    heroCta: { id: 1, label: 'Explore Case Studies', href: '#case-studies', isExternal: false, variant: 'primary' },
    explorerEyebrow: 'Case Study Explorer',
    explorerHeading: 'Explore Our Research Stories',
    explorerBody: 'Discover how we solve complex research challenges across industries, markets and methodologies.',
    allLabel: 'All',
    industriesLabel: 'Industries',
    researchTypeLabel: 'Research Type',
    approachEyebrow: 'Our Approach',
    approachHeading: 'Every Case Study Starts With the Right Question',
    approachSteps: [{ id: 1, title: 'The Challenge', description: 'What business problem needed solving?', image: null, icon: null, iconIdentifier: null }],
    testimonialsEyebrow: 'Testimonial',
    testimonialsHeading: 'Trusted by Teams That Value Better Insights',
    testimonials: [
      {
        id: 1,
        heading: 'Expertise That Drives Better Decisions',
        quote: 'Unimrkt brought strong research expertise and a clear understanding of our business challenge.',
        roleLine: 'Marketing Director',
        orgLine: 'Consumer Brand',
      },
    ],
    listingFaqHeading: 'Frequently Asked Questions',
    listingFaqItems: [{ id: 1, question: 'What can I learn from a Unimrkt case study?', answer: 'Each case study walks through a real business challenge, the research methodology used, and the resulting insights.' }],
    aboutEyebrow: 'About Case Study',
    aboutHeading: 'Research That Creates Real Impact',
    aboutBody: 'Our case studies showcase how Unimrkt Research helps organizations navigate complex business challenges with meaningful, data-driven insights.',
    detailTrustHeading: 'Trusted by Global Businesses',
    detailChallengeEyebrow: 'The Challenge',
    detailChallengeNeedsLabel: 'Our client needed to understand:',
    detailResearchQuestionEyebrow: 'The Research Question',
    detailApproachEyebrow: 'Our Approach',
    detailUncoveredEyebrow: 'What We Uncovered',
    detailImpactEyebrow: 'The Impact',
    detailFaqHeading: 'Frequently Asked Questions',
    detailRelatedEyebrow: 'Related Case Study',
    detailRelatedHeading: 'Discovering What Matters',
    detailRelatedBody: 'Uncovering insights that drive smarter decisions.',
    bottomCtaHeading: 'A Better Way to Understand Your Market',
    bottomCtaBody: 'Your customers are already telling you what they expect. We help you listen, understand and act.',
    bottomCtaAction: { id: 2, label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
  },
  meta: {},
};
