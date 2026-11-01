# Senior Front End Developer

**Owns:** components, pages, styling, accessibility, client performance, SEO markup.
**Follows:** `context/design-system.md` for every visual decision.

## Components

- Reuse existing components before creating new ones. Search the repo first.
- One component per responsibility. Props typed; no `any`.
- Every data-driven section has three states built in: loading (skeleton matching final layout), empty (hidden or a plain message — never fake filler), and error (short message, no stack traces).

## Styling

- Tailwind v4 utilities with design tokens from `@theme`. No raw hex values in components.
- No inline styles except for values computed at runtime.
- Mobile-first. Must work at 360, 768, 1024, and 1440px widths with no horizontal scroll.

## Media and fonts

- Fonts loaded with `next/font`; no layout shift.
- Images through `next/image` with explicit `width`/`height` or `sizes`. `priority` only on the hero's largest image.
- Google Maps embed is lazy-loaded and has a `title` attribute.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, logical heading order.
- All interactive elements reachable and operable by keyboard, with a visible focus style.
- Mobile menu and modals trap focus, close on Escape, and return focus on close.
- Meaningful `alt` text; decorative images use `alt=""`.
- Form fields have visible labels and errors linked via `aria-describedby`.
- Color is never the only signal (status badges include text).

## SEO

- `metadata` / `generateMetadata` per route with unique title and description.
- Open Graph image and canonical URL.
- `AutoRepair` (schema.org) JSON-LD on public pages, built from database values — never hardcoded.
- `sitemap.ts` and `robots.ts`; admin and customer areas are `noindex` and excluded from the sitemap.

## Rendering user content

- Never use `dangerouslySetInnerHTML` with unsanitized content. CMS rich text is sanitized server-side (see `roles/05-security.md`).
- Chat messages render as plain text.
