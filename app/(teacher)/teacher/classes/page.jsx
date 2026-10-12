import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../store/auth/use-auth-store.js';
import { supabase } from '../../../../lib/supabase/client.js';

export default function TeacherClassesPage() {
  const { user } = useAuthStore();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('classrooms')
          .select('*')
          .eq('teacher_id', user.id);

        if (error) throw error;

        // Fetch student count for each class
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
    }
    fetchClasses();
  }, [user]);

  const copyJoinCode = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      alert(`Kode gabung ${code} disalin ke clipboard!`);
    } else {
      alert(`Kode gabung: ${code}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] bg-craft-dots p-5 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-900 font-bold text-xs rounded-full uppercase tracking-wider mb-2 border border-purple-300">
              🏫 Kelola Rombel Siswa
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
              Daftar Kelas Bimbingan
            </h1>
            <p className="text-slate-600 text-sm font-medium mt-1">
              Bagikan Kode Gabung kepada siswa agar mereka otomatis masuk ke ruang kelas dan menerima modul tugas.
            </p>
          </div>
          <Link
            to="/teacher"
            className="self-start sm:self-center px-4 py-2 bg-white text-slate-700 font-bold text-xs rounded-xl border-2 border-slate-200 hover:border-slate-300 transition"
          >
            ← Kembali ke Hub Guru
          </Link>
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
                    {cls.studentCount} Siswa Terdaftar • Kurikulum: <strong className="text-teal-700">Dunia Blok & Logika</strong>
                  </p>
                </div>

                <div className="bg-teal-50 border-2 border-teal-300 px-5 py-3 rounded-xl flex items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-800 block">Kode Gabung Siswa:</span>
                    <strong className="text-lg font-extrabold text-teal-900 tracking-wider">{cls.join_code}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyJoinCode(cls.join_code)}
                    className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition"
                  >
                    Salin 📋
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-slate-300 text-center text-slate-500 font-medium">
            <span className="text-4xl block mb-2">🏫</span>
            Belum ada rombel kelas yang terdaftar di database Supabase.
          </div>
        )}
      </div>
    </div>
  );
}
