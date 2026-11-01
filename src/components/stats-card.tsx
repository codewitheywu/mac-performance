import type { Stat } from "@/lib/content";

export function StatsCard({
  className,
  stats,
}: {
  className: string;
  stats: Stat[];
}) {
  return (
    <dl
      className={`glass-card grid w-full max-w-md grid-cols-3 divide-x divide-white/10 ${className}`}
    >
      {stats.map((stat) => (
        <div className="flex flex-col-reverse justify-end gap-1 p-3 sm:p-4" key={stat.label}>
          <dt className="text-[0.625rem] leading-snug font-semibold tracking-[0.12em] text-white/75 uppercase">
            {stat.label}
          </dt>
          <dd className="text-spark font-display text-3xl tabular-nums">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
