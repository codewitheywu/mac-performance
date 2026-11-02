import Image from "next/image";
import Link from "next/link";

import { Flares } from "@/components/flares";

export function AboutSection({ about }: { about: string }) {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-clip py-20 lg:py-32"
      id="about"
    >
      <Flares />
      {/* The glass overlaps the photo, so the store shows through its edge. */}
      <div className="shell lg:grid lg:grid-cols-12 lg:items-center">
        <div className="reveal rounded-glass relative aspect-4/3 overflow-clip lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <Image
            alt="The accessories store with steering wheels, exhausts, wheels and boxed parts"
            className="shop-photo photo-drift object-cover"
            fill
            sizes="(min-width: 1280px) 860px, (min-width: 1024px) 66vw, 100vw"
            src="/images/shop/accessories-wall.webp"
          />
        </div>
        <div className="reveal glass-card glass-sheen z-10 mx-3 -mt-16 flex flex-col items-start gap-5 p-6 [--glass-tint:0.5] sm:p-8 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:mt-0 lg:p-10">
          <span aria-hidden="true" className="slant-tick" />
          <h2
            className="font-display text-[clamp(2.75rem,5.6vw,4.75rem)] leading-none tracking-wide uppercase"
            id="about-title"
          >
            The shop
          </h2>
          <p className="text-lg leading-relaxed text-white/90">{about}</p>
          <Link
            className="text-gold decoration-gold/50 hover:decoration-gold -my-3 inline-block py-3 text-sm font-medium underline underline-offset-4 transition-colors duration-200 ease-race"
            href="/about"
          >
            More about us
          </Link>
        </div>
      </div>
    </section>
  );
}
