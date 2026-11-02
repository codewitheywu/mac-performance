import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getBusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Page not found",
};

export default async function NotFound() {
  const info = await getBusinessInfo();

  return (
    <main className="shell flex flex-1 flex-col items-start justify-center gap-5 py-20">
      <Image alt="MAC Performance" height={56} src="/images/MAC.png" width={148} />
      <h1 className="font-display text-[clamp(3.25rem,7vw,6rem)] leading-[0.92] tracking-wide uppercase">
        Wrong turn
      </h1>
      <p className="text-base text-white/85">That page is not here.</p>
      <div className="flex flex-wrap gap-3">
        <Link
          className="btn btn-race"
          href="/"
        >
          Back to the shop
        </Link>
        <a
          className="btn btn-glass tabular-nums"
          href={telHref(info.phone)}
        >
          Call {info.phone}
        </a>
      </div>
    </main>
  );
}
