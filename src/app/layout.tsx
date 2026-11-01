import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SmoothWheel } from "@/components/smooth-wheel";
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
  title: "MAC Performance | Car Repairs, Tuning and Accessories",
  description:
    "Precision repairs, expert diagnostics and premium accessories. Everything your car needs under one roof.",
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
