import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/views/ui/Section';
import { Container } from '@/views/ui/Container';
import { Heading } from '@/views/ui/Heading';
import { Prose } from '@/views/ui/Prose';
import { Button } from '@/views/ui/Button';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { ServiceCategoryCard } from './ServiceCategoryCard';
import { ServiceValuePropCard } from './ServiceValuePropCard';
import { ResearchProcessSection } from './ResearchProcessSection';
import { ServiceFaqAccordion } from './ServiceFaqAccordion';
import type { ServiceTreeItemModel } from '@/models/service';
import type { ServicesPageSettings } from '@/models/servicesPage';

// The brief's copy specifies `/contact-us`, which isn't a real route on
// this site (every other CTA — hero, nav, footer — points at the one
// real page, `/contact`); linking there instead of a working page would
// have been a dead link the moment this shipped.
const BOTTOM_CTA_HREF = '/contact';

/**
 * /services archive — Figma node 474:6135. Categories (the grid) come
 * from the `service` hierarchy (getAllServiceCategories()); every other
 * section's copy comes from the `services-page` singleType
 * (getServicesPageContent()) — fully CMS-editable, nothing hardcoded.
 */
export function ServiceListingView({
  categories,
  settings,
}: {
  categories: ServiceTreeItemModel[];
  settings: ServicesPageSettings;
}) {
  const { hero, workflow, faq, cta } = settings;

  return (
    <>
      {/* 1. Hero — matches HeroView's `mediaAlignment: 'background'` full-bleed
          treatment (same fixed-Navbar clearance, same dark scrim) used
          across every other redesigned page this session. */}
      <section className="relative flex min-h-[480px] w-full items-center overflow-hidden text-white sm:min-h-[560px] lg:min-h-[640px]">
        {hero?.media ? (
          <StrapiImage image={hero.media} sizes="100vw" priority fill className="object-cover" />
        ) : (
          <Image src="/images/services/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="relative z-10 mx-auto w-full max-w-container px-4 pt-32 sm:px-6 lg:px-8">
          {hero?.eyebrow && (
            <p className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-[17px] py-[9px] backdrop-blur-[2px] font-sans text-[13px] font-bold uppercase tracking-[3px] text-white">
              <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
              {hero.eyebrow}
            </p>
          )}
          <h1 className="mt-3 max-w-[748px] capitalize text-4xl font-semibold leading-[1.2] text-white sm:text-5xl lg:text-[60px] lg:tracking-[-3px]">
            {hero?.heading}
          </h1>
          {hero?.subheading && (
            <p className="mt-6 max-w-[708px] text-base leading-[1.9] text-white/85 sm:text-lg">{hero.subheading}</p>
          )}
          {hero && hero.actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {hero.actions.map((action) => (
                <Button key={action.id} link={action} variant={action.variant} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="w-full border-b border-card-border bg-white shadow-card">
        <div className="mx-auto flex w-full max-w-container items-center gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-sans text-sm font-semibold text-brand-600">
            Home
          </Link>
          <ChevronIcon className="size-3.5 rotate-90 text-slate-400" aria-hidden="true" />
          <span className="font-sans text-sm text-slate-500">Services</span>
        </div>
      </div>

      {/* 3. About Our Services intro + main services grid — dynamic, all
          real parent categories. */}
      <Section theme="light">
        <Container>
          <header className="mx-auto max-w-[850px] text-center">
            {settings.introEyebrow && (
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#be2c28]">{settings.introEyebrow}</p>
            )}
            <h2 className="mt-3 text-[28px] font-extrabold leading-[1.2] text-[#0f172a] sm:text-4xl lg:text-[44px]">
              {settings.introHeading}
            </h2>
            {settings.introParagraph1 && (
              <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#475569]">{settings.introParagraph1}</p>
            )}
            {settings.introParagraph2 && (
              <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#475569]">{settings.introParagraph2}</p>
            )}
          </header>

          {categories.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, i) => (
                <ServiceCategoryCard key={category.slug} category={category} priority={i === 0} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center opacity-70">Services are being updated — check back shortly.</p>
          )}
        </Container>
      </Section>

      {workflow && <ResearchProcessSection workflow={workflow} />}

      {/* 4. Value proposition / methodology band. */}
      <section className="relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
        {settings.valuePropsBackground ? (
          <StrapiImage image={settings.valuePropsBackground} sizes="100vw" fill className="object-cover" />
        ) : (
          <Image src="/images/services/why-choose-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        <Container className="relative">
          <header className="mx-auto max-w-2xl text-center">
            {settings.valuePropsHeading && (
              <Heading as="h2" size="h2" className="text-white">
                {settings.valuePropsHeading}
              </Heading>
            )}
            {settings.valuePropsBody && <Prose className="mt-4">{settings.valuePropsBody}</Prose>}
          </header>
          {settings.valueProps.length > 0 && (
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {settings.valueProps.map((prop) => (
                <ServiceValuePropCard key={prop.id} prop={prop} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {faq && <ServiceFaqAccordion faq={faq} />}

      {/* 5. Bottom CTA — floating dark card, photographic backdrop tinted
          with a navy gradient overlay. */}
      {cta && (
        <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] px-6 py-16 text-center sm:px-6 md:px-12 md:py-24">
            {cta.background ? (
              <StrapiImage image={cta.background} sizes="(min-width: 1024px) 1152px, 100vw" fill className="object-cover" />
            ) : (
              <Image src="/images/services/cta-bg.jpg" alt="" fill sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover" />
            )}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.94))' }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[44px]">{cta.heading}</h2>
              {cta.body && <p className="mx-auto mt-4 max-w-2xl text-gray-300">{cta.body}</p>}
              {cta.actions.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Link
                    href={cta.actions[0].href === '/contact-us' ? BOTTOM_CTA_HREF : cta.actions[0].href}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold uppercase tracking-wide text-slate-950 shadow-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    {cta.actions[0].label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
