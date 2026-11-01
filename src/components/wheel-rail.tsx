"use client";

import { type ComponentProps, useEffect, useRef } from "react";

import { createGlide, wheelPixels } from "@/lib/glide";

// While the page is already moving the rail must not grab the wheel as it
// passes under the pointer, so it only takes over after a short pause.
const PAGE_SCROLL_LATCH_MS = 220;

// A list that turns the vertical wheel into sideways scrolling. At either end
// it lets go, so the wheel can never get stuck on the rail.
export function WheelRail({ children, ...props }: ComponentProps<"ul">) {
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const glide = createGlide((left) => {
      rail.scrollLeft = left;
    });
    let lastPageWheel = -Infinity;

    const onPageWheel = (event: WheelEvent) => {
      const onRail = event.target instanceof Node && rail.contains(event.target);
      if (!onRail) lastPageWheel = event.timeStamp;
    };

    const onRailWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.timeStamp - lastPageWheel < PAGE_SCROLL_LATCH_MS) {
        lastPageWheel = event.timeStamp;
        return;
      }

      const from = glide.isRunning() ? glide.target() : rail.scrollLeft;
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      const next = Math.min(Math.max(from + wheelPixels(event), 0), maxScroll);
      if (next === from) return;

      event.preventDefault();
      if (prefersReducedMotion) {
        rail.scrollLeft = next;
      } else {
        glide.moveTo(rail.scrollLeft, next);
      }
    };

    window.addEventListener("wheel", onPageWheel, {
      capture: true,
      passive: true,
    });
    rail.addEventListener("wheel", onRailWheel, { passive: false });
    rail.addEventListener("keydown", glide.stop);
    rail.addEventListener("pointerdown", glide.stop);
    return () => {
      glide.stop();
      window.removeEventListener("wheel", onPageWheel, { capture: true });
      rail.removeEventListener("wheel", onRailWheel);
      rail.removeEventListener("keydown", glide.stop);
      rail.removeEventListener("pointerdown", glide.stop);
    };
  }, []);

  return (
    <ul ref={railRef} {...props}>
      {children}
    </ul>
  );
}
