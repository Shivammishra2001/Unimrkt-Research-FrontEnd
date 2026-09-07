import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCityServiceCombinations, getMergedCityService } from '@/controllers/location-service';
import { CityServiceDetailView } from '@/views/services/CityServiceDetailView';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// [slug] = city slug (nested under the single-service route rather than a
// sibling [city] folder: Next requires one param name per tree position,
// and [slug] already owns this position); [service] is the nested segment
// underneath it.
interface RouteParams {
  slug: string;
  service: string;
}

export async function generateStaticParams() {
  const combinations = await getAllCityServiceCombinations();
  return combinations.map((c) => ({ slug: c.citySlug, service: c.serviceSlug }));
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const merged = await getMergedCityService(params.slug, params.service);
  if (!merged) return {};

  const canonical = `${SITE_URL}/services/${params.slug}/${params.service}`;
  const ogImage = merged.seo?.shareImage ?? merged.thumbnail;

  return {
    title: merged.seo?.title ?? merged.title,
    description: merged.seo?.description ?? merged.summary,
    alternates: { canonical },
    ...(merged.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    ...(ogImage ? { openGraph: { images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }] } } : {}),
  };
}

export default async function CityServicePage({ params }: { params: RouteParams }) {
  const merged = await getMergedCityService(params.slug, params.service);
  if (!merged) notFound();

  const canonical = `${SITE_URL}/services/${params.slug}/${params.service}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: merged.title,
    description: merged.summary,
    url: canonical,
    areaServed: merged.city.name,
    ...(merged.localAddress
      ? { address: { '@type': 'PostalAddress', streetAddress: merged.localAddress, addressLocality: merged.city.name } }
      : {}),
    ...(merged.localPhone ? { telephone: merged.localPhone } : {}),
    ...(merged.price ? { priceRange: merged.price } : {}),
  };

  return (
    <>
      {/* The one place a route emits raw JSON-LD — Next's Metadata API has
          no typed slot for structured data. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- structured data script, not user-supplied HTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityServiceDetailView service={merged} />
    </>
  );
}
