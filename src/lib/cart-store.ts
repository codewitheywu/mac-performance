"use client";

import type { Product } from "@/lib/content";
import { createLocalList } from "@/lib/local-store";

// Product slugs and quantities only. Names, prices and stock always come from
// the catalog, so an edited price in storage never reaches the total, and a
// product the shop has since removed simply drops out.
export type CartLine = { slug: string; quantity: number };

export const MAX_QUANTITY = 10;

const SLUG_PATTERN = /^[a-z0-9-]{1,60}$/;

function isCartLine(value: unknown): value is CartLine {
  const line = value as CartLine | null;
  return (
    typeof line?.slug === "string" &&
    SLUG_PATTERN.test(line.slug) &&
    Number.isInteger(line.quantity) &&
    line.quantity >= 1 &&
    line.quantity <= MAX_QUANTITY
  );
}

const store = createLocalList("mac-sample-cart", isCartLine);

export const useCart = store.useList;

export function setQuantity(slug: string, quantity: number) {
  const rest = store.get().filter((line) => line.slug !== slug);
  if (quantity < 1) {
    store.set(rest);
    return;
  }
  const clamped = Math.min(quantity, MAX_QUANTITY);
  const lines = store.get();
  store.set(
    lines.some((line) => line.slug === slug)
      ? lines.map((line) => (line.slug === slug ? { slug, quantity: clamped } : line))
      : [...lines, { slug, quantity: clamped }],
  );
}

export function clearCart() {
  store.set([]);
}

export type CartItem = {
  product: Pick<Product, "name" | "price" | "slug" | "stock">;
  quantity: number;
};

// Catalog order, quantities held to what is in stock.
export function resolveCart(
  lines: CartLine[],
  catalog: CartItem["product"][],
): CartItem[] {
  return catalog.flatMap((product) => {
    const line = lines.find((item) => item.slug === product.slug);
    if (!line || product.stock < 1) return [];
    return [{ product, quantity: Math.min(line.quantity, product.stock) }];
  });
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function lineLabel({ product, quantity }: CartItem) {
  return quantity > 1 ? `${quantity} × ${product.name}` : product.name;
}
