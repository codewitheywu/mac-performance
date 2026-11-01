import { AboutSection } from "@/components/about-section";
import { AccessoriesRail } from "@/components/accessories-rail";
import { Hero } from "@/components/hero";
import { NapSection } from "@/components/nap-section";
import { ServicesBento } from "@/components/services-bento";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { NavLink } from "@/components/site-nav";
import {
  getAccessories,
  getBusinessInfo,
  getServices,
  getStats,
} from "@/lib/content";

export default async function Home() {
  const [info, stats, services, accessories] = await Promise.all([
    getBusinessInfo(),
    getStats(),
    getServices(),
    getAccessories(),
  ]);

  const hasServices = services.length > 0;
  const hasAccessories = accessories.length > 0;

  // The nav only offers sections that have content to show.
  const links: NavLink[] = [
    { label: "Home", href: "#top" },
    ...(info.about ? [{ label: "About us", href: "#about" } as const] : []),
    ...(hasServices ? [{ label: "Services", href: "#services" } as const] : []),
    ...(hasAccessories
      ? [{ label: "Accessories", href: "#accessories" } as const]
      : []),
    ...(info.address ? [{ label: "Contacts", href: "#contacts" } as const] : []),
  ];

  const bookHref = info.address ? "#contacts" : null;

  const jsonLd =
    info.address || info.phone
      ? {
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "MAC Performance",
          ...(info.address ? { address: info.address } : {}),
          ...(info.phone ? { telephone: info.phone } : {}),
          ...(info.email ? { email: info.email } : {}),
        }
      : null;

  return (
    <>
      {jsonLd ? (
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      ) : null}
      <SiteHeader links={links} phone={info.phone} />
      <main className="flex-1">
        <Hero
          bookHref={bookHref}
          servicesHref={hasServices ? "#services" : null}
          stats={stats}
        />
        {hasServices ? (
          <ServicesBento
            bookHref={bookHref}
            phone={info.phone}
            services={services}
          />
        ) : null}
        {hasAccessories ? <AccessoriesRail accessories={accessories} /> : null}
        {info.about ? <AboutSection about={info.about} /> : null}
        {info.address ? (
          <NapSection
            address={info.address}
            email={info.email}
            hours={info.hours}
            phone={info.phone}
          />
        ) : null}
      </main>
      <SiteFooter links={links} socials={info.socials} />
    </>
  );
}
