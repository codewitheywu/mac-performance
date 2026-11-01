import Link from "next/link";

import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { telHref } from "@/lib/format";

export function BookingCard({
  className,
  phone,
}: {
  className: string;
  phone: string | null;
}) {
  return (
    <aside
      aria-label="Book a service"
      className={`reveal glass-card glass-lift flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6 ${className}`}
    >
      <div>
        <p className="font-display text-3xl leading-none tracking-wide uppercase">
          Car needs a look?
        </p>
        <p className="mt-2 text-sm text-white/75">
          Tell us the make, the model and what it is doing.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          className="bg-race hover:bg-race-deep inline-flex h-11 items-center gap-2 rounded-sm px-5 font-display text-lg tracking-wider transition-colors duration-200 ease-race"
          href="/contacts"
        >
          Book a service
          <ArrowIcon height="16" width="16" />
        </Link>
        {phone ? (
          <a
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/25 px-5 font-display text-lg tracking-wider tabular-nums transition-colors duration-200 ease-race hover:border-white/60"
            href={telHref(phone)}
          >
            <PhoneIcon height="16" width="16" />
            {phone}
          </a>
        ) : null}
      </div>
    </aside>
  );
}
