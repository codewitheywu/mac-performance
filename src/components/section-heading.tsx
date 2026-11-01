import Link from "next/link";

type SectionHeadingProps = {
  id: string;
  title: string;
  link?: { href: string; label: string };
};

export function SectionHeading({ id, title, link }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
      <h2
        className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-wide uppercase"
        id={id}
      >
        {title}
      </h2>
      {link ? (
        <Link
          className="text-gold decoration-gold/50 hover:decoration-gold -my-3 inline-block py-3 text-sm font-medium underline underline-offset-4 transition-colors duration-200 ease-race"
          href={link.href}
        >
          {link.label}
        </Link>
      ) : null}
    </div>
  );
}
