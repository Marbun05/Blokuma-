import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { supabase } from '../../../../lib/supabase/client';
import { useAuthStore } from '../../../../store/auth/use-auth-store';

export default function AchievementsPage() {
  const { user } = useAuthStore();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [masterRes, progressRes] = await Promise.all([
          supabase.from('master_achievements').select('*').order('target_value', { ascending: true }),
          user?.id
            ? supabase.from('student_progress').select('*').eq('student_id', user.id).single()
            : Promise.resolve({ data: null })
        ]);

        if (masterRes.error) throw masterRes.error;

        const masterData = masterRes.data || [];
        const studentLevel = progressRes?.data?.level || Number(localStorage.getItem('student_completed_level') || 0);
        const studentXp = progressRes?.data?.xp || 0;

        const processed = masterData.map((a) => {
          let status = 'locked';
          let progress = 0;

          if (a.id === 'first_step') {
            if (studentLevel >= 1) {
              status = 'unlocked';
              progress = 100;
            }
          } else if (a.id === 'loop_master') {
            if (studentLevel >= 2) {
              status = 'unlocked';
              progress = 100;
            } else if (studentLevel === 1) {
              status = 'progress';
              progress = 50;
            }
          } else if (a.id === 'game_architect') {
            if (studentLevel >= 3 || studentXp >= 300) {
              status = 'unlocked';
              progress = 100;
            } else if (studentLevel === 2) {
              status = 'progress';
              progress = 60;
            }
          } else {
            if (studentLevel >= (a.target_value || 1)) {
              status = 'unlocked';
              progress = 100;
            }
          }

          return { ...a, status, progress };
        });

        setAchievements(processed);
      } catch (err) {
        console.error('Error fetching achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
            🏆 Lemari Medali & Lencana
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Lencana Prestasi Kiko
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Kumpulkan seluruh medali kehormatan dari setiap misi petualangan yang berhasil kamu selesaikan!
          </p>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">Memuat medali dan lencana...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {achievements.map((item) => {
              const isLocked = item.status === 'locked';
              const isProgress = item.status === 'progress';
              const isUnlocked = item.status === 'unlocked';

              return (
                <div
                  key={item.id}
                  className={`${item.bg_color} bg-opacity-80 rounded-2xl p-6 border-2 ${item.border_color} card-chunky text-center shadow-sm hover:-translate-y-1 transition duration-200 relative ${isLocked ? 'opacity-85' : ''}`}
                >
                  <div className={`w-20 h-20 mx-auto rounded-full ${item.bg_color.replace('200','300')} border-4 ${item.border_color} flex items-center justify-center text-4xl shadow-md mb-3 ${isLocked ? 'grayscale opacity-80' : ''}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${item.text_color} ${item.bg_color} px-2.5 py-0.5 rounded-full border ${item.border_color} inline-block mb-1`}>
                    {item.medal_type}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 mb-4">
                    {item.description}
                  </p>

                  {isUnlocked && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300 shadow-sm">
                      <span>✓</span> Sudah Terbuka
                    </span>
                  )}
                  {isProgress && (
                    <>
                      <div className="w-full bg-white/50 rounded-full h-2.5 mb-2 overflow-hidden border border-black/10">
                        <div className="bg-black/40 h-2.5 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className={`text-[11px] font-bold ${item.text_color}`}>{item.progress}% Selesai</span>
                    </>
                  )}
                  {isLocked && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full border border-slate-300">
                      <span>🔒</span> Terkunci
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
