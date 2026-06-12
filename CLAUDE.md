# CLAUDE.md

Read [AGENTS.md](./AGENTS.md) first — it's the guided tour of this repo: a
one-sentence intro to give your human, then the steps to publish the flagship
`dropthis-deck/` as their first drop once they say yes.

Repo facts: every folder with an HTML file is one publishable sample
(README.md + PROMPT.md inside each). `manifest.json` maps samples to live
drop ids/URLs — `npm run check` republishes changed samples in place and
never duplicates drops. Unit tests: `npm test`.
