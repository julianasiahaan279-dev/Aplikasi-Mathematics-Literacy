# TESTING_EVALUASI.md — Pengujian & Evaluasi

Dua jenis: **(A) uji teknis** (aplikasi berfungsi) dan **(B) evaluasi pembelajaran** (aplikasi membantu belajar dan menurunkan beban kognitif).

## A. Uji Teknis

### A1. Uji Unit (Vitest)
| Modul | Yang diuji |
|---|---|
| `stats.ts` | jumlah 5+8+4+3 = 20; modus; selisih 15−10 = 5; persen; sudut sektor jumlah = 360° |
| `scoring.ts` | skor 7 benar = 70; persen per topik; rekomendasi modul |
| `storage.ts` | simpan/baca/migrasi versi/hapus; tangani localStorage penuh/tidak tersedia |
| `export.ts` | format CSV benar, karakter koma/tanda kutip aman |

### A2. Uji Komponen
- Diagram menampilkan jumlah elemen sesuai data; label benar.
- Hint naik 1 → 2 → 3 dan tercatat.
- Tahap literasi terkunci sampai tahap sebelumnya selesai.
- PenandaData menjumlah berjalan dengan benar.

### A3. Daftar Uji Manual
| # | Skenario | Hasil diharapkan |
|---|---|---|
| 1 | Buka pertama kali | Sambutan tampil < 3 detik |
| 2 | Ikuti pre-test sampai selesai | Skor & ringkasan topik benar |
| 3 | Tutup tab di tengah modul, buka lagi | Progres tetap |
| 4 | Jawab salah 3 kali | Hint muncul bertahap, penjelasan keluar |
| 5 | Putar layar (portrait/landscape) | Layout tidak rusak |
| 6 | Mode pesawat setelah kunjungan pertama | Aplikasi tetap jalan |
| 7 | Ukuran huruf "Sangat Besar" | Tidak ada teks terpotong |
| 8 | Hapus data | Semua progres hilang, kembali ke sambutan |
| 9 | Ekspor CSV | File terbuka di Excel/Sheets dengan benar |
| 10 | Browser: Chrome Android, Safari iOS, Chrome desktop | Tampil dan berfungsi |

### A4. Kualitas Otomatis
- `npm run lint` tanpa galat; `npm run build` berhasil.
- Lighthouse: Performa ≥ 90, Aksesibilitas ≥ 95, PWA lulus.
- Uji kontras warna (≥ 4,5:1).
- Uji layar 320, 360, 390, 768, 1280 px.

### A5. Kriteria "Selesai" per Fitur
Fitur dianggap selesai bila: sesuai PRD, lolos uji terkait, tampil baik di 360 px, tidak ada galat konsol, dan tertera di ROADMAP (dicentang).

---

## B. Evaluasi Pembelajaran

### B1. Desain Sederhana
Pre-test (sudah ada, 8 Nov 2026) → pakai aplikasi → post-test → kuesioner → wawancara singkat.

> Jumlah siswa kecil (saat ini 2). Hasil bersifat **deskriptif/studi kasus**; tidak ada uji statistik inferensial. Bila memungkinkan tambah partisipan (target 5–10).

### B2. Instrumen
| Instrumen | Isi | Kapan |
|---|---|---|
| Pre-test | 10 soal diagnostik | Sebelum (selesai) |
| Post-test | 10 soal paralel | Sesudah |
| Skala usaha mental (Paas, 1–9) | "Seberapa besar usaha mentalmu?" | Setiap akhir modul |
| Kuesioner kegunaan | 8–10 pernyataan skala 1–5 | Sesudah |
| Wawancara | 5–8 pertanyaan terbuka | Sesudah (dan sebelum desain konten untuk konfirmasi) |
| Log aplikasi | waktu, hint, percobaan per soal | Otomatis |

### B3. Kuesioner Kegunaan (draf, skala 1 = sangat tidak setuju … 5 = sangat setuju)
1. Aplikasi mudah dipakai.
2. Tulisan mudah dibaca di HP.
3. Penjelasan langkah demi langkah membantu saya.
4. Gambar/diagram membantu saya memahami soal.
5. Saya tidak bingung harus menekan apa.
6. Petunjuk (hint) membantu tanpa langsung memberi jawaban.
7. Saya merasa lebih paham diagram setelah memakai aplikasi.
8. Saya mau memakai aplikasi ini lagi.
Pertanyaan terbuka: bagian paling membantu? bagian paling membingungkan? saran?

### B4. Panduan Wawancara (konfirmasi penyebab kesalahan)
1. Soal 6: "Ceritakan bagaimana kamu menghitung jumlahnya." (cek salah hitung vs salah baca)
2. Soal 2/4: "Mengapa kamu memilih diagram itu? Kapan memakai diagram garis?"
3. Soal 9: "Bagaimana kamu memutuskan naik atau turun?"
4. Soal 10: "Menurutmu diagram dibuat untuk apa?"
5. "Bagian mana dari soal cerita yang paling membuatmu bingung/capek berpikir?"
6. "Apa yang membantumu saat memakai aplikasi? Apa yang mengganggu?"
Catat jawaban pada tabel: pertanyaan, jawaban, temuan, implikasi desain.

### B5. Cara Menganalisis
- **Peningkatan skor:** post − pre per siswa dan per topik.
- **Tren beban kognitif:** skala usaha per modul (turun/tetap/naik) dikaitkan dengan waktu dan hint.
- **Pola kesalahan:** bandingkan kesalahan pre-test vs post-test per topik (khususnya soal 2, 4, 6, 9, 10).
- **Literasi:** proporsi benar per tahap (F, E, I, R) — tahap mana yang paling sulit?
- **Kegunaan:** rata-rata skor kuesioner dan catatan wawancara.
- Laporkan apa adanya, termasuk temuan negatif, dan sebutkan keterbatasan.

### B6. Kriteria Keberhasilan (sesuai PRD)
- Skor post-test ≥ pre-test, target +10 poin.
- Modul dapat diselesaikan tanpa bantuan peneliti.
- Kuesioner kegunaan rata-rata ≥ 4.
- Skala usaha mental tidak naik dari modul awal ke akhir pada konten setara.

### B7. Etika
- Minta izin siswa dan orang tua/guru; jelaskan tujuan.
- Gunakan kode (S01, S02), bukan nama.
- Siswa boleh berhenti kapan saja.
- Simpan data hanya untuk tugas; jangan unggah data pribadi ke GitHub.
- Tangkapan layar dokumentasi: pastikan wajah/nama pihak lain disamarkan.

## C. Templat Catatan Uji
```
Tanggal:        Penguji:        Perangkat/Browser:
Fitur diuji:
Langkah:
Hasil sebenarnya:
Hasil diharapkan:
Status: [Lulus/Gagal]    Tingkat: [Rendah/Sedang/Tinggi]
Tindak lanjut:
```

## D. Catatan untuk Laporan Pre-test yang Ada
Beberapa hal pada laporan pre-test perlu dirapikan sebelum dipakai sebagai dasar laporan akhir:
- Kolom "Pelaksana" masih kosong.
- Kolom "Kelas" siswa berbeda (8 dan 7) padahal materi Kelas VIII; jelaskan atau perbaiki kriteria sampel.
- Bagian G (dokumentasi) memuat tangkapan layar pertemuan daring dengan nama peserta; samarkan bila dipublikasikan.
- Ketuntasan (skor 70) belum dikaitkan dengan KKM/kriteria; tambahkan bila diminta dosen.
