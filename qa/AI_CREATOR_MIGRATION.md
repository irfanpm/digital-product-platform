# AI Creator Kit migration — 4 October 2026

## Audit before changes

- Existing Next.js App Router single-product store. Current homepage is a Money Saving System storefront; earlier career/planner components are not used by it.
- MongoDB `Setting` controls base price, delivery Drive URL, optional extra product, Pixel and bearer PIN. Price is confirmed by the user as **₹199**. Keep that field and existing admin pricing controls.
- Order creation snapshots buyer details, amount, key mode and delivery URL before payment. Verification checks Razorpay signatures and captured-payment state. Callback/webhook fulfilment uses atomic email claims. Keep those safeguards and stored historical orders.
- `/api/settings` exposes only storefront-safe fields. Protected admin settings/orders/login/retry APIs remain. Do not expose delivery URLs, PINs, private archive paths or credentials in public settings.
- Checkout is an in-page customer form with native validation, SDK launch, retry proof, server verification and confirmed access. Update branding and product data, retain the flow and duplicate-Purchase guards.
- Historical orders retain their stored package and delivery URL. Confirmation, receipt and email must use the stored order product so old customers are not given the new package accidentally.
- Current delivery configuration points to the old savings bundle. Activating a new name with that delivery URL would sell the wrong product. Prepare an explicit product configuration transition rather than silently reusing it.
- Actual local kit found at `D:\prompt soft\AI-CREATOR-KIT`: local edition 2.0, `START-HERE.html`, classic JS/CSS, local assets, guides and workflow data. README confirms no installation/server required; extract the full package and open START-HERE in Chrome or Edge. External tools need internet, their own accounts and may have separate charges.
- Source confirms website, posters/social/product images, Meta ad briefs, resumes, interviews, Lightroom guidance and business tools. This is guidance/instructions software, not an included AI service or automatic website publisher.
- Existing ad-work contains recorded product screens and a 31-second demonstration/ad with no price. Use real recording captures as proof. Website result artwork is conceptual and must be labeled.
- Browser security policy blocks direct local-file navigation. No workaround serving the paid kit publicly will be used. Existing recordings and source files support the product audit; direct browser QA of the kit itself is not claimed here.
- Existing support pages contain a previous-product email address, placeholder-looking phone/address and unsupported response-time claims. Use verified seller configuration rather than inventing new contacts or service promises.

## Pending input

The confirmed price is ₹199. The correct delivery package/source is being clarified. Customer checkout must not deliver the existing savings files as AI Creator Kit.

## Implementation and validation

To be completed after the migration.
