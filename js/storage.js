/* storage.js — Simpan/baca progres di localStorage (tanpa server, ARSITEKTUR.md §5). */
(function () {
  const KUNCI = 'statistiku:v1';

  function kosong() {
    return { versi: 1, nama: '', ukuranHuruf: 'normal', preTest: null, postTest: null, modul: {}, jawaban: [], streak: 0 };
  }

  function baca() {
    try {
      const teks = localStorage.getItem(KUNCI);
      if (!teks) return kosong();
      const data = JSON.parse(teks);
      if (!data || data.versi !== 1) return kosong(); // tempat migrasi versi berikutnya
      return Object.assign(kosong(), data);
    } catch (e) {
      return kosong();
    }
  }

  function simpan(data) {
    try {
      localStorage.setItem(KUNCI, JSON.stringify(data));
      return true;
    } catch (e) {
      return false; // localStorage penuh / tidak tersedia
    }
  }

  function hapus() {
    try { localStorage.removeItem(KUNCI); } catch (e) { /* abaikan */ }
  }

  window.Storage2 = { baca, simpan, hapus, kosong };
})();
