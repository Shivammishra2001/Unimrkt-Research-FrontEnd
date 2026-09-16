/** /our-team's member cards — mirrors controllers/caseStudy.ts's
 * cache()-wrapped list shape. */
import { cache } from 'react';
import { getTeamMembers } from './strapi';
import { normalizeTeamMemberList } from './normalize';
import type { TeamMemberModel } from '@/models/teamMember';

export const getTeamMemberList = cache(async (): Promise<TeamMemberModel[]> => {
  return normalizeTeamMemberList(await getTeamMembers());
});
