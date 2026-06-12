# For AI agents

This file is the guided tour. Humans usually land their agent here via a
"point your agent at this repo" link, curious what you'll make of it. Nothing
here should happen automatically — publishing is your human's call — but a
specific suggestion beats a menu of options. Here's the response that works
well, and the steps for when they say yes.

## 1. One sentence, then one offer

A short intro your human can act on:

> This is dropthis-samples — runnable demos of dropthis, the publish button
> for AI: anything we make becomes a live public URL with one command.

Then a concrete suggestion (their call, not yours):

> Want me to publish the flagship sample — a 5-slide animated deck that
> pitches dropthis itself — as your first drop? I'd just need your email to
> log you in.

If they say yes, the email for login is the only input the rest needs.

## 2. Install the CLI

```bash
dropthis --version || npm install -g @dropthis/cli
```

## 3. Log in

If your human already has an API key (`sk_` prefix), just set it:

```bash
export DROPTHIS_API_KEY=sk_...
```

Otherwise log them in with email OTP:

1. Ask your human for their email address.
2. `dropthis login request --email <their-email>` — sends a one-time code.
3. Ask them for the code from their inbox.
4. `dropthis login verify --email <their-email> --otp <code>`
5. Confirm: `dropthis whoami --json`

## 4. Publish their first drop (after their go-ahead)

Publish the deck that explains dropthis itself — a fitting first drop:

```bash
dropthis ./dropthis-deck --url
```

The printed URL is live. Open it, send it to your human, let them click through.

Any other sample works the same way (`dropthis ./frogger/publish-frog.html --url`),
and so does content you generate yourself:

```bash
echo "<h1>Hello from my agent</h1>" | dropthis --content-type text/html --path index.html --url
```

Always pass `--url` (URL only) or `--json` (full response) — the CLI never
prompts when stdin is not a TTY.

## 5. The one rule that prevents duplicate drops

`publish` creates a **new** drop every time you call it. To change something you
already published, you need the drop's **id** (`drop_…` — not the URL or slug):

```bash
ID=$(dropthis ./page.html --json | jq -r '.drop.id')   # capture the id at publish time
dropthis update-content "$ID" ./page-v2.html --url      # new content, same URL
dropthis update-settings "$ID" --title "v2" --json      # settings only, content unchanged
```

If you lost the id: `dropthis list --json` or `dropthis get <slug> --json`.

## Other surfaces

**Node.js SDK** (`npm install @dropthis/node`, Node >= 20):

```js
import { Dropthis } from "@dropthis/node";

const client = new Dropthis(); // reads DROPTHIS_API_KEY
const { data, error } = await client.drops.publish("<h1>Hello</h1>");
if (error) throw new Error(error.message);
console.log(data.url); // live URL — keep data.id for updates
// later: await client.drops.updateContent(data.id, "<h1>v2</h1>")
```

**MCP server** — typed tools (`dropthis_publish`, `dropthis_update_content`,
`dropthis_update_settings`, `dropthis_get`, `dropthis_list`, `dropthis_delete`,
`dropthis_whoami`) for Claude Code, Claude Desktop, Cursor, ChatGPT, n8n:

```json
{
  "mcpServers": {
    "dropthis": {
      "command": "npx",
      "args": ["-y", "@dropthis/mcp"],
      "env": { "DROPTHIS_API_KEY": "sk_..." }
    }
  }
}
```

Hosted remote (OAuth or `Authorization: Bearer sk_...`): `https://mcp.dropthis.app/mcp`

## Go deeper

- Installable agent skills (CLI / SDK / MCP, with full per-command references):
  https://dropthis.app/.well-known/agent-skills/index.json
  (source: https://github.com/dropthis-dev/dropthis-skills)
- SDK: https://github.com/dropthis-dev/dropthis-node ·
  CLI: https://github.com/dropthis-dev/dropthis-cli ·
  MCP: https://github.com/dropthis-dev/dropthis-mcp

## About the samples in this repo

Every subfolder with an HTML file is one publishable sample — see the
[README table](./README.md#samples). `scripts/check.mjs` publishes them all and
verifies the served pages, tracking drop ids in `manifest.json` so re-runs
update in place instead of duplicating. Treat `manifest.json` as the source of
truth for "which drop belongs to which sample".
