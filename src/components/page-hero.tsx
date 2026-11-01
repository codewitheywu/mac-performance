type PageHeroProps = {
  eyebrow: string;
  title: string;
  titleMuted?: string;
  summary: string;
};

export function PageHero({ eyebrow, title, titleMuted, summary }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-clip border-b border-white/10 py-12 lg:py-16">
      <div aria-hidden="true" className="speed-stripes absolute inset-y-0 -right-1/4 left-1/4 -z-10" />
      <div className="shell">
        <div aria-hidden="true" className="tach-scale mb-6" />
        <p className="text-spark text-xs font-semibold tracking-[0.25em] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-[clamp(3rem,6vw,4.75rem)] leading-[0.95] tracking-wide uppercase">
          {title}
          {titleMuted ? <span className="text-white/60"> {titleMuted}</span> : null}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
          {summary}
        </p>
      </div>
    </section>
  );
}
