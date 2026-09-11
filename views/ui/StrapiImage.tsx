import Image from 'next/image';
import type { ImageModel } from '@/models/domain';

interface StrapiImageProps {
  image: ImageModel;
  /** Required from the caller — next/image has no safe default. */
  sizes: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

/** Wraps next/image, taking only a normalized ImageModel — never raw
 * StrapiMedia. `unoptimized` is NOT a safe fix for SVGs here: it makes
 * the browser fetch `image.src` directly, but that's
 * NEXT_PUBLIC_STRAPI_ASSET_URL — a loopback address (http://127.0.0.1:1337)
 * on this deployment, reachable only from the Next server itself. Every
 * media reference on this site depends on next/image's optimizer proxying
 * that fetch server-side and serving the result from the app's own
 * origin; bypassing it breaks the browser's fetch entirely, not just for
 * SVGs. */
export function StrapiImage({ image, sizes, priority, className, fill }: StrapiImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      priority={priority}
      className={className}
      {...(fill ? { fill: true as const } : { width: image.width, height: image.height })}
      {...(image.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL } : {})}
    />
  );
}
