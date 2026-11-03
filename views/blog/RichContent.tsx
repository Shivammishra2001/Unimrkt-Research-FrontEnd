import Image from 'next/image';
import type { ReactNode } from 'react';
import { toAbsoluteUrl } from '@/controllers/image';
import type { StrapiBlocksContent, StrapiBlocksNode } from '@/models/blog';

/**
 * Renders a Strapi Blocks (structured rich text) tree for the article body — Figma 587:3338's 1023px text column.
 * Values measured off the node:
 *  - h2: Montserrat SemiBold 36px / 1.2 / -2px / capitalize / #02060e (595:3908)
 *  - paragraph: Regular 16px / 1.9 / 80% / #02060e (587:3460)
 *  - list: SemiBold 16px / 2.5 / 80% / #02060e, 10px #722a48 dot 7px in, text indented 24px (596:3926)
 *  - quote (596:4047): #f3ebee, r20, 1005x166, 7px #7a2b45 left bar, 23px SemiBold -1px #7a2b45 / 1.4 text at 65px
 * Figma spaces the blocks by trimmed text edges; the `GAP` table below is those distances converted to line-box
 * margins (paragraph -> h2 31, h2 -> paragraph 13.6, paragraph -> list 5, list -> paragraph 22, to/from the quote 75/54).
 */
export function RichContent({ content }: { content: StrapiBlocksContent }) {
  return <div className="flex flex-col">{content.map((node, i) => renderNode(node, i, i > 0 ? content[i - 1].type : null))}</div>;
}

const GAP: Record<string, string> = {
  'paragraph>heading': 'mt-[31px]',
  'list>heading': 'mt-9',
  'quote>heading': 'mt-[54px]',
  'heading>paragraph': 'mt-[12.3px]',
  'paragraph>list': 'mt-[5px]',
  'list>paragraph': 'mt-[22px]',
  'paragraph>quote': 'mt-[75px]',
  'list>quote': 'mt-[75px]',
  'quote>paragraph': 'mt-[54px]',
};

function gapClass(prev: string | null, type: string): string {
  if (!prev) return '';
  return GAP[`${prev}>${type}`] ?? 'mt-6';
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

function renderNode(node: StrapiBlocksNode, key: number, prev: string | null = null): ReactNode {
  if (node.type === 'text') return renderText(node, key);

  switch (node.type) {
    case 'heading': {
      const Tag = `h${node.level ?? 2}` as 'h2' | 'h3' | 'h4';
      return (
        <Tag
          key={key}
          className={`${gapClass(prev, 'heading')} capitalize font-sans text-[28px] font-semibold leading-[1.2] tracking-[-1px] text-[#02060e] sm:text-[32px] lg:text-[36px] lg:tracking-[-2px]`}
        >
          {renderChildren(node.children)}
        </Tag>
      );
    }
    case 'paragraph':
      return (
        <p key={key} className={`${gapClass(prev, 'paragraph')} font-sans text-base leading-[1.9] text-[#02060e] opacity-80`}>
          {renderChildren(node.children)}
        </p>
      );
    case 'list': {
      const Tag = node.format === 'ordered' ? 'ol' : 'ul';
      return (
        <Tag key={key} className={`${gapClass(prev, 'list')} flex flex-col`}>
          {node.children.map((item, i) => (
            <li key={i} className="relative pl-6 font-sans text-base font-semibold leading-[2.5] text-[#02060e] opacity-80">
              <span className="absolute left-[7px] top-[15px] size-[10px] rounded-full bg-[#722a48]" aria-hidden="true" />
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
          className={`${gapClass(prev, 'quote')} relative flex min-h-[166px] items-center overflow-hidden rounded-[20px] bg-[#f3ebee] py-8 pl-8 pr-6 sm:pl-[65px] lg:pr-[145px]`}
        >
          <span className="absolute inset-y-0 left-0 w-[7px] bg-[#7a2b45]" aria-hidden="true" />
          <p className="font-sans text-[18px] font-semibold capitalize leading-[1.4] tracking-[-1px] text-[#7a2b45] [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] sm:text-[23px]">
            {renderChildren(node.children)}
          </p>
        </blockquote>
      );
    case 'image': {
      if (!node.image) return null;
      const src = toAbsoluteUrl(node.image.url);
      const width = node.image.width ?? 1000;
      const height = node.image.height ?? 700;
      return (
        <figure key={key} className="mx-auto mt-6 flex flex-col items-center gap-3">
          <Image src={src} alt={node.image.alternativeText ?? ''} width={width} height={height} className="rounded-2xl object-cover" sizes="(min-width: 1024px) 700px, 100vw" />
          {node.image.caption && <figcaption className="text-center text-sm opacity-60">{node.image.caption}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}
