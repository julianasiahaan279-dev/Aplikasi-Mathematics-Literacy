# ARSITEKTUR.md — Teknis

## 1. Prinsip
- **Sederhana & statis:** tanpa backend di MVP. Semua jalan di browser.
- **Konten terpisah dari kode:** soal dan materi dalam file JSON/TS.
- **Mudah dipelajari pemula**, dokumentasi luas, hosting gratis.

## 2. Pilihan Teknologi
| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | React 18 + TypeScript | Komponen reusable, banyak referensi |
| Build | Vite | Cepat, konfigurasi minimal |
| Gaya | Tailwind CSS | Cepat membuat UI mobile-first, token warna di DESAIN.md |
| Routing | React Router (mode hash untuk GitHub Pages) | Aman di hosting statis |
| State | Zustand (atau React Context) | Ringan |
| Penyimpanan | localStorage (dibungkus modul `storage`) | Tanpa server, privasi |
| Grafik | Komponen SVG buatan sendiri | Kontrol penuh label langsung, ringan, interaktif |
| PWA | vite-plugin-pwa | Offline + pasang di layar utama |
| Uji | Vitest + React Testing Library | Uji logika skor & komponen |
| Lint | ESLint + Prettier | Konsistensi |
| Hosting | GitHub Pages (utama) atau Vercel | Sesuai arahan unggah ke GitHub |

> Alternatif jika ingin lebih mudah: HTML + JavaScript murni. Keputusan final: lihat ROADMAP Fase 0.

## 3. Struktur Folder
```
statistiku/
├─ CLAUDE.md  PRD.md  DESAIN.md  ARSITEKTUR.md
├─ KONTEN_MATERI.md  PEDAGOGI_CLT.md  ROADMAP_TASKS.md  TESTING_EVALUASI.md
├─ public/               # ikon PWA, favicon
├─ src/
│  ├─ main.tsx  App.tsx  routes.tsx
│  ├─ components/
│  │  ├─ ui/             # Tombol, Kartu, ProgresBar, PanelUmpanBalik
│  │  ├─ charts/         # DiagramBatang, DiagramGaris, DiagramLingkaran, TabelData
│  │  └─ learning/       # KartuKonsep, LangkahContoh, PenandaData, TombolHint, SkalaUsaha
│  ├─ pages/             # Sambutan, PreTest, Beranda, Modul, Soal, Hasil, PostTest, Pengaturan
│  ├─ content/
│  │  ├─ modules/        # modul-01.json ... modul-06.json
│  │  ├─ questions/      # pretest.json, posttest.json, literasi-*.json
│  │  └─ glossary.json
│  ├─ lib/
│  │  ├─ storage.ts      # simpan/baca progres
│  │  ├─ scoring.ts      # penilaian & rekomendasi adaptif
│  │  ├─ stats.ts        # jumlah, modus, selisih, persentase, sudut sektor
│  │  └─ export.ts       # CSV/PDF ringkasan
│  ├─ store/             # state global
│  ├─ types/             # tipe TypeScript
│  └─ styles/            # tailwind.css, token
├─ tests/
├─ .github/workflows/deploy.yml
├─ vite.config.ts  tailwind.config.ts  tsconfig.json  package.json
└─ README.md
```

## 4. Model Data (TypeScript, ringkas)
```ts
type Topik = 'pengertian-data' | 'tabel' | 'batang' | 'garis' | 'lingkaran'
           | 'baca-data' | 'jumlah-data' | 'perubahan-data' | 'tujuan-diagram';
type Tahap = 'formulating' | 'employing' | 'interpreting' | 'reasoning';

interface DataSeri { label: string; nilai: number }[]

interface Pertanyaan {
  id: string;
  topik: Topik;
  tahap?: Tahap;               // untuk soal literasi
  teks: string;
  data?: { jenis: 'tabel'|'batang'|'garis'|'lingkaran'; seri: DataSeri[]; judul: string };
  tipe: 'pilihan' | 'isian-angka' | 'seret-jatuh';
  opsi?: string[];
  kunci: string | number;
  hint: [string, string, string];
  penjelasan: string;
}

interface SoalLiterasi { id: string; konteks: string; data: ...; tahap: Pertanyaan[] } // urut F→E→I→R

interface Modul { id: string; judul: string; topik: Topik[]; kartu: Kartu[]; contoh: ContohBerlangkah[]; latihan: string[] }

interface Progres {
  versi: 1;
  nama?: string;
  preTest?: HasilTes; postTest?: HasilTes;
  modul: Record<string, { status: 'belum'|'berjalan'|'selesai'; skalaUsaha?: number }>;
  jawaban: { soalId: string; benar: boolean; hintDipakai: number; detik: number; waktu: string }[];
}
```

## 5. Penyimpanan
- Kunci tunggal `statistiku:v1` di localStorage; bungkus akses dengan try/catch.
- Sertakan nomor versi untuk migrasi.
- Tombol "Hapus semua data" di Pengaturan.
- Tidak ada pengiriman data ke luar perangkat.

## 6. Logika Utama
- **Penilaian:** skor = benar × 10 (pre/post-test). Per topik: persentase benar.
- **Rekomendasi adaptif (sederhana):** modul dengan topik ≤ 50% diprioritaskan; setelah 3 jawaban benar berturut-turut, kurangi scaffolding (sembunyikan langkah ke-1) — *expertise reversal*.
- **Grafik:** semua dihitung dari `DataSeri`. Pie: sudut = nilai/total × 360°. Sumbu otomatis dengan langkah "bulat" (1, 2, 5, 10).
- **Hint:** tingkat naik satu per ketukan; catat jumlah.
- **Ekspor:** CSV (jawaban per soal) dan ringkasan PDF/cetak.

## 7. Performa & PWA
- Pemuatan malas (lazy) per halaman.
- Aset minimal; ikon SVG.
- Service worker meng-cache aplikasi; strategi *stale-while-revalidate*.
- Target Lighthouse: Performa ≥ 90, Aksesibilitas ≥ 95, PWA lulus.

## 8. Keamanan & Privasi
- Tanpa pihak ketiga pelacak; tanpa analitik di MVP.
- Tanpa `dangerouslySetInnerHTML` untuk konten; konten dari JSON lokal.
- Hanya nama panggilan opsional (jangan minta nama lengkap/sekolah).

## 9. Deploy (GitHub Pages)
1. Repo publik `statistiku`.
2. `vite.config.ts` set `base: '/statistiku/'`.
3. GitHub Actions `deploy.yml`: install → build → deploy ke Pages.
4. Tautan hasil dicantumkan di README untuk dosen.

## 10. Konvensi Kode
- Komponen `PascalCase`, fungsi `camelCase`, berkas JSON `kebab-case`.
- Komponen kecil (< 150 baris), satu tanggung jawab.
- Teks antarmuka tidak ditulis keras di komponen jika dapat berasal dari `content/`.
- Setiap fungsi di `lib/` punya uji unit.
- Pesan commit: `fitur:`, `perbaikan:`, `konten:`, `dok:`.
