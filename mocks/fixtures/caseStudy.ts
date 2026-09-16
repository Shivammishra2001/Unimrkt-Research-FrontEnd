/**
 * A representative subset (2 of the 6 seeded cards) — matches this
 * mocks/ directory's existing convention (see ourCompanyPage.ts,
 * workWithUsPage.ts) of illustrative, not exhaustive, fixtures. Only
 * the first entry carries detail-page content (Figma node
 * 1107:49842) — matches the real seed data's "one real example, base
 * fields only for the rest" convention.
 */
import type { StrapiCaseStudy, StrapiCaseStudyListResponse, StrapiCaseStudyDetailResponse } from '@/models/caseStudy';

const EMPTY_DETAIL_FIELDS = {
  heroSubheading: null,
  heroImage: null,
  trustLogos: [],
  challengeHeading: null,
  challengeBody: null,
  challengeBullets: null,
  challengeClosing: null,
  challengePhoto: null,
  researchQuestionHeading: null,
  researchQuestionBody: null,
  researchQuestionItems: [],
  approachHeading: null,
  approachBody: null,
  approachSteps: [],
  uncoveredHeading: null,
  uncoveredBody: null,
  uncoveredPanels: [],
  impactHeading: null,
  impactBody: null,
  impactImage: null,
  impactItems: [],
  faqItems: [],
} satisfies Partial<StrapiCaseStudy>;

const MOCK_CASE_STUDY_BANKING: StrapiCaseStudy = {
  id: 1,
  slug: 'understanding-customer-expectations-in-a-changing-financial-market',
  title: 'Understanding Customer Expectations in a Changing Financial Market',
  excerpt: 'Uncover evolving customer needs and expectations shaping today’s financial landscape.',
  category: 'BANKING & FINANCE',
  coverImage: null,
  ...EMPTY_DETAIL_FIELDS,
  heroSubheading:
    'How research uncovered evolving customer needs, digital expectations, and decision-making drivers to help a financial services organization strengthen its customer strategy.',
  challengeHeading: 'Financial Expectations Were Changing Faster Than Ever',
  challengeBody:
    'As financial services become increasingly digital, customers expect more than competitive products. They want simplicity, transparency, personalization, speed, and seamless experiences across every interaction.',
  challengeBullets: [
    'What customers truly value when choosing financial services',
    'How expectations differ across customer segments',
  ],
};

const MOCK_CASE_STUDY_HEALTHCARE: StrapiCaseStudy = {
  id: 2,
  slug: 'mapping-patient-needs-across-the-healthcare-journey',
  title: 'Mapping Patient Needs Across the Healthcare Journey',
  excerpt: 'Understand patient needs across every healthcare touchpoint.',
  category: 'HEALTHCARE',
  coverImage: null,
  ...EMPTY_DETAIL_FIELDS,
};

export const MOCK_CASE_STUDIES_RESPONSE: StrapiCaseStudyListResponse = {
  data: [MOCK_CASE_STUDY_BANKING, MOCK_CASE_STUDY_HEALTHCARE],
  meta: {},
};

export function mockCaseStudyDetailResponse(slug: string): StrapiCaseStudyDetailResponse | null {
  const match = [MOCK_CASE_STUDY_BANKING, MOCK_CASE_STUDY_HEALTHCARE].find((cs) => cs.slug === slug);
  return match ? { data: match, meta: {} } : null;
}

export const MOCK_CASE_STUDY_SLUGS_RESPONSE = {
  data: [MOCK_CASE_STUDY_BANKING, MOCK_CASE_STUDY_HEALTHCARE].map((cs) => ({ id: cs.id, slug: cs.slug, updatedAt: new Date().toISOString() })),
  meta: {},
};
