"use client";

import { useRef } from "react";

import {
  type CartItem,
  cartTotal,
  clearCart,
  resolveCart,
  setQuantity,
  useCart,
} from "@/lib/cart-store";
import { formatPeso } from "@/lib/format";
import { useHydrated } from "@/lib/local-store";

type CartPanelProps = {
  catalog: CartItem["product"][];
};

export function CartPanel({ catalog }: CartPanelProps) {
  const isHydrated = useHydrated();
  const items = resolveCart(useCart(), catalog);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartTotal(items);

  // The row or the whole cart disappears, so focus moves somewhere that stays.
  const remove = (slug?: string) => {
    if (slug) setQuantity(slug, 0);
    else clearCart();
    headingRef.current?.focus();
  };

  return (
    <section
      aria-labelledby="cart-title"
      className="reveal glass-card p-6 sm:p-8"
    >
      <p className="eyebrow">Cart</p>
      <h3
        className="mt-2 font-display text-4xl leading-none tracking-wide uppercase"
        id="cart-title"
        ref={headingRef}
        tabIndex={-1}
      >
        Your order
      </h3>

      {/* Announces every change, wherever on the page it happened. */}
      <p
        className={`mt-3 leading-relaxed ${
          count > 0
            ? "text-gold text-sm font-medium tabular-nums"
            : "text-base text-white/90"
        }`}
        role="status"
      >
        {isHydrated
          ? count > 0
            ? `${count === 1 ? "1 item" : `${count} items`}, ${formatPeso(total)}`
            : "Your cart is empty."
          : null}
      </p>

      {!isHydrated ? (
        <div className="h-7 rounded-sm bg-white/5" />
      ) : items.length > 0 ? (
        <>
          <ul className="mt-2 border-t border-white/15">
            {items.map(({ product, quantity }) => (
              <li
                className="flex items-center justify-between gap-4 border-b border-white/15 py-2"
                key={product.slug}
              >
                <div className="min-w-0">
                  <p className="font-display text-xl leading-tight tracking-wide uppercase">
                    {product.name}
                  </p>
                  <p className="text-sm text-white/85 tabular-nums">
                    {quantity} × {formatPeso(product.price)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <span className="text-sm font-semibold tabular-nums">
                    {formatPeso(product.price * quantity)}
                  </span>
                  <button
                    aria-label={`Remove ${product.name}`}
                    className="text-gold min-h-11 px-2 text-sm font-semibold hover:underline"
                    onClick={() => remove(product.slug)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-baseline justify-between font-display text-2xl tracking-wide uppercase">
            Total
            <span className="text-gold tabular-nums">{formatPeso(total)}</span>
          </p>
        </>
      ) : null}

      <p className="border-gold mt-5 border-l-2 pl-3 text-sm leading-relaxed text-white/85">
        Demo prices and stock. Pay at the store when you collect, or on the day
        it is fitted. Nothing is charged or sent from here.
      </p>

      {isHydrated && items.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-race" href="#book">
            Add to a visit
          </a>
          <button
            className="btn btn-glass"
            onClick={() => remove()}
            type="button"
          >
            Clear cart
          </button>
        </div>
      ) : null}
    </section>
  );
}

// Below lg the cart sits under the whole catalog, so this bar keeps the total
// in view while the customer scrolls the shop.
export function CartJump({ catalog }: CartPanelProps) {
  const items = resolveCart(useCart(), catalog);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  if (count === 0) return null;

  return (
    <a
      className="btn btn-race sticky bottom-3 z-10 mt-4 w-full justify-between tabular-nums lg:hidden"
      href="#cart-title"
    >
      <span>View cart, {count === 1 ? "1 item" : `${count} items`}</span>
      <span>{formatPeso(cartTotal(items))}</span>
    </a>
  );
}
