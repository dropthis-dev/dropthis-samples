# For AI agents

This repo contains ready-to-publish samples for [dropthis](https://dropthis.app) —
the publish layer between AI and the internet. You give it content, it gives you
a permanent public URL. No git, no build step, no config.

Follow this file top-to-bottom to publish your first drop.

## 1. Get authenticated

Everything needs a dropthis API key (`sk_` prefix). Resolution order: explicit
flag/option → `DROPTHIS_API_KEY` env var → stored login.

If the user already has a key, set it:

```bash
export DROPTHIS_API_KEY=sk_...
```

If not, log in via email OTP (CLI):

1. Ask the user for their email address.
2. `dropthis login request --email <their-email>` — sends a one-time code.
3. Ask the user for the code from their inbox.
4. `dropthis login verify --email <their-email> --otp <code>`
5. Confirm: `dropthis whoami --json`

## 2. Publish your first drop

Install the CLI if missing (`dropthis --version` to check):

```bash
npm install -g @dropthis/cli
```

Publish a sample from this repo and get a URL back:

```bash
dropthis ./frogger/publish-frog.html --url
```

That's it — the printed URL is live. Directories work too (`dropthis ./shine-brown-deck --url`
publishes the whole folder as one drop), and so does your own generated content:

```bash
echo "<h1>Hello from my agent</h1>" | dropthis --content-type text/html --path index.html --url
```

Always pass `--url` (URL only) or `--json` (full response) — the CLI never
prompts when stdin is not a TTY.

## 3. The one rule that prevents duplicate drops

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
