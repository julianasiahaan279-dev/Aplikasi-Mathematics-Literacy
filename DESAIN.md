# DESAIN.md — Desain Antarmuka & Pengalaman Pengguna

Acuan: PEDAGOGI_CLT.md (alasan), PRD.md (fitur). Prinsip utama: **tenang, jelas, sedikit elemen**.

## 1. Prinsip Desain
1. **Satu layar = satu tujuan.** Satu tombol utama yang jelas.
2. **Grafik adalah pusat.** Diagram ≥ 50% tinggi layar pada soal.
3. **Teks pendek**, ukuran besar, spasi lega.
4. **Tanpa dekorasi** yang tidak membantu belajar (coherence principle).
5. **Umpan balik hangat**, tidak menghakimi ("Hampir tepat, coba lihat lagi angka awalnya").
6. **Sentuhan dulu**: semua dapat dilakukan dengan jempol satu tangan.

## 2. Gaya Visual

### Warna (token CSS/Tailwind)
| Token | Hex | Pemakaian |
|---|---|---|
| `bg` | #F8FAFC | Latar halaman |
| `surface` | #FFFFFF | Kartu |
| `ink` | #1E293B | Teks utama |
| `muted` | #64748B | Teks pendukung |
| `primary` | #2563EB | Tombol utama, tautan |
| `primary-dark` | #1D4ED8 | Tekan/hover |
| `success` | #16A34A | Benar |
| `warn` | #D97706 | Petunjuk/hampir benar |
| `error` | #DC2626 | Salah (pakai hemat; lembut) |
| `focus` | #FACC15 | Sorot/highlight data |

**Palet data (ramah buta warna, 5 kategori)** — selalu tambahkan pola/label:
`#2563EB` biru, `#F59E0B` oranye, `#10B981` hijau, `#8B5CF6` ungu, `#64748B` abu.
Semua teks harus memenuhi kontras ≥ 4,5:1.

### Tipografi
- Font sistem: `Inter`, `system-ui`, `sans-serif` (bila offline, pakai font sistem).
- Dasar 16 px; teks soal 18 px; judul 22–28 px; angka pada diagram 14–16 px minimum.
- Tinggi baris 1,5. Hindari huruf semua kapital panjang.

### Bentuk
- Sudut kartu 16 px; tombol 12 px; bayangan sangat tipis.
- Spasi kelipatan 4 px (4, 8, 12, 16, 24, 32).
- Target sentuh ≥ 44×44 px.

## 3. Layout
- Kolom tunggal, lebar maksimal 480 px di tengah pada desktop (tampilan "ponsel di tengah layar") atau 2 kolom (materi + diagram) di ≥ 1024 px.
- Gutter samping 16 px.
- Bilah navigasi bawah (4 item): **Beranda · Belajar · Latihan · Hasil**.
- Tombol aksi utama menempel di bawah (jangkauan jempol), di atas bilah navigasi.

## 4. Peta Layar
1. **Sambutan** — logo, nama panggilan opsional, "Mulai".
2. **Pre-test** — satu soal per layar, penanda progres (3/10), tanpa waktu menekan.
3. **Hasil Pre-test** — ringkasan: topik kuat/perlu latihan.
4. **Beranda (Peta Belajar)** — daftar modul sebagai jalur vertikal; modul disarankan diberi tanda.
5. **Modul** — kartu konsep → contoh berlangkah → coba bersama → mandiri → cerminan.
6. **Layar Soal Literasi** — konteks + data di atas, pertanyaan tahap saat ini di bawah, tab tahap (F · E · I · R).
7. **Pemilih Diagram** — kartu tujuan + pilihan diagram, seret/ketuk.
8. **Hasil/Ringkasan Belajar** — skor, grafik perkembangan, topik lemah, ekspor.
9. **Post-test**.
10. **Pengaturan** — nama, ukuran huruf, hapus data, tentang aplikasi.

## 5. Komponen Utama

| Komponen | Perilaku |
|---|---|
| **KartuKonsep** | Judul 1 baris, ≤ 3 kalimat, 1 gambar/diagram; tombol "Lanjut" |
| **LangkahContoh** | Langkah muncul satu per satu; langkah sebelumnya tetap terlihat tetapi redup; tombol "Langkah berikutnya" |
| **DiagramBatang / Garis / Lingkaran / Tabel** | Dibuat dari data (SVG); label langsung pada elemen; ketuk elemen → tooltip nilai besar; dapat menyorot data tertentu |
| **PenandaData** | Daftar data dengan kotak centang; jumlah berjalan ditampilkan ("5 + 8 = 13") |
| **KalkulatorMini** | Opsional, muncul dari ikon; angka besar |
| **TombolHint** | 3 tingkat: ① Arahan ② Petunjuk langkah ③ Contoh serupa; hitung pemakaian |
| **PanelUmpanBalik** | Muncul dari bawah; ikon + 1 kalimat + penjelasan singkat; tombol "Coba lagi"/"Lanjut" |
| **ProgresBar** | Tipis di atas; teks "Langkah 2 dari 5" |
| **SkalaUsaha** | Skala 1–9 dengan emoji wajah, setelah modul |
| **Lencana** | Sederhana, hanya penanda selesai (bukan kompetisi) |

## 6. Pola Interaksi Penting

### Soal Literasi 4 Tahap
```
[Konteks + Diagram (tetap terlihat, bisa dilipat)]
[Tab: ① Rumuskan  ② Hitung  ③ Tafsirkan  ④ Beralasan]  (tahap terkunci sampai yang sebelumnya selesai)
[Pertanyaan tahap saat ini]
[Jawaban: pilihan ganda / isian angka / seret-jatuhkan]
[Hint ?]   [Periksa]
```

### Penjumlahan Data (menjawab temuan soal 6)
Daftar angka dari diagram muncul sebagai chip: `5  8  4  3`. Siswa mengetuk satu per satu → jumlah berjalan terlihat → hasil akhir diisi/dikonfirmasi.

### Membaca Perubahan (menjawab temuan soal 9)
Garis dengan penanda titik awal (hijau, "Awal: 10") dan titik akhir (biru, "Akhir: 15"), panah waktu →. Pertanyaan pemandu bertahap.

### Pemilih Diagram (menjawab soal 2, 4, 10)
Kartu tujuan: "Melihat perubahan dari waktu ke waktu" → siswa memilih ikon diagram. Umpan balik menunjukkan alasan.

## 7. Umpan Balik & Tulisan Antarmuka (nada suara)
- Ramah, sapaan "kamu".
- Benar: "Tepat! Kamu membaca angkanya dengan teliti."
- Salah: "Belum tepat. Coba lihat lagi bagian ini." (sorot bagian terkait)
- Hint tidak memberi jawaban langsung kecuali tingkat 3.
- Hindari kata "salah!" dengan warna merah menyala; gunakan nada netral.

## 8. Aksesibilitas
- Kontras ≥ 4,5:1; fokus terlihat; navigasi keyboard di desktop.
- Semua diagram punya teks alternatif/ringkasan ("Diagram batang: Senin 5, Selasa 8 …").
- Warna bukan satu-satunya pembeda (tambahkan pola garis/titik atau label).
- Pengaturan ukuran huruf (Normal / Besar / Sangat Besar).
- Hormati `prefers-reduced-motion`.
- Atribut `lang="id"`.

## 9. Gerak (Animasi)
Hanya untuk fungsi: transisi kartu 150–200 ms, munculnya langkah, penyorotan data. Tidak ada animasi dekoratif atau yang berulang.

## 10. Wireframe Teks (contoh Beranda)
```
┌────────────────────────┐
│ Halo, Dina!            │
│ Lanjutkan belajarmu    │
│ ┌────────────────────┐ │
│ │ ▶ Modul 3: Diagram │ │
│ │   Garis  (disarankan)│ │
│ │   [ Lanjut ]       │ │
│ └────────────────────┘ │
│ ✔ Modul 1: Data        │
│ ✔ Modul 2: Tabel       │
│ ● Modul 3: Diagram Garis│
│ ○ Modul 4: Diagram Lingkaran│
│ ○ Modul 5: Memilih Diagram │
│ ○ Modul 6: Soal Cerita │
├────────────────────────┤
│ Beranda Belajar Latihan Hasil │
└────────────────────────┘
```

## 11. Daftar Periksa Desain (sebelum rilis)
- [ ] Tampil baik di 360 px
- [ ] Tidak ada layar dengan > 1 tombol utama
- [ ] Setiap diagram berlabel langsung
- [ ] Kontras lolos
- [ ] Tidak ada elemen dekoratif tanpa fungsi
- [ ] Teks ≤ batas kata per kartu
