# Prompt — Ship Fast or Die (the Marc Lou deck)

The brief used to generate [`marclou-deck.html`](./marclou-deck.html), kept for reference.

---

Build a single self-contained HTML slide deck about indie hacker **Marc Lou**,
based on his "I made $87,507 in May 2026" monthly-income post.

Format:
- One HTML file, no build step, no external deps except Google Fonts and the
  provided `assets/marc-avatar.png`.
- Keyboard-driven: `←` / `→` / space to navigate, `F` for fullscreen,
  `P` to pause autoplay, deep-link `#n` per slide, touch-swipe on mobile.
- **Autoplay**: if the viewer doesn't navigate within 3 seconds, advance to the
  next slide automatically; any manual input resets the timer; stops on the last
  slide.
- Staggered reveal animations on every slide; a deck progress bar + slide counter.

Slides:
1. **Cover** — Marc's pirate avatar, an animated count-up to `$87,507`, falling
   coin/gem particles, "Ship fast or die".
2. **Marc Lou** — who he is: French solo founder who ships tiny SaaS fast and in
   public, posts his revenue, 0 employees.
3. **The post** — the source tweet recreated in CSS as an authentic X card
   (avatar, verified tick, the full income list, real products in blue,
   Twitter/YouTube channels in grey, Subscribe → https://x.com/marclou).
4–15. **One slide per real product**, each recreating that product's actual brand
   (colours, type, a faux-browser mini-UI) with an MRR badge:
   TrustMRR · DataFast · Ship or Die · CodeFast · ShipFast · SuperShrimp ·
   Indie Page · ByeDispute · HabitsGarden · BioAge · WorkbookPDF · PoopUp.
16. **The empire, by MRR** — animated horizontal leaderboard of all 12 products,
   scaled by monthly revenue, totalling $87,507.
17. **Closing** — Marc's real "ship fast" lines cycling one at a time
   ("Just Ship It.", "Ship the 24-hour version of your idea.", "Ship, learn,
   repeat.", …), ending on "One artifact in. One URL out. — dropthis.app".

Design direction:
- A "treasure / founder" deck shell (near-black, warm gold = MRR) that each
  product slide overrides with its own brand theme.
- Promote MRR everywhere: the cover total, a per-slide MRR badge, the leaderboard.
- Fonts: Bricolage Grotesque (display), Hanken Grotesk (body), JetBrains Mono
  (numbers). Match each product's real look (researched from their live sites).

Save as `marclou-deck.html`.
