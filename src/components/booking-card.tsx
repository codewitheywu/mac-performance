import { PhoneIcon } from "@/components/icons";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";

const numberClass =
  "inline-flex h-12 items-center gap-2 rounded-sm px-5 font-display text-xl tracking-wider tabular-nums transition-colors duration-200 ease-race";

export function CallCard({
  mobile,
  phone,
}: {
  mobile: BusinessInfo["mobile"];
  phone: BusinessInfo["phone"];
}) {
  return (
    <aside
      aria-label="Call the shop"
      className="reveal border-gold/30 flex flex-col justify-between gap-5 border-y py-8 sm:flex-row sm:items-center"
    >
      <div>
        <p className="font-display text-3xl leading-none tracking-wide uppercase">
          Car needs a look?
        </p>
        <p className="mt-2 text-sm text-white/80">
          Call with the make, the model and what it is doing.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a className={`bg-race hover:bg-race-deep ${numberClass}`} href={telHref(phone)}>
          <PhoneIcon height="16" width="16" />
          {phone}
        </a>
        {mobile ? (
          <a
            className={`border border-gold/60 hover:border-gold ${numberClass}`}
            href={telHref(mobile)}
          >
            {mobile}
          </a>
        ) : null}
      </div>
    </aside>
  );
}
