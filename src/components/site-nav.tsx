"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { LOGIN_LINK, NAV_LINKS, SIGNUP_LINK } from "@/lib/navigation";

type SiteNavProps = {
  phone: string | null;
  phoneHref: string | null;
};

const linkClass =
  "font-display text-lg tracking-wider transition-colors duration-200 ease-race";

function useHomeSection(enabled: boolean) {
  const [section, setSection] = useState(NAV_LINKS[0]?.section);

  useEffect(() => {
    if (!enabled) return;

    // The band sits just under the navbar, so a section is active once its
    // top reaches the reading position.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -75% 0px" },
    );

    // Reviews has no nav button, but watching it stops the highlight going stale.
    for (const id of [...NAV_LINKS.map((link) => link.section), "reviews"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return section;
}

export function SiteNav({ phone, phoneHref }: SiteNavProps) {
  const menuRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeSection = useHomeSection(isHome);

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            // On the home page the highlight steps through the sections.
            const isActive = isHome
              ? link.section === homeSection
              : link.href === pathname;
            return (
              <li key={link.href}>
                <Link
                  aria-current={link.href === pathname ? "page" : undefined}
                  className={`${linkClass} block border-b-2 pt-0.5 ${
                    isActive
                      ? "border-race text-white"
                      : "border-transparent text-white/80 hover:text-white"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          aria-current={LOGIN_LINK.href === pathname ? "page" : undefined}
          className={`${linkClass} inline-flex h-11 items-center px-2 text-white/80 hover:text-white`}
          href={LOGIN_LINK.href}
        >
          {LOGIN_LINK.label}
        </Link>

        {phone && phoneHref ? (
          <a
            className="border-gold/60 hover:border-gold hidden h-11 items-center gap-2 rounded-sm border px-4 font-display text-lg tracking-wider tabular-nums transition-colors duration-200 ease-race sm:inline-flex"
            href={phoneHref}
          >
            <PhoneIcon height="16" width="16" />
            {phone}
          </a>
        ) : null}

        <button
          aria-label="Open menu"
          className="inline-flex size-11 items-center justify-center rounded-sm border border-white/15 lg:hidden"
          onClick={() => menuRef.current?.showModal()}
          type="button"
        >
          <MenuIcon />
        </button>
      </div>

      {/* showModal() traps focus, closes on Escape and restores focus. */}
      <dialog
        aria-label="Menu"
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-black text-white"
        ref={menuRef}
      >
        <div className="shell flex h-full flex-col py-5">
          <form className="flex justify-end" method="dialog">
            <button
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-sm border border-white/15"
              type="submit"
            >
              <CloseIcon />
            </button>
          </form>

          <ul className="mt-6 flex flex-col">
            {NAV_LINKS.map((link) => (
              <li className="border-b border-white/10" key={link.href}>
                <Link
                  aria-current={link.href === pathname ? "page" : undefined}
                  className="block py-4 font-display text-4xl tracking-wider"
                  href={link.href}
                  onClick={() => menuRef.current?.close()}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <ul className="grid grid-cols-2 gap-3">
              {[LOGIN_LINK, SIGNUP_LINK].map((link) => (
                <li key={link.href}>
                  <Link
                    aria-current={link.href === pathname ? "page" : undefined}
                    className="border-gold/60 flex h-12 items-center justify-center rounded-sm border font-display text-xl tracking-wider"
                    href={link.href}
                    onClick={() => menuRef.current?.close()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {phone && phoneHref ? (
              <a
                className="bg-race flex h-12 items-center justify-center gap-2 rounded-sm font-display text-xl tracking-wider tabular-nums"
                href={phoneHref}
              >
                <PhoneIcon height="18" width="18" />
                {phone}
              </a>
            ) : null}
          </div>
        </div>
      </dialog>
    </>
  );
}
