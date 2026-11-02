"use client";

import {
  type ComponentProps,
  type FormEvent,
  useState,
} from "react";

import {
  type AuthErrors,
  type AuthField,
  type AuthMode,
  MIN_PASSWORD_LENGTH,
  validateAuthForm,
} from "@/lib/auth-rules";

type FieldProps = ComponentProps<"input"> & {
  error?: string;
  hint?: string;
  label: string;
  name: AuthField;
};

const COPY: Record<AuthMode, { submit: string; done: string }> = {
  login: {
    submit: "Log in",
    done: "Sample only, so you were not logged in. Nothing you typed was saved or sent.",
  },
  signup: {
    submit: "Create account",
    done: "Sample only, so no account was created. Nothing you typed was saved or sent.",
  },
};

// 16px text: iOS zooms the whole page when it focuses anything smaller.
const inputClass =
  "h-12 w-full rounded-sm border bg-black/45 px-4 text-base text-white transition-colors duration-200 ease-race focus:border-gold";

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
          className={`${inputClass} ${isPassword ? "pr-20" : ""} ${
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

// No account system exists yet. The form action below runs in the browser, so
// a password never leaves the page, even if it is submitted before hydration.
// Accounts arrive by swapping that action for a Server Action that re-runs
// validateAuthForm on the server.
export function AuthForm({ mode }: { mode: AuthMode }) {
  const [errors, setErrors] = useState<AuthErrors>({});
  const [isDone, setIsDone] = useState(false);
  const { done, submit } = COPY[mode];

  const check = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const found = validateAuthForm(mode, new FormData(form));
    setErrors(found);
    setIsDone(false);

    const [firstInvalid] = Object.keys(found);
    if (firstInvalid) {
      event.preventDefault();
      form.querySelector<HTMLInputElement>(`#${firstInvalid}`)?.focus();
    }
  };

  const isLogin = mode === "login";

  return (
    <form
      action={() => setIsDone(true)}
      className="flex flex-col gap-5"
      noValidate
      onSubmit={check}
    >
      <p className="border-gold border-l-2 pl-3 text-sm leading-relaxed text-white/85">
        Sample page. Accounts open with the live site, so nothing you enter here
        is saved or sent.
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

      <button
        className="btn btn-race"
        type="submit"
      >
        {submit}
      </button>

      <p className="empty:hidden text-sm leading-relaxed text-white/85" role="status">
        {isDone ? done : null}
      </p>
    </form>
  );
}
