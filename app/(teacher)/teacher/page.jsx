import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth/use-auth-store.js';
import { supabase } from '../../../lib/supabase/client.js';

export default function TeacherDashboardPage() {
  const { user, logout } = useAuthStore();
  const [stats, setStats] = useState({
    students: 0,
    classes: [],
    projects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeacherData() {
      if (!user) return;
      try {
        // Fetch classes taught by this teacher
        const { data: classesData } = await supabase
          .from('classrooms')
          .select('id, name, join_code')
          .eq('teacher_id', user.id);

        let totalStudents = 0;
        let classList = [];

        if (classesData && classesData.length > 0) {
          // For each class, get student count
          classList = await Promise.all(
            classesData.map(async (cls) => {
              const { count } = await supabase
                .from('classroom_students')
                .select('student_id', { count: 'exact', head: true })
                .eq('classroom_id', cls.id);
              totalStudents += count || 0;
              return { ...cls, studentCount: count || 0 };
            })
          );
        }

        // Fetch total projects by students in their classes
        // For simplicity right now, just total projects across the platform by students, or we can leave it general
        const { count: projectCount } = await supabase
          .from('projects')
          .select('id', { count: 'exact', head: true });

        setStats({
          students: totalStudents,
          classes: classList,
          projects: projectCount || 0,
        });
      } catch (err) {
        console.error('Error fetching teacher stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeacherData();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] p-5 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500 text-white font-bold flex items-center justify-center text-xl shadow-toyPurple border-b-2 border-purple-700">
            {user?.avatarUrl || '👩‍🏫'}
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-slate-900 block leading-tight">
              Ruang Guru Blokuma
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Pusat Kurikulum & Manajemen Kelas SD
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
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-900 font-bold text-xs rounded-full border border-purple-300 mb-2">
            Pendidik Aktif
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Selamat Datang, {user?.nickname || 'Guru'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium">
            Kelola kelas coding anak, bagikan misi tantangan, dan pantau perkembangan daya nalar siswa dengan mudah.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-teal-50/70 p-5 rounded-2xl border-2 border-teal-200">
              <span className="text-xs text-teal-900 font-bold uppercase tracking-wider">
                Total Siswa Aktif
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-teal-700 mt-1">
                {loading ? '...' : stats.students} Siswa
              </p>
              <span className="text-[11px] text-teal-600 font-medium">Dari {stats.classes.length} rombel kelas</span>
            </div>
            <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200">
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider">
                Rata-Rata Capaian Misi
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-amber-700 mt-1">
                {loading ? '...' : '0%'}
              </p>
              <span className="text-[11px] text-amber-600 font-medium">Pemahaman konsep loop tinggi</span>
            </div>
            <div className="bg-purple-50/70 p-5 rounded-2xl border-2 border-purple-200">
              <span className="text-xs text-purple-900 font-bold uppercase tracking-wider">
                Karya Selesai Dibuat
              </span>
              <p className="font-heading text-2xl sm:text-3xl font-bold text-purple-700 mt-1">
                {loading ? '...' : stats.projects} Project
              </p>
              <span className="text-[11px] text-purple-600 font-medium">Siap dipamerkan di galeri</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🏫</span>
              <span>Daftar Kelas Bimbingan</span>
            </h3>
            <Link
              to="/teacher/classes"
              className="text-xs font-bold text-teal-700 hover:underline"
            >
              + Tambah Kelas Baru
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.classes.length > 0 ? (
              stats.classes.map((cls, idx) => (
                <div key={cls.id} className="bg-teal-50/70 p-4 rounded-xl border-2 border-teal-200 flex justify-between items-center">
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      {cls.name}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">
                      {cls.studentCount} Siswa • Kode Gabung: <strong className="text-teal-700 font-bold">{cls.join_code}</strong>
                    </p>
                  </div>
                  <Link
                    to={`/teacher/classes/${cls.id}`}
                    className="toy-btn-teal px-4 py-2 text-xs font-bold rounded-lg shadow-toyTeal"
                  >
                    Detail Kelas ➔
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-6 text-sm text-slate-500 font-medium">
                Belum ada kelas yang dibuat. Yuk, buat kelas pertamamu!
              </div>
            )}
          </div>
        </div>

        {/* Quick Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/teacher/students"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-teal-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">🎒</span>
            <span className="font-heading font-bold text-sm text-slate-900">Daftar Siswa</span>
            <span className="text-[11px] text-slate-500">Pantau akun anak</span>
          </Link>
          <Link
            to="/teacher/assignments"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">🎯</span>
            <span className="font-heading font-bold text-sm text-slate-900">Tantangan Kelas</span>
            <span className="text-[11px] text-slate-500">Kelola misi aktif</span>
          </Link>
          <Link
            to="/teacher/curriculum"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📚</span>
            <span className="font-heading font-bold text-sm text-slate-900">Peta Kurikulum</span>
            <span className="text-[11px] text-slate-500">Capaian Fase A, B, C</span>
          </Link>
          <Link
            to="/teacher/reports"
            className="card-chunky bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-sky-400 transition group flex flex-col items-center text-center space-y-2"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
            <span className="font-heading font-bold text-sm text-slate-900">Raport & Asesmen</span>
            <span className="text-[11px] text-slate-500">Unduh PDF / CSV</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
