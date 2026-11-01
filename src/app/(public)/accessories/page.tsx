import type { Metadata } from "next";

import { AccessoryCard } from "@/components/accessory-card";
import { BookingCard } from "@/components/booking-card";
import { EmptyNote } from "@/components/empty-note";
import { PageHero } from "@/components/page-hero";
import { getAccessories, getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Accessories",
  description:
    "Car accessories and performance parts at MAC Performance, fitted at the shop or ready to take home.",
};

export default async function AccessoriesPage() {
  const [info, accessories] = await Promise.all([
    getBusinessInfo(),
    getAccessories(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Accessories"
        summary="Parts and accessories in stock at the counter, fitted at the shop or ready to take home."
        title="Fitted here."
        titleMuted="Or take them home."
      />

      {accessories.length > 0 ? (
        <div className="shell flex flex-col gap-6 py-14 lg:py-20">
          <ul
            aria-label="Accessories"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {accessories.map((accessory) => (
              <AccessoryCard accessory={accessory} key={accessory.slug} />
            ))}
          </ul>
          <BookingCard className="" phone={info.phone} />
        </div>
      ) : (
        <EmptyNote>The accessories list is being updated.</EmptyNote>
      )}
    </>
  );
}
