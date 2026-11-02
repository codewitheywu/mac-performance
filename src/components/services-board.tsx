import type { Service } from "@/lib/content";
import { formatPeso } from "@/lib/format";

// Set like the shop's own sign: names only, large, one to a line. The detailed
// board adds what each job covers, how long it takes and where prices start.
export function ServicesBoard({
  detailed = false,
  services,
}: {
  detailed?: boolean;
  services: Service[];
}) {
  return (
    <ul className="border-t border-white/15">
      {services.map((service, index) => (
        <li
          className="reveal border-b border-white/15 py-3.5"
          key={service.slug}
        >
          <div className="flex items-baseline justify-between gap-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] leading-none tracking-wide uppercase">
            {service.name}
            <span aria-hidden="true" className="text-gold text-xl tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          {detailed && service.details ? (
            <div className="mt-2 flex flex-col gap-x-6 gap-y-1 text-sm leading-relaxed sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-white/90">{service.details.summary}</p>
              <p className="shrink-0 tabular-nums">
                <span className="text-white/85">{service.details.duration}</span>
                <span aria-hidden="true" className="px-2 text-white/40">
                  /
                </span>
                <span className="text-gold font-semibold whitespace-nowrap">
                  from {formatPeso(service.details.fromPrice)}
                </span>
              </p>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
