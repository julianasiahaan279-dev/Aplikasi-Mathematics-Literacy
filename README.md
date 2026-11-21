# StatistiKu

Aplikasi web pembelajaran matematika materi **Data dan Diagram Statistika** untuk siswa **Kelas VIII SMP, Semester 2**. Dapat dipakai lewat smartphone dan browser.

**Tujuan:** menurunkan beban kognitif (*cognitive load*) siswa agar kemampuan literasi matematis (*mathematical literacy*) meningkat.

> Status: **Versi 0.2: aplikasi bisa dijalankan.** Model pembelajaran **Rigorous Mathematical Thinking (RMT)** + tutor AI **DeepSeek**.

## Latar Belakang
Pre-test (8 November 2026, 10 soal, 2 siswa) menunjukkan skor rata-rata 70. Bagian tersulit adalah menjumlahkan data. Bagian lain yang belum merata: penyajian tabel, diagram garis, membaca perubahan data, dan tujuan penyajian diagram.

## Model Pembelajaran: Rigorous Mathematical Thinking (RMT)
Setiap modul mengikuti 3 fase RMT (lihat [RMT.md](RMT.md)):
1. **Fase I · Mengamati & berpikir**: dimulai dari situasi sehari-hari, siswa mengamati dan membandingkan.
2. **Fase II · Membangun konsep**: siswa menulis dengan bahasanya sendiri, lalu dikenalkan istilah matematika, contoh berlangkah, dan menemukan pola.
3. **Fase III · Berlatih & merefleksi**: latihan, soal literasi 4 tahap, lalu cerminan dan skala usaha mental.

**Tutor AI (DeepSeek)** berperan sebagai *mediator*: memberi pertanyaan pemandu, tidak langsung memberi jawaban.

## Fitur (MVP)
- Materi dalam kartu kecil (satu ide per layar)
- Contoh soal berlangkah
- Diagram interaktif: tabel, batang, garis, lingkaran
- Pemilih diagram (tujuan ↔ jenis diagram)
- Soal literasi 4 tahap: Formulating, Employing, Interpreting/Evaluating, Reasoning
- Alat bantu hitung, petunjuk (hint) 3 tingkat
- Pre-test dan post-test, ringkasan belajar
- Bisa dipakai offline (PWA)

## Dokumen Perencanaan
| File | Isi |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Aturan kerja untuk Claude Code |
| [RMT.md](RMT.md) | Ringkasan model Rigorous Mathematical Thinking |
| [PRD.md](PRD.md) | Kebutuhan produk dan fitur |
| [PEDAGOGI_CLT.md](PEDAGOGI_CLT.md) | Teori beban kognitif dan literasi matematis |
| [DESAIN.md](DESAIN.md) | Desain antarmuka |
| [ARSITEKTUR.md](ARSITEKTUR.md) | Teknologi dan struktur kode |
| [KONTEN_MATERI.md](KONTEN_MATERI.md) | Materi dan bank soal |
| [ROADMAP_TASKS.md](ROADMAP_TASKS.md) | Fase dan daftar tugas |
| [TESTING_EVALUASI.md](TESTING_EVALUASI.md) | Pengujian dan evaluasi |

## Teknologi
HTML + CSS + JavaScript murni (alternatif yang disebut di ARSITEKTUR.md: tanpa proses build, tanpa paket tambahan), grafik SVG buatan sendiri, localStorage. Satu-satunya bagian server adalah `api/chat.js` untuk tutor AI, supaya API key DeepSeek tidak pernah masuk ke browser.

## Struktur File
```
index.html          halaman utama
css/style.css       tampilan (token warna DESAIN.md)
js/content.js       isi modul & soal (RMT)  ← ubah materi di sini
js/charts.js        diagram tabel/batang/garis/lingkaran (SVG)
js/app.js           layar & alur belajar
js/tutor.js         jendela chat tutor
js/storage.js       simpan progres di HP
api/chat.js         endpoint /api/chat untuk Vercel
api/_tutor.js       system prompt tutor (RMT) + panggilan DeepSeek
server.js           server lokal untuk mencoba di laptop
.env                API key (RAHASIA, tidak diunggah ke GitHub)
```

## Cara Menjalankan di Laptop
Syarat: **Node.js** versi 18 ke atas (unduh versi LTS di nodejs.org).
1. Buat file `.env` berisi `DEEPSEEK_API_KEY=sk-...` (contoh ada di `.env.example`).
2. Buka Terminal di folder ini, ketik:
   ```
   npm start
   ```
3. Buka browser ke **http://localhost:3000**. Tekan `Ctrl + C` di Terminal untuk berhenti.

Tanpa Node.js, `index.html` tetap bisa dibuka langsung (klik dua kali), tetapi tutor AI tidak aktif.

## Online (Vercel)
1. Unggah ke GitHub (file `.env` otomatis tidak ikut karena ada di `.gitignore`).
2. Di vercel.com: **Add New → Project → Import** repo ini → **Deploy** (tidak perlu pengaturan build).
3. Di **Settings → Environment Variables**, tambahkan `DEEPSEEK_API_KEY` lalu **Redeploy**.

## Catatan Konten
Soal bertanda `// TODO-VERIFIKASI` di `js/content.js` adalah soal baru dan perlu diperiksa. Teks pre-test perlu disamakan dengan soal asli di Google Form.

## Tautan Demo
https://statistiku.vercel.app

Aplikasi bisa dipasang seperti aplikasi biasa (PWA) dan tetap bisa dibuka saat offline. Catatan: tutor AI butuh koneksi internet dan saldo API DeepSeek, jadi bisa saja sedang tidak aktif.

## Pembuat
Angelita Juliana Siahaan (2225250112)
Pendidikan Matematika, FKIP, Universitas Sultan Ageng Tirtayasa, 2026
Dosen pengampu: Dr. Aan Hendrayana, S.Si., M.Pd.
