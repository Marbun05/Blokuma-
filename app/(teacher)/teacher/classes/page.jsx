import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';
import { fetchClassrooms, createClassroom } from '../../../../services/classroom-service.js';

export default function TeacherClassesPage() {
  const { user } = useAuthStore();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [toastNotification, setToastNotification] = useState(null);

  const triggerToast = (msg) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3500);
  };

  const fetchClasses = async () => {
    if (!user) return;
    try {
      const data = await fetchClassrooms(user.id);

      const withCounts = await Promise.all(
        (data || []).map(async (cls) => {
          const { count } = await supabase
            .from('classroom_students')
            .select('student_id', { count: 'exact', head: true })
            .eq('classroom_id', cls.id);
          return { ...cls, studentCount: count || 0 };
        })
      );

      setClasses(withCounts);
    } catch (err) {
      console.error('Error fetching classrooms:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [user]);

  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!newClassName.trim() || !user) return;

    try {
      await createClassroom({
        teacherId: user.id,
        name: newClassName.trim(),
      });

      triggerToast(`🎉 Rombel Kelas "${newClassName}" berhasil dibuat!`);
      setNewClassName('');
      setIsAddClassOpen(false);
      fetchClasses();
    } catch (err) {
      console.error('Error creating classroom:', err);
      triggerToast('⚠️ Gagal menyimpan Rombel Kelas baru.');
      setIsAddClassOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Toast Notifikasi UI Halus */}
        {toastNotification && (
          <div className="bg-purple-50 border-2 border-purple-400 text-purple-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm animate-fadeIn text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-2">
              <span>🏫</span>
              <span>{toastNotification}</span>
            </span>
            <button
              onClick={() => setToastNotification(null)}
              className="text-purple-700 hover:text-purple-900 font-extrabold text-sm ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-900 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-purple-300">
              🏫 Kelola Rombel Siswa Terpusat
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
              Daftar Kelas Bimbingan
            </h1>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Kelola rombel dan tempatkan siswa secara terpusat langsung dari dashboard guru.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddClassOpen(true)}
              className="toy-btn-teal px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow-toyTeal flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>+</span>
              <span>Buat Rombel Kelas Baru</span>
            </button>
            <Link
              to="/teacher"
              className="px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
            >
              ← Hub Guru
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-teal-800 gap-3">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold animate-pulse">Memuat daftar kelas...</span>
          </div>
        ) : classes.length > 0 ? (
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-slate-200 card-chunky shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🎒</span>
                    <h3 className="font-heading font-bold text-xl text-slate-900">{cls.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {cls.studentCount} Siswa Terdaftar • Manajemen Terpusat Guru
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/teacher/students"
                    className="toy-btn-teal px-4 py-2.5 text-white font-bold text-xs rounded-xl shadow-toyTeal flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🎒</span>
                    <span>Kelola Siswa di Rombel</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-slate-300 text-center text-slate-500 font-medium">
            <span className="text-4xl block mb-2">🏫</span>
            Belum ada rombel kelas yang terdaftar. Klik tombol di atas untuk membuat rombel kelas pertama!
          </div>
        )}

        {/* Modal Buat Rombel Kelas Baru */}
        {isAddClassOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border-4 border-purple-300 rounded-3xl p-6 max-w-md w-full card-chunky shadow-2xl relative my-auto">
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏫</span>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">Buat Rombel Kelas Baru</h3>
                </div>
                <button onClick={() => setIsAddClassOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold cursor-pointer">✕</button>
              </div>

              <form onSubmit={handleCreateClass} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nama Rombel / Kelas
                  </label>
                  <input
                    type="text"
                    required
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="Contoh: Kelas 4A - SD Negeri 01"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-purple-500"
                  />
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  *Siswa akan langsung ditempatkan ke kelas ini melalui Panel Manajemen Siswa oleh Guru.
                </p>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="toy-btn-teal w-full py-3 text-white font-bold text-xs sm:text-sm rounded-xl shadow-toyTeal cursor-pointer"
                  >
                    Simpan Rombel Kelas Baru 🚀
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
