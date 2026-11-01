"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Marks each `.reveal` element once it enters the viewport. The animation
// itself lives in globals.css, on opacity and transform only. Keyed on the
// path so cards on a page reached by client navigation are observed too.
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document.documentElement.classList.add("reveal-armed");
    document
      .querySelectorAll(".reveal:not(.is-revealed)")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
