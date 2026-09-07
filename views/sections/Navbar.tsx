'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { StrapiImage } from '@/views/ui/StrapiImage';
import { Button } from '@/views/ui/Button';
import { ChevronIcon } from '@/views/ui/icons/ChevronIcon';
import type { NavigationItemModel, NavigationModel } from '@/models/domain';

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
        className="font-nav text-sm font-medium text-white/90 transition-colors hover:text-white"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeWithDelay}>
      <button
        type="button"
        // onClick toggles for touch devices, which never fire onMouseEnter.
        onClick={() => (open ? closeWithDelay() : openNow())}
        className="flex items-center gap-1 font-nav text-sm font-medium text-white/90 transition-colors hover:text-white"
        aria-expanded={open}
      >
        {item.label}
        <ChevronIcon className={`size-4 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
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
export function Navbar({ navigation }: { navigation: NavigationModel }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const surfaceClassName = !isHomePage
    ? 'bg-[#0a0f1d] shadow-md border-b border-slate-800'
    : isScrolled
      ? 'bg-[#0a0f1d]/95 backdrop-blur-md shadow-lg border-b border-white/10'
      : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full py-2.5 text-white transition-all duration-300 sm:py-3 ${surfaceClassName}`}
    >
      <div className="mx-auto flex w-full max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <StrapiImage image={navigation.logo} sizes="240px" priority className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.items.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>
        {navigation.cta && (
          <Button
            link={navigation.cta}
            variant={navigation.cta.variant}
            className="hidden !px-4 !py-2 !text-xs !font-semibold sm:!text-sm sm:inline-flex"
          />
        )}
      </div>
    </header>
  );
}
