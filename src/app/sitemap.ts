import type { MetadataRoute } from "next";

import { NAV_LINKS } from "@/lib/navigation";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({ url: `${SITE_URL}${link.href}` }));
}
