/**
 * A representative subset (1 value prop, 1 workflow step, 1 FAQ item) —
 * matches this mocks/ directory's existing convention (see services.ts's
 * MOCK_SERVICE_TREE_RESPONSE) of illustrative, not exhaustive, fixtures.
 */
import type { StrapiServicesPageResponse } from '@/models/servicesPage';

export const MOCK_SERVICES_PAGE_RESPONSE: StrapiServicesPageResponse = {
  data: {
    hero: {
      eyebrow: 'OUR SERVICES',
      heading: 'Research Solutions That Drive Business Growth',
      subheading:
        'Helping organizations transform data into actionable insights through comprehensive market research and business intelligence.',
      media: null,
      actions: [{ id: 1, label: 'Get a Free Quote', href: '/contact', isExternal: false, variant: 'primary' }],
    },
    introEyebrow: 'ABOUT OUR SERVICES',
    introHeading: 'Comprehensive Research Solutions For Smarter Business Decisions',
    introParagraph1: 'At Unimrkt Research, we provide end-to-end market research services.',
    introParagraph2: 'Backed by experienced researchers and global capabilities.',
    valuePropsHeading: 'Why Choose Unimrkt?',
    valuePropsBody: 'With 16+ years of expertise, Unimrkt delivers accurate insights.',
    valuePropsBackground: null,
    valueProps: [
      {
        id: 1,
        title: 'Research Excellence',
        description: '',
        icon: null,
        link: null,
        iconIdentifier: 'trophy',
        statValue: '16+ Years',
        statLabel: 'of Research Excellence',
        order: 0,
      },
    ],
    workflow: {
      eyebrow: 'WORKFLOW',
      heading: 'Research Process',
      subheading: 'Our proven research process combines strategic planning and rigorous analysis.',
      steps: [
        {
          id: 1,
          stepNumber: '01',
          title: 'Discover Your Objectives',
          description: 'Aligning research goals and business context to establish clear project milestones.',
          icon: null,
          iconIdentifier: 'inspection',
          order: 0,
        },
      ],
    },
    faq: {
      heading: 'Frequently Asked Questions',
      background: null,
      items: [
        {
          id: 1,
          question: 'What services does Unimrkt Research provide?',
          answer: 'Unimrkt Research provides comprehensive qualitative and quantitative research.',
        },
      ],
    },
    cta: {
      heading: 'Start Your Research Journey',
      body: 'Partner with Unimrkt Research to uncover actionable market intelligence.',
      actions: [{ id: 2, label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' }],
      background: null,
    },
  },
  meta: {},
};
