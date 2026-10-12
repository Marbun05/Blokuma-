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

  // Fallback lokal jika offline / loading (TEMA NUSANTARA)
  const hasLoop = blocksSummary.some((b) => (b.id || '').includes('repeat'));
  const hasJump = blocksSummary.some((b) => (b.id || '').includes('jump'));

  let storyText = `Hari ini, Pahlawan ${studentName} menyusun balok koding ajaib! Kiko melangkah menyusuri hutan lebat.`;

  if (hasLoop && hasJump) {
    storyText = `Kancil berlari memutar sebanyak 3 kali untuk menghindari kejaran Buaya di Sungai Kapuas! Berkat logika 'Loop' dari Pahlawan ${studentName}, Kancil berhasil melompat aman dan Buaya pun kebingungan.`;
  } else if (hasLoop) {
    storyText = `Dengan balok 'Loop' Pahlawan ${studentName}, Kiko memutari Candi Borobudur sebanyak 3 kali untuk menemukan harta karun tersembunyi yang dijaga oleh burung Garuda!`;
  } else if (hasJump) {
    storyText = `Hap! Berkat balok 'Lompat' buatan ${studentName}, Kiko berhasil melompati kobaran Api Merapi dan menyelamatkan penduduk desa. Benar-benar Pahlawan Pemberani!`;
  }

  return {
    title: `Kisah ${studentName} di Bumi Nusantara`,
    story: storyText,
    moralValue: 'Logika koding membantumu mengatasi rintangan dan menolong sesama!',
    characterBadge: hasLoop ? '🧙‍♂️ Pendekar Loop Nusantara' : '🚀 Si Pitung Balok Kode',
    modelUsed: 'openai/gpt-oss-120b-local-fallback',
    source: 'local_engine',
  };
}
