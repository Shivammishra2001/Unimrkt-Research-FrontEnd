/**
 * Template + graceful fallback resolver for /our-team — Figma node
 * 1126:54624 ("Our Team", file foaJFuv0vRX8nD43o0ylgB), the SOLE source
 * of truth for this page. CMS-first: `resolveOurTeam()` prefers every
 * field from the `our-team-page` settings singleType and the
 * `team-member` collection, falling back per field/list to this node's
 * own verbatim copy below.
 *
 * Every string here — including all 19 member names/roles, in the
 * node's own exact top-to-bottom, left-to-right grid reading order —
 * is copied verbatim via get_design_context. No department or
 * social-link field is included anywhere: neither is drawn on any card
 * or in the "View Profile" modal (Figma node 1126:55196 -> the modal
 * card itself is 1126:56704).
 *
 * `bio`: that modal only ever draws ONE worked example — Anurag
 * Magoo's own bio paragraph, included verbatim below. No other member
 * has bio text drawn anywhere in the Figma file, so every other
 * member's `bio` is left undefined; TeamProfileModal.tsx omits the bio
 * paragraph entirely when it's empty rather than inventing filler copy
 * (same precedent as JobDetailsModal.tsx's section-by-section omission).
 */
import type { OurTeamPageSettings } from '@/models/ourTeamPage';
import type { TeamMemberModel } from '@/models/teamMember';
import type { ImageModel, LinkModel } from '@/models/domain';

const ASSET_DIR = '/images/our-team';

function localImage(filename: string, alt: string, width: number, height: number): ImageModel {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

const FALLBACK_HERO_IMAGE = localImage('team-hero-bg.jpg', 'Meet the Minds Behind Unimrkt', 1900, 926);

function member(idSuffix: string, name: string, role: string, photoFile: string, order: number, bio?: string): TeamMemberModel {
  return { id: `fallback-team-${idSuffix}`, name, role, photo: localImage(photoFile, name, 700, 860), order, bio };
}

const ANURAG_MAGOO_BIO =
  'Anurag Magoo is the Co-Founder of Unimrkt Research, with specializations in Key Account Management, Research Analysis, Strategy Planning & Execution, and Process Reengineering. He has a post-graduate diploma in Global Sales and Marketing and is also a qualified Six Sigma Green Belt executive. In addition, he has also been an internal auditor for ISO 20252 & ISO 9001. With over 26+ years of industry experience, he developed his early career with American Express and was the Head of Research Operations at Exevo for more than 9 years. Before joining Unimrkt, he was the Executive Director of Cimigo India.';

// 19 cards, verbatim, in the node's own top-to-bottom / left-to-right
// grid reading order (row 1: cols 1-4, row 2: cols 1-4, ... row 5: cols
// 1-3 only — the grid's last row has 3 cards, not 4, exactly as drawn).
const FALLBACK_MEMBERS: TeamMemberModel[] = [
  member('anurag-magoo', 'Anurag Magoo', 'Co-Founder', 'team-anurag-magoo.jpg', 1, ANURAG_MAGOO_BIO),
  member('sandeep-kumar', 'Sandeep Kumar', 'Co-Founder', 'team-sandeep-kumar.jpg', 2),
  member('kanishk-sheel', 'Kanishk Sheel', 'Co-Founder & Managing Director', 'team-kanishk-sheel.jpg', 3),
  member('james-west', 'James West', 'Managing Director - North America', 'team-james-west.jpg', 4),
  member('bharat-sharma', 'Bharat Sharma', 'Senior Director - Operations', 'team-bharat-sharma.jpg', 5),
  member('veronika-sharma', 'Veronika Sharma', 'Director - Client Services', 'team-veronika-sharma.jpg', 6),
  member('alex-parkman', 'Alex Parkman', 'Director – Sales, EMEA/UK', 'team-alex-parkman.jpg', 7),
  member('sanjay-kumar', 'Sanjay Kumar', 'Director - Strategy & Business Development', 'team-sanjay-kumar.jpg', 8),
  member('rahul-shah', 'Rahul Shah', 'Senior Manager – Business Development', 'team-rahul-shah.jpg', 9),
  member('chris-schaedel', 'Chris Schaedel', 'Senior Manager - Business Development', 'team-chris-schaedel.jpg', 10),
  member('robin-singh-chauhan', 'Robin Singh Chauhan', 'Associate Director - Risk & Compliance', 'team-robin-singh-chauhan.jpg', 11),
  member('vishal-pathak', 'Vishal Pathak', 'Head – Competitive Intelligence', 'team-vishal-pathak.jpg', 12),
  member('narender-vadhava', 'Narender Vadhava', 'Associate Director - Data Quality', 'team-narender-vadhava.jpg', 13),
  member('yashodhara-badoni-bhatt', 'Yashodhara Badoni Bhatt', 'Head – Voice Quality and Training', 'team-yashodhara-badoni-bhatt.jpg', 14),
  member('dashwant-singh', 'Dashwant Singh', 'Director - Client Services', 'team-dashwant-singh.jpg', 15),
  member('shradha-chauhan', 'Shradha Chauhan', 'Head - Operations', 'team-shradha-chauhan.jpg', 16),
  member('elliot-neziri', 'Elliot Neziri', 'Executive- Business Development', 'team-elliot-neziri.jpg', 17),
  member('julia-alves', 'Júlia Alves', 'Manager - Client Servicing', 'team-julia-alves.jpg', 18),
  member('krystal-richardson', 'Krystal Richardson', 'Manager - Business Development', 'team-krystal-richardson.jpg', 19),
];

const FALLBACK_BOTTOM_CTA_ACTION: LinkModel = {
  id: 'fallback-our-team-bottom-cta',
  label: 'Talk to Our Experts',
  href: '/contact',
  isExternal: false,
  variant: 'secondary',
};

export interface ResolvedOurTeam {
  hero: { eyebrow: string; heading: string; subheading: string; image?: ImageModel };
  membersHeading: string;
  members: TeamMemberModel[];
  bottomCta: { heading: string; body: string; action: LinkModel };
}

export function resolveOurTeam(members: TeamMemberModel[], settings: OurTeamPageSettings): ResolvedOurTeam {
  return {
    hero: {
      eyebrow: settings.heroEyebrow || 'Unimrkt Team',
      heading: settings.heroHeading || 'Meet the Minds\nBehind Unimrkt',
      subheading:
        settings.heroSubheading ||
        'A diverse team of research experts bringing experience, insight, and strategic thinking to every project.',
      image: settings.heroImage || FALLBACK_HERO_IMAGE,
    },
    membersHeading: settings.membersHeading || 'People. Expertise. Impact.',
    members: members.length > 0 ? members : FALLBACK_MEMBERS,
    bottomCta: {
      heading: settings.bottomCtaHeading || 'A Better Way to Understand Your Market',
      body:
        settings.bottomCtaBody ||
        'Your customers are already telling you what they expect.\n We help you listen, understand and act.',
      action: settings.bottomCtaAction || FALLBACK_BOTTOM_CTA_ACTION,
    },
  };
}
