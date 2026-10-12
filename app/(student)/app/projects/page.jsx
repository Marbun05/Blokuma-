import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StudentSidebar } from '../../../../components/navigation/StudentSidebar.jsx';
import { supabase } from '../../../../lib/supabase/client';
import { useAuthStore } from '../../../../store/auth/use-auth-store';

export default function ProjectsPage() {
  const { user } = useAuthStore();
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('student_projects')
          .select('*')
          .eq('student_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setMyProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProjects();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#FBF9F5]">
      <StudentSidebar />

      <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm transition cursor-pointer"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-amber-300">
              🎮 Galeri Meja Kerja & Soal Teka-Teki Siswa
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
              Koleksi Karya & Soal Mandiri
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Simpan, mainkan kembali, dan tantang teman-temanmu dengan soal teka-teki buatanmu!
            </p>
          </div>
          <Link
            to="/app/projects/new"
            className="toy-btn-teal px-6 py-3 text-white font-bold text-sm rounded-xl shadow-toyTeal flex items-center gap-2 self-start sm:self-auto cursor-pointer active:scale-95"
          >
            <span>+</span>
            <span>Rakit Karya & Soal Baru!</span>
          </Link>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">Memuat koleksi karyamu dari database...</span>
          </div>
        ) : myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl p-6 border-2 border-teal-200 card-chunky shadow-sm hover:-translate-y-1 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-2xl shadow-sm">
                      {project.icon || '🎮'}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${project.badge_color || 'bg-teal-100 text-teal-800 border-teal-300'}`}>
                      Karya Aktif
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    {project.description || 'Proyek koding & teka-teki kreatif rancangan sendiri.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold">
                    Diperbarui {new Date(project.updated_at || Date.now()).toLocaleDateString('id-ID')}
                  </span>
                  <Link
                    to={`/app/playground?project=${project.id}`}
                    className="toy-btn-teal px-4 py-2 text-xs font-bold rounded-lg shadow-toyTeal flex items-center gap-1 cursor-pointer active:scale-95 text-white"
                  >
                    <span>Edit & Mainkan</span>
                    <span>➔</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-slate-300 text-center text-slate-500 font-medium max-w-md mx-auto">
            <span className="text-5xl block mb-3">📦</span>
            <h3 className="font-heading font-bold text-slate-800 text-lg mb-1">Belum Ada Karya / Soal Tersimpan</h3>
            <p className="text-xs text-slate-500 mb-4">
              Yuk, rakit game pertama atau susun soal teka-teki koding mandirimu di Playground!
            </p>
            <Link
              to="/app/projects/new"
              className="toy-btn-teal inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-toyTeal text-white"
            >
              <span>🚀 Buat Karya & Soal Baru</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
