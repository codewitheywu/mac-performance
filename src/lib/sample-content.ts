import "server-only";

import type { Accessory, BusinessInfo, Service, Stat } from "@/lib/content";

// SAMPLE DATA, development only. Lets the landing page be reviewed before the
// database exists; `src/lib/content.ts` never returns it in production.
// The address is the owner's. The phone and stats are the placeholders from
// the design reference. Names, prices, hours and the best-seller flags are
// fixtures: delete this file when the database is wired up.

export const sampleBusinessInfo: BusinessInfo = {
  about:
    "Sample copy. Replace with the shop's own story from the CMS: who runs it, what cars come through and what the shop is known for.",
  phone: "+63 911 111 1111",
  email: "sample@example.com",
  address: "131 Gordon Ave, Olongapo City, 2200 Zambales, Philippines",
  mapsUrl: "https://maps.app.goo.gl/57vEtnDnNyx3eKk86",
  mapsQuery: "Mac Automotive Performance, Olongapo City",
  hours: [{ days: "Sample days", time: "00:00 to 00:00" }],
  socials: [{ label: "Facebook", href: "https://example.com/sample" }],
};

export const sampleStats: Stat[] = [
  { value: "10+", label: "Years experience" },
  { value: "5K+", label: "Cars serviced" },
  { value: "100%", label: "Genuine parts" },
];

export const sampleServices: Service[] = [
  {
    slug: "sample-engine-repair",
    category: "Repairs",
    name: "Engine and drivetrain repair",
    summary:
      "Sample service. Fault finding through to rebuild, with the work explained before anything comes apart.",
    includes: ["Fault diagnosis", "Timing and cooling", "Clutch and gearbox"],
    priceFrom: 1234,
    duration: "Sample duration",
    isBestSeller: true,
  },
  {
    slug: "sample-diagnostics",
    category: "Diagnostics",
    name: "Computer diagnostics",
    summary: "Sample service. Scan, live data check and a written fault list.",
    includes: ["Full system scan", "Live data review"],
    priceFrom: 1234,
    duration: null,
    isBestSeller: true,
  },
  {
    slug: "sample-tuning",
    category: "Tuning",
    name: "ECU tuning",
    summary: "Sample service. Map changes matched to the car and its parts.",
    includes: ["Baseline check", "Custom map"],
    priceFrom: 2345,
    duration: null,
    isBestSeller: true,
  },
  {
    slug: "sample-suspension",
    category: "Repairs",
    name: "Brakes and suspension",
    summary: "Sample service. Pads, discs, bushings and alignment.",
    includes: ["Brake inspection", "Wheel alignment"],
    priceFrom: null,
    duration: null,
    isBestSeller: true,
  },
  {
    slug: "sample-oil-service",
    category: "Maintenance",
    name: "Oil and filter service",
    summary: "Sample service. Engine oil, filter and a fluid level check.",
    includes: ["Engine oil", "Oil filter", "Fluid top-up"],
    priceFrom: 1234,
    duration: null,
    isBestSeller: false,
  },
  {
    slug: "sample-preventive",
    category: "Maintenance",
    name: "Preventive maintenance",
    summary: "Sample service. Scheduled checks by mileage.",
    includes: ["Belts and hoses", "Filters", "Battery test"],
    priceFrom: 2345,
    duration: null,
    isBestSeller: false,
  },
  {
    slug: "sample-aircon",
    category: "Repairs",
    name: "Aircon service",
    summary: "Sample service. Leak check, cleaning and recharge.",
    includes: ["Leak check", "Recharge"],
    priceFrom: null,
    duration: null,
    isBestSeller: false,
  },
  {
    slug: "sample-parts-fitting",
    category: "Tuning",
    name: "Performance parts fitting",
    summary: "Sample service. Intakes, exhausts and suspension fitted and set up.",
    includes: ["Fitting", "Road test"],
    priceFrom: 3456,
    duration: null,
    isBestSeller: false,
  },
  {
    slug: "sample-inspection",
    category: "Diagnostics",
    name: "Pre-purchase inspection",
    summary: "Sample service. A full check before buying a used car.",
    includes: ["Body and frame", "Engine scan", "Road test"],
    priceFrom: 1234,
    duration: null,
    isBestSeller: false,
  },
];

export const sampleAccessories: Accessory[] = [
  { slug: "sample-1", category: "Exhaust", name: "Sample exhaust system", priceFrom: 1234 },
  { slug: "sample-2", category: "Wheels", name: "Sample alloy wheel set", priceFrom: 2345 },
  { slug: "sample-3", category: "Suspension", name: "Sample coilover kit", priceFrom: 3456 },
  { slug: "sample-4", category: "Intake", name: "Sample air intake kit", priceFrom: 1234 },
  { slug: "sample-5", category: "Lighting", name: "Sample LED headlight set", priceFrom: null },
  { slug: "sample-6", category: "Interior", name: "Sample bucket seat", priceFrom: 4567 },
  { slug: "sample-7", category: "Brakes", name: "Sample big brake kit", priceFrom: 5678 },
];
