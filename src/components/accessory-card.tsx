import type { Accessory } from "@/lib/content";
import { formatPeso } from "@/lib/format";

export function AccessoryCard({
  accessory,
  className = "",
}: {
  accessory: Accessory;
  className?: string;
}) {
  return (
    <li className={`reveal glass-card glass-lift flex flex-col ${className}`}>
      <div className="flex aspect-4/3 items-center justify-center border-b border-white/10 text-[0.6875rem] font-semibold tracking-[0.18em] text-white/60 uppercase">
        Photo pending
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-white/70 uppercase">
          {accessory.category}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-none tracking-wide uppercase">
          {accessory.name}
        </h3>
        {accessory.priceFrom !== null ? (
          <p className="mt-auto pt-4 font-display text-2xl">
            <span className="sr-only">From </span>
            <span className="text-spark tabular-nums">
              {formatPeso(accessory.priceFrom)}
            </span>
          </p>
        ) : null}
      </div>
    </li>
  );
}
