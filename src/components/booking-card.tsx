import { PhoneIcon } from "@/components/icons";
import type { BusinessInfo } from "@/lib/content";
import { telHref } from "@/lib/format";

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
      className="reveal glass-card glass-sheen flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8 lg:p-10"
    >
      <div>
        <p className="font-display text-4xl leading-none tracking-wide uppercase">
          Car needs a look?
        </p>
        <p className="mt-2 text-sm text-white/85">
          Call with the make, the model and what it is doing.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a className="btn btn-race px-5 tabular-nums" href={telHref(phone)}>
          <PhoneIcon height="16" width="16" />
          {phone}
        </a>
        {mobile ? (
          <a className="btn btn-glass px-5 tabular-nums" href={telHref(mobile)}>
            {mobile}
          </a>
        ) : null}
      </div>
    </aside>
  );
}
