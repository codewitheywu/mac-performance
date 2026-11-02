import type { Metadata } from "next";

import { AppointmentList } from "@/components/appointment-list";
import { BookingPanel } from "@/components/booking-panel";
import { CartJump, CartPanel } from "@/components/cart-panel";
import { Flares } from "@/components/flares";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceHistory } from "@/components/service-history";
import { ShopCatalog } from "@/components/shop-catalog";
import {
  getAccessories,
  getBusinessInfo,
  getCustomer,
  getProducts,
  getServices,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Appointments and shop",
  description: "Book a visit and shop accessories at MAC Automotive Performance.",
};

export default async function AppointmentsPage() {
  const [info, services, accessories, products, customer] = await Promise.all([
    getBusinessInfo(),
    getServices(),
    getAccessories(),
    getProducts(),
    getCustomer(),
  ]);
  const catalog = products.map(({ name, price, slug, stock }) => ({
    name,
    price,
    slug,
    stock,
  }));

  return (
    <>
      <PageHero
        image={{
          alt: "White Land Rover Defender in the service bay with the hood up",
          position: "object-[50%_45%]",
          src: "/images/shop/engine-bay.webp",
        }}
        summary={`Signed in as ${customer.name}, a demo customer. Book your car in, and buy parts to collect or have fitted on the same visit.`}
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
            <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-24 lg:col-span-5">
              <AppointmentList />
              <ServiceHistory visits={customer.history} />
            </div>
            <div className="min-w-0 lg:col-span-7">
              <BookingPanel
                catalog={catalog}
                openHours={info.openHours}
                services={services.map(({ details, name, slug }) => ({
                  details,
                  name,
                  slug,
                }))}
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
            Order from the store. Collect it on your visit, or have it fitted in
            the service bay. Products, prices and stock here are a demo.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
            <div className="min-w-0 lg:col-span-8">
              <ShopCatalog
                categories={accessories.map(({ name, slug }) => ({ name, slug }))}
                products={products}
              />
              <CartJump catalog={catalog} />
            </div>
            <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-4">
              <CartPanel catalog={catalog} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
