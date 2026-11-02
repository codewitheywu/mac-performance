"use client";

import { toggleShopItem, useShopList } from "@/lib/shop-list-store";

// The visible label stays inside the accessible name, so voice control works.
export function ShopToggle({ name, slug }: { name: string; slug: string }) {
  const isAdded = useShopList().includes(slug);

  return (
    <button
      aria-label={`${isAdded ? "Remove from list" : "Add to list"}: ${name}`}
      className={`btn shrink-0 text-white ${isAdded ? "btn-glass" : "btn-race"}`}
      onClick={() => toggleShopItem(slug)}
      type="button"
    >
      {isAdded ? (
        <>
          <span aria-hidden="true" className="text-gold">
            ✓
          </span>
          Remove
        </>
      ) : (
        "Add to list"
      )}
    </button>
  );
}
