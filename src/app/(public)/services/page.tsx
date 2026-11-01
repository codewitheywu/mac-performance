import type { Metadata } from "next";
import Link from "next/link";

import { CallCard } from "@/components/booking-card";
import { PageHero } from "@/components/page-hero";
import { ServicesBoard } from "@/components/services-board";
import { getBusinessInfo, getServices } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Oil change, brakes, suspension, engine, electrical, tune-up and troubleshooting at MAC Automotive Performance.",
};

export default async function ServicesPage() {
  const [info, services] = await Promise.all([getBusinessInfo(), getServices()]);

  return (
    <>
      <PageHero
        image={{
          alt: "White Land Rover Defender in the service bay with the hood up",
          position: "object-[50%_45%]",
          src: "/images/shop/engine-bay.webp",
        }}
        summary="Everything on the sign, handled in our service bay. Call for a quote."
        title="Services"
      />

      <div className="shell flex flex-col gap-12 py-20 lg:py-28">
        <ServicesBoard services={services} />
        <p className="text-base text-white/85">
          Buying a stereo, tint or an alarm?{" "}
          <Link
            className="text-gold decoration-gold/50 hover:decoration-gold -my-3 inline-block py-3 underline underline-offset-4"
            href="/accessories"
          >
            See accessories
          </Link>
          .
        </p>
        <CallCard mobile={info.mobile} phone={info.phone} />
      </div>
    </>
  );
}
