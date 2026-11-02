import type { Metadata } from "next";

import { AppointmentList } from "@/components/appointment-list";
import { BookingPanel } from "@/components/booking-panel";
import { Flares } from "@/components/flares";
import { OpenStatus } from "@/components/open-status";
import { PageHero } from "@/components/page-hero";
import { getBusinessInfo, getServices } from "@/lib/content";
import { telHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Your appointments",
  description: "Book a visit to MAC Automotive Performance.",
};

export default async function AppointmentsPage() {
  const [info, services] = await Promise.all([getBusinessInfo(), getServices()]);

  return (
    <>
      <PageHero
        image={{
          alt: "White Land Rover Defender in the service bay with the hood up",
          position: "object-[50%_45%]",
          src: "/images/shop/engine-bay.webp",
        }}
        summary="See what is coming up, or book your car in."
        title="Your appointments"
      />

      <div className="relative isolate overflow-clip">
        <Flares lines />
        <div className="shell grid gap-4 py-14 lg:grid-cols-12 lg:items-start lg:py-20">
          <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:col-span-5">
            <AppointmentList />

            <section
              aria-labelledby="visit-title"
              className="reveal glass-card p-6 sm:p-8"
            >
              <p className="eyebrow">The shop</p>
              <h2
                className="mt-2 font-display text-3xl leading-none tracking-wide uppercase"
                id="visit-title"
              >
                <OpenStatus openHours={info.openHours} />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {info.address}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a className="btn btn-race tabular-nums" href={telHref(info.phone)}>
                  Call {info.phone}
                </a>
                <a
                  className="btn btn-glass"
                  href={info.mapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Get directions
                </a>
              </div>
            </section>
          </div>

          <div className="lg:col-span-7">
            <BookingPanel
              openHours={info.openHours}
              services={services.map(({ name, slug }) => ({ name, slug }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
