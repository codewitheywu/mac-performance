"use client";

import { useSyncExternalStore } from "react";

import type { BusinessInfo } from "@/lib/content";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function hourLabel(hour: number) {
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

function manilaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAYS.indexOf(part("weekday")),
    hour: Number(part("hour")) % 24,
  };
}

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
