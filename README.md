# dropthis-samples

Small, self-contained samples people can run — built with / for
[dropthis](https://dropthis.app), the publish layer between AI and the internet.

No servers. No build step. Each sample is its own subfolder containing the
runnable artifact plus the exact prompt used to generate it.

## Samples

| Folder | What it is |
| --- | --- |
| [`frogger/`](./frogger) | **Publish Frog** — an 8-bit Frogger parody about the pain of getting an AI-generated file online. Single HTML file, no dependencies. |

## Layout

Each sample lives in its own subfolder:

```
<sample>/
  <artifact>        the runnable file(s) — open directly in a browser
  PROMPT.md         the exact prompt used to generate it, for reference
```

## Running

Every sample is self-contained — open the artifact directly in a browser, or
drop it online with dropthis.
