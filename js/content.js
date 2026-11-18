/* content.js — Isi materi, modul, dan soal (terpisah dari kode, ARSITEKTUR.md §1).
 *
 * Setiap modul mengikuti model Rigorous Mathematical Thinking (RMT.md):
 *   fase 1 = Fase I  Pengembangan Kognitif (mengamati, membandingkan dari situasi sehari-hari)
 *   fase 2 = Fase II Konten sebagai Proses (bahasa sehari-hari → istilah matematika, menemukan pola, alat matematis)
 *   fase 3 = Fase III Latihan Konstruksi Konseptual (latihan, soal literasi, refleksi)
 * dan pola modul CLT (PEDAGOGI_CLT.md §5): aktifkan → istilah → contoh berlangkah → coba bersama → coba sendiri → cerminan.
 *
 * Jenis langkah (tipe):
 *   amati    : situasi sehari-hari + pertanyaan pengamatan (Fase I)
 *   katamu   : siswa menulis dengan bahasanya sendiri, lalu muncul istilah matematika (Fase II)
 *   contoh   : contoh berlangkah, langkah muncul satu per satu (worked example)
 *   soal     : satu pertanyaan dengan hint 3 tingkat dan umpan balik
 *   literasi : soal cerita 4 tahap F → E → I → R (terkunci berurutan)
 *   refleksi : cerminan + skala usaha mental 1–9
 *
 * CATATAN UNTUK PEMBUAT: soal yang ditandai verifikasi: true (dan // TODO-VERIFIKASI) dibuat baru
 * dan perlu diperiksa pembuat/dosen sesuai CLAUDE.md aturan 9.
 */
(function () {
  const KANTIN = { jenis: 'tabel', judul: 'Penjualan Es Teh', kolom: 'Hari', kolomNilai: 'Gelas', seri: [
    { label: 'Senin', nilai: 5 }, { label: 'Selasa', nilai: 8 }, { label: 'Rabu', nilai: 4 }, { label: 'Kamis', nilai: 3 }] };

  const MODUL = [
    // ───────────────────────── MODUL 1 ─────────────────────────
    {
      id: 'modul-1', no: 1, judul: 'Kenalan dengan Data', ringkas: 'Apa itu data dan untuk apa disajikan.',
      topik: ['pengertian-data', 'tujuan-diagram'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Catatan Bu Rina',
          teks: 'Bu Rina mencatat cara siswa kelas 8B datang ke sekolah: jalan kaki 9 siswa, sepeda 6 siswa, diantar motor 12 siswa, angkot 5 siswa.',
          tanya: { teks: 'Apa yang dicatat Bu Rina?', jawab: 'pilihan',
            opsi: ['Nama-nama siswa', 'Banyak siswa untuk tiap cara datang', 'Jarak rumah siswa'], kunci: 1,
            hint: ['Baca lagi kalimatnya. Angka-angka itu menghitung apa?', 'Setiap angka diikuti kata "siswa".', 'Contoh: "jalan kaki 9 siswa" artinya ada 9 siswa yang jalan kaki.'],
            penjelasan: 'Bu Rina mencatat banyak siswa untuk setiap cara datang. Catatan hasil pengamatan seperti ini disebut data.' } },
        { tipe: 'amati', fase: 1, judul: 'Bandingkan',
          teks: 'Masih dari catatan Bu Rina: jalan kaki 9, sepeda 6, diantar motor 12, angkot 5.',
          tanya: { teks: 'Cara datang mana yang paling banyak dipakai?', jawab: 'pilihan',
            opsi: ['Jalan kaki', 'Sepeda', 'Diantar motor', 'Angkot'], kunci: 2,
            hint: ['Bandingkan angkanya satu per satu.', 'Cari angka yang paling besar di antara 9, 6, 12, dan 5.', '12 lebih besar dari 9, 6, dan 5.'],
            penjelasan: '12 adalah angka terbesar, jadi diantar motor paling banyak dipakai.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Menurutmu, apa itu data? Tulis dengan bahasamu sendiri.',
          istilah: [
            { nama: 'Data', arti: 'Kumpulan keterangan atau angka hasil pengamatan.' },
            { nama: 'Penyajian data', arti: 'Cara menampilkan data agar mudah dibaca, misalnya dengan tabel atau diagram.' }] },
        { tipe: 'contoh', fase: 2, judul: 'Data yang sama dalam diagram',
          data: { jenis: 'batang', judul: 'Cara Datang ke Sekolah', seri: [
            { label: 'Jalan', nilai: 9 }, { label: 'Sepeda', nilai: 6 }, { label: 'Motor', nilai: 12 }, { label: 'Angkot', nilai: 5 }] },
          langkah: ['Lihat judulnya dulu: diagram ini tentang cara datang ke sekolah.',
            'Setiap batang mewakili satu cara datang.',
            'Tinggi batang menunjukkan banyak siswa.',
            'Batang paling tinggi adalah Motor (12). Kita langsung melihatnya tanpa membaca kalimat panjang.'] },
        { tipe: 'soal', fase: 2, judul: 'Temukan polanya',
          teks: 'Untuk mencari cara datang yang paling banyak, mana yang lebih cepat dibaca?', jawab: 'pilihan',
          opsi: ['Kalimat panjang Bu Rina', 'Diagram batang'], kunci: 1,
          hint: ['Coba ingat: mana yang membuatmu lebih cepat menemukan jawabannya?', 'Pada diagram, cukup cari batang yang paling tinggi.', 'Pada kalimat, kamu harus membaca dan mengingat 4 angka sekaligus.'],
          penjelasan: 'Diagram membuat data lebih mudah dibaca dan dibandingkan. Itulah tujuan penyajian data.' },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri',
          teks: 'Untuk apa data disajikan dalam tabel atau diagram?', jawab: 'pilihan',
          opsi: ['Agar terlihat ramai dan berwarna', 'Agar data lebih mudah dibaca dan dipahami', 'Agar angkanya berubah'], kunci: 1,
          umpan: { 0: 'Warna boleh ada, tetapi bukan itu tujuannya. Diagram dibuat agar data lebih mudah dibaca dan dipahami.', 2: 'Angka data tidak berubah. Yang berubah hanya cara menampilkannya.' },
          hint: ['Ingat lagi: tadi apa yang terjadi saat data Bu Rina dijadikan diagram?', 'Kamu bisa langsung menemukan yang terbanyak.', 'Diagram membantu kita membaca data dengan cepat.'],
          penjelasan: 'Data disajikan agar lebih mudah dibaca dan dipahami.' },
        { tipe: 'refleksi', fase: 3 }
      ]
    },
    // ───────────────────────── MODUL 2 ─────────────────────────
    {
      id: 'modul-2', no: 2, judul: 'Data dalam Tabel', ringkas: 'Mencatat data dalam baris dan kolom, lalu menjumlahkan.',
      topik: ['tabel', 'jumlah-data'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Catatan yang berantakan',
          teks: 'Bu Kantin menulis: "Selasa laku 8 gelas, Senin 5 gelas, Kamis cuma 3, Rabu 4." Ia ingin tahu jumlah es teh yang terjual.',
          tanya: { teks: 'Apa yang membuat catatan ini sulit dibaca?', jawab: 'pilihan',
            opsi: ['Harinya tidak urut dan angkanya tercampur kalimat', 'Angkanya terlalu besar', 'Tidak ada gambar es teh'], kunci: 0,
            hint: ['Perhatikan urutan harinya.', 'Senin seharusnya ditulis pertama, tetapi di catatan ditulis kedua.', 'Angka yang tersebar dalam kalimat sulit dicari dan dijumlahkan.'],
            penjelasan: 'Harinya tidak urut dan angkanya terselip di kalimat. Kita perlu alat untuk merapikannya.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Kalau kamu yang mencatat, bagaimana caramu merapikan catatan Bu Kantin?',
          istilah: [
            { nama: 'Tabel', arti: 'Penyajian data dalam baris dan kolom.' },
            { nama: 'Baris dan kolom', arti: 'Baris berjajar mendatar; kolom berjajar tegak. Satu baris berisi satu hari dan angkanya.' },
            { nama: 'Total', arti: 'Hasil penjumlahan semua data.' }] },
        { tipe: 'contoh', fase: 2, judul: 'Merapikan dan menjumlahkan',
          data: Object.assign({}, KANTIN, { total: true }),
          langkah: ['Tulis setiap hari pada satu baris, urut dari Senin sampai Kamis.',
            'Jumlahkan bertahap. Mulai dari dua angka pertama: 5 + 8 = 13.',
            'Tambahkan angka berikutnya: 13 + 4 = 17.',
            'Tambahkan angka terakhir: 17 + 3 = 20. Jadi total 20 gelas.',
            'Cek kewajaran: ada 4 hari dan tiap hari paling banyak 8 gelas, jadi total tidak mungkin lebih dari 4 × 8 = 32. Angka 20 masuk akal.'] },
        { tipe: 'soal', fase: 2, judul: 'Temukan polanya',
          teks: 'Pada tabel di atas, satu baris berisi apa?', jawab: 'pilihan', data: KANTIN,
          opsi: ['Satu hari dan banyak gelas pada hari itu', 'Semua hari sekaligus', 'Hanya angka total'], kunci: 0,
          hint: ['Lihat baris pertama tabel.', 'Baris pertama: Senin dan 5.', 'Setiap baris memasangkan satu hari dengan satu angka.'],
          penjelasan: 'Setiap baris memasangkan satu kategori (hari) dengan nilainya. Karena itu tabel mudah dibaca.' },
        { tipe: 'soal', fase: 3, judul: 'Coba bersama', verifikasi: true, // TODO-VERIFIKASI
          teks: 'Toko koperasi mencatat penjualan pensil. Ketuk angka satu per satu untuk menjumlahkan. Berapa totalnya?',
          data: { jenis: 'tabel', judul: 'Penjualan Pensil', kolom: 'Hari', kolomNilai: 'Pensil', total: '?', seri: [
            { label: 'Senin', nilai: 6 }, { label: 'Selasa', nilai: 4 }, { label: 'Rabu', nilai: 7 }, { label: 'Kamis', nilai: 3 }] },
          jawab: 'angka', kunci: 20, chips: true,
          umpan: { 19: 'Hampir! Coba jumlahkan lagi satu per satu: 6 + 4 = 10, lalu tambah 7.', 21: 'Hampir! Coba jumlahkan lagi satu per satu: 6 + 4 = 10, lalu tambah 7.' },
          hint: ['Jumlahkan dua angka dulu, lalu tambah angka berikutnya.', '6 + 4 = 10. Lalu 10 + 7 = ...', '10 + 7 = 17. Tinggal tambah 3.'],
          penjelasan: '6 + 4 = 10; 10 + 7 = 17; 17 + 3 = 20. Totalnya 20 pensil.' },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri', verifikasi: true, // TODO-VERIFIKASI
          teks: 'Berapa total buku yang dipinjam selama 5 hari?',
          data: { jenis: 'tabel', judul: 'Peminjaman Buku Perpustakaan', kolom: 'Hari', kolomNilai: 'Buku', seri: [
            { label: 'Senin', nilai: 7 }, { label: 'Selasa', nilai: 9 }, { label: 'Rabu', nilai: 5 }, { label: 'Kamis', nilai: 8 }, { label: 'Jumat', nilai: 6 }] },
          jawab: 'angka', kunci: 35, chips: true,
          hint: ['Jumlahkan bertahap, jangan sekaligus.', '7 + 9 = 16. Lalu 16 + 5 = 21.', '21 + 8 = 29. Tinggal tambah 6.'],
          penjelasan: '7 + 9 = 16; 16 + 5 = 21; 21 + 8 = 29; 29 + 6 = 35.' },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri', verifikasi: true, // TODO-VERIFIKASI
          teks: 'Masih dari tabel peminjaman buku. Berapa selisih buku pada hari paling banyak dan hari paling sedikit?',
          data: { jenis: 'tabel', judul: 'Peminjaman Buku Perpustakaan', kolom: 'Hari', kolomNilai: 'Buku', seri: [
            { label: 'Senin', nilai: 7 }, { label: 'Selasa', nilai: 9 }, { label: 'Rabu', nilai: 5 }, { label: 'Kamis', nilai: 8 }, { label: 'Jumat', nilai: 6 }] },
          jawab: 'angka', kunci: 4,
          hint: ['Cari dulu angka terbesar dan terkecil.', 'Terbesar 9 (Selasa), terkecil 5 (Rabu).', 'Selisih artinya dikurangkan: 9 − 5.'],
          penjelasan: 'Paling banyak 9, paling sedikit 5. Selisihnya 9 − 5 = 4 buku.' },
        { tipe: 'refleksi', fase: 3 }
      ]
    },
    // ───────────────────────── MODUL 3 ─────────────────────────
    {
      id: 'modul-3', no: 3, judul: 'Diagram Batang', ringkas: 'Membaca dan membandingkan dengan batang.',
      topik: ['batang', 'baca-data'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Peminat ekstrakurikuler',
          data: { jenis: 'batang', judul: 'Peminat Ekstrakurikuler', seri: [
            { label: 'Pramuka', nilai: 12 }, { label: 'Futsal', nilai: 15 }, { label: 'Tari', nilai: 8 }, { label: 'PMR', nilai: 10 }] },
          tanya: { teks: 'Apa yang ditunjukkan oleh tinggi batang?', jawab: 'pilihan',
            opsi: ['Banyak peminat', 'Nama ekskul', 'Urutan waktu'], kunci: 0,
            hint: ['Lihat angka di atas setiap batang.', 'Batang Futsal paling tinggi dan angkanya 15.', 'Makin tinggi batang, makin banyak peminatnya.'],
            penjelasan: 'Tinggi batang menunjukkan banyak peminat. Nama ekskul ada di bawah batang.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Angka-angka di garis tegak sebelah kiri diagram itu gunanya untuk apa?',
          istilah: [
            { nama: 'Sumbu', arti: 'Garis acuan pada diagram: sumbu mendatar (kategori) dan sumbu tegak (nilai).' },
            { nama: 'Frekuensi', arti: 'Banyaknya data atau kejadian, misalnya banyak peminat.' },
            { nama: 'Diagram batang', arti: 'Diagram dengan batang-batang untuk membandingkan nilai antar kategori.' }] },
        { tipe: 'soal', fase: 2, judul: 'Temukan polanya', verifikasi: true, // TODO-VERIFIKASI
          data: { jenis: 'batang', judul: 'Peminat Ekstrakurikuler', seri: [
            { label: 'Pramuka', nilai: 12 }, { label: 'Futsal', nilai: 15 }, { label: 'Tari', nilai: 8 }, { label: 'PMR', nilai: 10 }] },
          teks: 'Berapa selisih peminat Futsal dan Tari?', jawab: 'angka', kunci: 7,
          hint: ['Baca dulu nilai dua batang itu.', 'Futsal 15, Tari 8.', 'Selisih = yang besar dikurangi yang kecil.'],
          penjelasan: '15 − 8 = 7 peminat.' },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri', verifikasi: true, // TODO-VERIFIKASI
          data: { jenis: 'batang', judul: 'Peminat Ekstrakurikuler', seri: [
            { label: 'Pramuka', nilai: 12 }, { label: 'Futsal', nilai: 15 }, { label: 'Tari', nilai: 8 }, { label: 'PMR', nilai: 10 }] },
          teks: 'Berapa total peminat keempat ekskul? Ketuk angkanya satu per satu.', jawab: 'angka', kunci: 45, chips: true,
          hint: ['Jumlahkan bertahap.', '12 + 15 = 27.', '27 + 8 = 35. Tinggal tambah 10.'],
          penjelasan: '12 + 15 = 27; 27 + 8 = 35; 35 + 10 = 45.' },
        { tipe: 'refleksi', fase: 3 }
      ]
    },
    // ───────────────────────── MODUL 4 ─────────────────────────
    {
      id: 'modul-4', no: 4, judul: 'Diagram Garis', ringkas: 'Membaca perubahan dari waktu ke waktu.',
      topik: ['garis', 'perubahan-data'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Pengunjung perpustakaan',
          teks: 'Dina mencatat pengunjung perpustakaan: minggu 1 ada 10 orang, minggu 2 ada 15 orang.',
          tanya: { teks: 'Apa yang sama dan apa yang berubah dari minggu 1 ke minggu 2?', jawab: 'pilihan',
            opsi: ['Perpustakaannya sama, banyak pengunjungnya berubah', 'Semuanya sama', 'Perpustakaannya pindah tempat'], kunci: 0,
            hint: ['Tempatnya sama atau tidak?', 'Angkanya 10 lalu 15. Sama atau berbeda?', 'Yang berubah dari waktu ke waktu adalah banyak pengunjung.'],
            penjelasan: 'Tempatnya sama, tetapi banyak pengunjungnya berubah dari waktu ke waktu.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Kalau sesuatu makin banyak dari minggu ke minggu, kata apa yang biasa kamu pakai?',
          istilah: [
            { nama: 'Diagram garis', arti: 'Garis yang menghubungkan titik-titik untuk melihat perubahan dari waktu ke waktu.' },
            { nama: 'Peningkatan (naik)', arti: 'Nilai akhir lebih besar daripada nilai awal.' },
            { nama: 'Penurunan (turun)', arti: 'Nilai akhir lebih kecil daripada nilai awal.' }] },
        { tipe: 'contoh', fase: 2, judul: 'Cara membaca diagram garis',
          data: { jenis: 'garis', judul: 'Pengunjung Perpustakaan', penanda: true, seri: [
            { label: 'Minggu 1', nilai: 10 }, { label: 'Minggu 2', nilai: 15 }, { label: 'Minggu 3', nilai: 12 }] },
          langkah: ['Baca dari kiri ke kanan, searah panah waktu.',
            'Mulai berapa? Titik awal (hijau): 10 pengunjung.',
            'Minggu 2: 15. Karena 15 > 10, pengunjung naik 15 − 10 = 5.',
            'Minggu 3: 12. Karena 12 < 15, pengunjung turun 15 − 12 = 3.',
            'Garis yang naik ke kanan artinya bertambah. Garis yang turun ke kanan artinya berkurang.'] },
        { tipe: 'soal', fase: 2, judul: 'Temukan polanya',
          data: { jenis: 'garis', judul: 'Pengunjung Perpustakaan', penanda: true, seri: [
            { label: 'Minggu 1', nilai: 10 }, { label: 'Minggu 2', nilai: 15 }] },
          teks: 'Dari minggu 1 ke minggu 2, banyak pengunjung ...', jawab: 'pilihan',
          opsi: ['Bertambah (peningkatan)', 'Berkurang (penurunan)', 'Tetap'], kunci: 0,
          umpan: { 1: 'Lihat nilai awal dan nilai akhir. Mana yang lebih besar?', 2: 'Angkanya berbeda: 10 dan 15. Jadi tidak tetap.' },
          hint: ['Mulai berapa? Akhirnya berapa?', 'Awal 10, akhir 15.', '15 lebih besar dari 10.'],
          penjelasan: 'Awal 10, akhir 15. Karena 15 > 10, pengunjung bertambah (peningkatan) sebanyak 5.' },
        { tipe: 'soal', fase: 3, judul: 'Coba bersama', verifikasi: true, // TODO-VERIFIKASI
          data: { jenis: 'garis', judul: 'Tinggi Tanaman Kacang Hijau (cm)', penanda: true, seri: [
            { label: 'Hari 1', nilai: 2 }, { label: 'Hari 2', nilai: 4 }, { label: 'Hari 3', nilai: 7 }, { label: 'Hari 4', nilai: 9 }] },
          teks: 'Berapa cm pertambahan tinggi tanaman dari hari 1 sampai hari 4?', jawab: 'angka', kunci: 7,
          umpan: { 9: 'Itu tinggi akhirnya. Yang ditanya pertambahan: akhir dikurangi awal.', 2: 'Itu tinggi awalnya. Yang ditanya pertambahan: akhir dikurangi awal.' },
          hint: ['Pertambahan = nilai akhir − nilai awal.', 'Awal (hari 1) = 2 cm. Akhir (hari 4) = 9 cm.', '9 − 2 = ...'],
          penjelasan: 'Akhir 9 cm dikurangi awal 2 cm sama dengan 7 cm.' },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri', verifikasi: true, // TODO-VERIFIKASI
          data: { jenis: 'garis', judul: 'Tinggi Tanaman Kacang Hijau (cm)', seri: [
            { label: 'Hari 1', nilai: 2 }, { label: 'Hari 2', nilai: 4 }, { label: 'Hari 3', nilai: 7 }, { label: 'Hari 4', nilai: 9 }] },
          teks: 'Di antara dua hari berurutan, kapan tanaman tumbuh paling banyak?', jawab: 'pilihan',
          opsi: ['Hari 1 ke hari 2', 'Hari 2 ke hari 3', 'Hari 3 ke hari 4'], kunci: 1,
          hint: ['Hitung pertambahan untuk setiap pasangan hari.', 'Hari 1→2: 4 − 2 = 2. Hari 2→3: 7 − 4 = 3.', 'Hari 3→4: 9 − 7 = 2. Mana yang paling besar?'],
          penjelasan: 'Pertambahannya 2, 3, dan 2 cm. Paling banyak dari hari 2 ke hari 3 (3 cm). Garisnya juga paling curam di bagian itu.' },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri', verifikasi: true, // TODO-VERIFIKASI
          data: { jenis: 'garis', judul: 'Sampah Plastik di Kelas (kantong)', penanda: true, seri: [
            { label: 'Senin', nilai: 8 }, { label: 'Selasa', nilai: 6 }, { label: 'Rabu', nilai: 5 }, { label: 'Kamis', nilai: 3 }] },
          teks: 'Bagaimana perubahan sampah plastik dari Senin ke Kamis?', jawab: 'pilihan',
          opsi: ['Bertambah', 'Berkurang', 'Tetap'], kunci: 1,
          umpan: { 0: 'Lihat nilai awal dan nilai akhir. Mana yang lebih besar?' },
          hint: ['Mulai berapa? Akhirnya berapa?', 'Awal 8, akhir 3.', 'Garisnya turun ke kanan.'],
          penjelasan: 'Awal 8, akhir 3. Karena 3 < 8, sampah plastik berkurang (penurunan) sebanyak 5 kantong.' },
        { tipe: 'refleksi', fase: 3 }
      ]
    },
    // ───────────────────────── MODUL 5 ─────────────────────────
    {
      id: 'modul-5', no: 5, judul: 'Diagram Lingkaran', ringkas: 'Melihat bagian dari keseluruhan.',
      topik: ['lingkaran'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Buah kesukaan',
          teks: 'Ada 20 siswa ditanya buah kesukaannya: jeruk 10 siswa, apel 5 siswa, pisang 5 siswa.',
          data: { jenis: 'lingkaran', judul: 'Buah Kesukaan 20 Siswa', seri: [
            { label: 'Jeruk', nilai: 10 }, { label: 'Apel', nilai: 5 }, { label: 'Pisang', nilai: 5 }] },
          tanya: { teks: 'Bagian lingkaran mana yang paling besar?', jawab: 'pilihan',
            opsi: ['Jeruk', 'Apel', 'Pisang'], kunci: 0,
            hint: ['Bayangkan lingkaran itu sebuah kue yang dibagi.', 'Potongan jeruk menutupi setengah lingkaran.', 'Jeruk dipilih 10 dari 20 siswa.'],
            penjelasan: 'Jeruk paling besar karena dipilih 10 dari 20 siswa, yaitu setengahnya.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Kalau sebuah kue dibagi untuk teman-temanmu, apa artinya kalau potonganmu paling besar?',
          istilah: [
            { nama: 'Diagram lingkaran', arti: 'Lingkaran yang dibagi menjadi sektor-sektor untuk melihat bagian dari keseluruhan.' },
            { nama: 'Sektor', arti: 'Potongan pada diagram lingkaran.' },
            { nama: 'Persen (%)', arti: 'Bagian dari 100. Seluruh lingkaran = 100%.' }] },
        { tipe: 'contoh', fase: 2, judul: 'Menghitung persen sektor',
          data: { jenis: 'lingkaran', judul: 'Buah Kesukaan 20 Siswa', seri: [
            { label: 'Jeruk', nilai: 10 }, { label: 'Apel', nilai: 5 }, { label: 'Pisang', nilai: 5 }] },
          langkah: ['Seluruh lingkaran = semua siswa = 20 siswa = 100%.',
            'Persen jeruk = 10 dari 20 = 10/20 × 100% = 50%.',
            'Persen apel = 5/20 × 100% = 25%. Pisang juga 25%.',
            'Cek: 50% + 25% + 25% = 100%. Semua sektor harus berjumlah 100%.'] },
        { tipe: 'soal', fase: 3, judul: 'Coba sendiri', verifikasi: true, // TODO-VERIFIKASI
          data: { jenis: 'lingkaran', judul: 'Penggunaan Uang Saku Raka', seri: [
            { label: 'Jajan', nilai: 50 }, { label: 'Tabungan', nilai: 30 }, { label: 'Ongkos', nilai: 20, tanya: true }] },
          teks: 'Jajan 50% dan tabungan 30%. Berapa persen uang saku Raka untuk ongkos?', jawab: 'angka', kunci: 20,
          hint: ['Seluruh lingkaran = 100%.', 'Jajan dan tabungan bersama = 50% + 30% = 80%.', 'Sisanya: 100% − 80%.'],
          penjelasan: '100% − (50% + 30%) = 100% − 80% = 20%.' },
        { tipe: 'refleksi', fase: 3 }
      ]
    },
    // ───────────────────────── MODUL 6 ─────────────────────────
    {
      id: 'modul-6', no: 6, judul: 'Memilih Diagram yang Tepat', ringkas: 'Mencocokkan tujuan dengan jenis diagram.',
      topik: ['tujuan-diagram'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Tiga catatan',
          teks: 'Ada tiga catatan: (1) tinggi badan Raka setiap bulan, (2) warna kesukaan siswa kelas 8B, (3) banyak siswa di tiap ekskul.',
          tanya: { teks: 'Catatan mana yang menunjukkan perubahan dari waktu ke waktu?', jawab: 'pilihan',
            opsi: ['Tinggi badan Raka setiap bulan', 'Warna kesukaan siswa kelas 8B', 'Banyak siswa di tiap ekskul'], kunci: 0,
            hint: ['Cari catatan yang memakai urutan waktu.', 'Kata "setiap bulan" menunjukkan waktu.', 'Tinggi badan diukur bulan demi bulan.'],
            penjelasan: 'Tinggi badan setiap bulan diukur berurutan menurut waktu. Dua catatan lain membandingkan kelompok, bukan waktu.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Menurutmu, kenapa ada banyak jenis diagram? Kenapa tidak satu saja?',
          istilah: [
            { nama: 'Diagram batang', arti: 'Untuk membandingkan nilai antar kategori (kelompok).' },
            { nama: 'Diagram garis', arti: 'Untuk melihat perubahan dari waktu ke waktu.' },
            { nama: 'Diagram lingkaran', arti: 'Untuk melihat bagian dari keseluruhan.' }] },
        { tipe: 'contoh', fase: 2, judul: 'Cara memilih diagram',
          langkah: ['Tanya dulu: apa tujuanku menyajikan data ini?',
            'Ada urutan waktu (hari, minggu, bulan) dan ingin melihat naik-turun? Pilih diagram garis.',
            'Ingin melihat bagian dari satu keseluruhan (persen)? Pilih diagram lingkaran.',
            'Ingin membandingkan beberapa kelompok? Pilih diagram batang.',
            'Hanya ingin mencatat angka dengan tepat dan rapi? Pakai tabel.'] },
        { tipe: 'soal', fase: 2, judul: 'Pilih diagram', pemilih: true,
          teks: 'Tujuan: melihat suhu udara setiap jam dari pagi sampai siang.', jawab: 'pilihan',
          opsi: ['Tabel', 'Diagram batang', 'Diagram garis', 'Diagram lingkaran'], kunci: 2,
          umpan: { 1: 'Ada urutan waktu (setiap jam). Untuk melihat perubahan dari waktu ke waktu, diagram garis lebih cocok.', 3: 'Suhu bukan bagian dari keseluruhan. Ada urutan waktu, jadi diagram garis lebih cocok.' },
          hint: ['Apakah ada urutan waktu?', 'Ada: setiap jam.', 'Perubahan dari waktu ke waktu → diagram garis.'],
          penjelasan: 'Suhu diukur berurutan setiap jam. Untuk melihat perubahan dari waktu ke waktu, gunakan diagram garis.' },
        { tipe: 'soal', fase: 3, judul: 'Pilih diagram', pemilih: true,
          teks: 'Tujuan: menunjukkan pembagian waktu 24 jam Dina untuk tidur, sekolah, bermain, dan lainnya.', jawab: 'pilihan',
          opsi: ['Tabel', 'Diagram batang', 'Diagram garis', 'Diagram lingkaran'], kunci: 3,
          umpan: { 2: 'Tidak ada perubahan dari waktu ke waktu di sini. Yang dilihat adalah bagian dari satu hari penuh.' },
          hint: ['24 jam itu satu keseluruhan.', 'Tidur, sekolah, bermain adalah bagian-bagiannya.', 'Bagian dari keseluruhan → diagram lingkaran.'],
          penjelasan: '24 jam adalah satu keseluruhan, dan setiap kegiatan adalah bagiannya. Diagram lingkaran paling tepat.' },
        { tipe: 'soal', fase: 3, judul: 'Pilih diagram', pemilih: true,
          teks: 'Tujuan: membandingkan banyak buku yang dipinjam oleh kelas 8A, 8B, 8C, dan 8D.', jawab: 'pilihan',
          opsi: ['Tabel', 'Diagram batang', 'Diagram garis', 'Diagram lingkaran'], kunci: 1,
          umpan: { 2: 'Kelas 8A–8D bukan urutan waktu. Untuk membandingkan kelompok, diagram batang lebih cocok.' },
          hint: ['Apakah ada urutan waktu?', 'Tidak ada. Yang ada empat kelompok kelas.', 'Membandingkan kelompok → diagram batang.'],
          penjelasan: 'Kita membandingkan empat kelompok (kelas). Diagram batang memudahkan perbandingan tinggi-rendahnya.' },
        { tipe: 'soal', fase: 3, judul: 'Pilih penyajian', pemilih: true,
          teks: 'Tujuan: mencatat nilai ulangan 5 siswa dengan tepat agar bisa dibaca guru.', jawab: 'pilihan',
          opsi: ['Tabel', 'Diagram batang', 'Diagram garis', 'Diagram lingkaran'], kunci: 0,
          hint: ['Yang dibutuhkan angka yang tepat, bukan gambar.', 'Penyajian dalam baris dan kolom.', 'Nama siswa di satu kolom, nilai di kolom lain.'],
          penjelasan: 'Untuk mencatat angka dengan tepat dan rapi, tabel paling cocok.' },
        { tipe: 'refleksi', fase: 3 }
      ]
    },
    // ───────────────────────── MODUL 7 ─────────────────────────
    {
      id: 'modul-7', no: 7, judul: 'Soal Cerita Literasi', ringkas: 'Rumuskan, hitung, tafsirkan, beralasan.',
      topik: ['tabel', 'jumlah-data', 'garis', 'perubahan-data', 'tujuan-diagram'],
      langkah: [
        { tipe: 'amati', fase: 1, judul: 'Tunggu dulu!',
          teks: 'Di kantin ada 26 roti dan 10 kotak susu.',
          tanya: { teks: 'Berapa umur penjaga kantin?', jawab: 'pilihan',
            opsi: ['36 tahun', '16 tahun', 'Tidak bisa ditentukan dari data ini'], kunci: 2,
            umpan: { 0: '26 + 10 memang 36, tetapi apakah roti dan susu berhubungan dengan umur seseorang?', 1: '26 − 10 memang 16, tetapi apakah roti dan susu berhubungan dengan umur seseorang?' },
            hint: ['Apa yang sebenarnya ditanyakan?', 'Yang ditanya umur. Data yang ada tentang roti dan susu.', 'Apakah ada data tentang umur?'],
            penjelasan: 'Tidak ada data tentang umur. Pemikir yang teliti selalu memeriksa dulu apa yang ditanya dan data apa yang tersedia sebelum menghitung.' } },
        { tipe: 'katamu', fase: 2, judul: 'Dengan kata-katamu',
          tanya: 'Sebelum menghitung soal cerita, apa yang sebaiknya kamu lakukan dulu?',
          istilah: [
            { nama: '① Rumuskan', arti: 'Apa yang ditanya? Data apa yang penting? Penyajian apa yang cocok?' },
            { nama: '② Hitung', arti: 'Gunakan cara matematika untuk mencari nilainya.' },
            { nama: '③ Tafsirkan  ④ Beralasan', arti: 'Apa arti hasilnya dalam cerita? Apa bukti dari data?' }] },
        { tipe: 'literasi', fase: 3, judul: 'Es teh kantin',
          konteks: 'Penjualan es teh di kantin selama 4 hari: Senin 5, Selasa 8, Rabu 4, Kamis 3 gelas.',
          data: KANTIN,
          tahap: [
            { kode: 'F', teks: 'Bagaimana cara menyajikan data ini agar mudah dibandingkan?', jawab: 'pilihan',
              opsi: ['Tabel atau diagram batang', 'Diagram lingkaran', 'Tidak perlu disajikan'], kunci: 0,
              hint: ['Apa tujuannya: membandingkan atau melihat bagian dari keseluruhan?', 'Kita membandingkan penjualan antar hari.', 'Membandingkan kategori → tabel atau diagram batang.'],
              penjelasan: 'Untuk membandingkan penjualan antar hari, tabel atau diagram batang paling cocok.' },
            { kode: 'E', teks: 'Berapa total gelas yang terjual? Ketuk angkanya satu per satu.', jawab: 'angka', kunci: 20, chips: true,
              umpan: { 21: 'Hampir! Jumlahkan bertahap: 5 + 8 = 13, lalu tambah 4.', 18: 'Hampir! Jumlahkan bertahap: 5 + 8 = 13, lalu tambah 4.' },
              hint: ['Jumlahkan bertahap.', '5 + 8 = 13; 13 + 4 = 17.', '17 + 3 = ...'],
              penjelasan: '5 + 8 = 13; 13 + 4 = 17; 17 + 3 = 20 gelas.' },
            { kode: 'I', teks: 'Hari apa penjualan terbanyak?', jawab: 'pilihan',
              opsi: ['Senin', 'Selasa', 'Rabu', 'Kamis'], kunci: 1,
              hint: ['Cari angka terbesar.', 'Angkanya 5, 8, 4, 3.', '8 adalah yang terbesar.'],
              penjelasan: 'Selasa (8 gelas) adalah penjualan terbanyak.' },
            { kode: 'R', teks: 'Benarkah penjualan Kamis kurang dari separuh penjualan Selasa?', jawab: 'pilihan',
              opsi: ['Benar, karena separuh dari 8 adalah 4, dan 3 < 4', 'Salah, karena 3 lebih besar dari separuh 8', 'Tidak bisa ditentukan'], kunci: 0,
              hint: ['Hitung dulu separuh dari penjualan Selasa.', 'Separuh dari 8 adalah 4.', 'Bandingkan penjualan Kamis (3) dengan 4.'],
              penjelasan: 'Separuh dari 8 adalah 4. Kamis terjual 3, dan 3 < 4, jadi pernyataan itu benar.' }
          ] },
        { tipe: 'literasi', fase: 3, judul: 'Pengunjung perpustakaan',
          konteks: 'Jumlah pengunjung perpustakaan minggu 1 = 10 orang, minggu 2 = 15 orang.',
          data: { jenis: 'garis', judul: 'Pengunjung Perpustakaan', penanda: true, seri: [
            { label: 'Minggu 1', nilai: 10 }, { label: 'Minggu 2', nilai: 15 }] },
          tahap: [
            { kode: 'F', teks: 'Diagram apa yang cocok untuk melihat perubahan pengunjung?', jawab: 'pilihan',
              opsi: ['Diagram batang', 'Diagram garis', 'Diagram lingkaran'], kunci: 1,
              umpan: { 2: 'Pengunjung bukan bagian dari keseluruhan. Ada urutan waktu, jadi diagram garis lebih cocok.' },
              hint: ['Ada urutan waktu atau tidak?', 'Ada: minggu 1 lalu minggu 2.', 'Perubahan dari waktu ke waktu → diagram garis.'],
              penjelasan: 'Ada urutan waktu (minggu), jadi diagram garis paling cocok.' },
            { kode: 'E', teks: 'Berapa selisih pengunjung minggu 1 dan minggu 2?', jawab: 'angka', kunci: 5,
              hint: ['Selisih artinya dikurangkan.', 'Yang besar dikurangi yang kecil.', '15 − 10 = ...'],
              penjelasan: '15 − 10 = 5 orang.' },
            { kode: 'I', teks: 'Pengunjung bertambah atau berkurang?', jawab: 'pilihan',
              opsi: ['Bertambah (peningkatan)', 'Berkurang (penurunan)'], kunci: 0,
              umpan: { 1: 'Lihat nilai awal dan nilai akhir. Mana yang lebih besar?' },
              hint: ['Awalnya berapa? Akhirnya berapa?', 'Awal 10, akhir 15.', '15 > 10.'],
              penjelasan: 'Awal 10, akhir 15, jadi pengunjung bertambah 5 orang.' },
            { kode: 'R', teks: 'Jika minggu 3 turun menjadi 12 orang, apakah pengunjung minggu 3 tetap lebih banyak dari minggu 1?', jawab: 'pilihan',
              opsi: ['Ya, karena 12 lebih besar dari 10', 'Tidak, karena pengunjung turun dari 15', 'Tidak bisa ditentukan'], kunci: 0,
              umpan: { 1: 'Memang turun dari 15, tetapi yang dibandingkan adalah minggu 3 dengan minggu 1.' },
              hint: ['Yang dibandingkan minggu 3 dengan minggu berapa?', 'Minggu 3 = 12, minggu 1 = 10.', 'Bandingkan 12 dan 10.'],
              penjelasan: 'Walaupun turun dari 15, minggu 3 (12) tetap lebih banyak dari minggu 1 (10).' }
          ] },
        { tipe: 'refleksi', fase: 3 }
      ]
    }
  ];

  /* Pre-test & post-test (10 soal, pilihan ganda). Pemetaan topik & kunci mengikuti KONTEN_MATERI.md §6.
   * TODO-VERIFIKASI: teks pre-test asli ada di Google Form. Ganti teks di bawah dengan soal aslinya.
   * Post-test adalah versi paralel (topik sama, angka/konteks berbeda). */
  const PRETEST = [
    { topik: 'pengertian-data', modul: 'modul-1', teks: 'Data adalah ...', opsi: ['Kumpulan keterangan atau angka hasil pengamatan', 'Gambar hiasan pada buku', 'Rumus matematika'], kunci: 0 },
    { topik: 'tabel', modul: 'modul-2', teks: 'Penyajian data dalam baris dan kolom disebut ...', opsi: ['Diagram batang', 'Tabel', 'Diagram lingkaran'], kunci: 1 },
    { topik: 'batang', modul: 'modul-3', teks: 'Diagram yang memakai batang-batang untuk membandingkan nilai antar kategori adalah ...', opsi: ['Diagram garis', 'Diagram lingkaran', 'Diagram batang'], kunci: 2 },
    { topik: 'garis', modul: 'modul-4', teks: 'Diagram yang paling cocok untuk melihat perubahan dari waktu ke waktu adalah ...', opsi: ['Diagram garis', 'Diagram lingkaran', 'Diagram batang'], kunci: 0 },
    { topik: 'baca-data', modul: 'modul-3', teks: 'Buah apa yang paling banyak disukai?', data: { jenis: 'batang', judul: 'Buah Kesukaan', seri: [{ label: 'Apel', nilai: 6 }, { label: 'Jeruk', nilai: 9 }, { label: 'Mangga', nilai: 4 }] }, opsi: ['Apel', 'Jeruk', 'Mangga'], kunci: 1 },
    { topik: 'jumlah-data', modul: 'modul-2', teks: 'Berapa total es teh yang terjual?', data: KANTIN, opsi: ['18', '21', '20'], kunci: 2 },
    { topik: 'baca-data', modul: 'modul-2', teks: 'Hari apa penjualan es teh paling sedikit?', data: KANTIN, opsi: ['Senin', 'Rabu', 'Kamis'], kunci: 2 },
    { topik: 'lingkaran', modul: 'modul-5', teks: 'Diagram lingkaran digunakan untuk menunjukkan ...', opsi: ['Bagian dari keseluruhan', 'Perubahan dari waktu ke waktu', 'Urutan kejadian'], kunci: 0 },
    { topik: 'perubahan-data', modul: 'modul-4', teks: 'Pengunjung minggu 1 ada 10 orang dan minggu 2 ada 15 orang. Perubahan ini disebut ...', data: { jenis: 'garis', judul: 'Pengunjung', seri: [{ label: 'Minggu 1', nilai: 10 }, { label: 'Minggu 2', nilai: 15 }] }, opsi: ['Penurunan', 'Peningkatan', 'Tetap'], kunci: 1 },
    { topik: 'tujuan-diagram', modul: 'modul-6', teks: 'Tujuan utama menyajikan data dalam diagram adalah ...', opsi: ['Agar data terlihat banyak', 'Agar angka data berubah', 'Mempermudah pembacaan data'], kunci: 2 }
  ];

  const POSTTEST = [
    { topik: 'pengertian-data', modul: 'modul-1', teks: 'Catatan banyak hujan setiap hari selama seminggu termasuk ...', opsi: ['Data', 'Rumus', 'Gambar hiasan'], kunci: 0 },
    { topik: 'tabel', modul: 'modul-2', teks: 'Bu guru menulis nama siswa di satu kolom dan nilainya di kolom lain. Penyajian ini disebut ...', opsi: ['Diagram garis', 'Tabel', 'Diagram lingkaran'], kunci: 1 },
    { topik: 'batang', modul: 'modul-3', teks: 'Untuk membandingkan banyak siswa di tiap ekskul, diagram yang cocok adalah ...', opsi: ['Diagram garis', 'Diagram lingkaran', 'Diagram batang'], kunci: 2 },
    { topik: 'garis', modul: 'modul-4', teks: 'Untuk melihat perubahan berat badan setiap bulan, diagram yang cocok adalah ...', opsi: ['Diagram garis', 'Diagram lingkaran', 'Diagram batang'], kunci: 0 },
    { topik: 'baca-data', modul: 'modul-3', teks: 'Warna apa yang paling banyak disukai?', data: { jenis: 'batang', judul: 'Warna Kesukaan', seri: [{ label: 'Merah', nilai: 7 }, { label: 'Biru', nilai: 11 }, { label: 'Hijau', nilai: 5 }] }, opsi: ['Merah', 'Biru', 'Hijau'], kunci: 1 },
    { topik: 'jumlah-data', modul: 'modul-2', teks: 'Berapa total roti yang terjual?', data: { jenis: 'tabel', judul: 'Penjualan Roti', kolom: 'Hari', kolomNilai: 'Roti', seri: [{ label: 'Senin', nilai: 6 }, { label: 'Selasa', nilai: 7 }, { label: 'Rabu', nilai: 5 }, { label: 'Kamis', nilai: 4 }] }, opsi: ['21', '23', '22'], kunci: 2 },
    { topik: 'baca-data', modul: 'modul-2', teks: 'Hari apa penjualan roti paling sedikit?', data: { jenis: 'tabel', judul: 'Penjualan Roti', kolom: 'Hari', kolomNilai: 'Roti', seri: [{ label: 'Senin', nilai: 6 }, { label: 'Selasa', nilai: 7 }, { label: 'Rabu', nilai: 5 }, { label: 'Kamis', nilai: 4 }] }, opsi: ['Senin', 'Rabu', 'Kamis'], kunci: 2 },
    { topik: 'lingkaran', modul: 'modul-5', teks: 'Untuk menunjukkan persentase uang saku yang dipakai jajan, ditabung, dan untuk ongkos, diagram yang cocok adalah ...', opsi: ['Diagram lingkaran', 'Diagram garis', 'Tabel urutan waktu'], kunci: 0 },
    { topik: 'perubahan-data', modul: 'modul-4', teks: 'Tinggi tanaman hari 1 adalah 4 cm dan hari 5 adalah 9 cm. Perubahan ini disebut ...', data: { jenis: 'garis', judul: 'Tinggi Tanaman (cm)', seri: [{ label: 'Hari 1', nilai: 4 }, { label: 'Hari 5', nilai: 9 }] }, opsi: ['Penurunan', 'Peningkatan', 'Tetap'], kunci: 1 },
    { topik: 'tujuan-diagram', modul: 'modul-6', teks: 'Mengapa data penjualan kantin sebaiknya dibuat diagram?', opsi: ['Supaya terlihat lebih banyak', 'Supaya angkanya bisa diubah', 'Supaya data lebih mudah dibaca dan dipahami'], kunci: 2 }
  ];

  const NAMA_TOPIK = {
    'pengertian-data': 'Pengertian data', tabel: 'Tabel', batang: 'Diagram batang', garis: 'Diagram garis',
    lingkaran: 'Diagram lingkaran', 'baca-data': 'Membaca data', 'jumlah-data': 'Menjumlahkan data',
    'perubahan-data': 'Membaca perubahan', 'tujuan-diagram': 'Tujuan & memilih diagram'
  };

  const FASE = {
    1: 'Fase I · Mengamati & berpikir',
    2: 'Fase II · Membangun konsep',
    3: 'Fase III · Berlatih & merefleksi'
  };

  window.KONTEN = { MODUL, PRETEST, POSTTEST, NAMA_TOPIK, FASE };
})();
