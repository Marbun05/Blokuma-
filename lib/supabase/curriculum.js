import { supabase } from './client.js';
import { getCurriculumWorld, normalizeStudentClass } from '../../src/data/curriculumData.js';

/**
 * Mengambil enam misi dari master kurikulum lokal dan status progres siswa.
 * Materi misi tidak bergantung pada isi tabel curriculum_missions.
 */
export async function getCurriculumMissionsByClass(targetClass = 3, userId = null) {
  const numericClass = normalizeStudentClass(targetClass);
  let completedLevel = 0;

  // 1. Baca dari LocalStorage terlebih dahulu (responsif untuk guest/offline/realtime)
  if (typeof window !== 'undefined') {
    const localCompleted = Number(
      localStorage.getItem('student_completed_level') ||
      localStorage.getItem('student_progress_level') ||
      0
    );
    if (!Number.isNaN(localCompleted) && localCompleted > 0) {
      completedLevel = localCompleted;
    }
  }

  // 2. Query Supabase jika userId tersedia
  if (userId) {
    try {
      const { data: progressData, error } = await supabase
        .from('student_progress')
        .select('level')
        .eq('student_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (progressData?.level !== undefined && progressData?.level !== null) {
        completedLevel = Math.max(completedLevel, Number(progressData.level));
      }
    } catch (error) {
      console.warn('Unable to load progress level from Supabase:', error);
    }
  }

  // Max unlocked island: jika completedLevel = 2 (Pulau 2 selesai), maka unlockedMax = 3 (Pulau 3 terbuka)
  const unlockedMax = Math.max(2, completedLevel + 1);
  const world = getCurriculumWorld(numericClass);

  return world.missions.map((mission) => {
    const isUnlocked = mission.island_number <= unlockedMax;
    const isCompleted = mission.island_number <= completedLevel;

    return {
      ...mission,
      id: mission.island_number,
      title: mission.island_title,
      world_title: world.title,
      unlocked: isUnlocked,
      completed: isCompleted,
      status: isCompleted ? 'Tuntas ⭐⭐⭐' : isUnlocked ? '📍 Sedang Aktif' : '🔒 Terkunci',
      statusColor: isCompleted
        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
        : isUnlocked
          ? 'bg-teal-100 text-teal-800 border-teal-300 animate-pulse'
          : 'bg-slate-200 text-slate-700 border-slate-300',
      borderColor: isCompleted
        ? 'border-amber-300 bg-amber-50/70'
        : isUnlocked
          ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-300/40'
          : 'border-slate-300 bg-slate-100/70 border-dashed',
    };
  });
}

/**
 * Membuka kunci pulau berikutnya di Supabase dan LocalStorage.
 *
 * @param {string} userId - ID siswa
 * @param {number} completedIsland - Nomor pulau yang diselesaikan (1 s.d. 6)
 */
export async function unlockNextIslandInDatabase(userId, completedIsland) {
  const numericIsland = Number(completedIsland);
  if (!Number.isInteger(numericIsland) || numericIsland < 1) return;

  // 1. Simpan ke LocalStorage secara instan
  if (typeof window !== 'undefined') {
    const currentLocal = Number(
      localStorage.getItem('student_completed_level') ||
      localStorage.getItem('student_progress_level') ||
      0
    );
    const newLocal = Math.max(currentLocal, numericIsland);
    localStorage.setItem('student_completed_level', String(newLocal));
    localStorage.setItem('student_progress_level', String(newLocal));

    // Pancarkan event agar komponen lain (Peta Petualangan, Dashboard) re-render otomatis secara realtime
    window.dispatchEvent(
      new CustomEvent('student_progress_updated', {
        detail: { completedIsland: newLocal, unlockedIsland: newLocal + 1 },
      })
    );
  }

  // 2. Sinkronisasi ke Supabase jika user terautentikasi
  if (!userId) return;

  try {
    const { data: existingProgress, error: fetchError } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    const currentLevel = existingProgress?.level || 0;
    const newLevel = Math.max(currentLevel, numericIsland);

    if (existingProgress) {
      const { error } = await supabase
        .from('student_progress')
        .update({
          level: newLevel,
          xp: (existingProgress.xp || 0) + 100,
          updated_at: new Date().toISOString(),
        })
        .eq('student_id', userId);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('student_progress').insert({
        student_id: userId,
        level: newLevel,
        xp: 100,
        streak_days: 1,
      });
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error unlocking next island in Supabase:', error);
  }
}
