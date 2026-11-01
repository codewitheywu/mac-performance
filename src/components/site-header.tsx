import Image from "next/image";

import { type NavLink, SiteNav } from "@/components/site-nav";
import { telHref } from "@/lib/format";

type SiteHeaderProps = {
  links: NavLink[];
  phone: string | null;
};

export function SiteHeader({ links, phone }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <a aria-label="MAC Performance home" className="shrink-0" href="#top">
          <Image
            alt=""
            height={56}
            src="/images/MAC.png"
            width={148}
          />
        </a>
        <SiteNav
          links={links}
          phone={phone}
          phoneHref={phone ? telHref(phone) : null}
        />
      </div>
      <div
        aria-hidden="true"
        className="scroll-progress bg-race absolute inset-x-0 -bottom-px h-px"
      />
    </header>
  );
}
