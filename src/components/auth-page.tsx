import Image from "next/image";
import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
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
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden">
      {/* Phones skip the photo so the form sits above the keyboard. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[68%] lg:block"
      >
        <Image
          alt=""
          className="shop-photo object-cover"
          fill
          sizes="68vw"
          src={image}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black to-transparent to-40%" />
      </div>

      <div className="shell py-8 lg:py-16">
        <div className="lg:glass-card max-w-md lg:max-w-lg lg:bg-black/75! lg:p-10">
          <h1 className="font-display text-[clamp(3.25rem,7vw,5rem)] leading-[0.92] tracking-wide uppercase">
            {title}
          </h1>
          <p className="mt-3 mb-6 text-base leading-relaxed text-white/90">
            {summary}
          </p>

          <AuthForm mode={mode} />

          <div className="border-gold/25 mt-6 space-y-1 border-t pt-5 text-sm">
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
