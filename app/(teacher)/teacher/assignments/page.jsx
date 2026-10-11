import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';

export default function TeacherAssignmentsPage() {
  const { user } = useAuthStore();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data, error } = await supabase
          .from('teacher_assignments')
          .select('*')
          .order('due_date', { ascending: true });

        if (error) throw error;
        setAssignments(data || []);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F5] p-5 sm:p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
        <div className="flex items-center gap-4">
          <Link
            to="/teacher"
            className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
          >
            ←
          </Link>
          <div>
            <span className="font-heading text-2xl font-bold text-slate-900 block leading-tight">
              Tantangan Kelas (Misi)
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Kelola tugas coding untuk siswa
            </span>
          </div>
        </div>
        <button className="toy-btn-teal px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl shadow-toyTeal flex items-center gap-2">
          <span>+</span>
          <span>Buat Misi Baru</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">Memuat daftar tugas dan misi...</span>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 card-chunky shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-bold text-slate-900">Daftar Misi Aktif & Selesai</h2>
              <select className="bg-slate-50 border-2 border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-teal-400">
                <option>Semua Kelas</option>
                <option>Kelas 4A - Angkasa</option>
                <option>Kelas 5B - Bintang</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((task) => (
                <div key={task.id} className="bg-[#FAF8F5] p-5 rounded-xl border-2 border-slate-200 flex flex-col justify-between hover:border-teal-300 transition">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                        {task.class_name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        task.status === 'active'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}>
                        {task.status === 'active' ? 'Sedang Berjalan' : 'Tenggat Berlalu'}
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-bold text-slate-900 mb-1">{task.title}</h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2">
                      {task.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tenggat</p>
                      <p className="text-xs font-bold text-rose-600">
                        {new Date(task.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Pengumpulan</p>
                      <p className="text-xs font-bold text-teal-700">
                        {task.submissions_count} / {task.total_students} Siswa
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
