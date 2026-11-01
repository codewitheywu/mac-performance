import type { GooglePlace } from "@/lib/google-place";

// Copied by hand from the shop's Google Maps listing, at the owner's request,
// instead of using the paid Places API. It does not update itself: re-copy it
// and change capturedOn. Quotes are verbatim; surnames are shortened because
// these are private customers. The live API replaces this once a key is set.
export const googleSnapshot: GooglePlace = {
  rating: 4.7,
  reviewCount: 44,
  mapsUrl: "https://maps.app.goo.gl/57vEtnDnNyx3eKk86",
  searchRank: null,
  capturedOn: "November 2026",
  reviews: [
    {
      author: "Henley B.",
      authorUrl: null,
      authorPhotoUrl: null,
      rating: 5,
      dateLabel: "2023",
      text: "Excellent service friendly professional and accommodating, work excellent standard thank you guys, would highly recommend this shop , will use them again",
    },
    {
      author: "Estil F.",
      authorUrl: null,
      authorPhotoUrl: null,
      rating: 5,
      dateLabel: "2026",
      text: "Quick, professional, helpful and fair.",
    },
    {
      author: "Joandrea S.",
      authorUrl: null,
      authorPhotoUrl: null,
      rating: 5,
      dateLabel: "2024",
      text: "Went here to have our car’s tint cut so that I could see clearer at night. They went ahead and did the job right away. I was so happy.",
    },
    {
      author: "Vic L.",
      authorUrl: null,
      authorPhotoUrl: null,
      rating: 5,
      dateLabel: "2025",
      text: "good and fast customer service. I am bery happy with the job well done",
    },
  ],
};
