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
- [ ] Tambah `.gitignore` dan README awal
- [ ] Putuskan: React+Vite (disarankan) atau HTML murni

## Fase 1 — Fondasi UI
- [ ] Inisialisasi Vite + React + TS + Tailwind
- [ ] Atur token warna/tipografi sesuai DESAIN.md
- [ ] Layout mobile + bilah navigasi bawah
- [ ] Routing: Sambutan, Beranda, Modul, Latihan, Hasil, Pengaturan
- [ ] Komponen UI: Tombol, Kartu, ProgresBar, PanelUmpanBalik
- [ ] Modul `storage.ts` + uji unitnya
- [ ] Pengaturan: nama panggilan, ukuran huruf, hapus data
- [ ] Setup lint, format, Vitest
- **Selesai bila:** aplikasi kosong tapi berpindah layar, tampil rapi di 360 px

## Fase 2 — Grafik & Alat Bantu
- [ ] `stats.ts` (jumlah, modus, selisih, persentase, sudut) + uji
- [ ] Komponen `TabelData`
- [ ] `DiagramBatang` (label langsung, ketuk tampilkan nilai)
- [ ] `DiagramGaris` (penanda awal/akhir, panah waktu)
- [ ] `DiagramLingkaran` (label sektor + persen)
- [ ] `PenandaData` (centang + jumlah berjalan)
- [ ] `KalkulatorMini`
- [ ] `TombolHint` 3 tingkat + pencatatan
- [ ] `LangkahContoh` (langkah demi langkah)
- [ ] Halaman demo komponen (untuk uji visual)
- **Selesai bila:** semua diagram tampil benar dari data JSON dan dapat dibaca di 360 px

## Fase 3 — Konten & Modul
- [ ] Skema JSON modul & soal (lihat ARSITEKTUR.md) + validator
- [ ] Modul 2 (tabel+jumlah) lengkap
- [ ] Modul 4 (garis+perubahan) lengkap
- [ ] Modul 6 (memilih diagram) + komponen Pemilih Diagram
- [ ] Modul 1 (kenalan data)
- [ ] Modul 3 dan 5 (ringkas)
- [ ] Modul 7 (soal literasi 4 tahap) + komponen soal bertahap
- [ ] ±12 soal literasi, hint, penjelasan
- [ ] Skala usaha mental setelah tiap modul
- [ ] Review konten oleh dosen/guru `[VERIFIKASI]`
- **Selesai bila:** siswa dapat menyelesaikan semua modul dari awal sampai akhir

## Fase 4 — Tes, Adaptif, Hasil
- [ ] Pre-test (10 soal) + layar hasil per topik
- [ ] Post-test paralel
- [ ] Rekomendasi modul (`scoring.ts`) + uji
- [ ] Pengurangan scaffolding setelah 3 benar berturut-turut
- [ ] Layar Ringkasan Belajar (skor, topik, hint, waktu, skala usaha)
- [ ] Ekspor CSV dan versi cetak/PDF
- **Selesai bila:** alur sambutan → pre-test → modul → post-test → hasil berjalan penuh

## Fase 5 — PWA, Uji, Rilis
- [ ] vite-plugin-pwa, manifest, ikon, uji offline
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
