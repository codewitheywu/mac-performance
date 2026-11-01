import "server-only";

import { cache } from "react";

import { googleSnapshot } from "@/lib/google-snapshot";

const PLACES_API = "https://places.googleapis.com/v1";
const CACHE_SECONDS = 60 * 60 * 12;
const RANK_QUERY = "auto repair shop in Olongapo City";
const REQUEST_TIMEOUT_MS = 5000;
const PHOTO_HOST = "lh3.googleusercontent.com";

export type GoogleReview = {
  author: string;
  authorUrl: string | null;
  authorPhotoUrl: string | null;
  rating: number;
  dateLabel: string;
  text: string;
};

export type GooglePlace = {
  rating: number;
  reviewCount: number;
  mapsUrl: string;
  reviews: GoogleReview[];
  // Where the shop sits in Google's own results for RANK_QUERY. Google
  // publishes no official ranking, so this is reported as a search position.
  searchRank: { position: number; query: string } | null;
  // Set when this is a hand-copied snapshot rather than live data.
  capturedOn: string | null;
};

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }[];
};

type SearchResponse = { places?: { id?: string }[] };

async function placesRequest<T>(
  path: string,
  apiKey: string,
  fieldMask: string,
  init: RequestInit = {},
): Promise<T | null> {
  try {
    // Only successful responses are cached, so a failed refresh keeps serving
    // the last good value.
    const response = await fetch(`${PLACES_API}${path}`, {
      ...init,
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
      next: { revalidate: CACHE_SECONDS, tags: ["google-place"] },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`Places API ${path} returned ${response.status}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Places API ${path} failed`, error);
    return null;
  }
}

async function getSearchRank(apiKey: string, placeId: string) {
  const result = await placesRequest<SearchResponse>(
    "/places:searchText",
    apiKey,
    "places.id",
    {
      body: JSON.stringify({ pageSize: 20, regionCode: "PH", textQuery: RANK_QUERY }),
      method: "POST",
    },
  );
  const index = result?.places?.findIndex((place) => place.id === placeId) ?? -1;
  return index === -1 ? null : { position: index + 1, query: RANK_QUERY };
}

// next/image only accepts absolute URLs on the host allowed in next.config.
function reviewerPhoto(photoUri: string | undefined) {
  if (!photoUri) return null;
  const url = new URL(photoUri, `https://${PHOTO_HOST}`);
  return url.hostname === PHOTO_HOST ? `https://${url.host}${url.pathname}` : null;
}

// Live data when the API is configured and answers, otherwise the dated copy
// from the listing.
export const getGooglePlace = cache(async (): Promise<GooglePlace> => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return googleSnapshot;

  const [place, searchRank] = await Promise.all([
    placesRequest<PlaceResponse>(
      `/places/${encodeURIComponent(placeId)}?languageCode=en&regionCode=PH`,
      apiKey,
      "rating,userRatingCount,googleMapsUri,reviews",
    ),
    getSearchRank(apiKey, placeId),
  ]);
  if (!place?.rating || !place.userRatingCount || !place.googleMapsUri) {
    return googleSnapshot;
  }

  return {
    rating: place.rating,
    reviewCount: place.userRatingCount,
    mapsUrl: place.googleMapsUri,
    searchRank,
    capturedOn: null,
    reviews: (place.reviews ?? []).flatMap((review) => {
      const author = review.authorAttribution?.displayName;
      const text = review.text?.text;
      if (!author || !text || !review.rating) return [];
      return [
        {
          author,
          authorUrl: review.authorAttribution?.uri ?? null,
          authorPhotoUrl: reviewerPhoto(review.authorAttribution?.photoUri),
          rating: review.rating,
          dateLabel: review.relativePublishTimeDescription ?? "",
          text,
        },
      ];
    }),
  };
});
