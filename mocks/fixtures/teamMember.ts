/**
 * A representative subset (2 of 19 members) — matches this mocks/
 * directory's existing convention (see caseStudy.ts) of illustrative,
 * not exhaustive, fixtures.
 */
import type { StrapiTeamMemberListResponse } from '@/models/teamMember';

export const MOCK_TEAM_MEMBERS_RESPONSE: StrapiTeamMemberListResponse = {
  data: [
    {
      id: 1,
      name: 'Anurag Magoo',
      role: 'Co-Founder',
      photo: null,
      order: 1,
      bio: 'Anurag Magoo is the Co-Founder of Unimrkt Research, with specializations in Key Account Management, Research Analysis, Strategy Planning & Execution, and Process Reengineering.',
    },
    { id: 2, name: 'Sandeep Kumar', role: 'Co-Founder', photo: null, order: 2, bio: null },
  ],
  meta: {},
};
