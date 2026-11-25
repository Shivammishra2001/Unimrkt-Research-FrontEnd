import { ServicesHero } from '@/views/services/listing/ServicesHero';
import { getServiceHref } from '@/lib/serviceHref';
import type { ResolvedServiceDetail } from './fallback';

const FIGMA_HERO = { src: '/images/services/detail/primary-research-hero.jpg', alt: '', width: 1920, height: 1344 };

/** /services/[slug] hero + breadcrumb — Figma 474:5771 (1900x768) + 474:6031-6037. The exact /services hero construction
 * (#040112 base, photo at 70%, 40% #010913 wash, 80% left fade, 255px top fade, pill at y276, 60/72px title, 16/30.4px
 * subtitle, gradient + outline buttons at y596), so it reuses ServicesHero: here the photo (1952x1366 from y-433) is
 * framed by object-position, the title is 875px and breaks after its first sentence like the node ("Real
 * Conversations." / "Reliable Data. Better Decisions."), the subtitle is 884px, and the breadcrumb adds the service
 * (and its parent category, for a sub-service). A line break typed in the CMS heading wins over the automatic one. */
export function ServiceDetailHero({ hero, title, parent }: { hero: ResolvedServiceDetail['hero']; title: string; parent?: { title: string; slug: string } }) {
  const heading = hero.heading.includes('\n') ? hero.heading : hero.heading.replace(/^(.+?[.!?])\s+(?=\S)/, '$1\n');
  return (
    <ServicesHero
      content={{ eyebrow: hero.eyebrow, heading, subheading: hero.subheading, image: hero.image ?? FIGMA_HERO, actions: hero.actions }}
      imageClassName="object-[50%_60%]"
      headingClassName="max-w-[900px]"
      subheadingClassName="max-w-[884px]"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        ...(parent ? [{ label: parent.title, href: getServiceHref(parent.slug) }] : []),
        { label: title },
      ]}
    />
  );
}
