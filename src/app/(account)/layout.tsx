import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AccountHeader } from "@/components/account-header";
import { SiteFooter } from "@/components/site-footer";
import { getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false },
};

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const info = await getBusinessInfo();

  return (
    <>
      <AccountHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter info={info} />
    </>
  );
}
