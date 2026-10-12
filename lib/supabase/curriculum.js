import { supabase } from './client.js';
import { getCurriculumWorld, normalizeStudentClass } from '../../src/data/curriculumData.js';

/**
 * Mengambil enam misi dari master kurikulum lokal dan status progres siswa.
 * Materi misi tidak bergantung pada isi tabel curriculum_missions.
 */
export async function getCurriculumMissionsByClass(targetClass = 3, userId = null) {
  const numericClass = normalizeStudentClass(targetClass);
  let unlockedLevel = 2;

  if (userId) {
    try {
      const { data: progressData, error } = await supabase
        .from('student_progress')
        .select('level')
        .eq('student_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (progressData?.level) unlockedLevel = progressData.level + 1;
    } catch (error) {
      console.warn('Unable to load progress level from Supabase:', error);
    }
  }

  const world = getCurriculumWorld(numericClass);
  return world.missions.map((mission) => {
    const isUnlocked = mission.island_number <= unlockedLevel;
    const isCompleted = mission.island_number < unlockedLevel;

    return {
      ...mission,
      id: mission.island_number,
      title: mission.island_title,
      world_title: world.title,
      unlocked: isUnlocked,
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
 * Membuka kunci pulau berikutnya di Supabase.
 *
 * @param {string} userId - ID siswa
 * @param {number} completedIsland - Nomor pulau yang diselesaikan
 */
export async function unlockNextIslandInDatabase(userId, completedIsland) {
  if (!userId) return;

  try {
    const { data: existingProgress, error: fetchError } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    const currentLevel = existingProgress?.level || 1;
    const newLevel = Math.max(currentLevel, completedIsland + 1);

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
