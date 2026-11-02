import Image from "next/image";
import Link from "next/link";

import { Flares } from "@/components/flares";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";
import { NAV_LINKS } from "@/lib/navigation";

// The padding is thumb room: these stack tightly on a phone.
const linkClass = "inline-block py-1.5 hover:underline";

export function SiteFooter({ info }: { info: BusinessInfo }) {
  return (
    <footer className="relative isolate overflow-clip pt-12 pb-3">
      <Flares flip />
      <div className="shell">
        <div className="glass-card grid gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
          <div>
            <Image
              alt="MAC Performance"
              className="shrink-0"
              height={36}
              src="/images/MAC.png"
              width={95}
            />
            <p className="mt-3 max-w-56 text-sm leading-relaxed text-white/85">
              {info.address}
            </p>
          </div>

          <div>
            <p className="eyebrow">Hours</p>
            <ul className="mt-2 space-y-1 text-sm">
              {info.hours.map((entry) => (
                <li key={entry.days}>
                  {entry.days}: {entry.time}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Call</p>
            <ul className="mt-0.5 text-sm tabular-nums">
              <li>
                <a className={linkClass} href={telHref(info.phone)}>
                  {info.phone}
                </a>
              </li>
              {info.mobile ? (
                <li>
                  <a className={linkClass} href={telHref(info.mobile)}>
                    {info.mobile}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Pages</p>
            <ul className="mt-0.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {info.socials.map((social) => (
                <li key={social.href}>
                  <a
                    className={linkClass}
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
      </div>
    </footer>
  );
}
