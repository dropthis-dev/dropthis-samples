---
blueprint: tiktok@1.0.0
brand: nike
locale: en-US
customized: false
---
# Shine Brown — TikTok swipe deck

**Goal:** drive shoppers to the Byrokko Shine Brown product page. Mobile / social-ad traffic.
**CTA:** "Shop Shine Brown" → https://www.byrokko.com/global/products/shine-brown

## Product (source of truth)
Source: https://www.byrokko.com/global/products/shine-brown (fetched 2026-06-09, **confidence: medium** — page rendered as marketing summary, no DOM/CSS access).
- Self-tanning cream for a deep, natural-looking tan; works on all skin types; fast results.
- Social proof: 4M+ products sold, 2M+ satisfied customers, 400,000+ reviews/comments, 800K social followers.
- Claims: vegan, cruelty-free, EU-made, original formula.
- How-to steps: not published on page (omitted from deck rather than invented).

## Copy
Original marketing copy written for this campaign in the Nike brand voice (terse, imperative, motivational) — not lifted from the source page.

## Images (D19) — retrieved, confidence: high
Real Byrokko product/lifestyle photography pulled from the product page's Uploadcare CDN (`ucarecdn.com`), server-cropped to true 9:16 (`scale_crop/1080x1920/smart`) into `assets/campaign/`. Dark/mid-dark frames chosen so the blueprint's `.slide-copy` scrim keeps white headlines legible. Provenance (Uploadcare UUID → slot):
- slide-1-hero.jpg ← 7091d8a1 (bronzed model holding the jar, beach — also og:image source)
- slide-2-skin.jpg ← 6da8f5d7 (tanned legs + Shine Brown jar on a lounger)
- slide-3-jars.jpg ← 1fddf759 (Chocolate Bronze Shine Brown jars)
- slide-4-clean.jpg ← a445c45e (black Shine Brown tanning oil)
- slide-5-cta.jpg ← 153e78b2 (brown Shine Brown tanning oil)

These are Byrokko-owned brand assets reused to promote the same product. Swap freely if the brand supplies preferred hero shots.

## Caveats to confirm before launch
- **Brand mismatch (intentional):** built on the `nike` brand per request — Swoosh logo + #FA5400 orange accent + athletic voice on a tanning product. Swap to a Byrokko brand for a real launch.
- **Stock:** product showed "out of stock" at fetch time. The "Shop" CTA assumes it returns; switch to a notify/waitlist CTA if it stays out of stock.
- **Price:** not displayed on page; intentionally omitted from the deck.
- **OG image:** `meta.image` now points to a raster 9:16 hero (`slide-1-hero.jpg`). It works as a preview, but it's portrait — for link unfurls a dedicated 1200×630 landscape crop is ideal before paid distribution.
