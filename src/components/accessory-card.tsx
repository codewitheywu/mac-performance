import Image from "next/image";

import type { Accessory } from "@/lib/content";

export function AccessoryCard({
  accessory,
  className = "",
  sizes,
}: {
  accessory: Accessory;
  className?: string;
  sizes: string;
}) {
  // No photo yet: a gold-ruled name tile instead of an empty placeholder.
  if (!accessory.image) {
    return (
      <li className={`reveal border-gold/40 text-gold flex min-h-56 flex-col justify-end rounded-sm border p-4 ${className}`}>
        <h3 className="font-display text-3xl leading-none tracking-wide uppercase">
          {accessory.name}
        </h3>
      </li>
    );
  }

  return (
    <li className={`reveal glass-card glass-lift flex flex-col overflow-hidden ${className}`}>
      <div className="relative aspect-4/3">
        <Image
          alt={accessory.image.alt}
          className="shop-photo object-cover"
          fill
          sizes={sizes}
          src={accessory.image.src}
        />
      </div>
      <h3 className="mt-auto p-4 font-display text-3xl leading-none tracking-wide uppercase">
        {accessory.name}
      </h3>
    </li>
  );
}
