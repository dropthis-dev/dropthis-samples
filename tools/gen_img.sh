#!/usr/bin/env bash
# Generate an image with Google's Nano Banana 2 (Gemini 3 Pro Image).
# Usage: gen_img.sh "<prompt>" <out.png> [aspectRatio]
# Reads NANOBANANA_API_KEY from ~/.dropthis_secrets.env (never committed).
set -euo pipefail
source "$HOME/.dropthis_secrets.env"

PROMPT="${1:?prompt required}"
OUT="${2:?output path required}"
AR="${3:-1:1}"
MODEL="${MODEL:-gemini-3-pro-image}"

body=$(jq -n --arg p "$PROMPT" --arg ar "$AR" \
  '{contents:[{parts:[{text:$p}]}],
    generationConfig:{responseModalities:["IMAGE"], imageConfig:{aspectRatio:$ar}}}')

resp=$(curl -sS -X POST \
  -H "x-goog-api-key: $NANOBANANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$body" \
  "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent")

data=$(printf '%s' "$resp" | jq -r '.candidates[0].content.parts[]? | select(.inlineData) | .inlineData.data' | head -1)

if [ -z "$data" ] || [ "$data" = "null" ]; then
  echo "NO IMAGE returned. Response head:" >&2
  printf '%s' "$resp" | head -c 1000 >&2; echo >&2
  exit 1
fi

printf '%s' "$data" | python3 -c "import sys,base64; open('$OUT','wb').write(base64.b64decode(sys.stdin.read()))"
echo "wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
