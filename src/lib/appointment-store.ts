"use client";

import { useSyncExternalStore } from "react";

export type Appointment = {
  // `date-hour`: one visit per slot.
  id: string;
  serviceName: string;
  car: string;
  date: string;
  hour: number;
};

// The sample has no database, so bookings live in this browser only. Replace
// this module with Server Actions and queries once accounts are real.
const STORAGE_KEY = "mac-sample-appointments";
const NONE: Appointment[] = [];

let cache: Appointment[] | null = null;
const listeners = new Set<() => void>();

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isAppointment(value: unknown): value is Appointment {
  const item = value as Appointment | null;
  return (
    typeof item?.id === "string" &&
    typeof item.serviceName === "string" &&
    typeof item.car === "string" &&
    typeof item.date === "string" &&
    DATE_PATTERN.test(item.date) &&
    !Number.isNaN(Date.parse(item.date)) &&
    Number.isInteger(item.hour) &&
    item.hour >= 0 &&
    item.hour < 24
  );
}

// Storage can be blocked or hold anything, so a bad read just means no bookings.
function load() {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored.filter(isAppointment) : NONE;
  } catch {
    return NONE;
  }
}

function save(next: Appointment[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Blocked storage: the booking still shows until the page reloads.
  }
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  cache ??= load();
  return cache;
}

function subscribe(onChange: () => void) {
  // Keeps two open tabs in step.
  const onStorage = () => {
    cache = null;
    onChange();
  };
  listeners.add(onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAppointments() {
  return useSyncExternalStore(subscribe, getSnapshot, () => NONE);
}

export function addAppointment(appointment: Appointment) {
  save([...getSnapshot(), appointment]);
}

export function removeAppointment(id: string) {
  save(getSnapshot().filter((item) => item.id !== id));
}
