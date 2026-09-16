/**
 * Template + graceful fallback resolver for /privacy-policy — Figma node
 * 1114:50556 ("Privacy Policy", file foaJFuv0vRX8nD43o0ylgB), the SOLE
 * source of truth for this page. CMS-first: `resolvePrivacyPolicy()`
 * prefers every field from the `privacy-policy-page` settings singleType
 * and falls back, per field, to this node's own verbatim copy below.
 *
 * Every string in this file is copied verbatim from the node via
 * get_design_context — nothing paraphrased, summarized, or invented. The
 * node's own 12-item table of contents only has body copy drawn beneath
 * its first 2 entries (What qualifies as Personal Data / Lawful
 * Collection and Use of Personal Data, the latter with 3 bold
 * sub-headings — Registration of data and direct communication /
 * Participation in Panels / Legal obligations and legal defense). The
 * remaining 10 TOC entries render as plain list items with no matching
 * body section, exactly as drawn — no body content is fabricated for
 * them.
 */
import type {
  PrivacyPolicyPageSettings,
  PrivacyPolicyTocItemModel,
  PrivacyPolicyListItemModel,
} from '@/models/privacyPolicyPage';
import type { ImageModel } from '@/models/domain';

const ASSET_DIR = '/images/privacy-policy';

function localImage(filename: string, alt: string, width: number, height: number): ImageModel {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

const FALLBACK_HERO_IMAGE = localImage('pp-hero-bg.jpg', 'Built on Trust. Protected by Privacy.', 1900, 747);

function tocItem(idSuffix: string, label: string, anchor: string): PrivacyPolicyTocItemModel {
  return { id: `fallback-toc-${idSuffix}`, label, anchor };
}

function listItem(idSuffix: string, text: string): PrivacyPolicyListItemModel {
  return { id: `fallback-list-${idSuffix}`, text };
}

// "This Privacy Policy Defines and Regulates:" — 12 entries, verbatim.
const FALLBACK_TOC_ITEMS: PrivacyPolicyTocItemModel[] = [
  tocItem('qualifies', 'What qualifies as Personal Data', 'What-qualifies-as-Personal-Data'),
  tocItem('lawful', 'What Constitutes the Lawful Collection and Use of Personal Data', 'What-Constitutes-the-Lawful-Collection-and-Use-of-Personal-Data'),
  tocItem('disclosure', 'Disclosure of Personally Identifiable Information (PII)', 'Disclosure-of-Personally-Identifiable-Information'),
  tocItem('third-party-rights', 'Third Party Rights towards such Data and Data Transfer Protocols across Borders', 'Third-Party-Rights-towards-such-Data'),
  tocItem('security', 'Security of Personal Data', 'Security-of-Personal-Data'),
  tocItem('third-party-websites', 'Third Party Websites Usage of Data', 'Third-Party-Websites'),
  tocItem('accuracy', 'Accuracy of Personal Data and Estimation thereof', 'Accuracy-of-Personal-Data'),
  tocItem('international-transfers', 'International Transfers of Personal Data', 'International-Transfers-of-Personal-Data'),
  tocItem('retention', 'Retention of Your Personal Data', 'Retention-of-Your-Personal-Data'),
  tocItem('access', 'Access to Personal Data', 'Access-to-Personal-Data'),
  tocItem('changes', 'Changes to this Policy', 'Changes-to-this-Policy'),
  tocItem('contact', 'Contact Information', 'Contact-Information'),
];

const FALLBACK_LAWFUL_PURPOSES_LIST: PrivacyPolicyListItemModel[] = [
  listItem('purpose-1', 'To respond to requests made by the Users in terms of the use of the website and/or services provided by Unimrkt Research, including to provide services that have been requested by the User and also to allow the User to participate in activities that they may have chosen to participate in.'),
  listItem('purpose-2', 'To contact the User and/or to provide the User with general information as well as information about Unimrkt Research products and services from time to time'),
  listItem('purpose-3', 'To send the User marketing communications relating to Unimrkt Research’s business which may be regarded as being of interest to the User.'),
  listItem('purpose-4', 'To share with agents, contractors or partners of Unimrkt Research in connection with services that these individuals or entities perform for, or with, our firm and/or related businesses. However, it is clarified that these agents, contractors or partners are restricted from using the User’s Personal Data in any way other than to provide services for Unimrkt Research. Unimrkt Research may, for example, provide Personal Data submitted by the User to agents, contractors or partners for hosting their databases, for data processing services, or to send the User information that the User requested, but those parties cannot use the Users Personal Data for their own purposes unrelated to the work they are doing for Unimrkt Research.'),
  listItem('purpose-5', 'To respond to duly authorized information and statutory disclosure requests of governmental authorities or wherever required under applicable law.'),
  listItem('purpose-6', 'In connection with the sale, assignment, or other transfer of the business of this website to which the information relates, in which case Unimrkt Research shall require any such future Buyer to agree to treat the personal data in accordance with this privacy policy.'),
  listItem('purpose-7', 'Contact the User for studies via email, through mobile notifications or texts or any other proposed communication options'),
  listItem('purpose-8', 'Inform the User of updates to services, new features and details relevant to the User through communications sent from time-time'),
  listItem('purpose-9', 'Select the User for future studies and further lend adequate assistance to the User when the User contacts Unimrkt Research’s support team'),
  listItem('purpose-10', 'Allow us to reward the User with the incentives per Unimrkt Research Policy'),
  listItem('purpose-11', 'Protect Unimrkt Research from fraudulent behavior by investigating suspected activity in connection with the website or violation of another party’s rights'),
  listItem('purpose-12', 'Prevent multiple entries in studies by the same individuals'),
  listItem('purpose-13', 'Update, enrich and clean Unimrkt Research’s database to improve the usage of data, allowing for Unimrkt Research to better select and identify the User for studies and receiving communications'),
];

const FALLBACK_LAWFUL_BASIS_LIST: PrivacyPolicyListItemModel[] = [
  listItem('basis-1', 'Unimrkt Research has consent for the use of the User’s personal data'),
  listItem('basis-2', 'Unimrkt Research needs to use the User’s personal data in order to perform its contractual obligations with respect to the User,'),
  listItem('basis-3', 'Unimrkt Research needs to process User data to comply with its legal obligations under applicable law'),
  listItem('basis-4', 'Unimrkt Research needs to process the User’s data in order to protect the User’s vital interests in terms of contractual and statutory compliance requirements'),
  listItem('basis-5', 'Unimrkt Research may process User data if it is deemed necessary to perform a task in the public interest or where the use of the User’s personal data is deemed necessary for securing Unimrkt Research’s clients’ legitimate interests (in which case Unimrkt Research will first explain what those interests are to the User concerned)'),
];

const FALLBACK_PANEL_DATA_SOURCES_LIST: PrivacyPolicyListItemModel[] = [
  listItem('source-1', 'In the course of surveys, conducted online, via phone or face to face interaction, etc.;'),
  listItem('source-2', 'By way of automated data collection by hardware or software web-tracking and audience measurement means such as tracking applications, browser add-ons, TV meters and special internet routers (data regarding the User’s use of the Internet, streaming and social media platforms and other (online) media channels, as well as the User’s digital devices in general);'),
  listItem('source-3', 'Data the User actively provides Unimrkt Research during their participation (for example, by means of applications or devices (collectively referred to as "Panel Data")'),
];

export interface ResolvedPrivacyPolicy {
  hero: { eyebrow: string; heading: string; subheading: string; image?: ImageModel };
  introBody: string;
  toc: { heading: string; items: PrivacyPolicyTocItemModel[] };
  qualifies: { heading: string; body: string };
  lawful: {
    heading: string;
    intro: string;
    purposesList: PrivacyPolicyListItemModel[];
    basisIntro: string;
    basisList: PrivacyPolicyListItemModel[];
    closing: string;
  };
  registration: { heading: string; body: string };
  panel: { heading: string; intro: string; dataSourcesList: PrivacyPolicyListItemModel[]; closing: string };
  legal: { heading: string; body: string };
}

export function resolvePrivacyPolicy(settings: PrivacyPolicyPageSettings): ResolvedPrivacyPolicy {
  return {
    hero: {
      eyebrow: settings.heroEyebrow || 'Privacy Policy',
      heading: settings.heroHeading || 'Built on Trust.\nProtected by Privacy.',
      subheading:
        settings.heroSubheading ||
        'Your data deserves transparency, security and responsible handling. Explore how we protect your information and respect your privacy.',
      image: settings.heroImage || FALLBACK_HERO_IMAGE,
    },
    introBody:
      settings.introBody ||
      [
        'Unimrkt Research respects the privacy of visitors to its websites. Unimrkt Research (also referred to as “Company”, “we” or “our”) respects the relationships, we have with our customers and respects the privacy of all individuals, whose Personal Information may be processed by Unimrkt Research in the performance of our services and our business operations.',
        'This Policy explains how Unimrkt Research collects, holds, uses and discloses Personal Information, including personal Information of our personnel, consumers, business professionals, customers, suppliers, vendors, business partners and investors. Unimrkt Research intends that this privacy policy read along with its standard terms, conditions and procedures will support timely compliance with all applicable local as well as international privacy laws and regulations around the world including, but not limited to, the Data Protection Regime under Indian Law and EU General Data Protection Regulation (“GDPR”).',
        'This privacy policy applies between you, the User of this Website and Unimrkt Research, the owner and provider of this Website. This privacy policy applies to our use of any and all Data collected by us or provided by you in relation to your use of our Website.',
        'This privacy policy should be read alongside, and in addition to, Unimrkt Research’s standard Terms, Conditions and Practice Procedures followed by them in rendering services.',
        'Please read this privacy policy carefully before proceeding.',
      ].join('\n\n'),
    toc: {
      heading: settings.tocHeading || 'This Privacy Policy Defines and Regulates:',
      items: settings.tocItems.length > 0 ? settings.tocItems : FALLBACK_TOC_ITEMS,
    },
    qualifies: {
      heading: settings.qualifiesHeading || 'What qualifies as Personal Data',
      body:
        settings.qualifiesBody ||
        [
          'Personal data are information that directly or indirectly identifies you as an individual, indirectly meaning when combined with other information, for example, your name, postal address, email address and phone number, or a unique device identifier.',
          'Through this website, Unimrkt Research may collect information that can specifically identify you- the user, such as your name, address, telephone number and e-mail address when you chose to yourself voluntarily submit the same. It is clarified that Unimrkt Research does not impose any mandatory condition for the aforesaid submission of your personal data which is voluntarily undertaken by you – the User.',
        ].join('\n\n'),
    },
    lawful: {
      heading: settings.lawfulHeading || 'Lawful Collection and Use of Personal Data',
      intro:
        settings.lawfulIntro ||
        [
          'Unimrkt Research collects information in multiple ways including from the use of this website as well as other activities such as telephone studies, face to face, online and social media interactions, etc.. Unimrkt shall only use personal data submitted by the User, as set forth in this privacy policy and further subject to the User’s express consent recorded duly in the submission form issued for such purpose. Once submitted Unimrkt may use and disclose such voluntarily submitted data of the User for any of the following reasons:',
          'In the event that Unimrkt Research intends or choses to use or apply the User’s personal data, so collected, in any manner other than what was consented to by the User, Unimrkt Research shall inform the intended User in advance and in such cases where the processing is based on the User’s further consent, use the User’s personal data for a different purpose only with the User’s permission:',
        ].join('\n\n'),
      purposesList: settings.lawfulPurposesList.length > 0 ? settings.lawfulPurposesList : FALLBACK_LAWFUL_PURPOSES_LIST,
      basisIntro:
        settings.lawfulBasisIntro ||
        'In terms of the Privacy Policy Unimrkt Research has further set out, below more detailed information about how they utilize personal data. The legal basis for data being processed at the receiver’s end i.e. Unimrkt Research’s end is listed as below:',
      basisList: settings.lawfulBasisList.length > 0 ? settings.lawfulBasisList : FALLBACK_LAWFUL_BASIS_LIST,
      closing:
        settings.lawfulClosing ||
        [
          'Unimrkt Research being a responsible and law-abiding corporate entity undertakes not to misrepresent its services, data or scope of operations, at any time and in the event any contrary or mischievous email that concerns the User directly or indirectly, is received by the User purportedly from Unimrkt Research, the User is required to forthwith inform and intimate Unimrkt Research in this regard in order to avoid any unforeseeable and/or damaging circumstances from arising.',
          'In addition to and in terms of the foregoing Privacy Policy Unimrkt Research will also be entitled to use the personal data submitted by the User for the purposes as described below. It is re-iterated that Unimrkt Research does not collect and process more or other types of personal data than is deemed necessary by them in terms of fulfilling their respective purposes and or contractual or statutory compliance.',
        ].join('\n\n'),
    },
    registration: {
      heading: settings.registrationHeading || 'Registration of data and direct communication',
      body:
        settings.registrationBody ||
        'For the many services offered by Unimrkt Research they collect your personal data, like: name, postal address, phone number and email address (“Registration Data”). The User data so collected is termed as Registration Data and is utilized by Unimrkt Research to communicate with the User about the services and also to update and inform them from time-time about their policies and terms, conditions and procedures for service. Unimrkt Research also uses the User’s Registration Data as well as the content of their communication to respond to the User whenever the User contacts them.',
    },
    panel: {
      heading: settings.panelHeading || 'Participation in Panels',
      intro:
        settings.panelIntro ||
        [
          'If the User chooses to participate in a panel, Unimrkt Research will, in addition to the Registration Data, collect any other relevant information, additional data including personal data as well as such fee as it deems necessary for the purpose of enabling such participation.',
          'For instance, Unimrkt Research collects such personal data:',
        ].join('\n\n'),
      dataSourcesList: settings.panelDataSourcesList.length > 0 ? settings.panelDataSourcesList : FALLBACK_PANEL_DATA_SOURCES_LIST,
      closing:
        settings.panelClosing ||
        'Unimrkt further reserves the right to analyze and evaluate such Panel Data, aggregate the Panel Data with the Panel Data of other participants and use the Panel Data for market research purposes.',
    },
    legal: {
      heading: settings.legalHeading || 'Legal obligations and legal defense',
      body:
        settings.legalBody ||
        'Unimrkt Research may be required to use and retain personal data for legal and compliance reasons, such as the prevention, detection, or investigation of a crime, loss prevention, fraud or any other abuse of their services and IT systems. Unimrkt Research may also use the User’s personal data to meet its internal and external audit requirements, information security purposes or to protect or enforce their rights of privacy, safety, or property, or those of other persons that may be encountered for the purposes set out or contractual or statutory requirements and their compliance.',
    },
  };
}
