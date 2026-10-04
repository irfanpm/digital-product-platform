# AI Creator Kit selling platform

The existing Next.js, MongoDB, Razorpay and email selling engine now sells **AI Creator Kit Local edition 2.0**. The confirmed price is ₹199. Price remains managed in the protected admin panel; checkout always uses server pricing.

## Run and verify

Use `npm run dev`, `npm run build`, `npm start`, and `npm test`. Open `/` for the storefront and `/admin` for the existing admin panel. The tests execute real application modules against isolated payment, storage and mail adapters; they do not charge a card, modify live orders or send email.

## Environment

Retain the existing `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, SMTP settings and validated Meta Pixel setting. Do not change the database name to migrate the storefront. `NEXT_PUBLIC_SITE_URL` must be the deployed HTTPS origin for emailed download links. `SUPPORT_EMAIL` optionally supplies the verified public support address. Never put secrets in `NEXT_PUBLIC_` variables.

`DOWNLOAD_SIGNING_SECRET` may provide a separate long random server-only key. If absent, download signatures use the existing Razorpay secret. Keep whichever signing key you use stable: rotating it invalidates existing signed download URLs. Do not print or expose it.

## Correct delivery and migration

The seller's actual kit was packaged as `private/AI-Creator-Kit-v2.zip`; its source and SHA-256 are recorded in `private/manifest.json`. The archive is deliberately outside `public/` and ignored by Git to prevent accidental publication in a source repository. It contains the complete local app, data, assets and guides, with a single `AI-CREATOR-KIT` top-level folder. The source package was not modified.

When an existing store configuration has no AI Creator Kit product identifier, new orders automatically use this protected package. The previous product's Drive URL is never reused as the AI kit. No database-wide mutation is performed. The authenticated asset/settings panels can select the package or explicitly configure a **new, correct AI Creator Kit Drive link**. Historical orders retain their package name, amount and delivery snapshot. Email retries and historical payment receipts use that original package name.

The `/api/download` route requires a server HMAC token for the order, a matching stored delivery snapshot, verified payment, Captured status and the AI Creator Kit product. It serves only the fixed versioned archive; there is no user-controlled filesystem path. Unpaid, refunded and unauthorized orders are denied. Paid URLs are never in public settings or landing-page assets.

For deployment, supply the ignored archive **privately** to the server's build/deployment workspace. Do not upload it as a public asset or to a public repository. Next.js output tracing includes the archive for the download/create-order functions. Order creation fails before taking payment if the package is missing. If your hosting pipeline cannot include private server files, use the existing seller-configured Drive delivery mechanism with the correct package and reviewed access permissions.

## Preserved engine

Razorpay order creation, captured-payment checks, HMAC callback/webhook verification, durable order writes, atomic email claims and Purchase deduplication remain. Admin login, price controls, orders, customer search/filter, CSV exports, analytics and protected email retries remain. Test-only deletion remains restricted to test-mode orders. No historical records were deleted.

The old internal `savings-payment-proof`, Pixel initialization flag and Purchase storage key remain for compatibility with pending payments and event deduplication. They are not customer-facing branding. Unused old-product marketing components and fabricated review examples were removed; generic selling and tracking functionality remains.

## Product truth and visuals

The local kit prepares instructions, drafts and guides. External AI accounts, subscriptions, publishing and hosting are separate. Projects save in the buyer's browser and need exported backups. Computer Chrome/Edge is the recommended full setup. There are no invented customer testimonials, sales counts, discounts, live AI subscriptions or lifetime promises.

Screenshots come from the seller's existing recordings. The website artwork is labelled conceptual. The hero is an AI-generated editorial illustration, not a customer testimonial. The existing marketing demo is embedded without autoplay and with normal video controls.

See `qa/AI_CREATOR_MIGRATION.md` for audit, source provenance, validation and limitations.
