import type { Metadata } from "next";

import { AuthPage } from "@/components/auth-page";
import { getBusinessInfo } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false },
  title: "Sign up",
  description: "Create a MAC Automotive Performance account.",
};

export default async function SignupPage() {
  const info = await getBusinessInfo();

  return (
    <AuthPage
      image="/images/shop/storefront.webp"
      mode="signup"
      phone={info.phone}
      summary="Book a visit, follow your orders and message the shop from one account."
      title="Sign up"
    />
  );
}
