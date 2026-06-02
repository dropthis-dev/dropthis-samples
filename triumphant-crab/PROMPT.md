# Prompt — Triumphant Crab

The prompts behind [`triumphant-crab.html`](./triumphant-crab.html), kept for reference.
Inspired by the "crab triumphantly holding a fish" meme.

## Game concept

> Make a single self-contained HTML browser game: a tiny crab on a beach holds a
> fish in the air. Tapping the screen extends the crab's claws to push the fish
> higher, but gravity fights back — and the higher the fish goes, the stronger
> gravity gets. Tap like crazy to get the fish as high as possible. Show height
> and best, with a quick restart. The crab's claws should visibly *extend*
> (telescope) as the fish rises. Background, crab and fish should be
> AI-generated images.

Follow-up:

> Overlay Mortal Kombat-style UI graphics inside the game.

## Mechanics

- Physics run in normalized "height fraction" space `f ∈ [0,1]`, so feel is
  identical on every screen size. Each tap adds an upward impulse; effective
  gravity is `G0 + KG·f`, so it ramps hard with altitude. Tuned by simulation:
  ~6 taps/s ≈ 29 m, ~10/s ≈ 69 m, ~14/s ≈ the (near-impossible) ceiling.
- A run ends when the fish sinks back to the crab. Score = peak height reached.
- The telescoping claw-arms are drawn procedurally on a canvas, anchored to the
  crab image's detected claw-tip points; the background, crab and fish are
  AI-generated PNGs (see below).
- Mortal Kombat overlay: CRAB-vs-GRAVITY health bars, a round timer/score disc,
  gold name plates, and dramatic callouts ("FIGHT!", "BRUTAL!", "FINISH HIM!",
  "FLAWLESS VICTORY", "GRAVITY WINS").

## Image generation (Nano Banana 2 / Gemini 3 Pro Image)

Generated with Google's `gemini-3-pro-image` via the Gemini API (helper:
[`../tools/gen_img.sh`](../tools/gen_img.sh)). The model draws subjects on a
transparency *checkerboard* (or a solid color) rather than a real alpha channel,
so backgrounds are removed afterwards with [`../tools/cutout.py`](../tools/cutout.py)
(flood-filled gray checker for the saturated crab; magenta chroma-key for the
silvery fish).

**Background** (`9:16`):
> A peaceful sunny beach scene for a mobile game background, vertical composition.
> The upper two-thirds is soft, heavily blurred turquoise-teal sea meeting a pale
> blue sky (bokeh, shallow depth of field, dreamy). The lower third is a smooth
> pale golden sand dune in sharp focus. Bright natural midday light, warm, clean,
> cheerful. Photographic and realistic. No animals, no people, no text. Leave the
> sky area open and uncluttered.

**Crab** (`3:4`, transparent):
> A small bright orange beach crab, photographed straight from the front, standing
> on its eight legs, both front claws raised straight up high above its body as if
> proudly holding something overhead — a triumphant, cute pose. Glossy wet
> reddish-orange shell. Isolated on a transparent background, full body centered.

**Fish** (`3:2`, solid magenta for clean keying):
> A single small silver forage fish (sardine/anchovy), perfect side profile,
> horizontal, head pointing to the right. Shiny mirror-silver body with a blue-grey
> back and white belly, wet glistening scales, round eye, small fins, forked tail.
> Photographed against a completely solid flat pure magenta background.
