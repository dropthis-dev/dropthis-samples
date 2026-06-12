import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');

assert.match(html, /<canvas id="game"/, 'renders the game canvas');
assert.match(html, /Shadow Dodger/, 'names the game');
assert.match(html, /Them: How's your mental health\?/, 'keeps the meme caption');
assert.match(html, /const LANE_COUNT = 5/, 'uses five traffic lanes');
assert.match(html, /function startGame\(\)/, 'defines the start flow');
assert.match(html, /function spawnVehicle\(laneIndex/, 'defines lane-based vehicle spawning');
assert.match(html, /function getShadowHitbox\(\)/, 'defines shadow collision geometry');
assert.match(html, /const SHADOW_BODY_SCALE = 0\.42/, 'keeps the playable shadow small like the source meme');
assert.match(html, /function drawBridgeShadowOnly\(/, 'draws bridge shadow without drawing the actual bridge');
assert.match(html, /function drawBridgeCastShadowToBottom\(/, 'extends the bridge cast shadow to the bottom of the viewport');
assert.match(html, /const FENCE_SHADOW_ALPHA = 0\.26/, 'keeps fence shadows translucent so the human shadow stays visible');
assert.match(html, /function drawSmallShadowFigure\(/, 'draws a small human shadow near the center of the road');
assert.match(html, /function rectsOverlap\(/, 'defines rectangle collision detection');
assert.match(html, /function handlePointerMove\(/, 'supports touch or pointer movement');
assert.match(html, /ArrowLeft/, 'supports keyboard movement');
assert.match(html, /AudioContext/, 'uses generated Web Audio');
assert.match(html, /const CHIPTUNE_ORIGINAL_LOOP = true/, 'marks the 8-bit loop as generated original music');
assert.match(html, /function startChiptune\(\)/, 'starts generated chiptune music');
assert.match(html, /function stopChiptune\(\)/, 'stops generated chiptune music');
assert.match(html, /function scheduleChiptuneStep\(/, 'schedules melody, bass, and drum blips');

console.log('Shadow Dodger static checks passed');
