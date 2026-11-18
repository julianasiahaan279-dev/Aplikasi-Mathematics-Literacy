/* charts.js — Diagram SVG buatan sendiri (tabel, batang, garis, lingkaran).
 * Semua diagram dibuat dari data { judul, seri: [{label, nilai}] }.
 * Label ditulis langsung pada elemen (prinsip split-attention, DESAIN.md).
 */
(function () {
  const PALET = ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#64748B', '#DC2626'];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Langkah sumbu "bulat": 1, 2, 5, 10, 20, 50 ...
  function langkahBulat(maks, target) {
    const kasar = maks / (target || 5);
    const pangkat = Math.pow(10, Math.floor(Math.log10(kasar || 1)));
    for (const k of [1, 2, 5, 10]) if (k * pangkat >= kasar) return k * pangkat;
    return 10 * pangkat;
  }

  function ringkasan(data) {
    const nama = { batang: 'Diagram batang', garis: 'Diagram garis', lingkaran: 'Diagram lingkaran', tabel: 'Tabel' }[data.jenis] || 'Data';
    return nama + (data.judul ? ' ' + data.judul : '') + ': ' + data.seri.map((d) => d.label + ' ' + d.nilai).join(', ');
  }

  function tabel(data) {
    const satuan = data.satuan ? ' (' + esc(data.satuan) + ')' : '';
    let h = '<table class="tabel-data"><caption>' + esc(data.judul || '') + '</caption>';
    h += '<thead><tr><th>' + esc(data.kolom || 'Kategori') + '</th><th>' + esc(data.kolomNilai || 'Nilai') + satuan + '</th></tr></thead><tbody>';
    data.seri.forEach((d) => {
      h += '<tr><td>' + esc(d.label) + '</td><td>' + (d.kosong ? '<span class="sel-kosong">?</span>' : esc(d.nilai)) + '</td></tr>';
    });
    if (data.total) {
      const t = data.seri.reduce((a, d) => a + d.nilai, 0);
      h += '<tr class="baris-total"><td>Total</td><td>' + (data.total === '?' ? '<span class="sel-kosong">?</span>' : t) + '</td></tr>';
    }
    return h + '</tbody></table>';
  }

  function batang(data) {
    const W = 340, H = 240, kiri = 34, bawah = 34, atas = 30, kanan = 8;
    const maks = Math.max(...data.seri.map((d) => d.nilai));
    const step = langkahBulat(maks, 4);
    const top = Math.ceil((maks * 1.1) / step) * step || step;
    const lebarArea = W - kiri - kanan, tinggiArea = H - atas - bawah;
    const n = data.seri.length, slot = lebarArea / n, bw = Math.min(48, slot * 0.6);
    let s = svgBuka(W, H, data);
    for (let v = 0; v <= top; v += step) {
      const y = atas + tinggiArea - (v / top) * tinggiArea;
      s += '<line x1="' + kiri + '" x2="' + (W - kanan) + '" y1="' + y + '" y2="' + y + '" class="grid"/>';
      s += '<text x="' + (kiri - 6) + '" y="' + (y + 4) + '" class="sumbu" text-anchor="end">' + v + '</text>';
    }
    data.seri.forEach((d, i) => {
      const x = kiri + slot * i + (slot - bw) / 2;
      const h = (d.nilai / top) * tinggiArea, y = atas + tinggiArea - h;
      const sorot = data.sorot && data.sorot.includes(d.label);
      s += '<g class="elemen" tabindex="0" data-label="' + esc(d.label) + '" data-nilai="' + d.nilai + '">';
      s += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="4" fill="' + (sorot ? '#F59E0B' : '#2563EB') + '"/>';
      s += '<text x="' + (x + bw / 2) + '" y="' + (y - 6) + '" class="label-nilai" text-anchor="middle">' + esc(d.nilai) + '</text>';
      s += '<text x="' + (x + bw / 2) + '" y="' + (H - bawah + 18) + '" class="sumbu" text-anchor="middle">' + esc(d.label) + '</text></g>';
    });
    s += '<line x1="' + kiri + '" x2="' + (W - kanan) + '" y1="' + (atas + tinggiArea) + '" y2="' + (atas + tinggiArea) + '" class="poros"/>';
    return s + '</svg>';
  }

  function garis(data) {
    const W = 340, H = 240, kiri = 34, bawah = 34, atas = 30, kanan = 20;
    const maks = Math.max(...data.seri.map((d) => d.nilai));
    const step = langkahBulat(maks, 4);
    const top = Math.ceil((maks * 1.15) / step) * step || step;
    const lebarArea = W - kiri - kanan, tinggiArea = H - atas - bawah;
    const n = data.seri.length;
    const px = (i) => kiri + (n === 1 ? lebarArea / 2 : (lebarArea * i) / (n - 1) * 0.78 + lebarArea * 0.12);
    const py = (v) => atas + tinggiArea - (v / top) * tinggiArea;
    let s = svgBuka(W, H, data);
    for (let v = 0; v <= top; v += step) {
      s += '<line x1="' + kiri + '" x2="' + (W - kanan) + '" y1="' + py(v) + '" y2="' + py(v) + '" class="grid"/>';
      s += '<text x="' + (kiri - 6) + '" y="' + (py(v) + 4) + '" class="sumbu" text-anchor="end">' + v + '</text>';
    }
    s += '<line x1="' + kiri + '" x2="' + (W - kanan) + '" y1="' + py(0) + '" y2="' + py(0) + '" class="poros" marker-end="url(#panah)"/>';
    s += '<polyline fill="none" stroke="#2563EB" stroke-width="3" points="' + data.seri.map((d, i) => px(i) + ',' + py(d.nilai)).join(' ') + '"/>';
    data.seri.forEach((d, i) => {
      const awal = data.penanda && i === 0, akhir = data.penanda && i === n - 1;
      const warna = awal ? '#16A34A' : akhir ? '#1D4ED8' : '#2563EB';
      s += '<g class="elemen" tabindex="0" data-label="' + esc(d.label) + '" data-nilai="' + d.nilai + '">';
      s += '<circle cx="' + px(i) + '" cy="' + py(d.nilai) + '" r="' + (awal || akhir ? 7 : 5) + '" fill="' + warna + '"/>';
      const teks = (awal ? 'Awal: ' : akhir ? 'Akhir: ' : '') + d.nilai;
      s += '<text x="' + px(i) + '" y="' + (py(d.nilai) - 12) + '" class="label-nilai" text-anchor="middle" fill="' + warna + '">' + esc(teks) + '</text>';
      s += '<text x="' + px(i) + '" y="' + (H - bawah + 18) + '" class="sumbu" text-anchor="middle">' + esc(d.label) + '</text></g>';
    });
    return s + '</svg>';
  }

  function lingkaran(data) {
    const W = 340, H = 250, cx = 170, cy = 135, r = 82;
    const total = data.seri.reduce((a, d) => a + d.nilai, 0);
    let s = svgBuka(W, H, data), sudut = -90;
    data.seri.forEach((d, i) => {
      const besar = (d.nilai / total) * 360;
      const a1 = (sudut * Math.PI) / 180, a2 = ((sudut + besar) * Math.PI) / 180;
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      const tengah = ((sudut + besar / 2) * Math.PI) / 180;
      const lx = cx + (r + 26) * Math.cos(tengah), ly = cy + (r + 26) * Math.sin(tengah);
      const anchor = Math.cos(tengah) > 0.25 ? 'start' : Math.cos(tengah) < -0.25 ? 'end' : 'middle';
      const persen = d.tanya ? '?' : Math.round((d.nilai / total) * 100) + '%';
      s += '<g class="elemen" tabindex="0" data-label="' + esc(d.label) + '" data-nilai="' + (d.tanya ? '?' : d.nilai) + '">';
      s += '<path d="M' + cx + ',' + cy + ' L' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 0 ' + (besar > 180 ? 1 : 0) + ' 1 ' + x2 + ',' + y2 + ' Z" fill="' + (d.tanya ? '#CBD5E1' : PALET[i % PALET.length]) + '" stroke="#fff" stroke-width="2"/>';
      s += '<text x="' + lx + '" y="' + ly + '" class="label-nilai" text-anchor="' + anchor + '">' + esc(d.label) + '</text>';
      s += '<text x="' + lx + '" y="' + (ly + 16) + '" class="sumbu" text-anchor="' + anchor + '">' + persen + '</text></g>';
      sudut += besar;
    });
    return s + '</svg>';
  }

  function svgBuka(W, H, data) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(ringkasan(data)) + '" class="diagram">' +
      '<defs><marker id="panah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#64748B"/></marker></defs>' +
      (data.judul ? '<text x="' + W / 2 + '" y="18" class="judul-diagram" text-anchor="middle">' + esc(data.judul) + '</text>' : '');
  }

  function render(data) {
    if (!data) return '';
    const isi = { tabel, batang, garis, lingkaran }[data.jenis];
    if (!isi) return '';
    return '<figure class="kotak-diagram">' + isi(data) + '<figcaption class="info-ketuk" aria-live="polite">Ketuk diagram untuk melihat nilainya.</figcaption></figure>';
  }

  // Ketuk elemen diagram -> tampilkan nilai besar
  document.addEventListener('click', (e) => {
    const g = e.target.closest && e.target.closest('.elemen');
    if (!g) return;
    const fig = g.closest('.kotak-diagram');
    const info = fig && fig.querySelector('.info-ketuk');
    if (info) info.innerHTML = '<strong>' + esc(g.dataset.label) + ': ' + esc(g.dataset.nilai) + '</strong>';
  });

  window.Charts = { render, ringkasan, langkahBulat };
})();
