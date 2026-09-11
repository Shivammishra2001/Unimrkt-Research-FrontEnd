'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import type { NavigationModel } from '@/models/domain';
import type { ServiceTreeItemModel } from '@/models/service';

const MIN_TOUCH_TARGET = 'min-h-[44px]';

/**
 * The Services item gets real 3-level treatment (Services -> category ->
 * sub-service) using the live category tree, independent local expand
 * state per category — several can be open at once, no need to collapse
 * others. Every other nav item stays 2-level, matching the desktop
 * dropdown's own `item.children` shape exactly.
 */
function MobileServiceCategory({
  category,
  onNavigate,
}: {
  category: ServiceTreeItemModel;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = category.children.length > 0;

  return (
    <li className="border-b border-white/10 last:border-b-0">
      <div className="flex items-center">
        <Link
          href={`/services/${category.slug}`}
          onClick={onNavigate}
          className={`flex flex-1 items-center ${MIN_TOUCH_TARGET} py-3 text-base font-medium text-white`}
        >
          {category.title}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${category.title} submenu`}
            className={`flex ${MIN_TOUCH_TARGET} w-11 shrink-0 items-center justify-center text-white/70`}
          >
            <ChevronIcon
              className={`size-4 transition-transform ${expanded ? '-rotate-90' : 'rotate-90'}`}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <ul className="ml-4 border-l border-white/10 pb-2 pl-4">
          {category.children.map((child) => (
            <li key={child.slug}>
              <Link
                href={`/services/${child.slug}`}
                onClick={onNavigate}
                className={`block ${MIN_TOUCH_TARGET} py-3 text-sm leading-tight text-white/70`}
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/** Generic 2-level accordion for any other nav item that has children —
 * mirrors the desktop dropdown's own data shape (item.children), just
 * touch-friendly and expand/collapse instead of hover. */
function MobileNavItem({
  item,
  onNavigate,
}: {
  item: NavigationModel['items'][number];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children.length > 0;

  if (!hasChildren) {
    return (
      <li className="border-b border-white/10 last:border-b-0">
        <Link
          href={item.href}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          onClick={onNavigate}
          className={`flex ${MIN_TOUCH_TARGET} items-center gap-1.5 py-3 text-base font-medium text-white`}
        >
          {item.label}
          {/* Static parity with the desktop NavLink's showIndicator
              treatment — no real dropdown behind it, so no toggle. */}
          {item.showIndicator && <ChevronIcon className="size-3.5 rotate-90 text-white/60" aria-hidden="true" />}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-white/10 last:border-b-0">
      <div className="flex items-center">
        <Link
          href={item.href}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
          onClick={onNavigate}
          className={`flex flex-1 items-center ${MIN_TOUCH_TARGET} py-3 text-base font-medium text-white`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label} submenu`}
          className={`flex ${MIN_TOUCH_TARGET} w-11 shrink-0 items-center justify-center text-white/70`}
        >
          <ChevronIcon
            className={`size-4 transition-transform ${expanded ? '-rotate-90' : 'rotate-90'}`}
            aria-hidden="true"
          />
        </button>
      </div>
      {expanded && (
        <ul className="ml-4 border-l border-white/10 pb-2 pl-4">
          {item.children.map((child) => (
            <li key={child.id}>
              <Link
                href={child.href}
                target={child.isExternal ? '_blank' : undefined}
                rel={child.isExternal ? 'noopener noreferrer' : undefined}
                onClick={onNavigate}
                className={`block ${MIN_TOUCH_TARGET} py-3 text-sm leading-tight text-white/70`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function MobileNav({
  open,
  onClose,
  navigation,
  serviceCategories,
}: {
  open: boolean;
  onClose: () => void;
  navigation: NavigationModel;
  serviceCategories: ServiceTreeItemModel[] | null;
}) {
  return (
    <>
      {/* Backdrop — dims/blurs the page behind the drawer, closes on click.
          Kept mounted (not conditionally rendered) so the opacity
          transition can actually play; pointer-events toggled instead so
          it's inert while invisible. */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      {/* Drawer — slides in from the right. Same mounted-but-transformed
          approach as the backdrop, for a smooth close animation instead of
          an abrupt unmount. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-ink-900 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-sans text-sm font-semibold uppercase tracking-wider text-white/80">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center text-white"
          >
            <CloseIcon className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4">
          <ul>
            {navigation.items.map((item) =>
              item.href === '/services' && serviceCategories ? (
                <li key={item.id} className="border-b border-white/10 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex ${MIN_TOUCH_TARGET} items-center pt-3 text-base font-medium text-white`}
                  >
                    {item.label}
                  </Link>
                  <ul>
                    {serviceCategories.map((category) => (
                      <MobileServiceCategory key={category.slug} category={category} onNavigate={onClose} />
                    ))}
                  </ul>
                </li>
              ) : (
                <MobileNavItem key={item.id} item={item} onNavigate={onClose} />
              )
            )}
          </ul>
        </nav>
        {navigation.cta && (
          <div className="shrink-0 border-t border-white/10 p-4">
            <Button link={navigation.cta} variant={navigation.cta.variant} onClick={onClose} className="w-full" />
          </div>
        )}
      </div>
    </>
  );
}
