import type { BusinessInfo } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function clockTime(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function ShopJsonLd({ info }: { info: BusinessInfo }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "MAC Automotive Performance",
    url: SITE_URL,
    image: `${SITE_URL}/images/shop/storefront.webp`,
    address: info.address,
    telephone: info.phone,
    openingHoursSpecification: info.openHours.flatMap((hours, day) =>
      hours
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: DAY_NAMES[day],
              opens: clockTime(hours[0]),
              closes: clockTime(hours[1]),
            },
          ]
        : [],
    ),
    sameAs: info.socials.map((social) => social.href),
  };

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
