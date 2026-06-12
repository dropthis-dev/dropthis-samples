# Prompt — Field Notes (Pexels photo wall)

The prompt used to generate [`index.html`](./index.html), kept so an agent
can replicate (or remix) it.

---

Create a beautiful single-file HTML photo gallery called "Field Notes" using
images from the Pexels CDN.

- Masonry layout via CSS columns (4 columns collapsing responsively), ~18
  photos. Build each image URL from a list of Pexels photo ids using the
  pattern `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=<width>`
  — w=600 thumbnails in the wall, w=1600 in the lightbox. Verify every id
  resolves (HTTP 200) before shipping.
- Native `<dialog>` lightbox with blurred backdrop: click a photo to zoom,
  click or Esc to close, caption linking back to the photo's Pexels page.
- Lazy-load images; reveal each tile with a small staggered translateY +
  opacity transition driven by IntersectionObserver (strong ease-out,
  `prefers-reduced-motion` falls back to opacity only).
- Editorial dark look: warm near-black background, serif typography with an
  italic accent word, hover captions over a bottom gradient.
- Credit Pexels in the header and footer; no frameworks, no build step —
  one self-contained HTML file.
