import "server-only";

import { demoCustomer, demoProducts, demoServiceDetails } from "@/lib/demo-data";
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

export type ServiceDetails = {
  summary: string;
  duration: string;
  // Whole pesos.
  fromPrice: number;
};

export type Service = {
  slug: string;
  name: string;
  // Shown on the home page. The owner picks the best sellers.
  isFeatured: boolean;
  // Demo values until the owner publishes real ones.
  details: ServiceDetails | null;
};

export type Accessory = {
  slug: string;
  name: string;
  image: { src: string; alt: string } | null;
};

export type Product = {
  slug: string;
  // An accessory slug.
  category: string;
  name: string;
  spec: string;
  // Whole pesos.
  price: number;
  stock: number;
};

export type PastVisit = {
  date: string;
  serviceName: string;
  car: string;
  total: number;
};

export type Customer = {
  name: string;
  history: PastVisit[];
};

// The single boundary between the UI and business data. Replace these bodies
// with database queries when the CMS exists.
export async function getBusinessInfo(): Promise<BusinessInfo> {
  return shopInfo;
}

export async function getServices(): Promise<Service[]> {
  return shopServices.map((service) => ({
    ...service,
    details: demoServiceDetails[service.slug] ?? null,
  }));
}

export async function getFeaturedServices(): Promise<Service[]> {
  return (await getServices()).filter((service) => service.isFeatured);
}

export async function getAccessories(): Promise<Accessory[]> {
  return shopAccessories;
}

export async function getProducts(): Promise<Product[]> {
  return demoProducts;
}

// No sessions yet, so everyone who logs in is the demo customer.
export async function getCustomer(): Promise<Customer> {
  return demoCustomer;
}
