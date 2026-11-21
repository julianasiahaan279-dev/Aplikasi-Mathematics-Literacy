# ROADMAP_TASKS.md — Fase dan Daftar Tugas

Aturan: kerjakan **satu fase** per sesi. Centang `[x]` bila selesai. Claude Code membaca file ini untuk menentukan langkah berikutnya.

## Ringkasan Fase
| Fase | Nama | Hasil |
|---|---|---|
| 0 | Persiapan & Repo | Repo GitHub, dokumen perencanaan, tooling |
| 1 | Fondasi UI | Proyek jalan, desain token, komponen dasar, navigasi |
| 2 | Grafik & Alat Bantu | Komponen diagram SVG, penanda data, hint |
| 3 | Konten & Modul | Modul 1–7 dan bank soal |
| 4 | Tes, Adaptif, Hasil | Pre/post-test, rekomendasi, ringkasan, ekspor |
| 5 | PWA, Uji, Rilis | Offline, uji siswa, deploy, dokumentasi |

## Fase 0 — Persiapan
- [x] Susun CLAUDE.md, PRD.md, DESAIN.md, ARSITEKTUR.md, KONTEN_MATERI.md, PEDAGOGI_CLT.md, ROADMAP_TASKS.md, TESTING_EVALUASI.md
- [ ] Review dokumen bersama dosen/teman; jawab "Pertanyaan Terbuka" di PRD.md
- [ ] Pasang Node.js (LTS), Git, VS Code, Claude Code
- [ ] Buat repo GitHub `statistiku`, unggah dokumen perencanaan
- [x] Tambah `.gitignore` dan README awal
- [x] Putuskan: React+Vite (disarankan) atau HTML murni

## Fase 1 — Fondasi UI
- [ ] Inisialisasi Vite + React + TS + Tailwind
- [x] Atur token warna/tipografi sesuai DESAIN.md
- [x] Layout mobile + bilah navigasi bawah
- [ ] Routing: Sambutan, Beranda, Modul, Latihan, Hasil, Pengaturan
- [ ] Komponen UI: Tombol, Kartu, ProgresBar, PanelUmpanBalik
- [ ] Modul `storage.ts` + uji unitnya
- [x] Pengaturan: nama panggilan, ukuran huruf, hapus data
- [ ] Setup lint, format, Vitest
- **Selesai bila:** aplikasi kosong tapi berpindah layar, tampil rapi di 360 px

## Fase 2 — Grafik & Alat Bantu
- [ ] `stats.ts` (jumlah, modus, selisih, persentase, sudut) + uji
- [x] Komponen `TabelData`
- [x] `DiagramBatang` (label langsung, ketuk tampilkan nilai)
- [x] `DiagramGaris` (penanda awal/akhir, panah waktu)
- [x] `DiagramLingkaran` (label sektor + persen)
- [x] `PenandaData` (centang + jumlah berjalan)
- [ ] `KalkulatorMini`
- [x] `TombolHint` 3 tingkat + pencatatan
- [x] `LangkahContoh` (langkah demi langkah)
- [ ] Halaman demo komponen (untuk uji visual)
- **Selesai bila:** semua diagram tampil benar dari data JSON dan dapat dibaca di 360 px

## Fase 3 — Konten & Modul
- [ ] Skema JSON modul & soal (lihat ARSITEKTUR.md) + validator
- [x] Modul 2 (tabel+jumlah) lengkap
- [x] Modul 4 (garis+perubahan) lengkap
- [x] Modul 6 (memilih diagram) + komponen Pemilih Diagram
- [x] Modul 1 (kenalan data)
- [x] Modul 3 dan 5 (ringkas)
- [x] Modul 7 (soal literasi 4 tahap) + komponen soal bertahap
- [ ] ±12 soal literasi, hint, penjelasan
- [x] Skala usaha mental setelah tiap modul
- [ ] Review konten oleh dosen/guru `[VERIFIKASI]`
- **Selesai bila:** siswa dapat menyelesaikan semua modul dari awal sampai akhir

## Fase 4 — Tes, Adaptif, Hasil
- [x] Pre-test (10 soal) + layar hasil per topik
- [x] Post-test paralel
- [ ] Rekomendasi modul (`scoring.ts`) + uji
- [x] Pengurangan scaffolding setelah 3 benar berturut-turut
- [x] Layar Ringkasan Belajar (skor, topik, hint, waktu, skala usaha)
- [x] Ekspor CSV dan versi cetak/PDF
- **Selesai bila:** alur sambutan → pre-test → modul → post-test → hasil berjalan penuh

## Fase 5 — PWA, Uji, Rilis
- [x] PWA: manifest, service worker, ikon, uji offline (HTML murni, tanpa vite-plugin-pwa)
- [ ] Audit Lighthouse (Performa ≥ 90, Aksesibilitas ≥ 95)
- [ ] Uji kegunaan dengan siswa (lihat TESTING_EVALUASI.md)
- [ ] Perbaiki temuan uji
- [ ] GitHub Actions deploy ke Pages
- [ ] README lengkap (tujuan, cara pakai, tangkapan layar, tautan demo)
- [ ] Laporan akhir (hasil pre/post-test, refleksi)
- **Selesai bila:** tautan publik berfungsi, laporan siap dikumpulkan

## Urutan Kerja Disarankan Bila Waktu Terbatas
Minimal yang harus ada: Fase 0 → 1 → 2 (tabel, batang, garis) → Modul 2, 4, 6 → pre/post-test → deploy.
Lainnya ditunda.

## Catatan Sesi (isi tiap akhir sesi)
| Tanggal | Yang dikerjakan | Masalah | Berikutnya |
|---|---|---|---|
| 13 Nov 2026 | Perencanaan (8 dokumen) | — | Review & Fase 0 |
| 18 Nov 2026 | Versi 0.2: HTML murni, 7 modul alur RMT, pre/post-test, hasil + CSV, tutor AI DeepSeek (`api/chat.js`) | Teks pre-test asli belum disalin; soal baru perlu verifikasi | Verifikasi konten, PWA, deploy Vercel, uji siswa |
| 21 Nov 2026 | Deploy Vercel (statistiku.vercel.app), PWA offline + ikon | Tutor AI belum jalan (saldo DeepSeek kosong) | Verifikasi konten, uji siswa, README lengkap, laporan |
