# Luma Restaurant Website

A complete responsive restaurant website built with plain HTML, CSS, and JavaScript.

## Files

- `index.html` — homepage with hero, gallery, features, hours, and CTA
- `menu/index.html` — separate menu page with dynamic category filtering and chef signatures
- `about/index.html` — separate about page
- `contact/index.html` — separate contact/reservation page
- `styles.css` — responsive modern styling
- `script.js` — navigation, gallery lightbox, dynamic menu tabs, reveal animations, and local form validation
- `favicon.svg` — site icon
- `robots.txt` — crawler rules
- `sitemap.xml` — basic sitemap placeholder

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server.

Example with Node.js:

```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.txt':'text/plain','.xml':'application/xml'};http.createServer((req,res)=>{let p=req.url==='/'?'index.html':req.url.slice(1);fs.readFile(p,(e,d)=>{if(e){res.writeHead(404);res.end('not found')}else{res.writeHead(200,{'Content-Type':types[path.extname(p)]||'application/octet-stream'});res.end(d)}})}).listen(4173,'127.0.0.1',()=>console.log('http://127.0.0.1:4173'))"
```

SEO metadata and `sitemap.xml` currently use the safe placeholder URL `https://rukshika01.github.io/Restaurant/`. Replace it with the final production domain before deployment.
