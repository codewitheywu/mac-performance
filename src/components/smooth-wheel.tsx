"use client";

import { useEffect } from "react";

import { createGlide, wheelPixels } from "@/lib/glide";

// A mouse wheel moves the page in notches. This glides toward an accumulated
// target instead. Trackpads and touch already have inertia, so they keep
// native scrolling, as do the keyboard and scrollbar drags.
const MIN_NOTCH_DELTA = 40;

function nestedScrollerConsumes(target: EventTarget | null, delta: number) {
  let element = target instanceof Element ? target : null;
  while (element && element !== document.documentElement) {
    const { overflowY } = getComputedStyle(element);
    if (overflowY === "auto" || overflowY === "scroll") {
      const room = element.scrollHeight - element.clientHeight;
      const canMove = delta > 0 ? element.scrollTop < room : element.scrollTop > 0;
      if (room > 0 && canMove) return true;
    }
    element = element.parentElement;
  }
  return false;
}

export function SmoothWheel() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !hasMouse) return;

    const glide = createGlide((top) =>
      window.scrollTo({ top, behavior: "instant" }),
    );

    const onWheel = (event: WheelEvent) => {
      // A WheelRail already claimed this event for sideways scrolling.
      if (event.defaultPrevented || event.ctrlKey || event.shiftKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const delta = wheelPixels(event);
      if (!glide.isRunning() && Math.abs(delta) < MIN_NOTCH_DELTA) return;

      const inDialog =
        event.target instanceof Element && event.target.closest("dialog");
      if (inDialog || nestedScrollerConsumes(event.target, delta)) return;

      event.preventDefault();
      const from = glide.isRunning() ? glide.target() : window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      glide.moveTo(window.scrollY, Math.min(Math.max(from + delta, 0), maxScroll));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", glide.stop);
    window.addEventListener("pointerdown", glide.stop);
    return () => {
      glide.stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", glide.stop);
      window.removeEventListener("pointerdown", glide.stop);
    };
  }, []);

  return null;
}
