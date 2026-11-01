type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  titleMuted?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  titleMuted,
}: SectionHeadingProps) {
  return (
    <div className="reveal">
      <div aria-hidden="true" className="tach-scale mb-6" />
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
  );
}
