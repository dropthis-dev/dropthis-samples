// Publish-and-verify every sample in this repo.
//
//   DROPTHIS_API_KEY=sk_... npm run check
//
// For each sample folder: stage its content files (docs excluded), publish a
// NEW drop on first run or update-content the existing drop on re-runs (ids
// tracked in manifest.json — never duplicate drops), then fetch every served
// HTML page and assert it returns 200 with the expected <title>.
import { readdir, readFile, writeFile, mkdir, mkdtemp, rm, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { Dropthis } from '@dropthis/node';
import { pickEntry, isDocFile, planAction, extractTitle, verifyTargets, contentHash } from './lib.mjs';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const MANIFEST = join(ROOT, 'manifest.json');
const SKIP_DIRS = new Set(['scripts', 'tools', 'node_modules']);

async function discoverSamples() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const samples = [];
  for (const e of entries) {
    if (!e.isDirectory() || e.name.startsWith('.') || SKIP_DIRS.has(e.name)) continue;
    const files = await collectFiles(join(ROOT, e.name));
    if ([...files.keys()].some((f) => f.toLowerCase().endsWith('.html'))) {
      samples.push({ name: e.name, files });
    }
  }
  return samples.sort((a, b) => a.name.localeCompare(b.name));
}

async function collectFiles(dir, prefix = '') {
  const files = new Map();
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.name.startsWith('.') || isDocFile(e.name)) continue;
    if (e.isDirectory()) {
      for (const [p, c] of await collectFiles(join(dir, e.name), rel)) files.set(p, c);
    } else {
      files.set(rel, await readFile(join(dir, e.name)));
    }
  }
  return files;
}

async function stage(sample) {
  const dir = await mkdtemp(join(tmpdir(), `dropthis-${sample.name}-`));
  for (const [rel, content] of sample.files) {
    await mkdir(dirname(join(dir, rel)), { recursive: true });
    await writeFile(join(dir, rel), content);
  }
  return dir;
}

async function fetchOk(url, mustContain, attempts = 4) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const body = await res.text();
      if (res.ok && (!mustContain || body.includes(mustContain))) return { ok: true };
      if (i === attempts) {
        return { ok: false, detail: `status ${res.status}${mustContain && res.ok ? `, missing "${mustContain}"` : ''}` };
      }
    } catch (err) {
      if (i === attempts) return { ok: false, detail: String(err) };
    }
    await new Promise((r) => setTimeout(r, 1500 * i));
  }
}

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8').catch(() => '{}'));
const client = new Dropthis();
const samples = await discoverSamples();
const failures = [];

for (const sample of samples) {
  const htmls = [...sample.files.keys()].filter((f) => f.toLowerCase().endsWith('.html'));
  const entry = pickEntry(htmls.filter((f) => !f.includes('/'))) ?? htmls[0];
  const title = extractTitle(sample.files.get(entry).toString('utf8'));
  const hash = contentHash(sample.files);
  const plan = planAction(manifest[sample.name]);

  if (manifest[sample.name]?.hash === hash && manifest[sample.name]?.verified) {
    console.log(`• ${sample.name} — unchanged, skipping publish`);
  } else {
    const staged = await stage(sample);
    const opts = { title: title ?? sample.name, idempotencyKey: `${sample.name}-${hash.slice(0, 32)}` };
    const result =
      plan.action === 'publish'
        ? await client.drops.publish(staged, opts)
        : await client.drops.updateContent(plan.id, staged, opts);
    await rm(staged, { recursive: true, force: true });
    if (result.error) {
      failures.push(`${sample.name}: ${plan.action} failed — ${result.error.code} ${result.error.message}`);
      console.error(`✖ ${sample.name} — ${plan.action} failed: ${result.error.message}`);
      continue;
    }
    manifest[sample.name] = {
      id: result.data.id ?? plan.id,
      url: result.data.url ?? manifest[sample.name]?.url,
      title: title ?? sample.name,
      hash,
      verified: false,
    };
    console.log(`✔ ${sample.name} — ${plan.action} → ${manifest[sample.name].url}`);
  }

  const baseUrl = manifest[sample.name].url;
  let allOk = true;
  for (const target of verifyTargets(htmls, entry, baseUrl)) {
    const expectTitle = extractTitle(sample.files.get(target.path).toString('utf8'));
    const check = await fetchOk(target.url, expectTitle);
    if (!check.ok) {
      allOk = false;
      failures.push(`${sample.name}: ${target.url} — ${check.detail}`);
      console.error(`  ✖ ${target.url} — ${check.detail}`);
    } else {
      console.log(`  ✓ ${target.url}`);
    }
  }
  manifest[sample.name].verified = allOk;
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${samples.length} samples, ${failures.length} failures. Manifest written.`);
if (failures.length) {
  console.error(failures.map((f) => ` - ${f}`).join('\n'));
  process.exit(1);
}
