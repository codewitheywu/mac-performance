import { SectionHeading } from "@/components/section-heading";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";

type NapSectionProps = {
  address: string;
  email: BusinessInfo["email"];
  hours: BusinessInfo["hours"];
  phone: BusinessInfo["phone"];
};

const termClass =
  "text-[0.6875rem] font-semibold tracking-[0.18em] text-white/70 uppercase";

export function NapSection({ address, email, hours, phone }: NapSectionProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section
      aria-labelledby="contacts-title"
      className="border-t border-white/10 py-14 lg:py-20"
      id="contacts"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Find us"
          id="contacts-title"
          title="MAC Performance"
        />

        <div className="mt-8 grid gap-3 lg:grid-cols-12">
          <address className="reveal glass-card p-5 not-italic sm:p-6 lg:col-span-5">
            <dl className="divide-y divide-white/10">
              <div className="pb-4">
                <dt className={termClass}>Address</dt>
                <dd className="mt-1 text-base leading-relaxed">{address}</dd>
              </div>
              {phone ? (
                <div className="py-4">
                  <dt className={termClass}>Phone</dt>
                  <dd className="mt-1">
                    <a
                      className="hover:text-spark font-display text-3xl tracking-wide tabular-nums transition-colors duration-200 ease-race"
                      href={telHref(phone)}
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {email ? (
                <div className="py-4">
                  <dt className={termClass}>Email</dt>
                  <dd className="mt-1 text-base break-words">
                    <a
                      className="hover:text-spark transition-colors duration-200 ease-race"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {hours.length > 0 ? (
                <div className="pt-4">
                  <dt className={termClass}>Hours</dt>
                  {hours.map((entry) => (
                    <dd
                      className="mt-1 flex justify-between gap-4 text-sm tabular-nums"
                      key={entry.days}
                    >
                      <span>{entry.days}</span>
                      <span className="text-spark">{entry.time}</span>
                    </dd>
                  ))}
                </div>
              ) : null}
            </dl>
          </address>

          <div className="reveal min-h-80 overflow-hidden rounded-sm border border-white/10 lg:col-span-7">
            <iframe
              className="size-full min-h-80 grayscale invert-[0.9]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={mapSrc}
              title="Map showing the MAC Performance shop location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
