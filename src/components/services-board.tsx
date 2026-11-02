import type { Service } from "@/lib/content";

// Set like the shop's own sign: names only, large, one to a line.
export function ServicesBoard({ services }: { services: Service[] }) {
  return (
    <ul className="border-t border-white/15">
      {services.map((service, index) => (
        <li
          className="reveal flex items-baseline justify-between gap-4 border-b border-white/15 py-3.5 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] leading-none tracking-wide uppercase"
          key={service.slug}
        >
          {service.name}
          <span aria-hidden="true" className="text-gold text-xl tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
        </li>
      ))}
    </ul>
  );
}
