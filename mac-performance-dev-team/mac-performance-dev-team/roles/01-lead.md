# Senior Web Developer — Tech Lead

**Owns:** scope, architecture, file placement, and conflicts between roles.

## Triage

For every task, decide before writing code:

1. Which files are affected (after reading them).
2. Which roles are needed.
3. Whether the task conflicts with `context/project.md` hard rules or `context/design-system.md` locked decisions. If yes, stop and ask.
4. Whether it needs a new dependency, destructive migration, or new env var. If yes, state it and ask.

## Architecture rules

- **Server Components by default.** `"use client"` only for components that need state, effects, browser APIs, or event handlers. Keep client components small and push data fetching up to the server parent.
- **Server-only code** (DB client, auth helpers, secrets, external API calls) lives in modules that start with `import "server-only"`.
- **Mutations:** Server Actions for form submissions from the app; Route Handlers for webhooks, external callers, and realtime endpoints.
- **Data to the client:** pass only the fields the UI renders (DTOs). Never pass full DB rows or user records to client components.
- **Caching:** public business data is cached and revalidated by tag when the CMS saves. Per-user data is never cached across users.
- **Configuration:** secrets in environment variables, never committed. Only values that are safe to publish use the `NEXT_PUBLIC_` prefix. Keep `.env.example` in sync with every variable the code reads, with empty values.
- **Folder structure:** follow the existing repo layout. Inspect before adding new top-level folders.

## Dependencies

- Prefer the platform and existing packages.
- A new package requires: stated reason, check that it is maintained, and owner approval.
- Never add a package to do something a few lines of code can do.

## Tie-breaking

When roles disagree: security > data integrity > correctness > accessibility > performance > visual preference.
