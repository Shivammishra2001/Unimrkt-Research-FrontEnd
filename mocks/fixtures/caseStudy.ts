/**
 * A representative subset (2 of the 6 seeded cards) — matches this
 * mocks/ directory's existing convention (see ourCompanyPage.ts,
 * workWithUsPage.ts) of illustrative, not exhaustive, fixtures.
 */
import type { StrapiCaseStudyListResponse } from '@/models/caseStudy';

export const MOCK_CASE_STUDIES_RESPONSE: StrapiCaseStudyListResponse = {
  data: [
    {
      id: 1,
      title: 'Understanding Customer Expectations in a Changing Financial Market',
      excerpt: 'Uncover evolving customer needs and expectations shaping today’s financial landscape.',
      category: 'BANKING & FINANCE',
      coverImage: null,
    },
    {
      id: 2,
      title: 'Mapping Patient Needs Across the Healthcare Journey',
      excerpt: 'Understand patient needs across every healthcare touchpoint.',
      category: 'HEALTHCARE',
      coverImage: null,
    },
  ],
  meta: {},
};
