import Image from "next/image";

import { OpenStatus } from "@/components/open-status";
import { RatingStars } from "@/components/rating-stars";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";
import type { GooglePlace } from "@/lib/google-place";

const factLabelClass = "text-xs font-medium text-white/80";

export function Hero({
  info,
  place,
}: {
  info: BusinessInfo;
  place: GooglePlace;
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      id="top"
    >
      {/* The sign carries the page, so the photo stays clear of the copy. Below
          lg it is a band on top; from lg it fills the right of the hero. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-56 sm:h-96 lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[62%]">
        <Image
          alt="The shop front with its yellow MAC sign, the accessories store and the service bay"
          className="shop-photo object-cover object-top lg:object-[34%_0%]"
          fill
          preload
          sizes="(min-width: 1024px) max(62vw, 178svh), 100vw"
          src="/images/shop/storefront.webp"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black to-transparent to-35% lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-black to-transparent to-16% lg:block"
        />
      </div>

      <div
        aria-hidden="true"
        className="hero-flare flare-in inset-y-0 left-0 -z-10 hidden w-3/4 lg:block"
      />

      <div className="shell flex min-h-[calc(100svh-5rem)] flex-col justify-end gap-8 pt-52 pb-6 sm:pt-88 lg:justify-between lg:pt-24">
        <div className="max-w-md lg:max-w-[20rem] xl:max-w-sm 2xl:max-w-md">
          <h1
            className="font-display text-[clamp(3.25rem,5.6vw,6rem)] leading-[0.92] tracking-wide uppercase"
            id="hero-title"
          >
            Car repairs, tint, sound and parts.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            On {info.area}. Open six days a week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="bg-race hover:bg-race-deep inline-flex h-12 items-center rounded-sm px-6 font-display text-xl tracking-wider tabular-nums transition-colors duration-200 ease-race"
              href={telHref(info.phone)}
            >
              Call {info.phone}
            </a>
            <a
              className="inline-flex h-12 items-center rounded-sm border border-gold/60 hover:border-gold px-6 font-display text-xl tracking-wider transition-colors duration-200 ease-race"
              href={info.mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get directions
            </a>
          </div>
        </div>

        <dl className="rise-in glass-card bg-black/70! grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col-reverse gap-1 p-4">
            <dt className={factLabelClass}>
              {info.hours
                .slice(0, -1)
                .map((entry) => `${entry.days}: ${entry.time}`)
                .join(" · ")}
            </dt>
            <dd className="font-display text-2xl tracking-wide">
              <OpenStatus openHours={info.openHours} />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-1 p-4">
            <dt className={factLabelClass}>
              {place.reviewCount} Google reviews
            </dt>
            <dd className="text-gold flex items-center gap-2 font-display text-2xl tabular-nums">
              {place.rating.toFixed(1)}
              <RatingStars className="text-base" fillClass="text-gold" rating={place.rating} />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-1 p-4">
            <dt className={factLabelClass}>Service bay and accessories store</dt>
            <dd className="font-display text-2xl tracking-wide">
              {info.address.split(",")[0]}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
