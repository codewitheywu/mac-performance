import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBusinessInfo } from "@/lib/content";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const info = await getBusinessInfo();

  return (
    <>
      <SiteHeader phone={info.phone} />
      <main className="flex-1">{children}</main>
      <SiteFooter info={info} />
    </>
  );
}
