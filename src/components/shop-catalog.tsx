"use client";

import { useState } from "react";

import { MAX_QUANTITY, setQuantity, useCart } from "@/lib/cart-store";
import type { Accessory, Product } from "@/lib/content";
import { formatPeso } from "@/lib/format";

type CatalogProduct = Pick<
  Product,
  "category" | "name" | "price" | "slug" | "spec" | "stock"
>;

type ShopCatalogProps = {
  categories: Pick<Accessory, "name" | "slug">[];
  products: CatalogProduct[];
};

const ALL = { name: "All", slug: "all" };

const chipClass =
  "has-checked:border-gold has-checked:bg-gold/20 has-focus-visible:outline-spark flex min-h-11 cursor-pointer items-center rounded-sm border border-white/30 bg-black/45 px-3 text-sm font-medium transition-colors duration-200 ease-race has-focus-visible:outline-2 has-focus-visible:outline-offset-2";
const stepClass =
  "grid size-11 place-items-center text-xl transition-colors duration-200 ease-race hover:text-gold disabled:cursor-not-allowed disabled:opacity-40";

function stockLabel(stock: number) {
  if (stock < 1) return "Out of stock";
  if (stock <= 3) return `Only ${stock} left`;
  return "In stock";
}

// The button that disappears takes focus with it, so focus moves to the
// control that replaced it.
function focusLater(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}

function QuantityControl({ product, quantity }: { product: CatalogProduct; quantity: number }) {
  const { name, slug, stock } = product;

  if (quantity < 1) {
    return (
      <button
        aria-label={stock < 1 ? `Add ${name}, out of stock` : `Add ${name}`}
        className="btn btn-race w-28 text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={stock < 1}
        id={`add-${slug}`}
        onClick={() => {
          setQuantity(slug, 1);
          focusLater(`more-${slug}`);
        }}
        type="button"
      >
        Add
      </button>
    );
  }

  return (
    <div
      aria-label={`${name}, quantity`}
      className="border-gold/60 flex w-28 items-center justify-between rounded-sm border bg-black/35"
      role="group"
    >
      <button
        aria-label={quantity === 1 ? `Remove ${name}` : `One less ${name}`}
        className={stepClass}
        onClick={() => {
          setQuantity(slug, quantity - 1);
          if (quantity === 1) focusLater(`add-${slug}`);
        }}
        type="button"
      >
        −
      </button>
      <span className="font-semibold tabular-nums">{quantity}</span>
      <button
        aria-label={`One more ${name}`}
        className={stepClass}
        disabled={quantity >= Math.min(stock, MAX_QUANTITY)}
        id={`more-${slug}`}
        onClick={() => setQuantity(slug, quantity + 1)}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export function ShopCatalog({ categories, products }: ShopCatalogProps) {
  const lines = useCart();
  const [category, setCategory] = useState(ALL.slug);

  const names = new Map(categories.map((item) => [item.slug, item.name]));
  const shown =
    category === ALL.slug
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div className="reveal glass-card p-5 sm:p-6">
      <fieldset>
        <legend className="text-sm font-medium">Category</legend>
        <ul className="mt-2 flex flex-wrap gap-2">
          {[ALL, ...categories].map((item) => (
            <li key={item.slug}>
              <label className={chipClass}>
                <input
                  checked={item.slug === category}
                  className="sr-only"
                  name="category"
                  onChange={() => setCategory(item.slug)}
                  type="radio"
                />
                {item.name}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <ul aria-label="Products" className="mt-5 border-t border-white/15">
        {shown.map((product) => {
          const line = lines.find((item) => item.slug === product.slug);
          const quantity = line ? Math.min(line.quantity, product.stock) : 0;
          return (
            <li
              className="flex flex-col gap-3 border-b border-white/15 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              key={product.slug}
            >
              <div className="min-w-0">
                <p className="eyebrow">{names.get(product.category)}</p>
                <h3 className="mt-1 font-display text-2xl leading-tight tracking-wide uppercase">
                  {product.name}
                </h3>
                <p className="text-sm text-white/85">{product.spec}</p>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">
                <div className="sm:text-right">
                  <p className="text-gold text-lg font-semibold tabular-nums">
                    {formatPeso(product.price)}
                  </p>
                  <p className="text-xs text-white/85">{stockLabel(product.stock)}</p>
                </div>
                <QuantityControl product={product} quantity={quantity} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
