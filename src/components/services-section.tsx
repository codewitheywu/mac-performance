import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { ServicesBoard } from "@/components/services-board";
import type { Service } from "@/lib/content";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="services-title" className="py-20 lg:py-32" id="services">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            id="services-title"
            link={{ href: "/services", label: "All services" }}
            title="Services"
          />
          <div className="mt-6">
            <ServicesBoard services={services} />
          </div>
        </div>
        <div className="reveal relative min-h-72 overflow-hidden rounded-sm lg:col-span-5">
          <Image
            alt="White Land Rover Defender in the service bay with the hood up"
            className="shop-photo object-cover object-[45%_center]"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            src="/images/shop/engine-bay.webp"
          />
        </div>
      </div>
    </section>
  );
}
