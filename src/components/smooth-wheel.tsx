"use client";

import { useEffect } from "react";

// A mouse wheel moves the page in notches. This glides toward an accumulated
// target instead. Trackpads and touch already have inertia, so they keep
// native scrolling, as do the keyboard and scrollbar drags.
const GLIDE_TIME_CONSTANT_MS = 85;
const MIN_NOTCH_DELTA = 40;
const SETTLED_DISTANCE = 0.5;
const LINE_HEIGHT = 16;

function pixelDelta(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * LINE_HEIGHT;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
}

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

    let frame = 0;
    let lastTime = 0;
    let position = 0;
    let target = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const step = (time: number) => {
      const progress = 1 - Math.exp(-(time - lastTime) / GLIDE_TIME_CONSTANT_MS);
      lastTime = time;
      position += (target - position) * progress;

      if (Math.abs(target - position) < SETTLED_DISTANCE) {
        position = target;
        frame = 0;
      } else {
        frame = requestAnimationFrame(step);
      }
      window.scrollTo({ top: position, behavior: "instant" });
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const delta = pixelDelta(event);
      if (!frame && Math.abs(delta) < MIN_NOTCH_DELTA) return;

      const inDialog =
        event.target instanceof Element && event.target.closest("dialog");
      if (inDialog || nestedScrollerConsumes(event.target, delta)) return;

      event.preventDefault();
      if (!frame) {
        position = window.scrollY;
        target = window.scrollY;
        lastTime = performance.now();
        frame = requestAnimationFrame(step);
      }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.min(Math.max(target + delta, 0), maxScroll);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, []);

  return null;
}
