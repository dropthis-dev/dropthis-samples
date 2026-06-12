# dropthis-samples

Small, self-contained samples people can run — built with / for
[dropthis](https://dropthis.app), the publish layer between AI and the internet.
One API call in, one URL out.

No servers. No build step. Each sample is its own subfolder containing the
runnable artifact plus a short README (and, where preserved, the exact prompt
used to generate it).

**🤖 If you are an AI agent:** read [`AGENTS.md`](./AGENTS.md) — it walks you
through publishing your first drop from this repo in under a minute.

## Samples

| Folder | What it is |
| --- | --- |
| [`frogger/`](./frogger) | **Publish Frog** — an 8-bit Frogger parody about the pain of getting an AI-generated file online. Single HTML file, no dependencies. |
| [`triumphant-crab/`](./triumphant-crab) | **Triumphant Crab** — tap like crazy to extend a crab's claws and lift a fish skyward as gravity fights back, with a Mortal Kombat-style UI. AI-generated art + procedural telescoping claws. |
| [`marclou-deck/`](./marclou-deck) | **Ship Fast or Die** — a keyboard-driven, autoplaying HTML slide deck on Marc Lou's $87,507 month, where each slide recreates one of his products' real brand. |
| [`ai-slide-demo/`](./ai-slide-demo) | **AI-Native Slide Systems** — two keyboard-driven HTML slide decks, including the "MCP is dead." opinion deck. |
| [`asteroids-leaderboard-game/`](./asteroids-leaderboard-game) | **Local Asteroids** — canvas Asteroids clone with a persistent localStorage leaderboard. |
| [`shadow-dodger-game/`](./shadow-dodger-game) | **Shadow Dodger** — meme-based arcade game with generated Web Audio chiptune. |
| [`calculator-spa/`](./calculator-spa) | **SPA Calculator** — minimal single-file calculator app. |
| [`multi-step-form/`](./multi-step-form) | **Get Early Access** — multi-step signup form with progress bar and validation. |
| [`research-report-demo/`](./research-report-demo) | **From Frog Image to Weekly Ritual** — an AI-written research report as a polished, shareable page. |
| [`ecommerce-growth-report/`](./ecommerce-growth-report) | **SunGlow Naturals** — AI-generated e-commerce performance report (fictional brand and numbers). |
| [`shine-brown-landing/`](./shine-brown-landing) | **Shine Brown landing page** — agent-generated product landing page for a real product (BYROKKO). |
| [`shine-brown-slider/`](./shine-brown-slider) | **Shine Brown Chocolate slider** — promo page with an interactive before/after slider. |
| [`shine-brown-deck/`](./shine-brown-deck) | **Shine Brown TikTok deck** — mobile-first swipe deck as a multi-file package (HTML + JS + JSON content + assets). |

## Layout

Each sample lives in its own subfolder:

```
<sample>/
  index.html | <name>.html   the runnable artifact — open directly in a browser
  assets/                    images or other static assets (optional)
  README.md                  what it is and how to run it
  PROMPT.md                  the prompt(s) used to generate it (when preserved)
  checks.test.mjs            static content checks, run with `node checks.test.mjs` (optional)
```

Image-generation / asset helpers live in [`tools/`](./tools). They read an API
key from an untracked `~/.dropthis_secrets.env` and never embed secrets.

## Running

Every sample is self-contained — open the artifact directly in a browser, or
publish it online with dropthis:

```bash
npm install -g @dropthis/cli
dropthis ./frogger/publish-frog.html --url
```

## Publish-and-verify all samples

`scripts/check.mjs` publishes every sample to dropthis and verifies the served
pages. It records each sample's drop id and URL in `manifest.json`; re-runs
update the existing drops in place (`update-content`) instead of creating
duplicates.

```bash
export DROPTHIS_API_KEY=sk_...
npm install
npm run check
```

Run the unit tests with `npm test`.
