import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { getCurriculumMissionsByClass, getStudentRealtimeProgress } from '../../../../lib/supabase/curriculum.js';
import { getCurriculumWorld, normalizeStudentClass } from '../../../../src/data/curriculumData.js';

export default function AdventurePage() {
  const { user } = useAuthStore();
  const currentClassStr = String(user?.grade || user?.student_class || '4');
  const [studentClass, setStudentClass] = useState(currentClassStr);

  // Inisialisasi Synchronous Instant (0 ms loading delay)
  const curriculumWorld = getCurriculumWorld(studentClass);
  const displayedClass = normalizeStudentClass(studentClass);

  const [progress, setProgress] = useState({ level: 1, xp: 0, streak_days: 1 });
  const [islands, setIslands] = useState([]);

  // Muat data peta petualangan secara instan & revalidasi di latar belakang
  const loadAdventureDataInstant = async () => {
    try {
      const [missions, realtimeStats] = await Promise.all([
        getCurriculumMissionsByClass(currentClassStr, user?.id),
        getStudentRealtimeProgress(user?.id)
      ]);
      setIslands(missions);
      setProgress(realtimeStats);
    } catch (e) {
      console.warn('Silent revalidation error:', e);
    }
  };

  useEffect(() => {
    loadAdventureDataInstant();

    const handleProfileUpdate = () => {
      loadAdventureDataInstant();
    };

    window.addEventListener('student_profile_updated', handleProfileUpdate);
    window.addEventListener('student_progress_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('student_profile_updated', handleProfileUpdate);
      window.removeEventListener('student_progress_updated', handleProfileUpdate);
    };
  }, [user, currentClassStr]);

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto animate-fadeIn">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition cursor-pointer"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Header Hero Banner dengan XP Realtime */}
        <div className="bg-teal-600 rounded-2xl p-6 sm:p-7 text-white mb-8 shadow-toyTeal border-2 border-teal-700 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-700/90 text-amber-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-teal-500 shadow-sm">
                <span>🗺️</span> {curriculumWorld?.title || 'Dunia Koding'} • Kelas {displayedClass} SD
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold">
                6 Pulau Petualangan Kode 🚀
              </h1>
              <p className="text-teal-100 text-xs sm:text-sm font-medium mt-1 max-w-xl">
                Taklukkan misi di tiap pulau untuk membuka gerbang pulau berikutnya bersama Robot Kiko!
              </p>
            </div>

            {/* Kotak Realtime XP & Level Status */}
            <div className="flex flex-row md:flex-col gap-2.5 self-start md:self-auto">
              <div className="bg-teal-700/80 border border-teal-500/80 px-4 py-2.5 rounded-2xl text-center shadow-sm">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">Realtime XP</span>
                <span className="font-heading text-lg sm:text-xl font-bold text-white block mt-0.5">
                  💎 {progress.xp} XP
                </span>
              </div>
              <div className="bg-teal-700/80 border border-teal-500/80 px-4 py-2.5 rounded-2xl text-center shadow-sm">
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">Level Aktif</span>
                <span className="font-heading text-lg sm:text-xl font-bold text-white block mt-0.5">
                  Level {progress.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Peta 6 Pulau - Langsung Terisi Tanpa Delay Spinner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(islands.length > 0 ? islands : curriculumWorld?.missions || []).map((w) => {
            const unlocked = w.unlocked !== undefined ? w.unlocked : w.island_number <= Math.max(1, progress.level + 1);
            const completed = w.completed !== undefined ? w.completed : w.island_number <= progress.level;

            const statusText = completed ? 'Tuntas ⭐⭐⭐' : unlocked ? '📍 Sedang Aktif' : '🔒 Terkunci';
            const statusColor = completed
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : unlocked
                ? 'bg-teal-100 text-teal-800 border-teal-300 animate-pulse ring-2 ring-teal-400'
                : 'bg-slate-200 text-slate-700 border-slate-300';

            const borderColor = completed
              ? 'border-amber-300 bg-amber-50/70 shadow-sm'
              : unlocked
                ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-300/40 shadow-md'
                : 'border-slate-300 bg-slate-100/70 border-dashed';

            return (
              <div
                key={w.island_number || w.id}
                className={`rounded-2xl p-6 border-2 transition duration-200 shadow-sm flex flex-col justify-between ${
                  unlocked
                    ? `${borderColor} hover:-translate-y-1`
                    : 'bg-slate-100/80 border-slate-300 border-dashed opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-3xl shadow-sm">
                      {w.icon}
                    </div>
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${statusColor}`}
                    >
                      {statusText}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-1.5">
                    {w.tag}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                    {w.island_title || w.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                    {w.desc}
                  </p>
                </div>

                <div>
                  {unlocked ? (
                    <Link
                      to={`/app/playground?island=${w.island_number || w.id}&class=${displayedClass}`}
                      className="toy-btn-teal w-full py-3 px-4 font-bold text-xs rounded-xl shadow-toyTeal flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Ayo Masuk Pulau!</span>
                      <span>➔</span>
                    </Link>
                  ) : (
                    <div className="w-full py-2.5 px-4 bg-slate-200/80 border border-slate-300 text-slate-600 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5">
                      <span>🔒</span>
                      <span>Selesaikan pulau sebelumnya</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
