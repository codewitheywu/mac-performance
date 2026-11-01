"use client";

import { useEffect, useRef, useState } from "react";

import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";

export type NavLink = { label: string; href: `#${string}` };

type SiteNavProps = {
  links: NavLink[];
  phone: string | null;
  phoneHref: string | null;
};

const linkClass =
  "font-display text-lg tracking-wider transition-colors duration-200 ease-race";

function useActiveSection(links: NavLink[]) {
  const [active, setActive] = useState<string | undefined>(links[0]?.href);

  useEffect(() => {
    const sections = links.flatMap((link) => {
      const section = document.querySelector(link.href);
      return section ? [section] : [];
    });

    // The band sits just under the navbar, so a section is active once its
    // top reaches the reading position.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -75% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return active;
}

export function SiteNav({ links, phone, phoneHref }: SiteNavProps) {
  const menuRef = useRef<HTMLDialogElement>(null);
  const active = useActiveSection(links);

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-8">
          {links.map((link) => {
            const isActive = link.href === active;
            return (
              <li key={link.href}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={`${linkClass} block border-b-2 pt-0.5 ${
                    isActive
                      ? "border-race text-white"
                      : "border-transparent text-white/80 hover:text-white"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        {phone && phoneHref ? (
          <a
            className="bg-race hover:bg-race-deep hidden h-11 items-center gap-2 rounded-sm px-4 font-display text-lg tracking-wider tabular-nums transition-colors duration-200 ease-race sm:inline-flex"
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
            {links.map((link) => (
              <li className="border-b border-white/10" key={link.href}>
                <a
                  className="block py-4 font-display text-4xl tracking-wider"
                  href={link.href}
                  onClick={() => menuRef.current?.close()}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {phone && phoneHref ? (
            <a
              className="bg-race mt-auto flex h-12 items-center justify-center gap-2 rounded-sm font-display text-xl tracking-wider tabular-nums"
              href={phoneHref}
            >
              <PhoneIcon height="18" width="18" />
              {phone}
            </a>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
