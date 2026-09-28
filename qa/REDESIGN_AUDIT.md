# Money Saving System — redesign and verification

## Scope and preservation

The full user brief and all five uploaded images were reviewed before editing. The repository already contained uncommitted edits to the homepage, checkout, FAQ, footer and package files, plus product JPGs. Those were treated as existing user work. The homepage was redesigned as requested; unrelated existing files were not reset.

This is the existing Next.js 14 App Router application. No replacement application, checkout, database or download system was introduced. No dependencies were added by this redesign. There is no custom Vercel configuration in the project; the existing Next.js deployment structure is retained.

Protected files were verified unchanged against Git: `app/admin`, `components/admin`, `app/api`, `models`, `lib/dbConnect.ts`, `lib/sendProductEmail.ts`, `lib/metaPixel.ts`, and `next.config.mjs`.

## Audit map

| Area | Existing implementation | Treatment |
| --- | --- | --- |
| Customer page | `app/page.tsx` | New storefront component and scoped stylesheet |
| Legal/support routes | `/terms`, `/privacy`, `/refund`, `/contact` | Preserved and linked in footer |
| Admin UI | `/admin`, `/admin/login`, `components/admin` | Unchanged |
| Product settings | `Setting` model, `/api/admin/settings` | Existing price and delivery URL connection retained |
| Price | `basePrice`, currently ₹199 in inspected settings | Offer and checkout use configured price; no invented discount |
| Checkout | `components/CheckoutSection.tsx` | Existing handler retained; presentation, labels and price-loading guard updated |
| Create order | `/api/create-order` | Unchanged; server-side settings price retained |
| Payment | Razorpay browser SDK and server SDK | Unchanged |
| Confirmation | `/api/confirm-payment` | Unchanged; pre-existing verification problems noted below |
| Webhook | `/api/webhook/razorpay` | Unchanged; HMAC behavior tested in isolation |
| Orders | `Order` model, admin orders API, in-memory fallback | Unchanged |
| Delivery | Configured Drive URL, confirmation response, `sendProductEmail` | Unchanged; no live email dispatched during regression tests |
| Database | Mongoose/MongoDB with in-memory fallback | Unchanged |
| Authentication | Existing PIN API and admin localStorage state | Unchanged |
| Analytics | VisitorTracker and `/api/track` | Preserved; demo submit excluded from checkout-click counting |
| Meta Pixel | Root layout + admin-configured Pixel ID + existing events | Preserved; invalid current ID warning documented |
| Environment | MongoDB, Razorpay and SMTP variable names inspected | No secrets printed, changed or copied into new files |

## Delivered customer experience

- Cinematic salary-day hero with no purchase CTA or product in the opening scene.
- Sticky scroll-controlled expense story, interpolated balance and sequential expense reveals. ₹50,000 − ₹12,000 − ₹6,800 − ₹4,500 − ₹8,000 − ₹13,400 = ₹5,300.
- Same illustrative protagonist across salary, reflection and habit scenes.
- Two sourced editorial quotes with explicit no-endorsement statements.
- Ivory goal breakdown using 98 days and ₹1,020.41 per day.
- Actual uploaded dashboard, with rounded annotations and an accessible full-size preview dialog.
- Frontend savings demo with inclusive calendar-day calculations, invalid input feedback, completed-goal handling, and a separate ₹1,000/₹600 carry-forward illustration.
- Habit timeline, the three real uploaded product previews, concise native disclosure FAQs, an editorial goals section, value explanation and final offer.
- Existing checkout restyled; misleading regular price, lifetime-access, five-second delivery and 30-day-guarantee claims removed from its presentation.
- Mobile-specific layouts, keyboard controls, focus states, native modal focus containment, lazy-loaded WebP images, smaller responsive lifestyle images, and reduced-motion CSS/scroll behavior.
- Customer metadata updated; metadata base supports deployment URL configuration.

## Verification performed

1. Production build passed, including type validation and all 17 generated pages. Homepage route is approximately 15 kB with approximately 102 kB first-load JavaScript. No new motion library is loaded by the storefront.
2. `node node_modules/typescript/bin/tsc --noEmit` passed.
3. `node qa/verify.cjs`: 15 isolated regression checks passed. These run the actual savings calculations, backend route handlers and checkout component with stubbed database, gateway and email adapters.
4. Regression coverage includes expense arithmetic/interpolation; 98-day calculation; opening savings; past/invalid dates; leap days; completed goals; partial/full/missed savings; server-controlled purchase amount; confirmation and failure records; delivery response; email adapter call; invalid/valid webhook signatures; actual checkout SDK configuration; failure handling; success receipt/download and Meta event hooks.
5. Browser checks covered desktop, tablet and mobile layouts (including 1440, 1280, 768 and 390 widths), mobile menu, demo invalid/completed inputs, ₹600 → ₹400 → ₹1,400 carry-forward, all three product dialogs and Escape dismissal.
6. Actual scrolling changed the visible balance from ₹50,000 through intermediate values to ₹5,300. Section-link navigation was checked in an isolated tab.
7. No horizontal overflow at checked tablet/mobile widths. Production browser checks found no broken loaded images.
8. All three product PNG copies were SHA-256 compared against the uploaded originals: exact matches.
9. Homepage, admin login, four legal/support routes and final lifestyle images returned HTTP 200. Admin orders API without credentials returned 401. Unauthenticated `/admin` redirected to the existing login.
10. Reduced-motion rules were reviewed in source: pinning is removed, content remains visible, animation/transitions are disabled and scroll calculations resolve to the completed story. The browser tool did not expose OS motion emulation, so this was not claimed as a browser-emulated pass.
11. `git diff --check` passed after whitespace cleanup.

The standalone lint command opens the repository's ESLint setup prompt because no lint configuration exists. No lint pass is claimed and no lint dependencies were installed.

## Pre-existing issues and limits

These were found during the audit, not introduced by the redesign. They were left untouched because the requested scope protects the existing backend/payment/admin logic.

- Checkout can simulate a successful purchase if the Razorpay SDK is absent.
- The confirmation endpoint trusts submitted payment status and does not verify the checkout signature or independently fetch captured-payment state before returning delivery access.
- Create-order can fall back to a local order and creates a `Captured` database record before payment completes.
- The webhook rejects an incorrect supplied HMAC but does not reject an absent signature.
- The public settings GET exposes the complete settings record (including admin PIN and product URL), and settings POST lacks an authorization check.
- Existing email copy and some legal/support copy still refer to previous products. These were not rewritten because the delivery service and business policy content were protected.
- The configured Meta Pixel emitted “Invalid PixelID: a non-numeric string.” Its configuration was preserved; event hooks passing isolated tests does not mean Meta received production events.
- A real, paid Razorpay transaction, real SMTP delivery and retrieval of the purchased Drive files were not performed. The successful regression run is an isolated workflow test, not proof of secure production payment verification or successful real-world delivery.

The storefront redesign is implemented and locally verified. A live payment/delivery sign-off still requires the existing payment verification issues to be addressed and an authorized real/test-mode gateway transaction to be completed. Nothing has been deployed or published by this task.

See `ASSET_SOURCES.md` for the image-generation prompt set, saved asset paths, original product sources and verified quote references.
