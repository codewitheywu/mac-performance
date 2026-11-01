import Image from "next/image";
import Link from "next/link";

import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";
import { NAV_LINKS } from "@/lib/navigation";

const headingClass = "text-gold text-xs font-semibold tracking-[0.2em] uppercase";

export function SiteFooter({ info }: { info: BusinessInfo }) {
  return (
    <footer className="border-gold/25 border-t py-12">
      <div className="shell grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            alt="MAC Performance"
            className="shrink-0"
            height={36}
            src="/images/MAC.png"
            width={95}
          />
          <p className="mt-3 max-w-56 text-sm leading-relaxed text-white/80">
            {info.address}
          </p>
        </div>

        <div>
          <p className={headingClass}>Hours</p>
          <ul className="mt-2 space-y-1 text-sm">
            {info.hours.map((entry) => (
              <li key={entry.days}>
                {entry.days}: {entry.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={headingClass}>Call</p>
          <ul className="mt-2 space-y-1 text-sm tabular-nums">
            <li>
              <a className="hover:underline" href={telHref(info.phone)}>
                {info.phone}
              </a>
            </li>
            {info.mobile ? (
              <li>
                <a className="hover:underline" href={telHref(info.mobile)}>
                  {info.mobile}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className={headingClass}>Pages</p>
          <ul className="mt-2 space-y-1 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className="hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
            {info.socials.map((social) => (
              <li key={social.href}>
                <a
                  className="hover:underline"
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
