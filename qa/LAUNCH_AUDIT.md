# Money Saving System launch audit — 30 September 2026

**Prepared locally for review. Not deployed. Paid traffic is not ready until the live checks below pass.** No real payment was charged, no credentials were rotated, and no Meta Ads settings were changed. Keep the existing campaign paused.

## Confirmed bugs and fixes

| Area | Confirmed bug | Result and files |
| --- | --- | --- |
| Pixel | Raw database ID included whitespace; dummy fallback and unescaped script interpolation | Numeric-only normalization for database/environment IDs; dummy removed; init and PageView guarded once. `app/layout.tsx`, `lib/serverSafety.ts`, `lib/metaPixel.ts`, `models/Setting.ts` |
| Order creation | Fake/local orders and fabricated payment IDs; new orders marked Captured; storage not awaited | Real Razorpay order required; server price and INR; Created status; immutable buyer, price, key mode and delivery snapshots; majority/journaled writes awaited. `app/api/create-order/route.ts`, `models/Order.ts` |
| Confirmation | Browser-controlled amount/status/customer; no signature verification | Stored-order HMAC verified with constant-time comparison; payment fetched from Razorpay and checked for captured status, order association, exact amount, INR and refunds; existing order only, no upsert. `app/api/confirm-payment/route.ts`, `lib/payments.ts` |
| Checkout/Purchase | Simulated SDK success; Purchase before verification; success even when confirmation failed | Actual IDs/signature sent; verification failure retains a retry proof in this tab and prevents another order; downloads only after backend verification; server-confirmed numeric amount; stable transaction eventID; durable one-time event claim plus browser duplicate guard; test payments excluded. `components/CheckoutSection.tsx`, `lib/metaPixel.ts` |
| Webhook | Missing secret/signature accepted; arbitrary paid-order upsert; no delivery | Raw bytes checked with configured webhook secret; fetched payment checked against existing order; same atomic capture/delivery service as checkout; can fulfil without browser callback. `app/api/webhook/razorpay/route.ts`, `lib/payments.ts` |
| Settings/admin | Public PIN/download URLs; unauthenticated writes; default PIN and memory fallback | Public `/api/settings` has only price, currency and product name. Sensitive reads/writes, order ledger, retry and login require existing credentials and database availability. PIN never returned. Storefront/admin callers updated. `app/api/settings/route.ts`, `app/api/admin/settings/route.ts`, `app/api/admin/verify-pin/route.ts`, admin order routes, ProductSettings/ProductUploadManager and storefront price callers |
| Fulfilment | Unrelated planner copy; missing SMTP reported success; unawaited sends; fake resend action | Correct bundle copy; actual SMTP required; Pending/Sending/Sent/Failed/Unknown recorded; atomic email claim prevents normal callback/webhook duplicates; failed delivery has protected retry; verified download survives a recorded SMTP failure. `lib/sendProductEmail.ts`, `lib/payments.ts`, `app/api/admin/orders/retry-email/route.ts`, `components/admin/BuyersTable.tsx` |
| Dashboard | Unpaid/test/old unverified orders counted as live revenue; destructive clear removed verification history | Revenue counts verified live captures only; historical unverified Captured records show Needs reconciliation. Clear deletes test-mode orders only, preserving live history. `app/api/admin/orders/route.ts`, `app/admin/page.tsx` |

The cinematic design and actual product preview assets were preserved. Existing real Drive settings were not replaced or modified. The database connection warning no longer prints raw connection errors (`lib/dbConnect.ts`).

## Verification

Run `npm test`: **56 isolated checks** — 7 existing savings/calculator checks, 43 payment/service checks and 6 actual checkout/layout checks. Tests execute the real TypeScript route/service/component code with mocked gateway, atomic storage and email adapters; they do not contact production services.

Covered: ₹199 Created order and configured pricing; unavailable credentials/gateway/database and failed durable writes; correct captured payment; missing/forged signature; wrong order, amount or currency; authorized/failed/cancelled/refunded payments; absent/failing SDK; no success after backend failure; actual checkout proof payload; repeated callback/webhook and concurrent races; one Purchase claim; browser refresh duplicate guard; test-payment exclusion; SMTP failure, safe retry and uncertain-delivery blocking; unauthenticated admin reads/writes/retry; public whitelist; PIN preservation; Pixel injection rejection and single init/PageView; correct email copy and escaping.

**Final checks passed:** TypeScript without emission, all 56 isolated tests, and `npm run build` including type validation and production page generation. The Windows sandbox initially blocked compiler workers; the final build passed with local worker permission. This did not deploy.

Read-only checks against the configured database confirmed a ₹199 base price, a Pixel setting that trims to the expected ID, an existing PIN and an existing real Drive link. The configured Drive ZIP was fetched without login and its archive directory contains 1 Excel workbook and 3 PDFs, including challenge and guide documents. No private link or credential value is included here. This confirms ZIP accessibility and named deliverables; it does not prove a real paid browser session, workbook calculation correctness, SMTP inbox receipt, Razorpay live capture or Meta event receipt.

No Conversions API implementation was found in this repository. This change does not add or claim CAPI.

## Operational limits to review

- SMTP cannot guarantee exactly-once mail across a process crash after acceptance but before the database records Sent. Sending/Unknown are deliberately not automatically retried. Reconcile with SMTP provider logs before any manual recovery. Definite Failed deliveries can use the admin Retry email action. Normal callback/webhook retries do not send duplicate mail.
- The browser Purchase claim is at-most-once. A blocked Pixel or a lost response after claiming can lose an event; it cannot guarantee Meta receipt. A webhook fulfils the order but does not invent a browser Purchase or CAPI event.
- Old orders created by the previous insecure code are not trustworthy proof of payment. They remain preserved and need reconciliation against Razorpay before being treated as paid. New verification does not automatically grant access to legacy fake records.
- The previously public admin PIN must be treated as exposed. Rotate it with explicit approval after deploying the protected endpoints; this work has not changed it. Review whether exposed Drive links need replacement and existing buyer access preserved. No Razorpay/SMTP secret exposure was established by the settings response; inspect history/logs before deciding whether those credentials require rotation.
- Authentication preserves the existing bearer-PIN system. It does not introduce a new login/session system or multi-factor authentication.

## Environment variable names

Required for payments/storage/email: `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.

Optional: `NEXT_PUBLIC_META_PIXEL_ID` (validated fallback when no valid database Pixel is available), `NEXT_PUBLIC_SITE_URL` (canonical URL). `VERCEL_PROJECT_PRODUCTION_URL` is platform-provided when used for canonical URL fallback. No browser Razorpay key fallback is needed; the server returns its public key ID for the created order. Secret values must never use a `NEXT_PUBLIC_` name.

## Deployment steps — only after approval

1. Review the local diff and this report. Back up the production database and reconcile legacy Captured records against Razorpay; do not relabel them from browser-supplied data.
2. Verify the production environment variable names above in Vercel. Confirm the existing database settings contain ₹199 and the real complete Drive bundle. Preserve existing values. Use the expected numeric Pixel ID 1661133268328575 in settings or the validated environment fallback.
3. Run `npm test`, `npx tsc --noEmit` and `npm run build` on the approved revision. Confirm the existing unique `orderId` index is present before accepting payments.
4. First deploy an isolated Vercel preview using a separate test database, Razorpay test credentials and a test webhook secret. Use a controlled email recipient. Test checkout, failure/cancellation, callback retries, browser-closed webhook fulfilment and failed-email retry. Test-mode Purchase must remain absent from the production dataset.
5. After preview passes and production deployment is approved, publish the approved revision to the existing Vercel project. Configure the production Razorpay `payment.captured` webhook at `https://digital-product-platform-ten.vercel.app/api/webhook/razorpay` with the matching production webhook secret. Confirm Razorpay capture configuration and webhook retry delivery in its dashboard.
6. Test live public `/api/settings`: only storefront fields. Unauthenticated `/api/admin/settings` GET/POST and admin order routes must return 401. Sign in through the existing admin UI and verify settings load/save without exposing or silently changing the PIN. Execute the approved credential rotation plan; no credentials are rotated by deployment automatically.
7. Only with separate explicit approval, perform one controlled ₹199 live payment. Confirm Razorpay capture, stored verified order, buyer download of all three deliverables and actual inbox delivery. Check duplicate callback/webhook and refresh behavior. Do not use a Razorpay test payment to fabricate a production Purchase.
8. Complete Meta verification below. Keep the campaign paused until all live acceptance checks pass. If rollback is needed, pause checkout rather than restoring the known insecure payment-confirmation/settings endpoints.

## Meta Test Events acceptance steps

1. Open Events Manager, select the dataset/Pixel matching the expected ID, then Test Events. In its website-testing area, enter the production site URL and use Open Website. Meta screen labels may vary; this audit did not inspect your signed-in Events Manager.
2. In a fresh browser session, check one Pixel initialization and one PageView per document load. Navigate landing-page anchors: no extra PageView should be created. A full refresh may legitimately generate a new PageView.
3. Enter valid buyer details and open a real configured checkout. In a live checkout session, expect one InitiateCheckout with numeric value 199, INR and Money Saving System. Cancellation/failure must produce no Purchase and no paid download access.
4. After separately approving a controlled live ₹199 payment, expect Purchase only after backend verification, value 199 (number), currency INR, product Money Saving System and a transaction-based eventID. Check the network request and Test Events receipt; browser code execution alone is not proof of Meta receipt.
5. Repeated callback, refresh and revisit must not add another Purchase for that transaction. Confirm no invalid Pixel-ID console error and no duplicate Pixel installation from another tool/tag manager.
6. Razorpay test-mode payments intentionally produce no production Purchase. To inspect a test-mode purchase payload use the isolated tests here; do not weaken that guard or manually send a dummy production Purchase. If no live payment is approved, live Purchase receipt remains unverified.

Razorpay's official [Standard Checkout integration steps](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/) distinguish created/attempted orders from captured payments and require server-side order and signature verification. Meta's documentation was rate-limited during this audit; the Test Events steps are an acceptance procedure for your account, not a claim that account testing occurred.
