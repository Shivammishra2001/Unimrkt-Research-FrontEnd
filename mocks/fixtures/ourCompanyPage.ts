/**
 * A representative subset (1 card per grid, not all 4/8) — matches this
 * mocks/ directory's existing convention (see servicesPage.ts) of
 * illustrative, not exhaustive, fixtures.
 */
import type { StrapiOurCompanyPageResponse } from '@/models/ourCompanyPage';

export const MOCK_OUR_COMPANY_PAGE_RESPONSE: StrapiOurCompanyPageResponse = {
  data: {
    heroEyebrow: 'Our Company',
    heroHeading: 'Research That Moves Business Forward',
    heroSubheading: 'Introduce Unimrkt as a global market research partner helping organisations understand people, markets, and opportunities.',
    heroImage: null,
    heroCta: { id: 1, label: 'Explore Our Capabilities', href: '/services', isExternal: false, variant: 'primary' },
    statsHeading: 'Research Without Borders',
    stats: [{ id: 1, value: '90+', label: 'Countries', iconIdentifier: 'global' }],
    aboutEyebrow: 'About Unimrkt',
    aboutHeading: 'We Turn Questions Into Clarity',
    aboutBody: 'Founded on 6 December 2009, Unimrkt Research has evolved into a trusted global market research partner.',
    aboutImage: null,
    insightsEyebrow: 'Why Businesses Choose Unimrkt',
    insightsHeading: 'Insights That Move Businesses Forward',
    insightsBody: 'Transforming complex data into clear, actionable insights.',
    insightsCards: [{ id: 1, title: 'Global Reach', description: 'Access diverse markets across continents.', image: null, icon: null, iconIdentifier: 'global' }],
    ecosystemEyebrow: 'Our Research Ecosystem',
    ecosystemHeading: 'From Question to Business Decision',
    ecosystemSubtext: 'A highly visual interactive journey:',
    ecosystemCards: [{ id: 1, title: 'Define', description: 'We define business challenges and research goals.', image: null, icon: null, iconIdentifier: 'inspection' }],
    valuesEyebrow: 'Our Values',
    valuesHeading: 'The Principles Behind Our Work',
    valuesBody: 'We believe that our values not only make us a reliable business partner and consumer research agency, but also a thoughtful one, with our focus on people, integrity, and long-term impact.',
    valuesCards: [{ id: 1, title: 'Clear Communication', description: 'We communicate openly, clearly, and consistently.', image: null, icon: null, iconIdentifier: 'chat' }],
    industriesEyebrow: 'Industries We Understand',
    industriesHeading: 'Deep Knowledge Across Diverse Industries',
    industriesBody: 'Industry-specific expertise that helps us understand complex markets.',
    industriesCards: [{ id: 1, title: 'Automotive', description: null, image: null, icon: null, iconIdentifier: null }],
    faqItems: [{ id: 1, question: 'What does Unimrkt Research do?', answer: 'We are a global market research and consulting firm.' }],
    aboutCompanyEyebrow: 'About Company',
    aboutCompanyHeading: 'Turning Market Questions Into Business Clarity',
    aboutCompanyBody: 'Unimrkt is a global market research and insights company helping businesses understand markets, consumers, and emerging opportunities.',
    seo: null,
  },
  meta: {},
};
