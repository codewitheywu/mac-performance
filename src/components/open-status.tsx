"use client";

import { useSyncExternalStore } from "react";

import type { BusinessInfo } from "@/lib/content";
import { hourLabel, manilaNow } from "@/lib/manila-time";

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function statusText(openHours: BusinessInfo["openHours"]) {
  const { day, hour } = manilaNow();
  const today = openHours[day];
  if (today && hour >= today[0] && hour < today[1]) {
    return `Open now, until ${hourLabel(today[1])}`;
  }
  if (today && hour < today[0]) {
    return `Closed, opens ${hourLabel(today[0])} today`;
  }
  for (let offset = 1; offset <= 7; offset += 1) {
    const next = (day + offset) % 7;
    const hours = openHours[next];
    if (hours) {
      const when = offset === 1 ? "tomorrow" : WEEKDAY_NAMES[next];
      return `Closed, opens ${hourLabel(hours[0])} ${when}`;
    }
  }
  return "Closed";
}

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

// Rendered only in the browser: a prerendered page cannot know the time.
export function OpenStatus({
  openHours,
}: {
  openHours: BusinessInfo["openHours"];
}) {
  const status = useSyncExternalStore(
    subscribe,
    () => statusText(openHours),
    () => null,
  );

  return <>{status ?? "Open six days a week"}</>;
}
