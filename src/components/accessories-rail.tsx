import { SectionHeading } from "@/components/section-heading";
import type { Accessory } from "@/lib/content";
import { formatPeso } from "@/lib/format";

export function AccessoriesRail({ accessories }: { accessories: Accessory[] }) {
  return (
    <section
      aria-labelledby="accessories-title"
      className="relative isolate overflow-clip border-y border-white/10 bg-white/[0.02] py-14 lg:py-20"
      id="accessories"
    >
      <div aria-hidden="true" className="speed-stripes absolute inset-0 -z-10" />
      <div className="shell">
        <SectionHeading
          eyebrow="The parts counter"
          id="accessories-title"
          title="Fitted here."
          titleMuted="Or take them home."
        />

        <ul
          aria-label="Accessories"
          className="reveal mt-6 flex snap-x gap-3 overflow-x-auto overflow-y-hidden pt-2 pb-4"
          tabIndex={0}
        >
          {accessories.map((accessory) => (
            <li
              className="reveal glass-card glass-lift flex w-60 shrink-0 snap-start flex-col"
              key={accessory.slug}
            >
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
          ))}
        </ul>
      </div>
    </section>
  );
}
