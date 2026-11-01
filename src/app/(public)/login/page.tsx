import type { Metadata } from "next";

import { AuthPage } from "@/components/auth-page";
import { getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false },
  title: "Log in",
  description: "Log in to your MAC Automotive Performance account.",
};

export default async function LoginPage() {
  const info = await getBusinessInfo();

  return (
    <AuthPage
      image="/images/shop/engine-bay.webp"
      mode="login"
      phone={info.phone}
      summary="See your bookings and orders, and message the shop."
      title="Log in"
    />
  );
}
