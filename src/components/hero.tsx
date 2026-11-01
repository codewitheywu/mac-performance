import Image from "next/image";
import Link from "next/link";

import { StatsCard } from "@/components/stats-card";
import type { Stat } from "@/lib/content";

export function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden pt-56 pb-10 sm:pt-72 lg:items-center lg:py-16"
      id="top"
    >
      {/* Below lg the photo is a band above the copy so the car stays in view. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-64 sm:h-96 lg:inset-0 lg:h-auto">
        {/* object-cover zooms past the viewport width, so sizes follows the
            rendered width (height × aspect ratio), not 100vw. */}
        <Image
          alt="Yellow sports car parked in a working repair garage"
          className="object-cover object-[66%_center] lg:object-[center_78%]"
          fill
          preload
          sizes="(min-width: 1024px) max(100vw, 178svh), max(100vw, 700px)"
          src="/images/mac-hero.png"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/30" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black via-black/10 via-40% to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-black from-22% via-black/80 via-46% to-transparent to-72% lg:block xl:via-black/85 xl:via-38% xl:to-62%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-24 bg-linear-to-t from-black to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="hero-flare flare-in inset-y-0 left-0 w-full lg:w-3/4"
        />
      </div>

      <div className="shell">
        <p className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase backdrop-blur-sm">
          <span aria-hidden="true" className="bg-race size-1.5" />
          Repairs · Tuning · Accessories
        </p>

        <h1
          className="mt-4 font-display text-[clamp(3.25rem,6.2vw,5.5rem)] leading-[0.95] tracking-wide uppercase"
          id="hero-title"
        >
          <span className="block">Built for the road.</span>
          <span className="block">Tuned for</span>
          <span className="text-race block">Performance</span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
          Precision repairs, expert diagnostics and premium accessories.
          Everything your car needs under one roof.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="bg-race hover:bg-race-deep inline-flex h-12 items-center rounded-sm px-6 font-display text-xl tracking-wider transition-colors duration-200 ease-race"
            href="/contacts"
          >
            Book a service
          </Link>
          <Link
            className="inline-flex h-12 items-center rounded-sm border border-white/25 bg-white/5 px-6 font-display text-xl tracking-wider backdrop-blur-sm transition-colors duration-200 ease-race hover:border-white/60"
            href="/services"
          >
            Explore services
          </Link>
        </div>

        {stats.length > 0 ? <StatsCard className="rise-in mt-8" stats={stats} /> : null}
      </div>
    </section>
  );
}
