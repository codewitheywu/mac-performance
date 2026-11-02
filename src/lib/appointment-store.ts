"use client";

import { createLocalList } from "@/lib/local-store";

export type Appointment = {
  // `date-hour`: one visit per slot.
  id: string;
  serviceName: string;
  car: string;
  date: string;
  hour: number;
  // Order lines to collect or fit on this visit. Older bookings have none.
  extras?: string[];
};

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
    item.hour < 24 &&
    (item.extras === undefined ||
      (Array.isArray(item.extras) &&
        item.extras.every((extra) => typeof extra === "string")))
  );
}

const store = createLocalList("mac-sample-appointments", isAppointment);

export const useAppointments = store.useList;

export function addAppointment(appointment: Appointment) {
  store.set([...store.get(), appointment]);
}

export function removeAppointment(id: string) {
  store.set(store.get().filter((item) => item.id !== id));
}
