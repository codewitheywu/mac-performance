import type { PastVisit } from "@/lib/content";
import { formatPeso } from "@/lib/format";

const visitDate = new Intl.DateTimeFormat("en-PH", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

export function ServiceHistory({ visits }: { visits: PastVisit[] }) {
  // Nothing to show: no card at all, rather than an empty box.
  if (visits.length === 0) return null;

  return (
    <section
      aria-labelledby="history-title"
      className="reveal glass-card p-6 sm:p-8"
    >
      <p className="eyebrow">Demo history</p>
      <h3
        className="mt-2 font-display text-4xl leading-none tracking-wide uppercase"
        id="history-title"
      >
        Past visits
      </h3>
      <ul className="mt-5 border-t border-white/15">
        {visits.map((visit) => (
          <li
            className="flex items-start justify-between gap-4 border-b border-white/15 py-3"
            key={`${visit.date}-${visit.serviceName}`}
          >
            <div className="min-w-0">
              <p className="font-display text-2xl leading-tight tracking-wide uppercase">
                {visit.serviceName}
              </p>
              <p className="text-sm text-white/90">{visit.car}</p>
              <p className="text-gold text-sm font-medium tabular-nums">
                {visitDate.format(new Date(`${visit.date}T00:00:00Z`))}
              </p>
            </div>
            <p className="shrink-0 font-semibold tabular-nums">
              {formatPeso(visit.total)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
