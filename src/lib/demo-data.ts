import type { Customer, Product, ServiceDetails } from "@/lib/content";

// INVENTED FOR THE DEMO. The project lead asked for sample prices, products,
// stock and a sample customer in November 2026, so the owner can see the site
// working. None of it is real, the UI labels it as a demo, and this whole file
// goes when the database exists. Real details stay in `shop-data.ts`.

export const demoServiceDetails: Record<string, ServiceDetails> = {
  "oil-change": {
    summary: "Engine oil and filter, with a check of fluids, belts and tyres.",
    duration: "About 1 hour",
    fromPrice: 1500,
  },
  brakes: {
    summary: "Pads, rotors and fluid, checked and replaced as needed.",
    duration: "About 2 hours",
    fromPrice: 1800,
  },
  suspension: {
    summary: "Shocks, bushings and links, finished with a test drive.",
    duration: "Half a day",
    fromPrice: 3500,
  },
  engine: {
    summary: "Diagnosis and repair, from oil leaks to overhauls.",
    duration: "Quoted after inspection",
    fromPrice: 2500,
  },
  electrical: {
    summary: "Wiring, lights, battery and charging faults.",
    duration: "About 2 hours",
    fromPrice: 1200,
  },
  "tune-up": {
    summary: "Spark plugs, filters and a throttle body clean.",
    duration: "About 2 hours",
    fromPrice: 2200,
  },
  troubleshooting: {
    summary: "Computer scan and road test to find the fault.",
    duration: "About 1 hour",
    fromPrice: 800,
  },
};

export const demoProducts: Product[] = [
  { slug: "android-head-unit", category: "sound-system", name: "Android head unit", spec: "7-inch screen, 2 GB, Bluetooth", price: 8500, stock: 6 },
  { slug: "coaxial-speakers", category: "sound-system", name: "Coaxial speakers", spec: "6.5-inch, pair", price: 2800, stock: 12 },
  { slug: "subwoofer-box", category: "sound-system", name: "Subwoofer with box", spec: "10-inch, 300 W", price: 6200, stock: 3 },
  { slug: "four-channel-amp", category: "sound-system", name: "Four-channel amplifier", spec: "600 W", price: 5400, stock: 0 },
  { slug: "sport-steering-wheel", category: "car-accessories", name: "Sport steering wheel", spec: "350 mm, suede", price: 3200, stock: 5 },
  { slug: "quick-release-hub", category: "car-accessories", name: "Quick release hub", spec: "Fits most sport wheels", price: 1800, stock: 4 },
  { slug: "seat-covers", category: "car-accessories", name: "Leatherette seat covers", spec: "Full set, five seats", price: 4500, stock: 7 },
  { slug: "floor-mats", category: "car-accessories", name: "Rubber floor mats", spec: "Five pieces", price: 1250, stock: 15 },
  { slug: "cold-air-intake", category: "auto-parts", name: "Cold air intake kit", spec: "With filter and clamps", price: 4800, stock: 2 },
  { slug: "led-headlights", category: "auto-parts", name: "LED headlight bulbs", spec: "H4, pair", price: 1950, stock: 10 },
  { slug: "oil-filter", category: "auto-parts", name: "Oil filter", spec: "Spin-on, most sedans", price: 350, stock: 30 },
  { slug: "brake-pads", category: "auto-parts", name: "Ceramic brake pads", spec: "Front set", price: 2400, stock: 8 },
  { slug: "ceramic-tint", category: "window-tinting", name: "Nano ceramic tint", spec: "Sedan, all windows, fitted", price: 9500, stock: 9 },
  { slug: "windshield-tint", category: "window-tinting", name: "Windshield tint", spec: "Carbon film, fitted", price: 3500, stock: 9 },
  { slug: "two-way-alarm", category: "car-alarm-system", name: "Two-way alarm", spec: "With remote starter, fitted", price: 6800, stock: 4 },
  { slug: "basic-alarm", category: "car-alarm-system", name: "Car alarm", spec: "Two remotes, fitted", price: 2500, stock: 9 },
  { slug: "vent-freshener", category: "air-freshener", name: "Vent clip freshener", spec: "New car scent", price: 180, stock: 40 },
  { slug: "hanging-freshener", category: "air-freshener", name: "Hanging freshener", spec: "Pack of three", price: 150, stock: 1 },
];

export const demoCustomer: Customer = {
  name: "Juan dela Cruz",
  history: [
    { date: "2026-09-14", serviceName: "Oil change", car: "Toyota Vios 2019", total: 1650 },
    { date: "2026-06-02", serviceName: "Brakes", car: "Toyota Vios 2019", total: 2400 },
    { date: "2026-03-21", serviceName: "Tune-up", car: "Toyota Vios 2019", total: 2600 },
  ],
};
