import Image from "next/image";

import { RatingStars } from "@/components/rating-stars";
import type { GooglePlace, GoogleReview } from "@/lib/google-place";

function ReviewAuthor({ review }: { review: GoogleReview }) {
  const name = (
    <span className="flex items-center gap-3">
      {review.authorPhotoUrl ? (
        <Image
          alt=""
          className="size-8 rounded-full"
          height={32}
          src={review.authorPhotoUrl}
          width={32}
        />
      ) : null}
      <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
        {review.author}
      </span>
    </span>
  );

  return (
    <figcaption className="flex items-center justify-between gap-4">
      {review.authorUrl ? (
        <a href={review.authorUrl} rel="noopener noreferrer" target="_blank">
          {name}
        </a>
      ) : (
        name
      )}
      <span className="text-xs text-white/70 tabular-nums">{review.dateLabel}</span>
    </figcaption>
  );
}

function FeaturedReview({ review }: { review: GoogleReview }) {
  return (
    <figure className="reveal">
      <span
        aria-hidden="true"
        className="text-gold block h-10 font-display text-8xl leading-[0.7]"
      >
        “
      </span>
      <blockquote className="mt-2 text-[clamp(1.375rem,2.4vw,2rem)] leading-snug font-light text-white">
        {review.text}
      </blockquote>
      <div className="mt-6">
        <ReviewAuthor review={review} />
      </div>
    </figure>
  );
}

function ReviewRow({ review }: { review: GoogleReview }) {
  return (
    <li className="reveal border-gold/25 border-t py-6 md:odd:last:col-span-2">
      <figure>
        <RatingStars
          className="text-sm"
          fillClass="text-gold"
          rating={review.rating}
        />
        <blockquote className="mt-3 text-base leading-relaxed font-light text-white/85">
          {review.text}
        </blockquote>
        <div className="mt-4">
          <ReviewAuthor review={review} />
        </div>
      </figure>
    </li>
  );
}

export function ReviewsSection({ place }: { place: GooglePlace }) {
  const [featured, ...others] = place.reviews;

  return (
    <section
      aria-labelledby="reviews-title"
      className="border-gold/25 relative isolate overflow-clip border-y py-20 lg:py-28"
      id="reviews"
    >
      <div aria-hidden="true" className="hero-flare inset-0 -z-10 opacity-60" />
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
            Rated on Google
          </p>
          <h2
            className="mt-3 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none tracking-wide uppercase"
            id="reviews-title"
          >
            In our customers’ words
          </h2>

          <p className="text-gold mt-8 font-display text-[clamp(7rem,14vw,11rem)] leading-[0.85] tabular-nums">
            {place.rating.toFixed(1)}
          </p>
          <RatingStars
            className="mt-3 text-2xl"
            fillClass="text-gold"
            rating={place.rating}
          />
          <p className="mt-3 text-sm font-light text-white/85 tabular-nums">
            {place.reviewCount.toLocaleString("en-PH")} Google reviews
            {place.capturedOn ? ` · As of ${place.capturedOn}` : null}
          </p>

          {place.searchRank ? (
            <p className="mt-4 text-sm leading-relaxed font-light text-white/85">
              <span className="text-gold mr-2 font-display text-3xl tabular-nums">
                #{place.searchRank.position}
              </span>
              in Google results for “{place.searchRank.query}”
            </p>
          ) : null}

          <a
            className="border-gold/60 hover:border-gold mt-8 inline-flex h-12 items-center rounded-sm border px-6 font-display text-lg tracking-widest transition-colors duration-200 ease-race"
            href={place.mapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Read all reviews on Google
          </a>
        </div>

        {featured ? (
          <div className="lg:col-span-7">
            <FeaturedReview review={featured} />
            {others.length > 0 ? (
              <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
                {others.map((review) => (
                  <ReviewRow
                    key={`${review.author}-${review.dateLabel}`}
                    review={review}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
