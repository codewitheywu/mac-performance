import { SectionHeading } from "@/components/section-heading";

export function AboutSection({ about }: { about: string }) {
  return (
    <section aria-labelledby="about-title" className="py-14 lg:py-20" id="about">
      <div className="shell grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About the shop"
            id="about-title"
            title="A repair bay and a parts counter."
            titleMuted="Same shop."
          />
        </div>
        <p className="reveal text-base leading-relaxed text-white/80 lg:col-span-5">
          {about}
        </p>
      </div>
    </section>
  );
}
