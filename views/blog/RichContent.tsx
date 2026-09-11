import Image from 'next/image';
import type { ReactNode } from 'react';
import { toAbsoluteUrl } from '@/controllers/image';
import type { StrapiBlocksContent, StrapiBlocksNode } from '@/models/blog';

/**
 * Renders a Strapi Blocks (structured rich text) tree for the article
 * body — Figma node 587:3338's main column. Exact styles pulled off the
 * node (not estimated):
 *  - h2: Montserrat SemiBold 36px / leading-[1.2] / tracking-[-2px] /
 *    capitalize / #02060e (node 595:3908)
 *  - paragraph: Montserrat Regular 16px / leading-[1.9] / 80% opacity /
 *    #02060e (node 587:3460)
 *  - list: 16px / leading-[2.5] / 80% opacity / #02060e, custom maroon
 *    circular marker instead of the browser default disc (node 596:3926)
 *  - quote/callout: bg #f3ebee, rounded-[20px], 7px left accent bar in
 *    the brand gradient-from maroon (node 596:4047/4048)
 */
export function RichContent({ content }: { content: StrapiBlocksContent }) {
  return <div className="flex flex-col gap-6">{content.map((node, i) => renderNode(node, i))}</div>;
}

function renderText(node: StrapiBlocksNode, key: number): ReactNode {
  if (node.type !== 'text') return null;
  let el: ReactNode = node.text;
  if (node.bold) el = <strong key={key}>{el}</strong>;
  if (node.italic) el = <em key={key}>{el}</em>;
  if (node.underline) el = <u key={key}>{el}</u>;
  return <span key={key}>{el}</span>;
}

function renderChildren(children: StrapiBlocksNode[]) {
  return children.map((child, i) => (child.type === 'text' ? renderText(child, i) : renderNode(child, i)));
}

function renderNode(node: StrapiBlocksNode, key: number): ReactNode {
  if (node.type === 'text') return renderText(node, key);

  switch (node.type) {
    case 'heading': {
      const Tag = `h${node.level ?? 2}` as 'h2' | 'h3' | 'h4';
      return (
        <Tag
          key={key}
          className="capitalize font-sans text-[28px] font-semibold leading-[1.2] tracking-[-1px] text-[#02060e] sm:text-[32px] lg:text-[36px] lg:tracking-[-2px]"
        >
          {renderChildren(node.children)}
        </Tag>
      );
    }
    case 'paragraph':
      return (
        <p key={key} className="font-sans text-base leading-[1.9] text-[#02060e] opacity-80">
          {renderChildren(node.children)}
        </p>
      );
    case 'list': {
      const Tag = node.format === 'ordered' ? 'ol' : 'ul';
      return (
        <Tag key={key} className="flex flex-col gap-1 pl-0">
          {node.children.map((item, i) => (
            <li key={i} className="flex items-start gap-3 font-sans text-base leading-[2.5] text-[#02060e] opacity-80">
              <span className="mt-[1.05em] size-[10px] shrink-0 rounded-full bg-[#722a48]" aria-hidden="true" />
              <span>{item.type !== 'text' && renderChildren(item.children)}</span>
            </li>
          ))}
        </Tag>
      );
    }
    case 'quote':
      return (
        <blockquote
          key={key}
          className="relative overflow-hidden rounded-[20px] bg-[#f3ebee] py-6 pl-8 pr-6 font-sans text-lg italic leading-[1.6] text-[#02060e]"
        >
          <span className="absolute inset-y-0 left-0 w-[7px] bg-gradient-from" aria-hidden="true" />
          {renderChildren(node.children)}
        </blockquote>
      );
    case 'image': {
      if (!node.image) return null;
      const src = toAbsoluteUrl(node.image.url);
      const width = node.image.width ?? 1000;
      const height = node.image.height ?? 700;
      return (
        <figure key={key} className="mx-auto flex flex-col items-center gap-3">
          <Image src={src} alt={node.image.alternativeText ?? ''} width={width} height={height} className="rounded-2xl object-cover" sizes="(min-width: 1024px) 700px, 100vw" />
          {node.image.caption && <figcaption className="text-center text-sm opacity-60">{node.image.caption}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}
