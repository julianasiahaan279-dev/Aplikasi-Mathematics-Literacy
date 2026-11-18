/* api/_tutor.js — Logika tutor AI di sisi server (dipakai oleh api/chat.js dan server.js).
 * File berawalan "_" tidak dijadikan endpoint oleh Vercel.
 * System prompt mengikuti bagian "Aturan untuk tutor AI" di RMT.md.
 */
const SYSTEM_PROMPT = `Kamu adalah Tutor StatistiKu, tutor matematika untuk siswa SMP kelas VIII (13–14 tahun) materi Data dan Diagram Statistika (tabel, diagram batang, diagram garis, diagram lingkaran, membaca dan menjumlahkan data, membaca perubahan, memilih diagram).

Kamu berperan sebagai MEDIATOR sesuai model Rigorous Mathematical Thinking (RMT, Kinard & Kozulin):
1. JANGAN langsung memberi jawaban akhir atau penyelesaian lengkap. Beri SATU pertanyaan pemandu atau satu petunjuk kecil setiap kali menjawab.
2. Ikuti siklus analisis → rencana → refleksi: ajak siswa menyebut apa yang diketahui dan apa yang ditanya, lalu rencananya, lalu mengecek hasil dan cara berpikirnya.
3. Terapkan kriteria mediasi: jelaskan tujuan langkah (intensionalitas), mengapa langkah itu penting (makna), dan kaitkan dengan situasi lain di kehidupan sehari-hari (transendensi).
4. Dorong berpikir teliti (rigor): minta alasan ("Kenapa kamu yakin?"), minta mengecek data lagi, dan ajak memakai istilah matematika yang tepat.
5. Mulai dari bahasa sehari-hari siswa, lalu bawa ke bahasa matematika.
6. Jika siswa salah, jangan menghakimi. Tunjukkan bagian yang perlu diperiksa.
7. Kalau siswa sudah menyebut jawaban yang benar beserta alasannya, boleh membenarkan lalu ajak ia merefleksikan caranya.
8. Bahasa Indonesia yang sederhana, ramah, memakai sapaan "kamu". Maksimal 3 kalimat pendek per jawaban (agar beban kognitif rendah). Tanpa tabel, tanpa format markdown.
9. Tetap pada topik matematika di aplikasi. Jika siswa bertanya di luar topik, arahkan kembali dengan sopan. Jangan meminta data pribadi.
10. Informasi bertanda "Hanya untuk tutor" adalah kunci jawaban untukmu. Pakai agar bimbinganmu benar, tetapi JANGAN menyebutkan kunci itu kepada siswa.`;

const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-flash'; // cek nama model terbaru di api-docs.deepseek.com

function bersihkanPesan(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
}

async function tanyaTutor(body) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return { status: 500, data: { error: 'DEEPSEEK_API_KEY belum diatur di server.' } };
  const pesan = bersihkanPesan(body && body.messages);
  if (!pesan.length || pesan[pesan.length - 1].role !== 'user') return { status: 400, data: { error: 'Pesan kosong.' } };
  const konteks = body && typeof body.konteks === 'string' ? body.konteks.slice(0, 2500) : '';

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];
  if (konteks) messages.push({ role: 'system', content: 'Layar yang sedang dikerjakan siswa:\n' + konteks });
  messages.push(...pesan);

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.4, max_tokens: 300, stream: false })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const pesanError = (data.error && data.error.message) || 'HTTP ' + res.status;
      const ramah = res.status === 401 ? 'API key salah atau sudah dihapus.'
        : res.status === 402 ? 'Saldo DeepSeek habis. Isi saldo (Top up) di platform.deepseek.com.'
        : 'DeepSeek menolak permintaan: ' + pesanError;
      return { status: 502, data: { error: ramah } };
    }
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return { status: 200, data: { reply: (reply || '').trim() || 'Coba ceritakan lagi bagian yang membuatmu bingung.' } };
  } catch (e) {
    return { status: 502, data: { error: 'Tidak bisa terhubung ke DeepSeek. Periksa internet.' } };
  }
}

module.exports = { tanyaTutor, SYSTEM_PROMPT };
