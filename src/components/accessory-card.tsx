import Image from "next/image";
import type { ReactNode } from "react";

import type { Accessory } from "@/lib/content";

const nameClass = "font-display text-3xl leading-none tracking-wide uppercase";

export function AccessoryCard({
  accessory,
  action,
  className = "",
  sizes,
}: {
  accessory: Accessory;
  // A control beside the name, such as the shop's Add to list.
  action?: ReactNode;
  className?: string;
  sizes: string;
}) {
  // No photo yet: a gold-lettered glass tile instead of an empty placeholder.
  if (!accessory.image) {
    return (
      <li className={`reveal glass-card glass-lift glass-sheen text-gold flex flex-col justify-end p-5 ${className}`}>
        <span aria-hidden="true" className="slant-tick mb-3" />
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className={nameClass}>{accessory.name}</h3>
          {action}
        </div>
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
      <div className="glass-card glass-sheen flex flex-wrap items-center justify-between gap-3 px-4 py-3 [--glass-tint:0.72]">
        <h3 className={nameClass}>{accessory.name}</h3>
        {action}
      </div>
    </li>
  );
}
