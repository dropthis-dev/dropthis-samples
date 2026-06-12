# Prompt — Shine Brown TikTok swipe deck

Reconstructed prompt for this folder — the original brief is preserved in
[`brief.md`](./brief.md); this prompt describes how to replicate the build.

---

Build a mobile-first TikTok-style swipe deck for BYROKKO Shine Brown,
driving shoppers to https://www.byrokko.com/global/products/shine-brown —
as a small data-driven package, not a single file:

- `index.html` — minimal shell that loads the deck
- `app.js` — swipe/render logic (touch + click navigation between slides)
- `content.json` — slide copy, validated by a `content.schema.json`
- `blueprint.json` — deck blueprint metadata (`tiktok@1.0.0`)
- `theme.json` + `theme.css` / `styles.css` — brand tokens separated from layout
- `assets/` — slide artwork (campaign photography + SVG placeholders)

5 slides: hero hook → skin results → product jars → clean formula → CTA
("Shop Shine Brown"). Vertical 9:16-first layout that still works on
desktop. The deck must render entirely from `content.json` so new campaigns
are content-only changes.
