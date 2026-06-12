import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');

assert.match(html, /<canvas id="game"/, 'renders the game canvas');
assert.match(html, /const STORAGE_KEY = 'local-asteroids-leaderboard-v1'/, 'uses an app-specific leaderboard key');
assert.match(html, /function addScore\(name, score\)/, 'defines score insertion');
assert.match(html, /localStorage\.setItem\(STORAGE_KEY/, 'persists leaderboard records locally');
assert.match(html, /function startGame\(\)/, 'defines game start flow');
assert.match(html, /function checkBulletHits\(\)/, 'defines bullet collision handling');
assert.match(html, /function endGame\(\)/, 'defines game over flow');
assert.match(html, /requestAnimationFrame\(loop\)/, 'runs gameplay on an animation loop');

console.log('Asteroids static checks passed');
