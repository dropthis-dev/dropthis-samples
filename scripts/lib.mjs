// Pure logic for scripts/check.mjs — kept side-effect free so it can be unit
// tested with node:test (see lib.test.mjs).
import { createHash } from 'node:crypto';

export function pickEntry(files) {
  const htmls = files.filter((f) => f.toLowerCase().endsWith('.html'));
  if (htmls.includes('index.html')) return 'index.html';
  if (htmls.length === 1) return htmls[0];
  return null;
}

const DOC_FILES = new Set(['README.md', 'PROMPT.md', 'brief.md', '.DS_Store']);

export function isDocFile(name) {
  return DOC_FILES.has(name) || name.endsWith('.test.mjs');
}

export function planAction(manifestEntry) {
  if (manifestEntry?.id) return { action: 'updateContent', id: manifestEntry.id };
  return { action: 'publish' };
}

export function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (!m) return null;
  return m[1]
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .trim();
}

export function contentHash(filesByPath) {
  const hash = createHash('sha256');
  for (const path of [...filesByPath.keys()].sort()) {
    hash.update(path);
    hash.update('\0');
    hash.update(filesByPath.get(path));
    hash.update('\0');
  }
  return hash.digest('hex');
}

export function verifyTargets(htmlPaths, entry, baseUrl) {
  const base = baseUrl.replace(/\/+$/, '');
  return htmlPaths.map((path) => ({
    path,
    url: path === entry ? baseUrl : `${base}/${path}`,
  }));
}
