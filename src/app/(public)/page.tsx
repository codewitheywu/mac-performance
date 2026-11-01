import { AboutSection } from "@/components/about-section";
import { AccessoriesRail } from "@/components/accessories-rail";
import { Hero } from "@/components/hero";
import { NapSection } from "@/components/nap-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ServicesSection } from "@/components/services-section";
import {
  getAccessories,
  getBusinessInfo,
  getFeaturedServices,
} from "@/lib/content";
import { getGooglePlace } from "@/lib/google-place";

export default async function Home() {
  const [info, services, accessories, place] = await Promise.all([
    getBusinessInfo(),
    getFeaturedServices(),
    getAccessories(),
    getGooglePlace(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "MAC Automotive Performance",
    address: info.address,
    telephone: info.phone,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      {/* Same order as the navbar, so the page reads one button after another. */}
      <Hero info={info} place={place} />
      <AboutSection about={info.about} />
      <ServicesSection services={services} />
      <AccessoriesRail accessories={accessories} />
      <ReviewsSection place={place} />
      <NapSection
        address={info.address}
        email={info.email}
        hours={info.hours}
        mapsQuery={info.mapsQuery}
        mapsUrl={info.mapsUrl}
        mobile={info.mobile}
        phone={info.phone}
      />
    </>
  );
}
