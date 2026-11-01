import { AboutSection } from "@/components/about-section";
import { AccessoriesRail } from "@/components/accessories-rail";
import { Hero } from "@/components/hero";
import { NapSection } from "@/components/nap-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesBento } from "@/components/services-bento";
import {
  getAccessories,
  getBestSellingServices,
  getBusinessInfo,
  getStats,
} from "@/lib/content";
import { getGooglePlace } from "@/lib/google-place";

export default async function Home() {
  const [info, stats, services, accessories, place] = await Promise.all([
    getBusinessInfo(),
    getStats(),
    getBestSellingServices(),
    getAccessories(),
    getGooglePlace(),
  ]);

  const jsonLd =
    info.address || info.phone
      ? {
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "MAC Performance",
          ...(info.address ? { address: info.address } : {}),
          ...(info.phone ? { telephone: info.phone } : {}),
          ...(info.email ? { email: info.email } : {}),
        }
      : null;

  return (
    <>
      {jsonLd ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
      {/* Same order as the navbar, so the page reads one button after another. */}
      <Hero stats={stats} />
      {info.about ? <AboutSection about={info.about} /> : null}
      {services.length > 0 ? (
        <ServicesBento phone={info.phone} services={services} />
      ) : null}
      {accessories.length > 0 ? <AccessoriesRail accessories={accessories} /> : null}
      <ReviewsSection place={place} />
      {info.address ? (
        <NapSection
          address={info.address}
          email={info.email}
          hours={info.hours}
          mapsQuery={info.mapsQuery}
          mapsUrl={info.mapsUrl}
          phone={info.phone}
        />
      ) : null}
    </>
  );
}
