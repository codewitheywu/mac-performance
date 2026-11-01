import Image from "next/image";
import Link from "next/link";

export function AboutSection({ about }: { about: string }) {
  return (
    <section aria-labelledby="about-title" className="py-20 lg:py-32" id="about">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="reveal relative aspect-4/3 overflow-hidden rounded-sm lg:col-span-7">
          <Image
            alt="The accessories store with steering wheels, exhausts, wheels and boxed parts"
            className="shop-photo object-cover"
            fill
            sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
            src="/images/shop/accessories-wall.webp"
          />
        </div>
        <div className="reveal flex flex-col items-start gap-5 lg:col-span-5">
          <h2
            className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-wide uppercase"
            id="about-title"
          >
            The shop
          </h2>
          <p className="text-lg leading-relaxed font-light text-white/85">{about}</p>
          <Link
            className="text-gold decoration-gold/50 hover:decoration-gold text-sm font-medium underline underline-offset-4 transition-colors duration-200 ease-race"
            href="/about"
          >
            More about us
          </Link>
        </div>
      </div>
    </section>
  );
}
