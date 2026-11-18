/* api/chat.js — Endpoint POST /api/chat (serverless function Vercel).
 * API key dibaca dari environment variable DEEPSEEK_API_KEY, tidak pernah dikirim ke browser.
 */
const { tanyaTutor } = require('./_tutor');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Gunakan metode POST.' });
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const hasil = await tanyaTutor(body || {});
  return res.status(hasil.status).json(hasil.data);
};
