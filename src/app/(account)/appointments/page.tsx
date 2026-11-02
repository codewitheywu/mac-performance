import type { Metadata } from "next";

import { AccessoryCard } from "@/components/accessory-card";
import { AppointmentList } from "@/components/appointment-list";
import { BookingPanel } from "@/components/booking-panel";
import { Flares } from "@/components/flares";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ShopList } from "@/components/shop-list";
import { ShopToggle } from "@/components/shop-toggle";
import { getAccessories, getBusinessInfo, getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Appointments and shop",
  description: "Book a visit and pick accessories at MAC Automotive Performance.",
};

export default async function AppointmentsPage() {
  const [info, services, accessories] = await Promise.all([
    getBusinessInfo(),
    getServices(),
    getAccessories(),
  ]);
  const catalog = accessories.map(({ name, slug }) => ({ name, slug }));

  return (
    <>
      <PageHero
        image={{
          alt: "White Land Rover Defender in the service bay with the hood up",
          position: "object-[50%_45%]",
          src: "/images/shop/engine-bay.webp",
        }}
        summary="Book your car in, and pick accessories to collect or have fitted on the same visit."
        title="Book and shop"
      />

      <section
        aria-labelledby="appointments-title"
        className="relative isolate overflow-clip"
        id="appointments"
      >
        <Flares lines />
        <div className="shell py-14 lg:py-20">
          <SectionHeading id="appointments-title" title="Appointments" />
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
            <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-5">
              <AppointmentList />
            </div>
            <div className="min-w-0 lg:col-span-7">
              <BookingPanel
                accessories={catalog}
                openHours={info.openHours}
                services={services.map(({ name, slug }) => ({ name, slug }))}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="shop-title"
        className="relative isolate overflow-clip"
        id="shop"
      >
        <Flares flip lines />
        <div className="shell py-14 lg:py-20">
          <SectionHeading id="shop-title" title="Accessories shop" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
            Add what you want from the store. Collect it on your visit, or have
            it fitted in the service bay.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
            <ul
              aria-label="Accessories"
              className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-8"
            >
              {accessories.map((accessory) => (
                <AccessoryCard
                  accessory={accessory}
                  action={<ShopToggle name={accessory.name} slug={accessory.slug} />}
                  className="aspect-4/3"
                  key={accessory.slug}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                />
              ))}
            </ul>
            <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-4">
              <ShopList accessories={catalog} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
