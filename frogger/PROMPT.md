# Prompt — Publish Frog

The exact prompt used to generate [`publish-frog.html`](./publish-frog.html), kept for reference.

---

Create a single self-contained HTML browser game called "Publish Frog".

The game should be an 8-bit retro Frogger-inspired game, but parodying the pain of publishing AI-generated artifacts online.

Core concept:
The player is a tiny pixel frog carrying an AI-generated file. The goal is to cross the dangerous internet and reach a glowing URL portal at the top of the screen.

The metaphor:
Getting a simple AI-generated HTML file online should be easy, but instead the frog has to survive GitHub traffic, deployment trucks, DNS rivers, config files, build errors, corporate firewalls, and AI slop.

Game layout:
Make it one vertical screen, classic arcade style.

Rows from bottom to top:
1. Localhost swamp — safe starting area
2. GitHub traffic — moving repo trucks and pull request cars
3. Config chaos — moving config files, package.json blocks, .env traps
4. Deploy lane — Vercel/Netlify-style deploy trucks and build-error signs
5. DNS river — floating DNS logs/turtles the frog can ride
6. Firewall lane — moving firewall blocks, lock icons, 403 signs
7. AI slop storm — bouncing/generated blob obstacles
8. URL portal — glowing finish zone

Gameplay:
- Player moves one tile at a time.
- Controls: arrow keys and WASD.
- Add mobile touch controls with four buttons.
- If the frog hits an obstacle, restart from the bottom and lose one life.
- If the frog falls into the DNS river, lose one life.
- Give the player 3 lives.
- Add score and timer.
- Add quick restart.
- Make the game fast to understand and fun to replay.
- The game should be playable in under 60 seconds.

Visual style:
- 8-bit pixel art
- bright retro arcade colors
- CRT scanlines overlay
- pixel font style using CSS only
- chunky UI
- animated title screen
- cute frog sprite made with CSS/HTML/Canvas
- funny obstacle labels like "build failed", "404", "CORS", "DNS?", "repo", "config", "npm err", "AI slop"
- no external images or external assets

Audio:
- Use Web Audio API only.
- Add simple 8-bit sound effects:
  - move
  - hit
  - win
  - game start
- Add mute button.
- No external audio files.

Screens:
1. Title screen:
   Title: "Publish Frog"
   Subtitle: "Get your AI artifact across the internet."
   Button: "Start dropping"

2. Game over screen:
   Text: "Your artifact died on localhost."
   Button: "Try again"

3. Win screen:
   Text:
   "Published!"
   "One artifact in. One URL out."
   "dropthis.app"

Add a small line under the win text:
"No repo. No config. No deploy pipeline."

Technical requirements:
- Single HTML file only.
- Embedded CSS and JavaScript.
- No external dependencies.
- No build step.
- Works by opening the HTML file directly in a browser.
- Mobile responsive.
- Smooth 60fps if possible.
- Keep the code clean and readable.
- Use Canvas for the game area.
- Add comments where useful.

Polish:
- Make it feel like a tiny finished arcade game, not a rough demo.
- Add subtle screen shake on hit.
- Add particle/confetti burst on win.
- Add blinking portal animation.
- Add high score using localStorage.
- Add a small "Published with dropthis" badge in the corner of the game UI.

Save the finished file as:

publish-frog.html
