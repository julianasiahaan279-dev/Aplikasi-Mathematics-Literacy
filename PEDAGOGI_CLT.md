# PEDAGOGI — Cognitive Load Theory & Literasi Matematis → Fitur

Dokumen ini menjadi dasar alasan di balik setiap fitur. Jika fitur tidak punya alasan di sini, tidak perlu dibuat.

## 1. Cognitive Load Theory (Sweller) — Ringkas
Memori kerja siswa terbatas. Beban total = **intrinsik + ekstrinsik + germane**.

| Jenis | Arti | Tujuan desain |
|---|---|---|
| Intrinsik | Kesulitan bawaan materi dan banyaknya elemen yang harus diproses bersamaan | **Atur** (pecah, urutkan) |
| Ekstrinsik | Beban akibat cara penyajian yang buruk | **Kurangi** (sederhanakan) |
| Germane | Usaha untuk membangun pemahaman/skema | **Dorong** (refleksi, hubungan antar konsep) |

## 2. Prinsip CLT → Fitur Aplikasi

| Prinsip | Penjelasan | Penerapan di aplikasi |
|---|---|---|
| Segmenting | Pecah materi jadi bagian kecil | Kartu konsep, satu ide per layar |
| Pre-training | Pelajari istilah dahulu | Kartu "Kenalan dengan istilah" sebelum soal (data, tabel, sumbu, frekuensi, sektor) |
| Worked example effect | Contoh berlangkah mengurangi beban | F3: langkah muncul satu per satu, siswa menekan "Lanjut" |
| Completion / fading | Dari contoh penuh → sebagian → mandiri | Urutan: contoh penuh → soal dengan 1–2 langkah kosong → soal mandiri |
| Split-attention | Teks dan gambar terpisah membebani | Label langsung di diagram, keterangan menempel pada elemen, bukan di legenda jauh |
| Modality / Redundancy | Jangan menulis hal sama dua kali | Teks pendek; jangan mengulang isi diagram dalam paragraf |
| Coherence | Buang yang tidak perlu | Tanpa dekorasi, animasi, musik, atau fakta menarik yang tidak terkait |
| Signaling | Beri petunjuk fokus | Sorot (highlight) bagian data yang dibahas; panah/penanda |
| Expertise reversal | Bantuan berlebih mengganggu yang sudah paham | Hint opsional; jalur adaptif mengurangi scaffolding saat siswa benar berturut-turut |
| Offloading | Alihkan perhitungan rutin | F7: alat bantu jumlah (centang tiap data), kalkulator opsional agar fokus pada penalaran |
| Interaktivitas elemen | Kurangi elemen yang diingat bersamaan | Data tetap terlihat saat siswa menjawab (tidak perlu menggulir bolak-balik) |

## 3. Pemetaan Temuan Pre-test → Strategi

| Temuan | Dugaan penyebab (beban kognitif) | Strategi |
|---|---|---|
| Soal 6: menjumlahkan 5+8+4+3 salah (21, 18) | Soal cerita: membaca + mengingat angka + menghitung sekaligus → memori kerja penuh | Penanda data (centang tiap angka), penjumlahan bertahap (5+8=13, +4=17, +3=20), tabel rangkum otomatis |
| Soal 2 dan 4: salah pilih jenis penyajian | Belum terbentuk skema "tujuan → jenis diagram" | F5 Pemilih diagram: kartu tujuan ↔ diagram, contoh-bukan contoh |
| Soal 9: arah perubahan salah (naik 10 → 15 dibaca turun) | Salah membaca arah sumbu atau urutan waktu | Garis dengan panah arah waktu, penanda awal–akhir, pertanyaan pemandu "mulai berapa? akhir berapa? bertambah atau berkurang?" |
| Soal 10: tujuan diagram | Konsep abstrak tanpa konteks | Kartu "untuk apa diagram?" dengan 3 contoh konteks nyata |
| Kesulitan tidak seragam | Pengetahuan awal berbeda | Jalur adaptif sederhana (F10) |

> Semua penyebab di atas berstatus **hipotesis** sampai dikonfirmasi lewat wawancara.

## 4. Literasi Matematis (kerangka PISA) → Fitur

Proses yang dinilai (sesuai arahan dosen — kisi-kisi 4 tahap):

| Tahap/proses | Pertanyaan pemandu siswa | Bentuk tugas di aplikasi |
|---|---|---|
| **Formulating** (merumuskan situasi secara matematis) | Apa yang ditanyakan? Data apa yang penting? Diagram apa yang cocok? | Pilih data relevan, pilih jenis diagram, susun tabel |
| **Employing** (menggunakan konsep, fakta, prosedur) | Bagaimana menghitung/menggambarkannya? | Mengisi tabel, menggambar/melengkapi diagram, menjumlah, mencari nilai terbanyak |
| **Interpreting / Evaluating** (menafsirkan dan menilai hasil) | Apa artinya hasil ini? Masuk akal? | Menjelaskan kesimpulan, mengecek kewajaran (mis. jumlah sesuai total?) |
| **Mathematical Reasoning** (bernalar) | Mengapa? Apa buktinya? | Memberi alasan pilihan diagram, menilai pernyataan benar/salah dengan bukti data |

### Struktur Soal Literasi (F6)
Satu konteks (cerita + data) → 4 sub-pertanyaan berurutan (F → E → I → R). Setiap tahap punya hint dan umpan balik sendiri. Siswa tidak melihat tahap berikutnya sebelum menyelesaikan tahap saat ini (mengurangi beban).

### Konteks Soal
Gunakan konteks yang dekat dengan siswa: jajanan kantin, jumlah buku perpustakaan, suhu harian, kegiatan ekstrakurikuler, penggunaan data internet, sampah sekolah. Hindari konteks yang membutuhkan pengetahuan khusus.

## 5. Pola Satu Modul (Siklus Belajar)
1. **Aktifkan** (10–20 detik): pertanyaan pemantik bergambar.
2. **Kenalan istilah** (pre-training): maksimal 3 istilah.
3. **Contoh berlangkah** (worked example): semua langkah dibimbing.
4. **Coba bersama** (completion): sebagian langkah dikosongkan.
5. **Coba sendiri**: soal literasi 4 tahap dengan hint.
6. **Cerminan**: "Bagian mana yang paling sulit?" + skala beban mental 1–9.

## 6. Pengukuran Beban Kognitif (ringan, untuk evaluasi)
- Skala usaha mental Paas (1 = sangat sangat rendah … 9 = sangat sangat tinggi) setelah tiap modul.
- Catat: waktu per soal, jumlah hint, jumlah percobaan.
- Interpretasi: waktu lama + hint banyak + usaha tinggi = beban tinggi pada konten itu → sederhanakan.

## 7. Aturan Konten Ringkas
- Kalimat ≤ 15 kata bila memungkinkan; satu instruksi per kalimat.
- Maksimal 4–5 data per diagram pada modul awal; naik bertahap.
- Angka mudah (bilangan bulat kecil) pada modul awal; konteks nyata setelahnya.
- Satu warna bermakna per kategori + pola/label (jangan hanya warna).
- Umpan balik menjelaskan **mengapa**, bukan hanya "salah".
