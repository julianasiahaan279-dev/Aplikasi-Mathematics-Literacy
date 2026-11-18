/* app.js — Layar-layar aplikasi StatistiKu dan alur belajar RMT. */
(function () {
  const K = window.KONTEN;
  const $layar = document.getElementById('layar');
  const $nav = document.getElementById('nav-bawah');
  let P = Storage2.baca(); // progres
  terapkanHuruf();

  // ─────────── utilitas ───────────
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function simpan() { Storage2.simpan(P); }
  function pergi(hash) { location.hash = hash; }
  function tampil(html, navAktif) {
    $layar.innerHTML = html;
    $nav.hidden = !navAktif;
    $nav.querySelectorAll('a').forEach((a) => a.classList.toggle('aktif', a.dataset.nav === navAktif));
    window.scrollTo(0, 0);
    const h = $layar.querySelector('h1, h2');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  function terapkanHuruf() { document.documentElement.dataset.huruf = P.ukuranHuruf || 'normal'; }
  function modulById(id) { return K.MODUL.find((m) => m.id === id); }
  function statusModul(id) { return (P.modul[id] && P.modul[id].status) || 'belum'; }

  function rekomendasi() {
    // Modul dengan topik ≤ 50% pada pre-test diprioritaskan (ARSITEKTUR.md §6)
    if (!P.preTest) return [];
    const perModul = {};
    K.PRETEST.forEach((q, i) => {
      perModul[q.modul] = perModul[q.modul] || { benar: 0, total: 0 };
      perModul[q.modul].total++;
      if (P.preTest.jawaban[i]) perModul[q.modul].benar++;
    });
    return Object.keys(perModul).filter((m) => perModul[m].benar / perModul[m].total <= 0.5);
  }

  function modulBerikutnya() {
    const rek = rekomendasi();
    return K.MODUL.find((m) => rek.includes(m.id) && statusModul(m.id) !== 'selesai') ||
      K.MODUL.find((m) => statusModul(m.id) !== 'selesai');
  }

  // ─────────── router ───────────
  function router() {
    Tutor.tutup();
    Tutor.aturKonteks(null);
    const bagian = location.hash.replace(/^#\/?/, '').split('/');
    const r = bagian[0];
    if (!P.mulai && r !== 'pengaturan') return layarSambutan();
    if (r === '' || r === 'beranda') return layarBeranda();
    if (r === 'belajar') return layarBelajar();
    if (r === 'latihan') return layarLatihan();
    if (r === 'hasil') return layarHasil();
    if (r === 'pengaturan') return layarPengaturan();
    if (r === 'tes') return layarTes(bagian[1] === 'post' ? 'post' : 'pre');
    if (r === 'modul') return layarModul(bagian[1]);
    layarBeranda();
  }
  window.addEventListener('hashchange', router);

  // ─────────── Sambutan ───────────
  function layarSambutan() {
    tampil(`
      <section class="kartu tengah">
        <div class="logo" aria-hidden="true">📊</div>
        <h1>StatistiKu</h1>
        <p>Belajar membaca tabel dan diagram, sedikit demi sedikit.</p>
        <label class="label" for="nama">Nama panggilanmu (boleh dikosongkan)</label>
        <input id="nama" class="input" maxlength="20" autocomplete="off" value="${esc(P.nama)}">
      </section>
      <div class="aksi-bawah"><button class="tombol utama" id="mulai">Mulai</button></div>`);
    document.getElementById('mulai').onclick = () => {
      P.nama = document.getElementById('nama').value.trim();
      P.mulai = true;
      simpan();
      pergi(P.preTest ? '#/beranda' : '#/tes/pre');
      if (location.hash === '#/beranda' || location.hash === '#/tes/pre') router();
    };
  }

  // ─────────── Beranda (peta belajar) ───────────
  function layarBeranda() {
    const rek = rekomendasi();
    const lanjut = modulBerikutnya();
    let utama = '';
    if (!P.preTest) {
      utama = `<section class="kartu sorot"><h2>Kenali kemampuan awalmu</h2><p>10 soal singkat. Tidak ada batas waktu.</p>
        <a class="tombol utama" href="#/tes/pre">Mulai pre-test</a></section>`;
    } else if (lanjut) {
      utama = `<section class="kartu sorot"><p class="kecil">Lanjutkan belajarmu</p>
        <h2>Modul ${lanjut.no}: ${esc(lanjut.judul)}</h2>${rek.includes(lanjut.id) ? '<span class="tag">disarankan</span>' : ''}
        <p>${esc(lanjut.ringkas)}</p><a class="tombol utama" href="#/modul/${lanjut.id}">Lanjut</a></section>`;
    } else if (!P.postTest) {
      utama = `<section class="kartu sorot"><h2>Semua modul selesai! 🎉</h2><p>Sekarang coba post-test untuk melihat kemajuanmu.</p>
        <a class="tombol utama" href="#/tes/post">Mulai post-test</a></section>`;
    } else {
      utama = `<section class="kartu sorot"><h2>Kerja bagus!</h2><p>Lihat ringkasan belajarmu.</p><a class="tombol utama" href="#/hasil">Lihat hasil</a></section>`;
    }
    tampil(`
      <header class="kepala"><h1>Halo${P.nama ? ', ' + esc(P.nama) : ''}!</h1>
        <a class="ikon" href="#/pengaturan" aria-label="Pengaturan">⚙️</a></header>
      ${utama}
      <h2 class="sub">Peta belajar</h2>
      ${daftarModul(rek)}`, 'beranda');
  }

  function daftarModul(rek) {
    return '<ol class="jalur">' + K.MODUL.map((m) => {
      const st = statusModul(m.id);
      const ikon = st === 'selesai' ? '✔' : st === 'berjalan' ? '●' : '○';
      return `<li class="jalur-item ${st}"><a href="#/modul/${m.id}"><span class="status" aria-hidden="true">${ikon}</span>
        <span><strong>Modul ${m.no}: ${esc(m.judul)}</strong>${rek.includes(m.id) ? ' <span class="tag">disarankan</span>' : ''}
        <span class="kecil blok">${st === 'selesai' ? 'Selesai' : st === 'berjalan' ? 'Sedang dipelajari' : esc(m.ringkas)}</span></span></a></li>`;
    }).join('') + '</ol>';
  }

  function layarBelajar() {
    tampil(`<header class="kepala"><h1>Belajar</h1></header>
      <p class="muted">Setiap modul punya 3 fase: <strong>mengamati</strong>, <strong>membangun konsep</strong>, lalu <strong>berlatih & merefleksi</strong>.</p>
      ${daftarModul(rekomendasi())}`, 'belajar');
  }

  function layarLatihan() {
    tampil(`<header class="kepala"><h1>Latihan</h1></header>
      <a class="kartu tautan" href="#/modul/modul-6"><h2>Pemilih Diagram</h2><p>Cocokkan tujuan dengan jenis diagram.</p></a>
      <a class="kartu tautan" href="#/modul/modul-7"><h2>Soal Cerita Literasi</h2><p>Rumuskan → Hitung → Tafsirkan → Beralasan.</p></a>
      <a class="kartu tautan" href="#/tes/pre"><h2>Pre-test</h2><p>${P.preTest ? 'Skor terakhir: ' + P.preTest.skor : 'Belum dikerjakan'}</p></a>
      <a class="kartu tautan" href="#/tes/post"><h2>Post-test</h2><p>${P.postTest ? 'Skor terakhir: ' + P.postTest.skor : 'Kerjakan setelah semua modul selesai'}</p></a>`, 'latihan');
  }

  // ─────────── Pre-test & Post-test ───────────
  function layarTes(jenis) {
    const soal = jenis === 'pre' ? K.PRETEST : K.POSTTEST;
    const jawab = [];
    let i = 0, pilih = null;
    function tampilSoal() {
      const q = soal[i];
      pilih = null;
      tampil(`
        <div class="progres"><div style="width:${(i / soal.length) * 100}%"></div></div>
        <p class="kecil">${jenis === 'pre' ? 'Pre-test' : 'Post-test'} · Soal ${i + 1} dari ${soal.length}</p>
        <section class="kartu"><p class="teks-soal">${esc(q.teks)}</p>${Charts.render(q.data)}
          <div class="opsi" role="radiogroup">${q.opsi.map((o, k) => `<button class="pilihan" role="radio" aria-checked="false" data-k="${k}">${String.fromCharCode(65 + k)}. ${esc(o)}</button>`).join('')}</div>
        </section>
        <div class="aksi-bawah"><button class="tombol utama" id="lanjut" disabled>${i === soal.length - 1 ? 'Selesai' : 'Lanjut'}</button></div>`);
      $layar.querySelectorAll('.pilihan').forEach((b) => b.onclick = () => {
        $layar.querySelectorAll('.pilihan').forEach((x) => { x.classList.remove('dipilih'); x.setAttribute('aria-checked', 'false'); });
        b.classList.add('dipilih'); b.setAttribute('aria-checked', 'true');
        pilih = Number(b.dataset.k);
        document.getElementById('lanjut').disabled = false;
      });
      document.getElementById('lanjut').onclick = () => {
        jawab.push(pilih === q.kunci);
        i++;
        if (i < soal.length) tampilSoal(); else selesai();
      };
    }
    function selesai() {
      const benar = jawab.filter(Boolean).length;
      const hasil = { skor: benar * 10, jawaban: jawab, tanggal: new Date().toISOString() };
      if (jenis === 'pre') P.preTest = hasil; else P.postTest = hasil;
      simpan();
      const perTopik = {};
      soal.forEach((q, k) => {
        perTopik[q.topik] = perTopik[q.topik] || { b: 0, t: 0 };
        perTopik[q.topik].t++; if (jawab[k]) perTopik[q.topik].b++;
      });
      const kuat = Object.keys(perTopik).filter((t) => perTopik[t].b === perTopik[t].t);
      const lemah = Object.keys(perTopik).filter((t) => perTopik[t].b < perTopik[t].t);
      tampil(`
        <section class="kartu tengah"><p class="kecil">${jenis === 'pre' ? 'Hasil pre-test' : 'Hasil post-test'}</p>
          <p class="skor-besar">${hasil.skor}</p><p>${benar} dari ${soal.length} soal benar</p>
          ${jenis === 'post' && P.preTest ? `<p>Pre-test: ${P.preTest.skor} → Post-test: ${hasil.skor} (${hasil.skor - P.preTest.skor >= 0 ? '+' : ''}${hasil.skor - P.preTest.skor})</p>` : ''}
        </section>
        ${kuat.length ? `<section class="kartu"><h2>Sudah kuat 💪</h2><ul>${kuat.map((t) => '<li>' + esc(K.NAMA_TOPIK[t]) + '</li>').join('')}</ul></section>` : ''}
        ${lemah.length ? `<section class="kartu"><h2>Perlu latihan</h2><ul>${lemah.map((t) => '<li>' + esc(K.NAMA_TOPIK[t]) + '</li>').join('')}</ul>
          ${jenis === 'pre' ? '<p class="kecil">Modul untuk topik ini akan diberi tanda <span class="tag">disarankan</span>.</p>' : ''}</section>` : ''}
        <div class="aksi-bawah"><a class="tombol utama" href="${jenis === 'pre' ? '#/beranda' : '#/hasil'}">${jenis === 'pre' ? 'Ke peta belajar' : 'Lihat ringkasan'}</a></div>`);
    }
    tampilSoal();
  }

  // ─────────── Modul (alur RMT) ───────────
  function layarModul(id) {
    const m = modulById(id);
    if (!m) return layarBelajar();
    P.modul[id] = P.modul[id] || { status: 'berjalan', langkah: 0 };
    if (P.modul[id].status === 'selesai') P.modul[id] = { status: 'berjalan', langkah: 0, ulang: true };
    if (P.modul[id].status === 'belum') P.modul[id].status = 'berjalan';
    simpan();
    tampilLangkah(m);
  }

  function tampilLangkah(m) {
    const st = P.modul[m.id];
    const idx = Math.min(st.langkah || 0, m.langkah.length - 1);
    const L = m.langkah[idx];
    const kepala = `
      <header class="kepala-modul"><a class="ikon" href="#/belajar" aria-label="Kembali ke daftar modul">←</a>
        <div><p class="kecil">Modul ${m.no}: ${esc(m.judul)}</p>
        <div class="progres"><div style="width:${((idx + 1) / m.langkah.length) * 100}%"></div></div>
        <p class="kecil">Langkah ${idx + 1} dari ${m.langkah.length}</p></div></header>
      <p class="fase fase-${L.fase}">${esc(K.FASE[L.fase])}</p>`;
    function berikut() {
      st.langkah = idx + 1;
      simpan();
      if (st.langkah >= m.langkah.length) return selesaiModul(m);
      tampilLangkah(m);
    }
    const render = { amati: langkahAmati, katamu: langkahKatamu, contoh: langkahContoh, soal: langkahSoal, literasi: langkahLiterasi, refleksi: langkahRefleksi }[L.tipe];
    render(m, L, kepala, berikut, idx);
  }

  function tombolLanjut(teks) {
    return `<div class="aksi-bawah"><button class="tombol utama" id="lanjut" ${teks === false ? 'disabled' : ''}>${esc(teks || 'Lanjut')}</button></div>`;
  }

  // Fase I: amati situasi sehari-hari
  function langkahAmati(m, L, kepala, berikut, idx) {
    tampil(kepala + `<h2>${esc(L.judul)}</h2>
      ${L.teks ? `<section class="kartu cerita"><p>${esc(L.teks)}</p></section>` : ''}
      <div id="soal"></div>` + tombolLanjut(false));
    Tutor.tampilkanTombol();
    pasangSoal(document.getElementById('soal'), Object.assign({ data: L.data }, L.tanya), m.id + '-' + idx, () => aktifkanLanjut(berikut));
  }

  // Fase II: bahasa sehari-hari → istilah matematika
  function langkahKatamu(m, L, kepala, berikut) {
    tampil(kepala + `<h2>${esc(L.judul)}</h2>
      <section class="kartu"><label class="teks-soal" for="katamu">${esc(L.tanya)}</label>
        <textarea id="katamu" class="input" rows="3" placeholder="Tulis jawabanmu di sini..."></textarea>
        <div class="baris-tombol"><button class="tombol kedua" id="belum">Aku belum tahu</button>
        <button class="tombol kedua" id="lihat" disabled>Bandingkan</button></div></section>
      <div id="istilah"></div>` + tombolLanjut(false));
    Tutor.tampilkanTombol();
    Tutor.aturKonteks('Siswa diminta menjelaskan dengan bahasanya sendiri: ' + L.tanya);
    const ta = document.getElementById('katamu');
    ta.oninput = () => { document.getElementById('lihat').disabled = ta.value.trim().length < 3; };
    function buka() {
      const tulisan = ta.value.trim();
      document.getElementById('istilah').innerHTML = `
        ${tulisan ? `<section class="kartu kutip"><p class="kecil">Tulisanmu</p><p>${esc(tulisan)}</p></section>` : ''}
        <p class="kecil">Dalam bahasa matematika:</p>
        ${L.istilah.map((t) => `<section class="kartu istilah"><h3>${esc(t.nama)}</h3><p>${esc(t.arti)}</p></section>`).join('')}
        <p class="muted">${tulisan ? 'Bagian mana dari tulisanmu yang sudah mirip? Apa yang perlu ditambah?' : 'Coba baca pelan-pelan, lalu jelaskan lagi dengan kata-katamu sendiri.'}</p>`;
      aktifkanLanjut(berikut);
    }
    document.getElementById('lihat').onclick = buka;
    document.getElementById('belum').onclick = buka;
  }

  // Contoh berlangkah (worked example)
  function langkahContoh(m, L, kepala, berikut) {
    let n = 1;
    const ahli = (P.streak || 0) >= 3; // expertise reversal: boleh lewati bila sudah benar 3x berturut-turut
    tampil(kepala + `<h2>${esc(L.judul)}</h2>${Charts.render(L.data)}
      <ol class="langkah-contoh" id="lc"></ol>
      ${ahli ? '<p class="kecil"><button class="tautan-teks" id="lewati">Aku sudah paham, tampilkan semua langkah</button></p>' : ''}` + tombolLanjut('Langkah berikutnya'));
    Tutor.tampilkanTombol();
    Tutor.aturKonteks('Contoh berlangkah "' + L.judul + '": ' + L.langkah.join(' '));
    const lc = document.getElementById('lc'), btn = document.getElementById('lanjut');
    function gambar() {
      lc.innerHTML = L.langkah.slice(0, n).map((t, k) => `<li class="${k < n - 1 ? 'redup' : 'baru'}">${esc(t)}</li>`).join('');
      btn.textContent = n < L.langkah.length ? 'Langkah berikutnya' : 'Lanjut';
    }
    btn.onclick = () => { if (n < L.langkah.length) { n++; gambar(); } else berikut(); };
    const lw = document.getElementById('lewati');
    if (lw) lw.onclick = () => { n = L.langkah.length; gambar(); };
    gambar();
  }

  function langkahSoal(m, L, kepala, berikut, idx) {
    tampil(kepala + `<h2>${esc(L.judul)}</h2><div id="soal"></div>` + tombolLanjut(false));
    Tutor.tampilkanTombol();
    pasangSoal(document.getElementById('soal'), L, m.id + '-' + idx, () => aktifkanLanjut(berikut));
  }

  // Soal literasi 4 tahap: F → E → I → R (terkunci berurutan)
  function langkahLiterasi(m, L, kepala, berikut, idx) {
    const NAMA = { F: 'Rumuskan', E: 'Hitung', I: 'Tafsirkan', R: 'Beralasan' };
    const NO = { F: '1', E: '2', I: '3', R: '4' };
    let t = 0;
    tampil(kepala + `<h2>${esc(L.judul)}</h2>
      <details class="kartu cerita" open><summary>Cerita & data</summary><p>${esc(L.konteks)}</p>${Charts.render(L.data)}</details>
      <div class="tab-tahap" role="tablist" id="tab"></div><div id="soal"></div>` + tombolLanjut(false));
    Tutor.tampilkanTombol();
    function gambar() {
      document.getElementById('tab').innerHTML = L.tahap.map((q, k) =>
        `<span role="tab" aria-selected="${k === t}" class="tab ${k < t ? 'beres' : k === t ? 'aktif' : 'kunci'}" aria-label="Tahap ${NO[q.kode]} ${NAMA[q.kode]}${k > t ? ', terkunci' : ''}"><b>${k < t ? '✓' : k > t ? '🔒' : NO[q.kode]}</b>${NAMA[q.kode]}</span>`).join('');
      const q = Object.assign({ tahapLiterasi: L.tahap[t].kode, dataChips: L.data }, L.tahap[t]);
      pasangSoal(document.getElementById('soal'), q, m.id + '-' + idx + '-' + L.tahap[t].kode, () => {
        if (t < L.tahap.length - 1) {
          const btn = document.getElementById('lanjut');
          btn.disabled = false; btn.textContent = 'Tahap berikutnya';
          btn.onclick = () => { t++; btn.disabled = true; btn.textContent = 'Lanjut'; gambar(); };
        } else aktifkanLanjut(berikut);
      }, L.konteks);
    }
    gambar();
  }

  // Fase III: refleksi + skala usaha mental (Paas 1–9)
  function langkahRefleksi(m, L, kepala, berikut) {
    tampil(kepala + `<h2>Cerminan</h2>
      <p class="muted">Pemikir yang hebat selalu melihat lagi cara berpikirnya.</p>
      <section class="kartu"><label class="label" for="r1">Langkah apa yang kamu pakai untuk menjawab soal di modul ini?</label>
        <textarea id="r1" class="input" rows="2"></textarea>
        <label class="label" for="r2">Di bagian mana kamu hampir salah atau bingung?</label>
        <textarea id="r2" class="input" rows="2"></textarea>
        <label class="label" for="r3">Kapan cara ini bisa kamu pakai lagi di luar soal ini?</label>
        <textarea id="r3" class="input" rows="2"></textarea></section>
      <section class="kartu"><p class="label">Seberapa besar usaha berpikirmu di modul ini?</p>
        <div class="skala" role="radiogroup">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => `<button class="skala-btn" role="radio" aria-checked="false" data-v="${v}">${v}</button>`).join('')}</div>
        <div class="skala-ket"><span>😌 sangat ringan</span><span>😓 sangat berat</span></div></section>` + tombolLanjut('Selesaikan modul'));
    Tutor.tampilkanTombol();
    Tutor.aturKonteks('Siswa sedang merefleksikan modul "' + m.judul + '". Bantu ia memikirkan cara berpikirnya, jangan menilai.');
    let usaha = null;
    $layar.querySelectorAll('.skala-btn').forEach((b) => b.onclick = () => {
      $layar.querySelectorAll('.skala-btn').forEach((x) => { x.classList.remove('dipilih'); x.setAttribute('aria-checked', 'false'); });
      b.classList.add('dipilih'); b.setAttribute('aria-checked', 'true'); usaha = Number(b.dataset.v);
    });
    document.getElementById('lanjut').onclick = () => {
      P.modul[m.id].skalaUsaha = usaha;
      P.modul[m.id].refleksi = ['r1', 'r2', 'r3'].map((k) => document.getElementById(k).value.trim());
      berikut();
    };
  }

  function selesaiModul(m) {
    P.modul[m.id].status = 'selesai';
    P.modul[m.id].langkah = 0;
    simpan();
    const lanjut = modulBerikutnya();
    tampil(`<section class="kartu tengah"><div class="logo" aria-hidden="true">🏅</div><h1>Modul ${m.no} selesai!</h1>
      <p>Kamu sudah mengamati, membangun konsep, berlatih, dan merefleksi.</p></section>
      <div class="aksi-bawah">${lanjut ? `<a class="tombol utama" href="#/modul/${lanjut.id}">Lanjut ke Modul ${lanjut.no}</a>` :
        (!P.postTest ? '<a class="tombol utama" href="#/tes/post">Kerjakan post-test</a>' : '<a class="tombol utama" href="#/hasil">Lihat hasil</a>')}
      <a class="tombol kedua" href="#/beranda">Ke beranda</a></div>`);
  }

  function aktifkanLanjut(berikut) {
    const btn = document.getElementById('lanjut');
    btn.disabled = false;
    btn.onclick = berikut;
  }

  // ─────────── Komponen soal (hint 3 tingkat, umpan balik, penanda data) ───────────
  function pasangSoal(el, q, soalId, onSelesai, konteksCerita) {
    let hint = 0, coba = 0, pilih = null, selesai = false;
    const mulai = Date.now();
    const sumberChips = q.data || q.dataChips;
    const chips = q.chips && sumberChips ? sumberChips.seri.map((d) => d.nilai) : null;
    el.innerHTML = `
      <section class="kartu">
        ${q.verifikasi ? '<!-- TODO-VERIFIKASI -->' : ''}
        <p class="teks-soal">${esc(q.teks)}</p>
        ${Charts.render(q.data)}
        ${chips ? `<div class="penanda"><p class="kecil">Ketuk angka satu per satu:</p>
          <div class="chips">${chips.map((v, k) => `<button class="chip" data-k="${k}" aria-pressed="false">${v}</button>`).join('')}</div>
          <p class="jumlah-berjalan" aria-live="polite">Jumlah: 0</p></div>` : ''}
        ${q.jawab === 'pilihan'
          ? `<div class="opsi ${q.pemilih ? 'grid-pemilih' : ''}" role="radiogroup">${q.opsi.map((o, k) => `<button class="pilihan" role="radio" aria-checked="false" data-k="${k}">${esc(o)}</button>`).join('')}</div>`
          : `<label class="label" for="ang">Jawabanmu</label><input id="ang" class="input angka" inputmode="numeric" pattern="[0-9]*" autocomplete="off">`}
        <div class="hint-area" aria-live="polite"></div>
        <div class="baris-tombol"><button class="tombol kedua btn-hint">💡 Petunjuk</button><button class="tombol utama btn-periksa" disabled>Periksa</button></div>
      </section>
      <div class="umpan" aria-live="assertive"></div>`;

    Tutor.aturKonteks(
      (konteksCerita ? 'Cerita: ' + konteksCerita + '\n' : '') +
      'Soal: ' + q.teks + (q.data ? '\nData: ' + Charts.ringkasan(q.data) : '') +
      (q.opsi ? '\nPilihan: ' + q.opsi.join(' | ') : '') +
      '\n[Hanya untuk tutor, JANGAN dibocorkan] Kunci: ' + (q.jawab === 'pilihan' ? q.opsi[q.kunci] : q.kunci) + '. Penjelasan: ' + q.penjelasan);

    const btnP = el.querySelector('.btn-periksa');
    // Penanda data: jumlah berjalan "5 + 8 = 13"
    if (chips) {
      const dipilih = [];
      el.querySelectorAll('.chip').forEach((c) => c.onclick = () => {
        const k = Number(c.dataset.k), pos = dipilih.indexOf(k);
        if (pos >= 0) dipilih.splice(pos, 1); else dipilih.push(k);
        c.classList.toggle('dicentang', pos < 0);
        c.setAttribute('aria-pressed', String(pos < 0));
        const nilai = dipilih.map((i) => chips[i]);
        const total = nilai.reduce((a, b) => a + b, 0);
        el.querySelector('.jumlah-berjalan').textContent = nilai.length > 1 ? 'Jumlah: ' + nilai.join(' + ') + ' = ' + total : 'Jumlah: ' + total;
      });
    }
    if (q.jawab === 'pilihan') {
      el.querySelectorAll('.pilihan').forEach((b) => b.onclick = () => {
        if (selesai) return;
        el.querySelectorAll('.pilihan').forEach((x) => { x.classList.remove('dipilih'); x.setAttribute('aria-checked', 'false'); });
        b.classList.add('dipilih'); b.setAttribute('aria-checked', 'true');
        pilih = Number(b.dataset.k); btnP.disabled = false;
      });
    } else {
      const inp = el.querySelector('#ang');
      inp.oninput = () => { inp.value = inp.value.replace(/[^0-9]/g, ''); pilih = inp.value === '' ? null : Number(inp.value); btnP.disabled = pilih === null; };
      inp.onkeydown = (e) => { if (e.key === 'Enter' && !btnP.disabled) btnP.click(); };
    }
    el.querySelector('.btn-hint').onclick = () => {
      if (hint >= 3) return;
      hint++;
      el.querySelector('.hint-area').innerHTML = q.hint.slice(0, hint).map((h, k) => `<p class="hint">💡 ${k + 1}. ${esc(h)}</p>`).join('');
      if (hint >= 3) el.querySelector('.btn-hint').disabled = true;
    };
    btnP.onclick = () => {
      if (selesai) return;
      coba++;
      const benar = pilih === q.kunci;
      const umpan = el.querySelector('.umpan');
      if (benar || coba >= 3) {
        selesai = true;
        catat(soalId, benar && coba === 1, hint, Math.round((Date.now() - mulai) / 1000), coba, q.tahapLiterasi);
        el.querySelectorAll('.pilihan, .chip, #ang, .btn-hint').forEach((x) => { x.disabled = true; });
        btnP.hidden = true;
        if (q.jawab === 'pilihan') el.querySelector(`.pilihan[data-k="${q.kunci}"]`).classList.add('kunci');
        umpan.innerHTML = benar
          ? `<div class="panel benar"><p><strong>✓ Tepat!</strong> ${coba === 1 ? 'Kamu membaca datanya dengan teliti.' : 'Kamu berhasil memperbaikinya.'}</p><p>${esc(q.penjelasan)}</p></div>`
          : `<div class="panel netral"><p><strong>Tidak apa-apa, ayo kita lihat bersama.</strong></p><p>Jawabannya: <strong>${esc(q.jawab === 'pilihan' ? q.opsi[q.kunci] : q.kunci)}</strong>. ${esc(q.penjelasan)}</p></div>`;
        onSelesai();
      } else {
        const khusus = q.umpan && q.umpan[pilih];
        umpan.innerHTML = `<div class="panel coba"><p><strong>Belum tepat.</strong> ${esc(khusus || 'Coba lihat lagi datanya dengan teliti.')}</p>
          <p class="kecil">Kesempatan tersisa: ${3 - coba}. Kamu juga bisa membuka petunjuk atau bertanya ke Tutor.</p></div>`;
      }
    };
  }

  function catat(soalId, benar, hintDipakai, detik, percobaan, tahap) {
    P.jawaban.push({ soalId, benar, hintDipakai, detik, percobaan, tahap: tahap || '', waktu: new Date().toISOString() });
    P.streak = benar ? (P.streak || 0) + 1 : 0;
    simpan();
  }

  // ─────────── Hasil / Ringkasan belajar ───────────
  function layarHasil() {
    const j = P.jawaban;
    const totalHint = j.reduce((a, x) => a + x.hintDipakai, 0);
    const tahap = ['F', 'E', 'I', 'R'].map((k) => {
      const xs = j.filter((x) => x.tahap === k);
      return { k, n: xs.length, b: xs.filter((x) => x.benar).length };
    });
    const NAMA = { F: 'Rumuskan', E: 'Hitung', I: 'Tafsirkan', R: 'Beralasan' };
    tampil(`<header class="kepala"><h1>Ringkasan Belajar</h1></header>
      <section class="kartu"><h2>Skor tes</h2>
        <div class="dua-kolom"><div><p class="kecil">Pre-test</p><p class="skor">${P.preTest ? P.preTest.skor : '–'}</p></div>
        <div><p class="kecil">Post-test</p><p class="skor">${P.postTest ? P.postTest.skor : '–'}</p></div></div>
        ${P.preTest && P.postTest ? `<p>Perubahan: <strong>${P.postTest.skor - P.preTest.skor >= 0 ? '+' : ''}${P.postTest.skor - P.preTest.skor}</strong> poin</p>` : ''}</section>
      <section class="kartu"><h2>Modul</h2><table class="tabel-data"><thead><tr><th>Modul</th><th>Status</th><th>Usaha (1–9)</th></tr></thead><tbody>
        ${K.MODUL.map((m) => `<tr><td>${m.no}. ${esc(m.judul)}</td><td>${statusModul(m.id)}</td><td>${(P.modul[m.id] && P.modul[m.id].skalaUsaha) || '–'}</td></tr>`).join('')}
      </tbody></table></section>
      <section class="kartu"><h2>Soal latihan</h2><p>${j.length} soal dijawab · ${j.filter((x) => x.benar).length} benar pada percobaan pertama · ${totalHint} petunjuk dipakai</p>
        <p class="kecil">Tahap literasi (benar pada percobaan pertama):</p>
        <ul>${tahap.map((t) => `<li>${NAMA[t.k]}: ${t.n ? t.b + ' dari ' + t.n : 'belum ada'}</li>`).join('')}</ul></section>
      <div class="baris-tombol"><button class="tombol kedua" id="csv">Unduh CSV</button><button class="tombol kedua" onclick="window.print()">Cetak / PDF</button></div>`, 'hasil');
    document.getElementById('csv').onclick = unduhCSV;
  }

  function unduhCSV() {
    const sel = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const baris = [['soal_id', 'tahap', 'benar_percobaan_pertama', 'hint_dipakai', 'percobaan', 'detik', 'waktu']]
      .concat(P.jawaban.map((x) => [x.soalId, x.tahap, x.benar ? 1 : 0, x.hintDipakai, x.percobaan, x.detik, x.waktu]));
    baris.push([]);
    baris.push(['pre_test', P.preTest ? P.preTest.skor : '']);
    baris.push(['post_test', P.postTest ? P.postTest.skor : '']);
    K.MODUL.forEach((m) => baris.push(['usaha_' + m.id, (P.modul[m.id] && P.modul[m.id].skalaUsaha) || '']));
    const csv = '﻿' + baris.map((r) => r.map(sel).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'hasil-statistiku.csv';
    document.body.appendChild(a); a.click(); a.remove();
  }

  // ─────────── Pengaturan ───────────
  function layarPengaturan() {
    tampil(`<header class="kepala"><a class="ikon" href="#/beranda" aria-label="Kembali">←</a><h1>Pengaturan</h1></header>
      <section class="kartu"><label class="label" for="nama">Nama panggilan</label>
        <input id="nama" class="input" maxlength="20" value="${esc(P.nama)}"></section>
      <section class="kartu"><p class="label">Ukuran huruf</p><div class="baris-tombol" role="radiogroup">
        ${[['normal', 'Normal'], ['besar', 'Besar'], ['sangat-besar', 'Sangat Besar']].map(([v, t]) =>
          `<button class="pilihan ${P.ukuranHuruf === v ? 'dipilih' : ''}" role="radio" aria-checked="${P.ukuranHuruf === v}" data-v="${v}">${t}</button>`).join('')}</div></section>
      <section class="kartu"><p class="label">Hapus semua data</p><p class="kecil">Progres, skor, dan jawaban akan hilang dari HP ini.</p>
        <button class="tombol bahaya" id="hapus">Hapus semua data</button></section>
      <section class="kartu"><h2>Tentang aplikasi</h2>
        <p>StatistiKu membantu siswa kelas VIII belajar Data dan Diagram Statistika.</p>
        <p class="kecil">Model pembelajaran: <strong>Rigorous Mathematical Thinking</strong> (Kinard & Kozulin, 2008), dengan prinsip beban kognitif (Cognitive Load Theory). Data tersimpan hanya di perangkat ini.</p>
        <p class="kecil">Dibuat oleh Angelita Juliana Siahaan, Pendidikan Matematika FKIP Untirta.</p></section>`, 'beranda');
    document.getElementById('nama').onchange = (e) => { P.nama = e.target.value.trim(); simpan(); };
    $layar.querySelectorAll('[data-v]').forEach((b) => b.onclick = () => {
      P.ukuranHuruf = b.dataset.v; simpan(); terapkanHuruf();
      $layar.querySelectorAll('[data-v]').forEach((x) => { x.classList.toggle('dipilih', x === b); x.setAttribute('aria-checked', String(x === b)); });
    });
    const hapus = document.getElementById('hapus');
    hapus.onclick = () => {
      if (hapus.dataset.yakin) { Storage2.hapus(); P = Storage2.baca(); terapkanHuruf(); pergi('#/'); router(); return; }
      hapus.dataset.yakin = '1'; hapus.textContent = 'Yakin? Ketuk sekali lagi untuk menghapus';
    };
  }

  router();
})();
