import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
import { Flares } from "@/components/flares";
import type { AuthMode } from "@/lib/auth-rules";
import { telHref } from "@/lib/format";
import { LOGIN_LINK, SIGNUP_LINK } from "@/lib/navigation";

type AuthPageProps = {
  image: string;
  mode: AuthMode;
  phone: string;
  summary: string;
  title: string;
};

const SWITCH_LINK = {
  login: { prompt: "New to the shop?", link: SIGNUP_LINK },
  signup: { prompt: "Already have an account?", link: LOGIN_LINK },
};

export function AuthPage({ image, mode, phone, summary, title }: AuthPageProps) {
  const { link, prompt } = SWITCH_LINK[mode];

  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-clip">
      {/* The whole photo, never cropped, so the card sits beside the MAC logo
          and not on it. Also keeps the form high on a phone. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-20 aspect-16/9 lg:left-auto lg:w-[68%] xl:w-[74%]"
      >
        <Image
          alt=""
          className="shop-photo object-cover object-top"
          fill
          preload
          sizes="(min-width: 1280px) 74vw, (min-width: 1024px) 68vw, 100vw"
          src={image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent to-40%" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-black to-transparent to-14% lg:block" />
      </div>
      <Flares />

      <div className="shell pt-[calc(56.25vw-3.5rem)] pb-8 lg:py-12">
        <div className="glass-card glass-sheen sheen-in rise-in mx-auto max-w-lg p-5 [--glass-tint:0.55] sm:p-8 lg:mx-0 lg:p-10">
          <span aria-hidden="true" className="slant-tick mb-3" />
          <h1 className="font-display text-[clamp(3.25rem,7vw,5rem)] leading-[0.92] tracking-wide uppercase">
            {title}
          </h1>
          <p className="mt-3 mb-6 text-base leading-relaxed text-white/90">
            {summary}
          </p>

          <AuthForm mode={mode} />

          <div className="mt-6 space-y-1 border-t border-white/15 pt-5 text-sm">
            <p>
              {prompt}{" "}
              <Link
                className="text-gold inline-block py-2 font-semibold hover:underline"
                href={link.href}
              >
                {link.label}
              </Link>
            </p>
            <p className="text-white/85">
              No account needed to book. Call{" "}
              <a
                className="text-gold inline-block py-2 font-semibold tabular-nums hover:underline"
                href={telHref(phone)}
              >
                {phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
