import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';
import { supabase } from '../../../lib/supabase/client.js';

export default function ParentDashboardPage() {
  const { user, logout } = useAuthStore();
  const [child, setChild] = useState(null);
  const [progress, setProgress] = useState(null);
  const [projectsCount, setProjectsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParentData() {
      if (!user) return;
      try {
        // Fetch child relation
        const { data: relations } = await supabase
          .from('parent_students')
          .select('student_id')
          .eq('parent_id', user.id)
          .limit(1);

        if (relations && relations.length > 0) {
          const studentId = relations[0].student_id;

          // Fetch child profile
          const { data: childProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', studentId)
            .single();

          setChild(childProfile);

          // Fetch child progress
          const { data: childProgress } = await supabase
            .from('student_progress')
            .select('*')
            .eq('student_id', studentId)
            .single();

          setProgress(childProgress);

          // Fetch child projects count
          const { count } = await supabase
            .from('projects')
            .select('id', { count: 'exact', head: true })
            .eq('owner_id', studentId);

          setProjectsCount(count || 0);
        }
      } catch (err) {
        console.error('Error fetching parent stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchParentData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] p-5 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 font-bold flex items-center justify-center text-xl shadow-toyAmber border-b-2 border-amber-600">
            {user?.avatarUrl || '👨‍👩‍👧'}
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-slate-900 block leading-tight">
              Ruang Orang Tua Blokuma
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Pendampingan Belajar Anak SD
            </span>
          </div>
        </div>
        <button
          onClick={async () => {
            await logout();
            window.location.href = '/';
          }}
          className="toy-btn-white px-4 py-2 text-xs font-bold rounded-xl text-slate-700 shadow-sm"
        >
          Keluar
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm">
          {loading ? (
            <div className="text-center py-10">Memuat data anak...</div>
          ) : child ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 font-bold text-xs rounded-full border border-teal-300">
                  Anak Terhubung: Aktif Belajar
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Akun Siswa: {child.full_name}
                </span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                Laporan Perkembangan: {child.full_name} (Kelas {child.grade} SD)
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-teal-50/70 p-5 rounded-2xl border-2 border-teal-200">
                  <span className="text-xs text-teal-900 font-bold uppercase tracking-wider">
                    Level Saat Ini
                  </span>
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 mt-1">
                    Level {progress?.level || 1}
                  </p>
                  <span className="text-[11px] text-teal-600 font-medium">{progress?.xp || 0} XP Terkumpul</span>
                </div>
                <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200">
                  <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">
                    Total Karya Dihasilkan
                  </span>
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-amber-700 mt-1">
                    {projectsCount} Project
                  </p>
                  <span className="text-[11px] text-amber-600 font-medium">Kreativitas mandiri meningkat</span>
                </div>
                <div className="bg-emerald-50/70 p-5 rounded-2xl border-2 border-emerald-200">
                  <span className="text-xs text-emerald-900 font-bold uppercase tracking-wider">
                    Streak Belajar
                  </span>
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">
                    {progress?.streak_days || 0} Hari
                  </p>
                  <span className="text-[11px] text-emerald-600 font-medium">Konsistensi sangat baik! 🔥</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-500 font-medium mb-4">Belum ada akun anak yang terhubung ke akun Anda.</p>
              <button className="toy-btn-amber px-4 py-2 font-bold rounded-lg shadow-toyAmber">
                + Hubungkan Akun Anak
              </button>
            </div>
          )}
        </div>

        {child && (
          <div className="bg-amber-50/80 rounded-2xl p-6 border-2 border-amber-300 card-chunky shadow-sm">
            <h3 className="font-heading text-lg font-bold text-amber-950 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Tips Pendampingan Ramah Anak Hari Ini</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {child.nickname || child.full_name.split(' ')[0]} menunjukkan ketertarikan tinggi pada logika perulangan (loops) dan pembuatan animasi. Ayah & Bunda bisa mengajak {child.nickname || child.full_name.split(' ')[0]} bercerita tentang game apa yang sedang dia rancang hari ini, lalu berikan apresiasi atas usahanya mencoba memecahkan masalah sendiri!
            </p>
          </div>
        )}

        {/* Parent Portal Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/parent/children"
            className="card-chunky bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-teal-400 transition flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              🧒
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Profil Belajar Anak</h4>
              <p className="text-xs text-slate-500">Kelola akun & tingkat kelas anak</p>
            </div>
          </Link>
          <Link
            to="/parent/reports"
            className="card-chunky bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 transition flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              📊
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Laporan Kompetensi</h4>
              <p className="text-xs text-slate-500">Analisis 4 pilar nalar komputasi</p>
            </div>
          </Link>
          <Link
            to="/parent/settings"
            className="card-chunky bg-white p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-400 transition flex items-center gap-3.5 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              ⚙️
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm">Batas Layar & Notifikasi</h4>
              <p className="text-xs text-slate-500">Atur screen-time sehat & email</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
