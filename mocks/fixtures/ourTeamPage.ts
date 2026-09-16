import type { StrapiOurTeamPageResponse } from '@/models/ourTeamPage';

export const MOCK_OUR_TEAM_PAGE_RESPONSE: StrapiOurTeamPageResponse = {
  data: {
    heroEyebrow: 'Unimrkt Team',
    heroHeading: 'Meet the Minds\nBehind Unimrkt',
    heroSubheading: 'A diverse team of research experts bringing experience, insight, and strategic thinking to every project.',
    heroImage: null,
    membersHeading: 'People. Expertise. Impact.',
    bottomCtaHeading: 'A Better Way to Understand Your Market',
    bottomCtaBody: 'Your customers are already telling you what they expect.\n We help you listen, understand and act.',
    bottomCtaAction: { id: 1, label: 'Talk to Our Experts', href: '/contact', isExternal: false, variant: 'secondary' },
    seo: null,
  },
  meta: {},
};
