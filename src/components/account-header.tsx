import Image from "next/image";
import Link from "next/link";

import { APPOINTMENTS_LINK, LOGIN_LINK } from "@/lib/navigation";

const linkClass =
  "inline-flex h-11 items-center px-2 font-display text-lg tracking-wider text-white/85 transition-colors duration-200 ease-race hover:text-white";

// The same floating bar as the public site, with the account's own links.
export function AccountHeader() {
  return (
    <header className="pointer-events-none sticky top-0 z-40 pt-2">
      <div className="shell">
        <div className="glass-card pointer-events-auto flex h-18 items-center justify-between gap-4 px-3 [--glass-tint:0.72] sm:px-5">
          <Link
            aria-label="Appointments and shop"
            className="shrink-0"
            href={APPOINTMENTS_LINK.href}
          >
            <Image alt="" height={48} src="/images/MAC.png" width={127} />
          </Link>
          <nav aria-label="Account">
            <ul className="flex items-center gap-1 sm:gap-4">
              {/* Plain links: they only scroll this page, and the router would
                  fetch it again first. */}
              <li className="hidden sm:block">
                <a className={linkClass} href={`${APPOINTMENTS_LINK.href}#appointments`}>
                  {APPOINTMENTS_LINK.label}
                </a>
              </li>
              <li>
                <a className={linkClass} href={`${APPOINTMENTS_LINK.href}#shop`}>
                  Shop
                </a>
              </li>
              <li className="hidden md:block">
                <Link className={linkClass} href="/">
                  Main site
                </Link>
              </li>
              <li>
                <Link className={linkClass} href={LOGIN_LINK.href}>
                  Log out
                </Link>
              </li>
            </ul>
          </nav>
          <div
            aria-hidden="true"
            className="scroll-progress bg-race absolute inset-x-0 bottom-0 h-px"
          />
        </div>
      </div>
    </header>
  );
}
