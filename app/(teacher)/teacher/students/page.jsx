import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';

export default function TeacherStudentsPage() {
  const { user } = useAuthStore();
  const [filterClass, setFilterClass] = useState('Semua');
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      if (!user) return;
      try {
        const { data: classrooms } = await supabase
          .from('classrooms')
          .select('id, name')
          .eq('teacher_id', user.id);

        if (!classrooms || classrooms.length === 0) {
          setStudents([]);
          return;
        }

        const classIds = classrooms.map(c => c.id);

        const { data: classroomStudents } = await supabase
          .from('classroom_students')
          .select('classroom_id, student_id')
          .in('classroom_id', classIds);

        if (!classroomStudents || classroomStudents.length === 0) {
          setStudents([]);
          return;
        }

        const studentIds = classroomStudents.map(cs => cs.student_id);

        const { data: profiles } = await supabase
          .from('profiles')
          .select('*')
          .in('id', studentIds);

        const { data: progresses } = await supabase
          .from('student_progress')
          .select('*')
          .in('student_id', studentIds);

        const combined = profiles.map(profile => {
          const progress = progresses?.find(p => p.student_id === profile.id) || {};
          const classroomRel = classroomStudents.find(cs => cs.student_id === profile.id);
          const classroom = classrooms.find(c => c.id === classroomRel?.classroom_id);

          return {
            id: profile.id,
            name: profile.full_name,
            grade: classroom?.name || `Kelas ${profile.grade}`,
            avatar: profile.avatar_url || '🧑‍🚀',
            progress: progress.level ? progress.level * 10 : 0,
            xp: progress.xp || 0,
            badge: 'Siswa Aktif',
            lastActive: progress.last_active_date || 'Baru Saja',
            status: progress.level > 1 ? 'Sedang Aktif' : 'Butuh Bimbingan',
          };
        });

        setStudents(combined);
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [user]);

  const filtered = students.filter((s) => {
    const matchClass = filterClass === 'Semua' || s.grade.includes(filterClass);
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-6 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-900 rounded-full text-xs font-bold border border-teal-300 mb-2">
              <span>👩‍🏫</span> Ruang Kelas {user?.nickname || 'Guru'}
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-900">
              Daftar Penjelajah Cilik (Siswa)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Pantau perkembangan misi komputasi, keaktifan, dan portofolio coding setiap siswa.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="card-chunky bg-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari nama siswa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 text-sm bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 w-full sm:w-64"
            />
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-500">Filter Rombel:</span>
            {['Semua', '4A', '4B'].map((cls) => (
              <button
                key={cls}
                onClick={() => setFilterClass(cls)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition ${
                  filterClass === cls
                    ? 'bg-teal-500 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Student Cards Grid */}
        {loading ? (
          <div className="text-center py-10 font-bold text-slate-500">Memuat data siswa...</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <div key={s.id} className="card-chunky bg-white p-5 rounded-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl">
                    {s.avatar}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base">{s.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                        {s.grade}
                      </span>
                      <span className="text-xs text-slate-500">{s.lastActive}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${
                    s.status === 'Sedang Aktif'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : s.status === 'Butuh Bimbingan'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-sky-50 text-sky-800 border-sky-300'
                  }`}
                >
                  {s.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Penyelesaian Kurikulum</span>
                  <span className="text-teal-600">{s.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
              </div>

              {/* Bottom Info & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-bold text-amber-600">⭐ {s.xp} XP</span>
                  <span>•</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {s.badge}
                  </span>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-lg border border-amber-200 transition"
                >
                  Beri Apresiasi ⭐
                </button>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-10 font-bold text-slate-500">Tidak ada siswa yang ditemukan.</div>
        )}
      </div>
    </div>
  );
}

