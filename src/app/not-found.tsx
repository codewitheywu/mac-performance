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
          className="bg-race hover:bg-race-deep inline-flex h-12 items-center rounded-sm px-6 font-display text-xl tracking-wider transition-colors duration-200 ease-race"
          href="/"
        >
          Back to the shop
        </Link>
        <a
          className="border-gold/60 hover:border-gold inline-flex h-12 items-center rounded-sm border px-6 font-display text-xl tracking-wider tabular-nums transition-colors duration-200 ease-race"
          href={telHref(info.phone)}
        >
          Call {info.phone}
        </a>
      </div>
    </main>
  );
}
