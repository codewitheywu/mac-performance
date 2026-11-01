import Image from "next/image";
import Link from "next/link";

import type { BusinessInfo } from "@/lib/content";
import { NAV_LINKS } from "@/lib/navigation";

export function SiteFooter({ socials }: { socials: BusinessInfo["socials"] }) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <Image
          alt="MAC Performance"
          className="shrink-0"
          height={36}
          src="/images/MAC.png"
          width={95}
        />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  className="font-display text-lg tracking-wider text-white/80 transition-colors duration-200 ease-race hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  className="text-spark font-display text-lg tracking-wider transition-colors duration-200 ease-race hover:text-white"
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
        <p className="text-xs text-white/70">
          © {new Date().getFullYear()} MAC Performance
        </p>
      </div>
    </footer>
  );
}
