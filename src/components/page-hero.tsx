import Image from "next/image";

import { Flares } from "@/components/flares";

type PageHeroProps = {
  title: string;
  summary: string;
  image: { src: string; alt: string; position: string };
};

export function PageHero({ title, summary, image }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-96 items-end overflow-clip lg:min-h-[max(32rem,38vw)]">
      <Image
        alt={image.alt}
        className={`shop-photo -z-20 object-cover ${image.position}`}
        fill
        preload
        sizes="100vw"
        src={image.src}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-black to-transparent to-60%"
      />
      <Flares />
      <div className="shell pt-32 pb-8">
        <div className="glass-card glass-sheen sheen-in max-w-2xl p-6 [--glass-tint:0.5] sm:p-8">
          <span aria-hidden="true" className="slant-tick mb-3" />
          <h1 className="font-display text-[clamp(3.25rem,7vw,6rem)] leading-[0.92] tracking-wide uppercase">
            {title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/90">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}
