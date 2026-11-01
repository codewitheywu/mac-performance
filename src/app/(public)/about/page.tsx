import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BookingCard } from "@/components/booking-card";
import { EmptyNote } from "@/components/empty-note";
import { PageHero } from "@/components/page-hero";
import { ReviewsSection } from "@/components/reviews-section";
import { StatsCard } from "@/components/stats-card";
import { getBusinessInfo, getServices, getStats } from "@/lib/content";
import { getGooglePlace } from "@/lib/google-place";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MAC Performance is an automotive accessories and repair shop. Meet the shop behind the repairs, tuning and parts.",
};

export default async function AboutPage() {
  const [info, stats, services, place] = await Promise.all([
    getBusinessInfo(),
    getStats(),
    getServices(),
    getGooglePlace(),
  ]);
  const categories = [...new Set(services.map((service) => service.category))];

  return (
    <>
      <PageHero
        eyebrow="About us"
        summary="An automotive accessories and repair shop. Repairs, tuning and parts are handled in one place."
        title="A repair bay and a parts counter."
        titleMuted="Same shop."
      />

      {info.about ? (
        <section aria-label="The shop" className="py-14 lg:py-20">
          <div className="shell grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="reveal text-base leading-relaxed text-white/80">
                {info.about}
              </p>
              {stats.length > 0 ? (
                <StatsCard className="reveal mt-6" stats={stats} />
              ) : null}
            </div>
            <div className="reveal relative aspect-4/3 overflow-hidden rounded-sm border border-white/10 lg:col-span-7">
              <Image
                alt="Mechanic working at a bench in the repair garage"
                className="object-cover object-[0%_62%]"
                fill
                preload
                sizes="(min-width: 1024px) 60vw, 100vw"
                src="/images/mac-hero.png"
              />
            </div>
          </div>
        </section>
      ) : (
        <EmptyNote>The shop profile is being updated.</EmptyNote>
      )}

      {categories.length > 0 ? (
        <section
          aria-labelledby="coverage-title"
          className="border-t border-white/10 py-14 lg:py-20"
        >
          <div className="shell">
            <h2
              className="reveal font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-wide uppercase"
              id="coverage-title"
            >
              What the shop covers
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <li className="reveal" key={category}>
                  <Link
                    className="glass-card glass-lift inline-flex h-11 items-center px-5 font-display text-lg tracking-wider"
                    href="/services"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ReviewsSection place={place} />

      <div className="shell pb-14 lg:pb-20">
        <BookingCard className="" phone={info.phone} />
      </div>
    </>
  );
}
