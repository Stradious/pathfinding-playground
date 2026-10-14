import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const directory = dirname(fileURLToPath(import.meta.url));
const files = new Map([['/', ['index.html', 'text/html']], ['/index.html', ['index.html', 'text/html']], ['/app.mjs', ['app.mjs', 'text/javascript']], ['/search.mjs', ['search.mjs', 'text/javascript']]]);
const server = createServer(async (request, response) => {
  const entry = files.get(new URL(request.url, 'http://localhost').pathname);
  if (!entry) { response.writeHead(404); response.end('Not found'); return; }
  try { response.writeHead(200, { 'content-type': entry[1] }); response.end(await readFile(join(directory, entry[0]))); }
  catch { response.writeHead(500); response.end('Server error'); }
});
server.listen(4173, '127.0.0.1', () => console.log('Pathfinding Playground: http://127.0.0.1:4173'));
