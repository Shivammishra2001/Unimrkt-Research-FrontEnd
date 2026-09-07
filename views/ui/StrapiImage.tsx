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
 * StrapiMedia. */
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
