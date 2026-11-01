import type { Metadata } from "next";

import { EmptyNote } from "@/components/empty-note";
import { NapSection } from "@/components/nap-section";
import { PageHero } from "@/components/page-hero";
import { getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Call, email or visit MAC Performance. Address, phone, opening hours and a map to the shop.",
};

export default async function ContactsPage() {
  const info = await getBusinessInfo();

  return (
    <>
      <PageHero
        eyebrow="Contacts"
        summary="Call ahead with the make, the model and what the car is doing, or bring it straight to the shop."
        title="Come by"
        titleMuted="or give us a call."
      />

      {info.address ? (
        <NapSection
          address={info.address}
          email={info.email}
          hours={info.hours}
          mapsQuery={info.mapsQuery}
          mapsUrl={info.mapsUrl}
          phone={info.phone}
          showPageLink={false}
        />
      ) : (
        <EmptyNote>Contact details are being updated.</EmptyNote>
      )}
    </>
  );
}
