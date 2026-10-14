import test from 'node:test';
import assert from 'node:assert/strict';
import { shortestPath } from './search.mjs';
test('A* and Dijkstra agree on shortest distance around a barrier', () => {
  const input = { width: 5, height: 5, start: 0, goal: 4, walls: [1, 2, 3] };
  const a = shortestPath({ ...input, algorithm: 'astar' });
  const d = shortestPath({ ...input, algorithm: 'dijkstra' });
  assert.equal(a.distance, 6);
  assert.equal(d.distance, a.distance);
  assert.equal(a.path[0], input.start);
  assert.equal(a.path.at(-1), input.goal);
});
test('unreachable goal returns no path', () => {
  const r = shortestPath({ width: 3, height: 3, start: 0, goal: 8, walls: [5, 7] });
  assert.equal(r.reached, false);
  assert.deepEqual(r.path, []);
});
