export type NavLink = {
  label: string;
  href: string;
  // The matching section on the home page.
  section: string;
};

// The home page stacks its sections in this same order.
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", section: "top" },
  { label: "About us", href: "/about", section: "about" },
  { label: "Services", href: "/services", section: "services" },
  { label: "Accessories", href: "/accessories", section: "accessories" },
  { label: "Contacts", href: "/contacts", section: "contacts" },
];
