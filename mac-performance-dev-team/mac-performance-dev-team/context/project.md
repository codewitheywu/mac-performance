# Project Context

Facts below are confirmed by the owner. Treat anything not listed here as unknown: check the repo or ask.

## Business

- **Name:** MAC Performance
- **Type:** Automotive accessories and repair shop
- **Location:** 131 Gordon Ave, Olongapo City, 2200 Zambales, Philippines
- **Timezone:** Asia/Manila (UTC+8, no DST). All scheduling logic uses this zone.
- **Currency:** PHP (₱)

The address above is for your reference only. In the UI it is rendered from the database like every other business detail.

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS v4
- PostgreSQL
- Exact versions, ORM, auth library, and realtime transport: **read from `package.json`**. Do not assume.

## Routes

Public: `/`, `/about`, `/services`, `/accessories`, `/contacts`
Account: `/login`, `/signup` (`noindex`, not in the sitemap)
Customer: `/appointments` (`noindex`, not in the sitemap), in the `(account)` route group
`/admin` area: structure lives in the repo; inspect `app/` before adding routes.

## Users and permissions

| Role | Can |
|---|---|
| Guest | View public pages, submit inquiry/contact form |
| `customer` | Everything a guest can, plus: own profile, own appointments, own orders, own chat thread with admin |
| `admin` | Manage inquiries, online shop (products, stock, orders), appointments, CMS content, business info; read and reply to all customer chat threads |

There are exactly two account roles. Do not add others without approval.

## Hard rules

1. **No hardcoded business data.** Phone, email, address, hours, stats, services, accessories, prices, and social links come from the database, editable via the admin CMS.
2. **Live rating.** The customer rating comes from the shop's Google Maps listing via the Places API, fetched server-side and cached. Never display a fixed rating number.
3. **Chat scope.** Real-time chat is customer ↔ admin only. Customers can never see or message other customers.
4. **Layout anchor.** The NAP (name, address, phone) section with the Google Maps embed sits immediately before the footer on public pages that use it.

## Current status: sample site

This build is a sample to show the owner. There is no database yet, so rules 1 and 2 are met by stopgaps until the project is approved:

- Business data lives in `src/lib/shop-data.ts`, copied from the shop sign, macperformance.ph and the Google listing.
- The rating and reviews live in `src/lib/google-snapshot.ts`, dated November 2026. A Places API key replaces them with live data automatically.
- `/login` and `/signup` are front end only and send nothing, and each page says so. Log in goes straight to `/appointments` with no credentials, by the project lead's decision. Sign up validates in the browser, then does the same. Real accounts need PostgreSQL, an auth library and a Server Action that re-runs `validateAuthForm` from `src/lib/auth-rules.ts`, per `roles/05-security.md`.
- `/appointments` has no gate, because there are no sessions, so it must never show real customer data until accounts exist. Bookings stay in the visitor's browser (`src/lib/appointment-store.ts`), the page says so, and the shop does not receive them. One slot an hour is a stand-in until the owner sets booking rules. `src/lib/appointment-rules.ts` is ready to re-run on the server.
- `/appointments` is the customer home: appointments first, then the accessories shop. It has no NAP block; the footer carries the shop details. The cart is kept in the browser (`src/lib/cart-store.ts`) and holds slugs and quantities only; prices and stock always come from the catalog. An order can be added to a booked visit. A real shop needs products, prices, stock and orders in PostgreSQL and must pass the Shop checks in `roles/06-qa.md`.
- **Demo data, by the project lead's decision (November 2026).** Service prices, durations and descriptions, the product catalog with prices and stock, and the demo customer "Juan dela Cruz" with past visits are invented. They all live in `src/lib/demo-data.ts`, reach the UI only through `src/lib/content.ts`, and are labelled as demo wherever they show. Delete that file when the database exists. Real business details stay in `shop-data.ts`. The rating and reviews are never invented.
