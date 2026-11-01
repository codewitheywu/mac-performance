import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SmoothWheel } from "@/components/smooth-wheel";
import { SITE_URL } from "@/lib/site";
import "@/styles/globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    locale: "en_PH",
    siteName: "MAC Automotive Performance",
    type: "website",
  },
  title: {
    default: "MAC Automotive Performance | Car Repair and Accessories, Olongapo City",
    template: "%s | MAC Automotive Performance",
  },
  description:
    "Car repairs, window tinting, sound systems and parts on Gordon Ave, Olongapo City.",
};

// Phone browsers tint their address bar with this.
export const viewport: Viewport = {
  themeColor: "black",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RevealOnScroll />
        <SmoothWheel />
        {children}
      </body>
    </html>
  );
}
