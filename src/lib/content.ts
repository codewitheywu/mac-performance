import "server-only";

import { shopAccessories, shopInfo, shopServices } from "@/lib/shop-data";

export type BusinessInfo = {
  about: string;
  phone: string;
  mobile: string | null;
  email: string | null;
  address: string;
  area: string;
  mapsUrl: string;
  mapsQuery: string | null;
  hours: { days: string; time: string }[];
  openHours: ([number, number] | null)[];
  socials: { label: string; href: string }[];
};

export type Service = {
  slug: string;
  name: string;
  // Shown on the home page. The owner picks the best sellers.
  isFeatured: boolean;
};

export type Accessory = {
  slug: string;
  name: string;
  image: { src: string; alt: string } | null;
};

// The single boundary between the UI and business data. Replace these bodies
// with database queries when the CMS exists.
export async function getBusinessInfo(): Promise<BusinessInfo> {
  return shopInfo;
}

export async function getServices(): Promise<Service[]> {
  return shopServices;
}

export async function getFeaturedServices(): Promise<Service[]> {
  return shopServices.filter((service) => service.isFeatured);
}

export async function getAccessories(): Promise<Accessory[]> {
  return shopAccessories;
}
