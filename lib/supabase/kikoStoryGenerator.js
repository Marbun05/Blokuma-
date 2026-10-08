import { supabase } from './client.js';

/**
 * Mengambil Dongeng Petualangan Kiko (Storyfication)
 * dari Supabase Edge Function kiko-story-generator
 *
 * @param {Object} options
 * @param {string} options.studentName - Nama/Panggilan Siswa
 * @param {string} options.projectTitle - Judul Misi / Project
 * @param {Array} options.canvasBlocks - List balok yang digunakan
 * @param {string} options.gradeLevel - Tingkat kelas (misal: "Kelas 1-2 SD")
 * @param {number} options.xpEarned - Poin XP
 * @returns {Promise<Object>} Respon Dongeng AI
 */
export async function getKikoStory({
  studentName = 'Kiko',
  projectTitle = 'Petualangan Balok Kiko',
  canvasBlocks = [],
  gradeLevel = 'Kelas 3-4 SD',
  xpEarned = 50,
}) {
  const blocksSummary = canvasBlocks.map((b) => ({
    id: b.id || b.type,
    label: b.label || b.id,
  }));

  try {
    const { data, error } = await supabase.functions.invoke('kiko-story-generator', {
      body: {
        studentName,
        projectTitle,
        blocksSummary,
        gradeLevel,
        xpEarned,
      },
    });

    if (!error && data && data.success) {
      return {
        title: data.title,
        story: data.story,
        moralValue: data.moralValue,
        characterBadge: data.characterBadge,
        modelUsed: data.modelUsed || 'openai/gpt-oss-120b',
        source: data.source || 'edge_function',
      };
    }
  } catch (err) {
    console.warn('Story Generator Edge Function invoke fallback:', err);
  }

  // Fallback lokal jika offline / loading
  const hasLoop = blocksSummary.some((b) => (b.id || '').includes('repeat'));
  return {
    title: `Dongeng Ajaib Pahlawan ${studentName}`,
    story: hasLoop
      ? `Hari ini, Pahlawan ${studentName} membuat mantra ajaib bernama 'Loop'. Karena mantra itu, naga merah dan Robot Kiko bisa menari 5 kali tanpa lelah! Hebat!`
      : `Hari ini, Pahlawan ${studentName} berhasil menyusun balok koding ajaib! Robot Kiko melompat riang menyeberangi rintangan dengan gembira!`,
    moralValue: 'Kreativitas dan kecerdasan koding membuka pintu petualangan ajaib!',
    characterBadge: hasLoop ? '🧙‍♂️ Master Mantra Loop' : '🚀 Arsitek Kode Ajaib',
    modelUsed: 'openai/gpt-oss-120b-local-fallback',
    source: 'local_engine',
  };
}
