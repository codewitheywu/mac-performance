import "server-only";

import {
  sampleAccessories,
  sampleBusinessInfo,
  sampleServices,
  sampleStats,
} from "@/lib/sample-content";

export type BusinessInfo = {
  about: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  mapsUrl: string | null;
  mapsQuery: string | null;
  hours: { days: string; time: string }[];
  socials: { label: string; href: string }[];
};

export type Stat = { value: string; label: string };

export type Service = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  includes: string[];
  priceFrom: number | null;
  duration: string | null;
  isBestSeller: boolean;
};

export type Accessory = {
  slug: string;
  category: string;
  name: string;
  priceFrom: number | null;
};

// The single boundary between the UI and business data. Every field is
// nullable or a list so sections hide themselves when the data is absent.
// Replace these bodies with database queries; production stays empty until
// then so sample values can never ship.
const useSampleContent = process.env.NODE_ENV !== "production";

export async function getBusinessInfo(): Promise<BusinessInfo> {
  if (useSampleContent) return sampleBusinessInfo;
  return {
    about: null,
    phone: null,
    email: null,
    address: null,
    mapsUrl: null,
    mapsQuery: null,
    hours: [],
    socials: [],
  };
}

export async function getStats(): Promise<Stat[]> {
  return useSampleContent ? sampleStats : [];
}

export async function getServices(): Promise<Service[]> {
  return useSampleContent ? sampleServices : [];
}

export async function getBestSellingServices(): Promise<Service[]> {
  const services = await getServices();
  return services.filter((service) => service.isBestSeller);
}

export async function getAccessories(): Promise<Accessory[]> {
  return useSampleContent ? sampleAccessories : [];
}
