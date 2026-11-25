'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { groupIndustries, industriesFor, isIndustriesItem, isServicesItem, withCount, type NavIndustry } from './nav/industryGroups';
import type { NavigationModel } from '@/models/domain';
import type { ServiceTreeItemModel } from '@/models/service';
import { getServiceHref } from '@/lib/serviceHref';

const MIN_TOUCH_TARGET = 'min-h-[44px]';

/** Smooth height expand (grid-rows 0fr -> 1fr). Collapsed content is `invisible`, so it is out of the tab order. */
function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
      <div className={`overflow-hidden transition-[visibility] duration-300 ${open ? 'visible' : 'invisible'}`}>{children}</div>
    </div>
  );
}

function ToggleButton({ expanded, label, onClick }: { expanded: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label} submenu`}
      className={`flex ${MIN_TOUCH_TARGET} w-11 shrink-0 items-center justify-center text-white/70`}
    >
      <ChevronIcon className={`size-4 transition-transform duration-300 ${expanded ? '-rotate-90' : 'rotate-90'}`} aria-hidden="true" />
    </button>
  );
}

/** A top-level drawer row: link + chevron toggle + smooth expandable body. */
function AccordionRow({ label, href, isExternal = false, onNavigate, children }: { label: string; href: string; isExternal?: boolean; onNavigate: () => void; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li className="border-b border-white/10 last:border-b-0">
      <div className="flex items-center">
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          onClick={onNavigate}
          className={`flex flex-1 items-center ${MIN_TOUCH_TARGET} py-3 text-base font-medium text-white`}
        >
          {label}
        </Link>
        <ToggleButton expanded={expanded} label={label} onClick={() => setExpanded((v) => !v)} />
      </div>
      <Collapse open={expanded}>{children}</Collapse>
    </li>
  );
}

/** Services -> category -> sub-service, from the live category tree; each category expands on its own. */
function MobileServiceCategory({ category, onNavigate }: { category: ServiceTreeItemModel; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = category.children.length > 0;
  return (
    <li>
      <div className="flex items-center">
        <Link href={getServiceHref(category.slug)} onClick={onNavigate} className={`flex flex-1 items-center gap-2.5 ${MIN_TOUCH_TARGET} py-2.5 text-[15px] font-medium text-white/90`}>
          <span className="size-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#BE2C28] to-[#6C2A4A]" aria-hidden="true" />
          {category.title}
        </Link>
        {hasChildren && <ToggleButton expanded={expanded} label={category.title} onClick={() => setExpanded((v) => !v)} />}
      </div>
      {hasChildren && (
        <Collapse open={expanded}>
          <ul className="mb-2 ml-[3px] border-l border-white/10 pl-5">
            {category.children.map((child) => (
              <li key={child.slug}>
                <Link href={getServiceHref(child.slug, category.slug)} onClick={onNavigate} className={`flex items-center ${MIN_TOUCH_TARGET} py-2 text-sm leading-tight text-white/65`}>
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </Collapse>
      )}
    </li>
  );
}

export function MobileNav({
  open,
  onClose,
  navigation,
  serviceCategories,
  industries = null,
}: {
  open: boolean;
  onClose: () => void;
  navigation: NavigationModel;
  serviceCategories: ServiceTreeItemModel[] | null;
  industries?: NavIndustry[] | null;
}) {
  return (
    <>
      {/* Backdrop — kept mounted so the opacity transition plays; pointer-events toggled so it's inert while hidden. */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      {/* Drawer — slides in from the right; mounted-but-transformed for a smooth close. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#0B1220] shadow-2xl transition-transform duration-300 ease-out xl:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-sans text-sm font-semibold uppercase tracking-wider text-white/80">Menu</span>
          <button type="button" onClick={onClose} aria-label="Close navigation menu" className="flex h-11 w-11 items-center justify-center text-white">
            <CloseIcon className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4">
          <ul>
            {navigation.items.map((item) => {
              if (isServicesItem(item) && serviceCategories?.length) {
                return (
                  <AccordionRow key={item.id} label={item.label} href={item.href} onNavigate={onClose}>
                    <ul className="pb-2">
                      {serviceCategories.map((category) => (
                        <MobileServiceCategory key={category.slug} category={category} onNavigate={onClose} />
                      ))}
                    </ul>
                  </AccordionRow>
                );
              }
              const industryList = isIndustriesItem(item) ? industriesFor(item, industries) : [];
              if (industryList.length) {
                return (
                  <AccordionRow key={item.id} label={item.label} href="/industries" onNavigate={onClose}>
                    <div className="pb-3">
                      {groupIndustries(industryList, navigation.industriesMenu).map((g) => (
                        <div key={g.label} className="mt-2">
                          <p className="py-1.5 text-[11px] font-bold uppercase tracking-[1.8px] text-white/45">{g.label}</p>
                          <ul className="ml-[3px] border-l border-white/10 pl-5">
                            {g.items.map((i) => (
                              <li key={i.slug}>
                                <Link href={`/industries/${i.slug}`} onClick={onClose} className={`flex items-center ${MIN_TOUCH_TARGET} py-2 text-sm leading-tight text-white/70`}>
                                  {i.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link
                        href={navigation.industriesMenu?.viewAllLink?.href ?? '/industries'}
                        onClick={onClose}
                        className={`mt-2 flex items-center gap-1.5 ${MIN_TOUCH_TARGET} text-sm font-semibold text-[#ff8a85]`}
                      >
                        {withCount(navigation.industriesMenu?.viewAllLink?.label ?? 'View All {count} Industries', industryList.length)} <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </AccordionRow>
                );
              }
              if (item.children.length > 0 && item.menuType !== 'link') {
                return (
                  <AccordionRow key={item.id} label={item.label} href={item.href} isExternal={item.isExternal} onNavigate={onClose}>
                    <ul className="mb-2 ml-[3px] border-l border-white/10 pl-5">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            target={child.isExternal ? '_blank' : undefined}
                            rel={child.isExternal ? 'noopener noreferrer' : undefined}
                            onClick={onClose}
                            className={`flex items-center ${MIN_TOUCH_TARGET} py-2 text-sm leading-tight text-white/70`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionRow>
                );
              }
              return (
                <li key={item.id} className="border-b border-white/10 last:border-b-0">
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                    className={`flex ${MIN_TOUCH_TARGET} items-center gap-1.5 py-3 text-base font-medium text-white`}
                  >
                    {item.label}
                    {/* Static parity with the desktop NavLink's showIndicator chevron — no dropdown behind it. */}
                    {item.showIndicator && <ChevronIcon className="size-3.5 rotate-90 text-white/60" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
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
