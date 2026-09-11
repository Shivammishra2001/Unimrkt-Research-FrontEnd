import { Target, Compass, Binary, Send, Sparkles, type LucideIcon } from 'lucide-react';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Reveal } from '@/views/ui/Reveal';
import type { ProcessStepItemModel, ProcessStepsModel } from '@/models/domain';

// Fallback for a step with no uploaded `icon` — currently only "Decode"
// (635:9666), whose real Figma icon is a deep multi-layer masked
// illustration with no single exportable asset.
const ICON_MAP: Record<string, LucideIcon> = {
  inspection: Target,
  discovery: Compass,
  decode: Binary,
  timing: Send,
};

function StepIcon({ step }: { step: ProcessStepItemModel }) {
  if (step.icon) {
    return <StrapiImage image={step.icon} sizes="70px" className="size-[70px] object-contain" />;
  }
  const Icon = (step.iconIdentifier && ICON_MAP[step.iconIdentifier]) || Sparkles;
  return <Icon className="size-[70px] text-brand-600" strokeWidth={1.25} aria-hidden="true" />;
}

/**
 * blocks.process-steps — Figma node 617:7561's "Our Research Ecosystem" /
 * "From Question to Business Decision" section (635:9633/9657/9666/9710):
 * a numbered methodology walkthrough. Cards share why-choose-us's exact
 * white/rounded-[24px]/border-[#e0e0df]/shadow-blog treatment, plus a
 * large faint step-number watermark unique to this section.
 */
export function ProcessStepsView({ block }: { block: ProcessStepsModel; index: number }) {
  return (
    <Section theme={block.theme} anchorId={block.anchorId}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {block.eyebrow && (
            <p className="font-nav text-sm font-semibold uppercase tracking-[0.08em] text-brand-600">{block.eyebrow}</p>
          )}
          <Heading as="h2" size="h2" className="mt-3">
            {block.heading}
          </Heading>
          {block.subheading && <Prose className="mt-4">{block.subheading}</Prose>}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {block.steps.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.05}>
              <li className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[24px] border border-[#e0e0df] bg-white p-8 shadow-blog transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                {step.stepNumber && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-4 select-none font-sans text-[66px] font-semibold capitalize leading-[1.2] tracking-[-1px] text-heading opacity-15"
                  >
                    {step.stepNumber}
                  </span>
                )}
                <StepIcon step={step} />
                <Heading as="h3" size="h3" className="text-ink2">
                  {step.title}
                </Heading>
                <Prose className="text-sm leading-[1.87] opacity-70">{step.description}</Prose>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
