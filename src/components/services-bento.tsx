import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { Service } from "@/lib/content";
import { formatPeso, telHref } from "@/lib/format";

type ServicesBentoProps = {
  bookHref: string | null;
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

const cardClass = "reveal glass-card glass-lift flex flex-col p-5 sm:p-6";

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
    <li className={`${cardClass} ${span ?? ""}`}>
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

export function ServicesBento({ bookHref, phone, services }: ServicesBentoProps) {
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
          title="Everything your car needs."
          titleMuted="One roof."
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

          {bookHref || phone ? (
            <aside
              aria-label="Book a service"
              className={`${cardClass} justify-between gap-5 sm:flex-row sm:items-center lg:col-span-12`}
            >
              <div>
                <p className="font-display text-3xl leading-none tracking-wide uppercase">
                  Car needs a look?
                </p>
                <p className="mt-2 text-sm text-white/75">
                  Tell us the make, the model and what it is doing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {bookHref ? (
                  <a
                    className="bg-race hover:bg-race-deep inline-flex h-11 items-center gap-2 rounded-sm px-5 font-display text-lg tracking-wider transition-colors duration-200 ease-race"
                    href={bookHref}
                  >
                    Book a service
                    <ArrowIcon height="16" width="16" />
                  </a>
                ) : null}
                {phone ? (
                  <a
                    className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/25 px-5 font-display text-lg tracking-wider tabular-nums transition-colors duration-200 ease-race hover:border-white/60"
                    href={telHref(phone)}
                  >
                    <PhoneIcon height="16" width="16" />
                    {phone}
                  </a>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
