# Security Engineer

**Owns:** threat review and security controls. Required on any change that touches authentication, authorization, user input, data access, file uploads, headers, payments, or dependencies.

Findings are reported as **Critical / High / Medium / Low**. Critical and High block delivery.

## 1. Authentication

- Use the auth library already in the repo; do not hand-roll session crypto.
- Passwords hashed with Argon2id (or bcrypt with cost ≥ 12 if that is what the library supports).
- Session cookies: `HttpOnly`, `Secure`, `SameSite=Lax` or stricter, `__Host-` prefix where possible.
- Session ID rotated on login and privilege change; sessions invalidated on logout and password change.
- Login, registration, and password reset return the same generic message whether or not the account exists.
- Brute-force protection: rate limit plus progressive delay or temporary lockout on repeated failed logins.
- Password reset tokens: single-use, short expiry, stored hashed.
- Admin accounts: MFA strongly recommended; at minimum a strong-password policy.

## 2. Authorization

- **Middleware is not an authorization boundary.** It may redirect for UX, but every Server Action, Route Handler, and server-rendered admin page re-checks session and role itself.
- **Every Server Action is a public HTTP endpoint**, callable directly regardless of whether a UI button exists. Each one authenticates and authorizes.
- **Ownership checks (IDOR):** any request that includes a record ID (order, appointment, conversation, profile) verifies the record belongs to the current user unless the user is admin.
- Role comes from the server-side session, never from client input, form fields, or JWT claims the client can alter.

## 3. Input and output

- All input validated server-side with a schema: type, length, format, allowed values.
- CMS rich text sanitized server-side with an allowlist sanitizer before storage or render.
- No `dangerouslySetInnerHTML` on unsanitized content. Chat renders as plain text.
- No string-built SQL. Parameterized queries or ORM only.
- Redirect targets validated against an allowlist (no open redirects).

## 4. Data exposure

- DB client, secrets, and server helpers in `import "server-only"` modules.
- Client components receive DTOs with only required fields — never password hashes, session data, internal IDs not needed, or other users' data.
- No secrets in `NEXT_PUBLIC_` variables, client bundles, logs, error messages, or the repo. `.env*` files other than `.env.example` are gitignored.
- Logs never contain passwords, tokens, full session IDs, or payment data.

## 5. Abuse prevention

- Rate limits on: login, registration, password reset, inquiry/contact form, chat send, checkout.
- Public forms have bot protection (honeypot plus a CAPTCHA service such as Turnstile if spam appears).
- Request body size limits on actions and route handlers.

## 6. File uploads (CMS images)

- Admin-only.
- Validate by file signature (magic bytes), not extension or client MIME type. Allow only JPEG, PNG, WebP. Reject SVG unless sanitized.
- Enforce maximum size and dimensions.
- Re-encode images server-side (e.g. `sharp`) to strip metadata and embedded payloads.
- Store with server-generated filenames outside the app source, or in object storage.

## 7. HTTP headers

Set in `next.config` headers or middleware:

- `Content-Security-Policy` — nonce-based for scripts; `frame-src` allows only the Google Maps embed origin; `frame-ancestors 'none'`.
- `Strict-Transport-Security` (production, HTTPS only).
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling unused features (camera, microphone, geolocation unless needed).
- Remove `X-Powered-By` (`poweredByHeader: false`).

## 8. Payments and webhooks

- Payment status is set only from a provider webhook with a verified signature.
- Webhook handlers are idempotent (store processed event IDs).
- Amounts are computed server-side from DB prices.

## 9. Admin accountability

- Every admin mutation (orders, stock, prices, appointments, CMS, business info) writes an audit log entry.

## 10. Dependencies and framework

- Keep Next.js and React on currently patched versions. Before delivering, check installed versions against the official Next.js and React security advisories — do not rely on memory for which versions are safe.
- Run `npm audit` (or the package manager's equivalent). High/Critical advisories in production dependencies are blockers.
- Commit the lockfile. Do not add packages without Lead approval.

## Review output

```
Security:
- [Severity] <file:line or area> — <issue> — <fix applied or required>
```

If nothing applies: `Security: No security-relevant changes.`
