# Pathfinding Playground

An interactive grid search demo comparing Dijkstra and A*. Click or drag to draw walls, move the start and goal, then press **Find path**. The search animation shows visited cells and the final path.

Open `index.html` in a modern browser. Or run `node serve.mjs` and visit http://127.0.0.1:4173. No dependencies are needed.

Both algorithms find a shortest path on a four-neighbor grid with unit movement cost. A* uses Manhattan distance as an admissible heuristic; Dijkstra uses zero. The shared search function is independently testable:

```powershell
node --test test.mjs
```

Ideas to extend: diagonal movement, weighted terrain, maze generation, and step-by-step controls.
