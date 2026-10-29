import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  /** Omit on the last item: it renders as the current page. */
  href?: string;
}

/** Figma 1384:26894 separator ("Arrow-down" 12x12 rotated -90deg): the 4x7.43
 * chevron vector (asset 39f6c.svg, fill #111827), pointing right, centred in
 * its 12x12 box. The exported path points left, hence the horizontal flip. */
function BreadcrumbSeparator() {
  return (
    <span className="inline-flex size-3 shrink-0 items-center justify-center" aria-hidden="true">
      <svg
        width="4"
        height="7.42857"
        viewBox="0 0 4 7.42857"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-scale-x-100"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.85355 0.155413C4.04882 0.36263 4.04882 0.698595 3.85355 0.905812L1.20711 3.71429L3.85355 6.52276C4.04882 6.72998 4.04882 7.06594 3.85355 7.27316C3.65829 7.48038 3.34171 7.48038 3.14645 7.27316L0.146447 4.08949C-0.0488155 3.88227 -0.0488155 3.5463 0.146447 3.33909L3.14645 0.155413C3.34171 -0.0518043 3.65829 -0.0518043 3.85355 0.155413Z"
          fill="#111827"
        />
      </svg>
    </span>
  );
}

/** Breadcrumb bar — Figma 1384:26893/26894 (Industries, y768): a full-width
 * white 60px band with a 0 2 8 rgba(0,0,0,.04) shadow; items sit 7px apart on
 * one centred line, 14px Montserrat / 1.2 leading — parent links SemiBold
 * #b52c2c, the current page Regular #868484. Left edge matches the site
 * container (x=150 on the 1900px canvas). */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="relative z-10 w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex min-h-[60px] w-full max-w-container items-center gap-[7px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={`${item.label}-${i}`} className={`inline-flex items-center gap-[7px] ${isLast ? 'min-w-0' : 'shrink-0'}`}>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-sans text-[14px] font-semibold leading-[1.2] text-[#b52c2c] transition-colors duration-200 ease-in-out hover:text-[#8a1f1f] focus-visible:text-[#8a1f1f]"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="min-w-0 truncate font-sans text-[14px] font-normal leading-[1.2] text-[#868484]">
                  {item.label}
                </span>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
