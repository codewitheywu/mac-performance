import type { Metadata } from "next";

import { NapSection } from "@/components/nap-section";
import { PageHero } from "@/components/page-hero";
import { getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Phone numbers, opening hours, address and a map to MAC Automotive Performance.",
};

export default async function ContactsPage() {
  const info = await getBusinessInfo();

  return (
    <>
      <PageHero
        image={{
          alt: "The shop front with its yellow MAC sign",
          position: "object-[50%_12%]",
          src: "/images/shop/storefront.webp",
        }}
        summary="Call first with the make and model, or come straight to the shop."
        title="Contacts"
      />

      <NapSection
        address={info.address}
        email={info.email}
        hours={info.hours}
        mapsQuery={info.mapsQuery}
        mapsUrl={info.mapsUrl}
        mobile={info.mobile}
        phone={info.phone}
        showPageLink={false}
      />
    </>
  );
}
