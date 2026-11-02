import Image from "next/image";

import { Flares } from "@/components/flares";
import { OpenStatus } from "@/components/open-status";
import { RatingStars } from "@/components/rating-stars";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";
import type { GooglePlace } from "@/lib/google-place";

const factLabelClass = "text-xs font-medium text-white/85";

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
      {/* The sign carries the page, so the photo starts below the navbar and the
          glass sits under the sign. Below lg it is a band on top; from lg it
          fills the right of the hero. */}
      <div className="absolute inset-x-0 top-0 -z-20 aspect-16/9 lg:inset-y-0 lg:right-0 lg:left-auto lg:aspect-auto lg:w-full xl:w-[84%]">
        <Image
          alt="The shop front with its yellow MAC sign, the accessories store and the service bay"
          className="shop-photo object-cover object-top lg:object-[38%_0%]"
          fill
          preload
          sizes="(min-width: 1280px) max(84vw, 178svh), (min-width: 1024px) max(100vw, 178svh), 100vw"
          src="/images/shop/storefront.webp"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black to-transparent to-45%"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-linear-to-r from-black to-transparent to-14% lg:block"
        />
      </div>

      <Flares />
      <div
        aria-hidden="true"
        className="hero-flare flare-in inset-y-0 left-0 -z-10 hidden w-[28%] xl:block"
      />

      <div className="shell flex min-h-[calc(100svh-5rem)] flex-col justify-end gap-3 pt-[calc(56.25vw-3.5rem)] pb-6 lg:min-h-[max(calc(100svh-5rem),52rem)] lg:pt-16 lg:pb-8">
        <div className="glass-card glass-sheen sheen-in p-5 [--glass-tint:0.5] sm:p-8 lg:max-w-xl lg:p-7 xl:p-10">
          <p className="eyebrow">MAC Automotive Performance</p>
          <h1
            className="mt-3 font-display text-[clamp(3.25rem,5.6vw,5.75rem)] leading-[0.92] tracking-wide uppercase"
            id="hero-title"
          >
            Car repairs, tint, sound and parts.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/90">
            On {info.area}. Open six days a week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-race tabular-nums" href={telHref(info.phone)}>
              Call {info.phone}
            </a>
            <a
              className="btn btn-glass"
              href={info.mapsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Get directions
            </a>
          </div>
        </div>

        <dl className="rise-in glass-card grid [--glass-tint:0.55] divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col-reverse gap-1 p-4 lg:px-6">
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
          <div className="flex flex-col-reverse gap-1 p-4 lg:px-6">
            <dt className={factLabelClass}>
              {place.reviewCount} Google reviews
            </dt>
            <dd className="text-gold flex items-center gap-2 font-display text-2xl tabular-nums">
              {place.rating.toFixed(1)}
              <RatingStars className="text-base" fillClass="text-gold" rating={place.rating} />
            </dd>
          </div>
          <div className="flex flex-col-reverse gap-1 p-4 lg:px-6">
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
