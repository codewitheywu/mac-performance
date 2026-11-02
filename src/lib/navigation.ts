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

// Not in NAV_LINKS: they have no home section and stay out of the sitemap.
export const LOGIN_LINK = { label: "Log in", href: "/login" };
export const SIGNUP_LINK = { label: "Sign up", href: "/signup" };
export const APPOINTMENTS_LINK = { label: "Appointments", href: "/appointments" };
