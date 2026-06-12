import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickEntry, isDocFile, planAction, extractTitle, verifyTargets } from './lib.mjs';

test('pickEntry prefers index.html', () => {
  assert.equal(pickEntry(['app.html', 'index.html', 'other.html']), 'index.html');
});

test('pickEntry falls back to a lone html file', () => {
  assert.equal(pickEntry(['publish-frog.html']), 'publish-frog.html');
});

test('pickEntry returns null when ambiguous', () => {
  assert.equal(pickEntry(['a.html', 'b.html']), null);
});

test('pickEntry returns null when no html', () => {
  assert.equal(pickEntry(['notes.txt']), null);
});

test('isDocFile excludes repo docs and checks, keeps content', () => {
  assert.equal(isDocFile('README.md'), true);
  assert.equal(isDocFile('PROMPT.md'), true);
  assert.equal(isDocFile('brief.md'), true);
  assert.equal(isDocFile('checks.test.mjs'), true);
  assert.equal(isDocFile('.DS_Store'), true);
  assert.equal(isDocFile('index.html'), false);
  assert.equal(isDocFile('app.js'), false);
  assert.equal(isDocFile('content.json'), false);
  assert.equal(isDocFile('assets/slide-1.svg'), false);
});

test('planAction publishes when no manifest entry', () => {
  assert.deepEqual(planAction(undefined), { action: 'publish' });
});

test('planAction updates content when manifest has an id', () => {
  assert.deepEqual(planAction({ id: 'drop_abc', url: 'https://x' }), {
    action: 'updateContent',
    id: 'drop_abc',
  });
});

test('extractTitle reads the title text', () => {
  assert.equal(extractTitle('<html><title>Local Asteroids</title></html>'), 'Local Asteroids');
});

test('extractTitle decodes basic entities and trims', () => {
  assert.equal(
    extractTitle('<title> &quot;MCP is dead.&quot; &amp; more </title>'),
    '"MCP is dead." & more'
  );
});

test('extractTitle returns null when missing', () => {
  assert.equal(extractTitle('<html><body>hi</body></html>'), null);
});

test('verifyTargets maps entry to base url and other html files to subpaths', () => {
  const targets = verifyTargets(['index.html', 'mcp-is-dead.html'], 'index.html', 'https://dropthis.app/d/x');
  assert.deepEqual(targets, [
    { path: 'index.html', url: 'https://dropthis.app/d/x' },
    { path: 'mcp-is-dead.html', url: 'https://dropthis.app/d/x/mcp-is-dead.html' },
  ]);
});

test('verifyTargets tolerates trailing slash on base url', () => {
  const targets = verifyTargets(['index.html', 'a.html'], 'index.html', 'https://e.com/d/x/');
  assert.deepEqual(targets, [
    { path: 'index.html', url: 'https://e.com/d/x/' },
    { path: 'a.html', url: 'https://e.com/d/x/a.html' },
  ]);
});

test('contentHash is stable regardless of file order', async () => {
  const { contentHash } = await import('./lib.mjs');
  const a = contentHash(new Map([['a.html', Buffer.from('x')], ['b.css', Buffer.from('y')]]));
  const b = contentHash(new Map([['b.css', Buffer.from('y')], ['a.html', Buffer.from('x')]]));
  assert.equal(a, b);
  assert.match(a, /^[a-f0-9]{64}$/);
});

test('contentHash changes when content changes', async () => {
  const { contentHash } = await import('./lib.mjs');
  const a = contentHash(new Map([['a.html', Buffer.from('x')]]));
  const b = contentHash(new Map([['a.html', Buffer.from('z')]]));
  assert.notEqual(a, b);
});
