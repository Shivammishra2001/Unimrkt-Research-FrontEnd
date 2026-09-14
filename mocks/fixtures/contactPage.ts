/**
 * A representative subset (1 of 3 offices, 1 of 5 FAQ items) — matches
 * this mocks/ directory's existing convention (see ourCompanyPage.ts)
 * of illustrative, not exhaustive, fixtures.
 */
import type { StrapiContactPageResponse } from '@/models/contactPage';

export const MOCK_CONTACT_PAGE_RESPONSE: StrapiContactPageResponse = {
  data: {
    heroEyebrow: 'Contact Us',
    heroHeading: 'Let’s Turn Your Business Questions Into Clear Answers',
    heroSubheading: 'Tell us what you’re trying to understand. Our research experts will help you find the right path forward.',
    heroImage: null,
    heroCta: { id: 1, label: 'Start a Conversation', href: '#contact-form', isExternal: false, variant: 'primary' },
    statsHeading: 'Research at a Global Scale',
    stats: [{ id: 1, value: '90+', label: 'Countries', iconIdentifier: 'global' }],
    officeEyebrow: 'Office Address',
    officeHeading: 'Our Presence',
    offices: [
      {
        id: 1,
        name: 'India Office',
        address: '5th floor, Nimai Tower, 412-415, Udyog Vihar, Phase IV, Gurugram, Haryana-122015',
        email: 'sales@unimrkt.com',
        phone: '+91 124 424 5210, +91 9870 377 557',
        phoneLabel: 'Sales & Business Queries:',
        featured: true,
        image: null,
      },
    ],
    formEyebrow: 'Contact Form',
    formHeading: 'Let’s Team Up!',
    formSubheading: 'Interested in high-end, extensive market research for your brand?',
    formImage: null,
    faqItems: [{ id: 1, question: 'How can I contact Unimrkt Research for market research services?', answer: 'You can reach us through the contact form on this page, by emailing sales@unimrkt.com, or by calling any of our regional offices.' }],
    workWithUsHeading: 'Work With unimrkt',
    workWithUsBody: 'We offer the best infrastructure for our employees to learn and grow with us.',
    workWithUsCta: { id: 2, label: 'Apply Now', href: '/work-with-us', isExternal: false, variant: 'primary' },
    workWithUsImage: null,
    seo: null,
  },
  meta: {},
};
