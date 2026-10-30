'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import { HamburgerIcon } from '@/views/ui/icons/HamburgerIcon';
import { CloseIcon } from '@/views/ui/icons/CloseIcon';
import { MobileNav } from './MobileNav';
import type { NavigationItemModel, NavigationModel } from '@/models/domain';
import type { ServiceTreeItemModel } from '@/models/service';

const CLOSE_DELAY_MS = 200;

function NavLink({ item }: { item: NavigationItemModel }) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimeout() {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }

  function openNow() {
    clearCloseTimeout();
    setOpen(true);
  }

  function closeWithDelay() {
    clearCloseTimeout();
    closeTimeout.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  useEffect(() => clearCloseTimeout, []);

  if (item.children.length === 0) {
    return (
      <Link
        href={item.href}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-1 whitespace-nowrap font-nav text-[16px] font-bold uppercase leading-normal tracking-[0.16px] text-white transition-colors hover:text-white/80"
      >
        {item.label}
        {/* `showIndicator`: Figma shows this chevron on "About unimrkt"
            and "Contact" too, even though neither has real dropdown
            children in the Model — rendered static (no rotation, no
            aria-expanded) rather than faking an interactive control with
            no menu behind it. */}
        {item.showIndicator && (
          <ChevronIcon className="size-3.5 rotate-90 text-white" aria-hidden="true" />
        )}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeWithDelay}>
      <button
        type="button"
        // onClick toggles for touch devices, which never fire onMouseEnter.
        onClick={() => (open ? closeWithDelay() : openNow())}
        className="flex items-center gap-1 whitespace-nowrap font-nav text-[16px] font-bold uppercase leading-normal tracking-[0.16px] text-white transition-colors hover:text-white/80"
        aria-expanded={open}
      >
        {item.label}
        {/* Native asset points right; rotate-90 (down) at rest matches
            Figma, -rotate-90 (up) while open signals "collapse". */}
        <ChevronIcon
          className={`size-3.5 text-white transition-transform ${open ? '-rotate-90' : 'rotate-90'}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        // Wrapper starts flush (top-full, no margin) and pushes the
        // *visible* card down via padding so the pointer-crossing gap
        // stays inside the hoverable element. A margin on the <ul> itself
        // would pull the visible box down but leave that gap outside the
        // element's bounding box, since an absolutely-positioned child
        // doesn't extend its relative parent's hit area.
        <div className="absolute left-0 top-full z-50 w-max pt-3 pointer-events-auto">
          <ul className="min-w-[14rem] rounded-lg border border-white/10 bg-ink-900 py-2 shadow-card">
            {item.children.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.href}
                  target={child.isExternal ? '_blank' : undefined}
                  rel={child.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Fixed header, route/scroll-aware surface: transparent only on the
 * homepage and only until scrolled past 20px; solid everywhere else. */
export function Navbar({
  navigation,
  serviceCategories = null,
}: {
  navigation: NavigationModel;
  /** Full Services category tree (with real sub-service children) — the
   * mobile drawer's Services accordion needs this; the desktop dropdown
   * gets by with the flattened `navigation.items` children (see
   * app/layout.tsx's withDynamicServicesDropdown). Optional/nullable so
   * every existing call site (and the `global`-fetch-failed fallback
   * chrome) keeps working without passing it. */
  serviceCategories?: ServiceTreeItemModel[] | null;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  // Pages whose hero runs under the fixed header (Figma 827:7965 /gallery, 1126:54628 /our-team, 1384:26787 /industries)
  // and whose header CTA is the top-most gradient frame (827:8010, 1126:54673).
  const isGradientCtaPage = isHomePage || pathname === '/gallery' || pathname === '/our-team' || pathname === '/industries';
  const hasHeroUnderHeader = isHomePage || isGradientCtaPage;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route changes (a nav link was followed, including from inside the
  // drawer) close the mobile menu automatically — not just the explicit
  // onClick={onClose} handlers, which wouldn't cover e.g. the browser
  // back/forward buttons.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Body scroll lock while the drawer is open. Cleanup always restores
  // scrolling — both on close and on unmount — rather than leaving the
  // page stuck non-scrollable if this component ever goes away while open.
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  const surfaceClassName = !hasHeroUnderHeader
    ? 'bg-[#0a0f1d] shadow-md border-b border-slate-800'
    : isScrolled
      ? 'bg-[#0a0f1d]/95 backdrop-blur-md shadow-lg border-b border-white/10'
      : 'bg-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full text-white transition-all duration-300 ${hasHeroUnderHeader && !isScrolled ? 'py-2.5 sm:py-3 xl:py-7' : 'py-2.5 sm:py-3'} ${surfaceClassName}`}
      >
        <div className="relative mx-auto flex w-full max-w-[1740px] items-center justify-between px-4 sm:px-6 xl:px-8 min-[1800px]:px-0">
          <Link href="/" className="shrink-0">
            {/* Figma 1794:16994: the exact brand PNG (white field, red arc) at 138x99,
                placed as-is — no wrapper, padding or radius around it. */}
            <Image
              src="/images/brand/logo.png"
              alt={navigation.siteName}
              width={138}
              height={99}
              priority
              className="block h-[99px] w-[138px] max-w-none object-cover"
            />
          </Link>
          <nav className="hidden items-center gap-6 xl:flex min-[1536px]:gap-10 min-[1800px]:absolute min-[1800px]:left-1/2 min-[1800px]:top-1/2 min-[1800px]:-translate-x-1/2 min-[1800px]:-translate-y-1/2 min-[1800px]:gap-[72px]">
            {navigation.items.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </nav>
          {navigation.cta && (
            <Button
              link={navigation.cta}
              variant={navigation.cta.variant}
              // Home (Figma 1794:16957): flat #cc1f1f, 234x60, 4px radius. Gallery (827:8010,
              // the top of the two stacked frames): #6c2a4a -> #be2c28 gradient, same box.
              className={`hidden max-xl:ml-auto sm:inline-flex ${isGradientCtaPage ? '' : '!bg-none bg-[#cc1f1f]'}`}
            />
          )}
          <button
            type="button"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle navigation"
            className="ml-3 flex h-11 w-11 items-center justify-center text-white xl:hidden"
          >
            {isMobileOpen ? (
              <CloseIcon className="size-6" aria-hidden="true" />
            ) : (
              <HamburgerIcon className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>
      <MobileNav
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navigation={navigation}
        serviceCategories={serviceCategories}
      />
    </>
  );
}
