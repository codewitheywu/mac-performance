"use client";

import {
  type Appointment,
  removeAppointment,
  useAppointments,
  useManilaNow,
} from "@/lib/appointment-store";
import { dateLabel } from "@/lib/appointment-rules";
import { hourLabel } from "@/lib/manila-time";

function visitLabel({ date, hour }: Appointment) {
  const { day, weekday } = dateLabel(date);
  return `${weekday}, ${day} at ${hourLabel(hour)}`;
}

export function AppointmentList() {
  const now = useManilaNow();
  const appointments = useAppointments();

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
      <h2
        className="mt-2 font-display text-4xl leading-none tracking-wide uppercase"
        id="upcoming-title"
      >
        Your visits
      </h2>

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
                <p className="text-sm break-words text-white/90">{item.car}</p>
                <p className="text-gold text-sm font-medium tabular-nums">
                  {visitLabel(item)}
                </p>
              </div>
              <button
                aria-label={`Cancel ${item.serviceName}, ${visitLabel(item)}`}
                className="text-gold min-h-11 shrink-0 px-2 text-sm font-semibold hover:underline"
                onClick={() => removeAppointment(item.id)}
                type="button"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-base leading-relaxed text-white/90">
          Nothing booked yet.
        </p>
      )}
    </section>
  );
}
