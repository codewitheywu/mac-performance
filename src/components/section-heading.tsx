import Link from "next/link";

import { ArrowIcon } from "@/components/icons";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  titleMuted?: string;
  link?: { href: string; label: string };
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  titleMuted,
  link,
}: SectionHeadingProps) {
  return (
    <div className="reveal">
      <div aria-hidden="true" className="tach-scale mb-6" />
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <p className="text-spark text-xs font-semibold tracking-[0.25em] uppercase">
            {eyebrow}
          </p>
          <h2
            className="mt-2 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none tracking-wide uppercase"
            id={id}
          >
            {title}
            {titleMuted ? <span className="text-white/60"> {titleMuted}</span> : null}
          </h2>
        </div>
        {link ? (
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/25 px-5 font-display text-lg tracking-wider transition-colors duration-200 ease-race hover:border-white/60"
            href={link.href}
          >
            {link.label}
            <ArrowIcon height="16" width="16" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
