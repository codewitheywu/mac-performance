import type { Metadata } from "next";
import Image from "next/image";

import { CallCard } from "@/components/booking-card";
import { Flares } from "@/components/flares";
import { PageHero } from "@/components/page-hero";
import { ReviewsSection } from "@/components/reviews-section";
import { getBusinessInfo } from "@/lib/content";
import { getGooglePlace } from "@/lib/google-place";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Us",
  description:
    "MAC Automotive Performance is a car repair and accessories shop with a service bay and an accessories store in one building.",
};

const GALLERY = [
  {
    src: "/images/shop/engine-bay.webp",
    alt: "White Land Rover Defender in the service bay with the hood up",
    className: "lg:col-span-7",
    sizes: "(min-width: 1024px) 58vw, 100vw",
  },
  {
    src: "/images/shop/classic-corolla.webp",
    alt: "Orange classic Toyota Corolla parked inside the shop",
    className: "lg:col-span-5 lg:aspect-auto",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
];

export default async function AboutPage() {
  const [info, place] = await Promise.all([getBusinessInfo(), getGooglePlace()]);

  return (
    <>
      <PageHero
        image={{
          alt: "The shop front with its yellow MAC sign",
          position: "object-[50%_12%]",
          src: "/images/shop/storefront.webp",
        }}
        summary="A service bay and an accessories store in one building."
        title="About us"
      />

      <section
        aria-label="The shop"
        className="relative isolate overflow-clip py-20 lg:py-28"
      >
        <Flares lines />
        <div className="shell">
          <p className="reveal glass-card p-6 text-xl leading-relaxed font-light text-white/90 sm:p-8 lg:p-12 lg:text-2xl">
            {info.about}
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            {GALLERY.map((photo) => (
              <div
                className={`reveal rounded-glass relative aspect-16/10 overflow-clip ${photo.className}`}
                key={photo.src}
              >
                <Image
                  alt={photo.alt}
                  className="shop-photo photo-drift object-cover"
                  fill
                  sizes={photo.sizes}
                  src={photo.src}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection place={place} />

      <div className="relative isolate overflow-clip">
        <Flares flip />
        <div className="shell py-14 lg:py-20">
          <CallCard mobile={info.mobile} phone={info.phone} />
        </div>
      </div>
    </>
  );
}
