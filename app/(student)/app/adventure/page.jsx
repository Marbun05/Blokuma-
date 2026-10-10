import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { getCurriculumMissionsByClass } from '../../../../lib/supabase/curriculum.js';

export default function AdventurePage() {
  const { user } = useAuthStore();
  const [studentClass, setStudentClass] = useState('3');
  const [islands, setIslands] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAdventureData = async () => {
    setLoading(true);
    let currentClassStr = '3';

    if (typeof window !== 'undefined') {
      const savedClass = localStorage.getItem('student_class');
      if (savedClass) {
        currentClassStr = savedClass;
      }
    }

    if (user?.student_class) {
      currentClassStr = user.student_class;
    }

    setStudentClass(currentClassStr);

    // Fetch realtime 6 pulau dari database Supabase
    const missions = await getCurriculumMissionsByClass(currentClassStr, user?.id);
    setIslands(missions);
    setLoading(false);
  };

  useEffect(() => {
    loadAdventureData();

    const handleProfileUpdate = () => {
      loadAdventureData();
    };

    window.addEventListener('student_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('student_profile_updated', handleProfileUpdate);
    };
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 max-w-6xl">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-teal-300">
              🗺️ Peta Petualangan Kiko • Kelas {studentClass} SD
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
              6 Pulau Petualangan Kode
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Taklukkan misi di tiap pulau untuk membuka gerbang pulau berikutnya bersama Robot Kiko!
            </p>
          </div>

          <div className="bg-amber-100 border-2 border-amber-300 px-4 py-2 rounded-2xl text-xs font-bold text-amber-900 shadow-sm flex items-center gap-2 self-start sm:self-auto">
            <span>🎯 Kurikulum Sesuai Kelas:</span>
            <span className="bg-white px-2 py-0.5 rounded-lg border border-amber-300">
              {studentClass.includes('SD') ? studentClass : `Kelas ${studentClass} SD`}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">
              Memuat data kurikulum pulau dari database Supabase...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {islands.map((w) => (
              <div
                key={w.id}
                className={`rounded-2xl p-6 border-2 transition duration-200 shadow-sm flex flex-col justify-between ${
                  w.unlocked
                    ? `${w.borderColor} hover:-translate-y-1`
                    : 'bg-slate-100/80 border-slate-300 border-dashed opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-3xl shadow-sm">
                      {w.icon}
                    </div>
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm ${w.statusColor}`}
                    >
                      {w.status}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-md border border-teal-200 inline-block mb-1.5">
                    {w.tag}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                    {w.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                    {w.desc}
                  </p>
                </div>

                <div>
                  {w.unlocked ? (
                    <Link
                      to={`/app/playground?island=${w.id}&class=${studentClass}`}
                      className="toy-btn-teal w-full py-3 px-4 font-bold text-xs rounded-xl shadow-toyTeal flex items-center justify-center gap-1.5"
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
