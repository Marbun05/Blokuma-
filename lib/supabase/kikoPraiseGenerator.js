import { supabase } from './client.js';

/**
 * Mengambil Validasi Emosional & Pujian Instan (< 100 ms) dari Kiko
 * menggunakan Edge Function kiko-praise-generator (openai/gpt-oss-20b)
 *
 * @param {Object} options
 * @param {string} options.studentName - Nama/panggilan anak
 * @param {string} options.islandTitle - Judul pulau yang diselesaikan
 * @param {number} options.xpEarned - Poin XP yang didapat
 * @param {boolean} options.hasBonus - Apakah mendapatkan bonus efisiensi kode
 * @param {string} options.gradeLevel - Tingkat kelas SD
 * @returns {Promise<Object>} Respon pujian instan Kiko
 */
export async function getKikoInstantPraise({
  studentName = 'Kiko',
  islandTitle = 'Pulau Petualangan',
  xpEarned = 100,
  hasBonus = false,
  gradeLevel = 'Kelas 3-4 SD',
}) {
  try {
    const { data, error } = await supabase.functions.invoke('kiko-praise-generator', {
      body: {
        studentName,
        islandTitle,
        xpEarned,
        hasBonus,
        gradeLevel,
      },
    });

    if (!error && data && data.success && data.praiseMessage) {
      return {
        praiseMessage: data.praiseMessage,
        kikoMood: data.kikoMood || 'cheerful',
        modelUsed: data.modelUsed || 'openai/gpt-oss-20b',
        source: data.source || 'edge_function',
      };
    }
  } catch (err) {
    console.warn('Praise Generator Edge Function invoke fallback:', err);
  }

  // Fallback lokal instan (< 10 ms)
  const bonusText = hasBonus ? ' dengan susunan balok paling efisien (+25 XP Bonus!)' : '!';
  const localPraise = `Luar biasa, Pahlawan ${studentName}! Kamu berhasil menaklukkan ${islandTitle}${bonusText} Robot Kiko sangat bangga dengan kecerdasan kodingmu! 🚀✨`;

  return {
    praiseMessage: localPraise,
    kikoMood: 'cheerful',
    modelUsed: 'openai/gpt-oss-20b-local-fallback',
    source: 'local_engine',
  };
}
