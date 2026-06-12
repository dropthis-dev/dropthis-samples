# Prompt — Shadow Dodger

Reconstructed prompt for [`index.html`](./index.html) — the original wasn't
preserved, so this prompt is written to replicate the sample.

---

Create a single self-contained HTML browser game called "Shadow Dodger",
based on the meme "Them: How's your mental health? / My mental health:"
showing a tiny human shadow chilling under a bridge's cast shadow.

Concept:
- The player IS the small shadow figure on a sunlit road under a bridge.
- 5 traffic lanes of vehicles cast moving shadows; the player dodges them by
  staying in shaded safe zones.
- Draw only the SHADOWS of the bridge and scenery (not the structures
  themselves) — the bridge's cast shadow extends to the bottom of the
  viewport; fence shadows stay translucent so the player shadow reads clearly.
- Keep the playable shadow small relative to the scene, like the meme.
- Show the meme caption in the UI.

Gameplay: lane-based vehicle spawning, rectangle collision detection, pointer
/ touch movement plus arrow keys, escalating difficulty, score by survival time.

Audio: generated original 8-bit chiptune loop via Web Audio (melody, bass,
drum blips scheduled in code — no audio files), with start/stop controls.

Technical: one HTML file, canvas rendering, embedded CSS/JS, no external
dependencies, mobile responsive.
