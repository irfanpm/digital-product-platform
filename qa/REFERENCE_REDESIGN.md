# Reference design audit — 4 October 2026

## Presentation and behavior map (before editing)

- Next.js 14 App Router / React / TypeScript. `/` renders `SavingsStorefront`; only this component and the homepage-scoped `app/savings.css` are redesign targets.
- Active product: Money Saving System. Existing assets and storefront copy describe 12 printable challenges, the Smart Excel Savings Tracker and a step-by-step guide. Legacy career/planner components are not rendered on the active homepage.
- Product descriptions and preview images are currently local, not admin-managed. Admin manages `Setting.basePrice`, delivery URLs, optional extra product, Pixel and PIN. Continue using the existing public `/api/settings` for prices. Do not create a second product data source.
- Checkout: `CheckoutSection` owns customer form validation, server-created Razorpay orders, gateway callbacks, verification retry, receipt and verified download. Preserve its state and handlers; presentation copy may be revised.
- APIs: settings, create-order, confirm-payment, Razorpay webhook, visitor tracking, admin settings/orders/retry-email/verify-pin. Models: Setting, Order, Analytics. Services: database, server safety, payment verification, email fulfilment. Protected from edits.
- Authentication: existing admin bearer PIN and localStorage login. Customer purchase does not require an account. Preserve `/admin`, `/admin/login`, all legal/support pages and their URLs.
- Analytics: `VisitorTracker` observes `#checkout-section` anchors and checkout submission. Root layout initializes the configured Pixel; checkout emits existing events. New purchase links must retain the same checkout anchor.
- Interactive presentation: scroll-driven expense illustration, calculator, carry-forward preview, goal selector, native FAQ disclosures and native modal previews. Retain their calculations and interactions.
- Existing responsive CSS and reduced-motion handling are homepage-scoped. New tokens and responsive layouts must stay within `.savings-site` so admin and other routes remain visually unchanged.

## Issues found before editing

- README and the terms/refund/contact pages contain some old product descriptions/policies. These predate this redesign and are outside a design-only update; preserve their routes and do not invent business terms.
- The existing standalone lint script requires ESLint setup; no existing configuration was found. Use the production build, TypeScript and existing regression suite.
- Existing launch audit documents remaining live gateway, inbox-delivery and Meta receipt checks. An isolated regression pass does not complete those external checks.

## Verification and delivered changes

### Files changed

- `components/SavingsStorefront.tsx`: reference-inspired hero, product reveal CTA, recognition cards, four-step journey, before/system/after comparison, audience and trust cards, closing CTA; a shared presentation hook reads the original public settings endpoint for hero/offer/closing prices. The original calculator, carry-forward form, goal selector and full-size preview dialog remain. The salary story is available in a native disclosure, including its scroll-driven expense balance. Existing anchor IDs remain available, including `home`, `expenses`, `system`, `how-it-works`, `inside`, `demo`, `offer`, `questions` and `checkout-section`.
- `app/savings.css`: storefront-only tokens and responsive styling with deep greens, cream sections, bright green CTAs, editorial headings, rounded cards and restrained borders/shadows. Existing reduced-motion support remains. No new dependencies, fonts or images were added.
- `components/CheckoutSection.tsx`: one explanatory sentence updated. All state, pricing fetch, payment/verification handlers and tracking are unchanged; compared against the original source before the JSX return.
- This report and `reference-redesign-desktop.jpg`, `reference-redesign-mobile.jpg`, `reference-redesign-fullpage.jpg`: local review documentation/screenshots.

### Functionality preserved

Admin-managed pricing and delivery URLs still use the original settings/model/APIs. All purchase links use `#checkout-section`, preserving the original visitor CTA observer. The original checkout renders the purchase form, validation, verified receipt, download link and retry state. Backend, models, admin UI, authentication, fulfilment/email, visitor tracking, Pixel initialization and SEO metadata have no diff. No product features, bonuses, testimonials, discounts or scarcity claims were invented. No production settings or product files were changed.

### Regression checks

- `npm test`: **56 passed** (7 savings calculations, 43 payment/service/admin/email/Pixel checks, 6 checkout/layout checks). Tests use isolated gateway/storage/email adapters, including server-managed alternate pricing, verification failure/retry, verified download, webhook fulfilment and authentication guards.
- TypeScript without emission passed. Production build passed, including type validation and all 18 page-generation steps. Homepage: 17.3 kB route / 105 kB first-load JavaScript. The sandbox initially blocked worker processes; build succeeded with worker permission.
- `git diff --check` passed. Protected source areas had no diff. Checkout handlers/state were compared against HEAD and are exactly preserved after normalizing line endings.
- Browser checks at 320, 390, 768, 1280 and 1440 pixels found no horizontal overflow. At 320, visible section/card/purchase-row bounding boxes also fit the viewport. Screenshots were reviewed at phone, tablet and desktop sizes.
- Current settings price **₹199** loaded in hero, offer, closing CTA and checkout. Public settings response is still whitelisted; original admin settings behavior is covered by the isolated suite. No live admin price write was performed.
- Mobile navigation opens and closes after following a link. Product-section and checkout anchors work.
- All three real product previews open/close; Escape dismisses the modal. No broken loaded images or browser console errors/warnings were found during preview checks.
- Calculator: zero goal produces validation feedback; already-saved equal to goal produces ₹0 remaining, ₹0 daily and 100% completion. Normal values restored afterwards.
- Carry-forward preview: ₹600 recorded gives ₹400 unpaid and ₹1,400 next requirement. Original calculations are unchanged.
- Goal selector updates the selected goal and explanatory text. FAQ disclosures expose the correct answers.
- An empty checkout submission triggers native required-field validation and leaves the purchase form intact. No real order/payment was submitted in the browser. Actual SDK configuration, proof payload, verified success/download and failed-payment behavior pass the existing isolated tests.
- Expanded salary story starts at ₹50,000 and reaches ₹5,300 when scrolling the expense sequence. It remains optional and was closed after checking.
- Homepage, admin login and all four legal/support routes returned HTTP 200. Unauthenticated admin settings/orders returned HTTP 401. Existing visitor/CTA requests returned HTTP 200 during the browser checks; live Meta receipt is not claimed.

### Existing issues and limits

- README and some policy/support text still describe older products. They remain outside this design-only update. Product policy changes require business decisions, rather than invented terms.
- Existing Mongoose calls emitted a deprecation warning for the `new` option while recording visits. No backend changes were made to resolve it.
- Standalone lint setup remains unconfigured. The production build and TypeScript checks passed; no standalone lint pass is claimed.
- Real paid transactions, gateway capture, inbox delivery, purchased-file retrieval and Meta event receipt were not performed. Those require the external acceptance checks described in the existing launch audit. Admin sign-in with the real PIN and live settings writes were not performed; authentication/settings behavior is regression-tested in isolation.
- No deployment or publishing was performed.
