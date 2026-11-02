import { Flares } from "@/components/flares";
import { SectionHeading } from "@/components/section-heading";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";

type NapSectionProps = {
  address: string;
  email: BusinessInfo["email"];
  hours: BusinessInfo["hours"];
  mapsQuery: BusinessInfo["mapsQuery"];
  mapsUrl: BusinessInfo["mapsUrl"];
  mobile: BusinessInfo["mobile"];
  phone: BusinessInfo["phone"];
  showPageLink?: boolean;
};

const termClass =
  "text-[0.6875rem] font-semibold tracking-[0.18em] text-gold uppercase";

export function NapSection({
  address,
  email,
  hours,
  mapsQuery,
  mapsUrl,
  mobile,
  phone,
  showPageLink = true,
}: NapSectionProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery ?? address)}&output=embed`;

  return (
    <section
      aria-labelledby="contacts-title"
      className="relative isolate overflow-clip py-20 lg:py-28"
      id="contacts"
    >
      <Flares lines />
      <div className="shell">
        <SectionHeading
          id="contacts-title"
          link={showPageLink ? { href: "/contacts", label: "All contact details" } : undefined}
          title="Find us"
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
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
                    {mobile ? (
                      <a
                        className="hover:text-spark block font-display text-2xl tracking-wide tabular-nums transition-colors duration-200 ease-race"
                        href={telHref(mobile)}
                      >
                        {mobile}
                      </a>
                    ) : null}
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
                      className="mt-1 flex justify-between gap-4 text-sm"
                      key={entry.days}
                    >
                      <span>{entry.days}</span>
                      <span>{entry.time}</span>
                    </dd>
                  ))}
                </div>
              ) : null}
            </dl>
            {mapsUrl ? (
              <a
                className="btn btn-glass mt-5 h-11 px-5 text-lg"
                href={mapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open in Google Maps
              </a>
            ) : null}
          </address>

          <div className="reveal glass-card min-h-80 p-2 lg:col-span-7">
            <iframe
              className="rounded-sm size-full min-h-80 grayscale invert-[0.9]"
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
