import { AccessoryCard } from "@/components/accessory-card";
import { SectionHeading } from "@/components/section-heading";
import { WheelRail } from "@/components/wheel-rail";
import type { Accessory } from "@/lib/content";

const MAX_ON_HOME = 8;

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
          link={{ href: "/accessories", label: "All accessories" }}
          title="Fitted here."
          titleMuted="Or take them home."
        />

        <WheelRail
          aria-label="Accessories"
          className="reveal mt-6 flex gap-3 overflow-x-auto overflow-y-hidden pt-2 pb-4"
          tabIndex={0}
        >
          {accessories.slice(0, MAX_ON_HOME).map((accessory) => (
            <AccessoryCard
              accessory={accessory}
              className="w-60 shrink-0"
              key={accessory.slug}
            />
          ))}
        </WheelRail>
      </div>
    </section>
  );
}
