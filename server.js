const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4173;
const HOST = process.env.HOST || '127.0.0.1';
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
  let cleanUrl = decodeURIComponent(url.split('?')[0]);
  if (cleanUrl.startsWith('/Restaurant')) cleanUrl = cleanUrl.slice('/Restaurant'.length) || '/';

  let filePath;
  if (cleanUrl === '/') filePath = 'index.html';
  else if (cleanUrl.endsWith('/')) filePath = path.join(cleanUrl.replace(/^\//, ''), 'index.html');
  else filePath = cleanUrl.replace(/^\//, '');

  const absolutePath = path.normalize(path.join(root, filePath));
  if (!absolutePath.startsWith(root)) return null;
  return absolutePath;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 100000) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch (error) { reject(error); }
    });
  });
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.includes('@') && trimmed.includes('.') && !trimmed.includes(' ');
}

async function handleContact(req, res) {
  try {
    const { name, email, message } = await readJsonBody(req);
    if (!name || !email || !message || !isValidEmail(email)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid contact form submission.' }));
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error('Missing contact email environment variables.');
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Email service is not configured.' }));
      return;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: 'New Luma website message from ' + name,
        text: 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
      })
    });

    if (!response.ok) throw new Error(await response.text());

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error('Contact send failed:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Failed to send message.' }));
  }
}

const server = http.createServer((req, res) => {
  const cleanUrl = req.url.split('?')[0].replace(/^\/Restaurant/, '') || '/';
  if (req.method === 'POST' && cleanUrl === '/api/contact') {
    handleContact(req, res);
    return;
  }

  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log('Luma website running at http://' + HOST + ':' + PORT + '/');
  console.log('Contact form email requires RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL environment variables.');
});
