"use client";

import { useRef, useState } from "react";

import {
  type Appointment,
  removeAppointment,
  useAppointments,
} from "@/lib/appointment-store";
import { dateLabel } from "@/lib/appointment-rules";
import { hourLabel, useManilaNow } from "@/lib/manila-time";

function visitLabel({ date, hour }: Appointment) {
  const { day, weekday } = dateLabel(date);
  return `${weekday}, ${day} at ${hourLabel(hour)}`;
}

export function AppointmentList() {
  const now = useManilaNow();
  const appointments = useAppointments();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [cancelled, setCancelled] = useState("");

  // The row and its button disappear, so focus moves somewhere that stays.
  const cancel = (item: Appointment) => {
    removeAppointment(item.id);
    setCancelled(`${item.serviceName} on ${visitLabel(item)} cancelled.`);
    headingRef.current?.focus();
  };

  const upcoming = now
    ? appointments
        .filter(
          (item) =>
            item.date > now.date ||
            (item.date === now.date && item.hour >= now.hour),
        )
        .sort((a, b) => a.date.localeCompare(b.date) || a.hour - b.hour)
    : [];

  return (
    <section
      aria-labelledby="upcoming-title"
      className="reveal glass-card p-6 sm:p-8"
    >
      <p className="eyebrow">Upcoming</p>
      <h3
        className="mt-2 font-display text-4xl leading-none tracking-wide uppercase"
        id="upcoming-title"
        ref={headingRef}
        tabIndex={-1}
      >
        Your visits
      </h3>

      {upcoming.length > 0 ? (
        <ul className="mt-5 border-t border-white/15">
          {upcoming.map((item) => (
            <li
              className="flex items-center justify-between gap-4 border-b border-white/15 py-3"
              key={item.id}
            >
              <div className="min-w-0">
                <p className="font-display text-2xl leading-tight tracking-wide uppercase">
                  {item.serviceName}
                </p>
                <p className="text-sm wrap-anywhere text-white/90">{item.car}</p>
                {item.extras?.length ? (
                  <p className="text-sm text-white/90">
                    Fitting {item.extras.join(", ")}
                  </p>
                ) : null}
                <p className="text-gold text-sm font-medium tabular-nums">
                  {visitLabel(item)}
                </p>
              </div>
              <button
                aria-label={`Cancel ${item.serviceName}, ${visitLabel(item)}`}
                className="text-gold min-h-11 shrink-0 px-2 text-sm font-semibold hover:underline"
                onClick={() => cancel(item)}
                type="button"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : now ? (
        <p className="mt-4 text-base leading-relaxed text-white/90">
          No visits coming up.
        </p>
      ) : (
        <div className="mt-4 h-7 rounded-sm bg-white/5" />
      )}

      <div className="mt-3 text-sm leading-relaxed text-white/90" role="status">
        {cancelled}
      </div>
    </section>
  );
}
