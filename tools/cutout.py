#!/usr/bin/env python3
"""Turn a generated image (with a checkerboard or solid background) into a
transparent RGBA PNG.

Usage:
  cutout.py <in> <out> checker     # flood-fill the gray transparency checker
  cutout.py <in> <out> magenta     # chroma-key a solid magenta background
"""
import sys
from collections import deque, Counter
from PIL import Image


def load(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    return im, w, h, list(im.getdata())


def near_gray(p, tol=14):
    r, g, b = p
    return max(r, g, b) - min(r, g, b) < tol


def is_magenta(p, d=55):
    r, g, b = p
    return r > 100 and b > 100 and (r + b) / 2 - g > d


def cutout_checker(px, w, h):
    # detect dominant gray luminances on the border
    c = Counter()
    for x in range(0, w, 2):
        for y in (0, 1, h - 2, h - 1):
            if near_gray(px[y * w + x]):
                c[sum(px[y * w + x]) // 3] += 1
    for y in range(0, h, 2):
        for x in (0, 1, w - 2, w - 1):
            if near_gray(px[y * w + x]):
                c[sum(px[y * w + x]) // 3] += 1
    levels = [lv for lv, _ in c.most_common(6)]
    TOL = 30

    def is_bg(i):
        p = px[i]
        if not near_gray(p, 16):
            return False
        l = sum(p) // 3
        return any(abs(l - L) <= TOL for L in levels)

    # Global key: the subject is fully saturated (orange crab), so any pixel that
    # matches the gray checker is background — including pockets enclosed by the
    # claws/legs that a border flood-fill would never reach.
    alpha = bytearray([255]) * (w * h)
    for i in range(w * h):
        if is_bg(i):
            alpha[i] = 0
    return alpha


def cutout_magenta(px, w, h):
    alpha = bytearray([255]) * (w * h)
    for i in range(w * h):
        if is_magenta(px[i]):
            alpha[i] = 0
    return alpha


def clean_halo(px, alpha, w, h, passes, fringe_test):
    """Remove a thin background-tinted fringe around the subject."""
    for _ in range(passes):
        kill = []
        for i in range(w * h):
            if alpha[i] == 0:
                continue
            if not fringe_test(px[i]):
                continue
            x, y = i % w, i // w
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h and alpha[ny * w + nx] == 0:
                    kill.append(i)
                    break
        for i in kill:
            alpha[i] = 0


def main():
    src, out, mode = sys.argv[1], sys.argv[2], sys.argv[3]
    im, w, h, px = load(src)
    if mode == "checker":
        alpha = cutout_checker(px, w, h)
        clean_halo(px, alpha, w, h, 1, lambda p: near_gray(p, 22))
    elif mode == "magenta":
        alpha = cutout_magenta(px, w, h)
        clean_halo(px, alpha, w, h, 2, lambda p: is_magenta(p, 22))
    else:
        raise SystemExit("mode must be checker|magenta")

    out_im = Image.new("RGBA", (w, h))
    out_im.putdata([(px[i][0], px[i][1], px[i][2], alpha[i]) for i in range(w * h)])
    out_im.save(out)
    removed = sum(1 for a in alpha if a == 0) * 100 // (w * h)
    print(f"{out}: {w}x{h}, removed {removed}% as transparent")


if __name__ == "__main__":
    main()
