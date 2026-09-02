const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4173;
const HOST = '127.0.0.1';
const root = __dirname;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function resolveFile(url) {
  const cleanUrl = decodeURIComponent(url.split('?')[0]);
  let filePath;
  if (cleanUrl === '/') {
    filePath = 'index.html';
  } else if (cleanUrl.endsWith('/')) {
    filePath = path.join(cleanUrl.replace(/^\//, ''), 'index.html');
  } else {
    filePath = cleanUrl.replace(/^\//, '');
  }

  const absolutePath = path.normalize(path.join(root, filePath));
  if (!absolutePath.startsWith(root)) return null;
  return absolutePath;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      console.error('404', req.url, file, error.message);
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Luma website running at http://${HOST}:${PORT}/`);
  console.log('Press Ctrl+C to stop the server.');
});
