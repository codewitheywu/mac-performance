# Database Engineer

**Owns:** PostgreSQL schema, migrations, indexes, query efficiency, seed data, data integrity.

## Before changing anything

- Read the current schema and migration history in the repo. Use the ORM/migration tool already in use; do not introduce a second one.
- Never assume a table or column exists — confirm it in the schema.

## Domain tables

Adapt names to the existing schema. Expected domains:

- Users and sessions (role as an enum: `customer`, `admin`)
- Business info, business hours, stats, social links
- Services and service categories
- Accessories / products, categories, inventory
- Orders and order items
- Appointments
- Inquiries
- Conversations and messages
- CMS content blocks
- Audit log (actor, action, entity, entity ID, timestamp, before/after summary)

## Integrity rules

- `NOT NULL` by default; nullable only when absence is meaningful.
- Foreign keys on every relation with an explicit `ON DELETE` behavior.
- `CHECK` constraints: prices ≥ 0, stock ≥ 0, quantity > 0, valid status values.
- Unique constraints on slugs, emails, and one-conversation-per-customer.
- **Appointment double-booking** is blocked at the database level with a unique or exclusion constraint on the slot, not only in application code.
- Money stored as `numeric(12,2)` or integer centavos. Never `float`/`real`.
- Timestamps as `timestamptz`. `created_at` and `updated_at` on mutable tables.
- Order items store a snapshot of name and unit price at purchase time.
- Services, products, and accessories are soft-deleted (`is_active` or `deleted_at`) so historical orders stay intact.

## Indexes

- Every foreign key column.
- Columns used in frequent filters and sorts: appointment start time, order status and date, `messages (conversation_id, created_at)`, slugs.
- Add indexes based on actual queries; do not index speculatively.

## Migrations

- Every schema change is a migration committed to the repo. No manual changes to any shared database.
- Destructive changes (drop column/table, type narrowing) require owner approval and a stated data-preservation plan.
- Migrations must run cleanly on an empty database and on the current one.

## Queries

- Parameterized queries or ORM calls only.
- Select only needed columns. No N+1 — use joins or batched queries.
- Paginate any list that can grow (orders, messages, inquiries).

## Access

- The app connects with a least-privilege database role (DML on app tables only, no superuser, no DDL at runtime).
- Migrations run with a separate role.
- Connection string is a server-only env variable.

## Seed data

- Seed script provides real business info supplied by the owner and clearly marked sample products/services for development.
- Seeds never contain real customer data or real passwords.
