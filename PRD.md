# PRD — Product Requirements Document

**Produk:** StatistiKu — aplikasi web pembelajaran Data dan Diagram Statistika (Kelas VIII, Semester 2)
**Versi dokumen:** 0.1 (draf perencanaan)
**Tanggal:** 13 November 2026

---

## 1. Latar Belakang
Pre-test (8 November 2026, 10 soal pilihan ganda, 2 siswa) menunjukkan skor rata-rata 70. Temuan utama:

| Topik | Ketercapaian | Catatan |
|---|---|---|
| Pengertian data, diagram batang, diagram lingkaran, membaca nilai terbanyak/paling sedikit | 100% | Dikuasai |
| Penyajian data dalam tabel | 50% | S02 memilih diagram batang |
| Diagram garis | 50% | S02 memilih diagram lingkaran (tertukar dengan jenis diagram lain) |
| Menjumlahkan data (5+8+4+3=20) | **0%** | Jawaban 21 dan 18, dugaan salah hitung |
| Membaca perubahan data | 50% | S01 menjawab "penurunan" padahal naik 10 → 15 |
| Tujuan penyajian diagram | 50% | S01 salah memahami tujuan |

**Interpretasi awal (hipotesis, perlu dikonfirmasi wawancara):**
1. Kesulitan tidak seragam antar siswa → aplikasi perlu **jalur adaptif**.
2. Kesalahan hitung sederhana pada soal berbentuk cerita → beban kognitif tinggi saat harus **membaca + menghitung sekaligus**.
3. Kesalahan memilih jenis diagram dan membaca arah perubahan → siswa belum kuat **mengaitkan tujuan dengan jenis penyajian**.

> Keterbatasan: n = 2 siswa; hasil bersifat deskriptif, tidak dapat digeneralisasi.

## 2. Tujuan Produk
**Tujuan utama:** Membantu siswa kelas VIII menguasai data dan diagram statistika sambil **mengurangi beban kognitif**, sehingga **literasi matematis** meningkat.

**Tujuan terukur (untuk evaluasi tugas):**
- G1. Skor post-test siswa uji ≥ skor pre-test (target: naik minimal 10 poin).
- G2. Siswa dapat menyelesaikan satu modul tanpa bantuan peneliti.
- G3. Skor kemudahan penggunaan (skala 1–5) ≥ 4.
- G4. Aplikasi memuat < 3 detik di smartphone biasa dan dapat dipakai offline setelah kunjungan pertama.

## 3. Pengguna
**Utama:** Siswa SMP kelas VIII (±13–14 tahun), memakai smartphone Android (layar kecil, koneksi terbatas), literasi digital dasar.
**Sekunder:** Guru/dosen penilai (melihat ringkasan hasil lewat layar "Ringkasan Belajar" dan dapat mengekspor hasil).

**Persona singkat:** *Dina, 14 tahun*, belajar sore hari lewat HP, mudah bingung jika soal panjang, cepat mengerti jika ada gambar, takut salah.

## 4. Ruang Lingkup

### 4.1 MVP (wajib)
| ID | Fitur | Deskripsi singkat | Prioritas |
|---|---|---|---|
| F1 | Beranda & peta belajar | Daftar modul, status selesai, tombol "Lanjut" | Must |
| F2 | Modul materi bertahap | Konsep dalam kartu-kartu kecil (satu ide per kartu) | Must |
| F3 | Contoh berlangkah (worked example) | Contoh soal dengan langkah muncul satu per satu | Must |
| F4 | Visualisasi interaktif | Tabel, diagram batang, garis, lingkaran yang bisa disentuh/diubah | Must |
| F5 | Pemilih diagram (diagram chooser) | Latihan menghubungkan tujuan penyajian ↔ jenis diagram | Must |
| F6 | Soal literasi bertahap | Soal konteks dengan 4 tahap (lihat PEDAGOGI_CLT.md) | Must |
| F7 | Alat bantu hitung | Kalkulator sederhana + penanda data (centang) agar tidak salah jumlah | Must |
| F8 | Umpan balik & petunjuk (hint) | Hint berjenjang 3 level, penjelasan setelah menjawab | Must |
| F9 | Pre-test & Post-test | Soal diagnostik awal & akhir, hasil disimpan lokal | Must |
| F10 | Jalur adaptif sederhana | Rekomendasi modul berdasar kesalahan pre-test/latihan | Should |
| F11 | Ringkasan belajar | Skor, topik kuat/lemah, ekspor PDF/CSV | Should |
| F12 | PWA / offline | Bisa dipasang ke layar utama dan dipakai tanpa internet | Should |

### 4.2 Di luar MVP (nanti)
Akun & sinkronisasi cloud, dasbor guru multi-siswa, gamifikasi (lencana/papan peringkat), mode gelap penuh, bahasa daerah, suara/narasi.

### 4.3 Tidak dibuat
Iklan, pelacakan perilaku, chat antar siswa, pengumpulan data pribadi.

## 5. Alur Pengguna Utama
1. Buka aplikasi → layar sambutan singkat (tanpa login; isi nama panggilan opsional).
2. Pre-test diagnostik (opsional diulang) → ringkasan kekuatan/kelemahan.
3. Beranda menampilkan modul yang disarankan.
4. Masuk modul: **Kartu konsep → Contoh berlangkah → Coba sendiri (dibantu) → Latihan mandiri → Cerminan singkat**.
5. Selesai modul → lencana/tanda selesai → lanjut modul berikutnya.
6. Setelah semua modul → Post-test → ringkasan belajar.

## 6. Kebutuhan Fungsional (ringkas)
- FR1. Aplikasi menyimpan progres, skor, dan riwayat jawaban di perangkat.
- FR2. Setiap soal memiliki: teks, data/diagram, tahap literasi, kunci, hint 1–3, penjelasan, topik.
- FR3. Hint dibuka bertahap; pemakaian hint dicatat.
- FR4. Diagram dihasilkan dari data (bukan gambar statis) sehingga dapat diubah.
- FR5. Setiap layar dapat dioperasikan dengan sentuhan (target tombol ≥ 44×44 px).
- FR6. Siswa dapat mengulang modul dan soal kapan saja.
- FR7. Ekspor hasil ke file (CSV/PDF) untuk laporan tugas.

## 7. Kebutuhan Non-Fungsional
- **Performa:** muat awal < 3 detik pada 4G; ukuran total < 1 MB (tanpa gambar berat).
- **Kompatibilitas:** Chrome/Firefox/Safari terbaru; Android 8+ dan iOS 14+; lebar layar 320 px ke atas.
- **Aksesibilitas:** kontras teks ≥ 4,5:1; ukuran font dasar ≥ 16 px; jangan memakai warna saja untuk membedakan data (tambah pola/label).
- **Privasi:** tanpa data pribadi; hanya nama panggilan opsional di perangkat.
- **Keandalan:** tidak kehilangan progres saat tab ditutup.
- **Kemudahan pemeliharaan:** konten (soal, materi) dalam file data terpisah dari kode.

## 8. Metrik Keberhasilan
| Metrik | Cara ukur | Target |
|---|---|---|
| Peningkatan skor | Post-test − pre-test | ≥ +10 poin |
| Penyelesaian modul | Modul selesai / dimulai | ≥ 80% |
| Penggunaan hint | Rata-rata hint per soal | Dipantau (turun seiring waktu) |
| Kemudahan penggunaan | Kuesioner 1–5 | ≥ 4 |
| Beban mental yang dirasakan | Skala 1–9 "seberapa sulit usaha mental?" per modul | Turun dari modul awal ke akhir |

## 9. Asumsi & Risiko
| Risiko | Dampak | Mitigasi |
|---|---|---|
| Sampel sangat kecil | Bukti terbatas | Nyatakan sebagai uji coba awal; tambah siswa bila bisa |
| Penyebab kesalahan siswa belum dikonfirmasi | Fitur salah sasaran | Wawancara lanjutan sebelum Fase 3 |
| Pembuat baru belajar coding | Jadwal molor | Fase kecil, MVP ketat, pakai Claude Code bertahap |
| Layar kecil membuat diagram sulit dibaca | Beban kognitif naik | Diagram besar, label langsung, zoom/scroll terbatas |
| Siswa tidak punya kuota | Tidak bisa akses | PWA offline |

## 10. Pertanyaan Terbuka (jawab sebelum Fase 2)
1. Nama aplikasi final?
2. Apakah soal di SPADA (arahan dosen) akan memakai soal yang sama dengan di aplikasi?
3. Berapa siswa yang akan menguji aplikasi, dan bagaimana cara pengujiannya (tatap muka/daring)?
4. Apakah perlu mode guru sederhana (lihat hasil banyak siswa) pada versi akhir tugas?
5. Dosen meminta rancangan + GitHub: apakah demo yang bisa dijalankan wajib, atau rancangan saja cukup?

## 11. Keterkaitan Arahan Dosen
- Rancangan aplikasi → PRD, DESAIN, ARSITEKTUR.
- Unggah ke GitHub → ROADMAP Fase 0 dan 5.
- Soal mathematical literacy (Formulating, Employing, Interpreting/Evaluating, Mathematical Reasoning) → KONTEN_MATERI.md dan F6.
