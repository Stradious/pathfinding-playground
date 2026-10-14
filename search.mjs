export function shortestPath({ width, height, walls = [], start, goal, algorithm = 'astar' }) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) throw new Error('Grid dimensions must be positive integers');
  if (!['astar', 'dijkstra'].includes(algorithm)) throw new Error('Unknown algorithm');
  const size = width * height;
  if (![start, goal].every(v => Number.isInteger(v) && v >= 0 && v < size)) throw new Error('Start and goal must be valid cell indices');
  const blocked = new Set(walls);
  if (blocked.has(start) || blocked.has(goal)) throw new Error('Start and goal cannot be walls');
  const heuristic = id => algorithm === 'dijkstra' ? 0 : Math.abs(id % width - goal % width) + Math.abs(Math.floor(id / width) - Math.floor(goal / width));
  const dist = Array(size).fill(Infinity), previous = Array(size).fill(-1), visited = [];
  const open = new Set([start]); dist[start] = 0;
  while (open.size) {
    let current = -1, best = Infinity;
    for (const id of open) { const score = dist[id] + heuristic(id); if (score < best) { best = score; current = id; } }
    open.delete(current); visited.push(current);
    if (current === goal) break;
    const col = current % width, row = Math.floor(current / width);
    const neighbors = [];
    if (col > 0) neighbors.push(current - 1);
    if (col + 1 < width) neighbors.push(current + 1);
    if (row > 0) neighbors.push(current - width);
    if (row + 1 < height) neighbors.push(current + width);
    for (const next of neighbors) {
      if (blocked.has(next)) continue;
      const candidate = dist[current] + 1;
      if (candidate < dist[next]) { dist[next] = candidate; previous[next] = current; open.add(next); }
    }
  }
  const path = [];
  if (Number.isFinite(dist[goal])) for (let id = goal; id !== -1; id = previous[id]) path.push(id);
  path.reverse();
  return { path, visited, distance: dist[goal], reached: Number.isFinite(dist[goal]) };
}
