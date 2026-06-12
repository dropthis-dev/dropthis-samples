# Prompt — dropthis in six slides

The prompt used to generate [`index.html`](./index.html), kept so an agent
can replicate (or remix) it.

---

Create an amazing animated HTML slide deck that presents dropthis
(https://dropthis.app) in six slides. Design like crazy — this should look
like a $10k deck, not a template. Responsive, high-quality teaser.

Content arc:
1. Hook — "Your agent makes brilliant things." AI already generates the
   web's best pages, decks, games, reports.
2. Problem — "And they die on localhost." Publishing still demands 2006
   knowledge (DNS, buckets, builds, deploys); agents have none of it. Show a
   graveyard of struck-through filenames.
3. The move — "One command in. One URL out." An animated terminal types
   `dropthis ./page.html --url`, shows an upload status, then reveals the
   live URL. No git, no build step, no config.
4. Showcase — "Drop anything." Three image cards, each a screenshot of a
   real published drop linking to its live URL: a single-HTML analytics
   report, an arcade game, and a Pexels photo-wall gallery. Screenshot the
   actual samples headlessly for the card images (stored in `assets/`).
5. Surfaces — "Wherever your agent lives." Four cards: CLI, Node SDK, MCP
   server, agent skills — each with a one-line snippet.
6. CTA — "Point your agent here." Link to
   github.com/dropthis-dev/dropthis-samples and the line: say "read
   AGENTS.md and publish my first drop". Note that the deck is itself a drop.

Design direction:
- Dark, warm-stone editorial look using the dropthis brand palette:
  background #0c0a09, ink #fafaf9, accent #38bdf8.
- Typography: Newsreader (light, with italic accent words) for display,
  JetBrains Mono for terminal/labels. Huge clamp()-based type scale.
- Atmosphere: animated film grain overlay + a soft accent glow that drifts
  to a different corner on each slide.

Motion rules (Emil Kowalski's design-engineering principles):
- Strong custom easing — cubic-bezier(.23,1,.32,1) for entries; never
  ease-in; only animate transform/opacity/filter.
- Staggered slide entrances (50–80ms steps) from translateY + slight blur
  to mask the crossfade; exits faster than entries (~180ms).
- Never animate from scale(0); buttons scale(.985) on :active; gate hover
  effects behind `@media (hover:hover) and (pointer:fine)`.
- Full `prefers-reduced-motion` support (opacity-only, no movement).

Interaction: arrow keys / space / j / k, clickable progress dots, touch
swipe with velocity-based flick detection, slide counter, URL hash
deep-linking (#1–#5), keyboard hint that fades after first use.

Technical: one self-contained HTML file (Google Fonts allowed), no
frameworks, works opened directly in a browser, safe-area-inset padding,
100dvh layout.
