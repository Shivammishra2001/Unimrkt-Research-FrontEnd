/**
 * Verbatim from backend/scripts/seed.ts's TESTIMONIALS array — the real
 * seeded content, not invented copy. Not fetched standalone by any current
 * page (no seeded blocks.testimonials entry exists — see seed.ts's
 * upsertTestimonials() comment), but exposed here so a future
 * blocks.testimonials block has real fixture data to populate from.
 */
import type { StrapiTestimonial } from '@/models/strapi';

export const MOCK_TESTIMONIALS: StrapiTestimonial[] = [
  {
    id: 1,
    documentId: 'mock-testimonial-1',
    quote: 'This platform cut our time-to-launch in half.',
    authorName: 'Ade Coker',
    authorRole: 'Head of Product',
    company: 'Northwind',
    avatar: null,
    companyLogo: null,
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    documentId: 'mock-testimonial-2',
    quote: 'Editors ship copy changes without touching a pull request.',
    authorName: 'Priya Shah',
    authorRole: 'Marketing Lead',
    company: 'Fenwick',
    avatar: null,
    companyLogo: null,
    rating: 5,
    featured: true,
  },
  {
    id: 3,
    documentId: 'mock-testimonial-3',
    quote: 'The dynamic zone model is the best content architecture we have used.',
    authorName: 'Tom Reyes',
    authorRole: 'CTO',
    company: 'Loft & Co',
    avatar: null,
    companyLogo: null,
    rating: 5,
    featured: true,
  },
  {
    id: 4,
    documentId: 'mock-testimonial-4',
    quote: 'Preview mode saved us from three bad launches.',
    authorName: 'Grace Lin',
    authorRole: 'PM',
    company: 'Backyard',
    avatar: null,
    companyLogo: null,
    rating: 4,
    featured: false,
  },
  {
    id: 5,
    documentId: 'mock-testimonial-5',
    quote: 'Revalidation is instant. No more waiting an hour to see a fix.',
    authorName: 'Marcus Webb',
    authorRole: 'Engineer',
    company: 'Fenwick',
    avatar: null,
    companyLogo: null,
    rating: 5,
    featured: false,
  },
  {
    id: 6,
    documentId: 'mock-testimonial-6',
    quote: 'Migrating from a monolith CMS took a weekend, not a quarter.',
    authorName: 'Elena Petrova',
    authorRole: 'VP Eng',
    company: 'Northwind',
    avatar: null,
    companyLogo: null,
    rating: 5,
    featured: false,
  },
];
