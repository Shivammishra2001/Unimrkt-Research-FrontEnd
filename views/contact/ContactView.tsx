import { HeroSection } from './HeroSection';
import { StatsBandSection } from './StatsBandSection';
import { OfficeSection } from './OfficeSection';
import { ContactFormSection } from './ContactFormSection';
import { WorkWithUsSection } from './WorkWithUsSection';
import { resolveContact } from './fallback';
import { BlogFaqAccordion } from '@/views/blog/BlogFaqAccordion';
import type { ContactPageSettings } from '@/models/contactPage';

/**
 * /contact — Figma node 637:10433 ("Contact", file
 * foaJFuv0vRX8nD43o0ylgB). Navbar/Footer are global (app/layout.tsx).
 * Template + graceful fallback: `resolveContact()` (./fallback.ts)
 * prefers the CMS's `contact-page` singleType and falls back to the
 * node's own verbatim copy wherever a field is empty.
 *
 * Renders every one of the node's own sections, top to bottom, and
 * nothing else: Hero (+breadcrumb) / Stats band / Our Presence (office
 * cards) / Contact Form / FAQ (no CTA above heading — confirmed absent
 * on this node, unlike /our-company's) / Work With unimrkt.
 */
export function ContactView({ settings }: { settings: ContactPageSettings }) {
  const content = resolveContact(settings);

  return (
    <>
      <HeroSection hero={content.hero} />
      <StatsBandSection stats={content.stats} />
      <OfficeSection office={content.office} />
      <ContactFormSection form={content.form} />
      <BlogFaqAccordion heading="Frequently Asked Questions" items={content.faqItems} />
      <WorkWithUsSection workWithUs={content.workWithUs} />
    </>
  );
}
