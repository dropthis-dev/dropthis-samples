# dropthis-samples

Small, self-contained samples people can run — built with / for
[dropthis](https://dropthis.app), the publish layer between AI and the internet.

No servers. No build step. Each sample is its own subfolder containing the
runnable artifact plus the exact prompt used to generate it.

## Samples

| Folder | What it is |
| --- | --- |
| [`frogger/`](./frogger) | **Publish Frog** — an 8-bit Frogger parody about the pain of getting an AI-generated file online. Single HTML file, no dependencies. |
| [`triumphant-crab/`](./triumphant-crab) | **Triumphant Crab** — tap like crazy to extend a crab's claws and lift a fish skyward as gravity fights back, with a Mortal Kombat-style UI. AI-generated art (Nano Banana 2 / Gemini 3 Pro Image) + procedural telescoping claws. |

## Layout

Each sample lives in its own subfolder:

```
<sample>/
  <artifact>        the runnable file(s) — open directly in a browser
  assets/           any AI-generated images the sample uses (optional)
  PROMPT.md         the prompt(s) used to generate it, for reference
```

Image-generation / asset helpers live in [`tools/`](./tools). They read an API
key from an untracked `~/.dropthis_secrets.env` and never embed secrets.

## Running

Every sample is self-contained — open the artifact directly in a browser, or
drop it online with dropthis.
