/**
 * Template + graceful fallback resolver for /work-with-us — same
 * architecture as views/contact/fallback.ts: Priority 1 is the CMS's
 * own `work-with-us-page` singleType data; Priority 2 is Figma node
 * 924:23216's own verbatim copy (file foaJFuv0vRX8nD43o0ylgB).
 *
 * 2 disclosed exceptions, matching what upsertWorkWithUsPageSettings()
 * (backend/scripts/seed.ts) already documents:
 *   1. valuesCards are the exact same 8 "Core Values" cards as
 *      /our-company's Values section (confirmed identical in Dev Mode)
 *      — real shared content, not invented, just a different card style
 *      on this page.
 *   2. journeySteps: 3 of the 4 cards (Apply/Connect/Interview) have
 *      copy-pasted description text lifted from an unrelated section —
 *      authored sensible, distinct descriptions instead; "Join" is
 *      verbatim.
 */
import type { WorkWithUsSettings, JobListingModel } from '@/models/workWithUsPage';
import type { FaqItemModel, LinkModel } from '@/models/domain';
import type { IndustryDetailCardModel } from '@/models/industry';

const ASSET_DIR = '/images/work-with-us';

function localImage(filename: string, alt: string, width: number, height: number) {
  return { src: `${ASSET_DIR}/${filename}`, alt, width, height };
}

function card(idSuffix: string, title: string, description: string, iconIdentifier: string): IndustryDetailCardModel {
  return { id: `fallback-${idSuffix}`, title, description, iconIdentifier };
}

function benefitCard(idSuffix: string, title: string, iconIdentifier: string): IndustryDetailCardModel {
  return { id: `fallback-benefit-${idSuffix}`, title, iconIdentifier };
}

const FALLBACK_HERO_CTA: LinkModel = { id: 'fallback-hero-cta', label: 'Explore Open Positions', href: '#open-positions', isExternal: false, variant: 'primary' };

const FALLBACK_VALUES_CARDS: IndustryDetailCardModel[] = [
  card('values-communication', 'Clear Communication', 'We communicate openly, clearly, and consistently to build trust and ensure shared understanding.', 'chat'),
  card('values-innovation', 'Innovation', 'We embrace new ideas, technologies, and approaches to deliver smarter, more effective research solutions.', 'idea'),
  card('values-wisdom', 'Wisdom', 'We apply knowledge, experience, and thoughtful judgment to create smarter business outcomes.', 'intelligence'),
  card('values-integrity', 'Integrity', 'We uphold honesty, transparency, and ethical practices across every project, partnership, and decision.', 'network'),
  card('values-teamwork', 'Team Work', 'We collaborate closely, combining diverse expertise to deliver stronger insights and better outcomes.', 'teamwork'),
  card('values-ethics', 'Business Ethics', 'We conduct business responsibly, ethically, and transparently, building lasting trust with every stakeholder.', 'ethics'),
  card('values-diversity', 'Diversity', 'We value diverse perspectives, experiences, and ideas to create stronger, more inclusive outcomes.', 'cultural-diversity'),
  card('values-transparency', 'Transparency', 'We communicate openly, share information clearly, and build trust through every interaction.', 'transparency'),
];

const FALLBACK_BENEFITS: IndustryDetailCardModel[] = [
  benefitCard('sars', 'Stock Appreciation Rights (SARs)', 'chart'),
  benefitCard('comp-off', 'Compensatory-Off Reimbursement', 'wallet-add'),
  benefitCard('bonus', 'Annual Bonus', 'star'),
  benefitCard('internal-job', 'Internal Job Posting', 'briefcase'),
  benefitCard('mediclaim', 'Mediclaim', 'pill-combination'),
  benefitCard('transport', 'Transport Facility', 'transport'),
  benefitCard('leave', 'Leave Encashment', 'task-square'),
  benefitCard('meal', 'Meal Facility', 'dinner'),
];

const FALLBACK_JOBS: JobListingModel[] = [
  { id: 'fallback-job-executive', title: 'Executive – Language & Communication', location: 'Gurugram, India', jobType: 'Full Time', department: 'Training', postedDate: '12 Aug 2026' },
  { id: 'fallback-job-primary', title: 'Associate – Primary Research', location: 'Gurugram, India', jobType: 'Full Time', department: 'Operations', postedDate: '12 Aug 2026' },
  { id: 'fallback-job-secondary', title: 'Associate - Secondary Research', location: 'Gurugram, India', jobType: 'Full Time', department: 'Operations', postedDate: '12 Aug 2026' },
  { id: 'fallback-job-sales', title: 'Assistant Manager – India Sales', location: 'Gurugram, India', jobType: 'Full Time', department: 'India Research', postedDate: '12 Aug 2026' },
];

const FALLBACK_JOURNEY_STEPS: IndustryDetailCardModel[] = [
  card('journey-apply', 'Apply', 'Submit your application and resume for the role that matches your skills and interests.', 'clipboard-tick'),
  card('journey-connect', 'Connect', 'Our HR team reviews your profile and reaches out if you are shortlisted for the role.', 'profile-2user'),
  card('journey-interview', 'Interview', 'Meet the team to discuss your experience, skills, and fit for the position.', 'user-tag'),
  card('journey-join', 'Join', 'Welcome to Unimrkt! Let’s make an impact together.', 'briefcase'),
];

const FALLBACK_FAQ_ITEMS: FaqItemModel[] = [
  { id: 'fallback-faq-types', question: 'What types of career opportunities are available at Unimrkt?', answer: 'We hire across research operations, primary and secondary research, sales, and training, with roles spanning entry-level to management positions.' },
  { id: 'fallback-faq-apply', question: 'How can I apply for a job at Unimrkt?', answer: 'Browse our open positions above and click "Apply Now" on any role, or email your resume directly to careers@unimrkt.com.' },
  { id: 'fallback-faq-no-opening', question: 'Can I apply if there is no suitable opening?', answer: 'Yes — you can still send your resume to careers@unimrkt.com and our HR team will reach out if a matching role opens up.' },
  { id: 'fallback-faq-process', question: 'What is the recruitment process at Unimrkt?', answer: 'After you apply, our HR team reviews your profile, shortlisted candidates are invited to interview with the team, and successful candidates receive an offer to join.' },
  { id: 'fallback-faq-skills', question: 'What skills does Unimrkt look for in candidates?', answer: 'We look for curiosity, analytical thinking, and a genuine interest in research, alongside the specific skills each role requires.' },
  { id: 'fallback-faq-fees', question: 'Does Unimrkt charge any recruitment or onboarding fees?', answer: 'No — our recruitment and onboarding processes are entirely free of charge. We never ask candidates for payment at any stage.' },
  { id: 'fallback-faq-genuine', question: 'How will I know if a job opportunity is genuine?', answer: 'Genuine Unimrkt communication only comes from @unimrkt.com, @unimrkthealth.com, or @unimrktresponse.com email domains — see the disclaimer above for full details.' },
];

export interface ResolvedWorkWithUs {
  hero: { eyebrow: string; heading: string; subheading: string; image: WorkWithUsSettings['heroImage']; cta: LinkModel };
  values: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  benefits: { eyebrow: string; heading: string; body: string; label: string; image: WorkWithUsSettings['benefitsImage']; items: IndustryDetailCardModel[] };
  jobs: { eyebrow: string; heading: string; body: string; items: JobListingModel[] };
  journey: { eyebrow: string; heading: string; body: string; items: IndustryDetailCardModel[] };
  joinUs: { heading: string; body: string };
  disclaimer: { heading: string; body: string };
  faqItems: FaqItemModel[];
  aboutCareers: { eyebrow: string; heading: string; body: string };
}

export function resolveWorkWithUs(settings: WorkWithUsSettings): ResolvedWorkWithUs {
  return {
    hero: {
      eyebrow: settings.heroEyebrow || 'Careers',
      heading: settings.heroHeading || 'Great People Build Great Research',
      subheading:
        settings.heroSubheading ||
        'At Unimrkt, we give our employees a space to learn, grow and innovate. If you’re passionate about research, data and making an impact you’ll feel right at home here.',
      image: settings.heroImage || localImage('wwu-hero-bg.jpg', 'Great People Build Great Research', 1900, 768),
      cta: settings.heroCta || FALLBACK_HERO_CTA,
    },
    values: {
      eyebrow: settings.valuesEyebrow || 'Core Values of Unimrkt',
      heading: settings.valuesHeading || 'What Drives Us',
      body: settings.valuesBody || 'Our values shape the way we work, collaborate and create impact every day.',
      items: settings.valuesCards.length > 0 ? settings.valuesCards : FALLBACK_VALUES_CARDS,
    },
    benefits: {
      eyebrow: settings.benefitsEyebrow || 'WHY JOIN UNIMRKT',
      heading: settings.benefitsHeading || 'More Than Just a Job',
      body:
        settings.benefitsBody ||
        'We believe in supporting your well-being, growth and future. That’s why we offer a range of benefits that help you thrive personally and professionally.',
      label: settings.benefitsLabel || 'Benefits:',
      image: settings.benefitsImage || localImage('wwu-benefits-photo.jpg', 'More Than Just a Job', 900, 620),
      items: settings.benefits.length > 0 ? settings.benefits : FALLBACK_BENEFITS,
    },
    jobs: {
      eyebrow: settings.jobsEyebrow || 'OPEN POSITIONS',
      heading: settings.jobsHeading || 'Find Your Next Opportunity',
      body:
        settings.jobsBody ||
        'Explore roles across different departments and take the next step in your career journey with Unimrkt.',
      items: settings.jobs.length > 0 ? settings.jobs : FALLBACK_JOBS,
    },
    journey: {
      eyebrow: settings.journeyEyebrow || 'YOUR CAREER JOURNEY',
      heading: settings.journeyHeading || 'Grow With Purpose',
      body:
        settings.journeyBody ||
        'From day one, you’re supported with the right tools, training and opportunities to build a meaningful career.',
      items: settings.journeySteps.length > 0 ? settings.journeySteps : FALLBACK_JOURNEY_STEPS,
    },
    joinUs: {
      heading: settings.joinUsHeading || 'Join Us',
      body:
        settings.joinUsBody ||
        'To apply for the job opening, please send your resume and relevant details to careers@unimrkt.com. Our HR team will review your application and contact you if your profile is shortlisted for the position. Please note that due to the high volume of applications we receive, we may not be able to respond to every inquiry. Thank you for your interest in joining Unimrkt — we look forward to the possibility of working together!',
    },
    disclaimer: {
      heading: settings.disclaimerHeading || 'Disclaimer : Beware of Fraud',
      body:
        settings.disclaimerBody ||
        'At Unimrkt, we ensure that our prospective candidates and employees are informed about potential fraudulent activities. It is important to note that we do not levy fees or require any form of payment for our recruitment and onboarding processes. These processes are entirely free of charge. We urge you to exercise caution and verify the authenticity of emails by checking the email domain. Unimrkt email domain names are @unimrkt.com, @unimrkthealth.com, and @unimrktresponse.com. We do not send interview emails or offer letters through any other email domains like @gmail.com, @yahoo.com etc. We take fraud seriously and have implemented measures to safeguard our candidates and employees against deception or scams. However, if you encounter any suspicious activity or receive any communication that appears suspicious or requests payment, please refrain from responding and promptly notify us at +91 124 424 5210. Our commitment lies in providing a transparent and fair recruitment process, and we do not tolerate any form of fraud or unethical behavior.',
    },
    faqItems: settings.faqItems.length > 0 ? settings.faqItems : FALLBACK_FAQ_ITEMS,
    aboutCareers: {
      eyebrow: settings.aboutCareersEyebrow || 'ABOUT CAREERS',
      heading: settings.aboutCareersHeading || 'Build Your Career. Create Meaningful Impact.',
      body:
        settings.aboutCareersBody ||
        'At Unimrkt Research, we believe great work starts with great people. We provide an environment where curious minds can learn, collaborate, innovate, and grow while working on meaningful research projects that shape business decisions. Whether you’re starting your career or looking for your next opportunity, you’ll find opportunities to develop your skills, take on new challenges, and be part of a team that values integrity, collaboration, innovation, and continuous learning.',
    },
  };
}
