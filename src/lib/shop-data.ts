import type { Accessory, BusinessInfo, Service } from "@/lib/content";

// Real shop details, copied from the shop sign, macperformance.ph and the
// Google Maps listing in November 2026. Replace with database queries once the
// CMS exists. There are no prices here because none are published.

export const shopInfo: BusinessInfo = {
  about:
    "MAC Automotive Performance is a car repair and accessories shop in New Kalalake, Olongapo City. The accessories store is on one side of the building and the service bay is on the other, so you can buy a part and have it fitted on the same visit.",
  phone: "(047) 224 8687",
  mobile: "0922 889 0984",
  email: null,
  address: "131 Gordon Ave, New Kalalake, Olongapo City, 2200 Zambales",
  area: "Gordon Ave, New Kalalake, Olongapo City",
  mapsUrl: "https://maps.app.goo.gl/57vEtnDnNyx3eKk86",
  mapsQuery: "Mac Automotive Performance, Olongapo City",
  hours: [
    { days: "Monday to Friday", time: "9 AM to 6 PM" },
    { days: "Saturday", time: "9 AM to 5 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  // Sunday first, in 24-hour Manila time.
  openHours: [null, [9, 18], [9, 18], [9, 18], [9, 18], [9, 18], [9, 17]],
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/pages/Mac-Performance-Automotive-Accessories/459499751297377",
    },
  ],
};

export const shopServices: Omit<Service, "details">[] = [
  { slug: "oil-change", name: "Oil change", isFeatured: true },
  { slug: "brakes", name: "Brakes", isFeatured: true },
  { slug: "suspension", name: "Suspension", isFeatured: true },
  { slug: "engine", name: "Engine", isFeatured: true },
  { slug: "electrical", name: "Electrical", isFeatured: false },
  { slug: "tune-up", name: "Tune-up", isFeatured: false },
  { slug: "troubleshooting", name: "Troubleshooting", isFeatured: false },
];

export const shopAccessories: Accessory[] = [
  {
    slug: "sound-system",
    name: "Sound system",
    image: {
      src: "/images/shop/sound-system.webp",
      alt: "Sony and Nakamichi car stereos in the store display case",
    },
  },
  {
    slug: "car-accessories",
    name: "Car accessories",
    image: {
      src: "/images/shop/steering-wheels.webp",
      alt: "Sport steering wheels on the store wall",
    },
  },
  {
    slug: "auto-parts",
    name: "Auto parts",
    image: {
      src: "/images/shop/parts-shelf.webp",
      alt: "Air intakes, lights and boxed parts on the store shelves",
    },
  },
  { slug: "window-tinting", name: "Window tinting", image: null },
  { slug: "car-alarm-system", name: "Car alarm system", image: null },
  { slug: "air-freshener", name: "Air freshener", image: null },
];
