# Codebase Overview

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS + Radix UI components
- MongoDB via Mongoose
- Authentication with NextAuth credentials provider

## High-level structure
- `src/app/(store)` contains customer-facing pages and layout.
- `src/app/(dashboard)/admin` contains admin dashboard pages and management UI.
- `src/app/api` contains REST-like route handlers for products, coupons, categories, settings, wishlists, and customer reviews.
- `src/models` defines MongoDB schemas/models.
- `src/lib` contains shared DB/auth/admin/cloudinary utilities.

## Data model highlights
- Product model supports multiple variants with per-variant pricing/images/inventory fields.
- Store settings model holds homepage configuration (hero banners, product groups, browse categories, testimonials).
- User model stores role and verification state for auth + admin authorization.

## Notes from review
- Root metadata still contains starter placeholder values ("ShadCN Tutorial", default description).
- `README.md` is still default create-next-app documentation.
- Admin layout has client-side guard logic commented out; API routes enforce admin checks server-side with `requireAdmin()`.
