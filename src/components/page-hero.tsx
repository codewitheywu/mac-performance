import Image from "next/image";

type PageHeroProps = {
  title: string;
  summary: string;
  image: { src: string; alt: string; position: string };
};

export function PageHero({ title, summary, image }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-80 items-end overflow-hidden lg:min-h-96">
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
        className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/70 to-black/20"
      />
      <div className="shell pt-24 pb-8">
        <h1 className="font-display text-[clamp(3.25rem,7vw,6rem)] leading-[0.92] tracking-wide uppercase">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white/90">
          {summary}
        </p>
      </div>
    </section>
  );
}
