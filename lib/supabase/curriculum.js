import { supabase } from './client.js';
import { getCurriculumWorld, normalizeStudentClass } from '../../src/data/curriculumData.js';

// In-Memory Cache untuk Skalabilitas Tinggi (Ribuan User Bersamaan / High Concurrency)
const progressCache = new Map();
const CACHE_TTL_MS = 15000; // Cache valid 15 detik

/**
 * Mengambil data progress siswa (XP, Level, Streak) secara realtime & instant dari Cache / Supabase.
 */
export async function getStudentRealtimeProgress(userId = null) {
  let activeUserId = userId;
  if (!activeUserId) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      activeUserId = sessionData?.session?.user?.id || null;
    } catch (e) {
      console.warn('Unable to retrieve auth session:', e);
    }
  }

  if (!activeUserId) {
    return { level: 0, xp: 0, streak_days: 0 };
  }

  // Cek In-Memory Cache (Instant < 1 ms)
  const cached = progressCache.get(activeUserId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const { data: progressData, error } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', activeUserId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    const result = {
      level: progressData?.level ?? 0,
      xp: progressData?.xp ?? 0,
      streak_days: progressData?.streak_days ?? 0,
    };

    // Simpan ke Cache
    progressCache.set(activeUserId, { data: result, timestamp: Date.now() });
    return result;
  } catch (error) {
    console.warn('Unable to load progress from Supabase:', error);
  }

  return cached?.data || { level: 0, xp: 0, streak_days: 0 };
}

/**
 * Mengambil enam misi dari master kurikulum lokal secara instan (0 ms loading).
 */
export async function getCurriculumMissionsByClass(targetClass = 3, userId = null) {
  const numericClass = normalizeStudentClass(targetClass);
  let completedLevel = 0;

  let activeUserId = userId;
  if (!activeUserId) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      activeUserId = sessionData?.session?.user?.id || null;
    } catch (e) {
      console.warn('Unable to retrieve current auth session:', e);
    }
  }

  if (activeUserId) {
    const cached = progressCache.get(activeUserId);
    if (cached) {
      completedLevel = cached.data.level;
    } else {
      try {
        const { data: progressData, error } = await supabase
          .from('student_progress')
          .select('level, xp, streak_days')
          .eq('student_id', activeUserId)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        if (progressData?.level !== undefined && progressData?.level !== null) {
          completedLevel = Number(progressData.level);
          progressCache.set(activeUserId, {
            data: { level: completedLevel, xp: progressData.xp ?? 0, streak_days: progressData.streak_days ?? 0 },
            timestamp: Date.now(),
          });
        }
      } catch (error) {
        console.warn('Unable to load progress level from Supabase:', error);
      }
    }
  }

  const unlockedMax = Math.max(1, completedLevel + 1);
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
          ? 'bg-teal-100 text-teal-800 border-teal-300 animate-pulse ring-2 ring-teal-400'
          : 'bg-slate-200 text-slate-700 border-slate-300',
      borderColor: isCompleted
        ? 'border-amber-300 bg-amber-50/70 shadow-sm'
        : isUnlocked
          ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-300/40 shadow-md'
          : 'border-slate-300 bg-slate-100/70 border-dashed',
    };
  });
}

/**
 * Membuka kunci pulau berikutnya secara langsung di Supabase PostgreSQL dengan dukungan Scaled XP.
 *
 * @param {string} userId - ID siswa
 * @param {number} completedIsland - Nomor pulau yang diselesaikan (1 s.d. 6)
 * @param {number} xpAwarded - Jumlah XP yang dihadiahkan (100 base, 125 dengan bonus efisiensi)
 */
export async function unlockNextIslandInDatabase(userId, completedIsland, xpAwarded = 100) {
  const numericIsland = Number(completedIsland);
  if (!Number.isInteger(numericIsland) || numericIsland < 1) return;

  let activeUserId = userId;
  if (!activeUserId) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      activeUserId = sessionData?.session?.user?.id || null;
    } catch (e) {
      console.warn('Unable to retrieve auth session in unlock:', e);
    }
  }

  if (!activeUserId) return;

  try {
    const existingCache = progressCache.get(activeUserId)?.data;
    const currentLevel = existingCache?.level || 0;
    const currentXp = existingCache?.xp || 0;
    const newLevel = Math.max(currentLevel, numericIsland);
    const addedXp = Number.isFinite(xpAwarded) && xpAwarded > 0 ? xpAwarded : 100;
    const newXp = currentXp + addedXp;

    // Update In-Memory Cache Seketika (0 ms)
    progressCache.set(activeUserId, {
      data: { level: newLevel, xp: newXp, streak_days: existingCache?.streak_days || 1 },
      timestamp: Date.now(),
    });

    // Update Supabase PostgreSQL di latar belakang
    const { data: existingProgress } = await supabase
      .from('student_progress')
      .select('*')
      .eq('student_id', activeUserId)
      .single();

    if (existingProgress) {
      await supabase
        .from('student_progress')
        .update({
          level: newLevel,
          xp: (existingProgress.xp || 0) + addedXp,
          updated_at: new Date().toISOString(),
        })
        .eq('student_id', activeUserId);
    } else {
      await supabase.from('student_progress').insert({
        student_id: activeUserId,
        level: newLevel,
        xp: addedXp,
        streak_days: 1,
      });
    }

    // Dispatch custom event agar UI ter-refresh realtime tanpa lag
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('student_progress_updated', {
          detail: { completedIsland: newLevel, unlockedIsland: newLevel + 1, xp: newXp, xpAwarded: addedXp },
        })
      );
    }
  } catch (error) {
    console.error('Error unlocking next island in Supabase:', error);
  }
}
