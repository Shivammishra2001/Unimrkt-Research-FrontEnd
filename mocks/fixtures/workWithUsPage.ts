/**
 * A representative subset (1 card per grid, 1 job, 1 FAQ item) — matches
 * this mocks/ directory's existing convention (see ourCompanyPage.ts) of
 * illustrative, not exhaustive, fixtures.
 */
import type { StrapiWorkWithUsPageResponse } from '@/models/workWithUsPage';

export const MOCK_WORK_WITH_US_PAGE_RESPONSE: StrapiWorkWithUsPageResponse = {
  data: {
    heroEyebrow: 'Careers',
    heroHeading: 'Great People Build Great Research',
    heroSubheading: 'At Unimrkt, we give our employees a space to learn, grow and innovate.',
    heroImage: null,
    heroCta: { id: 1, label: 'Explore Open Positions', href: '#open-positions', isExternal: false, variant: 'primary' },
    valuesEyebrow: 'Core Values of Unimrkt',
    valuesHeading: 'What Drives Us',
    valuesBody: 'Our values shape the way we work, collaborate and create impact every day.',
    valuesCards: [{ id: 1, title: 'Clear Communication', description: 'We communicate openly, clearly, and consistently.', image: null, icon: null, iconIdentifier: 'chat' }],
    benefitsEyebrow: 'WHY JOIN UNIMRKT',
    benefitsHeading: 'More Than Just a Job',
    benefitsBody: 'We believe in supporting your well-being, growth and future.',
    benefitsLabel: 'Benefits:',
    benefitsImage: null,
    benefits: [{ id: 1, title: 'Stock Appreciation Rights (SARs)', description: null, image: null, icon: null, iconIdentifier: 'chart' }],
    jobsEyebrow: 'OPEN POSITIONS',
    jobsHeading: 'Find Your Next Opportunity',
    jobsBody: 'Explore roles across different departments and take the next step in your career journey with Unimrkt.',
    jobs: [
      {
        id: 1,
        title: 'Executive – Language & Communication',
        location: 'Gurugram, India',
        jobType: 'Full Time',
        department: 'Training',
        postedDate: '12 Aug 2026',
        descriptionItems: null,
        skillsItems: null,
        qualificationsItems: null,
      },
    ],
    journeyEyebrow: 'YOUR CAREER JOURNEY',
    journeyHeading: 'Grow With Purpose',
    journeyBody: 'From day one, you’re supported with the right tools, training and opportunities.',
    journeySteps: [{ id: 1, title: 'Apply', description: 'Submit your application and resume.', image: null, icon: null, iconIdentifier: 'clipboard-tick' }],
    joinUsHeading: 'Join Us',
    joinUsBody: 'To apply for the job opening, please send your resume and relevant details to careers@unimrkt.com.',
    disclaimerHeading: 'Disclaimer : Beware of Fraud',
    disclaimerBody: 'At Unimrkt, we ensure that our prospective candidates and employees are informed about potential fraudulent activities.',
    faqItems: [{ id: 1, question: 'What types of career opportunities are available at Unimrkt?', answer: 'We hire across research operations, primary and secondary research, sales, and training.' }],
    aboutCareersEyebrow: 'ABOUT CAREERS',
    aboutCareersHeading: 'Build Your Career. Create Meaningful Impact.',
    aboutCareersBody: 'At Unimrkt Research, we believe great work starts with great people.',
    seo: null,
  },
  meta: {},
};
