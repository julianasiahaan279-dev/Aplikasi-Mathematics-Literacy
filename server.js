/* server.js — Server lokal tanpa paket tambahan (cukup Node.js 18+).
 * Menyajikan file aplikasi + endpoint /api/chat, dan membaca .env.
 * Jalankan:  npm start   lalu buka http://localhost:3000
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Baca .env sederhana (KUNCI=nilai)
try {
  fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split(/\r?\n/).forEach((baris) => {
    const m = baris.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
} catch (e) {
  console.warn('Peringatan: file .env tidak ditemukan. Tutor AI tidak akan bisa menjawab.');
}

const { tanyaTutor } = require('./api/_tutor');
const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const JENIS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const DILARANG = /(^|\/)(\.|api\/|server\.js|package\.json|node_modules)/; // jangan sajikan .env, kode server, dll.

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/chat') {
    if (req.method !== 'POST') { res.writeHead(405, { 'Content-Type': 'application/json' }); return res.end('{"error":"Gunakan metode POST."}'); }
    let teks = '';
    req.on('data', (c) => { teks += c; if (teks.length > 50000) req.destroy(); });
    req.on('end', async () => {
      let body = {};
      try { body = JSON.parse(teks || '{}'); } catch (e) { /* abaikan */ }
      const hasil = await tanyaTutor(body);
      res.writeHead(hasil.status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(hasil.data));
    });
    return;
  }

  let rel = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (rel === '') rel = 'index.html';
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || DILARANG.test(rel.replace(/\\/g, '/'))) { res.writeHead(404); return res.end('Tidak ditemukan'); }
  fs.readFile(file, (err, isi) => {
    if (err) { res.writeHead(404); return res.end('Tidak ditemukan'); }
    res.writeHead(200, { 'Content-Type': JENIS[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(isi);
  });
}).listen(PORT, () => {
  console.log('');
  console.log('  StatistiKu berjalan di  http://localhost:' + PORT);
  console.log('  Tutor AI: ' + (process.env.DEEPSEEK_API_KEY ? 'API key ditemukan ✔' : 'API key BELUM ada di .env ✘'));
  console.log('  Tekan Ctrl + C untuk berhenti.');
  console.log('');
});
