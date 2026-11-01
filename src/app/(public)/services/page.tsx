import type { Metadata } from "next";

import { BookingCard } from "@/components/booking-card";
import { EmptyNote } from "@/components/empty-note";
import { PageHero } from "@/components/page-hero";
import { getBusinessInfo, getServices, type Service } from "@/lib/content";
import { formatPeso } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The full MAC Performance service list: repairs, diagnostics, tuning and maintenance, with what each job includes.",
};

function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="reveal glass-card glass-lift grid gap-4 p-5 sm:p-6 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <h3 className="font-display text-3xl leading-none tracking-wide uppercase">
          {service.name}
        </h3>
        {service.isBestSeller ? (
          <p className="text-spark mt-2 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase">
            Best seller
          </p>
        ) : null}
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          {service.summary}
        </p>
      </div>

      <ul className="text-sm lg:col-span-5">
        {service.includes.map((item) => (
          <li className="border-t border-white/10 py-1.5 first:border-t-0" key={item}>
            {item}
          </li>
        ))}
      </ul>

      <dl className="lg:col-span-2 lg:text-right">
        {service.priceFrom !== null ? (
          <div>
            <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/70 uppercase">
              From
            </dt>
            <dd className="text-spark font-display text-3xl tabular-nums">
              {formatPeso(service.priceFrom)}
            </dd>
          </div>
        ) : null}
        {service.duration ? (
          <div className="mt-2">
            <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/70 uppercase">
              Time
            </dt>
            <dd className="text-sm font-medium tabular-nums">{service.duration}</dd>
          </div>
        ) : null}
      </dl>
    </li>
  );
}

export default async function ServicesPage() {
  const [info, services] = await Promise.all([getBusinessInfo(), getServices()]);
  const categories = Map.groupBy(services, (service) => service.category);

  return (
    <>
      <PageHero
        eyebrow="Services"
        summary="Every job the shop takes on, what it includes and where the price starts."
        title="The full"
        titleMuted="service list."
      />

      {services.length > 0 ? (
        <div className="shell flex flex-col gap-10 py-14 lg:py-20">
          {[...categories].map(([category, items]) => (
            <section aria-label={category} key={category}>
              <h2 className="reveal border-b border-white/10 pb-3 font-display text-4xl tracking-wide uppercase">
                {category}
                <span className="ml-3 text-xl text-white/60 tabular-nums">
                  {String(items.length).padStart(2, "0")}
                </span>
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                {items.map((service) => (
                  <ServiceRow key={service.slug} service={service} />
                ))}
              </ul>
            </section>
          ))}
          <BookingCard className="" phone={info.phone} />
        </div>
      ) : (
        <EmptyNote>The service list is being updated.</EmptyNote>
      )}
    </>
  );
}
