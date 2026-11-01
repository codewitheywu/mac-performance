import { BookingCard } from "@/components/booking-card";
import { SectionHeading } from "@/components/section-heading";
import type { Service } from "@/lib/content";
import { formatPeso } from "@/lib/format";

type ServicesBentoProps = {
  phone: string | null;
  services: Service[];
};

// Deliberately uneven. Keyed by how many services the landing page shows, so
// the grid has no holes when the shop lists fewer.
const CARD_SPANS: Record<number, string[]> = {
  1: ["lg:col-span-12"],
  2: ["lg:col-span-7", "lg:col-span-5"],
  3: ["lg:col-span-7", "lg:col-span-5", "lg:col-span-12"],
  4: ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"],
};
const MAX_FEATURED = 4;

function ServiceCard({
  featured,
  index,
  service,
  span,
}: {
  featured: boolean;
  index: number;
  service: Service;
  span: string | undefined;
}) {
  return (
    <li className={`reveal glass-card glass-lift flex flex-col p-5 sm:p-6 ${span ?? ""}`}>
      <div className="flex items-baseline justify-between gap-4 text-xs font-semibold tracking-[0.18em] uppercase">
        <span className="text-white/70">{service.category}</span>
        <span aria-hidden="true" className="text-white/50 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        className={`mt-3 font-display leading-none tracking-wide uppercase ${
          featured ? "text-[clamp(2.25rem,4vw,3.25rem)]" : "text-3xl"
        }`}
      >
        {service.name}
      </h3>
      <p
        className={`mt-3 text-sm leading-relaxed text-white/75 ${featured ? "max-w-md" : ""}`}
      >
        {service.summary}
      </p>

      {service.includes.length > 0 ? (
        <ul
          className={`mt-4 text-sm sm:grid sm:gap-x-4 ${
            featured ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {service.includes.map((item) => (
            <li className="border-t border-white/10 py-2" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {service.priceFrom !== null || service.duration ? (
        <dl className="mt-auto flex items-end justify-between gap-4 pt-5">
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
            <div className="text-right">
              <dt className="text-[0.6875rem] font-semibold tracking-[0.12em] text-white/70 uppercase">
                Time
              </dt>
              <dd className="text-sm font-medium tabular-nums">
                {service.duration}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </li>
  );
}

export function ServicesBento({ phone, services }: ServicesBentoProps) {
  const featured = services.slice(0, MAX_FEATURED);
  const spans = CARD_SPANS[featured.length] ?? [];

  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-clip py-14 lg:py-20"
      id="services"
    >
      <div aria-hidden="true" className="speed-stripes absolute inset-0 -z-10" />
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          id="services-title"
          link={{ href: "/services", label: "All services" }}
          title="Our best sellers."
          titleMuted="Most booked."
        />

        <div className="mt-8 grid gap-3 lg:grid-cols-12">
          <ul className="contents">
            {featured.map((service, index) => (
              <ServiceCard
                featured={index === 0}
                index={index}
                key={service.slug}
                service={service}
                span={spans[index]}
              />
            ))}
          </ul>

          <BookingCard className="lg:col-span-12" phone={phone} />
        </div>
      </div>
    </section>
  );
}
