import Image from "next/image";

import type { Accessory } from "@/lib/content";

const nameClass = "font-display text-3xl leading-none tracking-wide uppercase";

export function AccessoryCard({
  accessory,
  className = "",
  sizes,
}: {
  accessory: Accessory;
  className?: string;
  sizes: string;
}) {
  // No photo yet: a gold-lettered glass tile instead of an empty placeholder.
  if (!accessory.image) {
    return (
      <li className={`reveal glass-card glass-lift glass-sheen text-gold flex flex-col justify-end p-5 ${className}`}>
        <span aria-hidden="true" className="slant-tick mb-3" />
        <h3 className={nameClass}>{accessory.name}</h3>
      </li>
    );
  }

  return (
    <li className={`reveal glass-lift rounded-glass relative flex flex-col justify-end overflow-clip p-2 ${className}`}>
      <Image
        alt={accessory.image.alt}
        className="shop-photo object-cover"
        fill
        sizes={sizes}
        src={accessory.image.src}
      />
      <div className="glass-card glass-sheen px-4 py-3 [--glass-tint:0.72]">
        <h3 className={nameClass}>{accessory.name}</h3>
      </div>
    </li>
  );
}
