import type { Service } from "@/lib/content";

// Set like the shop's own sign: names only, large, one to a line.
export function ServicesBoard({ services }: { services: Service[] }) {
  return (
    <ul className="border-gold/30 border-t">
      {services.map((service) => (
        <li
          className="reveal border-gold/30 border-b py-4 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none tracking-wide uppercase"
          key={service.slug}
        >
          {service.name}
        </li>
      ))}
    </ul>
  );
}
