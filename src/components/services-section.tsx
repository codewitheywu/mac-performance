import Image from "next/image";

import { Flares } from "@/components/flares";
import { SectionHeading } from "@/components/section-heading";
import { ServicesBoard } from "@/components/services-board";
import type { Service } from "@/lib/content";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-clip py-20 lg:py-32"
      id="services"
    >
      <Flares flip lines />
      {/* Mirrors the shop section: glass on the left, photo on the right. */}
      <div className="shell flex flex-col lg:grid lg:grid-cols-12 lg:items-center">
        <div className="reveal rounded-glass relative order-1 aspect-16/10 overflow-clip lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:aspect-4/3">
          <Image
            alt="White Land Rover Defender in the service bay with the hood up"
            className="shop-photo photo-drift object-cover object-[60%_center]"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            src="/images/shop/engine-bay.webp"
          />
        </div>
        <div className="reveal glass-card glass-sheen z-10 order-2 mx-3 -mt-16 p-6 [--glass-tint:0.5] sm:p-8 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:p-10">
          <SectionHeading
            id="services-title"
            link={{ href: "/services", label: "All services" }}
            title="Services"
          />
          <div className="mt-6">
            <ServicesBoard services={services} />
          </div>
        </div>
      </div>
    </section>
  );
}
