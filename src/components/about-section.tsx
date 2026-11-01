import { SectionHeading } from "@/components/section-heading";

export function AboutSection({ about }: { about: string }) {
  return (
    <section aria-labelledby="about-title" className="py-14 lg:py-20" id="about">
      <div className="shell">
        <SectionHeading
          eyebrow="About the shop"
          id="about-title"
          link={{ href: "/about", label: "About us" }}
          title="A repair bay and a parts counter."
          titleMuted="Same shop."
        />
        <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-white/80">
          {about}
        </p>
      </div>
    </section>
  );
}
