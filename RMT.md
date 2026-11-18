# RMT.md — Ringkasan Model Pembelajaran Rigorous Mathematical Thinking (RMT)

Sumber: Kinard, J. T. & Kozulin, A. (2008). *Rigorous Mathematical Thinking: Conceptual Formation in the Mathematics Classroom*. Cambridge University Press. (Ringkasan ini ditulis ulang dengan kata-kata sendiri untuk keperluan pengembangan aplikasi.)

Dokumen ini adalah acuan pedagogi utama aplikasi. Semua alur belajar, aktivitas, dan perilaku tutor AI harus mengikuti dokumen ini, berdampingan dengan prinsip beban kognitif di `PEDAGOGI_CLT.md`.

---

## 1. Ide pokok RMT

- Banyak siswa gagal dalam matematika **bukan karena kurang pengetahuan materi**, tetapi karena **fungsi kognitif dasarnya belum terbentuk**: belum terbiasa mengamati data dengan teliti, membandingkan, mengelompokkan, merumuskan masalah, merencanakan, dan merefleksikan. Contoh terkenal: siswa diberi soal "Ada 26 domba dan 10 kambing di kapal. Berapa umur kaptennya?" dan banyak yang langsung menjumlahkan angka.
- Fungsi kognitif itu **tidak muncul sendiri**, tetapi harus **dibangun secara aktif** lewat pembelajaran.
- RMT berdiri di atas dua teori:
  1. **Vygotsky: alat psikologis (psychological tools).** Simbol, tabel, diagram, garis bilangan, bidang koordinat, persamaan, dan bahasa matematika adalah *alat berpikir*, bukan sekadar isi pelajaran yang dihafal. Siswa harus memahami **struktur dan fungsi** alat itu sampai alat itu menjadi alat berpikirnya sendiri.
  2. **Feuerstein: pengalaman belajar termediasi (Mediated Learning Experience/MLE).** Ada *mediator* (guru, atau di aplikasi ini: tutor AI dan alur aplikasi) yang berdiri di antara siswa dan tugas, lalu membantu siswa memaknai tugas tersebut.

## 2. Arti "rigor" (berpikir rigorous)

Rigor adalah kualitas berpikir yang muncul ketika siswa **sangat ingin tahu dan ingin benar-benar paham**. Ciri-cirinya:
- **Sikap:** gigih menghadapi soal sulit, tidak mudah menyerah, mau berjuang menuju tujuan.
- **Kualitas berpikir:** fokus dan pengamatan tajam; definisi jelas dan lengkap; mampu menyebut ciri penting (critical attributes); tepat dan akurat; paham secara mendalam.
- **Metakognisi:** siswa sadar dan bisa menjelaskan *bagaimana* ia berpikir.

## 3. Tiga kriteria aktivitas belajar matematika (standar RMT)

Setiap aktivitas di aplikasi harus memenuhi **ketiganya**:
1. Membuat **perubahan struktural** pada pemahaman siswa (bukan sekadar menambah hafalan).
2. Menjadi bagian dari **proses sistematis membangun satu konsep** (setiap layar punya tempat dalam jalur konsep).
3. Mengenalkan siswa pada **bahasa dan aturan budaya matematika** (istilah, notasi, cara menulis yang benar).

## 4. Proses RMT: 3 fase, 6 langkah

Fase dan langkah ini **tidak harus kaku berurutan**, tetapi semuanya wajib ada dalam pembelajaran satu konsep.

### Fase I — Pengembangan Kognitif (Cognitive Development)
1. Siswa dimediasi untuk mengenal **model/alat umum** dalam tugas kognitif (misalnya tabel, daftar, gambar, peta) dengan memahami **struktur dan fungsinya**.
2. Siswa dimediasi untuk **mengerjakan tugas kognitif** dengan alat tersebut sehingga terbentuk proses berpikir tingkat tinggi (membandingkan, mengklasifikasi, mencari hubungan, merencanakan).
   - Pembukaan sebaiknya **dari situasi sehari-hari** (gambar atau cerita dekat dengan siswa), bukan langsung soal matematika. Contoh dari buku: guru mulai dengan gambar anak yang membaca peta, lalu bertanya "Apa yang sedang dilakukan anak ini?"

### Fase II — Konten sebagai Proses (Content as Process Development)
3. Siswa dimediasi untuk **membangun konsep dasar** dari **pengalaman dan bahasa sehari-hari** siswa.
4. Siswa dimediasi untuk **menemukan dan merumuskan sendiri pola dan hubungan matematis** dalam latihan kognitif.
5. Siswa dimediasi untuk menguasai **alat psikologis khusus matematika** (sistem nilai tempat, garis bilangan, tabel, bidang koordinat x–y, bahasa/notasi matematika) beserta struktur dan fungsinya.

### Fase III — Latihan Konstruksi Konseptual Kognitif (Cognitive Conceptual Construction Practice)
6. Siswa dimediasi untuk **berlatih memakai alat matematis** tersebut untuk mengatur fungsi kognitifnya sendiri dan **membangun pemahaman konsep** (latihan, penerapan ke soal kontekstual, refleksi).

Selama ketiga fase, **rigor terus dijaga**: siswa terus diajak menjelaskan alasan, memeriksa ketelitian, dan merefleksikan cara berpikirnya.

## 5. Kriteria mediasi (MLE) — wajib dipakai tutor AI

1. **Intensionalitas & resiprositas:** mediator menyampaikan tujuan dengan jelas dan memastikan siswa ikut terlibat dan merespons.
2. **Makna (meaning):** mediator menjelaskan *mengapa* sesuatu penting dan apa artinya.
3. **Transendensi (transcendence):** mediator mengaitkan yang dipelajari dengan situasi lain di luar soal ini (aturan umum, kehidupan sehari-hari, soal berikutnya).

## 6. Fungsi kognitif (input – elaborasi – output)

- **Input (mengumpulkan data):** mengamati dengan teliti, mengumpulkan semua informasi, memakai lebih dari satu sumber informasi, tepat dan akurat.
- **Elaborasi (mengolah):** mengenali masalah yang sebenarnya, memilih informasi relevan, membandingkan, merencanakan, berpikir hipotetis, mencari bukti.
- **Output (menyampaikan):** menjawab dengan tepat, memakai bahasa/istilah yang benar, tidak asal menebak, memeriksa ulang.

## 7. Siklus belajar: analisis – perencanaan – refleksi

Dari teori aktivitas belajar (learning activity) Vygotskian: setiap tugas dikerjakan dengan **(1) menganalisis tugas, (2) merencanakan langkah, (3) merefleksikan hasil dan cara berpikir**. Refleksi adalah ciri khas yang tidak boleh dilewati.

---

## 8. Penerapan di aplikasi (pedoman implementasi)

### Alur satu topik/konsep di aplikasi
| Fase RMT | Bentuk di aplikasi |
|---|---|
| Fase I | Layar pembuka berisi gambar/cerita sehari-hari + pertanyaan pengamatan ("Apa yang kamu lihat?", "Apa yang sama dan berbeda?"). Siswa memakai alat umum (tabel/daftar) untuk mengelompokkan atau membandingkan. |
| Fase II | Siswa diajak menyebut konsep dengan bahasanya sendiri → aplikasi mengarahkan ke istilah matematika yang benar → siswa menemukan pola → siswa mengenal alat matematis untuk topik ini (mis. tabel, diagram, garis bilangan, notasi). |
| Fase III | Latihan bertahap dengan alat matematis tersebut, soal kontekstual (literasi matematika), lalu **layar refleksi**: "Langkah apa yang kamu pakai?", "Di mana kamu hampir salah?", "Kapan cara ini bisa dipakai lagi?" |

### Aturan untuk tutor AI (system prompt)
- Berperan sebagai **mediator**, bukan pemberi jawaban. **Jangan langsung memberi jawaban akhir**; beri pertanyaan pemandu satu per satu.
- Selalu ikuti siklus **analisis → rencana → refleksi**: minta siswa menyebut apa yang diketahui dan ditanya, apa rencananya, lalu mengecek dan merefleksikan.
- Terapkan kriteria MLE: jelaskan tujuan (intensionalitas), arti/pentingnya (makna), dan kaitkan ke situasi lain (transendensi).
- Dorong rigor: minta alasan ("Kenapa kamu yakin?"), minta ketelitian ("Coba cek lagi datanya"), dan pemakaian istilah matematika yang tepat.
- Mulai dari bahasa sehari-hari siswa, lalu bawa ke bahasa matematika.
- Gunakan bahasa Indonesia yang sederhana, ramah, dan singkat (sesuai prinsip beban kognitif).
- Jika siswa salah, jangan menghakimi; arahkan ke bagian yang perlu diperiksa.
- Tetap dalam topik materi aplikasi.

### Hal yang tidak sesuai RMT (hindari)
- Langsung menampilkan rumus/definisi jadi lalu latihan soal hafalan.
- Tutor AI yang langsung menuliskan penyelesaian lengkap.
- Latihan tanpa tahap refleksi.
