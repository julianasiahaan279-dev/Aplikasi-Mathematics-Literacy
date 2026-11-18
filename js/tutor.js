/* tutor.js — Tutor AI (DeepSeek lewat /api/chat). Berperan sebagai mediator RMT:
 * memberi pertanyaan pemandu, bukan jawaban langsung. API key TIDAK pernah ada di sini;
 * key hanya ada di server (api/chat.js membaca DEEPSEEK_API_KEY dari .env / Vercel).
 */
(function () {
  let konteks = null;
  let pesan = []; // riwayat percakapan untuk konteks yang sedang aktif
  let sibuk = false;

  const tombol = document.getElementById('tutor-tombol');
  const panel = document.getElementById('tutor-panel');
  const isi = document.getElementById('tutor-isi');
  const form = document.getElementById('tutor-form');
  const input = document.getElementById('tutor-input');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function gambar() {
    isi.innerHTML = pesan.length
      ? pesan.map((p) => `<div class="gelembung ${p.role === 'user' ? 'saya' : 'tutor'}">${esc(p.content).replace(/\n/g, '<br>')}</div>`).join('')
      : '<p class="kecil">Hai! Aku tutormu. Aku tidak akan langsung memberi jawaban, tetapi akan membantumu berpikir langkah demi langkah. Ceritakan bagian mana yang membuatmu bingung.</p>';
    if (sibuk) isi.innerHTML += '<div class="gelembung tutor kecil">Tutor sedang berpikir…</div>';
    isi.scrollTop = isi.scrollHeight;
  }

  async function kirim(teks) {
    pesan.push({ role: 'user', content: teks });
    sibuk = true; gambar();
    try {
      if (location.protocol === 'file:') throw new Error('file');
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: pesan.slice(-12), konteks })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'server');
      pesan.push({ role: 'assistant', content: data.reply });
    } catch (e) {
      pesan.push({ role: 'assistant', content: e.message === 'file'
        ? 'Tutor AI hanya aktif jika aplikasi dijalankan lewat server (perintah "npm start") atau dibuka dari Vercel. Lihat README.'
        : 'Maaf, tutor sedang tidak bisa dihubungi. (' + e.message + ')' });
    }
    sibuk = false; gambar();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = input.value.trim();
    if (!t || sibuk) return;
    input.value = '';
    kirim(t.slice(0, 500));
  });
  tombol.addEventListener('click', () => (panel.hidden ? buka() : tutup()));
  document.getElementById('tutor-tutup').addEventListener('click', tutup);

  function buka() { panel.hidden = false; tombol.setAttribute('aria-expanded', 'true'); gambar(); input.focus(); }
  function tutup() { panel.hidden = true; tombol.setAttribute('aria-expanded', 'false'); }

  window.Tutor = {
    tampilkanTombol() { tombol.hidden = false; },
    tutup() { tutup(); tombol.hidden = true; },
    aturKonteks(k) {
      if (k !== konteks) { konteks = k; pesan = []; } // percakapan baru untuk soal baru
    }
  };
})();
