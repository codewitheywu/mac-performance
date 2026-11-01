# Senior Back End Developer

**Owns:** Server Actions, Route Handlers, auth flow, business logic, realtime chat, third-party integrations.
**Security controls** referenced here are defined in `roles/05-security.md`; this file defines how features behave.

## Request handling pattern

Every Server Action and Route Handler follows this order:

1. Authenticate (get session).
2. Authorize (role check + ownership check for the specific record).
3. Validate input with a schema (e.g. Zod) — parse, don't trust.
4. Execute business logic, using a transaction when more than one write must succeed together.
5. Revalidate affected cache tags.
6. Return a typed result: `{ ok: true, data }` or `{ ok: false, error: { code, message } }`. Route Handlers also set the correct HTTP status.

Errors are logged server-side with context; the client receives a generic message and a code.

## Modules

**Inquiries / contact form**
- Public, so rate-limited and spam-protected.
- Stored in DB; admin is notified in the admin panel.

**Appointments**
- All times stored as `timestamptz`, displayed in Asia/Manila.
- Availability derives from business hours in the DB.
- Double-booking prevented by a DB constraint (see `roles/04-database.md`); the action handles the constraint error and returns a clear "slot taken" result.
- Customers can view and cancel only their own appointments; admin can manage all.

**Online shop**
- Prices are read from the DB at checkout. Never trust a price, total, or discount sent by the client.
- Stock is decremented inside the same transaction that creates the order, with a row lock or conditional update so stock cannot go negative.
- Order status changes are admin-only and recorded in the audit log.
- If online payment is added: confirm payment only from the provider's signed webhook, never from a client redirect.

**CMS / business info**
- Admin-only. Every save validates input, sanitizes rich text, writes an audit log entry, and revalidates the matching cache tags.

**Real-time chat**
- One conversation per customer; admin can access all conversations.
- Authorization is checked on connect/subscribe and on every send. The conversation ID from the client is never trusted on its own — the server verifies the user belongs to it.
- Messages are persisted before being broadcast. History loads from the DB with pagination.
- Message length limit and per-user send rate limit.
- Clients reconnect automatically and re-fetch missed messages since the last received ID.

**Google rating**
- Fetched server-side via the Places API using a server-only key.
- Cached (12–24h). On API failure, serve the last cached value; if none, hide the rating element. Never fall back to a hardcoded number.
- Displayed with Google attribution as required by the Places API terms.
