"use client";

import { useRouter } from "next/navigation";
import {
  type ComponentProps,
  type FormEvent,
  useEffect,
  useState,
} from "react";

import {
  type AuthErrors,
  type AuthField,
  type AuthMode,
  MIN_PASSWORD_LENGTH,
  validateAuthForm,
} from "@/lib/auth-rules";
import { APPOINTMENTS_LINK } from "@/lib/navigation";

type FieldProps = ComponentProps<"input"> & {
  error?: string;
  hint?: string;
  label: string;
  name: AuthField;
};

const COPY: Record<AuthMode, { submit: string; note: string }> = {
  login: {
    submit: "Log in",
    note: "Sample login. No account needed yet, so just tap Log in to look around. Nothing you type here is saved or sent.",
  },
  signup: {
    submit: "Create account",
    note: "Sample sign up. Nothing you type here is saved or sent.",
  },
};

function Field({ error, hint, label, name, type, ...input }: FieldProps) {
  const [isShown, setIsShown] = useState(false);
  const isPassword = type === "password";
  const note = error ?? hint;
  const noteId = `${name}-note`;

  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          aria-describedby={note ? noteId : undefined}
          aria-invalid={error ? true : undefined}
          className={`field-input ${isPassword ? "pr-20" : ""} ${
            error ? "border-race-bright" : "border-white/30"
          }`}
          id={name}
          name={name}
          type={isPassword && isShown ? "text" : type}
          {...input}
        />
        {isPassword ? (
          <button
            aria-label={isShown ? "Hide password" : "Show password"}
            className="text-gold absolute inset-y-0 right-0 w-16 text-sm font-semibold"
            onClick={() => setIsShown(!isShown)}
            type="button"
          >
            {isShown ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
      {note ? (
        <p
          className={`mt-1.5 text-sm ${error ? "text-race-bright" : "text-white/75"}`}
          id={noteId}
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

// No account system exists yet, so the sample login lets anyone straight in and
// /appointments has no gate. The form action below runs in the browser, so a
// password never leaves the page, even if it is submitted before hydration.
// Accounts arrive by swapping that action for a Server Action that re-runs
// validateAuthForm on the server.
export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isOpening, setIsOpening] = useState(false);
  const { note, submit } = COPY[mode];
  const isLogin = mode === "login";

  // Fetched ahead, so going in does not wait on the network.
  useEffect(() => {
    router.prefetch(APPOINTMENTS_LINK.href);
  }, [router]);

  // Set here and not in the action: state set in an action only shows once the
  // navigation has finished, which is too late to reassure anyone.
  const check = (event: FormEvent<HTMLFormElement>) => {
    if (isLogin) {
      setIsOpening(true);
      return;
    }

    const form = event.currentTarget;
    const found = validateAuthForm(mode, new FormData(form));
    setErrors(found);

    const [firstInvalid] = Object.keys(found);
    if (firstInvalid) {
      event.preventDefault();
      form.querySelector<HTMLInputElement>(`#${firstInvalid}`)?.focus();
      return;
    }
    setIsOpening(true);
  };

  return (
    <form
      action={() => router.push(APPOINTMENTS_LINK.href)}
      className="flex flex-col gap-5"
      noValidate
      onSubmit={check}
    >
      <p className="border-gold border-l-2 pl-3 text-sm leading-relaxed text-white/85">
        {note}
      </p>

      {isLogin ? null : (
        <Field
          autoCapitalize="words"
          autoComplete="name"
          error={errors.name}
          label="Full name"
          name="name"
          type="text"
        />
      )}
      <Field
        autoCapitalize="none"
        autoComplete="email"
        error={errors.email}
        inputMode="email"
        label="Email"
        name="email"
        spellCheck={false}
        type="email"
      />
      {isLogin ? null : (
        <Field
          autoComplete="tel"
          error={errors.mobile}
          inputMode="tel"
          label="Mobile number"
          name="mobile"
          type="tel"
        />
      )}
      <Field
        autoCapitalize="none"
        autoComplete={isLogin ? "current-password" : "new-password"}
        error={errors.password}
        hint={isLogin ? undefined : `At least ${MIN_PASSWORD_LENGTH} characters.`}
        label="Password"
        name="password"
        spellCheck={false}
        type="password"
      />

      <button className="btn btn-race" type="submit">
        {isOpening ? "Opening..." : submit}
      </button>

    </form>
  );
}
