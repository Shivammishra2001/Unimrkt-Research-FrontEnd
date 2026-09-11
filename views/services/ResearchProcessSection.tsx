import { Target, Compass, Binary, Send, Sparkles, type LucideIcon } from 'lucide-react';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import type { ServicesPageWorkflow, ServicesPageWorkflowStep } from '@/models/servicesPage';

// Fallback for a step with no uploaded `icon` — every seeded step has a
// real uploaded icon, so this only matters for a future admin-added step.
const ICON_MAP: Record<string, LucideIcon> = {
  inspection: Target,
  discovery: Compass,
  decode: Binary,
  timing: Send,
};

function StepIcon({ step }: { step: ServicesPageWorkflowStep }) {
  if (step.icon) {
    return <StrapiImage image={step.icon} sizes="48px" className="size-12 object-contain" />;
  }
  const Icon = (step.iconIdentifier && ICON_MAP[step.iconIdentifier]) || Sparkles;
  return <Icon className="size-12 text-brand-600" strokeWidth={1.25} aria-hidden="true" />;
}

/**
 * "Research Process" / Workflow section — Figma node 474:6396-6403, now
 * CMS-driven (blocks.process-steps nested on the services-page singleType,
 * reused as-is). Desktop: 4-column grid. Mobile/tablet: horizontal
 * snap-scroll carousel (CSS scroll-snap, no JS dependency) with dot
 * indicators — the active dot is a static positional marker (matching
 * Figma's own frozen screenshot), not a live JS scroll-spy.
 */
export function ResearchProcessSection({ workflow }: { workflow: ServicesPageWorkflow }) {
  return (
    <section className="relative overflow-hidden bg-[#fbfbfc] py-16 sm:py-20 lg:py-24">
      <Container className="relative">
        <header className="mx-auto max-w-3xl text-center">
          {workflow.eyebrow && (
            <p className="font-nav text-sm font-semibold uppercase tracking-[0.2em] text-[#be2c28]">{workflow.eyebrow}</p>
          )}
          <Heading as="h2" size="h2" className="mt-3">
            {workflow.heading}
          </Heading>
          {workflow.subheading && <Prose className="mt-4">{workflow.subheading}</Prose>}
        </header>

        {/* Desktop: static 4-col grid. Mobile/tablet: snap-scroll carousel —
            the exact same <li> markup renders in both; only the wrapper's
            layout classes change per breakpoint. */}
        <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:pb-0 lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {workflow.steps.map((step) => (
            <li
              key={step.id}
              className="relative min-w-[80%] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-blog sm:min-w-[45%] lg:min-w-0 lg:shrink"
            >
              {step.stepNumber && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-2 right-4 select-none font-sans text-[66px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-heading opacity-15"
                >
                  {step.stepNumber}
                </span>
              )}
              <StepIcon step={step} />
              <h3 className="relative mt-6 text-xl font-semibold text-ink2">{step.title}</h3>
              <Prose className="relative mt-2 text-sm leading-[1.87] opacity-70">{step.description}</Prose>
            </li>
          ))}
        </ul>

        {/* Active-pill + dot indicator strip — mobile/tablet only, purely
            decorative (Figma shows a static frozen state, not a live
            scroll-spy). */}
        {workflow.steps.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 lg:hidden" aria-hidden="true">
            {workflow.steps.map((step, i) => (
              <span
                key={step.id}
                className={i === 0 ? 'h-[15px] w-8 rounded-full bg-[#be2c28]' : 'size-[15px] rounded-full bg-[#e0e0df]'}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
