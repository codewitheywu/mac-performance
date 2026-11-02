"use client";

import { useRef } from "react";

import type { Accessory } from "@/lib/content";
import { useHydrated } from "@/lib/local-store";
import {
  clearShopList,
  removeShopItem,
  useShopList,
} from "@/lib/shop-list-store";

type ShopListProps = {
  accessories: Pick<Accessory, "name" | "slug">[];
};

export function ShopList({ accessories }: ShopListProps) {
  const isHydrated = useHydrated();
  const slugs = useShopList();
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Catalog order, so the list reads the same way as the shelves above it.
  const items = accessories.filter((item) => slugs.includes(item.slug));

  // The row or the whole list disappears, so focus moves somewhere that stays.
  const remove = (slug?: string) => {
    if (slug) removeShopItem(slug);
    else clearShopList();
    headingRef.current?.focus();
  };

  const count = items.length === 1 ? "1 item" : `${items.length} items`;

  return (
    <section
      aria-labelledby="list-title"
      className="reveal glass-card p-6 sm:p-8"
    >
      <p className="eyebrow">Your list</p>
      <h3
        className="mt-2 font-display text-4xl leading-none tracking-wide uppercase"
        id="list-title"
        ref={headingRef}
        tabIndex={-1}
      >
        To pick up
      </h3>

      {/* Announces every add and remove, wherever on the page it happened. */}
      <p
        className={`mt-3 leading-relaxed ${
          items.length > 0
            ? "text-gold text-sm font-medium tabular-nums"
            : "text-base text-white/90"
        }`}
        role="status"
      >
        {isHydrated
          ? items.length > 0
            ? count
            : "Nothing on your list yet."
          : null}
      </p>

      {!isHydrated ? (
        <div className="h-7 rounded-sm bg-white/5" />
      ) : items.length > 0 ? (
        <ul className="mt-2 border-t border-white/15">
          {items.map((item) => (
            <li
              className="flex items-center justify-between gap-4 border-b border-white/15 py-2"
              key={item.slug}
            >
              <span className="font-display text-2xl leading-tight tracking-wide uppercase">
                {item.name}
              </span>
              <button
                aria-label={`Remove ${item.name}`}
                className="text-gold min-h-11 shrink-0 px-2 text-sm font-semibold hover:underline"
                onClick={() => remove(item.slug)}
                type="button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="border-gold mt-5 border-l-2 pl-3 text-sm leading-relaxed text-white/85">
        Sample list. Prices and stock are confirmed at the store. Nothing is
        charged or sent from here.
      </p>

      {isHydrated && items.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-race" href="#book">
            Fit on a visit
          </a>
          <button
            className="btn btn-glass"
            onClick={() => remove()}
            type="button"
          >
            Clear list
          </button>
        </div>
      ) : null}
    </section>
  );
}
