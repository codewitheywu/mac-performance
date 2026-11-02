import type { BusinessInfo } from "@/lib/content";
import type { ManilaNow } from "@/lib/manila-time";

type OpenHours = BusinessInfo["openHours"];

export type BookingInput = {
  service: string;
  car: string;
  date: string;
  hour: number | null;
};

export type BookingErrors = Partial<Record<"service" | "car" | "slot", string>>;

const DATES_ON_OFFER = 12;
const MAX_CAR_LENGTH = 80;

const WEEKDAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
});
const DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "short",
  day: "numeric",
});

export function slotId(date: string, hour: number) {
  return `${date}-${hour}`;
}

function shiftDate(date: string, days: number) {
  const shifted = new Date(`${date}T00:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

function weekdayOf(date: string) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

// Dates are plain calendar days, so UTC here cannot shift them.
export function dateLabel(date: string) {
  const parsed = new Date(`${date}T00:00:00Z`);
  return {
    weekday: WEEKDAY_FORMAT.format(parsed),
    day: DAY_FORMAT.format(parsed),
  };
}

// One slot an hour, from opening until the last hour before closing.
export function openSlots(openHours: OpenHours, date: string, now: ManilaNow) {
  const hours = openHours[weekdayOf(date)];
  if (!hours || date < now.date) return [];

  const slots: number[] = [];
  for (let hour = hours[0]; hour < hours[1]; hour += 1) {
    if (date > now.date || hour > now.hour) slots.push(hour);
  }
  return slots;
}

export function openDates(openHours: OpenHours, now: ManilaNow) {
  const dates: string[] = [];
  for (let offset = 0; dates.length < DATES_ON_OFFER && offset < 31; offset += 1) {
    const date = shiftDate(now.date, offset);
    if (openSlots(openHours, date, now).length > 0) dates.push(date);
  }
  return dates;
}

// Pure, so a Server Action can run the same checks once bookings are real.
export function validateBooking(
  input: BookingInput,
  rules: {
    openHours: OpenHours;
    now: ManilaNow;
    serviceSlugs: string[];
    takenSlots: string[];
  },
): BookingErrors {
  const errors: BookingErrors = {};
  const car = input.car.trim();

  if (!rules.serviceSlugs.includes(input.service)) {
    errors.service = "Choose a service.";
  }
  if (!car) {
    errors.car = "Enter the make and model of your car.";
  } else if (car.length > MAX_CAR_LENGTH) {
    errors.car = `Keep this under ${MAX_CAR_LENGTH} characters.`;
  }

  const isOpen =
    input.hour !== null &&
    openSlots(rules.openHours, input.date, rules.now).includes(input.hour);
  if (!isOpen) {
    errors.slot = "Choose a day and a time.";
  } else if (rules.takenSlots.includes(slotId(input.date, input.hour as number))) {
    errors.slot = "You already have a visit booked at that time.";
  }
  return errors;
}
