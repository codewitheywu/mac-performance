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
Customer area and `/admin` area: structure lives in the repo; inspect `app/` before adding routes.

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
