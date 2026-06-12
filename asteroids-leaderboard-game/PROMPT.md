# Prompt — Local Asteroids

Reconstructed prompt for [`index.html`](./index.html) — the original wasn't
preserved, so this prompt is written to replicate the sample.

---

Create a single self-contained HTML file: a classic Asteroids clone called
"Local Asteroids" with a persistent local leaderboard.

Gameplay:
- Canvas-based ship with rotation, thrust, and inertia (arrow keys + space to shoot).
- Asteroids split into smaller pieces when shot; waves get harder.
- Collision ends the run; 3 lives.
- Run the game loop on requestAnimationFrame.

Leaderboard:
- After game over, let the player enter a name and store the score in
  localStorage under an app-specific key (`local-asteroids-leaderboard-v1`).
- Show a top-10 leaderboard on the start and game-over screens.

Style: minimal vector look — white outlines on near-black, retro arcade HUD.

Technical: one HTML file, embedded CSS/JS, no external dependencies, works by
opening directly in a browser, mobile-friendly fallback controls.
