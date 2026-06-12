# Prompt — SunGlow Naturals performance report

Reconstructed prompt for [`index.html`](./index.html) — the original wasn't
preserved, so this prompt is written to replicate the sample.

---

Create a monthly e-commerce performance report as one self-contained HTML
page for a fictional beauty brand, "SunGlow Naturals" (May 2026).

Content — 11 sections with realistic but fictional numbers:
executive summary, growth highlights, revenue performance, Shopify insights,
marketing performance (Meta campaigns + ROAS), funnel analysis, geographic
performance, customer segmentation, and recommendations. Charts rendered
with inline JS (no chart library), KPI cards, and trend indicators.

AI presenter: add an optional narrated walkthrough — a floating presenter
widget with play/pause, per-section narration text, an audio visualizer, and
section auto-scroll. Use the ElevenLabs TTS API when an API key constant is
provided, and fall back to the browser's speechSynthesis when it's empty.
Ship with the key constant EMPTY — never embed a real API key in the file.

Design: investor-grade dashboard aesthetic — dark sidebar navigation, clean
cards, restrained color, print-friendly. Embedded CSS/JS only, responsive.
