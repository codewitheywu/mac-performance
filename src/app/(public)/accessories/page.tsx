import type { Metadata } from "next";

import { AccessoryCard } from "@/components/accessory-card";
import { CallCard } from "@/components/booking-card";
import { Flares } from "@/components/flares";
import { PageHero } from "@/components/page-hero";
import { getAccessories, getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/accessories" },
  title: "Accessories",
  description:
    "Window tinting, sound systems, car alarms, car accessories, auto parts and air fresheners at MAC Automotive Performance.",
};

export default async function AccessoriesPage() {
  const [info, accessories] = await Promise.all([
    getBusinessInfo(),
    getAccessories(),
  ]);

  return (
    <>
      <PageHero
        image={{
          alt: "The accessories store with steering wheels, exhausts and boxed parts",
          position: "object-[50%_45%]",
          src: "/images/shop/accessories-wall.webp",
        }}
        summary="In the store, ready to take home or fit in our service bay."
        title="Accessories"
      />

      <div className="relative isolate overflow-clip">
        <Flares lines />
        <div className="shell flex flex-col gap-6 py-20 lg:py-28">
          <h2 className="sr-only">What we carry</h2>
          <ul
            aria-label="Accessories"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {accessories.map((accessory) => (
              <AccessoryCard
                accessory={accessory}
                className="aspect-4/3"
                key={accessory.slug}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </ul>
          <CallCard mobile={info.mobile} phone={info.phone} />
        </div>
      </div>
    </>
  );
}
