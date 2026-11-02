import { AccessoryCard } from "@/components/accessory-card";
import { Flares } from "@/components/flares";
import { SectionHeading } from "@/components/section-heading";
import { WheelRail } from "@/components/wheel-rail";
import type { Accessory } from "@/lib/content";

export function AccessoriesRail({ accessories }: { accessories: Accessory[] }) {
  return (
    <section
      aria-labelledby="accessories-title"
      className="relative isolate overflow-clip py-20 lg:py-28"
      id="accessories"
    >
      <Flares lines />
      <div className="shell">
        <SectionHeading
          id="accessories-title"
          link={{ href: "/accessories", label: "All accessories" }}
          title="Accessories"
        />
        <WheelRail
          aria-label="Accessories"
          className="reveal mt-6 flex gap-4 overflow-x-auto overflow-y-hidden pt-2 pb-4"
          tabIndex={0}
        >
          {accessories.map((accessory) => (
            <AccessoryCard
              accessory={accessory}
              className="aspect-4/5 w-72 shrink-0"
              key={accessory.slug}
              sizes="288px"
            />
          ))}
        </WheelRail>
      </div>
    </section>
  );
}
