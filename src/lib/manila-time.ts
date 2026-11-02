import { useMemo, useSyncExternalStore } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type ManilaNow = {
  // YYYY-MM-DD.
  date: string;
  // 0 is Sunday.
  day: number;
  hour: number;
};

export function hourLabel(hour: number) {
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

export function manilaNow(): ManilaNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    day: WEEKDAYS.indexOf(part("weekday")),
    hour: Number(part("hour")) % 24,
  };
}

export function subscribeToClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

// Null while prerendered: a static page cannot know the time.
export function useManilaNow() {
  const stamp = useSyncExternalStore(
    subscribeToClock,
    () => JSON.stringify(manilaNow()),
    () => null,
  );
  return useMemo(
    () => (stamp ? (JSON.parse(stamp) as ManilaNow) : null),
    [stamp],
  );
}
