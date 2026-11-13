# CLAUDE.md — Panduan untuk Claude Code

> Baca file ini PERTAMA di setiap sesi. Lalu baca file lain sesuai kebutuhan (lihat "Peta Dokumen").

## 1. Ringkasan Proyek
**Nama kerja aplikasi:** StatistiKu (dapat diganti)
**Apa:** Aplikasi web pembelajaran matematika materi **Data dan Diagram Statistika** untuk siswa **kelas VIII SMP, Semester 2**.
**Platform:** Web, *mobile-first* (smartphone), tetap nyaman di browser desktop. PWA (bisa dipasang & dipakai offline).
**Tujuan utama:** Menurunkan **beban kognitif (cognitive load)** siswa agar **kemampuan literasi matematis (mathematical literacy)** meningkat.
**Pembuat:** Mahasiswa S1 Pendidikan Matematika FKIP Untirta (bukan programmer profesional).
**Konteks:** Tugas mata kuliah (dosen: Dr. Aan Hendrayana, S.Si., M.Pd.). Kode wajib diunggah ke GitHub.

## 2. Peta Dokumen
| File | Isi | Kapan dibaca |
|---|---|---|
| PRD.md | Masalah, pengguna, fitur, kebutuhan | Sebelum menambah/mengubah fitur |
| PEDAGOGI_CLT.md | Teori beban kognitif & literasi matematis → fitur | Sebelum merancang interaksi |
| DESAIN.md | Gaya visual, layout, komponen, aksesibilitas | Sebelum membuat UI |
| ARSITEKTUR.md | Tech stack, struktur folder, data model | Sebelum membuat kode |
| KONTEN_MATERI.md | Materi, indikator, bank soal, data contoh | Sebelum membuat konten |
| ROADMAP_TASKS.md | Fase kerja & daftar tugas bercentang | Untuk tahu "kerjakan apa berikutnya" |
| TESTING_EVALUASI.md | Uji fungsi, uji siswa, pre/post-test | Sebelum menyatakan fitur selesai |

## 3. Aturan Kerja (WAJIB)
1. **Rencanakan dulu, kode kemudian.** Untuk tugas > 3 langkah, tulis rencana singkat dan minta persetujuan.
2. **Kerjakan satu fase/tugas per sesi** sesuai ROADMAP_TASKS.md. Centang tugas yang selesai.
3. **Jangan menambah fitur di luar PRD.md** tanpa bertanya. Jaga cakupan (scope) kecil.
4. **Pengguna bukan programmer ahli.** Jelaskan perubahan dengan bahasa sederhana, beri perintah terminal lengkap, jangan asumsikan pengetahuan lanjutan.
5. **Setiap fitur harus bisa dijelaskan secara pedagogis** (lihat PEDAGOGI_CLT.md). Jika sebuah elemen UI tidak membantu belajar, jangan dibuat.
6. **Bahasa antarmuka: Bahasa Indonesia** yang sederhana, kalimat pendek, cocok untuk siswa SMP. Komentar kode & nama variabel boleh Inggris.
7. **Mobile-first:** uji tampilan di lebar 360 px dahulu.
8. **Tanpa backend & tanpa akun di MVP.** Data progres disimpan di perangkat (localStorage). Jangan kumpulkan data pribadi siswa.
9. **Jangan mengarang konten materi.** Isi materi dan soal mengikuti KONTEN_MATERI.md. Jika perlu soal baru, tandai `// TODO-VERIFIKASI` agar diperiksa pembuat.
10. **Sebelum selesai:** jalankan lint, build, dan uji manual sesuai TESTING_EVALUASI.md.
11. **Commit kecil dan sering** dengan pesan jelas (Bahasa Indonesia atau Inggris, konsisten).

## 4. Tech Stack (ringkas; detail di ARSITEKTUR.md)
React + TypeScript + Vite, Tailwind CSS, grafik SVG buatan sendiri (komponen kecil), vite-plugin-pwa, localStorage, deploy GitHub Pages/Vercel.

## 5. Perintah Umum (diisi setelah proyek dibuat)
```
npm install      # pasang dependensi
npm run dev      # jalankan lokal
npm run build    # build produksi
npm run lint     # cek kode
npm run test     # uji unit
```

## 6. Prinsip Desain Singkat
- Satu ide per layar; satu tindakan utama per layar.
- Teks pendek, grafik besar, langkah bertahap (*scaffolding*).
- Umpan balik segera, ramah, tidak menghakimi.
- Hindari animasi dan hiasan yang tidak perlu (mengurangi beban kognitif ekstrinsik).

## 7. Yang TIDAK Boleh Dilakukan
- Menambah iklan, pelacak (tracker), atau pengumpul data pribadi.
- Memakai gambar/ikon berhak cipta tanpa lisensi bebas.
- Mengubah struktur folder besar tanpa persetujuan.
- Menghapus file perencanaan.

## 8. Catatan Status (perbarui tiap akhir sesi)
- Fase saat ini: Fase 0 (perencanaan selesai, belum ada kode)
- Keputusan terbuka: lihat bagian "Pertanyaan Terbuka" di PRD.md
