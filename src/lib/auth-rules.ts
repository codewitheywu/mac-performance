export type AuthMode = "login" | "signup";
export type AuthField = "name" | "email" | "mobile" | "password";
export type AuthErrors = Partial<Record<AuthField, string>>;

export const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Philippine mobile: 09XX XXX XXXX, or the same number after +63.
const MOBILE_PATTERN = /^(?:\+?63|0)9\d{9}$/;

function readField(form: FormData, field: AuthField) {
  const value = form.get(field);
  return typeof value === "string" ? value : "";
}

function checkEmail(value: string) {
  if (!value) return "Enter your email address.";
  if (value.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(value)) {
    return "Enter an email address like name@example.com.";
  }
}

function checkName(value: string) {
  if (!value) return "Enter your full name.";
  if (value.length > MAX_NAME_LENGTH) {
    return `Keep your name under ${MAX_NAME_LENGTH} characters.`;
  }
}

function checkMobile(value: string) {
  if (!value) return "Enter your mobile number.";
  if (!MOBILE_PATTERN.test(value.replace(/[\s-]/g, ""))) {
    return "Enter an 11-digit mobile number starting with 09.";
  }
}

function checkNewPassword(value: string) {
  if (!value) return "Choose a password.";
  if (value.length < MIN_PASSWORD_LENGTH) {
    return `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (value.length > MAX_PASSWORD_LENGTH) {
    return `Use ${MAX_PASSWORD_LENGTH} characters or fewer.`;
  }
}

// Pure, so a Server Action can run the same checks once accounts are real.
// Keys are added in form order: the first one is the field to focus.
export function validateAuthForm(mode: AuthMode, form: FormData): AuthErrors {
  const email = readField(form, "email").trim();
  const password = readField(form, "password");

  const results: [AuthField, string | undefined][] =
    mode === "login"
      ? [
          ["email", checkEmail(email)],
          ["password", password ? undefined : "Enter your password."],
        ]
      : [
          ["name", checkName(readField(form, "name").trim())],
          ["email", checkEmail(email)],
          ["mobile", checkMobile(readField(form, "mobile").trim())],
          ["password", checkNewPassword(password)],
        ];

  return Object.fromEntries(results.filter(([, message]) => message));
}
