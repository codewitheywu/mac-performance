"use client";

import { createLocalList } from "@/lib/local-store";

// Accessory slugs the customer wants. Names come from the catalog when shown,
// so a slug the shop has since removed simply drops out.
const SLUG_PATTERN = /^[a-z0-9-]{1,60}$/;

const store = createLocalList(
  "mac-sample-shop-list",
  (value): value is string => typeof value === "string" && SLUG_PATTERN.test(value),
);

export const useShopList = store.useList;

export function toggleShopItem(slug: string) {
  const list = store.get();
  store.set(
    list.includes(slug) ? list.filter((item) => item !== slug) : [...list, slug],
  );
}

export function removeShopItem(slug: string) {
  store.set(store.get().filter((item) => item !== slug));
}

export function clearShopList() {
  store.set([]);
}
