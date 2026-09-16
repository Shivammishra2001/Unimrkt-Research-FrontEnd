/**
 * A representative subset (1 TOC item, 1 item per list, not all
 * 12/13/5/3) — matches this mocks/ directory's existing convention (see
 * caseStudyPage.ts) of illustrative, not exhaustive, fixtures.
 */
import type { StrapiPrivacyPolicyPageResponse } from '@/models/privacyPolicyPage';

export const MOCK_PRIVACY_POLICY_PAGE_RESPONSE: StrapiPrivacyPolicyPageResponse = {
  data: {
    heroEyebrow: 'Privacy Policy',
    heroHeading: 'Built on Trust.\nProtected by Privacy.',
    heroSubheading: 'Your data deserves transparency, security and responsible handling. Explore how we protect your information and respect your privacy.',
    heroImage: null,
    introBody: 'Unimrkt Research respects the privacy of visitors to its websites.\n\nPlease read this privacy policy carefully before proceeding.',
    tocHeading: 'This Privacy Policy Defines and Regulates:',
    tocItems: [{ id: 1, label: 'What qualifies as Personal Data', anchor: 'What-qualifies-as-Personal-Data' }],
    qualifiesHeading: 'What qualifies as Personal Data',
    qualifiesBody: 'Personal data are information that directly or indirectly identifies you as an individual.',
    lawfulHeading: 'Lawful Collection and Use of Personal Data',
    lawfulIntro: 'Unimrkt Research collects information in multiple ways including from the use of this website.',
    lawfulPurposesList: [{ id: 1, text: 'To respond to requests made by the Users in terms of the use of the website and/or services provided by Unimrkt Research.' }],
    lawfulBasisIntro: 'In terms of the Privacy Policy Unimrkt Research has further set out, below more detailed information about how they utilize personal data.',
    lawfulBasisList: [{ id: 1, text: 'Unimrkt Research has consent for the use of the User’s personal data' }],
    lawfulClosing: 'Unimrkt Research being a responsible and law-abiding corporate entity undertakes not to misrepresent its services.',
    registrationHeading: 'Registration of data and direct communication',
    registrationBody: 'For the many services offered by Unimrkt Research they collect your personal data, like: name, postal address, phone number and email address.',
    panelHeading: 'Participation in Panels',
    panelIntro: 'If the User chooses to participate in a panel, Unimrkt Research will collect any other relevant information.',
    panelDataSourcesList: [{ id: 1, text: 'In the course of surveys, conducted online, via phone or face to face interaction, etc.;' }],
    panelClosing: 'Unimrkt further reserves the right to analyze and evaluate such Panel Data.',
    legalHeading: 'Legal obligations and legal defense',
    legalBody: 'Unimrkt Research may be required to use and retain personal data for legal and compliance reasons.',
    seo: null,
  },
  meta: {},
};
