import Image from "next/image";
import Link from "next/link";

import { SiteNav } from "@/components/site-nav";
import { telHref } from "@/lib/format";

// A floating glass bar. The clear strip around it lets the page show on all
// sides, and pointer-events keep that strip from blocking taps underneath.
export function SiteHeader({ phone }: { phone: string | null }) {
  return (
    <header className="pointer-events-none sticky top-0 z-40 pt-2">
      <div className="shell">
        <div className="glass-card pointer-events-auto flex h-18 items-center justify-between gap-6 px-3 [--glass-tint:0.72] sm:px-5">
          <Link aria-label="MAC Performance home" className="shrink-0" href="/">
            <Image alt="" height={48} src="/images/MAC.png" width={127} />
          </Link>
          <SiteNav phone={phone} phoneHref={phone ? telHref(phone) : null} />
          <div
            aria-hidden="true"
            className="scroll-progress bg-race absolute inset-x-0 bottom-0 h-px"
          />
        </div>
      </div>
    </header>
  );
}
