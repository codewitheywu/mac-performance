"use client";

import { type FormEvent, useState } from "react";

import { addAppointment, useAppointments } from "@/lib/appointment-store";
import {
  type BookingErrors,
  dateLabel,
  openDates,
  openSlots,
  slotId,
  validateBooking,
} from "@/lib/appointment-rules";
import type { BusinessInfo, Service } from "@/lib/content";
import { hourLabel, useManilaNow } from "@/lib/manila-time";

type BookingPanelProps = {
  openHours: BusinessInfo["openHours"];
  services: Pick<Service, "name" | "slug">[];
};

const legendClass = "text-sm font-medium";
const chipClass =
  "has-checked:border-gold has-checked:bg-gold/20 has-focus-visible:outline-spark flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-sm border border-white/30 bg-black/45 px-2 py-1 text-center transition-colors duration-200 ease-race has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-disabled:cursor-not-allowed has-disabled:opacity-60";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="text-race-bright mt-1.5 text-sm" id={id}>
      {message}
    </p>
  );
}

export function BookingPanel({ openHours, services }: BookingPanelProps) {
  const now = useManilaNow();
  const appointments = useAppointments();

  const [service, setService] = useState("");
  const [car, setCar] = useState("");
  const [pickedDate, setPickedDate] = useState("");
  const [pickedHour, setPickedHour] = useState<number | null>(null);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [booked, setBooked] = useState({ id: "", message: "" });

  // Everything below depends on today, so it waits for the browser.
  const dates = now ? openDates(openHours, now) : [];
  const date = dates.includes(pickedDate) ? pickedDate : (dates[0] ?? "");
  // A time only counts on the day it was picked. If the clock retires that day,
  // the customer chooses again instead of being moved to another date.
  const hour = pickedDate === date ? pickedHour : null;
  const slots = now && date ? openSlots(openHours, date, now) : [];
  const takenSlots = appointments.map((item) => item.id);

  const book = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!now) return;

    const found = validateBooking(
      { service, car, date, hour },
      {
        now,
        openHours,
        serviceSlugs: services.map((item) => item.slug),
        takenSlots,
      },
    );
    setErrors(found);
    setBooked({ id: "", message: "" });

    const [firstInvalid] = Object.keys(found);
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`#booking-${firstInvalid}`)?.focus();
      return;
    }

    const bookedHour = hour as number;
    const id = slotId(date, bookedHour);
    const serviceName = services.find((item) => item.slug === service)?.name ?? "";
    addAppointment({ car: car.trim(), date, hour: bookedHour, id, serviceName });

    const { day, weekday } = dateLabel(date);
    setBooked({
      id,
      message: `${serviceName} saved for ${weekday}, ${day} at ${hourLabel(bookedHour)}.`,
    });
    setService("");
    setCar("");
    setPickedHour(null);
  };

  return (
    <section
      aria-labelledby="book-title"
      className="reveal glass-card p-6 sm:p-8 lg:p-10"
    >
      <span aria-hidden="true" className="slant-tick mb-3" />
      <h2
        className="font-display text-[clamp(2.75rem,5.6vw,4.75rem)] leading-none tracking-wide uppercase"
        id="book-title"
      >
        Book a visit
      </h2>
      <p className="border-gold mt-4 border-l-2 pl-3 text-sm leading-relaxed text-white/85">
        Sample booking. It stays on this device and does not reach the shop.
      </p>

      <form className="mt-6 flex flex-col gap-5" noValidate onSubmit={book}>
        <div>
          <label className={legendClass} htmlFor="booking-service">
            Service
          </label>
          <select
            aria-describedby={errors.service ? "service-error" : undefined}
            aria-invalid={errors.service ? true : undefined}
            className={`field-input mt-1.5 ${
              errors.service ? "border-race-bright" : "border-white/30"
            }`}
            id="booking-service"
            onChange={(event) => setService(event.target.value)}
            value={service}
          >
            <option value="">Choose a service</option>
            {services.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <FieldError id="service-error" message={errors.service} />
        </div>

        <div>
          <label className={legendClass} htmlFor="booking-car">
            Your car
          </label>
          <input
            aria-describedby={errors.car ? "car-error" : "car-hint"}
            aria-invalid={errors.car ? true : undefined}
            autoCapitalize="words"
            autoComplete="off"
            className={`field-input mt-1.5 ${
              errors.car ? "border-race-bright" : "border-white/30"
            }`}
            id="booking-car"
            onChange={(event) => setCar(event.target.value)}
            type="text"
            value={car}
          />
          {errors.car ? null : (
            <p className="mt-1.5 text-sm text-white/85" id="car-hint">
              Make and model.
            </p>
          )}
          <FieldError id="car-error" message={errors.car} />
        </div>

        {/* A placeholder keeps the height steady until the browser knows today. */}
        <fieldset>
          <legend className={legendClass}>Day</legend>
          {now ? (
            <ul className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {dates.map((item) => {
                const { day, weekday } = dateLabel(item);
                return (
                  <li key={item}>
                    <label className={chipClass}>
                      <input
                        checked={item === date}
                        className="sr-only"
                        name="date"
                        onChange={() => {
                          setPickedDate(item);
                          setPickedHour(null);
                        }}
                        type="radio"
                      />
                      <span className="font-display text-lg leading-none tracking-wide">
                        {weekday}
                      </span>
                      <span className="text-xs leading-tight">{day}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-1.5 h-54 rounded-sm bg-white/5 sm:h-40 lg:h-26" />
          )}
        </fieldset>

        <fieldset aria-describedby={errors.slot ? "slot-error" : undefined}>
          <legend className={legendClass}>Time, Manila</legend>
          {now ? (
            <ul className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-5" id="booking-slot" tabIndex={-1}>
              {slots.map((item) => (
                <li key={item}>
                  <label className={chipClass}>
                    <input
                      checked={item === hour}
                      className="sr-only"
                      disabled={takenSlots.includes(slotId(date, item))}
                      name="hour"
                      onChange={() => {
                        setPickedDate(date);
                        setPickedHour(item);
                      }}
                      type="radio"
                    />
                    <span className="text-sm font-medium tabular-nums">
                      {hourLabel(item)}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-1.5 h-40 rounded-sm bg-white/5 sm:h-26" />
          )}
          <FieldError id="slot-error" message={errors.slot} />
        </fieldset>

        <button className="btn btn-race" disabled={!now} type="submit">
          Book this visit
        </button>

        {/* Stays mounted, or screen readers can miss the message. Clears itself
            if that visit is cancelled. */}
        <div className="text-sm leading-relaxed" role="status">
          {takenSlots.includes(booked.id) ? booked.message : null}
        </div>
      </form>
    </section>
  );
}
