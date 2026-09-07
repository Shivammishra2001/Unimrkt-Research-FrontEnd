import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { ServiceCard } from './ServiceCard';
import type { ServiceSummary } from '@/models/service';

const CLOSING_CTA_LINK = {
  id: 'services-listing-cta',
  label: 'Talk to us',
  href: '/contact',
  isExternal: false,
  variant: 'secondary' as const,
};

/**
 * /services archive. Copy is static — no backing Strapi content type; kept
 * as overridable props for a future "services page settings" single type.
 */
export function ServiceListingView({
  services,
  heading = 'Services',
  subheading = 'Everything we offer, from a single build to ongoing operations.',
}: {
  services: ServiceSummary[];
  heading?: string;
  subheading?: string;
}) {
  return (
    <>
      {/* !important needed to beat Section's own responsive py-* — this is
          the page's own first element, so it owns Navbar clearance. */}
      <Section theme="light" className="!pt-28 pb-0">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h1" size="display">
              {heading}
            </Heading>
            <Prose className="mt-4">{subheading}</Prose>
          </div>
        </Container>
      </Section>
      <Section theme="light">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} priority={i === 0} />
            ))}
          </div>
        </Container>
      </Section>
      <Section theme="accent">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" size="h2">
              Not sure where to start?
            </Heading>
            <Prose className="mt-4 opacity-90">
              Tell us what you&apos;re building — we&apos;ll point you at the right service.
            </Prose>
            <div className="mt-8 flex justify-center">
              <Button link={CLOSING_CTA_LINK} variant="secondary" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
